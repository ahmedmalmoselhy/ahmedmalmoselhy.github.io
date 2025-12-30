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

interface ProjectsProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-portfolio-white mb-4 md:mb-6 animate-fade-in">
            My Projects
          </h1>
          <p className="text-portfolio-lightSlate text-base md:text-lg animate-slide-up">
            Here's a selection of projects I've worked on. Each project
            represents different skills and technologies I've used to solve
            various challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {projectsData.map((project, index) => (
            <Card
              key={project.id}
              className="bg-portfolio-lightNavy border-portfolio-slate/20 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform duration-300 overflow-hidden animate-fade-in cursor-pointer group"
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
              <div className="h-32 md:h-48 bg-portfolio-navy/50 flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2 p-4 md:p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg md:text-xl font-semibold text-portfolio-white group-hover:text-portfolio-highlight transition-colors">
                    {project.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`text-xs font-mono ${statusStyles[project.status]}`}
                  >
                    {statusLabels[project.status] ??
                      project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="text-portfolio-lightSlate text-sm md:text-base">
                  {project.date && (
                    <div className="flex flex-wrap md:gap-2">
                      <span className="ml-auto text-portfolio-slate text-xs md:text-sm italic">
                        Last modified:{" "}
                        {new Date(project.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  )}
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-1 p-4 md:p-6 pt-0">
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-portfolio-navy/50 text-portfolio-highlight border-portfolio-highlight/30 font-mono text-xs py-0.5 md:py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3 text-portfolio-slate p-4 md:p-6">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-highlight flex items-center gap-1 transition-colors duration-200"
                  aria-label={`View ${project.title} source code on GitHub`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} className="md:size-18" />
                  <span className="text-xs md:text-sm">Code</span>
                </a>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-portfolio-highlight flex items-center gap-1 transition-colors duration-200"
                    aria-label={`View ${project.title} live ${project.demo ? "demo" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} className="md:size-18" />
                    <span className="text-xs md:text-sm">
                      Live {project.demo ? "Demo" : ""}
                    </span>
                  </a>
                ) : null}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
