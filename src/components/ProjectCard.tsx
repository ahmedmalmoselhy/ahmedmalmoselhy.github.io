import React from "react";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import ContactForDemo from "@/components/ContactForDemo";
import { cn } from "@/lib/utils";
import { statusStyles, statusLabels } from "@/data/projects";
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
    className="panel card-interactive reveal group flex h-full flex-col overflow-hidden"
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
    <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
      <img
        src={project.image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-md">
        <span className={cn(statusStyles[project.status], "h-1.5 w-1.5 rounded-full bg-current")} />
        {statusLabels[project.status]}
      </span>
      <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
        <ArrowUpRight size={18} aria-hidden="true" />
      </span>
    </div>

    <div className="flex flex-grow flex-col p-6">
      <h3 className="mb-2 text-xl font-bold text-portfolio-white transition-colors group-hover:text-portfolio-highlight">
        {project.title}
      </h3>
      <p className="mb-5 line-clamp-3 flex-grow leading-relaxed text-portfolio-slate">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-1 py-1 font-mono text-xs text-portfolio-slate">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>

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
