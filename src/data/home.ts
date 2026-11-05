import content from "@/content/home.json";
import { certifications } from "@/data/certifications";
import { experiences } from "@/data/experience";
import { projectsData } from "@/data/projects";

/** Types for the home page sections. Content lives in src/content/home.json (editable at /admin). */

export type Domain = "tel" | "crm" | "web";

export interface ShippedItem {
  title: string;
  /** Mono label above the title, e.g. the stack */
  kicker: string;
  text: string;
  footer: string;
  domain: Domain;
  /** Screenshot fills the thumbnail; a logo is shown small and centred */
  image?: string;
  logo?: string;
  /** Opens this project's detail page when set; otherwise the card links to the resume */
  projectId?: number;
}

export const shipped = content.shipped as ShippedItem[];

export interface NowItem {
  title: string;
  text: string;
  status: string;
  /** "live" pulses green, "slow" pulses amber */
  pace: "live" | "slow";
  meta: string;
}

export const onMyDesk = content.onMyDesk as NowItem[];

export type ChangeKind = "ship" | "cert" | "work";

export interface ChangelogEntry {
  date: string;
  text: string;
  kind: ChangeKind;
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** "2026-09-21", "Oct 2026", "December 2022" or "2026" -> "2026-09" / "2026" (sorts as text) */
export const toYearMonth = (date: string) => {
  const iso = date.match(/^(\d{4})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}`;
  const named = date.match(/([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/);
  const month = named ? MONTHS.indexOf(named[1].toLowerCase()) : -1;
  if (named && month >= 0) return `${named[2]}-${String(month + 1).padStart(2, "0")}`;
  return date.match(/\d{4}/)?.[0] ?? date;
};

/** Certificates, role changes and shipped projects, read from the rest of the site's content. */
const derived: ChangelogEntry[] = [
  ...certifications.map((c) => ({ date: toYearMonth(c.year), text: `Certified: ${c.name}`, kind: "cert" as const })),
  ...experiences.flatMap((e) => {
    const oldestFirst = e.roles.flat().reverse();
    return oldestFirst.map((role, i) => ({
      date: toYearMonth(role.period.split(" - ")[0]),
      text: i === 0 ? `Joined ${e.company} as ${role.title}` : `Promoted to ${role.title} at ${e.company}`,
      kind: "work" as const,
    }));
  }),
  ...projectsData
    .filter((p) => p.status === "completed" && p.date)
    .map((p) => ({ date: toYearMonth(p.date!), text: `Shipped ${p.title}`, kind: "ship" as const })),
];

/** Newest first: the derived entries plus any extra ones written in /admin (home.json). */
export const changelog: ChangelogEntry[] = [...derived, ...(content.changelog as ChangelogEntry[])]
  .filter((e, i, all) => all.findIndex((x) => x.text === e.text) === i)
  .sort((a, b) => b.date.localeCompare(a.date));

export const stack: { group: string; items: string[] }[] = content.stack;

export const ticker: string[] = content.ticker;

/** Rotating phrase after "I build and run" in the hero */
export const buildPhrases: string[] = content.buildPhrases;

export const offTheClock: { emoji: string; title: string; text: string }[] = content.offTheClock;
