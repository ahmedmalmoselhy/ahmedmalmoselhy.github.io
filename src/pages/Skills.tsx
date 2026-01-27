import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

// Color map for skill categories
const colorMap: Record<string, string> = {
  "portfolio-highlight": "#569CD6",
  "portfolio-blue": "#569CD6",
  "portfolio-teal": "#4EC9B0",
  "portfolio-slate": "#858585",
  "portfolio-lightSlate": "#9D9D9D",
};

// Skill categories with their respective skills
const skillCategories = [
  {
    name: "Languages",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "PHP", level: 80 },
      { name: "Java", level: 70 },
      { name: "Python", level: 65 },
      { name: "HTML/CSS", level: 88 },
      { name: "C#", level: 60 },
    ],
    color: "portfolio-highlight",
  },
  {
    name: "Frameworks",
    skills: [
      { name: "Laravel", level: 85 },
      { name: "Vue", level: 75 },
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "REST APIs", level: 95 },
    ],
    color: "portfolio-blue",
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 85 },
      { name: "OracleDB", level: 75 },
      { name: "MariaDB", level: 70 },
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
      { name: "Agile", level: 90 },
    ],
    color: "portfolio-blue",
  },
  {
    name: "CRM Systems",
    skills: [
      { name: "EOC", level: 70 },
      { name: "ECM", level: 40 },
      { name: "Creatio", level: 50 },
    ],
    color: "portfolio-teal",
  },
  {
    name: "Other Tools",
    skills: [
      { name: "Jira", level: 85 },
      { name: "Confluence", level: 80 },
      { name: "Salesforce", level: 70 },
      { name: "HubSpot", level: 65 },
    ],
    color: "portfolio-blue",
  },
];

// Soft skills for the simplified display
const softSkills = [
  { name: "Team Collaboration", icon: "🤝" },
  { name: "Communication", icon: "💬" },
  { name: "Time Management", icon: "⏱️" },
  { name: "Problem-Solving", icon: "💡" },
  { name: "Adaptability", icon: "🧠" },
  { name: "Leadership", icon: "🚀" },
  { name: "Creativity", icon: "🎨" },
  { name: "Accountability", icon: "📊" },
];

const Skills = () => {
  return (
    <Layout className="pt-28">
      <section className="container mx-auto px-4 py-8 md:py-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-portfolio-highlight to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-portfolio-white mb-6 animate-fade-in tracking-tight">
            Technical <span className="text-portfolio-highlight">Expertise</span>
          </h1>
          <p className="text-portfolio-lightSlate text-lg md:text-xl animate-slide-up leading-relaxed max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency
            levels. I constantly strive to expand my knowledge and stay current
            with the latest technologies.
          </p>
        </div>

        {/* Technical Skills */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-portfolio-highlight rounded-full"></div>
            <h2 className="text-3xl font-bold text-portfolio-white">Core Competencies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {skillCategories.map((category, idx) => (
              <Card
                key={idx}
                className="bg-portfolio-lightNavy/30 backdrop-blur-sm border-portfolio-slate/10 hover:border-portfolio-highlight/30 transition-all duration-300 shadow-lg shadow-transparent hover:shadow-portfolio-highlight/5 group"
              >
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-6 text-portfolio-white group-hover:text-portfolio-highlight transition-colors flex items-center gap-2">
                    {category.name}
                  </h3>
                  <div className="space-y-5">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-portfolio-lightSlate group-hover:text-portfolio-slate transition-colors">
                            {skill.name}
                          </span>
                          <span style={{ color: colorMap[category.color] }} className="font-mono text-xs opacity-80">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-portfolio-navy/60 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out group-hover:opacity-100 opacity-80"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: colorMap[category.color],
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Soft Skills */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-portfolio-highlight rounded-full"></div>
            <h2 className="text-3xl font-bold text-portfolio-white">Soft Skills & Traits</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {softSkills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-portfolio-lightNavy/20 backdrop-blur-sm border border-portfolio-slate/10 rounded-xl p-6 text-center hover:bg-portfolio-lightNavy/40 hover:-translate-y-1 hover:border-portfolio-highlight/30 transition-all duration-300 group shadow-md hover:shadow-xl"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-portfolio-navy flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-portfolio-slate/10 group-hover:border-portfolio-highlight/20">
                  <span className="text-2xl filter drop-shadow-md">
                    {skill.icon}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-portfolio-white group-hover:text-portfolio-highlight transition-colors">
                  {skill.name}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Skills;
