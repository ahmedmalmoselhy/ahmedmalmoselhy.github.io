import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import SinglePageApp from "./pages/SinglePageApp";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

export type PageSection = 'home' | 'resume' | 'skills' | 'projects' | 'contact' | 'experience' | 'project-detail';

export interface AppState {
  section: PageSection;
  projectId?: number;
}

const App = () => {
  const [appState, setAppState] = useState<AppState>({ section: 'home' });

  const handleSectionChange = (section: PageSection, projectId?: number) => {
    setAppState({ section, projectId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Navbar activeSection={appState.section} onSectionChange={handleSectionChange} />
          <SinglePageApp appState={appState} onSectionChange={handleSectionChange} />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
