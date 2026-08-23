import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import SkillRadarChart from "@/components/SkillRadarChart";
import TechStackIcons from "@/components/TechStackIcons";
import { skillCategories, softSkills, skillColorMap } from "@/data/skills";

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

        {/* Skill Radar Chart Section */}
        <section className="mb-20 animate-slide-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-portfolio-highlight rounded-full"></div>
            <h2 className="text-3xl font-bold text-portfolio-white">Skill Analysis</h2>
          </div>
          <Card className="bg-portfolio-lightNavy/30 backdrop-blur-sm border-portfolio-slate/10 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <SkillRadarChart categories={skillCategories} />
            </CardContent>
          </Card>
        </section>

        {/* Technical Skills Grid Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-portfolio-highlight rounded-full"></div>
            <h2 className="text-3xl font-bold text-portfolio-white">Core Competencies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, idx) => (
              <Card
                key={idx}
                className="bg-portfolio-lightNavy/20 backdrop-blur-sm border-portfolio-slate/10 hover:border-portfolio-highlight/30 transition-all duration-300 shadow-lg group hover:-translate-y-1 hover:z-[100] relative"
              >
                <CardContent className="p-6">
                  <h3
                    className="text-xl font-bold mb-6 text-center group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-portfolio-white group-hover:to-portfolio-slate transition-all duration-300"
                    style={{ color: skillColorMap[category.color] }}
                  >
                    {category.name}
                  </h3>
                  <TechStackIcons
                    skills={category.skills}
                    categoryColor={category.color}
                  />
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
