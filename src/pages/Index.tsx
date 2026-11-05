import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { SectionHeading } from "@/components/PageHeader";
import CairoClock from "@/components/CairoClock";
import FilterPills from "@/components/FilterPills";
import { magnet, peek, reduceMotion, resetTransform, tiltHandlers, trackPointer } from "@/lib/pointer";
import { PageSection } from "@/App";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { certifications } from "@/data/certifications";
import { projectsData } from "@/data/projects";
import { careerStartYear } from "@/data/experience";
import { site, githubUrl } from "@/data/site";
import {
  buildPhrases,
  changelog,
  onMyDesk,
  offTheClock,
  shipped,
  stack,
  ticker,
  type ChangeKind,
  type Domain,
} from "@/data/home";

interface IndexProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

const domainVar: Record<Domain, string> = { tel: "var(--c-tel)", crm: "var(--c-crm)", web: "var(--c-web)" };

// Typed array (not an explicit JSX generic, which the dev-mode component tagger can't parse)
const changeFilters: (ChangeKind | "all")[] = ["all", "ship", "cert", "work"];

const kindStyle: Record<ChangeKind, string> = {
  ship: "bg-domain-web/15 text-domain-web",
  cert: "bg-domain-crm/15 text-domain-crm",
  work: "bg-accent text-accent-foreground",
};

/** Types out each phrase, pauses, deletes it, moves to the next. */
const useTypedPhrase = (phrases: string[]) => {
  const [text, setText] = useState(phrases[0]);
  useEffect(() => {
    if (reduceMotion()) return;
    let word = 0;
    let chars = phrases[0].length;
    let deleting = true;
    let timer: number;
    const tick = () => {
      if (deleting) {
        chars--;
        if (chars === 0) {
          deleting = false;
          word = (word + 1) % phrases.length;
        }
      } else if (++chars === phrases[word].length) {
        deleting = true;
        setText(phrases[word]);
        timer = window.setTimeout(tick, 2200);
        return;
      }
      setText(phrases[word].slice(0, chars) || "​");
      timer = window.setTimeout(tick, deleting ? 35 : 70);
    };
    timer = window.setTimeout(tick, 2200);
    return () => window.clearTimeout(timer);
  }, [phrases]);
  return text;
};

const CountUp: React.FC<{ to: number }> = ({ to }) => {
  const [n, setN] = useState(() => (reduceMotion() ? to : 0));
  useEffect(() => {
    if (n >= to) return;
    const id = window.setTimeout(() => setN(n + 1), 900 / to);
    return () => window.clearTimeout(id);
  }, [n, to]);
  return <b className="font-medium text-foreground">{n}</b>;
};

interface Contribution {
  date: string;
  count: number;
  level: number;
}

