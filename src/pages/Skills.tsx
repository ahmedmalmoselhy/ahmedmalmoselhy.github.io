
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

// Skill categories with their respective skills
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 88 },
      { name: 'Angular', level: 75 },
    ],
    color: "portfolio-highlight"
  },
  {
    name: "Backend",
    skills: [
      { name: 'JavaScript', level: 95 },
      { name: 'PHP', level: 80 },
      { name: 'Laravel', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 85 },
      { name: 'OracleDB', level: 75 },
      { name: 'REST APIs', level: 95 },
      { name: 'Java', level: 70 },
      { name: 'Python', level: 65 },
    ],
    color: "portfolio-blue"
  },
  {
    name: "Development Tools",
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'CI/CD', level: 85 },
      { name: 'Agile', level: 90 },
      { name: 'Testing', level: 82 },
      { name: 'System Design', level: 85 },
    ],
    color: "portfolio-slate"
  }
];

// Soft skills for the simplified display
const softSkills = [
  { name: "Team Collaboration", icon: "🤝" },
  { name: "Communication", icon: "💬" },
  { name: "Time Management", icon: "⏱️" },
  { name: "Problem-Solving", icon: "💡" },
  { name: "Adaptability", icon: "🧠" },
  { name: "Leadership", icon: "🚀" },
];

const Skills = () => {
  return (
    <Layout className="pt-28">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-white mb-4 animate-fade-in">
            My Skills
          </h1>
          <p className="text-portfolio-slate max-w-3xl mx-auto animate-fade-in">
            A comprehensive overview of my technical skills and proficiency levels. I constantly strive to expand my knowledge and stay current with the latest technologies.
          </p>
        </header>

        {/* Technical Skills */}
        <section className="mb-16">
          <h2 className="section-title mb-8">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <Card key={idx} className="bg-portfolio-lightNavy border-portfolio-slate/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-6 text-portfolio-white">{category.name}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-portfolio-lightSlate">{skill.name}</span>
                          <span className={`text-${category.color}`}>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-portfolio-navy rounded-full h-2">
                          <div 
                            className={`bg-${category.color} h-2 rounded-full`} 
                            style={{ width: `${skill.level}%` }}
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

        {/* Soft Skills - Updated with dynamic grid */}
        <section className="mb-16">
          <h2 className="section-title mb-8">Soft Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 auto-rows-fr gap-4">
            {softSkills.map((skill, idx) => (
              <div key={idx} className="card flex flex-col items-center p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-3">
                  <span className="text-portfolio-highlight text-2xl">{skill.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-portfolio-white">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Skills;
