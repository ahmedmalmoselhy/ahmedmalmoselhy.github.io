import React from "react";
import Layout from "@/components/Layout";
import PageHeader, { SectionHeading } from "@/components/PageHeader";
import TechStackIcons from "@/components/TechStackIcons";
import { cn } from "@/lib/utils";
import { skillCategories, softSkills, skillColorMap } from "@/data/skills";
import { skillsOverview } from "@/data/personal";

const stats = [
  { value: String(skillCategories.length), label: "Skill areas" },
  { value: String(skillCategories.reduce((n, c) => n + c.skills.length, 0)), label: "Rated skills" },
  { value: String(skillsOverview.length), label: "Tools & platforms" },
  { value: String(softSkills.length), label: "Soft skills" },
];

// Soft-skill tiles cycle through the site's domain tints, like "Off the clock" on the home page
const tints = [
  "border-primary/30 bg-primary/[0.07] text-primary",
  "border-domain-crm/30 bg-domain-crm/[0.07] text-domain-crm",
  "border-domain-web/30 bg-domain-web/[0.07] text-domain-web",
  "border-warn/30 bg-warn/[0.08] text-warn",
];

const Skills = () => {
  return (
    <Layout className="pt-0 md:pt-16">
      <PageHeader
        eyebrow="Skills"
        title="Skills & technologies"
        description="What I work with across telecom, CRM and full-stack web, and how comfortable I am with each."
        stats={stats}
      />

      <section className="container mx-auto px-4 py-14 md:py-16">
        <SectionHeading title="Core competencies" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {skillCategories.map((category) => {
            const color = skillColorMap[category.color];
            return (
              <article
                key={category.name}
                className="panel reveal relative overflow-hidden p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
                style={{ boxShadow: `inset 0 3px 0 ${color}` }}
              >
                <h3 className="mb-5 flex items-center gap-2.5 text-lg font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                  {category.name}
                  <span className="ml-auto font-mono text-xs font-normal text-muted-foreground">
                    {category.skills.length} skills
                  </span>
                </h3>
                <TechStackIcons skills={category.skills} categoryColor={category.color} />
              </article>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14 md:pb-16">
        <SectionHeading title="Tools and platforms" />
        <div className="reveal flex flex-wrap gap-2">
          {skillsOverview.map((tool) => (
            <span key={tool} className="chip px-2.5 py-1 text-[13px]">
              {tool}
            </span>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <SectionHeading title="Soft skills" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {softSkills.map((skill, i) => (
            <div
              key={skill.name}
              className={cn(
                "reveal group flex items-center gap-3 rounded-lg border p-4 transition-transform duration-200 hover:-translate-y-1 md:p-5",
                i % 2 ? "hover:rotate-1" : "hover:-rotate-1",
                tints[i % tints.length],
              )}
            >
              <skill.icon
                size={22}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125"
              />
              <h3 className="text-sm font-semibold text-foreground md:text-[15px]">{skill.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Skills;
