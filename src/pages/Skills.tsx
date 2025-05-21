
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Skill data
const backendSkills = [
  { name: 'JavaScript', level: 95 },
  { name: 'PHP', level: 80 },
  { name: 'Laravel', level: 85 },
  { name: 'PostgreSQL', level: 80 },
  { name: 'MySQL', level: 85 },
  { name: 'OracleDB', level: 75 },
  { name: 'REST APIs', level: 95 },
  { name: 'Java', level: 70 },
  { name: 'Python', level: 65 },
];

const otherSkills = [
  { name: 'Git', level: 90 },
  { name: 'Docker', level: 75 },
  { name: 'CI/CD', level: 85 },
  { name: 'Agile', level: 90 },
  { name: 'Testing', level: 82 },
  { name: 'System Design', level: 85 },
];

// Group skills for better organization
const frontendSkills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'HTML/CSS', level: 88 },
  { name: 'Angular', level: 75 },
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Frontend Skills */}
          <section className="animate-fade-in">
            <h2 className="section-title mb-6">Frontend Development</h2>
            <Card className="bg-portfolio-lightNavy border-portfolio-slate/20">
              <CardContent className="pt-6">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={frontendSkills}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#8892B0" strokeOpacity={0.2} />
                      <XAxis type="number" domain={[0, 100]} stroke="#8892B0" />
                      <YAxis dataKey="name" type="category" width={100} stroke="#8892B0" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#112240', 
                          borderColor: '#2DD4BF',
                          color: '#E6F1FF'
                        }}
                        formatter={(value) => [`${value}%`, 'Proficiency']}
                      />
                      <Bar dataKey="level" fill="#2DD4BF" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {frontendSkills.map((skill) => (
                <div key={skill.name} className="card p-3 text-center">
                  <h3 className="text-portfolio-white font-semibold mb-2">{skill.name}</h3>
                  <div className="w-full bg-portfolio-navy rounded-full h-2.5">
                    <div 
                      className="bg-portfolio-highlight h-2.5 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-portfolio-highlight mt-2">{skill.level}%</p>
                </div>
              ))}
            </div>
          </section>

          {/* Backend Skills */}
          <section className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="section-title mb-6">Backend Development</h2>
            <Card className="bg-portfolio-lightNavy border-portfolio-slate/20">
              <CardContent className="pt-6">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={backendSkills.slice(0, 6)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#8892B0" strokeOpacity={0.2} />
                      <XAxis type="number" domain={[0, 100]} stroke="#8892B0" />
                      <YAxis dataKey="name" type="category" width={100} stroke="#8892B0" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#112240', 
                          borderColor: '#2DD4BF',
                          color: '#E6F1FF'
                        }}
                        formatter={(value) => [`${value}%`, 'Proficiency']}
                      />
                      <Bar dataKey="level" fill="#007BFF" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {backendSkills.map((skill) => (
                <div key={skill.name} className="card p-3 text-center">
                  <h3 className="text-portfolio-white font-semibold mb-2">{skill.name}</h3>
                  <div className="w-full bg-portfolio-navy rounded-full h-2.5">
                    <div 
                      className="bg-portfolio-blue h-2.5 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-portfolio-blue mt-2">{skill.level}%</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Tools Section */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="section-title mb-6">Development Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-portfolio-lightNavy border-portfolio-slate/20">
              <CardContent className="pt-6">
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={otherSkills}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#8892B0" strokeOpacity={0.2} />
                      <XAxis type="number" domain={[0, 100]} stroke="#8892B0" />
                      <YAxis dataKey="name" type="category" width={100} stroke="#8892B0" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#112240', 
                          borderColor: '#2DD4BF',
                          color: '#E6F1FF'
                        }}
                        formatter={(value) => [`${value}%`, 'Proficiency']}
                      />
                      <Bar dataKey="level" fill="#8892B0" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {otherSkills.map((skill) => (
                <div key={skill.name} className="card p-4 text-center">
                  <h3 className="text-portfolio-white font-semibold mb-2">{skill.name}</h3>
                  <div className="w-full bg-portfolio-navy rounded-full h-2.5">
                    <div 
                      className="bg-portfolio-slate h-2.5 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-portfolio-slate mt-2">{skill.level}%</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soft Skills */}
        <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h2 className="section-title mb-8">Soft Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="card flex flex-col items-center p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-3">
                <span className="text-portfolio-highlight text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-portfolio-white mb-2">Team Collaboration</h3>
              <p className="text-portfolio-lightSlate text-sm">
                Working effectively in cross-functional teams
              </p>
            </div>
            
            <div className="card flex flex-col items-center p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-3">
                <span className="text-portfolio-highlight text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-portfolio-white mb-2">Communication</h3>
              <p className="text-portfolio-lightSlate text-sm">
                Explaining technical concepts clearly
              </p>
            </div>
            
            <div className="card flex flex-col items-center p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-3">
                <span className="text-portfolio-highlight text-2xl">⏱️</span>
              </div>
              <h3 className="text-lg font-semibold text-portfolio-white mb-2">Time Management</h3>
              <p className="text-portfolio-lightSlate text-sm">
                Prioritizing tasks and meeting deadlines
              </p>
            </div>
            
            <div className="card flex flex-col items-center p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-3">
                <span className="text-portfolio-highlight text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-portfolio-white mb-2">Problem-Solving</h3>
              <p className="text-portfolio-lightSlate text-sm">
                Analytical approach to challenges
              </p>
            </div>
            
            <div className="card flex flex-col items-center p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-3">
                <span className="text-portfolio-highlight text-2xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold text-portfolio-white mb-2">Adaptability</h3>
              <p className="text-portfolio-lightSlate text-sm">
                Quick to learn new technologies
              </p>
            </div>
            
            <div className="card flex flex-col items-center p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-3">
                <span className="text-portfolio-highlight text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-portfolio-white mb-2">Leadership</h3>
              <p className="text-portfolio-lightSlate text-sm">
                Mentoring and leading development teams
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Skills;
