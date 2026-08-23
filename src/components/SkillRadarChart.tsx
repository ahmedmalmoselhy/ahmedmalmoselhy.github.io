import React, { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { skillColorMap, type SkillCategory } from "@/data/skills";
import { techIcons, FallbackIcon } from "@/components/TechStackIcons";

interface SkillRadarChartProps {
  categories: SkillCategory[];
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Prepare data for the radar chart based on selection
  const radarData = React.useMemo(() => {
    if (activeCategory) {
      // Show specific skills for the selected category
      const category = categories.find((c) => c.name === activeCategory);
      if (!category) return [];

      return category.skills.map((skill) => ({
        subject: skill.name,
        level: skill.level,
        fullMark: 100,
        color: skillColorMap[category.color] || "#569CD6",
      }));
    } else {
      // Show averages for all categories
      return categories.map((category) => {
        const avgLevel =
          category.skills.reduce((sum, skill) => sum + skill.level, 0) /
          category.skills.length;
        return {
          subject: category.name,
          level: Math.round(avgLevel),
          fullMark: 100,
          color: skillColorMap[category.color] || "#569CD6",
        };
      });
    }
  }, [activeCategory, categories]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      // If drilling down, we don't have a category object to look up, 
      // but we can find the skill or just show the level.

      return (
        <div className="bg-portfolio-lightNavy/95 backdrop-blur-sm border border-portfolio-slate/30 rounded-lg p-4 shadow-xl">
          <h4 className="text-portfolio-white font-semibold mb-2">
            {data.subject}
          </h4>
          <p className="text-portfolio-highlight text-sm">
            {activeCategory ? "Proficiency" : "Average"}: {data.level}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom Angle Tick to allow smooth label movement
  const CustomAngleTick = (props: any) => {
    const { x, y, payload, index } = props;
    return (
      <g
        transform={`translate(${x},${y})`}
        style={{ transition: 'transform 0.6s ease-in-out' }}
      >
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#9D9D9D"
          fontSize={12}
          className="transition-opacity duration-500"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full">
      <style>{`
        .recharts-polar-grid-concentric-path,
        .recharts-polar-grid-angular-path {
          transition: d 0.6s ease-in-out, opacity 0.6s ease-in-out !important;
        }
        .recharts-polar-angle-axis-tick {
          transition: transform 0.6s ease-in-out !important;
        }
      `}</style>
      {/* Category Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === null
            ? "bg-portfolio-highlight text-portfolio-navy"
            : "bg-portfolio-lightNavy/50 text-portfolio-slate hover:text-portfolio-white border border-portfolio-slate/20"
            }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() =>
              setActiveCategory(
                activeCategory === category.name ? null : category.name
              )
            }
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category.name
              ? "text-portfolio-navy"
              : "bg-portfolio-lightNavy/50 text-portfolio-slate hover:text-portfolio-white border border-portfolio-slate/20"
              }`}
            style={{
              backgroundColor:
                activeCategory === category.name
                  ? skillColorMap[category.color]
                  : undefined,
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Content Container - Side by Side on Desktop */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Radar Chart */}
        <div className="h-[400px] w-full lg:w-1/2">
          <table className="sr-only">
            <caption>
              {activeCategory ? `${activeCategory} skill proficiency` : "Skill category averages"}
            </caption>
            <tbody>
              {radarData.map((row) => (
                <tr key={row.subject}>
                  <th scope="row">{row.subject}</th>
                  <td>{row.level}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid
                stroke="#858585"
                strokeOpacity={0.3}
                gridType="polygon"
              />
              <PolarAngleAxis
                dataKey="subject"
                tick={<CustomAngleTick />}
                tickLine={false}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "#858585", fontSize: 10 }}
                tickCount={5}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                name="Skills"
                dataKey="level"
                stroke="#569CD6"
                fill="#569CD6"
                fillOpacity={0.3}
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={500}
                animationEasing="ease-in-out"
                dot={{
                  r: 4,
                  fill: "#569CD6",
                  stroke: "#1E1E1E",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#4EC9B0",
                  stroke: "#1E1E1E",
                  strokeWidth: 2,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Active Category Details */}
        <div className="w-full lg:w-1/2 min-h-[200px] flex flex-col justify-center">
          {activeCategory ? (
            <div className="animate-fade-in w-full">
              {categories
                .filter((c) => c.name === activeCategory)
                .map((category) => (
                  <div
                    key={category.name}
                    className="bg-portfolio-lightNavy/30 rounded-xl p-6 border border-portfolio-slate/10"
                  >
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: skillColorMap[category.color] }}
                    >
                      {category.name} Skills
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {category.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-portfolio-navy/40 rounded-lg px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 flex-shrink-0">
                              {techIcons[skill.name] || <FallbackIcon name={skill.name} />}
                            </div>
                            <span className="text-portfolio-white text-sm">
                              {skill.name}
                            </span>
                          </div>
                          <span
                            className="font-mono text-sm"
                            style={{ color: skillColorMap[category.color] }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="w-full bg-portfolio-lightNavy/30 rounded-xl p-6 border border-portfolio-slate/10 animate-fade-in">
              <h3 className="text-xl font-bold mb-4 text-portfolio-white">
                Category Averages
              </h3>
              <div className="space-y-4">
                {categories.map((category, idx) => {
                  const avgLevel = Math.round(
                    category.skills.reduce((sum, skill) => sum + skill.level, 0) /
                    category.skills.length
                  );
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-portfolio-navy/40 rounded-lg px-4 py-3"
                    >
                      <span className="text-portfolio-white text-sm">
                        {category.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-portfolio-navy rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${avgLevel}%`,
                              backgroundColor: skillColorMap[category.color]
                            }}
                          />
                        </div>
                        <span
                          className="font-mono text-sm w-8 text-right"
                          style={{ color: skillColorMap[category.color] }}
                        >
                          {avgLevel}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;
