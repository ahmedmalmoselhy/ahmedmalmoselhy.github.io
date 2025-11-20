/* eslint-disable react-refresh/only-export-components */

import React from "react";
import Layout from "@/components/Layout";
import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  demo: boolean;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Laravel Modular Dashboard",
    description:
      "Developed a configurable admin dashboard with Laravel Blade templates.",
    technologies: ["Laravel", "MariaDB", "Laravel Blade", "PHP"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/ahmedmalmoselhy/laravel-dashboard",
    liveUrl: "",
    demo: true,
  },
  {
    id: 2,
    title: "Laravel GetText Package",
    description:
      "Extended compatibility to PHP 8.1 and Laravel 9 for multilingual support.",
    technologies: ["PHP", "Laravel"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/ahmedmalmoselhy/laravel-gettext",
    liveUrl: "",
    demo: true,
  },
  {
    id: 3,
    title: "CSED 2020 Yearbook",
    description:
      "Created a memorial website including backend and layout in Laravel Blade.",
    technologies: ["PHP", "Laravel", "PostgreSQL", "Heroku"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/ahmedmalmoselhy/csed_yearbook",
    liveUrl: "",
    demo: true,
  },
  {
    id: 4,
    title: "Curey Healthcare App",
    description:
      "Graduation project focused on backend API and database systems",
    technologies: ["PHP", "Laravel"],
    image: "/placeholder.svg",
    githubUrl:
      "https://github.com/Curey-HealthCare/Curey-HealthCareApp-Backend",
    liveUrl: "",
    demo: true,
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description:
      "My personal portfolio website built with React and Tailwind CSS.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/ahmedmalmoselhy/ahmedmalmoselhy.github.io",
    liveUrl: "https://https://ahmedmalmoselhy.github.io",
    demo: false,
  },
];

const Projects = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-portfolio-white mb-4 md:mb-6 animate-fade-in">
            My Projects
          </h1>
          <p className="text-portfolio-lightSlate text-base md:text-lg animate-slide-up">
            Here's a selection of projects I've worked on. Each project
            represents different skills and technologies I've used to solve
            various challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {projectsData.map((project, index) => (
            <Card
              key={project.id}
              className="bg-portfolio-lightNavy border-portfolio-slate/20 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform duration-300 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-32 md:h-48 bg-portfolio-navy/50 flex items-center justify-center overflow-hidden">
                <Github size={48} className="text-portfolio-slate/40" />
              </div>
              <CardHeader className="pb-2 p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl font-semibold text-portfolio-white">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-portfolio-lightSlate text-sm md:text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-1 p-4 md:p-6 pt-0">
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-portfolio-navy/50 text-portfolio-highlight border-portfolio-highlight/30 font-mono text-xs py-0.5 md:py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex space-x-4 text-portfolio-slate p-4 md:p-6">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-highlight flex items-center gap-1 transition-colors duration-200"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github size={16} className="md:size-18" />
                  <span className="text-xs md:text-sm">Code</span>
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
                      View {project.title} Live {project.demo ? "Demo" : null}
                    </span>
                  </a>
                ) : null}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