/** Last 20 weeks of public GitHub activity (same API as the Projects page graph). */
const GitHubStrip = () => {
  const [days, setDays] = useState<Contribution[] | null>(null);
  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${site.github}?y=last`)
      .then((r) => r.json())
      .then((d: { contributions: Contribution[] }) => setDays(d.contributions.slice(-140)))
      .catch(() => setDays([]));
  }, []);
  const total = days?.reduce((sum, d) => sum + d.count, 0);
  const levelClass = ["bg-border", "bg-primary/30", "bg-primary/55", "bg-primary/80", "bg-primary"];

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-5 rounded-md border border-border bg-card px-5 py-4 transition-colors hover:border-faint"
    >
      <span className="hidden whitespace-nowrap font-mono text-xs text-muted-foreground sm:block">github · last 20 weeks</span>
      <span className="grid flex-1 grid-flow-col grid-rows-7 justify-end gap-[3px] overflow-hidden" aria-hidden="true">
        {days?.map((d, i) => (
          <i
            key={d.date}
            title={`${d.date}: ${d.count}`}
            className={cn("h-[9px] w-[9px] rounded-[2px] animate-fade-in", levelClass[d.level] ?? levelClass[0])}
            style={{ animationDelay: `${i * 4}ms` }}
          />
        ))}
      </span>
      <span className="whitespace-nowrap font-mono text-[13px]">
        {total === undefined ? "loading…" : days?.length ? `${total} contributions` : `github.com/${site.github}`}
      </span>
    </a>
  );
};

const Index: React.FC<IndexProps> = ({ onSectionChange }) => {
  const phrase = useTypedPhrase(buildPhrases);
  const [filter, setFilter] = useState<ChangeKind | "all">("all");
  const years = new Date().getFullYear() - careerStartYear;
  const name = site.name;

  return (
    <Layout className="pt-0 md:pt-16">
      {/* Hero */}
      <div className="dot-stage" onPointerMove={trackPointer}>
        <section className="container relative z-10 mx-auto grid items-center gap-8 px-4 pb-10 pt-[calc(5.5rem+env(safe-area-inset-top))] md:grid-cols-[240px_1fr] md:gap-14 md:pb-14 md:pt-16 lg:grid-cols-[260px_1fr]">
          <figure className="halftone h-[200px] w-[170px] md:h-[300px] md:w-full" onPointerMove={peek}>
            <img className="ht" src={site.avatar} alt={`Portrait of ${site.name}`} />
            <span className="dots" />
            <img className="color" src={site.avatar} alt="" />
          </figure>

          <div>
            <p className="font-mono text-sm font-medium text-primary">@{site.handle}</p>
            <h1 className="mt-2 text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              <span className="sr-only">{name}</span>
              <span aria-hidden="true">
                {/* Letters rise one by one; each word is nowrap so lines only break between words */}
                {name.split(" ").map((word, w, words) => {
                  const offset = words.slice(0, w).join(" ").length + (w ? 1 : 0);
                  return (
                    <React.Fragment key={word}>
                      {w > 0 && " "}
                      <span className="inline-block whitespace-nowrap">
                        {[...word].map((ch, i) => (
                          <span
                            key={i}
                            className="inline-block motion-safe:animate-[rise_.7s_cubic-bezier(.2,.8,.2,1)_both]"
                            style={{ animationDelay: `${100 + (offset + i) * 35}ms` }}
                          >
                            {ch}
                          </span>
                        ))}
                      </span>
                    </React.Fragment>
                  );
                })}
              </span>
            </h1>
            <p className="mt-4 max-w-[620px] text-lg leading-relaxed text-muted-foreground md:text-xl">
              I build and run{" "}
              <span className="border-b-2 border-primary font-medium text-foreground">
                {phrase}
                <span className="ml-0.5 inline-block h-[1.05em] w-0.5 bg-primary align-[-3px] motion-safe:animate-[blink_1s_steps(1)_infinite]" />
              </span>
              <br />
              <span className="marker font-medium text-foreground">Senior software engineer</span> and{" "}
              <span className="marker font-medium text-foreground [--mk:var(--c-crm)] [animation-delay:1.5s]">
                Creatio solution consultant
              </span>
              , shipping Laravel products on the side.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {site.availability.available && (
                <span className="flex items-center gap-2">
                  <i className="live-dot" /> {site.availability.headline}
                </span>
              )}
              <span>
                Cairo · <CairoClock /> local
              </span>
              <span className="font-mono">
                <CountUp to={years} />+ yrs · <CountUp to={certifications.length} /> certs ·{" "}
                <CountUp to={projectsData.length} /> projects
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <button
                onClick={() => onSectionChange?.("contact")}
                onPointerMove={magnet}
                onPointerLeave={resetTransform}
                className="btn-band group"
              >
                Get in touch <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <button onClick={() => onSectionChange?.("resume")} className="btn-band-outline">
                Résumé
              </button>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-band-outline">
                GitHub
              </a>
            </div>
          </div>
        </section>
        <div className="container relative z-10 mx-auto px-4 pb-8">
          <GitHubStrip />
        </div>
      </div>

      {/* Stack ticker */}
      <div className="ticker overflow-hidden whitespace-nowrap border-y border-border bg-foreground text-background" aria-hidden="true">
        <div className="ticker-track motion-reduce:animate-none">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-5 font-mono text-[13px]">
              {item}
              <span className={["text-domain-web", "text-domain-crm", "text-primary"][i % 3]}>//</span>
            </span>
          ))}
        </div>
      </div>

      {/* Shipped */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <SectionHeading
          title="Things I've shipped"
          action={
            <button onClick={() => onSectionChange?.("projects")} className="font-mono text-sm text-muted-foreground hover:text-primary">
              all projects →
            </button>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {shipped.map((item) => (
            <button
              key={item.title}
              onClick={() =>
                item.projectId ? onSectionChange?.("project-detail", Number(item.projectId)) : onSectionChange?.("resume")
              }
              {...tiltHandlers}
              className="card-dev reveal group text-left"
              style={{ "--c": domainVar[item.domain] } as React.CSSProperties}
            >
              <span className="grid aspect-video place-items-center overflow-hidden border-b border-border bg-[hsl(var(--c)/0.07)]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <img
                    src={item.logo}
                    alt=""
                    loading="lazy"
                    className="h-20 w-20 rounded-xl bg-white object-contain p-2 shadow-[0_8px_20px_-10px_rgba(0,0,0,.3)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
                  />
                )}
              </span>
              <span className="flex flex-1 flex-col p-5">
                <span className="font-mono text-xs text-[hsl(var(--c))]">{item.kicker}</span>
                <span className="mt-1.5 text-[17px] font-semibold">{item.title}</span>
                <span className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{item.text}</span>
                <span className="mt-3 flex justify-between font-mono text-xs text-muted-foreground">
                  {item.footer}
                  <span className="-translate-x-1 text-[hsl(var(--c))] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                    read →
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* On my desk */}
      <div className="border-y border-border bg-primary/[0.05]">
        <section className="container mx-auto px-4 py-14 md:py-16">
          <SectionHeading title="Currently on my desk" />
          <div className="reveal overflow-hidden rounded-lg border border-border bg-card shadow-[0_20px_40px_-28px_hsl(var(--primary)/0.5)]">
            <div className="-ml-px -mt-px grid md:grid-cols-3">
            {onMyDesk.map((item) => (
              <button
                key={item.title}
                onClick={() => onSectionChange?.("project-detail", item.projectId)}
                className="border-l border-t border-border p-6 text-left transition-colors hover:bg-primary/[0.04]"
              >
                <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <i className={cn("live-dot", item.pace === "slow" && "bg-warn")} />
                  {item.status}
                </span>
                <h3 className="mt-3 text-[17px] font-semibold">{item.title}</h3>
                <p className="mt-1.5 line-clamp-3 text-[14.5px] leading-relaxed text-muted-foreground">{item.text}</p>
                <p className="mt-4 font-mono text-xs text-faint">{item.meta}</p>
              </button>
            ))}
            </div>
          </div>
        </section>
      </div>

      {/* Changelog + stack */}
      <section className="container mx-auto grid gap-12 px-4 py-14 md:py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          <SectionHeading
            title="Changelog"
            action={
              <FilterPills label="Filter changelog" options={changeFilters} value={filter} onChange={setFilter} />
            }
          />
          <ul>
            {changelog
              .filter((e) => filter === "all" || e.kind === filter)
              .slice(0, 8)
              .map((e, i) => (
                <li
                  key={e.text}
                  className="-mx-2 grid grid-cols-[4.5rem_1fr] items-baseline gap-4 rounded border-b border-border px-2 py-3 text-[15px] transition-[background,transform] animate-fade-in hover:translate-x-1 hover:bg-card sm:grid-cols-[5.75rem_1fr_auto]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="font-mono text-[13px] text-faint">{e.date}</span>
                  <span>{e.text}</span>
                  <span className={cn("hidden rounded px-2 py-0.5 font-mono text-[11.5px] sm:inline", kindStyle[e.kind])}>{e.kind}</span>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <SectionHeading title="Stack" />
          {stack.map(({ group, items }) => (
            <div key={group} className="mb-5">
              <h3 className="mb-2.5 text-sm font-semibold">{group}</h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="chip cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <button onClick={() => onSectionChange?.("skills")} className="mt-2 font-mono text-sm text-muted-foreground hover:text-primary">
            all skills →
          </button>
        </div>
      </section>

      {/* Off the clock */}
      <section className="container mx-auto px-4 pb-16 md:pb-20">
        <SectionHeading title="Off the clock" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {offTheClock.map((item, i) => (
            <article
              key={item.title}
              className={cn(
                "reveal group rounded-lg border p-5 transition-transform duration-200 hover:-translate-y-1",
                i % 2 ? "hover:rotate-2" : "hover:-rotate-2",
                [
                  "border-domain-web/30 bg-domain-web/[0.07]",
                  "border-primary/30 bg-primary/[0.07]",
                  "border-domain-crm/30 bg-domain-crm/[0.07]",
                  "border-warn/30 bg-warn/[0.08]",
                ][i % 4],
              )}
            >
              <span
                className="inline-block text-2xl transition-transform duration-300 [transition-timing-function:cubic-bezier(.3,1.6,.5,1)] group-hover:-rotate-12 group-hover:scale-125"
                aria-hidden="true"
              >
                {item.emoji}
              </span>
              <h3 className="mt-2.5 text-[15px] font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
