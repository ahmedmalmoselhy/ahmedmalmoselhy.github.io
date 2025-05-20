
import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const SocialSidebar = () => {
  return (
    <div className="fixed left-6 bottom-0 hidden lg:block z-10">
      <div className="flex flex-col items-center space-y-6">
        <a 
          href="https://github.com/ahmedmalmoselhy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-portfolio-slate hover:text-portfolio-highlight transition-transform hover:-translate-y-1"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a 
          href="https://www.linkedin.com/in/ahmedmalmoselhy/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-portfolio-slate hover:text-portfolio-highlight transition-transform hover:-translate-y-1"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a 
          href="mailto:ahmedalmoselhy.slm@gmail.com" 
          className="text-portfolio-slate hover:text-portfolio-highlight transition-transform hover:-translate-y-1"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
        <a 
          href="tel:+201117001262" 
          className="text-portfolio-slate hover:text-portfolio-highlight transition-transform hover:-translate-y-1"
          aria-label="Phone"
        >
          <Phone size={20} />
        </a>
        <div className="h-24 w-px bg-portfolio-slate/50"></div>
      </div>
    </div>
  );
};

export default SocialSidebar;
