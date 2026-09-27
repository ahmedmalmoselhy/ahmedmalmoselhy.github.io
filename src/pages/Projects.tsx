import React, { useState } from "react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import PageHeader, { SectionHeading } from "@/components/PageHeader";
import FilterPills from "@/components/FilterPills";
import { PageSection } from "@/App";
import { projectsData, statusLabels, type Project } from "@/data/projects";
import GitHubGraph from "@/components/GitHubGraph";

interface ProjectsProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

type Status = Project["status"];

const countStatus = (status: Status) => projectsData.filter((p) => p.status === status).length;

const stats = [
  { value: String(projectsData.length), label: "Total projects" },
  { value: String(countStatus("completed")), label: "Completed" },
  { value: String(countStatus("in-progress")), label: "In progress" },
  { value: String(new Set(projectsData.flatMap((p) => p.technologies)).size), label: "Technologies used" },
];

// Only offer filters for statuses that actually appear, in the order they're defined
const statuses = (Object.keys(statusLabels) as Status[]).filter((s) => countStatus(s) > 0);
// Typed array (not an explicit JSX generic, which the dev-mode component tagger can't parse)
const filterOptions: (Status | "all")[] = ["all", ...statuses];

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
  const [filter, setFilter] = useState<Status | "all">("all");
  const shown = projectsData.filter((p) => filter === "all" || p.status === filter);

  return (
    <Layout className="pt-0 md:pt-16">
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        description="Side projects, packages and products I can show publicly. Client work lives on the resume."
        stats={stats}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeading
          title="All projects"
          action={
            <FilterPills
              label="Filter projects by status"
              options={filterOptions}
              value={filter}
              onChange={setFilter}
              format={(s) => (s === "all" ? `all · ${projectsData.length}` : `${statusLabels[s].toLowerCase()} · ${countStatus(s)}`)}
            />
          }
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => onSectionChange?.("project-detail", project.id)}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <SectionHeading title="GitHub activity" />
        <div className="reveal">
          <GitHubGraph />
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
