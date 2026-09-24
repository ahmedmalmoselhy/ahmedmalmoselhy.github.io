import React from "react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import PageHeader, { SectionHeading } from "@/components/PageHeader";
import { PageSection } from "@/App";
import { projectsData } from "@/data/projects";
import GitHubGraph from "@/components/GitHubGraph";

interface ProjectsProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

const countStatus = (status: string) => projectsData.filter((p) => p.status === status).length;

const stats = [
  { value: String(projectsData.length), label: "Total projects" },
  { value: String(countStatus("completed")), label: "Completed" },
  { value: String(countStatus("in-progress")), label: "In progress" },
  { value: String(new Set(projectsData.flatMap((p) => p.technologies)).size), label: "Technologies used" },
];

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
  return (
    <Layout className="pt-0 md:pt-16">
      <PageHeader
        eyebrow="Portfolio"
        title="Projects"
        description="A curated selection of work across full-stack development, CRM, and system architecture."
        stats={stats}
      />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading eyebrow="All work" title="Project catalogue" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => onSectionChange?.("project-detail", project.id)}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <SectionHeading eyebrow="Open source" title="GitHub activity" />
        <div className="reveal">
          <GitHubGraph />
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
