import { ordered } from "@/lib/content";

export interface Role {
  title: string;
  period: string;
  responsibilities: string[];
}

export type ProjectStatus = "Ongoing" | "Completed" | "On hold";

/** A client project delivered while employed at a company. */
export interface CompanyProject {
  name: string;
  status: ProjectStatus;
  client?: string;
  logo?: string;
  role?: string;
  period?: string;
  workType?: string;
  location?: string;
  highlights: string[];
  technologies?: string[];
}

export interface ExperienceItem {
  company: string;
  logo?: string;
  period: string;
  link?: string;
  workType: string;
  location: string;
  roles: (Role | Role[])[];
  projects?: CompanyProject[];
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
