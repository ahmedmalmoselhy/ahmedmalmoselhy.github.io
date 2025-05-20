
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-portfolio-lightNavy py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-portfolio-highlight font-mono text-xl font-semibold">
              {'<Ahmed />'}
            </Link>
            <p className="text-portfolio-slate mt-2 max-w-md">
              Software Engineer specialized in building exceptional digital experiences
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:ahmed@example.com" 
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="tel:+1234567890" 
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="Phone"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-portfolio-slate/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-portfolio-slate text-sm">
            © {currentYear} Ahmed AlMoselhy. All rights reserved.
          </p>
          
          <nav className="flex mt-4 md:mt-0 space-x-4 text-sm">
            <Link to="/" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors">
              Home
            </Link>
            <Link to="/resume" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors">
              Resume
            </Link>
            <Link to="/skills" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors">
              Skills
            </Link>
            <Link to="/contact" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
