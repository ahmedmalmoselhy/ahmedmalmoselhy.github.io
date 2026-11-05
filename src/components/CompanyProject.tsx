import React from "react";
import { statusLabels, type Project } from "@/data/projects";
import { calculateDuration } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

/** "Period · duration" in small slate text */
export const Period: React.FC<{ period: string }> = ({ period }) => {
  const duration = calculateDuration(period);
  return (
    <span className="font-mono text-xs text-faint">
      {period}
      {duration && ` · ${duration}`}
    </span>
  );
};

/** Plain bullet list: slate text, small square markers */
export const Bullets: React.FC<{ items: string[]; marker?: string }> = ({ items, marker = "marker:text-primary/60" }) => (
  <ul className={cn("mt-3 list-[square] space-y-1.5 pl-5 leading-relaxed text-portfolio-lightSlate", marker)}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

/** Green pulsing dot for ongoing work, grey for completed, amber for on hold */
export const StatusDot: React.FC<{ status: Project["status"] }> = ({ status }) => (
  <span className="flex items-center gap-1.5 font-mono text-xs text-portfolio-slate">
    <i className={cn("live-dot", status !== "in-progress" && "bg-faint after:hidden", status === "on-hold" && "bg-warn")} />
    {statusLabels[status].toLowerCase()}
  </span>
);

/** A company project as a split panel: identity on the left, the work on the right. */
export const CompanyProjectCard: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => {
  const meta = [project.period, project.workType, project.location].filter(Boolean);
  const initials = project.title
    .split(/[\s-]+/)
    .filter((w) => /^[A-Z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <article className="grid overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50 md:grid-cols-[17rem_1fr]">
      <div className="flex flex-col gap-3 border-b border-border bg-muted/50 p-6 md:border-b-0 md:border-r">
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" className="aspect-[16/9] w-full rounded-md border border-border object-cover" />
        ) : project.logo ? (
          <img src={project.logo} alt="" className="h-14 w-14 rounded-md border border-border bg-white object-contain p-1" />
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-md border border-border bg-muted font-mono text-base font-semibold text-primary">
            {initials}
          </span>
        )}
        <h3 className="text-xl font-semibold leading-tight">
          <button onClick={onOpen} className="text-left hover:text-portfolio-highlight">
            {project.title}
          </button>
        </h3>
        <p className="text-sm text-portfolio-slate">{project.client ? `for ${project.client}` : "Internal project"}</p>
        <StatusDot status={project.status} />
        {(project.role || meta.length > 0) && (
          <div className="mt-auto pt-3">
            {project.role && <p className="text-sm font-medium">{project.role}</p>}
            {meta.length > 0 && <p className="mt-1 font-mono text-xs text-faint">{meta.join(" · ")}</p>}
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="mb-4 leading-relaxed text-portfolio-lightSlate">{project.description}</p>
        <ul className="list-[square] space-y-1.5 pl-5 text-sm leading-relaxed text-portfolio-lightSlate marker:text-primary/60">
          {(project.highlights ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {project.technologies && (
          <p className="mt-5 border-t border-border pt-3 font-mono text-xs text-muted-foreground">
            {project.technologies.join(" · ")}
          </p>
        )}
      </div>
    </article>
  );
};
