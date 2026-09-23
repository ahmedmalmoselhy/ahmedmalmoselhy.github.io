import React from "react";
import Layout from "@/components/Layout";
import { ProjectStatus } from "@/components/ProjectCard";
import ContactForDemo from "@/components/ContactForDemo";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronLeft, Github, Mail } from "lucide-react";
import { projectsData } from "@/data/projects";

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
}

const buttonClass = "rounded-full px-6 text-callout";

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
  const project = projectsData.find((p) => p.id === projectId);

  const back = (
    <button
      onClick={onBack}
      className="-ml-1.5 mb-6 inline-flex min-h-[44px] items-center text-body text-primary hover:underline"
    >
      <ChevronLeft aria-hidden size={22} /> Projects
    </button>
  );

  if (!project) {
    return (
      <Layout>
        {back}
        <h1 className="text-title1 font-bold">This project doesn't exist</h1>
        <p className="mt-3 text-body text-muted-foreground">
          It may have been removed. Go back to Projects to see everything that's listed.
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="mx-auto max-w-3xl">
        {back}

        <header>
          <ProjectStatus status={project.status} />
          <h1 className="mt-2 text-largetitle font-bold">{project.title}</h1>
          <p className="mt-4 text-title3 text-muted-foreground">{project.description}</p>
          {project.date && (
            <p className="mt-3 text-footnote text-muted-foreground">
              Updated{" "}
              {new Date(project.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
              })}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {project.monetized ? (
              <ContactForDemo
                title={project.title}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-callout font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Mail aria-hidden size={18} /> Request a Demo or Installation
              </ContactForDemo>
            ) : (
              project.githubUrl && (
                <Button asChild size="lg" variant="secondary" className={buttonClass}>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden /> View Source Code
                  </a>
                </Button>
              )
            )}
            {project.liveUrl && (
              <Button asChild size="lg" className={buttonClass}>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit Live {project.demo ? "Demo" : "Site"} <ArrowUpRight aria-hidden />
                </a>
              </Button>
            )}
          </div>
        </header>

        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="mt-10 w-full rounded-3xl bg-secondary"
        />

        <section aria-labelledby="about-project" className="mt-12">
          <h2 id="about-project" className="text-title2 font-bold">About This Project</h2>
          <p className="mt-4 text-body text-muted-foreground">{project.extendedDescription}</p>
        </section>

        <section aria-labelledby="technologies" className="mt-12">
          <h2 id="technologies" className="text-title2 font-bold">Technologies</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded-full bg-card px-3.5 py-1.5 text-subhead">
                {tech}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Layout>
  );
};

export default ProjectDetail;
