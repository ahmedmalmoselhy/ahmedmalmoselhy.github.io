import React from 'react';
import Index from './Index';
import Resume from './Resume';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Experience from './Experience';
import ProjectDetail from './ProjectDetail';
import { PageSection, AppState } from '@/App';

interface SinglePageAppProps {
  appState: AppState;
  onSectionChange: (section: PageSection, projectId?: number) => void;
}

const SinglePageApp: React.FC<SinglePageAppProps> = ({ appState, onSectionChange }) => {
  const renderContent = () => {
    switch (appState.section) {
      case 'home':
        return <Index onSectionChange={onSectionChange} />;
      case 'resume':
        return <Resume />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects onSectionChange={onSectionChange} />;
      case 'contact':
        return <Contact />;
      case 'experience':
        return <Experience />;
      case 'project-detail':
        return (
          <ProjectDetail
            projectId={appState.projectId || 1}
            onBack={() => onSectionChange('projects')}
          />
        );
      default:
        return <Index onSectionChange={onSectionChange} />;
    }
  };

  return (
    <div key={`${appState.section}-${appState.projectId || ''}`} className="animate-fade-in">
      {renderContent()}
    </div>
  );
};

export default SinglePageApp;
