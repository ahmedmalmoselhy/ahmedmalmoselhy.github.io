import React from "react";
import Layout from "@/components/Layout";
import { ArrowLeft, ExternalLink, Github, Mail } from "lucide-react";
import ContactForDemo from "@/components/ContactForDemo";
import { CodeHeading, PanelBar, StackLine, StatusLabel } from "@/components/CodeView";
import { projectsData } from "@/data/projects";
import { projectSlug } from "@/lib/utils";

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
}

const BackButton = ({ onBack }: { onBack: () => void }) => (
  <button onClick={onBack} className="btn-secondary mb-8">
    <ArrowLeft size={16} aria-hidden="true" /> cd ../projects
  </button>
);

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <Layout className="max-w-4xl">
        <BackButton onBack={onBack} />
        <p className="syn-comment font-mono text-sm">// error: ENOENT</p>
        <h1 className="mt-2 font-mono text-3xl font-semibold text-portfolio-white">Project not found</h1>
      </Layout>
    );
  }

  const file = `${projectSlug(project.title)}.md`;

  return (
    <Layout className="max-w-4xl">
      <BackButton onBack={onBack} />

      <header className="mb-8 border-b border-border pb-6 animate-fade-in">
        <p className="syn-comment font-mono text-sm">// projects/{file}</p>
        <h1 className="mt-2 text-[clamp(1.75rem,5vw,2.5rem)] font-semibold leading-tight text-portfolio-white">
          <span className="syn-keyword font-mono"># </span>
          {project.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <StatusLabel status={project.status} />
          {project.date && (
            <span className="syn-comment font-mono text-xs">
              last modified{" "}
              {new Date(project.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </span>
          )}
        </div>
      </header>

      <figure className="panel mb-10 overflow-hidden">
        <PanelBar>assets/{projectSlug(project.title)}.png</PanelBar>
        <img src={project.image} alt={`${project.title} screenshot`} className="h-auto w-full object-cover" />
      </figure>

      <section className="mb-10">
        <CodeHeading>about</CodeHeading>
        <p className="text-lg leading-relaxed text-portfolio-lightSlate">{project.extendedDescription}</p>
      </section>

      <section className="mb-10">
        <CodeHeading>stack</CodeHeading>
        <div className="panel p-4">
          <StackLine items={project.technologies} />
        </div>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        {project.monetized ? (
          <ContactForDemo title={project.title} className="btn-primary">
            <Mail size={16} aria-hidden="true" /> Request a demo / installation
          </ContactForDemo>
        ) : (
          project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Github size={16} aria-hidden="true" /> git clone
            </a>
          )
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <ExternalLink size={16} aria-hidden="true" /> open {project.demo ? "demo" : "live site"}
          </a>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetail;
