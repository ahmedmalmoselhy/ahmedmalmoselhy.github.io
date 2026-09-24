import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import SinglePageApp from "./pages/SinglePageApp";
import Navbar from "./components/Navbar";
import { useAppUpdates } from "./hooks/use-app-updates";

const queryClient = new QueryClient();

export type PageSection = 'home' | 'resume' | 'skills' | 'projects' | 'contact' | 'experience' | 'project-detail';

export interface AppState {
  section: PageSection;
  projectId?: number;
}

// The current page lives in the URL hash (#/resume, #/projects/5) so a reload,
// a shared link, or the installed app's refresh reopens the same page.
const HASH_SECTIONS: PageSection[] = ['resume', 'skills', 'projects', 'contact', 'experience'];

const stateFromHash = (hash: string): AppState => {
  const [, section, id] = hash.match(/^#\/([a-z-]+)(?:\/(\d+))?$/) ?? [];
  if (section === 'projects' && id) return { section: 'project-detail', projectId: Number(id) };
  return HASH_SECTIONS.includes(section as PageSection) ? { section: section as PageSection } : { section: 'home' };
};

const hashFromState = ({ section, projectId }: AppState) =>
  section === 'home' ? '' : section === 'project-detail' ? `#/projects/${projectId}` : `#/${section}`;

const App = () => {
  const [appState, setAppState] = useState<AppState>(() => stateFromHash(window.location.hash));
  useAppUpdates();

  // Back/forward (incl. Android back gesture in the installed app) move between pages
  useEffect(() => {
    const sync = () => setAppState(stateFromHash(window.location.hash));
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const handleSectionChange = (section: PageSection, projectId?: number) => {
    const next = { section, projectId };
    const hash = hashFromState(next);
    if (hash !== window.location.hash) {
      window.history.pushState(null, '', hash || window.location.pathname);
    }
    setAppState(next);
    // Jump (not smooth-scroll) so the page-enter animation plays at the top
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" offset={80} />
          <Navbar activeSection={appState.section} onSectionChange={handleSectionChange} />
          <SinglePageApp appState={appState} onSectionChange={handleSectionChange} />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
