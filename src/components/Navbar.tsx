
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { PageSection } from '@/App';

interface NavbarProps {
  activeSection: PageSection;
  onSectionChange: (section: PageSection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
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

  const isActive = (section: PageSection) => activeSection === section;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (section: PageSection) => {
    onSectionChange(section);
    closeMobileMenu();
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
          onClick={() => handleNavClick('home')}
          className="text-portfolio-highlight font-mono text-xl font-semibold hover:opacity-80 transition-opacity"
        >
          {'<Ahmed />'}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <button 
            onClick={() => handleNavClick('home')}
            className={cn('nav-link', isActive('home') && 'active')}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('resume')}
            className={cn('nav-link', isActive('resume') && 'active')}
          >
            Resume
          </button>
          <button 
            onClick={() => handleNavClick('experience')}
            className={cn('nav-link', isActive('experience') && 'active')}
          >
            Experience
          </button>
          <button 
            onClick={() => handleNavClick('projects')}
            className={cn('nav-link', isActive('projects') && 'active')}
          >
            Projects
          </button>
          <button 
            onClick={() => handleNavClick('skills')}
            className={cn('nav-link', isActive('skills') && 'active')}
          >
            Skills
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className={cn('nav-link', isActive('contact') && 'active')}
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
            onClick={() => handleNavClick('home')}
            className={cn('nav-link text-xl', isActive('home') && 'active')}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('resume')}
            className={cn('nav-link text-xl', isActive('resume') && 'active')}
          >
            Resume
          </button>
          <button 
            onClick={() => handleNavClick('experience')}
            className={cn('nav-link text-xl', isActive('experience') && 'active')}
          >
            Experience
          </button>
          <button 
            onClick={() => handleNavClick('projects')}
            className={cn('nav-link text-xl', isActive('projects') && 'active')}
          >
            Projects
          </button>
          <button 
            onClick={() => handleNavClick('skills')}
            className={cn('nav-link text-xl', isActive('skills') && 'active')}
          >
            Skills
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className={cn('nav-link text-xl', isActive('contact') && 'active')}
          >
            Contact
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
