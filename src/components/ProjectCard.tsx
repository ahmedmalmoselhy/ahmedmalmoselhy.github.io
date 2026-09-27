import React from "react";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import ContactForDemo from "@/components/ContactForDemo";
import { cn } from "@/lib/utils";
import { statusLabels } from "@/data/projects";
import { tiltHandlers } from "@/lib/pointer";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
  style?: React.CSSProperties;
}

const linkClass =
  "relative z-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-portfolio-slate transition-colors hover:text-portfolio-highlight";

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen, style }) => (
  <article
    className="card-dev reveal group h-full cursor-pointer"
    {...tiltHandlers}
    style={style}
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
    <div className="aspect-[16/9] overflow-hidden border-b border-border bg-muted">
      <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
    </div>

    <div className="flex flex-grow flex-col p-5">
      <p className="flex items-center gap-1.5 font-mono text-xs text-primary">
        <i className={cn("live-dot", project.status !== "in-progress" && "bg-faint after:hidden")} />
        {statusLabels[project.status].toLowerCase()}
        {project.date && ` · ${project.date.slice(0, 4)}`}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-portfolio-white group-hover:text-portfolio-highlight">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-grow leading-relaxed text-portfolio-slate">{project.description}</p>
      <p className="mb-3 mt-4 font-mono text-xs text-muted-foreground">{project.technologies.slice(0, 5).join(" · ")}</p>

      <div className="flex items-center gap-4 border-t border-border pt-2">
        {project.monetized ? (
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

export default ProjectCard;
