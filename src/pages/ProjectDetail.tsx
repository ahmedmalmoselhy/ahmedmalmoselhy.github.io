import React from "react";
import Layout from "@/components/Layout";
import { ExternalLink, Github, Calendar, ArrowLeft, Mail } from "lucide-react";
import ContactForDemo from "@/components/ContactForDemo";
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
            <h1 className="page-title text-[clamp(2rem,5vw,3.25rem)]">
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
        

        <div className="max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-8 text-portfolio-highlight hover:text-portfolio-highlight/80 animate-fade-in hover:bg-portfolio-highlight/10 -ml-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>

          <div className="panel animate-slide-up p-6 md:p-10 space-y-10">
            {/* Header */}
            <div className="border-b border-portfolio-slate/10 pb-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <h1 className="page-title text-[clamp(2rem,5vw,3.25rem)]">
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
                <span className="w-1 h-6 rounded-full bg-portfolio-highlight"></span>
                About this project
              </h2>
              <p className="text-portfolio-lightSlate text-lg leading-relaxed">
                {project.extendedDescription}
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-portfolio-white flex items-center gap-2">
                <span className="w-1 h-6 rounded-full bg-portfolio-highlight"></span>
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="chip text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-portfolio-slate/10 mt-8">
              {project.monetized ? (
                <ContactForDemo
                  title={project.title}
                  className="btn-primary"
                >
                  <Mail size={20} />
                  <span>Request a Demo / Buy an Installation</span>
                </ContactForDemo>
              ) : (
                project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github size={20} />
                    <span>View Source Code</span>
                  </a>
                )
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
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
