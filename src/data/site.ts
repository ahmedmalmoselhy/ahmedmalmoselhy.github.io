import content from "@/content/site.json";
import { iconFor } from "@/lib/icons";

/** Identity, contact channels and availability. Content lives in src/content/site.json (editable at /admin). */
export const site = {
  ...content,
  // The CV is replaced in place, so a per-build query keeps browsers from serving a cached old copy
  resume: `${content.resume}?v=${__BUILD_ID__}`,
};

export const githubUrl = `https://github.com/${site.github}`;
export const linkedinUrl = `https://www.linkedin.com/in/${site.linkedin}/`;
export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const openTo = site.availability.openTo.map((a) => ({ ...a, icon: iconFor(a.icon) }));
