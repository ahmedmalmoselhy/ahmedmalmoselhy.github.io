import React from "react";
import Layout from "@/components/Layout";
import PageHeader, { SectionHeading } from "@/components/PageHeader";
import SkillRadarChart from "@/components/SkillRadarChart";
import TechStackIcons from "@/components/TechStackIcons";
import { skillCategories, softSkills, skillColorMap } from "@/data/skills";
import { skillsOverview } from "@/data/personal";

const stats = [
  { value: String(skillCategories.length), label: "Skill areas" },
  { value: String(skillCategories.reduce((n, c) => n + c.skills.length, 0)), label: "Rated skills" },
  { value: String(skillsOverview.length), label: "Tools & platforms" },
  { value: String(softSkills.length), label: "Soft skills" },
];

const Skills = () => {
  return (
    <Layout className="pt-16">
      <PageHeader
        eyebrow="Expertise"
        title="Skills & technologies"
        description="Technical skills and proficiency levels across telecom, CRM, and full-stack web — kept current with the platforms I work on."
        stats={stats}
      />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading eyebrow="Overview" title="Skill analysis" />
        <div className="panel reveal p-6 md:p-8">
          <SkillRadarChart categories={skillCategories} />
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-20">
        <SectionHeading eyebrow="By area" title="Core competencies" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category) => (
            // hover:z-[100] keeps the icon tooltips above neighbouring cards
            <article key={category.name} className="panel reveal relative p-6 hover:z-[100]">
              <h3 className="mb-5 flex items-center gap-2.5 text-lg font-semibold text-portfolio-white">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: skillColorMap[category.color] }}
                  aria-hidden="true"
                />
                {category.name}
                <span className="ml-auto text-xs font-medium text-portfolio-slate">
                  {category.skills.length} skills
                </span>
              </h3>
              <TechStackIcons skills={category.skills} categoryColor={category.color} />
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <SectionHeading eyebrow="Beyond code" title="Soft skills" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
          {softSkills.map((skill) => (
            <div key={skill.name} className="panel reveal flex items-center gap-3 p-4 md:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-portfolio-highlight/10 text-portfolio-highlight">
                <skill.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="text-sm font-semibold text-portfolio-white md:text-base">{skill.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Skills;
