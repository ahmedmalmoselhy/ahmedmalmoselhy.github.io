import { ordered } from "@/lib/content";

export interface Role {
  title: string;
  period: string;
  /** Longer write-up shown on the company page (the resume shows only the bullets) */
  details?: string;
  responsibilities: string[];
}

export interface ExperienceItem {
  company: string;
  logo?: string;
  period: string;
  link?: string;
  workType: string;
  location: string;
  /** Intro paragraph at the top of the company page */
  overview?: string;
  roles: (Role | Role[])[];
  achievements?: string[];
  technologies?: string[];
}

export const experiences = ordered<ExperienceItem>(
  import.meta.glob("/src/content/experience/*.json", { eager: true, import: "default" }),
);

/** Earliest year mentioned in any experience period (used for "years of experience"). */
export const careerStartYear = Math.min(
  ...experiences.map((e) => Number(e.period.match(/\d{4}/)?.[0] ?? new Date().getFullYear())),
);

/** URL-safe id for a company page: "Qeema" -> "qeema" (used in #/experience/<slug>) */
export const companySlug = (company: string) =>
  company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const findCompany = (slug: string) => experiences.find((e) => companySlug(e.company) === slug);
