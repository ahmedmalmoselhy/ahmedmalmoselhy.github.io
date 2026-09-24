import React, { useState } from "react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { BandStats, SectionHeading } from "@/components/PageHeader";
import { PageSection } from "@/App";
import { ArrowRight, Code2, Download, Mail, MapPin, RadioTower, Users } from "lucide-react";
import { projectsData } from "@/data/projects";
import { experiences, careerStartYear } from "@/data/experience";
import { certifications } from "@/data/certifications";

interface IndexProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

// Fisher-Yates shuffle, first 3
const pickRandomProjects = () => {
  const copy = [...projectsData];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
};

const stats = [
  { value: `${new Date().getFullYear() - careerStartYear}+`, label: "Years of experience" },
  { value: String(experiences.length), label: "Companies" },
  { value: String(projectsData.length), label: "Projects delivered" },
  { value: String(certifications.length), label: "Certifications" },
];

const capabilities = [
  {
    icon: RadioTower,
    title: "Telecom BSS",
    text: "Ericsson Order Care and Catalog Manager — development, integration, and L3 support for production telecom stacks.",
  },
  {
    icon: Users,
    title: "CRM solutions",
    text: "Creatio CRM customisation and business-process design that turns sales and service workflows into software.",
  },
  {
    icon: Code2,
    title: "Full-stack web",
    text: "Laravel, Node, and React applications — dashboards, portals, and packages built to be maintained.",
  },
];

const Index: React.FC<IndexProps> = ({ onSectionChange }) => {
  const [randomProjects] = useState(pickRandomProjects);

  return (
    <Layout className="pt-0 md:pt-16">
      {/* Profile band: navy in both themes */}
      <section className="bg-[hsl(var(--band))] text-white">
        <div className="container mx-auto px-4 pb-10 pt-[calc(6rem+env(safe-area-inset-top))] md:pt-16">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
            <img
              src="/Ahmed-AlMoselhy.png"
              alt="Portrait of Ahmed AlMoselhy"
              width={144}
              height={144}
              className="mx-auto h-28 w-28 rounded-full bg-white/10 object-cover ring-4 ring-[hsl(var(--band-accent))] ring-offset-4 ring-offset-[hsl(var(--band))] animate-fade-in md:mx-0 md:h-36 md:w-36"
            />

            <div className="text-center animate-slide-up md:text-left">
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight">
                Ahmed AlMoselhy
              </h1>
              <p className="mt-1 text-lg font-medium text-[hsl(var(--band-accent))]">
                Software Engineer · CRM &amp; Telecom Solutions
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-white/70 md:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} aria-hidden="true" /> Cairo, Egypt
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  Open to opportunities
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 animate-slide-up sm:flex-row md:flex-col" style={{ animationDelay: "120ms" }}>
              <button
                onClick={() => onSectionChange?.("contact")}
                className="btn-band"
              >
                <Mail size={17} aria-hidden="true" /> Contact me
              </button>
              <a
                href="/AhmedAlMoselhy.pdf"
                download
                className="btn-band-outline"
              >
                <Download size={17} aria-hidden="true" /> Download CV
              </a>
            </div>
          </div>

          <BandStats stats={stats} />
        </div>
      </section>

      {/* Employers strip */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-6 md:flex-row md:gap-10">
          <span className="eyebrow shrink-0 text-portfolio-slate">Experience with</span>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {experiences.map((exp) => (
              <li key={exp.company} className="flex items-center gap-2.5 text-sm font-medium text-portfolio-slate">
                {exp.logo && (
                  <img src={exp.logo} alt="" className="h-8 w-8 rounded bg-white object-contain p-0.5" loading="lazy" />
                )}
                {exp.company}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading eyebrow="What I do" title="Core capabilities" />
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <article key={title} className="panel reveal p-6">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-portfolio-highlight/10 text-portfolio-highlight">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-portfolio-white">{title}</h3>
              <p className="leading-relaxed text-portfolio-slate">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="container mx-auto px-4 pb-16 md:pb-20">
        <div className="panel reveal grid gap-8 p-6 md:grid-cols-[1fr_2fr] md:p-10">
          <div>
            <span className="eyebrow">About</span>
            <h2 className="mt-2 text-2xl font-semibold text-portfolio-white md:text-3xl">
              Detail-oriented engineer, end to end.
            </h2>
          </div>
          <div className="space-y-4 leading-relaxed text-portfolio-slate">
            <p>
              I'm a versatile Software Engineer with hands-on experience in
              full-stack development, CRM systems, and Telecom applications —
              with a track record across support levels and in building
              scalable web applications with modern technologies.
            </p>
            <p>
              My approach combines technical expertise with a user-centered
              focus, so the end product is both functional and intuitive.
              Outside of coding: gaming, reading, photography, and family.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => onSectionChange?.("resume")} className="btn-primary">
                View full resume <ArrowRight size={17} aria-hidden="true" />
              </button>
              <button onClick={() => onSectionChange?.("skills")} className="btn-secondary">
                Skills
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured projects"
          action={
            <button onClick={() => onSectionChange?.("projects")} className="btn-secondary">
              View all projects <ArrowRight size={17} aria-hidden="true" />
            </button>
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {randomProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => onSectionChange?.("project-detail", project.id)}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
