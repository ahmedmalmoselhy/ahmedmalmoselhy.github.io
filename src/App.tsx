
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import SinglePageApp from "./pages/SinglePageApp";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

export type PageSection = 'home' | 'resume' | 'skills' | 'projects' | 'contact' | 'experience';

const App = () => {
  const [activeSection, setActiveSection] = useState<PageSection>('home');

  const handleSectionChange = (section: PageSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
        <SinglePageApp activeSection={activeSection} onSectionChange={handleSectionChange} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
