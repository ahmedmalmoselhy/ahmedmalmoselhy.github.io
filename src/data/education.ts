import { ordered } from "@/lib/content";

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  logo?: string;
}

export const education = ordered<EducationItem>(
  import.meta.glob("/src/content/education/*.json", { eager: true, import: "default" }),
);
