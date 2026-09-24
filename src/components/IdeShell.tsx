import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Files, GitBranch, Github, Linkedin, Mail, X } from "lucide-react";
import { cn, projectSlug } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import type { AppState, PageSection } from "@/App";
import { projectsData } from "@/data/projects";

type Lang = "Markdown" | "JSON" | "TypeScript" | "YAML" | "Shell Script";

interface FileDef {
  section: PageSection;
  name: string;
  lang: Lang;
}

// Each page is a "file" in the workspace
const files: FileDef[] = [
  { section: "home", name: "README.md", lang: "Markdown" },
  { section: "resume", name: "resume.json", lang: "JSON" },
  { section: "projects", name: "projects.ts", lang: "TypeScript" },
  { section: "skills", name: "skills.yaml", lang: "YAML" },
  { section: "contact", name: "contact.sh", lang: "Shell Script" },
];

/** Small coloured glyph per file type, like editor file icons. */
const FileIcon: React.FC<{ name: string }> = ({ name }) => {
  const ext = name.split(".").pop();
  const [glyph, cls] =
    ext === "md" ? ["M↓", "syn-keyword"]
    : ext === "json" ? ["{}", "syn-fn"]
    : ext === "ts" ? ["TS", "syn-keyword"]
    : ext === "yaml" ? ["Y", "syn-number"]
    : ext === "sh" ? ["$", "syn-string"]
    : ["•", "syn-comment"];
  return (
    <span className={cn("inline-block w-5 shrink-0 text-center font-mono text-[10px] font-semibold", cls)} aria-hidden="true">
      {glyph}
    </span>
  );
};

/** Resolve the file shown for an app state (project pages become projects/<slug>.md). */
const fileFor = (state: AppState): FileDef & { key: string; path: string[] } => {
  if (state.section === "project-detail") {
    const project = projectsData.find((p) => p.id === state.projectId);
    const name = `${projectSlug(project?.title ?? "project")}.md`;
    return { section: "project-detail", name, lang: "Markdown", key: `p${state.projectId}`, path: ["portfolio", "projects", name] };
  }
  const file = files.find((f) => f.section === state.section) ?? files[0];
  return { ...file, key: file.section, path: ["portfolio", file.name] };
};

interface IdeShellProps {
  appState: AppState;
  onSectionChange: (section: PageSection, projectId?: number) => void;
  children: React.ReactNode;
}

