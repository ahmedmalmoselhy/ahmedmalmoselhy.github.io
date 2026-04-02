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
    "bg-portfolio-slate/20 hover:bg-portfolio-slate/30",
    "bg-portfolio-highlight/30 hover:bg-portfolio-highlight/40",
    "bg-portfolio-highlight/50 hover:bg-portfolio-highlight/60",
    "bg-portfolio-highlight/70 hover:bg-portfolio-highlight/80",
    "bg-portfolio-highlight hover:bg-portfolio-highlight/95",
  ];

  const totalWeeks = weeks.length;

  return (
    <div className="w-full bg-gradient-to-b from-portfolio-lightNavy/40 to-portfolio-lightNavy/20 backdrop-blur-md border border-portfolio-slate/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-portfolio-navy/5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-portfolio-slate/10">
        <div className="flex items-center gap-4">
          <img
            src={`https://github.com/${GITHUB_USERNAME}.png`}
            alt={`${GITHUB_USERNAME}'s avatar`}
            className="w-10 h-10 rounded-full border-2 border-portfolio-highlight/30 shadow-md shadow-portfolio-highlight/10"
          />
          <div>
            <h3 className="text-portfolio-white font-bold text-lg tracking-tight">GitHub Activity</h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-highlight text-xs font-mono hover:text-portfolio-highlight/80 transition-colors duration-200"
            >
              @{GITHUB_USERNAME}
            </a>
          </div>
        </div>
        {!loading && !error && (
          <div className="text-right sm:text-center">
            <div className="text-portfolio-white font-bold text-sm">{totalContributions.toLocaleString()}</div>
            <div className="text-portfolio-lightSlate text-xs font-mono">contributions this year</div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="h-32 flex items-center justify-center text-portfolio-slate text-sm font-medium">
          Loading contributions...
        </div>
      ) : error ? (
        <div className="h-32 flex items-center justify-center text-portfolio-slate text-sm font-medium">
          Unable to load contribution data.
        </div>
      ) : (
        <div className="w-full pt-6">
          {/* Month labels */}
          <div
            className="grid mb-3 text-[11px] text-portfolio-slate/70 font-mono font-medium pl-7"
            style={{ gridTemplateColumns: `repeat(${totalWeeks}, 1fr)` }}
          >
            {Array.from({ length: totalWeeks }).map((_, i) => {
              const ml = monthLabels.find((m) => m.col === i);
              return <span key={i} className="truncate">{ml ? ml.label : ""}</span>;
            })}
          </div>

          <div className="flex gap-1 w-full bg-portfolio-navy/30 rounded-xl p-3">
            {/* Day labels */}
            <div className="flex flex-col justify-between w-7 shrink-0 text-[11px] text-portfolio-slate/60 font-mono font-medium pr-2">
              <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
            </div>

            {/* Grid */}
            <div
              className="grid gap-1 w-full flex-1"
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
                      className={`rounded-md ${levelClasses[day.level]} transition-all duration-150 cursor-pointer transform hover:scale-125 hover:shadow-lg hover:shadow-portfolio-highlight/20 z-10`}
                      title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-portfolio-slate/10 text-[11px] text-portfolio-slate/70 font-mono">
            <span className="font-medium">Less</span>
            {levelClasses.map((cls, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${cls} shadow-sm shadow-portfolio-highlight/5`} />
            ))}
            <span className="font-medium">More</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubGraph;
