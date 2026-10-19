import content from "@/content/projects.json";

export interface Project {
  id: number;
  title: string;
  description: string;
  extendedDescription: string;
  technologies: string[];
  image: string;
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
}

export const projectsData = content.projects as Project[];

export const statusLabels: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  "on-hold": "On Hold",
  archived: "Archived",
  new: "New",
  planned: "Planned",
  canceled: "Canceled",
};
