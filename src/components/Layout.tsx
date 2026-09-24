import React from 'react';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    // Bottom padding clears the mobile tab bar; background stays transparent so the page grid shows through
    <div className="flex min-h-dvh flex-col overflow-x-clip pb-24 text-portfolio-white md:pb-0">
      <main className={cn("flex-grow pt-24", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
