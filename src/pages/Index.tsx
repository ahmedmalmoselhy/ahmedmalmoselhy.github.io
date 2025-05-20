
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SocialSidebar from '@/components/SocialSidebar';
import { Button } from '@/components/ui/button';
import { Mail, FileText, User, Briefcase } from 'lucide-react';

const Index = () => {
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
            I build things for the web.
          </h2>
          <p className="text-portfolio-slate text-lg max-w-xl mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
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
                Welcome to my portfolio! I'm Ahmed AlMoselhy, a passionate Software Engineer with experience in 
                building and maintaining responsive websites and web applications. I'm excited about creating 
                technology that improves people's lives and solves real-world problems.
              </p>
              <p className="text-portfolio-lightSlate mb-4">
                With a strong foundation in software development and a keen eye for detail, I strive to create 
                efficient and elegant solutions. My approach combines technical expertise with a user-centered 
                focus, ensuring that the end product is both functional and intuitive.
              </p>
              <p className="text-portfolio-lightSlate mb-6">
                Outside of coding, I enjoy [your hobbies/interests]. I believe that a well-rounded individual 
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
              <div className="rounded-lg overflow-hidden border-2 border-portfolio-highlight w-64 h-64 relative">
                <div className="absolute inset-0 bg-portfolio-highlight/20 flex items-center justify-center">
                  <span className="text-portfolio-highlight font-mono">Your Photo Here</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="card">
              <div className="h-40 bg-portfolio-slate/20 rounded mb-4 flex items-center justify-center">
                <span className="text-portfolio-lightSlate">Project Screenshot</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-portfolio-white">Project {i}</h3>
              <p className="text-portfolio-lightSlate mb-4">
                A brief description of this project and the technologies used in its development.
              </p>
              <div className="flex text-sm space-x-3 mb-4">
                <span className="text-portfolio-highlight font-mono">React</span>
                <span className="text-portfolio-highlight font-mono">TypeScript</span>
                <span className="text-portfolio-highlight font-mono">Node.js</span>
              </div>
              <div className="flex space-x-4 text-portfolio-slate">
                <a href="#" className="hover:text-portfolio-highlight">
                  <Github size={20} />
                </a>
                <a href="#" className="hover:text-portfolio-highlight">
                  External Link
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button className="btn-primary">
            View All Projects
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
