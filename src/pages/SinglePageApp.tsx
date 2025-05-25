
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

  const renderContent = () => {
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

  const handleSectionChange = (section: PageSection) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="single-page-app">
      <Layout currentSection={currentSection} onSectionChange={handleSectionChange}>
        {renderContent()}
      </Layout>
    </div>
  );
};

export default SinglePageApp;
