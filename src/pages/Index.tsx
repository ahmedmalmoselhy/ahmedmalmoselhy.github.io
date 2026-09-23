import React from "react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/App";
import { ChevronRight, Download } from "lucide-react";
import { projectsData } from "@/data/projects";

interface IndexProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

// Newest first, by last-modified date.
const recentProjects = [...projectsData]
  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
  .slice(0, 3);

const Index: React.FC<IndexProps> = ({ onSectionChange }) => {
  return (
    <Layout>
      {/* Hero */}
      <section className="grid items-center gap-10 pb-20 pt-4 md:grid-cols-[3fr_2fr] md:gap-16 md:pb-28 md:pt-12">
        <div>
          <p className="text-headline text-primary">Software Engineer</p>
          <h1 className="mt-3 text-largetitle font-bold">
            Ahmed AlMoselhy.{" "}
            <span className="text-muted-foreground">
              I build the systems businesses run on.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-title3 text-muted-foreground">
            CRM platforms, telecom order management, and full-stack web apps
            in Laravel, from first schema to production support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => onSectionChange?.("contact")}
              className="rounded-full px-6 text-callout"
            >
              Contact Me
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full px-6 text-callout"
            >
              <a href="/AhmedAlMoselhy.pdf" download>
                <Download aria-hidden /> Download Resume
              </a>
            </Button>
          </div>
        </div>
        <img
          src="/Ahmed-AlMoselhy.png"
          alt="Portrait of Ahmed AlMoselhy"
          className="mx-auto aspect-square w-full max-w-xs rounded-[2rem] bg-secondary object-cover md:max-w-sm"
        />
      </section>

      {/* About */}
      <section aria-labelledby="about" className="pb-20 md:pb-28">
        <h2 id="about" className="text-title1 font-bold">About</h2>
        <div className="mt-6 max-w-3xl space-y-5 text-body text-muted-foreground">
          <p>
            I'm a detail-oriented software engineer with hands-on experience in
            full-stack development, CRM systems, and telecom applications. I've
            worked across support levels and built scalable web applications
            with modern technologies.
          </p>
          <p>
            I aim for efficient, elegant solutions, pairing technical depth
            with a focus on the people who use the product, so the result is
            both functional and intuitive.
          </p>
          <p>
            Outside of work I enjoy gaming, reading, photography, and time with
            my family. A life outside the editor brings fresh perspective to
            technical problems.
          </p>
        </div>
        <button
          onClick={() => onSectionChange?.("skills")}
          className="mt-6 inline-flex min-h-[44px] items-center gap-0.5 text-body text-primary hover:underline"
        >
          See My Skills <ChevronRight aria-hidden size={18} />
        </button>
      </section>

      {/* Recent projects */}
      <section aria-labelledby="recent-projects">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="recent-projects" className="text-title1 font-bold">
            Recent Projects
          </h2>
          <button
            onClick={() => onSectionChange?.("projects")}
            className="inline-flex min-h-[44px] items-center gap-0.5 text-body text-primary hover:underline"
          >
            See All <ChevronRight aria-hidden size={18} />
          </button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={(id) => onSectionChange?.("project-detail", id)}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
