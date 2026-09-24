import React from "react";
import Layout from "@/components/Layout";
import { ExternalLink, Github, Mail } from "lucide-react";
import ContactForDemo from "@/components/ContactForDemo";
import { CodeHeading, FileHeader, PanelBar, StackLine, StatusLabel } from "@/components/CodeView";
import { PageSection } from "@/App";
import { cn, projectSlug } from "@/lib/utils";
import { projectsData } from "@/data/projects";
import GitHubGraph from "@/components/GitHubGraph";

interface ProjectsProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

const linkClass =
  "relative inline-flex min-h-10 items-center gap-1.5 font-mono text-xs text-portfolio-slate transition-colors hover:text-portfolio-highlight";

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
  return (
    <Layout>
      <FileHeader
        comment={`projects.ts — ${projectsData.length} entries`}
        keyword="export const"
        name="projects"
        description="A curated selection of work across full-stack development, CRM, and system architecture. Open any file for details."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projectsData.map((project) => {
          const open = () => onSectionChange?.("project-detail", project.id);
          return (
            <article
              key={project.id}
              className="panel card-interactive group flex flex-col overflow-hidden"
              onClick={open}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open();
                }
              }}
              aria-label={`Open ${project.title}`}
            >
              {/* File title bar */}
              <PanelBar right={<StatusLabel status={project.status} />}>
                <span className="syn-keyword">M↓ </span>
                {projectSlug(project.title)}.md
              </PanelBar>

              <div className="aspect-[16/9] overflow-hidden border-b border-border bg-muted">
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-lg font-semibold text-portfolio-white group-hover:text-portfolio-highlight">
                  {project.title}
                </h2>
                <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-portfolio-slate">
                  {project.description}
                </p>
                <div className="mt-3">
                  <StackLine items={project.technologies} max={4} />
                </div>

                <div className="mt-3 flex items-center gap-4 border-t border-border pt-1">
                  {project.monetized ? (
                    <ContactForDemo title={project.title} className={linkClass}>
                      <Mail size={14} aria-hidden="true" /> request-demo
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
                        <Github size={14} aria-hidden="true" /> source
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
                      {project.demo ? "demo" : "live"} <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-14">
        <CodeHeading>GitHub activity</CodeHeading>
        <GitHubGraph />
      </div>
    </Layout>
  );
};

export default Projects;
