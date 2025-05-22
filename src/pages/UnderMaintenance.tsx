
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wrench, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnderMaintenance: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-portfolio-navy p-4">
      <div className="max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <Wrench className="h-24 w-24 text-portfolio-highlight" />
        </div>
        <h1 className="text-4xl font-bold text-portfolio-white mb-2">Under Maintenance</h1>
        <h2 className="text-2xl font-semibold text-portfolio-highlight mb-4">Ahmed AlMoselhy</h2>
        <p className="text-portfolio-slate text-lg mb-8">
          We're currently working on making improvements to the site. Please check back soon!
        </p>
        
        <div className="flex justify-center mb-8">
          <Button asChild variant="outline" className="btn-primary">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try Homepage
            </Link>
          </Button>
        </div>

        <div className="border-t border-portfolio-slate/20 pt-6">
          <p className="text-portfolio-lightSlate mb-4">Need to get in touch urgently?</p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://github.com/ahmedmoselhi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/ahmedmoselhi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:contact@ahmedmoselhi.com" 
              className="p-2 text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a 
              href="https://twitter.com/ahmedmoselhi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenance;
