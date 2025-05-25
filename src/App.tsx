
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SinglePageApp from "./pages/SinglePageApp";
import NotFound from "./pages/NotFound";
import UnderMaintenance from "./pages/UnderMaintenance";

// Set this flag to true to enable maintenance mode
const isMaintenanceMode = false;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {isMaintenanceMode ? (
            <>
              <Route path="/maintenance" element={<UnderMaintenance />} />
              <Route 
                path="*" 
                element={<Navigate to="/maintenance" replace />} 
              />
            </>
          ) : (
            <>
              <Route path="/" element={<SinglePageApp />} />
              <Route path="/maintenance" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
