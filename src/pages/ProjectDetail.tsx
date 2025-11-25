import React from "react";
import Layout from "@/components/Layout";
import { ExternalLink, Github, Calendar, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsData, statusStyles, statusLabels } from "@/data/projects";

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <Layout>
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={onBack}
              variant="ghost"
              className="mb-8 text-portfolio-highlight hover:text-portfolio-highlight/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            <h1 className="text-3xl md:text-5xl font-bold text-portfolio-white">
              Project not found
            </h1>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-8 text-portfolio-highlight hover:text-portfolio-highlight/80 animate-fade-in"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>

          <div className="animate-fade-in space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-5xl font-bold text-portfolio-white">
                  {project.title}
                </h1>
                <Badge
                  variant="outline"
                  className={`text-sm font-mono ${statusStyles[project.status]}`}
                >
                  {statusLabels[project.status]}
                </Badge>
              </div>

              {project.date && (
                <div className="flex items-center gap-2 text-portfolio-slate text-sm md:text-base mb-6">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Last modified:{" "}
                    {new Date(project.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Project Image */}
            <div className="rounded-lg overflow-hidden border border-portfolio-slate/20 bg-portfolio-navy/50">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-portfolio-white">
                About this project
              </h2>
              <p className="text-portfolio-lightSlate text-lg leading-relaxed">
                {project.extendedDescription}
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-portfolio-white">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-portfolio-navy/50 text-portfolio-highlight border-portfolio-highlight/30 font-mono text-sm py-2 px-4"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-portfolio-navy border border-portfolio-slate/30 text-portfolio-white hover:border-portfolio-highlight hover:text-portfolio-highlight transition-colors duration-200 rounded-lg"
              >
                <Github size={20} />
                <span>View Source Code</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-portfolio-highlight text-portfolio-navy hover:bg-portfolio-highlight/90 transition-colors duration-200 rounded-lg font-semibold"
                >
                  <ExternalLink size={20} />
                  <span>View Live {project.demo ? "Demo" : "Site"}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
