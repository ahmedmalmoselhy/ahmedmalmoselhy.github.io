import { ordered } from "@/lib/content";

/** Extra screenshots and videos shown in the gallery on a project page. */
export type ProjectMedia =
  | { type: "image"; src: string; caption?: string }
  | { type: "video"; src: string; caption?: string }
  | { type: "youtube"; url: string; caption?: string };

/** Whose project it is: shown as a label on the card. */
export type ProjectKind = "personal" | "client" | "service" | "company";

export interface Project {
  id: number;
  /** Defaults to personal */
  kind?: ProjectKind;
  title: string;
  description: string;
  extendedDescription: string;
  technologies: string[];
  /** Uploaded cover; without one, scripts/generate-covers.mjs makes /projects-images/auto/<id>.svg */
  image: string;
  /** Icon for a generated cover (see scripts/generate-covers.mjs) */
  coverIcon?: string;
  /** Subtitle for a generated cover */
  coverSubtitle?: string;
  /** Omitted for monetized projects: source isn't public. */
  githubUrl?: string;
  liveUrl: string;
  demo: boolean;
  /** Commercial product: shows a "request a demo / buy" contact button instead of source links. */
  monetized?: boolean;
  date?: string;
  status:
    | "completed"
    | "on-hold"
    | "in-progress"
    | "new"
    | "archived"
    | "planned"
    | "canceled";
  contributors?: string[];
  relatedProjects?: number[];
  media?: ProjectMedia[];
  // Work done while employed (kind "company")
  /** Employer, matching an experience entry's company name; the project then shows on that company's page */
  company?: string;
  /** Customer the work was for; empty means an internal project */
  client?: string;
  role?: string;
  highlights?: string[];
  period?: string;
  workType?: string;
  location?: string;
  /** Client logo */
  logo?: string;
}

export const projectsData = ordered<Project>(
  import.meta.glob("/src/content/projects/*.json", { eager: true, import: "default" }),
).map((p) => ({ ...p, image: p.image || `/projects-images/auto/${p.id}.svg` }));

export const statusLabels: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  "on-hold": "On Hold",
  archived: "Archived",
  new: "New",
  planned: "Planned",
  canceled: "Canceled",
};

export const kindLabels: Record<ProjectKind, string> = {
  personal: "Personal",
  client: "Client work",
  service: "Service",
  company: "Company",
};

/** Projects done at a company, in dashboard order. */
export const projectsAt = (company: string) => projectsData.filter((p) => p.company === company);
