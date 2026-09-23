import React from "react";
import Layout, { PageHeader } from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import GitHubGraph from "@/components/GitHubGraph";
import { PageSection } from "@/App";
import { projectsData } from "@/data/projects";

interface ProjectsProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
  return (
    <Layout>
      <PageHeader
        title="Projects"
        description="Products I sell, tools I've built, and experiments in full-stack development and system design."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={(id) => onSectionChange?.("project-detail", id)}
          />
        ))}
      </div>

      <div className="mt-16">
        <GitHubGraph />
      </div>
    </Layout>
  );
};

export default Projects;
