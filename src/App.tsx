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

export type PageSection = 'home' | 'resume' | 'skills' | 'projects' | 'contact' | 'project-detail' | 'company';

/** Navigate to a section; `id` is a project id (number) or a company slug (string). */
export type Navigate = (section: PageSection, id?: number | string) => void;

export interface AppState {
  section: PageSection;
  projectId?: number;
  /** Company slug for the 'company' section */
  company?: string;
}

// The current page lives in the URL hash (#/resume, #/projects/5, #/experience/qeema) so a reload,
// a shared link, or the installed app's refresh reopens the same page.
const HASH_SECTIONS: PageSection[] = ['resume', 'skills', 'projects', 'contact'];

const stateFromHash = (hash: string): AppState => {
  const [, section, id] = hash.match(/^#\/([a-z-]+)(?:\/([\w-]+))?$/) ?? [];
  if (section === 'projects' && /^\d+$/.test(id ?? '')) return { section: 'project-detail', projectId: Number(id) };
  if (section === 'experience' && id) return { section: 'company', company: id };
  return HASH_SECTIONS.includes(section as PageSection) ? { section: section as PageSection } : { section: 'home' };
};

const hashFromState = ({ section, projectId, company }: AppState) =>
  section === 'home' ? ''
  : section === 'project-detail' ? `#/projects/${projectId}`
  : section === 'company' ? `#/experience/${company}`
  : `#/${section}`;

const App = () => {
  const [appState, setAppState] = useState<AppState>(() => stateFromHash(window.location.hash));
  useAppUpdates();

  // Back/forward (incl. Android back gesture in the installed app) move between pages
  useEffect(() => {
    const sync = () => {
      setAppState(stateFromHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const handleSectionChange: Navigate = (section, id) => {
    const next: AppState =
      section === 'company'
        ? { section, company: String(id) }
        : { section, projectId: typeof id === 'number' ? id : undefined };
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