const IdeShell: React.FC<IdeShellProps> = ({ appState, onSectionChange, children }) => {
  const current = fileFor(appState);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);
  // Open editor tabs, in the order they were opened
  const [tabs, setTabs] = useState<AppState[]>([appState]);

  useEffect(() => {
    setTabs((open) =>
      open.some((t) => fileFor(t).key === current.key) ? open : [...open, appState],
    );
  }, [appState, current.key]);

  const open = (state: AppState) => onSectionChange(state.section, state.projectId);

  const closeTab = (state: AppState) => {
    const key = fileFor(state).key;
    const rest = tabs.filter((t) => fileFor(t).key !== key);
    setTabs(rest.length ? rest : [{ section: "home" }]);
    if (key === current.key) open(rest[rest.length - 1] ?? { section: "home" });
  };

  const treeRow = (active: boolean) =>
    cn(
      "flex w-full items-center gap-1.5 py-1 pr-2 text-left text-[13px] transition-colors",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-portfolio-slate hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
    );

  return (
    <>
      {/* Activity bar (desktop) */}
      <aside className="fixed bottom-6 left-0 top-0 z-40 hidden w-12 flex-col items-center gap-1 border-r border-sidebar-border bg-[hsl(var(--chrome))] py-2 lg:flex">
        <button
          onClick={() => setExplorerOpen((v) => !v)}
          aria-label={explorerOpen ? "Hide explorer" : "Show explorer"}
          aria-pressed={explorerOpen}
          className={cn(
            "relative grid h-11 w-11 place-items-center transition-colors",
            explorerOpen ? "text-sidebar-foreground before:absolute before:left-[-4px] before:h-7 before:w-0.5 before:bg-portfolio-highlight" : "text-portfolio-slate hover:text-sidebar-foreground",
          )}
        >
          <Files size={22} />
        </button>
        <button
          onClick={() => onSectionChange("contact")}
          aria-label="Contact"
          className="grid h-11 w-11 place-items-center text-portfolio-slate transition-colors hover:text-sidebar-foreground"
        >
          <Mail size={21} />
        </button>
        <a href="https://github.com/ahmedmalmoselhy" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center text-portfolio-slate transition-colors hover:text-sidebar-foreground">
          <Github size={21} />
        </a>
        <a href="https://www.linkedin.com/in/ahmedmalmoselhy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center text-portfolio-slate transition-colors hover:text-sidebar-foreground">
          <Linkedin size={21} />
        </a>
        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </aside>

      {/* Explorer (desktop) */}
      {explorerOpen && (
        <nav
          aria-label="Explorer"
          className="fixed bottom-6 left-12 top-0 z-30 hidden w-60 flex-col border-r border-sidebar-border bg-sidebar lg:flex"
        >
          <div className="flex h-[35px] items-center px-4 text-[11px] font-semibold uppercase tracking-wider text-portfolio-slate">
            Explorer
          </div>
          <div className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground">
            <ChevronDown size={14} className="mr-1 inline" aria-hidden="true" />
            Portfolio
          </div>
          <ul className="overflow-y-auto">
            {files.map((file) => (
              <li key={file.section}>
                {file.section === "projects" ? (
                  <>
                    <div className="flex items-center">
                      <button
                        onClick={() => setProjectsOpen((v) => !v)}
                        aria-label={projectsOpen ? "Collapse projects folder" : "Expand projects folder"}
                        aria-expanded={projectsOpen}
                        className="grid h-7 w-6 shrink-0 place-items-center pl-2 text-portfolio-slate hover:text-sidebar-foreground"
                      >
                        {projectsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                      <button
                        onClick={() => {
                          setProjectsOpen(true);
                          onSectionChange("projects");
                        }}
                        className={cn(treeRow(false), "pl-1")}
                      >
                        projects
                      </button>
                    </div>
                    {projectsOpen && (
                      <ul>
                        <li>
                          <button
                            onClick={() => onSectionChange("projects")}
                            className={cn(treeRow(appState.section === "projects"), "pl-10")}
                          >
                            <FileIcon name={file.name} />
                            {file.name}
                          </button>
                        </li>
                        {projectsData.map((p) => {
                          const name = `${projectSlug(p.title)}.md`;
                          const active = appState.section === "project-detail" && appState.projectId === p.id;
                          return (
                            <li key={p.id}>
                              <button
                                onClick={() => onSectionChange("project-detail", p.id)}
                                className={cn(treeRow(active), "pl-10")}
                                title={p.title}
                              >
                                <FileIcon name={name} />
                                <span className="truncate">{name}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => onSectionChange(file.section)}
                    className={cn(treeRow(appState.section === file.section), "pl-6")}
                  >
                    <FileIcon name={file.name} />
                    {file.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Editor header: tabs + breadcrumb (desktop), title bar + file strip (mobile) */}
      <header
        className={cn(
          "fixed right-0 top-0 z-30 border-b border-border bg-[hsl(var(--chrome-2))]",
          explorerOpen ? "left-0 lg:left-72" : "left-0 lg:left-12",
        )}
      >
        {/* Mobile title bar */}
        <div className="flex h-12 items-center justify-between border-b border-border bg-[hsl(var(--chrome))] px-3 lg:hidden">
          <span className="font-mono text-sm text-sidebar-foreground">
            <span className="syn-keyword">~/</span>ahmed-almoselhy
          </span>
          <ThemeToggle />
        </div>

        {/* Mobile: all files as a scrollable strip (primary navigation) */}
        <nav aria-label="Files" className="flex overflow-x-auto lg:hidden">
          {files.map((file) => {
            const active =
              appState.section === file.section ||
              (file.section === "projects" && appState.section === "project-detail");
            return (
              <button
                key={file.section}
                onClick={() => onSectionChange(file.section)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-1 border-r border-border px-3 font-mono text-[13px]",
                  active
                    ? "bg-background text-portfolio-white shadow-[inset_0_2px_0_hsl(var(--portfolio-highlight))]"
                    : "text-portfolio-slate",
                )}
              >
                <FileIcon name={file.name} />
                {file.name}
              </button>
            );
          })}
        </nav>

        {/* Desktop: open tabs */}
        <div role="tablist" aria-label="Open editors" className="hidden h-[35px] overflow-x-auto lg:flex">
          {tabs.map((tab) => {
            const file = fileFor(tab);
            const active = file.key === current.key;
            return (
              <div
                key={file.key}
                className={cn(
                  "group flex shrink-0 items-center border-r border-border font-mono text-[13px]",
                  active
                    ? "bg-background text-portfolio-white shadow-[inset_0_1px_0_hsl(var(--portfolio-highlight))]"
                    : "text-portfolio-slate hover:text-portfolio-white",
                )}
              >
                <button role="tab" aria-selected={active} onClick={() => open(tab)} className="flex h-full items-center gap-1 pl-3 pr-1">
                  <FileIcon name={file.name} />
                  {file.name}
                </button>
                <button
                  onClick={() => closeTab(tab)}
                  aria-label={`Close ${file.name}`}
                  className={cn(
                    "mr-1 grid h-6 w-6 place-items-center rounded hover:bg-muted",
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                  )}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Breadcrumb */}
        <div className="hidden h-[26px] items-center gap-1 bg-background px-4 font-mono text-xs text-portfolio-slate lg:flex">
          {current.path.map((part, i) => (
            <React.Fragment key={part}>
              {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
              <span className={i === current.path.length - 1 ? "text-portfolio-white" : undefined}>{part}</span>
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Editor content */}
      <div className={cn("pb-6 pt-[92px] lg:pt-[61px]", explorerOpen ? "lg:pl-72" : "lg:pl-12")}>{children}</div>

      {/* Status bar */}
      <footer className="fixed inset-x-0 bottom-0 z-50 flex h-6 items-center justify-between bg-[hsl(var(--statusbar))] px-2 font-mono text-[11px] text-[hsl(var(--statusbar-foreground))]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <GitBranch size={12} aria-hidden="true" /> main
          </span>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" /> open to work
          </span>
          <span className="hidden md:inline">Cairo, EG</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline">UTF-8</span>
          <span>{current.lang}</span>
          <span className="hidden sm:inline">© {new Date().getFullYear()} Ahmed AlMoselhy</span>
        </div>
      </footer>
    </>
  );
};

export default IdeShell;
