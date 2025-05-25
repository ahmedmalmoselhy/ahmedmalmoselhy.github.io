
import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { PageSection } from '@/pages/SinglePageApp';

interface FooterProps {
  currentSection?: PageSection;
  onSectionChange?: (section: PageSection) => void;
}

const Footer: React.FC<FooterProps> = ({ currentSection, onSectionChange }) => {
  const currentYear = new Date().getFullYear();
  
  const handleSectionChange = (section: PageSection) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-portfolio-lightNavy py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <button 
              onClick={() => handleSectionChange('home')}
              className="text-portfolio-highlight font-mono text-xl font-semibold hover:opacity-80 transition-opacity"
            >
              {'<Ahmed />'}
            </button>
            <p className="text-portfolio-slate mt-2 max-w-md">
              Software Engineer specialized in building exceptional digital experiences
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/ahmedmalmoselhy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ahmedmalmoselhy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:ahmedalmoselhy.slm@gmail.com" 
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="tel:+201117001262" 
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
            <button 
              onClick={() => handleSectionChange('home')}
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleSectionChange('resume')}
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
            >
              Resume
            </button>
            <button 
              onClick={() => handleSectionChange('skills')}
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
            >
              Skills
            </button>
            <button 
              onClick={() => handleSectionChange('contact')}
              className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
