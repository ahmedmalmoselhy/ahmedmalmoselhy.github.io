
import React from 'react';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="flex flex-col min-h-screen bg-portfolio-navy text-portfolio-white">
      <main className={cn("flex-grow pt-24", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
