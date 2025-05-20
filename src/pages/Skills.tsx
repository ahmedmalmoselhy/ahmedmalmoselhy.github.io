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

// Placeholder skill data
const frontendSkills = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'JavaScript', level: 95 },
  { name: 'HTML/CSS', level: 88 },
  { name: 'Angular', level: 75 },
  { name: 'Vue', level: 70 },
  { name: 'Redux', level: 85 },
  { name: 'Styled Components', level: 80 },
];

const backendSkills = [
  { name: 'Node.js', level: 92 },
  { name: 'Express', level: 90 },
  { name: 'MongoDB', level: 85 },
  { name: 'PostgreSQL', level: 80 },
  { name: 'GraphQL', level: 75 },
  { name: 'REST APIs', level: 95 },
  { name: 'Java', level: 70 },
  { name: 'Python', level: 65 },
];

const otherSkills = [
  { name: 'Git', level: 90 },
  { name: 'Docker', level: 75 },
  { name: 'AWS', level: 80 },
  { name: 'CI/CD', level: 85 },
  { name: 'Agile', level: 90 },
  { name: 'Testing', level: 82 },
  { name: 'Microservices', level: 78 },
  { name: 'System Design', level: 85 },
];

const Skills = () => {
  return (
    <Layout className="pt-28">
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-white mb-4 animate-fade-in">
            My Skills
          </h1>
          <p className="text-portfolio-slate max-w-3xl mx-auto animate-fade-in">
            A comprehensive overview of my technical skills and proficiency levels. I constantly strive to expand my knowledge and stay current with the latest technologies.
          </p>
        </header>

        <div className="space-y-16">
          {/* Frontend Skills */}
          <section>
            <h2 className="section-title mb-8">Frontend Development</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {frontendSkills.map((skill) => (
                <div key={skill.name} className="card p-4 text-center">
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
          <section>
            <h2 className="section-title mb-8">Backend Development</h2>
            <Card className="bg-portfolio-lightNavy border-portfolio-slate/20">
              <CardContent className="pt-6">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={backendSkills}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {backendSkills.map((skill) => (
                <div key={skill.name} className="card p-4 text-center">
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

          {/* Other Skills */}
          <section>
            <h2 className="section-title mb-8">Tools & Other Skills</h2>
            <Card className="bg-portfolio-lightNavy border-portfolio-slate/20">
              <CardContent className="pt-6">
                <div className="h-80 w-full">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
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
          </section>

          {/* Soft Skills */}
          <section>
            <h2 className="section-title mb-8">Soft Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card flex flex-col items-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-4">
                  <span className="text-portfolio-highlight text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-portfolio-white mb-3">Team Collaboration</h3>
                <p className="text-portfolio-lightSlate">
                  Experienced in working with cross-functional teams, collaborating effectively with designers, product managers, and other developers.
                </p>
              </div>
              
              <div className="card flex flex-col items-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-4">
                  <span className="text-portfolio-highlight text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-portfolio-white mb-3">Communication</h3>
                <p className="text-portfolio-lightSlate">
                  Clear and effective communicator who can explain technical concepts to both technical and non-technical audiences.
                </p>
              </div>
              
              <div className="card flex flex-col items-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-4">
                  <span className="text-portfolio-highlight text-3xl">⏱️</span>
                </div>
                <h3 className="text-xl font-semibold text-portfolio-white mb-3">Time Management</h3>
                <p className="text-portfolio-lightSlate">
                  Skilled at prioritizing tasks, meeting deadlines, and managing multiple projects simultaneously.
                </p>
              </div>
              
              <div className="card flex flex-col items-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-4">
                  <span className="text-portfolio-highlight text-3xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-portfolio-white mb-3">Problem-Solving</h3>
                <p className="text-portfolio-lightSlate">
                  Strong analytical and problem-solving skills with a methodical approach to debugging and feature development.
                </p>
              </div>
              
              <div className="card flex flex-col items-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-4">
                  <span className="text-portfolio-highlight text-3xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold text-portfolio-white mb-3">Adaptability</h3>
                <p className="text-portfolio-lightSlate">
                  Quick to learn new technologies and adapt to changing requirements and project needs.
                </p>
              </div>
              
              <div className="card flex flex-col items-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-portfolio-highlight/20 flex items-center justify-center mb-4">
                  <span className="text-portfolio-highlight text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-portfolio-white mb-3">Leadership</h3>
                <p className="text-portfolio-lightSlate">
                  Experience mentoring junior developers and leading small teams to achieve project goals.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
