import React, { useEffect, useState } from "react";

const GITHUB_USERNAME = "ahmedmalmoselhy";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiContributionDay {
  date: string;
  count: number;
  level?: 0 | 1 | 2 | 3 | 4;
}

function parseDateAsLocal(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  const ratio = count / Math.max(max, 1);
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

const GitHubGraph: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const allDays: ApiContributionDay[] = [];
        if (Array.isArray(data.contributions)) {
          for (const item of data.contributions as ApiContributionDay[]) {
            if (typeof item?.date === "string" && typeof item?.count === "number") {
              allDays.push({ date: item.date, count: item.count, level: item.level });
            }
          }
        } else if (data.contributions && typeof data.contributions === "object") {
          for (const [date, count] of Object.entries(data.contributions as Record<string, unknown>)) {
            if (typeof count === "number") {
              allDays.push({ date, count });
            }
          }
        }

        allDays.sort((a, b) => a.date.localeCompare(b.date));

        const maxCount = Math.max(...allDays.map((d) => d.count), 1);
        const mapped: ContributionDay[] = allDays.map((d) => ({
          date: d.date,
          count: d.count,
          level: d.level ?? getLevel(d.count, maxCount),
        }));

        setContributions(mapped);
        setTotalContributions(data.total?.lastYear ?? allDays.reduce((s, d) => s + d.count, 0));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  // Group by weeks
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  contributions.forEach((day) => {
    const dayOfWeek = parseDateAsLocal(day.date).getDay();
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
    const month = parseDateAsLocal(week[0].date).getMonth();
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
        {!loading && !error && (
          <span className="text-portfolio-lightSlate text-xs font-mono">
            {totalContributions.toLocaleString()} contributions in the last year
          </span>
        )}
      </div>

      {loading ? (
        <div className="h-24 flex items-center justify-center text-portfolio-slate text-sm">
          Loading contributions...
        </div>
      ) : error ? (
        <div className="h-24 flex items-center justify-center text-portfolio-slate text-sm">
          Unable to load contribution data.
        </div>
      ) : (
        <div className="w-full">
          {/* Month labels */}
          <div
            className="grid mb-1 text-[10px] text-portfolio-slate font-mono pl-6"
            style={{ gridTemplateColumns: `repeat(${totalWeeks}, 1fr)` }}
          >
            {Array.from({ length: totalWeeks }).map((_, i) => {
              const ml = monthLabels.find((m) => m.col === i);
              return <span key={i} className="truncate">{ml ? ml.label : ""}</span>;
            })}
          </div>

          <div className="flex gap-0 w-full">
            {/* Day labels */}
            <div className="flex flex-col justify-between w-6 shrink-0 text-[10px] text-portfolio-slate font-mono pr-1">
              <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
            </div>

            {/* Grid */}
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
                  const day = week.find((d) => parseDateAsLocal(d.date).getDay() === di);
                  if (!day) return <div key={`${wi}-${di}`} />;
                  return (
                    <div
                      key={`${wi}-${di}`}
                      className={`rounded-[2px] ${levelClasses[day.level]} transition-colors hover:ring-1 hover:ring-portfolio-highlight/50`}
                      title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}
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
