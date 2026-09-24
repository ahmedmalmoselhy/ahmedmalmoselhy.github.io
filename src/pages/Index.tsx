import React, { useState } from "react";
import Layout from "@/components/Layout";
import { CodeView } from "@/components/CodeView";
import { projectSlug } from "@/lib/utils";
import { PageSection } from "@/App";
import { Download, Mail } from "lucide-react";
import { projectsData } from "@/data/projects";
import { experiences } from "@/data/experience";
import { certifications } from "@/data/certifications";

interface IndexProps {
  onSectionChange?: (section: PageSection, projectId?: number) => void;
}

// Fisher-Yates shuffle, first 3
const pickRandomProjects = () => {
  const copy = [...projectsData];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
};

// Career start = earliest year mentioned in any experience period
const startYear = Math.min(
  ...experiences.map((e) => Number(e.period.match(/\d{4}/)?.[0] ?? new Date().getFullYear())),
);

/* Markdown-looking tokens */
const H = ({ level, children }: { level: 1 | 2; children: React.ReactNode }) => (
  <>
    <span className="syn-keyword">{"#".repeat(level)} </span>
    <span className={level === 1 ? "text-base font-semibold text-portfolio-white md:text-lg" : "font-semibold text-portfolio-white"}>
      {children}
    </span>
  </>
);
const Li = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className="syn-number">- </span>
    {children}
  </>
);
/** Markdown link whose [text] is a real, clickable control. */
const MdLink = ({ label, target, onClick, href }: { label: string; target: string; onClick?: () => void; href?: string }) => {
  const cls = "syn-string rounded-sm underline decoration-dotted underline-offset-4 hover:decoration-solid";
  return (
    <>
      <span className="text-portfolio-slate">[</span>
      {href ? (
        <a href={href} className={cls} {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>
          {label}
        </a>
      ) : (
        <button onClick={onClick} className={cls}>
          {label}
        </button>
      )}
      <span className="text-portfolio-slate">](</span>
      <span className="syn-comment">{target}</span>
      <span className="text-portfolio-slate">)</span>
    </>
  );
};

const Index: React.FC<IndexProps> = ({ onSectionChange }) => {
  const [featured] = useState(pickRandomProjects);
  const go = (section: PageSection, id?: number) => () => onSectionChange?.(section, id);

  const lines: React.ReactNode[] = [
    <H level={1}>Ahmed AlMoselhy</H>,
    "",
    <>
      <span className="syn-comment">&gt; </span>
      <span className="syn-type">Software Engineer · CRM &amp; Telecom Solutions · Cairo, Egypt</span>
    </>,
    "",
    <H level={2}>About</H>,
    <span className="text-portfolio-lightSlate">Versatile engineer across full-stack web, CRM systems, and telecom BSS —</span>,
    <span className="text-portfolio-lightSlate">from L3 production support to scalable web platforms built to be maintained.</span>,
    "",
    <H level={2}>Stack</H>,
    <Li><span className="syn-fn">Telecom</span>: Ericsson Order Care (EOC) · Catalog Manager (ECM)</Li>,
    <Li><span className="syn-fn">CRM</span>: Creatio · business-process design</Li>,
    <Li><span className="syn-fn">Web</span>: Laravel · Node.js · React · TypeScript · SQL</Li>,
    "",
    <H level={2}>Featured projects</H>,
    ...featured.map((p) => (
      <Li>
        <MdLink label={p.title} target={`./projects/${projectSlug(p.title)}.md`} onClick={go("project-detail", p.id)} />
        <span className="text-portfolio-slate"> — {p.description}</span>
      </Li>
    )),
    <Li><MdLink label="All projects" target="./projects.ts" onClick={go("projects")} /></Li>,
    "",
    <H level={2}>Links</H>,
    <Li><MdLink label="Resume" target="./resume.json" onClick={go("resume")} /></Li>,
    <Li><MdLink label="Skills" target="./skills.yaml" onClick={go("skills")} /></Li>,
    <Li><MdLink label="Contact" target="./contact.sh" onClick={go("contact")} /></Li>,
    <Li><MdLink label="GitHub" target="github.com/ahmedmalmoselhy" href="https://github.com/ahmedmalmoselhy" /></Li>,
    <Li><MdLink label="LinkedIn" target="linkedin.com/in/ahmedmalmoselhy" href="https://www.linkedin.com/in/ahmedmalmoselhy/" /></Li>,
    <span className="caret" aria-hidden="true" />,
  ];

  const stats = [
    { value: `${new Date().getFullYear() - startYear}+`, label: "years" },
    { value: experiences.length, label: "companies" },
    { value: projectsData.length, label: "projects" },
    { value: certifications.length, label: "certs" },
  ];

  return (
    <Layout className="max-w-7xl">
      <h1 className="sr-only">Ahmed AlMoselhy — Software Engineer</h1>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Source */}
        <section aria-label="README source" className="panel order-2 overflow-hidden bg-background lg:order-1">
          <CodeView lines={lines} />
        </section>

        {/* Rendered preview */}
        <aside aria-label="Preview" className="order-1 lg:order-2">
          <div className="panel sticky top-[77px] overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between border-b border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-portfolio-slate">
              Preview
              <span className="syn-string">● live</span>
            </div>
            <div className="p-5 text-center">
              <img
                src="/Ahmed-AlMoselhy.png"
                alt="Portrait of Ahmed AlMoselhy"
                width={120}
                height={120}
                className="mx-auto h-28 w-28 rounded-full border-2 border-portfolio-highlight bg-muted object-cover"
              />
              <p className="mt-4 text-lg font-semibold text-portfolio-white">Ahmed AlMoselhy</p>
              <p className="text-sm text-portfolio-slate">Software Engineer</p>
              <dl className="mt-5 grid grid-cols-4 gap-1 border-y border-border py-3">
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="syn-number font-mono text-lg font-semibold">{value}</dd>
                    <dd className="font-mono text-[10px] uppercase text-portfolio-slate">{label}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 grid gap-2">
                <button onClick={go("contact")} className="btn-primary w-full">
                  <Mail size={16} aria-hidden="true" /> ./contact.sh
                </button>
                <a href="/AhmedAlMoselhy.pdf" download className="btn-secondary w-full">
                  <Download size={16} aria-hidden="true" /> resume.pdf
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default Index;
