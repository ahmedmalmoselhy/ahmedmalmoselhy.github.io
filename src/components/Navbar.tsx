import React from "react";
import { cn } from "@/lib/utils";
import { Home, FileText, FolderGit2, Cpu, Send, RotateCw } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { PageSection } from "@/App";
import { Button } from "@/components/ui/button";
import { reloadApp } from "@/hooks/use-app-updates";

// Installed as an app (Android/desktop PWA or iOS home-screen web app): there is no
// browser reload button or pull-to-refresh, so the header gets its own refresh button.
const isInstalledApp =
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const RefreshButton = () =>
  isInstalledApp ? (
    <Button
      variant="ghost"
      size="icon"
      onClick={reloadApp}
      aria-label="Refresh"
      className="text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <RotateCw className="h-5 w-5" />
    </Button>
  ) : null;

interface NavbarProps {
  activeSection: PageSection;
  onSectionChange: (section: PageSection) => void;
}

const links: { section: PageSection; label: string; icon: typeof Home }[] = [
  { section: "home", label: "Home", icon: Home },
  { section: "resume", label: "Resume", icon: FileText },
  { section: "projects", label: "Projects", icon: FolderGit2 },
  { section: "skills", label: "Skills", icon: Cpu },
  { section: "contact", label: "Contact", icon: Send },
];

const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
  // A project page lives under "Projects" in the nav
  const isActive = (section: PageSection) =>
    activeSection === section ||
    (section === "projects" && activeSection === "project-detail");
  const activeIndex = Math.max(0, links.findIndex((l) => isActive(l.section)));

  return (
    <>
      {/* Mobile: two floating Liquid Glass capsules over the content. Desktop: solid bar. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] md:pointer-events-auto md:border-b md:border-border md:bg-card/95 md:backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-3 pt-3 md:h-16 md:px-4 md:pt-0">
          <button
            onClick={() => onSectionChange("home")}
            className="pointer-events-auto flex items-center gap-3 rounded-full transition-transform active:scale-[1.04] max-md:liquid-glass max-md:h-12 max-md:pl-1.5 max-md:pr-4 md:rounded-md"
            aria-label="Ahmed AlMoselhy, go to home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground md:rounded-md">
              AA
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-semibold text-portfolio-white">Ahmed AlMoselhy</span>
              <span className="block text-xs text-portfolio-slate max-md:text-portfolio-lightSlate">Software Engineer</span>
            </span>
          </button>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden h-full items-center gap-1 md:flex">
            {links.map(({ section, label }) => (
              <button
                key={section}
                onClick={() => onSectionChange(section)}
                className={cn("nav-link", isActive(section) && "active")}
                aria-current={isActive(section) ? "page" : undefined}
              >
                {label}
              </button>
            ))}
            <span className="mx-2 h-5 w-px bg-border" aria-hidden="true" />
            <RefreshButton />
            <ThemeToggle />
          </nav>

          <div className="liquid-glass pointer-events-auto flex h-12 items-center gap-0.5 rounded-full px-1 md:hidden">
            <RefreshButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile tab bar: floating Liquid Glass capsule; the lens springs to the active tab */}
      <nav
        aria-label="Main"
        className="liquid-glass fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 rounded-full p-1.5 md:hidden"
      >
        <ul className="relative grid grid-cols-5">
          <li
            aria-hidden="true"
            className="liquid-lens pointer-events-none absolute inset-y-0 left-0 w-1/5 rounded-full transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
          {links.map(({ section, label, icon: Icon }) => {
            const active = isActive(section);
            return (
              <li key={section} className="relative">
                <button
                  onClick={() => onSectionChange(section)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-[52px] w-full flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-[color,transform] duration-300 active:scale-110",
                    active ? "text-portfolio-highlight" : "text-portfolio-lightSlate",
                  )}
                >
                  <Icon size={20} aria-hidden="true" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
