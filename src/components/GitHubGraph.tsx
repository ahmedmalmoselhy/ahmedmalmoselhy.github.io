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
    "bg-secondary",
    "bg-primary/25",
    "bg-primary/50",
    "bg-primary/75",
    "bg-primary",
  ];

  const totalWeeks = weeks.length;
  const profileUrl = `https://github.com/${GITHUB_USERNAME}`;

  return (
    <section aria-labelledby="github-activity" className="surface p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={`${profileUrl}.png`}
            alt=""
            className="h-10 w-10 rounded-full bg-secondary"
          />
          <div>
            <h2 id="github-activity" className="text-headline">GitHub Activity</h2>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subhead text-primary hover:underline"
            >
              @{GITHUB_USERNAME}
            </a>
          </div>
        </div>
        {!loading && !error && (
          <p className="text-subhead text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums">
              {totalContributions.toLocaleString()}
            </span>{" "}
            contributions in the last year
          </p>
        )}
      </div>

      {loading ? (
        <p className="flex h-32 items-center justify-center text-subhead text-muted-foreground">
          Loading contributions…
        </p>
      ) : error ? (
        <p className="flex h-32 items-center justify-center gap-1 text-subhead text-muted-foreground">
          Couldn't load GitHub activity.{" "}
          <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            View it on GitHub
          </a>
        </p>
      ) : (
        <div
          role="img"
          aria-label={`${totalContributions.toLocaleString()} GitHub contributions in the last year`}
          className="mt-6"
        >
          {/* Month labels */}
          <div
            aria-hidden
            className="mb-2 grid pl-8 text-caption text-muted-foreground"
            style={{ gridTemplateColumns: `repeat(${totalWeeks}, 1fr)` }}
          >
            {Array.from({ length: totalWeeks }).map((_, i) => {
              const ml = monthLabels.find((m) => m.col === i);
              return <span key={i} className="overflow-visible whitespace-nowrap">{ml ? ml.label : ""}</span>;
            })}
          </div>

          <div aria-hidden className="flex gap-1">
            {/* Day labels */}
            <div className="flex w-8 shrink-0 flex-col justify-between pr-1 text-caption text-muted-foreground">
              <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
            </div>

            <div
              className="grid flex-1 gap-[3px]"
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
                      className={`rounded-[3px] ${levelClasses[day.level]}`}
                      title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Legend */}
          <div aria-hidden className="mt-4 flex items-center justify-end gap-1.5 text-caption text-muted-foreground">
            <span>Less</span>
            {levelClasses.map((cls, i) => (
              <div key={i} className={`h-3 w-3 rounded-[3px] ${cls}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default GitHubGraph;
