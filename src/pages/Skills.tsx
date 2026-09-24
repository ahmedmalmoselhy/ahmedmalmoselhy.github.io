import React from "react";
import Layout from "@/components/Layout";
import { CodeHeading, CodeView, FileHeader } from "@/components/CodeView";
import SkillRadarChart from "@/components/SkillRadarChart";
import TechStackIcons from "@/components/TechStackIcons";
import { skillCategories, softSkills, skillColorMap } from "@/data/skills";

const toKey = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "_");

// Soft skills rendered as a YAML list
const softSkillLines: React.ReactNode[] = [
  <span className="syn-keyword">soft_skills:</span>,
  ...softSkills.map((s) => (
    <>
      <span className="syn-number">  - </span>
      <span className="syn-string">{s.name}</span>
    </>
  )),
];

const Skills = () => {
  return (
    <Layout>
      <FileHeader
        comment="skills.yaml — proficiency levels, kept current"
        keyword="const"
        name="skills"
        description="Technical skills across telecom, CRM, and full-stack web. Hover any icon for its level."
      />

      <section className="mb-14">
        <CodeHeading>Skill analysis</CodeHeading>
        <div className="panel p-4 md:p-6">
          <SkillRadarChart categories={skillCategories} />
        </div>
      </section>

      <section className="mb-14">
        <CodeHeading>Core competencies</CodeHeading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {skillCategories.map((category) => (
            // hover:z-[100] keeps icon tooltips above neighbouring panels
            <article key={category.name} className="panel relative hover:z-[100]">
              <h3 className="flex items-center gap-2 border-b border-border bg-[hsl(var(--chrome-2))] px-3 py-1.5 font-mono text-xs">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: skillColorMap[category.color] }}
                  aria-hidden="true"
                />
                <span className="syn-keyword">{toKey(category.name)}</span>
                <span className="text-portfolio-slate">:</span>
                <span className="syn-comment ml-auto text-xs"># {category.skills.length} items</span>
              </h3>
              <div className="p-4">
                <TechStackIcons skills={category.skills} categoryColor={category.color} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <CodeHeading>Soft skills</CodeHeading>
        <div className="panel overflow-hidden bg-background">
          <CodeView lines={softSkillLines} />
        </div>
      </section>
    </Layout>
  );
};

export default Skills;
