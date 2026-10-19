import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, FileText, FolderGit2, Cpu, Send, RotateCw, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import CommandPalette from "./CommandPalette";
import { PageSection } from "@/App";
import { Button } from "@/components/ui/button";
import { reloadApp } from "@/hooks/use-app-updates";
import { site } from "@/data/site";

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
  onSectionChange: (section: PageSection, projectId?: number) => void;
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
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      {/* Sticky, slightly translucent header: terminal-style brand, nav pills, search and theme */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 md:h-16">
          <button
            onClick={() => onSectionChange("home")}
            className="rounded-sm font-mono text-[15px] font-medium"
            aria-label={`${site.name}, go to home`}
          >
            ~/{site.handle}
            <span className="caret" aria-hidden="true" />
          </button>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {links.map(({ section, label }) => (
              <button
                key={section}
                onClick={() => onSectionChange(section)}
                className={cn("nav-link", isActive(section) && "active")}
                aria-current={isActive(section) ? "page" : undefined}
              >
                {label.toLowerCase()}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-faint hover:text-foreground"
              aria-label="Open command menu"
            >
              <Search size={15} aria-hidden="true" />
              <span className="hidden sm:inline">search</span>
              <kbd className="hidden rounded border border-border px-1.5 font-mono text-[11px] sm:inline">⌘K</kbd>
            </button>
            <RefreshButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onSectionChange={onSectionChange} />

      {/* Mobile tab bar: docked to the bottom edge; blue rule marks the active tab */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="grid grid-cols-5">
          {links.map(({ section, label, icon: Icon }) => {
            const active = isActive(section);
            return (
              <li key={section}>
                <button
                  onClick={() => onSectionChange(section)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 border-t-2 text-[11px] font-medium transition-colors",
                    active
                      ? "border-portfolio-highlight text-portfolio-highlight"
                      : "border-transparent text-portfolio-slate",
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
