
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';
import { PageSection } from '@/pages/SinglePageApp';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  currentSection?: PageSection;
  onSectionChange?: (section: PageSection) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, className, currentSection, onSectionChange }) => {
  return (
    <div className="flex flex-col min-h-screen bg-portfolio-navy text-portfolio-white">
      <Navbar currentSection={currentSection} onSectionChange={onSectionChange} />
      <main className={cn("flex-grow pt-24", className)}>
        {children}
      </main>
      <Footer currentSection={currentSection} onSectionChange={onSectionChange} />
    </div>
  );
};

export default Layout;
