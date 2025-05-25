
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { PageSection } from '@/pages/SinglePageApp';

interface NavbarProps {
  currentSection?: PageSection;
  onSectionChange?: (section: PageSection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection = 'home', onSectionChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to handle body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      setScrollPosition(window.scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollPosition) {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'auto'
        });
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen, scrollPosition]);

  const handleSectionChange = (section: PageSection) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
    closeMobileMenu();
    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'py-3 bg-portfolio-navy/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button 
          onClick={() => handleSectionChange('home')}
          className="text-portfolio-highlight font-mono text-xl font-semibold hover:opacity-80 transition-opacity"
        >
          {'<Ahmed />'}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <button 
            onClick={() => handleSectionChange('home')}
            className={cn('nav-link', currentSection === 'home' && 'active')}
          >
            Home
          </button>
          <button 
            onClick={() => handleSectionChange('resume')}
            className={cn('nav-link', currentSection === 'resume' && 'active')}
          >
            Resume
          </button>
          <button 
            onClick={() => handleSectionChange('projects')}
            className={cn('nav-link', currentSection === 'projects' && 'active')}
          >
            Projects
          </button>
          <button 
            onClick={() => handleSectionChange('skills')}
            className={cn('nav-link', currentSection === 'skills' && 'active')}
          >
            Skills
          </button>
          <button 
            onClick={() => handleSectionChange('contact')}
            className={cn('nav-link', currentSection === 'contact' && 'active')}
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-portfolio-white p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={cn(
              'block h-0.5 w-6 bg-portfolio-white transition-all duration-300',
              isMobileMenuOpen && 'rotate-45 translate-y-2'
            )}></span>
            <span className={cn(
              'block h-0.5 w-6 bg-portfolio-white transition-all duration-300',
              isMobileMenuOpen && 'opacity-0'
            )}></span>
            <span className={cn(
              'block h-0.5 w-6 bg-portfolio-white transition-all duration-300',
              isMobileMenuOpen && '-rotate-45 -translate-y-2'
            )}></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={cn(
        'md:hidden fixed inset-0 bg-portfolio-lightNavy/95 z-40 transform transition-transform duration-300 pt-24',
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <button
          onClick={closeMobileMenu}
          className="absolute top-6 right-6 p-2 text-portfolio-white hover:text-portfolio-highlight transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col items-center space-y-6 text-lg">
          <button 
            onClick={() => handleSectionChange('home')}
            className={cn('nav-link text-xl', currentSection === 'home' && 'active')}
          >
            Home
          </button>
          <button 
            onClick={() => handleSectionChange('resume')}
            className={cn('nav-link text-xl', currentSection === 'resume' && 'active')}
          >
            Resume
          </button>
          <button 
            onClick={() => handleSectionChange('projects')}
            className={cn('nav-link text-xl', currentSection === 'projects' && 'active')}
          >
            Projects
          </button>
          <button 
            onClick={() => handleSectionChange('skills')}
            className={cn('nav-link text-xl', currentSection === 'skills' && 'active')}
          >
            Skills
          </button>
          <button 
            onClick={() => handleSectionChange('contact')}
            className={cn('nav-link text-xl', currentSection === 'contact' && 'active')}
          >
            Contact
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
