import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Home, FileText, FolderGit2, Cpu, Send } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { PageSection } from "@/App";
import { useTypingAnimation } from "@/hooks/use-typing-animation";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const displayName = useTypingAnimation("<Ahmed AlMoselhy />", 150, 50, 2000);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // A project page lives under "Projects" in the nav
  const isActive = (section: PageSection) =>
    activeSection === section ||
    (section === "projects" && activeSection === "project-detail");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500",
          isScrolled
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "container mx-auto flex items-center justify-between px-4 transition-all duration-500",
            isScrolled ? "h-16" : "h-20",
          )}
        >
          <button
            onClick={() => onSectionChange("home")}
            className="rounded-lg font-mono text-base font-semibold text-portfolio-highlight transition-opacity hover:opacity-80 sm:text-lg"
            aria-label="Ahmed AlMoselhy, go to home"
          >
            <span className="inline-flex min-h-6 items-center">
              {displayName}
              <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-portfolio-highlight" />
            </span>
          </button>

          {/* Desktop navigation */}
          <nav
            aria-label="Main"
            className="panel hidden items-center gap-1 p-1.5 md:flex"
          >
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
            <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
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
        className="fixed inset-x-3 bottom-3 z-50 md:hidden"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="panel grid grid-cols-5 bg-card/95 p-1.5 backdrop-blur-md">
          {links.map(({ section, label, icon: Icon }) => {
            const active = isActive(section);
            return (
              <li key={section}>
                <button
                  onClick={() => onSectionChange(section)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-[52px] w-full flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium transition-all duration-300 active:scale-95",
                    active
                      ? "bg-portfolio-highlight/15 text-portfolio-highlight"
                      : "text-portfolio-slate",
                  )}
                >
                  <Icon
                    size={20}
                    aria-hidden="true"
                    className={cn("transition-transform duration-300", active && "-translate-y-0.5")}
                  />
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
