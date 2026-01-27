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
      <section className="container mx-auto px-4 py-8 md:py-16 relative">
        {/* Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-portfolio-highlight to-transparent opacity-50"></div>

        <div className="max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-8 text-portfolio-highlight hover:text-portfolio-highlight/80 animate-fade-in hover:bg-portfolio-highlight/10 -ml-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>

          <div className="animate-fade-in bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 md:p-10 rounded-2xl shadow-xl space-y-10">
            {/* Header */}
            <div className="border-b border-portfolio-slate/10 pb-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-5xl font-bold text-portfolio-white">
                  {project.title}
                </h1>
                <Badge
                  variant="outline"
                  className={`text-sm font-mono py-1.5 px-3 border-none bg-opacity-20 ${statusStyles[project.status].replace('bg-', 'bg-opacity-10 bg-').replace('text-', 'text-')}`}
                >
                  {statusLabels[project.status]}
                </Badge>
              </div>

              {project.date && (
                <div className="flex items-center gap-2 text-portfolio-slate text-sm md:text-base">
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
            <div className="rounded-xl overflow-hidden border border-portfolio-slate/20 bg-portfolio-navy/50 shadow-lg">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-portfolio-white flex items-center gap-2">
                <span className="w-1 h-6 bg-portfolio-highlight rounded-full"></span>
                About this project
              </h2>
              <p className="text-portfolio-lightSlate text-lg leading-relaxed">
                {project.extendedDescription}
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-portfolio-white flex items-center gap-2">
                <span className="w-1 h-6 bg-portfolio-highlight rounded-full"></span>
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-portfolio-highlight font-mono text-sm bg-portfolio-navy/60 px-3 py-1.5 rounded-md border border-portfolio-highlight/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-portfolio-slate/10 mt-8">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 bg-transparent border-2 border-portfolio-slate/30 text-portfolio-slate hover:border-portfolio-highlight hover:text-portfolio-highlight font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-transparent hover:shadow-portfolio-highlight/10"
              >
                <Github size={20} />
                <span>View Source Code</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-8 bg-portfolio-highlight hover:bg-portfolio-highlight/90 text-portfolio-navy font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-portfolio-highlight/20"
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
