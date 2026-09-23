import React from "react";
import { cn } from "@/lib/utils";
import { Code, FileText, FolderOpen, Home, Mail } from "lucide-react";
import { PageSection } from "@/App";

interface NavbarProps {
  activeSection: PageSection;
  onSectionChange: (section: PageSection) => void;
}

const tabs = [
  { section: "home", label: "Home", icon: Home },
  { section: "resume", label: "Resume", icon: FileText },
  { section: "projects", label: "Projects", icon: FolderOpen },
  { section: "skills", label: "Skills", icon: Code },
  { section: "contact", label: "Contact", icon: Mail },
] as const;

/**
 * Desktop: translucent top bar. Mobile: bottom tab bar, always visible.
 * Both float over content as the functional layer.
 */
const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
  // A project detail page lives under the Projects tab.
  const current = activeSection === "project-detail" ? "projects" : activeSection;

  return (
    <>
      <header className="glass fixed inset-x-0 top-0 z-50 hidden border-b md:block">
        <nav
          aria-label="Primary"
          className="container flex h-12 items-center justify-between"
        >
          <button
            onClick={() => onSectionChange("home")}
            aria-current={current === "home" ? "page" : undefined}
            className="text-headline"
          >
            Ahmed AlMoselhy
          </button>
          <ul className="flex items-center gap-1">
            {tabs.slice(1).map(({ section, label }) => (
              <li key={section}>
                <button
                  onClick={() => onSectionChange(section)}
                  aria-current={current === section ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-subhead transition-colors",
                    current === section
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <nav
        aria-label="Primary"
        className="glass fixed inset-x-0 bottom-0 z-50 border-t pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="grid grid-cols-5">
          {tabs.map(({ section, label, icon: Icon }) => {
            const active = current === section;
            return (
              <li key={section}>
                <button
                  onClick={() => onSectionChange(section)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-[3.25rem] w-full flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-medium",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={active ? 2.25 : 1.75} />
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
