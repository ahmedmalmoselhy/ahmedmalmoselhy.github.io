import content from "@/content/skills.json";
import { iconFor } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  color: string;
}

export interface SoftSkill {
  name: string;
  icon: LucideIcon;
}

// Shared color map for skill category accents, used by the radar chart,
// tech stack icons, and the skills grid.
// Mid-tone versions of the site's domain colours so they read on light and dark
// (SVG attributes in the radar chart can't use CSS variables).
export const skillColorMap: Record<string, string> = {
  "portfolio-highlight": "#3d6bff",
  "portfolio-blue": "#3d6bff",
  "portfolio-teal": "#1aa393",
  "portfolio-slate": "#e0662a",
  "portfolio-lightSlate": "#c9861c",
};

export const skillCategories: SkillCategory[] = content.categories;

export const softSkills: SoftSkill[] = content.softSkills.map((s) => ({ name: s.name, icon: iconFor(s.icon) }));
