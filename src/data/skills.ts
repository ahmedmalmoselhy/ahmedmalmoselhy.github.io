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
  icon: string;
}

// Shared color map for skill category accents, used by the radar chart,
// tech stack icons, and the skills grid.
export const skillColorMap: Record<string, string> = {
  "portfolio-highlight": "#569CD6",
  "portfolio-blue": "#569CD6",
  "portfolio-teal": "#4EC9B0",
  "portfolio-slate": "#858585",
  "portfolio-lightSlate": "#9D9D9D",
};

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
    color: "portfolio-highlight",
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
    color: "portfolio-blue",
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 90 },
      { name: "OracleDB", level: 85 },
      { name: "MariaDB", level: 90 },
    ],
    color: "portfolio-teal",
  },
  {
    name: "Dev Tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 95 },
      { name: "VSCode", level: 90 },
      { name: "Docker", level: 75 },
    ],
    color: "portfolio-lightSlate",
  },
  {
    name: "CRM Systems",
    skills: [
      { name: "Ericsson Order Care [EOC]", level: 70 },
      { name: "Ericsson Catalog Manager [ECM]", level: 40 },
      { name: "Creatio", level: 50 },
    ],
    color: "portfolio-slate",
  },
];

export const softSkills: SoftSkill[] = [
  { name: "Team Collaboration", icon: "🤝" },
  { name: "Communication", icon: "💬" },
  { name: "Time Management", icon: "⏱️" },
  { name: "Problem-Solving", icon: "💡" },
  { name: "Adaptability", icon: "🧠" },
  { name: "Leadership", icon: "🚀" },
  { name: "Creativity", icon: "🎨" },
  { name: "Accountability", icon: "📊" },
];
