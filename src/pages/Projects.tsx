/* eslint-disable react-refresh/only-export-components */

import React from "react";
import Layout from "@/components/Layout";
import { ExternalLink, Github, Eye } from "lucide-react";
import { PageSection } from "@/App";
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
  extendedDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  demo: boolean;
  date?: string;
  status:
    | "completed"
    | "on-hold"
    | "in-progress"
    | "new"
    | "archived"
    | "planned"
    | "canceled";
  contributors?: string[];
  relatedProjects?: number[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Laravel Modular Dashboard",
    description:
      "Developed a configurable admin dashboard with Laravel Blade templates.",
    extendedDescription:
      "I developed a highly configurable admin dashboard using Laravel Blade templates, focusing on flexibility, performance, and ease of customization. The solution allows administrators to manage interface components, layouts, and dynamic data displays without modifying core code, making the dashboard scalable and adaptable to different business needs. By leveraging Blade’s templating capabilities, reusable components, and clean structure, the system ensures maintainability while providing a streamlined and user-friendly experience for both developers and end-users.",
    technologies: ["Laravel", "MariaDB", "Laravel Blade", "PHP"],
    image: "/projects-images/laravel-modular-dashboard.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/laravel-dashboard",
    liveUrl: "",
    demo: true,
    status: "on-hold",
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "Laravel GetText Package",
    description:
      "Extended compatibility to PHP 8.1 and Laravel 9 for multilingual support.",
    extendedDescription:
      "I extended the system’s compatibility to PHP 8.1 and Laravel 9 to ensure improved performance, stability, and long-term maintainability, while also enabling robust multilingual support. This upgrade allowed the application to leverage the latest framework enhancements, modern language features, and better localization tools, ultimately providing a more seamless and scalable environment for serving users across different regions and languages.",
    technologies: ["PHP", "Laravel"],
    image: "/projects-images/laravel-gettext-package.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/laravel-gettext",
    liveUrl: "",
    demo: true,
    status: "archived",
    date: "2023-08-10",
  },
  {
    id: 3,
    title: "CSED 2020 Yearbook",
    description:
      "Created a memorial website including backend and layout in Laravel Blade.",
    extendedDescription:
      "I created a memorial website that included both the backend functionality and the full layout implementation using Laravel Blade. The project focused on delivering a clean, respectful, and user-friendly experience, allowing visitors to view memories, stories, and tributes through an organized and visually appealing interface. By building the backend from scratch and designing the Blade templates for the front-end, I ensured a seamless integration between data management and presentation, resulting in a stable and meaningful platform for preserving and sharing memories.",
    technologies: ["PHP", "Laravel", "PostgreSQL", "Heroku"],
    image: "/projects-images/csed-2020-yearbook.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/csed_yearbook",
    liveUrl: "",
    demo: true,
    status: "completed",
    date: "2021-05-20",
  },
  {
    id: 4,
    title: "Curey Healthcare App",
    description:
      "Graduation project focused on backend API and database systems",
    extendedDescription:
      "My graduation project focused on designing and implementing robust backend APIs and database systems, emphasizing scalability, security, and efficient data management. I structured the API to support clean integration with various front-end clients, while the database architecture was optimized for performance and reliability. Through this project, I gained hands-on experience with system design principles, API lifecycle management, and data modeling, resulting in a solid and well-documented backend foundation.",
    technologies: [
      "PHP",
      "Laravel",
      "MySQL",
      "Postman",
      "Heroku",
      "PostgreSQL",
    ],
    image: "/projects-images/curey-healthcare-app.png",
    githubUrl:
      "https://github.com/Curey-HealthCare/Curey-HealthCareApp-Backend",
    liveUrl: "",
    demo: true,
    status: "completed",
    date: "2020-06-15",
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description:
      "My personal portfolio website built with React and Tailwind CSS.",
    extendedDescription:
      "I built my personal portfolio website using React and Tailwind CSS, focusing on delivering a clean, modern, and responsive user experience. The site showcases my projects, skills, and professional background through a visually appealing layout powered by reusable React components and Tailwind’s utility-first styling. By optimizing performance and ensuring seamless navigation across devices, the portfolio serves as an effective platform for presenting my work and personal brand.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "/projects-images/personal-portfolio.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/ahmedmalmoselhy.github.io",
    liveUrl: "https://ahmedmalmoselhy.github.io",
    demo: false,
    status: "completed",
    date: "2024-01-10",
  },
  {
    id: 6,
    title: "UniOne",
    description:
      "University management system for handling academic operations.",
    extendedDescription:
      "This is a personal and very dear project to my heart, I've had it in my backlog for a log time, but now I'm officially starting my work on it, this project will have so much details and many many technoligical challanges, which I'm so happy and excited to tackle, and to make matters more exciting, I'll work on this project multiple times wilth more than one framework/technology. I might not be able to finalize every single one of these clones, but I'm excited to tackle and work with something new to me. This repository is just my personal documentations for the project, with links to all other repositories with that house the project with each technology separate, will update this repository with some stuff like database schema, phases of development of each clone, design and APIs documentation.",
    technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
    image: "/projects-images/unione.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/UniOne",
    liveUrl: "",
    demo: true,
    status: "new",
    date: "2024-05-01",
  },
];

export const statusStyles: Record<Project["status"], string> = {
  completed:
    "bg-portfolio-green/20 text-portfolio-green border-portfolio-green/30",
  "in-progress":
    "bg-portfolio-yellow/20 text-portfolio-yellow border-portfolio-yellow/30",
  "on-hold":
    "bg-portfolio-orange/20 text-portfolio-orange border-portfolio-orange/30",
  archived: "bg-portfolio-red/20 text-portfolio-red border-portfolio-red/30",
  new: "bg-portfolio-highlight/20 text-portfolio-highlight border-portfolio-highlight/30",
  planned: "bg-portfolio-blue/20 text-portfolio-blue border-portfolio-blue/30",
  canceled:
    "bg-portfolio-slate/20 text-portfolio-slate border-portfolio-slate/30",
};

export const statusLabels: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  "on-hold": "On Hold",
  archived: "Archived",
  new: "New",
  planned: "Planned",
  canceled: "Canceled",
};

interface ProjectsProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onSectionChange }) => {
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
                {/*<Github size={48} className="text-portfolio-slate/40" />*/}
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="pb-2 p-4 md:p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg md:text-xl font-semibold text-portfolio-white">
                    {project.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`text-xs font-mono ${statusStyles[project.status]}`}
                  >
                    {statusLabels[project.status] ??
                      project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="text-portfolio-lightSlate text-sm md:text-base">
                  {project.date && (
                    <div className="flex flex-wrap md:gap-2">
                      <span className="ml-auto text-portfolio-slate text-xs md:text-sm italic">
                        Last modified:{" "}
                        {new Date(project.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  )}
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
              <CardFooter className="flex flex-wrap gap-3 text-portfolio-slate p-4 md:p-6">
                {onSectionChange && (
                  <button
                    onClick={() =>
                      onSectionChange("project-detail", project.id)
                    }
                    className="hover:text-portfolio-highlight flex items-center gap-1 transition-colors duration-200"
                    aria-label={`View ${project.title} details`}
                  >
                    <Eye size={16} className="md:size-18" />
                    <span className="text-xs md:text-sm">Details</span>
                  </button>
                )}
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
                    aria-label={`View ${project.title} live ${project.demo ? "demo" : ""}`}
                  >
                    <ExternalLink size={16} className="md:size-18" />
                    <span className="text-xs md:text-sm">
                      Live {project.demo ? "Demo" : ""}
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
