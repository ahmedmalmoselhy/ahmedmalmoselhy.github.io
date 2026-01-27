import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SocialSidebar from "@/components/SocialSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTypingOnce } from "@/hooks/use-typing-once";
import { PageSection } from "@/App";
import {
  Mail,
  FileText,
  User,
  Briefcase,
  Github,
  Code,
  Database,
  Server,
  ExternalLink,
} from "lucide-react";

import { projectsData, statusStyles, statusLabels } from "@/data/projects";
import type { Project } from "@/data/projects";

interface IndexProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

const Index: React.FC<IndexProps> = ({ onSectionChange }) => {
  const [randomProjects, setRandomProjects] = useState<Project[]>([]);
  const { displayText: typedText, isComplete } = useTypingOnce(
    "I build software!",
    100,
  );

  useEffect(() => {
    // Function to get 3 random projects from the projectsData array
    const getRandomProjects = () => {
      // Create a copy of the projects array to avoid mutating the original
      const projectsCopy = [...projectsData];
      // Shuffle the array using Fisher-Yates (Knuth) shuffle algorithm
      for (let i = projectsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [projectsCopy[i], projectsCopy[j]] = [projectsCopy[j], projectsCopy[i]];
      }
      // Return the first 3 items from the shuffled array
      return projectsCopy.slice(0, 3);
    };

    setRandomProjects(getRandomProjects());
  }, []);

  return (
    <Layout>
      <SocialSidebar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 md:pt-24 pb-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between max-w-6xl mx-auto">
          <div className="md:max-w-xl">
            <p className="text-portfolio-highlight font-mono mb-5 animate-fade-in">
              Hi, my name is
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-portfolio-white mb-4 animate-slide-up">
              Ahmed AlMoselhy
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-portfolio-slate mb-6">
              {typedText}
              {!isComplete && (
                <span className="inline-block w-0.5 h-16 bg-portfolio-slate ml-2 animate-pulse"></span>
              )}
            </h2>
            <p
              className="text-portfolio-lightSlate text-lg max-w-xl mb-12 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              I'm a software engineer specializing in building exceptional
              digital experiences. Currently, I'm focused on building
              accessible, human-centered products.
            </p>
            <div
              className="flex flex-wrap gap-4 animate-slide-up"
              style={{ animationDelay: "300ms" }}
            >
              <Button
                onClick={() => onSectionChange?.("contact")}
                className="h-12 px-8 bg-portfolio-highlight hover:bg-portfolio-highlight/90 text-portfolio-navy font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-portfolio-highlight/20"
              >
                <Mail size={18} />
                Get In Touch
              </Button>
              <a
                href="/AhmedAlMoselhy.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-12 px-8 bg-transparent border-2 border-portfolio-highlight text-portfolio-highlight hover:bg-portfolio-highlight/10 font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-transparent hover:shadow-portfolio-highlight/10"
                >
                  <FileText size={18} />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
          <div className="lg:w-1/3 flex justify-center">
            <div className="rounded-lg overflow-hidden w-128 h-128">
              <img
                src="/Ahmed-AlMoselhy.png"
                alt="Ahmed AlMoselhy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>


        </div>
      </section>

      {/* About Section */}
      <section className="bg-portfolio-lightNavy/10 backdrop-blur-sm border-y border-portfolio-slate/10 py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-16 h-1 bg-portfolio-slate/30 rounded-full"></div>
            <h2 className="section-title mb-0">About Me</h2>
            <div className="w-16 h-1 bg-portfolio-slate/30 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto bg-portfolio-navy/50 p-8 md:p-12 rounded-2xl border border-portfolio-slate/20 hover:border-portfolio-highlight/20 transition-all duration-300">
            <div className="flex flex-col gap-6">
              <p className="text-portfolio-lightSlate text-lg leading-relaxed">
                Welcome to my portfolio! I'm <span className="text-portfolio-highlight font-semibold">Ahmed AlMoselhy</span>, a versatile and
                detail-oriented Software Engineer with extensive hands-on
                experience in full-stack development, CRM systems, and Telecom
                applications. Proven track record in working across various
                support levels and developing scalable web applications
                utilizing modern technologies.
              </p>
              <p className="text-portfolio-lightSlate text-lg leading-relaxed">
                With a strong foundation in software development and a keen eye
                for detail, I strive to create efficient and elegant solutions.
                My approach combines technical expertise with a user-centered
                focus, ensuring that the end product is both functional and
                intuitive.
              </p>
              <p className="text-portfolio-lightSlate text-lg leading-relaxed">
                Outside of coding, I enjoy gaming, reading, photography and
                being a family man. I believe that a well-rounded individual
                brings fresh perspectives to technical challenges.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  onClick={() => onSectionChange?.("skills")}
                  className="h-12 px-8 bg-portfolio-navy hover:bg-portfolio-lightNavy border border-portfolio-highlight/30 text-portfolio-highlight font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-portfolio-highlight/5"
                >
                  <Server size={18} className="mr-2" />
                  My Skills
                </Button>
                <Button
                  onClick={() => onSectionChange?.("experience")}
                  variant="outline"
                  className="h-12 px-8 bg-transparent border-2 border-portfolio-slate/30 text-portfolio-slate hover:border-portfolio-highlight hover:text-portfolio-highlight font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-transparent hover:shadow-portfolio-highlight/5"
                >
                  <Briefcase size={18} className="mr-2" />
                  Experience
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-portfolio-highlight/10 rounded-lg">
            <Code size={24} className="text-portfolio-highlight" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-portfolio-white">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomProjects.map((project) => (
            <div
              key={project.id}
              className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 rounded-2xl hover:border-portfolio-highlight/30 hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full shadow-lg shadow-transparent hover:shadow-portfolio-highlight/5 cursor-pointer"
              onClick={() => onSectionChange?.("project-detail", project.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSectionChange?.("project-detail", project.id);
                }
              }}
            >
              <div className="h-48 bg-portfolio-navy/50 rounded-xl overflow-hidden mb-6 border border-portfolio-slate/10 group-hover:border-portfolio-highlight/20 transition-all">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="text-xl font-bold text-portfolio-white group-hover:text-portfolio-highlight transition-colors">
                  {project.title}
                </h3>
                <Badge
                  variant="outline"
                  className={`text-xs font-mono py-1 px-2 border-none bg-opacity-20 ${statusStyles[project.status].replace('bg-', 'bg-opacity-10 bg-').replace('text-', 'text-')}`}
                >
                  {statusLabels[project.status] ??
                    project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)}
                </Badge>
              </div>

              <p className="text-portfolio-lightSlate mb-6 flex-grow leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="space-y-6 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="text-portfolio-highlight/90 font-mono text-xs bg-portfolio-highlight/5 px-2.5 py-1 rounded-md border border-portfolio-highlight/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-portfolio-slate font-mono text-xs px-1 py-1">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-portfolio-slate/10">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-portfolio-slate hover:text-portfolio-highlight flex items-center gap-2 text-sm transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={18} />
                    <span>Source</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-slate hover:text-portfolio-highlight flex items-center gap-2 text-sm transition-colors ml-auto"
                      aria-label={`View ${project.title} live ${project.demo ? "demo" : null} `}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button
            onClick={() => onSectionChange?.("projects")}
            className="h-12 px-8 bg-transparent border-2 border-portfolio-highlight text-portfolio-highlight hover:bg-portfolio-highlight/10 font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Code size={20} /> View All Projects
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
