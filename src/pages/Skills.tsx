import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import SkillRadarChart from "@/components/SkillRadarChart";
import TechStackIcons from "@/components/TechStackIcons";
import { skillCategories, softSkills, skillColorMap } from "@/data/skills";

const Skills = () => {
  return (
    <Layout className="pt-28">
      <section className="container mx-auto px-4 py-8 md:py-12 relative">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="page-title mb-6 animate-slide-up">
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
            <div className="w-1 h-8 rounded-full bg-portfolio-highlight"></div>
            <h2 className="text-3xl font-bold text-portfolio-white">Skill Analysis</h2>
          </div>
          <Card className="panel reveal">
            <CardContent className="p-6 md:p-8">
              <SkillRadarChart categories={skillCategories} />
            </CardContent>
          </Card>
        </section>

        {/* Technical Skills Grid Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full bg-portfolio-highlight"></div>
            <h2 className="text-3xl font-bold text-portfolio-white">Core Competencies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, idx) => (
              <Card
                key={idx}
                className="panel card-interactive reveal cursor-default group hover:z-[100]"
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
            <div className="w-1 h-8 rounded-full bg-portfolio-highlight"></div>
            <h2 className="text-3xl font-bold text-portfolio-white">Soft Skills & Traits</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {softSkills.map((skill, idx) => (
              <div
                key={idx}
                className="panel card-interactive reveal cursor-default group rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-portfolio-highlight/10 text-portfolio-highlight ring-1 ring-inset ring-portfolio-highlight/25 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-[-8deg] transition-transform duration-500">
                  <skill.icon size={24} aria-hidden="true" />
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
