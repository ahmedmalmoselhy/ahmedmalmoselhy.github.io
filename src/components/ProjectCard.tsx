import React from "react";
import { ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import ContactForDemo from "@/components/ContactForDemo";
import { cn } from "@/lib/utils";
import { kindLabels, statusLabels } from "@/data/projects";
import { tiltHandlers } from "@/lib/pointer";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
  /** For company projects: opens the company's page */
  onCompany?: () => void;
  style?: React.CSSProperties;
}

const linkClass =
  "relative z-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-portfolio-slate transition-colors hover:text-portfolio-highlight";

/** Category colour (an hsl triplet variable) for the card's top line and category text */
const kindColor: Record<keyof typeof kindLabels, string> = {
  personal: "var(--muted-foreground)",
  client: "var(--c-web)",
  service: "var(--c-crm)",
  company: "var(--primary)",
};

const kindText: Record<keyof typeof kindLabels, string> = {
  personal: "Personal project",
  client: "Client work",
  service: "Service",
  company: "Company work",
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen, onCompany, style }) => {
  const kind = project.kind ?? "personal";
  return (
  <article
    // Full-width top line in the category colour (card-dev otherwise shows a short stub until hover)
    className="card-dev reveal group h-full cursor-pointer before:scale-x-100"
    {...tiltHandlers}
    style={{ ...style, "--c": kindColor[kind] } as React.CSSProperties}
    onClick={onOpen}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen();
      }
    }}
    aria-label={`View ${project.title} details`}
  >
    <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted">
      <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
    </div>

    <div className="flex flex-grow flex-col p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="text-[13px] font-semibold text-[hsl(var(--c))]">
          {kindText[kind]}
          {project.company && ` · ${project.company}`}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <i className={cn("live-dot", project.status !== "in-progress" && "bg-faint after:hidden")} />
          {statusLabels[project.status].toLowerCase()}
          {project.date && ` · ${project.date.slice(0, 4)}`}
        </span>
      </div>
      <h3 className="mt-1 text-lg font-semibold text-portfolio-white group-hover:text-portfolio-highlight">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-grow leading-relaxed text-portfolio-slate">{project.description}</p>
      <p className="mb-3 mt-4 font-mono text-xs text-muted-foreground">{project.technologies.slice(0, 5).join(" · ")}</p>

      <div className="flex items-center gap-4 border-t border-border pt-2">
        {project.company ? (
          <button
            type="button"
            className={linkClass}
            onClick={(e) => {
              e.stopPropagation();
              onCompany?.();
            }}
          >
            {project.company} page
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : project.monetized ? (
          <ContactForDemo title={project.title} className={linkClass}>
            <Mail size={16} aria-hidden="true" />
            Request a demo
          </ContactForDemo>
        ) : (
          project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              aria-label={`${project.title} source code on GitHub`}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} aria-hidden="true" />
              Code
            </a>
          )
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, "ml-auto")}
            aria-label={`${project.title} live ${project.demo ? "demo" : "site"}`}
            onClick={(e) => e.stopPropagation()}
          >
            Live {project.demo ? "Demo" : "Site"}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  </article>
  );
};

export default ProjectCard;
