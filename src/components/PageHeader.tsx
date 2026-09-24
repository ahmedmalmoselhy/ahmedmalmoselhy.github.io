import React from "react";

export interface BandStat {
  value: string;
  label: string;
}

/** Row of big copper numbers used at the bottom of navy bands. */
export const BandStats: React.FC<{ stats: BandStat[] }> = ({ stats }) => (
  <dl className="mt-10 grid grid-cols-2 border-t border-white/10 pt-6 md:grid-cols-4">
    {stats.map(({ value, label }) => (
      <div key={label} className="py-2 text-center md:border-l md:border-white/10 md:first:border-l-0">
        <dt className="sr-only">{label}</dt>
        <dd className="font-mono text-3xl font-semibold text-[hsl(var(--band-accent))]">{value}</dd>
        <dd className="mt-1 text-xs uppercase tracking-wider text-white/60">{label}</dd>
      </div>
    ))}
  </dl>
);

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Buttons shown on the right (desktop) / below (mobile); use .btn-band / .btn-band-outline */
  actions?: React.ReactNode;
  stats?: BandStat[];
}

/** Navy band at the top of every inner page, matching the home profile band. */
const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description, actions, stats }) => (
  <section className="bg-[hsl(var(--band))] text-white">
    <div className="container mx-auto px-4 pb-10 pt-12 md:pt-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl animate-slide-up">
          <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--band-accent))]">
            {eyebrow}
          </span>
          <h1 className="mt-2 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight">{title}</h1>
          {description && <p className="mt-3 text-lg leading-relaxed text-white/70">{description}</p>}
        </div>
        {actions && (
          <div className="flex flex-col gap-3 animate-slide-up sm:flex-row" style={{ animationDelay: "120ms" }}>
            {actions}
          </div>
        )}
      </div>
      {stats && <BandStats stats={stats} />}
    </div>
  </section>
);

/** Left-aligned section heading: copper eyebrow + title, optional action on the right. */
export const SectionHeading: React.FC<{ eyebrow: string; title: string; action?: React.ReactNode }> = ({
  eyebrow,
  title,
  action,
}) => (
  <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-semibold text-portfolio-white md:text-4xl">{title}</h2>
    </div>
    {action}
  </div>
);

export default PageHeader;
