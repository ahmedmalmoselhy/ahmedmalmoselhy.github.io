import React from 'react';
import Index from './Index';
import Resume from './Resume';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Experience from './Experience';
import { PageSection } from '@/App';

interface SinglePageAppProps {
  activeSection: PageSection;
  onSectionChange: (section: PageSection) => void;
}

const SinglePageApp: React.FC<SinglePageAppProps> = ({ activeSection, onSectionChange }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Index onSectionChange={onSectionChange} />;
      case 'resume':
        return <Resume />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      case 'experience':
        return <Experience />;
      default:
        return <Index onSectionChange={onSectionChange} />;
    }
  };

  return <>{renderContent()}</>;
};

export default SinglePageApp;
