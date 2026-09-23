import React from "react";
import Layout, { GroupedSection, PageHeader } from "@/components/Layout";
import SkillRadarChart from "@/components/SkillRadarChart";
import { skillCategories, softSkills } from "@/data/skills";

const Skills = () => {
  return (
    <Layout>
      <PageHeader
        title="Skills"
        description="What I work with and how well I know it. Choose a category to see the tools inside it."
      />

      <section aria-label="Technical skills" className="surface p-6 md:p-8">
        <SkillRadarChart categories={skillCategories} />
      </section>

      <div className="mt-14">
        <GroupedSection title="Soft Skills">
          <ul className="flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <li key={skill} className="rounded-full bg-card px-4 py-2 text-callout">
                {skill}
              </li>
            ))}
          </ul>
        </GroupedSection>
      </div>
    </Layout>
  );
};

export default Skills;
