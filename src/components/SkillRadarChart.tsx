import React, { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";
import { type SkillCategory } from "@/data/skills";
import { techIcons, FallbackIcon } from "@/components/TechStackIcons";

interface SkillRadarChartProps {
  categories: SkillCategory[];
}

const average = (category: SkillCategory) =>
  Math.round(category.skills.reduce((sum, s) => sum + s.level, 0) / category.skills.length);

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// SVG presentation attributes can't read CSS variables, so the chart draws in
// currentColor and the wrapper sets it to the accent.
const CustomAngleTick = ({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    dominantBaseline="middle"
    fontSize={12}
    style={{ fill: "hsl(var(--muted-foreground))" }}
  >
    {payload?.value}
  </text>
);

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) =>
  active && payload?.length ? (
    <div className="rounded-xl border bg-popover px-3 py-2 text-popover-foreground shadow-lg">
      <p className="text-subhead font-semibold">{payload[0].payload.subject}</p>
      <p className="text-footnote text-muted-foreground">{payload[0].value}%</p>
    </div>
  ) : null;

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const selected = categories.find((c) => c.name === activeCategory);

  // One category: its skills. Otherwise: each category's average.
  const rows = selected
    ? selected.skills.map((s) => ({ subject: s.name, level: s.level }))
    : categories.map((c) => ({ subject: c.name, level: average(c) }));

  const filters = [{ name: "All", value: null }, ...categories.map((c) => ({ name: c.name, value: c.name }))];

  return (
    <div>
      <div role="group" aria-label="Skill category" className="flex flex-wrap gap-2">
        {filters.map(({ name, value }) => (
          <button
            key={name}
            onClick={() => setActiveCategory(value)}
            aria-pressed={activeCategory === value}
            className={cn(
              "h-9 rounded-full px-4 text-subhead font-medium transition-colors",
              activeCategory === value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/70",
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
        <div aria-hidden className="h-[22rem] text-primary">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={rows} cx="50%" cy="50%" outerRadius="68%">
              <PolarGrid stroke="currentColor" strokeOpacity={0.18} gridType="polygon" />
              <PolarAngleAxis dataKey="subject" tick={<CustomAngleTick />} tickLine={false} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                dataKey="level"
                stroke="currentColor"
                fill="currentColor"
                fillOpacity={0.2}
                strokeWidth={2}
                isAnimationActive={!reduceMotion}
                animationDuration={300}
                dot={{ r: 3, fill: "currentColor", stroke: "none" }}
                activeDot={{ r: 5, fill: "currentColor", stroke: "none" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* The list carries the same numbers as the chart, readable by everyone. */}
        <div>
          <h3 className="mb-3 text-headline">
            {selected ? selected.name : "Category Averages"}
          </h3>
          <ul className="divide-y overflow-hidden rounded-2xl bg-secondary/50">
            {rows.map((row) => (
              <li key={row.subject} className="flex min-h-[44px] items-center gap-3 px-4 py-2.5">
                {selected && (
                  <span className="h-6 w-6 shrink-0">
                    {techIcons[row.subject] || <FallbackIcon name={row.subject} />}
                  </span>
                )}
                <span className="min-w-0 flex-1 text-subhead">{row.subject}</span>
                <span aria-hidden className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-secondary sm:block">
                  <span className="block h-full rounded-full bg-primary" style={{ width: `${row.level}%` }} />
                </span>
                <span className="w-10 text-right text-subhead tabular-nums text-muted-foreground">
                  {row.level}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;
