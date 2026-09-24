import React from "react";
import Layout from "@/components/Layout";
import { CodeHeading, FileHeader, PanelBar, StackLine } from "@/components/CodeView";
import { Award, Building2, Download, Github, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { experiences } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { training } from "@/data/training";
import { skillsOverview, languages, personalDetails, interests } from "@/data/personal";
import { calculateDuration, isPromotedRole } from "@/lib/date-utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

const toKey = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "_");

const contacts = [
  { icon: Mail, label: "ahmedmalmoselhy@gmail.com", href: "mailto:ahmedmalmoselhy@gmail.com" },
  { icon: Phone, label: "+20 111 700 1262", href: "tel:+201117001262" },
  { icon: Linkedin, label: "in/ahmedmalmoselhy", href: "https://www.linkedin.com/in/ahmedmalmoselhy/", external: true },
  { icon: Github, label: "github/ahmedmalmoselhy", href: "https://github.com/ahmedmalmoselhy", external: true },
];

/** Small white tile for organisation logos (they are designed for white backgrounds). */
const Logo = ({ src, alt, fallback: Fallback }: { src?: string; alt: string; fallback: typeof Building2 }) => (
  <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded border border-border bg-white">
    {src ? <img src={src} alt={alt} className="h-full w-full object-contain p-1" loading="lazy" /> : <Fallback size={20} className="text-portfolio-highlight" />}
  </span>
);

const SidePanel = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="panel overflow-hidden">
    <PanelBar>
      <span className="syn-comment">// </span>
      <span className="syn-keyword">{title}</span>
    </PanelBar>
    <div className="p-4">{children}</div>
  </section>
);

