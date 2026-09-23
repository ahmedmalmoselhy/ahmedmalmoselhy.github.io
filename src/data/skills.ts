export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "PHP", level: 85 },
      { name: "Java", level: 70 },
      { name: "Python", level: 70 },
      { name: "HTML/CSS", level: 90 },
      { name: "C#", level: 60 },
    ],
  },
  {
    name: "Frameworks",
    skills: [
      { name: "Laravel", level: 90 },
      { name: "Vue.js", level: 60 },
      { name: "Node.js", level: 70 },
      { name: "Express.js", level: 50 },
      { name: "React.js", level: 40 },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 90 },
      { name: "OracleDB", level: 85 },
      { name: "MariaDB", level: 90 },
    ],
  },
  {
    name: "Dev Tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 95 },
      { name: "VSCode", level: 90 },
      { name: "Docker", level: 75 },
    ],
  },
  {
    name: "CRM Development",
    skills: [
      { name: "Ericsson Order Care [EOC]", level: 70 },
      { name: "Ericsson Catalog Manager [ECM]", level: 40 },
      { name: "Creatio", level: 50 },
    ],
  },
];

export const softSkills: string[] = [
  "Team Collaboration",
  "Communication",
  "Time Management",
  "Problem-Solving",
  "Adaptability",
  "Leadership",
  "Creativity",
  "Accountability",
];
