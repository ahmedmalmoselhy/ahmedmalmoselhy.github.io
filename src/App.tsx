
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SinglePageApp from "./pages/SinglePageApp";

// Set this flag to true to enable maintenance mode
const isMaintenanceMode = false;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {isMaintenanceMode ? (
        <div>Under Maintenance</div>
      ) : (
        <SinglePageApp />
      )}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
