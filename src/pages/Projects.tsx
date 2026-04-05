import React from "react";
import Layout from "@/components/Layout";
import { ExternalLink, Github } from "lucide-react";
import { PageSection } from "@/App";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectsData, statusStyles, statusLabels } from "@/data/projects";
import type { Project } from "@/data/projects";
import GitHubGraph from "@/components/GitHubGraph";

interface ProjectsProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-8 md:py-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-portfolio-highlight to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-portfolio-white mb-6 animate-fade-in tracking-tight">
            Featured <span className="text-portfolio-highlight">Works</span>
          </h1>
          <p className="text-portfolio-lightSlate text-lg md:text-xl animate-slide-up leading-relaxed max-w-2xl mx-auto">
            A curated selection of projects demonstrating my expertise in
            full-stack development and system architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((project, index) => (
            <Card
              key={project.id}
              className="relative bg-portfolio-lightNavy/30 backdrop-blur-sm border-portfolio-slate/10 hover:border-portfolio-highlight/30 hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fade-in cursor-pointer group shadow-lg shadow-transparent hover:shadow-portfolio-highlight/5"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onSectionChange?.("project-detail", project.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSectionChange?.("project-detail", project.id);
                }
              }}
              aria-label={`View ${project.title} details`}
            >
              <div className="h-48 md:h-56 bg-portfolio-navy/50 flex items-center justify-center overflow-hidden relative group-hover:border-b border-portfolio-highlight/10">
                <div className="absolute inset-0 bg-portfolio-navy/20 group-hover:bg-transparent transition-all duration-300 z-10"></div>
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="pb-2 p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <CardTitle className="text-xl md:text-2xl font-bold text-portfolio-white group-hover:text-portfolio-highlight transition-colors">
                    {project.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`text-xs font-mono py-1 px-2 border-none bg-opacity-20 ${statusStyles[project.status].replace('bg-', 'bg-opacity-10 bg-').replace('text-', 'text-')}`}
                  >
                    {statusLabels[project.status] ??
                      project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="text-portfolio-lightSlate text-base leading-relaxed line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-1 p-6 pt-0 flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="text-portfolio-highlight/90 font-mono text-xs bg-portfolio-highlight/5 px-2.5 py-1 rounded-md border border-portfolio-highlight/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-portfolio-slate font-mono text-xs px-2 py-1">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-4 p-6 pt-2 border-t border-portfolio-slate/5 mt-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-slate hover:text-portfolio-highlight flex items-center gap-2 text-sm transition-colors"
                  aria-label={`View ${project.title} source code on GitHub`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                  <span>Code</span>
                </a>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-portfolio-slate hover:text-portfolio-highlight flex items-center gap-2 text-sm transition-colors ml-auto"
                    aria-label={`View ${project.title} live ${project.demo ? "demo" : ""} `}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={16} />
                  </a>
                ) : null}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <GitHubGraph />
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
