import React from "react";
import { cn } from "@/lib/utils";
import { statusLabels } from "@/data/projects";
import type { Project } from "@/data/projects";

/** Editor-style block: numbered gutter + one row per line (lines may contain links/buttons). */
export const CodeView: React.FC<{ lines: React.ReactNode[]; className?: string }> = ({ lines, className }) => (
  <div className={cn("py-3 font-mono text-[13px] leading-6 md:text-sm md:leading-7", className)}>
    {lines.map((line, i) => (
      <div key={i} className="flex hover:bg-muted/40">
        <span className="syn-comment w-10 shrink-0 select-none pr-4 text-right opacity-70 md:w-12" aria-hidden="true">
          {i + 1}
        </span>
        <span className="min-w-0 flex-1 whitespace-pre-wrap pr-4 [overflow-wrap:anywhere]">{line || " "}</span>
      </div>
    ))}
  </div>
);

interface FileHeaderProps {
  /** Shown as a // comment above the title, e.g. the file path */
  comment: string;
  keyword: string;
  name: string;
  description?: string;
  actions?: React.ReactNode;
}

/** Top of each page, written like the first lines of a source file. */
export const FileHeader: React.FC<FileHeaderProps> = ({ comment, keyword, name, description, actions }) => (
  <header className="mb-10 border-b border-border pb-8 animate-fade-in">
    <p className="syn-comment font-mono text-sm">// {comment}</p>
    <h1 className="mt-3 font-mono text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-tight">
      <span className="syn-keyword">{keyword}</span> <span className="syn-fn">{name}</span>
      <span className="text-portfolio-slate"> =</span>
      <span className="caret" aria-hidden="true" />
    </h1>
    {description && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-portfolio-slate">{description}</p>}
    {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
  </header>
);

/** Editor-tab style title bar across the top of a panel. */
export const PanelBar: React.FC<{ children: React.ReactNode; right?: React.ReactNode; className?: string }> = ({
  children,
  right,
  className,
}) => (
  <div
    className={cn(
      "flex items-center justify-between gap-3 border-b border-border bg-[hsl(var(--chrome-2))] px-3 py-1.5 font-mono text-xs text-portfolio-slate",
      className,
    )}
  >
    <span className="min-w-0 truncate">{children}</span>
    {right && <span className="shrink-0">{right}</span>}
  </div>
);

/** Section heading styled as a code comment block. */
export const CodeHeading: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <h2 id={id} className="mb-6 flex items-center gap-3 font-mono text-lg font-semibold text-portfolio-white md:text-xl">
    <span className="syn-comment" aria-hidden="true">##</span>
    {children}
    <span className="h-px flex-1 bg-border" aria-hidden="true" />
  </h2>
);

/** `stack: ['a', 'b']` line; `max` truncates the list and notes how many were hidden. */
export const StackLine: React.FC<{ items: string[]; max?: number }> = ({ items, max = items.length }) => (
  <p className="font-mono text-xs leading-6">
    <span className="syn-keyword">stack</span>
    <span className="text-portfolio-slate">: [</span>
    {items.slice(0, max).map((t, i) => (
      <React.Fragment key={t}>
        {i > 0 && <span className="text-portfolio-slate">, </span>}
        <span className="syn-string">'{t}'</span>
      </React.Fragment>
    ))}
    {items.length > max && <span className="syn-comment"> /* +{items.length - max} */</span>}
    <span className="text-portfolio-slate">]</span>
  </p>
);

// Project status drawn with syntax colours so it reads in both themes
const statusTone: Record<Project["status"], string> = {
  completed: "syn-string",
  "in-progress": "syn-fn",
  "on-hold": "syn-number",
  archived: "syn-comment",
  new: "syn-keyword",
  planned: "syn-type",
  canceled: "text-destructive",
};

export const StatusLabel: React.FC<{ status: Project["status"] }> = ({ status }) => (
  <span className={cn("font-mono text-xs", statusTone[status])}>● {statusLabels[status]}</span>
);
