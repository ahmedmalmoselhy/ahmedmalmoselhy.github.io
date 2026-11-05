import React from 'react';
import Index from './Index';
import Resume from './Resume';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import ProjectDetail from './ProjectDetail';
import Company from './Company';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Navigate, AppState } from '@/App';

interface SinglePageAppProps {
  appState: AppState;
  onSectionChange: Navigate;
}

const SinglePageApp: React.FC<SinglePageAppProps> = ({ appState, onSectionChange }) => {
  const renderContent = () => {
    switch (appState.section) {
      case 'home':
        return <Index onSectionChange={onSectionChange} />;
      case 'resume':
        return <Resume onSectionChange={onSectionChange} />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects onSectionChange={onSectionChange} />;
      case 'contact':
        return <Contact />;
      case 'project-detail':
        return (
          <ProjectDetail
            projectId={appState.projectId || 1}
            onBack={() => onSectionChange('projects')}
          />
        );
      case 'company':
        return <Company slug={appState.company ?? ''} onSectionChange={onSectionChange} />;
      default:
        return <Index onSectionChange={onSectionChange} />;
    }
  };

  return (
    <div key={`${appState.section}-${appState.projectId || appState.company || ''}`} className="page-enter">
      <ErrorBoundary>{renderContent()}</ErrorBoundary>
    </div>
  );
};

export default SinglePageApp;
