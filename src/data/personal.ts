import { Github, Linkedin, Mail, Phone, type LucideIcon } from "lucide-react";

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

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

export const contactLinks: ContactLink[] = [
  { label: "Email", value: "ahmedmalmoselhy@gmail.com", href: "mailto:ahmedmalmoselhy@gmail.com", icon: Mail },
  { label: "Phone", value: "+20 111 700 1262", href: "tel:+201117001262", icon: Phone },
  { label: "LinkedIn", value: "linkedin.com/in/ahmedmalmoselhy", href: "https://www.linkedin.com/in/ahmedmalmoselhy/", icon: Linkedin, external: true },
  { label: "GitHub", value: "github.com/ahmedmalmoselhy", href: "https://github.com/ahmedmalmoselhy", icon: Github, external: true },
];

export const interests: string[] = [
  "Open Source", "Web Development", "Database Design", "CRM Development",
  "Photography", "Reading", "Traveling", "Gaming",
];
