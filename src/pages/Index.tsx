import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SocialSidebar from "@/components/SocialSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTypingOnce } from "@/hooks/use-typing-once";
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

type PageSection =
  | "home"
  | "resume"
  | "skills"
  | "projects"
  | "contact"
  | "experience";

interface IndexProps {
  onSectionChange?: (section: PageSection) => void;
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
                className="btn-primary flex items-center gap-2"
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
                  className="btn-outline flex items-center gap-2"
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

          {/* Tech Stack Visual - only visible on desktop */}
          {/*<div
            className="hidden md:flex flex-col items-center animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-portfolio-lightNavy/20 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Code size={48} className="text-portfolio-highlight" />
              </div>
              {/* Tech stack icons positioned around in a circle
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-portfolio-navy/70 p-3 rounded-full">
                  <Server size={24} className="text-portfolio-highlight" />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-portfolio-navy/70 p-3 rounded-full">
                  <Database size={24} className="text-portfolio-highlight" />
                </div>
              </div>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="bg-portfolio-navy/70 p-3 rounded-full">
                  <Code size={24} className="text-portfolio-highlight" />
                </div>
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="bg-portfolio-navy/70 p-3 rounded-full">
                  <Github size={24} className="text-portfolio-highlight" />
                </div>
              </div>
              <div className="absolute top-1/4 right-1/4">
                <div className="bg-portfolio-navy/70 p-3 rounded-full">
                  <FileText size={24} className="text-portfolio-highlight" />
                </div>
              </div>
              <div className="absolute bottom-1/4 right-1/4">
                <div className="bg-portfolio-navy/70 p-3 rounded-full">
                  <User size={24} className="text-portfolio-highlight" />
                </div>
              </div>
              <div className="absolute bottom-1/4 left-1/4">
                <div className="bg-portfolio-navy/70 p-3 rounded-full">
                  <Mail size={24} className="text-portfolio-highlight" />
                </div>
              </div>
              <div className="absolute top-1/4 left-1/4">
                <div className="bg-portfolio-navy/70 p-3 rounded-full">
                  <Briefcase size={24} className="text-portfolio-highlight" />
                </div>
              </div>
            </div>
          </div>*/}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-portfolio-lightNavy/30 py-24">
        <div className="container mx-auto px-4">
          <h2 className="section-title">About Me</h2>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div>
              <p className="text-portfolio-lightSlate mb-4">
                Welcome to my portfolio! I'm Ahmed AlMoselhy, A versatile and
                detail-oriented Software Engineer with extensive hands-on
                experience in full-stack development, CRM systems, and Telecom
                applications. Proven track record in working across various
                support levels and developing scalable web applications
                utilizing modern technologies. Committed to delivering optimized
                and innovative software solutions that align with business
                objectives.
              </p>
              <p className="text-portfolio-lightSlate mb-4">
                With a strong foundation in software development and a keen eye
                for detail, I strive to create efficient and elegant solutions.
                My approach combines technical expertise with a user-centered
                focus, ensuring that the end product is both functional and
                intuitive.
              </p>
              <p className="text-portfolio-lightSlate mb-6">
                Outside of coding, I enjoy gaming, reading, photography and
                being a family man. I believe that a well-rounded individual
                brings fresh perspectives to technical challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => onSectionChange?.("skills")}
                  className="btn-primary flex items-center gap-2"
                >
                  <Server size={18} />
                  My Skills
                </Button>
                <Button
                  onClick={() => onSectionChange?.("experience")}
                  variant="outline"
                  className="btn-outline flex items-center gap-2"
                >
                  <Briefcase size={18} />
                  Experience
                </Button>
                <Button
                  onClick={() => onSectionChange?.("resume")}
                  variant="outline"
                  className="btn-outline flex items-center gap-2"
                >
                  <User size={18} />
                  Resume
                </Button>
              </div>
            </div>
            {/*<div className="lg:w-1/3 flex justify-center">
              <div className="rounded-lg overflow-hidden w-64 h-64">
                <img
                  src="/Ahmed-AlMoselhy.png"
                  alt="Ahmed AlMoselhy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>*/}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomProjects.map((project) => (
            <div key={project.id} className="card">
              <div className="h-40 bg-portfolio-navy/50 flex items-center justify-center overflow-hidden mb-6">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="text-xl font-semibold text-portfolio-white">
                  {project.title}
                </h3>
                <Badge
                  variant="outline"
                  className={`text-xs font-mono ${statusStyles[project.status]}`}
                >
                  {statusLabels[project.status] ??
                    project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                </Badge>
              </div>
              <p className="text-portfolio-lightSlate mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="text-portfolio-highlight font-mono text-xs bg-portfolio-highlight/10 px-3 py-1 rounded-full border border-portfolio-highlight/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4 text-portfolio-slate">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-highlight flex items-center gap-1"
                >
                  <Github size={20} />
                  <span>Code</span>
                </a>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-portfolio-highlight flex items-center gap-1 transition-colors duration-200"
                    aria-label={`View ${project.title} live ${project.demo ? "demo" : null} `}
                  >
                    <ExternalLink size={16} className="md:size-18" />
                    <span className="text-xs md:text-sm">
                      View {project.title} {project.demo ? "Demo" : null}
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            onClick={() => onSectionChange?.("projects")}
            className="btn-primary"
          >
            <Code size={20} /> View All Projects
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