const Resume = () => {
  return (
    <Layout className="max-w-7xl">
      <FileHeader
        comment="resume.json — chronological, most recent first"
        keyword="export const"
        name="resume"
        description="Telecom BSS, CRM, and full-stack web engineering — the professional path so far."
        actions={
          <a href="/AhmedAlMoselhy.pdf" download className="btn-primary">
            <Download size={16} aria-hidden="true" /> resume.pdf
          </a>
        }
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-14">
          {/* Experience: git-log style graph line with a commit dot per company */}
          <section>
            <CodeHeading>experience</CodeHeading>
            <ol className="relative space-y-6 border-l border-border pl-6 md:pl-8">
              {experiences.map((exp) => (
                <li key={exp.company} className="relative">
                  <span
                    className="absolute -left-[31px] top-4 h-3 w-3 rounded-full border-2 border-background bg-portfolio-highlight md:-left-[39px]"
                    aria-hidden="true"
                  />
                  <article className="panel overflow-hidden">
                    <PanelBar right={<span className="syn-number">{exp.period}</span>}>
                      <span className="syn-fn">{toKey(exp.company)}</span>
                      <span className="text-portfolio-slate">.json</span>
                    </PanelBar>

                    <div className="p-4 md:p-5">
                      <header className="flex items-start gap-3">
                        <Logo src={exp.logo} alt={`${exp.company} logo`} fallback={Building2} />
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-portfolio-white md:text-xl">
                            {exp.link ? (
                              <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-portfolio-highlight">
                                {exp.company}
                                <Globe size={14} className="text-portfolio-slate" aria-hidden="true" />
                              </a>
                            ) : (
                              exp.company
                            )}
                          </h3>
                          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-portfolio-slate">
                            {exp.outsourced && <span>via {exp.outsourced}</span>}
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={12} aria-hidden="true" /> {exp.location}
                            </span>
                            <span>{exp.workType}</span>
                          </p>
                        </div>
                      </header>

                      <div className="mt-5 space-y-5">
                        {exp.roles.map((roleItem, roleIndex) => {
                          const group = Array.isArray(roleItem) ? roleItem : [roleItem];
                          return (
                            <div key={roleIndex} className={group.length > 1 ? "grid gap-4 md:grid-cols-2" : undefined}>
                              {group.map((role, rIndex) => (
                                <div key={role.title} className="border-l-2 border-portfolio-highlight/40 pl-4">
                                  <h4 className="flex flex-wrap items-center gap-2 font-semibold text-portfolio-white">
                                    {role.title}
                                    {exp.roles.length > 1 && isPromotedRole(roleIndex, rIndex) && (
                                      <span className="syn-string font-mono text-xs font-normal">+ promoted</span>
                                    )}
                                  </h4>
                                  <p className="syn-comment mt-0.5 font-mono text-xs">
                                    {role.period}
                                    {calculateDuration(role.period) && ` · ${calculateDuration(role.period)}`}
                                  </p>
                                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-portfolio-lightSlate">
                                    {role.responsibilities.map((resp) => (
                                      <li key={resp} className="flex gap-2">
                                        <span className="syn-number mt-px shrink-0 font-mono" aria-hidden="true">›</span>
                                        <span>{resp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>

                      {exp.technologies && (
                        <div className="mt-5 border-t border-border pt-3">
                          <StackLine items={exp.technologies} />
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          {/* Education */}
          <section>
            <CodeHeading>education</CodeHeading>
            <div className="space-y-4">
              {education.map((item) => (
                <article key={item.id} className="panel overflow-hidden">
                  <PanelBar right={<span className="syn-number">{item.period}</span>}>
                    <span className="syn-fn">{toKey(item.institution)}</span>
                  </PanelBar>
                  <div className="flex items-start gap-3 p-4 md:p-5">
                    <Logo src={item.logo} alt={`${item.institution} logo`} fallback={Building2} />
                    <div>
                      <h3 className="font-semibold text-portfolio-white">{item.degree}</h3>
                      <p className="text-sm text-portfolio-highlight">{item.institution}</p>
                      <p className="mt-2 text-sm leading-relaxed text-portfolio-slate">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Certifications: click to view the certificate image */}
          <section>
            <CodeHeading>certifications</CodeHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <Dialog key={cert.id}>
                  <DialogTrigger asChild>
                    <button className="panel card-interactive flex items-start gap-3 p-4 text-left">
                      <Logo src={cert.logo} alt={`${cert.issuer} logo`} fallback={Award} />
                      <span className="min-w-0">
                        <span className="block font-semibold leading-snug text-portfolio-white">{cert.name}</span>
                        <span className="mt-1 block font-mono text-xs text-portfolio-slate">
                          {cert.issuer} · <span className="syn-number">{cert.year}</span>
                        </span>
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl overflow-hidden border-border bg-background p-0">
                    <PanelBar>
                      <DialogTitle className="font-mono text-xs font-normal">
                        certificates/<span className="text-portfolio-white">{toKey(cert.name)}.png</span>
                      </DialogTitle>
                    </PanelBar>
                    <div className="flex justify-center bg-muted/40 p-4">
                      {cert.image ? (
                        <img src={cert.image} alt={`${cert.name} certificate`} className="h-auto w-full max-w-2xl rounded border border-border object-contain" />
                      ) : (
                        <p className="syn-comment py-16 font-mono text-sm">// certificate image not available</p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </section>

          {/* Training */}
          <section>
            <CodeHeading>training</CodeHeading>
            <div className="space-y-4">
              {training.map((item) => (
                <article key={item.id} className="panel overflow-hidden">
                  <PanelBar right={<span className="syn-number">{item.year}</span>}>
                    <span className="syn-fn">{toKey(item.provider)}</span>
                  </PanelBar>
                  <div className="flex items-start gap-3 p-4 md:p-5">
                    <Logo src={item.logo} alt={`${item.provider} logo`} fallback={Building2} />
                    <div>
                      <h3 className="font-semibold text-portfolio-white">{item.name}</h3>
                      <p className="text-sm text-portfolio-highlight">{item.provider}</p>
                      {item.description && <p className="mt-2 text-sm leading-relaxed text-portfolio-slate">{item.description}</p>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-[77px] lg:self-start">
          <SidePanel title="contact">
            <ul className="space-y-1">
              {contacts.map(({ icon: Icon, label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="flex min-h-10 items-center gap-2.5 rounded px-2 font-mono text-xs text-portfolio-lightSlate hover:bg-muted/60 hover:text-portfolio-highlight"
                  >
                    <Icon size={15} className="shrink-0 text-portfolio-highlight" aria-hidden="true" />
                    <span className="[overflow-wrap:anywhere]">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </SidePanel>

          <SidePanel title="skills">
            <div className="flex flex-wrap gap-1.5">
              {skillsOverview.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </SidePanel>

          <SidePanel title="languages">
            <dl className="space-y-1 font-mono text-sm">
              {languages.map((lang) => (
                <div key={lang.name} className="flex justify-between gap-3">
                  <dt className="syn-keyword">{toKey(lang.name)}:</dt>
                  <dd className="syn-string">"{lang.level}"</dd>
                </div>
              ))}
            </dl>
          </SidePanel>

          <SidePanel title="details">
            <dl className="space-y-1 font-mono text-sm">
              {personalDetails.map((detail) => (
                <div key={detail.label} className="flex justify-between gap-3">
                  <dt className="syn-keyword">{toKey(detail.label)}:</dt>
                  <dd className="syn-string">"{detail.value}"</dd>
                </div>
              ))}
            </dl>
          </SidePanel>

          <SidePanel title="interests">
            <div className="flex flex-wrap gap-1.5">
              {interests.map((interest) => (
                <span key={interest} className="chip">
                  {interest}
                </span>
              ))}
            </div>
          </SidePanel>
        </aside>
      </div>
    </Layout>
  );
};

export default Resume;
