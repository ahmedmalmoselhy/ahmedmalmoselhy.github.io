
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Index from './Index';
import Resume from './Resume';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';

export type PageSection = 'home' | 'resume' | 'projects' | 'skills' | 'contact';

const SinglePageApp = () => {
  const [currentSection, setCurrentSection] = useState<PageSection>('home');

  const handleSectionChange = (section: PageSection) => {
    console.log('Changing section to:', section);
    setCurrentSection(section);
    // Smooth scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    console.log('Rendering section:', currentSection);
    
    switch (currentSection) {
      case 'home':
        return <Index onSectionChange={handleSectionChange} />;
      case 'resume':
        return <Resume />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;
      default:
        return <Index onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <Layout currentSection={currentSection} onSectionChange={handleSectionChange}>
      {renderContent()}
    </Layout>
  );
};

export default SinglePageApp;
