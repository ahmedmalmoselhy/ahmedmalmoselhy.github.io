import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import ContactForDemo from "@/components/ContactForDemo";
import { cn } from "@/lib/utils";
import { statusStyles, statusLabels, type Project } from "@/data/projects";

/** Status as a colored dot plus its label, so color is never the only signal. */
export const ProjectStatus: React.FC<{ status: Project["status"]; className?: string }> = ({
  status,
  className,
}) => (
  <span className={cn("inline-flex items-center gap-1.5 text-footnote font-semibold", statusStyles[status], className)}>
    <span aria-hidden className="h-2 w-2 rounded-full bg-current" />
    {statusLabels[status]}
  </span>
);

const linkClass =
  "relative z-10 inline-flex min-h-[44px] items-center gap-1 text-subhead font-medium text-primary hover:underline";

interface ProjectCardProps {
  project: Project;
  onOpen: (id: number) => void;
}

/**
 * The title button stretches over the whole card, so the card opens the
 * project while its footer links stay separate, focusable controls.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen }) => (
  <article className="surface relative flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
    <div className="aspect-[16/10] overflow-hidden bg-secondary">
      <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover" />
    </div>

    <div className="flex flex-grow flex-col p-6">
      <ProjectStatus status={project.status} />
      <h3 className="mt-2 text-title3 font-semibold">
        <button
          onClick={() => onOpen(project.id)}
          className="text-left after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
        </button>
      </h3>
      <p className="mt-2 line-clamp-3 text-callout text-muted-foreground">{project.description}</p>
      <p className="mt-4 text-footnote text-muted-foreground">
        {project.technologies.slice(0, 4).join(" · ")}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-4">
        {project.monetized ? (
          <ContactForDemo title={project.title} className={linkClass}>
            <Mail aria-hidden size={16} /> Request a Demo
          </ContactForDemo>
        ) : (
          project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className={linkClass}
            >
              Source Code <ArrowUpRight aria-hidden size={16} />
            </a>
          )
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live ${project.demo ? "demo" : "site"}`}
            className={linkClass}
          >
            {project.demo ? "Live Demo" : "Live Site"} <ArrowUpRight aria-hidden size={16} />
          </a>
        )}
      </div>
    </div>
  </article>
);

export default ProjectCard;
