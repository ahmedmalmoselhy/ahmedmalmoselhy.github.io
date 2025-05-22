
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SocialSidebar from '@/components/SocialSidebar';
import { Button } from '@/components/ui/button';
import { Mail, FileText, User, Briefcase, Github, ExternalLink } from 'lucide-react';

// Import project data from the Projects page
import { projectsData, Project } from './Projects';

const Index = () => {
  const [randomProjects, setRandomProjects] = useState<Project[]>([]);
  
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
        <div className="flex flex-col max-w-3xl mx-auto md:ml-0">
          <p className="text-portfolio-highlight font-mono mb-5 animate-fade-in">Hi, my name is</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-portfolio-white mb-4 animate-slide-up">
            Ahmed AlMoselhy
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-portfolio-slate mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            I build software!
          </h2>
          <p className="text-portfolio-lightSlate text-lg max-w-xl mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
            I'm a software engineer specializing in building exceptional digital experiences.
            Currently, I'm focused on building accessible, human-centered products.
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link to="/contact">
              <Button className="btn-primary flex items-center gap-2">
                <Mail size={18} />
                Get In Touch
              </Button>
            </Link>
            <Link to="/resume">
              <Button variant="outline" className="btn-outline flex items-center gap-2">
                <FileText size={18} />
                View Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-portfolio-lightNavy/30 py-24">
        <div className="container mx-auto px-4">
          <h2 className="section-title">About Me</h2>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-2/3">
              <p className="text-portfolio-lightSlate mb-4">
                Welcome to my portfolio! I'm Ahmed AlMoselhy, A versatile and detail-oriented Software Engineer with extensive hands-on experience in full-stack development,
                CRM systems, and Telecom applications. Proven track record in working across various support levels and developing scalable web applications utilizing modern technologies. 
                Committed to delivering optimized and innovative software solutions that align with business objectives.
              </p>
              <p className="text-portfolio-lightSlate mb-4">
                With a strong foundation in software development and a keen eye for detail, I strive to create 
                efficient and elegant solutions. My approach combines technical expertise with a user-centered 
                focus, ensuring that the end product is both functional and intuitive.
              </p>
              <p className="text-portfolio-lightSlate mb-6">
                Outside of coding, I enjoy gaming, reading, photography and being a family man. I believe that a well-rounded individual 
                brings fresh perspectives to technical challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/skills">
                  <Button className="btn-primary flex items-center gap-2">
                    <User size={18} />
                    My Skills
                  </Button>
                </Link>
                <Link to="/resume">
                  <Button variant="outline" className="btn-outline flex items-center gap-2">
                    <Briefcase size={18} />
                    Experience
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="rounded-lg overflow-hidden w-64 h-64">
                <img src="/dist/image.png" alt="Ahmed AlMoselhy" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomProjects.map((project) => (
            <div key={project.id} className="card">
              <div className="h-40 bg-portfolio-navy/50 flex items-center justify-center overflow-hidden">
                <Github size={80} className="text-portfolio-slate/40" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-portfolio-white">{project.title}</h3>
              <p className="text-portfolio-lightSlate mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className="text-portfolio-highlight font-mono text-sm">{tech}</span>
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
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-portfolio-highlight flex items-center gap-1"
                >
                  <ExternalLink size={20} />
                  <span>Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/projects">
            <Button className="btn-primary">
              View All Projects
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
