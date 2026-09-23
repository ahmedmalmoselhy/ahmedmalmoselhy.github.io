import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import SinglePageApp from "./pages/SinglePageApp";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

export type PageSection = 'home' | 'resume' | 'skills' | 'projects' | 'contact' | 'project-detail';

export interface AppState {
  section: PageSection;
  projectId?: number;
}

const App = () => {
  const [appState, setAppState] = useState<AppState>({ section: 'home' });

  const handleSectionChange = (section: PageSection, projectId?: number) => {
    setAppState({ section, projectId });
    // A new page starts at the top; no scroll animation.
    window.scrollTo({ top: 0 });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Navbar activeSection={appState.section} onSectionChange={handleSectionChange} />
        <SinglePageApp appState={appState} onSectionChange={handleSectionChange} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
