
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
}

const projectsData: Project[] = [
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
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-white mb-6">
            My Projects
          </h1>
          <p className="text-portfolio-lightSlate text-lg">
            Here's a selection of projects I've worked on. Each project represents different skills 
            and technologies I've used to solve various challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <Card key={project.id} className="card">
              <div className="h-48 bg-portfolio-slate/20 rounded-t-lg mb-2 flex items-center justify-center overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
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
                <div className="flex flex-wrap text-sm space-x-3 mb-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-portfolio-highlight font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex space-x-4 text-portfolio-slate">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-highlight flex items-center gap-1"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github size={18} />
                  <span className="text-sm">Code</span>
                </a>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-portfolio-highlight flex items-center gap-1"
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
