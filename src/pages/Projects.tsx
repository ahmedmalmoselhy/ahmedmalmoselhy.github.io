/* eslint-disable react-refresh/only-export-components */

import React from 'react';
import Layout from '@/components/Layout';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A responsive portfolio website built with React and Tailwind CSS to showcase my skills and projects.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce application with user authentication, product catalog, and payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity application that helps users organize and manage their daily tasks and projects.",
    technologies: ["React", "Redux", "Firebase"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A weather application that displays current and forecasted weather data for any location.",
    technologies: ["React", "OpenWeather API", "Chart.js"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 5,
    title: "Social Media Analytics",
    description: "A dashboard for tracking and analyzing social media performance across multiple platforms.",
    technologies: ["React", "D3.js", "Node.js", "Express"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "An application for tracking workouts, nutrition, and progress towards fitness goals.",
    technologies: ["React", "TypeScript", "Firebase"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  }
];

const Projects = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-white mb-6 animate-fade-in">
            My Projects
          </h1>
          <p className="text-portfolio-lightSlate text-lg animate-slide-up">
            Here's a selection of projects I've worked on. Each project represents different skills 
            and technologies I've used to solve various challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <Card 
              key={project.id} 
              className="bg-portfolio-lightNavy border-portfolio-slate/20 hover:-translate-y-2 transition-transform duration-300 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-portfolio-navy/50 flex items-center justify-center overflow-hidden">
                <Github size={80} className="text-portfolio-slate/40" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-portfolio-white">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-portfolio-lightSlate">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-portfolio-navy/50 text-portfolio-highlight border-portfolio-highlight/30 font-mono text-xs py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex space-x-4 text-portfolio-slate">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-highlight flex items-center gap-1 transition-colors duration-200"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github size={18} />
                  <span className="text-sm">Code</span>
                </a>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-highlight flex items-center gap-1 transition-colors duration-200"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink size={18} />
                  <span className="text-sm">Live Demo</span>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
