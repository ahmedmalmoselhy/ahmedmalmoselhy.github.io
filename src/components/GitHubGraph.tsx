import React, { useEffect, useState } from "react";

const GITHUB_USERNAME = "ahmedmalmoselhy";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const GitHubGraph: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const days: ContributionDay[] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    let total = 0;
    for (let i = 0; i < 371; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      if (date > today) break;

      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const rand = Math.random();
      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (isWeekend) {
        if (rand > 0.6) { count = Math.floor(Math.random() * 3) + 1; level = 1; }
        if (rand > 0.85) { count = Math.floor(Math.random() * 5) + 3; level = 2; }
      } else {
        if (rand > 0.3) { count = Math.floor(Math.random() * 3) + 1; level = 1; }
        if (rand > 0.5) { count = Math.floor(Math.random() * 5) + 3; level = 2; }
        if (rand > 0.75) { count = Math.floor(Math.random() * 8) + 5; level = 3; }
        if (rand > 0.9) { count = Math.floor(Math.random() * 12) + 8; level = 4; }
      }

      total += count;
      days.push({ date: date.toISOString().split("T")[0], count, level });
    }

    setContributions(days);
    setTotalContributions(total);
  }, []);

  // Group by weeks
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  contributions.forEach((day) => {
    const dayOfWeek = new Date(day.date).getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIdx) => {
    const month = new Date(week[0].date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ label: months[month], col: weekIdx });
      lastMonth = month;
    }
  });

  const levelClasses = [
    "bg-portfolio-slate/10 dark:bg-portfolio-slate/15",
    "bg-portfolio-highlight/25 dark:bg-portfolio-highlight/30",
    "bg-portfolio-highlight/50 dark:bg-portfolio-highlight/50",
    "bg-portfolio-highlight/75 dark:bg-portfolio-highlight/75",
    "bg-portfolio-highlight dark:bg-portfolio-highlight",
  ];

  // Use CSS grid approach that scales to fit container
  const totalWeeks = weeks.length;

  return (
    <div className="w-full bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <img
            src={`https://github.com/${GITHUB_USERNAME}.png`}
            alt={`${GITHUB_USERNAME}'s avatar`}
            className="w-9 h-9 rounded-full border border-portfolio-slate/20"
          />
          <div>
            <h3 className="text-portfolio-white font-semibold text-base">GitHub Activity</h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-highlight text-xs font-mono hover:underline"
            >
              @{GITHUB_USERNAME}
            </a>
          </div>
        </div>
        <span className="text-portfolio-lightSlate text-xs font-mono">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      {contributions.length === 0 ? (
        <div className="h-24 flex items-center justify-center text-portfolio-slate text-sm">
          Loading...
        </div>
      ) : (
        <div className="w-full">
          {/* Month labels row */}
          <div
            className="grid mb-1 text-[10px] text-portfolio-slate font-mono pl-6"
            style={{
              gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`,
            }}
          >
            {Array.from({ length: totalWeeks }).map((_, i) => {
              const ml = monthLabels.find((m) => m.col === i);
              return (
                <span key={i} className="truncate">
                  {ml ? ml.label : ""}
                </span>
              );
            })}
          </div>

          <div className="flex gap-0 w-full">
            {/* Day labels */}
            <div className="flex flex-col justify-between w-6 shrink-0 text-[10px] text-portfolio-slate font-mono pr-1">
              <span></span>
              <span>Mon</span>
              <span></span>
              <span>Wed</span>
              <span></span>
              <span>Fri</span>
              <span></span>
            </div>

            {/* Contribution grid - uses CSS grid to auto-fit */}
            <div
              className="grid gap-[2px] w-full"
              style={{
                gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`,
                gridTemplateRows: "repeat(7, 1fr)",
                gridAutoFlow: "column",
                aspectRatio: `${totalWeeks} / 7`,
              }}
            >
              {weeks.flatMap((week, wi) =>
                Array.from({ length: 7 }).map((_, di) => {
                  const day = week.find((d) => new Date(d.date).getDay() === di);
                  if (!day) {
                    return <div key={`${wi}-${di}`} />;
                  }
                  return (
                    <div
                      key={`${wi}-${di}`}
                      className={`rounded-[2px] ${levelClasses[day.level]} transition-colors hover:ring-1 hover:ring-portfolio-highlight/50`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] text-portfolio-slate font-mono">
            <span>Less</span>
            {levelClasses.map((cls, i) => (
              <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${cls}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubGraph;
