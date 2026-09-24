import React from "react";
import { cn } from "@/lib/utils";
import { Home, FileText, FolderGit2, Cpu, Send } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { PageSection } from "@/App";

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <button
            onClick={() => onSectionChange("home")}
            className="flex items-center gap-3 rounded-md"
            aria-label="Ahmed AlMoselhy, go to home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary font-mono text-sm font-semibold text-primary-foreground">
              AA
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-semibold text-portfolio-white">Ahmed AlMoselhy</span>
              <span className="block text-xs text-portfolio-slate">Software Engineer</span>
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
            <ThemeToggle />
          </nav>

          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar: thumb-reachable, always visible */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
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
                    "relative flex min-h-[60px] w-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors duration-300 active:scale-95",
                    active
                      ? "text-portfolio-highlight before:absolute before:inset-x-5 before:top-0 before:h-0.5 before:rounded-full before:bg-portfolio-highlight"
                      : "text-portfolio-slate",
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
