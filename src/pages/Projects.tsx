import React from "react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { PageSection } from "@/App";
import { projectsData } from "@/data/projects";
import GitHubGraph from "@/components/GitHubGraph";

interface ProjectsProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
  return (
    <Layout className="pt-28">
      <section className="container mx-auto px-4 py-8 md:py-12">
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <span className="eyebrow mb-5 animate-fade-in">Portfolio</span>
          <h1 className="page-title mb-5 animate-slide-up">
            Featured <span className="text-portfolio-highlight">Works</span>
          </h1>
          <p className="text-lg leading-relaxed text-portfolio-slate animate-slide-up md:text-xl" style={{ animationDelay: "120ms" }}>
            A curated selection of projects demonstrating my expertise in
            full-stack development and system architecture.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => onSectionChange?.("project-detail", project.id)}
            />
          ))}
        </div>

        <div className="reveal mt-16">
          <GitHubGraph />
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
