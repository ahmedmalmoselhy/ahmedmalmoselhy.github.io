
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

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
        <Link 
          to="/" 
          className="text-portfolio-highlight font-mono text-xl font-semibold"
          onClick={closeMobileMenu}
        >
          {'<Ahmed />'}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={cn('nav-link', isActive('/') && 'active')}>
            Home
          </Link>
          <Link to="/resume" className={cn('nav-link', isActive('/resume') && 'active')}>
            Resume
          </Link>
          <Link to="/projects" className={cn('nav-link', isActive('/projects') && 'active')}>
            Projects
          </Link>
          <Link to="/skills" className={cn('nav-link', isActive('/skills') && 'active')}>
            Skills
          </Link>
          <Link to="/contact" className={cn('nav-link', isActive('/contact') && 'active')}>
            Contact
          </Link>
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
        <div className="flex flex-col items-center space-y-6 text-lg">
          <Link 
            to="/" 
            className={cn('nav-link text-xl', isActive('/') && 'active')}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/resume" 
            className={cn('nav-link text-xl', isActive('/resume') && 'active')}
            onClick={closeMobileMenu}
          >
            Resume
          </Link>
          <Link 
            to="/projects" 
            className={cn('nav-link text-xl', isActive('/projects') && 'active')}
            onClick={closeMobileMenu}
          >
            Projects
          </Link>
          <Link 
            to="/skills" 
            className={cn('nav-link text-xl', isActive('/skills') && 'active')}
            onClick={closeMobileMenu}
          >
            Skills
          </Link>
          <Link 
            to="/contact" 
            className={cn('nav-link text-xl', isActive('/contact') && 'active')}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
