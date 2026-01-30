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

interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
  color: string;
}

interface SkillRadarChartProps {
  categories: SkillCategory[];
}

const colorMap: Record<string, string> = {
  "portfolio-highlight": "#569CD6",
  "portfolio-blue": "#569CD6",
  "portfolio-teal": "#4EC9B0",
  "portfolio-slate": "#858585",
  "portfolio-lightSlate": "#9D9D9D",
};

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Prepare data for the radar chart - use category averages
  const radarData = categories.map((category) => {
    const avgLevel =
      category.skills.reduce((sum, skill) => sum + skill.level, 0) /
      category.skills.length;
    return {
      category: category.name,
      level: Math.round(avgLevel),
      fullMark: 100,
      color: colorMap[category.color] || "#569CD6",
    };
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const category = categories.find((c) => c.name === data.category);
      return (
        <div className="bg-portfolio-lightNavy/95 backdrop-blur-sm border border-portfolio-slate/30 rounded-lg p-4 shadow-xl">
          <h4 className="text-portfolio-white font-semibold mb-2">
            {data.category}
          </h4>
          <p className="text-portfolio-highlight text-sm mb-2">
            Average: {data.level}%
          </p>
          {category && (
            <div className="space-y-1">
              {category.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex justify-between gap-4 text-xs text-portfolio-slate"
                >
                  <span>{skill.name}</span>
                  <span className="text-portfolio-lightSlate">
                    {skill.level}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* Category Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === null
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
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category.name
                ? "text-portfolio-navy"
                : "bg-portfolio-lightNavy/50 text-portfolio-slate hover:text-portfolio-white border border-portfolio-slate/20"
            }`}
            style={{
              backgroundColor:
                activeCategory === category.name
                  ? colorMap[category.color]
                  : undefined,
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Radar Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid
              stroke="#858585"
              strokeOpacity={0.3}
              gridType="polygon"
            />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: "#9D9D9D", fontSize: 12 }}
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
              className="transition-all duration-300"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Active Category Details */}
      {activeCategory && (
        <div className="mt-6 animate-fade-in">
          {categories
            .filter((c) => c.name === activeCategory)
            .map((category) => (
              <div
                key={category.name}
                className="bg-portfolio-lightNavy/30 rounded-xl p-6 border border-portfolio-slate/10"
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: colorMap[category.color] }}
                >
                  {category.name} Skills
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-portfolio-navy/40 rounded-lg px-4 py-3"
                    >
                      <span className="text-portfolio-white text-sm">
                        {skill.name}
                      </span>
                      <span
                        className="font-mono text-sm"
                        style={{ color: colorMap[category.color] }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SkillRadarChart;
