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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Generate realistic-looking placeholder data for the last 52 weeks
    const days: ContributionDay[] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    // Align to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    let total = 0;
    for (let i = 0; i < 371; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      if (date > today) break;

      // Simulate contribution pattern with some randomness
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
      days.push({
        date: date.toISOString().split("T")[0],
        count,
        level,
      });
    }

    setContributions(days);
    setTotalContributions(total);
    setLoading(false);
  }, []);

  // Group by weeks (columns)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  contributions.forEach((day, i) => {
    const dayOfWeek = new Date(day.date).getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Calculate month labels
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIdx) => {
    const firstDay = new Date(week[0].date);
    const month = firstDay.getMonth();
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

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="w-full bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 rounded-xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <img
            src={`https://github.com/${GITHUB_USERNAME}.png`}
            alt={`${GITHUB_USERNAME}'s avatar`}
            className="w-10 h-10 rounded-full border border-portfolio-slate/20"
          />
          <div>
            <h3 className="text-portfolio-white font-semibold text-lg">
              GitHub Activity
            </h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-highlight text-sm font-mono hover:underline"
            >
              @{GITHUB_USERNAME}
            </a>
          </div>
        </div>
        <span className="text-portfolio-lightSlate text-sm font-mono">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      {loading ? (
        <div className="h-32 flex items-center justify-center text-portfolio-slate text-sm">
          Loading...
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="min-w-[720px]">
            {/* Month labels */}
            <div className="flex ml-8 mb-1 text-xs text-portfolio-slate font-mono">
              {monthLabels.map((m, i) => (
                <span
                  key={i}
                  className="absolute"
                  style={{
                    marginLeft: `${m.col * 14}px`,
                    position: "relative",
                  }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            <div className="flex gap-0">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-2 text-xs text-portfolio-slate font-mono pt-0">
                {dayLabels.map((label, i) => (
                  <div key={i} className="h-[11px] flex items-center text-[10px] leading-none">
                    {label}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((_, di) => {
                      const day = week.find(
                        (d) => new Date(d.date).getDay() === di
                      );
                      if (!day) {
                        return <div key={di} className="w-[11px] h-[11px]" />;
                      }
                      return (
                        <div
                          key={di}
                          className={`w-[11px] h-[11px] rounded-sm ${levelClasses[day.level]} transition-colors hover:ring-1 hover:ring-portfolio-highlight/50`}
                          title={`${day.count} contributions on ${day.date}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-3 text-xs text-portfolio-slate font-mono">
              <span>Less</span>
              {levelClasses.map((cls, i) => (
                <div key={i} className={`w-[11px] h-[11px] rounded-sm ${cls}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubGraph;
