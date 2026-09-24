import React, { useState } from "react";
import Layout from "@/components/Layout";
import SocialSidebar from "@/components/SocialSidebar";
import ProjectCard from "@/components/ProjectCard";
import { useTypingOnce } from "@/hooks/use-typing-once";
import { PageSection } from "@/App";
import { ArrowRight, FileText, Mail, Terminal } from "lucide-react";
import { projectsData } from "@/data/projects";

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

const Index: React.FC<IndexProps> = ({ onSectionChange }) => {
  const [randomProjects] = useState(pickRandomProjects);
  const { displayText: typedText, isComplete } = useTypingOnce(
    "I build software!",
    100,
  );

  return (
    <Layout className="pt-20">
      <SocialSidebar />

      {/* Hero */}
      <section className="container mx-auto grid min-h-[calc(100dvh-5rem)] items-center gap-12 px-4 py-12 md:grid-cols-[1.25fr_1fr] md:py-0">
        <div className="order-2 text-center md:order-1 md:text-left">
          <span className="eyebrow mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work
          </span>

          <h1
            className="mb-4 font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.02] text-portfolio-white animate-slide-up"
            style={{ animationDelay: "80ms" }}
          >
            Ahmed AlMoselhy
          </h1>

          <p
            className="mb-6 min-h-[1.2em] font-mono text-[clamp(1.25rem,3.5vw,2.25rem)] font-medium text-portfolio-slate"
            aria-label="I build software!"
          >
            <span className="text-portfolio-highlight" aria-hidden="true">$ </span>
            {typedText}
            {!isComplete && (
              <span className="ml-1 inline-block h-[0.9em] w-0.5 animate-pulse bg-portfolio-slate align-middle" />
            )}
          </p>

          <p
            className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-portfolio-slate animate-slide-up md:mx-0"
            style={{ animationDelay: "200ms" }}
          >
            Software engineer building exceptional digital experiences —
            full-stack web, CRM platforms, and telecom systems — with a focus on
            accessible, human-centered products.
          </p>

          <div
            className="flex flex-col justify-center gap-3 animate-slide-up sm:flex-row md:justify-start"
            style={{ animationDelay: "300ms" }}
          >
            <button onClick={() => onSectionChange?.("contact")} className="btn-primary">
              <Mail size={18} aria-hidden="true" />
              Get In Touch
            </button>
            <a href="/AhmedAlMoselhy.pdf" download className="btn-secondary">
              <FileText size={18} aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Portrait with offset frame */}
        <div className="order-1 flex justify-center md:order-2 animate-fade-in">
          <div className="group relative aspect-square w-48 sm:w-64 lg:w-80">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-portfolio-highlight transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
            <img
              src="/Ahmed-AlMoselhy.png"
              alt="Portrait of Ahmed AlMoselhy"
              width={320}
              height={320}
              className="relative h-full w-full rounded-2xl border border-border bg-card object-cover"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="panel reveal mx-auto max-w-4xl p-8 md:p-12">
          <span className="eyebrow mb-4">
            <Terminal size={14} aria-hidden="true" /> About me
          </span>
          <h2 className="mb-6 text-3xl font-bold text-portfolio-white md:text-4xl">
            Detail-oriented engineer, end to end.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-portfolio-slate">
            <p>
              I'm a versatile Software Engineer with extensive hands-on
              experience in full-stack development, CRM systems, and Telecom
              applications — with a proven track record across support levels
              and in building scalable web applications with modern technologies.
            </p>
            <p>
              My approach combines technical expertise with a user-centered
              focus, so the end product is both functional and intuitive.
            </p>
            <p>
              Outside of coding, I enjoy gaming, reading, photography and being
              a family man — a well-rounded life brings fresh perspectives to
              technical challenges.
            </p>
          </div>
          <button onClick={() => onSectionChange?.("skills")} className="btn-secondary mt-8">
            Explore my skills <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Featured projects */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow mb-4">Selected work</span>
            <h2 className="text-3xl font-bold text-portfolio-white md:text-5xl">
              Featured <span className="text-portfolio-highlight">Projects</span>
            </h2>
          </div>
          <button onClick={() => onSectionChange?.("projects")} className="btn-secondary">
            View all <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
