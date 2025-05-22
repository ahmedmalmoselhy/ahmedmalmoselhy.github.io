
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Resume from "./pages/Resume";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import UnderMaintenance from "./pages/UnderMaintenance";

// Set this flag to true to enable maintenance mode
const isMaintenanceMode = false;

// Config object for maintenance mode
const maintenanceConfig = {
  // Pages that are exempt from maintenance mode (can still be accessed)
  // exemptRoutes: ["/"]
};

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
              {/* When in maintenance mode, only show specific routes */}
              {/* <Route path="/" element={<Index />} /> */}
              <Route path="/maintenance" element={<UnderMaintenance />} />
              {/* Redirect all other routes to maintenance page, except exempt routes */}
              <Route 
                path="*" 
                element={
                  <Navigate to="/maintenance" replace />
                } 
              />
            </>
          ) : (
            <>
              {/* Normal routes when not in maintenance mode */}
              <Route path="/" element={<Index />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/maintenance" element={<Navigate to="/" replace />} />
              {/* <Route path="/portfolio" element={<Navigate to="/" replace />} /> */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
