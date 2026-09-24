import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

/** Editor pane content: IdeShell owns the chrome (tabs, explorer, status bar). */
const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <main className={cn("mx-auto min-h-[calc(100dvh-7rem)] max-w-6xl px-4 py-8 text-portfolio-white md:px-8 md:py-10", className)}>
      {children}
    </main>
  );
};

export default Layout;
