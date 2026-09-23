import React from 'react';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    // Bottom padding keeps content clear of the mobile tab bar.
    <div className="flex min-h-screen flex-col pb-[calc(3.25rem+env(safe-area-inset-bottom))] md:pb-0">
      <main className={cn("container flex-grow pt-10 md:pt-24", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

/** Large title plus an optional summary and actions, shared by every page. */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => (
  <header className="mb-10 md:mb-14">
    <h1 className="text-largetitle font-bold">{title}</h1>
    {description && (
      <p className="mt-4 max-w-2xl text-title3 text-muted-foreground">{description}</p>
    )}
    {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
  </header>
);

/** A grouped-list section: small uppercase label above its content. */
export const GroupedSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const id = React.useId();
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-3 px-5 text-footnote font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Layout;
