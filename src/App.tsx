
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
        <div className="flex items-center justify-center min-h-screen bg-portfolio-navy text-portfolio-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
            <p className="text-portfolio-lightSlate">We'll be back soon!</p>
          </div>
        </div>
      ) : (
        <SinglePageApp />
      )}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
