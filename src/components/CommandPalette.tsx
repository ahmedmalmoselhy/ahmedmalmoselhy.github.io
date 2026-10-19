import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToggleTheme } from "@/components/ThemeToggle";
import { PageSection } from "@/App";
import { projectsData } from "@/data/projects";
import { site, githubUrl, linkedinUrl } from "@/data/site";

interface Command {
  label: string;
  group: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSectionChange: (section: PageSection, projectId?: number) => void;
}

/** Ctrl/Cmd+K menu: jump to pages and projects, switch theme, grab contact details. */
const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange, onSectionChange }) => {
  const toggleTheme = useToggleTheme();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const commands = useMemo<Command[]>(
    () => [
      ...(["home", "resume", "projects", "skills", "contact"] as PageSection[]).map((section) => ({
        label: `Go to ${section}`,
        group: "page",
        run: () => onSectionChange(section),
      })),
      ...projectsData.map((p) => ({ label: p.title, group: "project", run: () => onSectionChange("project-detail", p.id) })),
      { label: "Toggle theme", group: "ui", run: toggleTheme },
      {
        label: "Copy email address",
        group: "contact",
        run: () => navigator.clipboard?.writeText(site.email).then(() => toast.success("Email copied")),
      },
      { label: "Open GitHub", group: "link", run: () => window.open(githubUrl, "_blank", "noopener") },
      { label: "Open LinkedIn", group: "link", run: () => window.open(linkedinUrl, "_blank", "noopener") },
      { label: "Download CV", group: "file", run: () => window.open(site.resume, "_blank") },
    ],
    [onSectionChange, toggleTheme],
  );

  const shown = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  // Global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
    }
  }, [open]);

  const run = (command?: Command) => {
    if (!command) return;
    onOpenChange(false);
    command.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") setSelected((i) => Math.min(i + 1, shown.length - 1));
    else if (e.key === "ArrowUp") setSelected((i) => Math.max(i - 1, 0));
    else if (e.key === "Enter") run(shown[selected]);
    else return;
    e.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[14vh] max-w-[560px] translate-y-0 gap-0 overflow-hidden p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          onKeyDown={onInputKey}
          placeholder="type a command or search..."
          aria-label="Search commands"
          className="w-full border-b border-border bg-transparent px-5 py-4 font-mono text-base outline-none placeholder:text-faint"
        />
        <ul role="listbox" className="max-h-80 overflow-auto p-1.5">
          {shown.map((c, i) => (
            <li
              key={c.label}
              role="option"
              aria-selected={i === selected}
              onMouseEnter={() => setSelected(i)}
              onClick={() => run(c)}
              className={`flex cursor-pointer justify-between rounded-md px-3 py-2.5 text-[15px] ${
                i === selected ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              {c.label}
              <span className="font-mono text-xs text-faint">{c.group}</span>
            </li>
          ))}
          {shown.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No matches</li>}
        </ul>
        <p className="border-t border-border px-4 py-2 font-mono text-[11.5px] text-faint">
          ↑↓ navigate · enter select · esc close
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
