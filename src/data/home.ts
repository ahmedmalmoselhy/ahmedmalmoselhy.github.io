import content from "@/content/home.json";

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

export const changelog = content.changelog as ChangelogEntry[];

export const stack: { group: string; items: string[] }[] = content.stack;

export const ticker: string[] = content.ticker;

/** Rotating phrase after "I build and run" in the hero */
export const buildPhrases: string[] = content.buildPhrases;

export const offTheClock: { emoji: string; title: string; text: string }[] = content.offTheClock;
