import React from "react";
import { site, githubUrl, linkedinUrl } from "@/data/site";

// Hash links work here because App listens to hashchange
const columns = [
  {
    title: "Site",
    links: [
      { label: "Resume", href: "#/resume" },
      { label: "Projects", href: "#/projects" },
      { label: "Skills", href: "#/skills" },
      { label: "Contact", href: "#/contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: githubUrl, external: true },
      { label: "LinkedIn", href: linkedinUrl, external: true },
      { label: "Email", href: `mailto:${site.email}` },
      { label: "Phone", href: `tel:${site.phone}` },
    ],
  },
  {
    title: "Files",
    links: [{ label: "CV (PDF)", href: site.resume }],
  },
];

const Footer = () => (
  <footer className="mt-8 border-t border-border">
    <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-10 text-sm md:grid-cols-[2fr_1fr_1fr_1fr] md:py-12">
      <div className="col-span-2 md:col-span-1">
        <p className="font-mono text-[15px] font-medium">
          ~/{site.handle}
        </p>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Built with React and Tailwind.
          <br />© {new Date().getFullYear()} {site.name}
        </p>
      </div>
      {columns.map(({ title, links }) => (
        <div key={title}>
          <h2 className="mb-2.5 text-[13px] font-semibold">{title}</h2>
          <ul>
            {links.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="block py-1 text-muted-foreground transition-colors hover:text-primary"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </footer>
);

export default Footer;
