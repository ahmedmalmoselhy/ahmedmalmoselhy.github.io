import React, { useState } from "react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import PageHeader, { SectionHeading } from "@/components/PageHeader";
import FilterPills from "@/components/FilterPills";
import type { Navigate } from "@/App";
import { projectsData, kindLabels } from "@/data/projects";
import { companySlug } from "@/data/experience";
import GitHubGraph from "@/components/GitHubGraph";

interface ProjectsProps {
  onSectionChange?: Navigate;
}

type Kind = keyof typeof kindLabels;

const items = projectsData.map((project) => ({ kind: (project.kind ?? "personal") as Kind, project }));

const countKind = (kind: Kind) => items.filter((i) => i.kind === kind).length;

const stats = [
  { value: String(items.length), label: "Total projects" },
  { value: String(countKind("personal")), label: "Personal" },
  { value: String(countKind("client") + countKind("service")), label: "Client work & services" },
  { value: String(countKind("company")), label: "Company projects" },
];

// Only offer filters for types that actually appear, in the order they're defined
// (typed array, not an explicit JSX generic, which the dev-mode component tagger can't parse)
const filterOptions: (Kind | "all")[] = ["all", ...(Object.keys(kindLabels) as Kind[]).filter((k) => countKind(k) > 0)];

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
  const [filter, setFilter] = useState<Kind | "all">("all");
  const shown = items.filter((i) => filter === "all" || i.kind === filter);

  return (
    <Layout className="pt-0 md:pt-16">
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        description="Personal projects, client work, services, and the projects I've delivered at companies."
        stats={stats}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeading
          title="All projects"
          action={
            <FilterPills
              label="Filter projects by type"
              options={filterOptions}
              value={filter}
              onChange={setFilter}
              format={(k) => (k === "all" ? `all · ${items.length}` : `${kindLabels[k].toLowerCase()} · ${countKind(k)}`)}
            />
          }
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map(({ project }) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => onSectionChange?.("project-detail", project.id)}
              onCompany={project.company ? () => onSectionChange?.("company", companySlug(project.company!)) : undefined}
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
