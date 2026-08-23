export const skillsOverview: string[] = [
  "JavaScript", "Node JS", "Express JS", "Vue JS", "HTML/CSS",
  "Python", "PHP", "Laravel", "C#", "Oracle DB", "Maria DB",
  "MySQL", "PostgreSQL", "SQL", "Git", "Docker",
  "Ericsson Order Care", "Ericsson Catalog Manager",
  "Creatio", "Jira",
];

export interface Language {
  name: string;
  level: string;
}

export const languages: Language[] = [
  { name: "English", level: "Professional" },
  { name: "Arabic", level: "Native" },
];

export interface PersonalDetail {
  label: string;
  value: string;
}

export const personalDetails: PersonalDetail[] = [
  { label: "Date of Birth", value: "1996" },
  { label: "Military Service", value: "Completed" },
  { label: "Marital Status", value: "Married" },
];

export const interests: string[] = [
  "Open Source", "Web Development", "Database Design", "CRM Development",
  "Photography", "Reading", "Traveling", "Gaming",
];
