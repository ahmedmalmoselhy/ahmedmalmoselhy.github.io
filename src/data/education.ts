import content from "@/content/education.json";

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  logo?: string;
}

export const education = content.education as EducationItem[];
