import React from "react";
import { trackPointer } from "@/lib/pointer";

export interface BandStat {
  value: string;
  label: string;
}

/** Row of plain facts under a hairline: label above, value below. */
export const BandStats: React.FC<{ stats: BandStat[] }> = ({ stats }) => (
  <dl className="mt-10 grid grid-cols-2 border-t border-border md:grid-cols-4">
    {stats.map(({ value, label }) => (
      <div
        key={label}
        className="flex flex-col gap-1 py-5 pr-4 md:border-l md:border-border md:pl-6 md:first:border-l-0 md:first:pl-0"
      >
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="font-mono text-2xl font-medium">{value}</dd>
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

/** Page opener: "// label", large title, optional facts row, on a dot grid that follows the cursor. */
const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description, actions, stats }) => (
  <section className="dot-stage border-b border-border" onPointerMove={trackPointer}>
    <div className="container relative z-10 mx-auto px-4 pb-6 pt-[calc(6rem+env(safe-area-inset-top))] md:pt-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl animate-slide-up">
          <span className="eyebrow">// {eyebrow.toLowerCase()}</span>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-portfolio-slate">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-3 animate-slide-up" style={{ animationDelay: "120ms" }}>
            {actions}
          </div>
        )}
      </div>
      {stats && <BandStats stats={stats} />}
    </div>
  </section>
);

/** Section heading: blue "//" marker + title with a short accent underline; optional action on the right. */
export const SectionHeading: React.FC<{ title: string; action?: React.ReactNode }> = ({
  title,
  action,
}) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h2 className="relative flex items-baseline gap-3 pb-2.5 text-2xl font-semibold tracking-[-0.015em] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-primary md:text-[26px]">
        <span className="font-mono text-sm font-medium text-primary" aria-hidden="true">//</span>
        {title}
      </h2>
    </div>
    {action}
  </div>
);

export default PageHeader;
