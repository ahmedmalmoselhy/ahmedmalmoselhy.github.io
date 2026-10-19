import content from "@/content/personal.json";

export const skillsOverview: string[] = content.skillsOverview;

export interface Language {
  name: string;
  level: string;
}

export const languages: Language[] = content.languages;

export interface PersonalDetail {
  label: string;
  value: string;
}

export const personalDetails: PersonalDetail[] = content.personalDetails;

export const interests: string[] = content.interests;
