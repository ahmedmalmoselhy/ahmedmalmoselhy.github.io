import React from "react";
import { experiences } from "@/data/experience";
import { calculateDuration } from "@/lib/date-utils";
import { parse } from "date-fns";

interface TimelineEntry {
  company: string;
  role: string;
  startDate: Date;
  endDate: Date;
  isPromotion: boolean;
  companyIndex: number;
  roleIndex: number;
}

const parseDate = (dateStr: string): Date => {
  if (dateStr.toLowerCase() === "present") {
    return new Date();
  }
  return parse(dateStr, "MMMM yyyy", new Date());
};

const CareerTimeline: React.FC = () => {
  // Build flat list of all roles with dates
  const entries: TimelineEntry[] = [];
  
  experiences.forEach((exp, companyIndex) => {
    exp.roles.forEach((role, roleIndex) => {
      const [startStr, endStr] = role.period.split(" - ");
      entries.push({
        company: exp.company,
        role: role.title,
        startDate: parseDate(startStr.trim()),
        endDate: parseDate(endStr.trim()),
        isPromotion: exp.roles.length > 1 && roleIndex > 0,
        companyIndex,
        roleIndex,
      });
    });
  });

  // Sort by start date (oldest first)
  entries.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  // Calculate timeline bounds
  const minDate = entries[0]?.startDate || new Date();
  const maxDate = new Date();
  const totalDuration = maxDate.getTime() - minDate.getTime();

  // Color palette for companies
  const companyColors = [
    "bg-portfolio-highlight",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
  ];

  const getPosition = (date: Date) => {
    return ((date.getTime() - minDate.getTime()) / totalDuration) * 100;
  };

  const getWidth = (start: Date, end: Date) => {
    return ((end.getTime() - start.getTime()) / totalDuration) * 100;
  };

  // Get unique years for axis labels
  const startYear = minDate.getFullYear();
  const endYear = maxDate.getFullYear();
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="mb-12 p-6 bg-portfolio-lightNavy rounded-lg border border-portfolio-slate/20">
      <h2 className="text-xl font-bold text-portfolio-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-portfolio-highlight"></span>
        Career Timeline
      </h2>

      {/* Timeline visualization */}
      <div className="relative">
        {/* Year markers */}
        <div className="flex justify-between mb-2 text-xs text-portfolio-slate">
          {years.map((year) => (
            <span key={year} className="font-mono">{year}</span>
          ))}
        </div>

        {/* Timeline track */}
        <div className="relative h-2 bg-portfolio-slate/20 rounded-full mb-6">
          {/* Year grid lines */}
          {years.map((year) => {
            const yearDate = new Date(year, 0, 1);
            const pos = getPosition(yearDate);
            return (
              <div
                key={year}
                className="absolute top-0 w-px h-full bg-portfolio-slate/30"
                style={{ left: `${pos}%` }}
              />
            );
          })}
        </div>

        {/* Role bars */}
        <div className="space-y-3">
          {entries.map((entry, idx) => {
            const left = getPosition(entry.startDate);
            const width = getWidth(entry.startDate, entry.endDate);
            const colorClass = companyColors[entry.companyIndex % companyColors.length];
            const duration = calculateDuration(
              `${entry.startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${entry.endDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
            );

            return (
              <div key={idx} className="relative h-10 group">
                {/* Bar */}
                <div
                  className={`absolute h-8 rounded-md ${colorClass} opacity-80 hover:opacity-100 transition-all duration-200 cursor-pointer flex items-center overflow-hidden`}
                  style={{
                    left: `${left}%`,
                    width: `${Math.max(width, 2)}%`,
                  }}
                >
                  {width > 10 && (
                    <span className="px-2 text-xs font-medium text-white truncate">
                      {entry.role}
                    </span>
                  )}
                </div>

                {/* Tooltip on hover */}
                <div
                  className="absolute bottom-full mb-2 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
                  style={{ left: `${left}%` }}
                >
                  <div className="bg-background border border-portfolio-slate/30 rounded-lg p-3 shadow-xl min-w-[200px]">
                    <p className="font-semibold text-portfolio-white text-sm">{entry.role}</p>
                    <p className="text-portfolio-slate text-xs mt-1">{entry.company}</p>
                    <p className="text-portfolio-highlight text-xs mt-1 font-mono">
                      {duration}
                    </p>
                    {entry.isPromotion && (
                      <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">
                        Promoted
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-portfolio-slate/20">
          <div className="flex flex-wrap gap-4">
            {experiences.map((exp, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${companyColors[idx % companyColors.length]}`}></div>
                <span className="text-xs text-portfolio-slate">{exp.company.split(" [")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total experience */}
        <div className="mt-4 text-center">
          <span className="text-portfolio-slate text-sm">Total Experience: </span>
          <span className="text-portfolio-highlight font-semibold">
            {calculateDuration(`${minDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - Present`)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;
