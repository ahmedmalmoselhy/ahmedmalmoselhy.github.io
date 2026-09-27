import React from "react";
import Layout from "@/components/Layout";
import PageHeader, { SectionHeading } from "@/components/PageHeader";
import { Download } from "lucide-react";
import { experiences, careerStartYear } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { training } from "@/data/training";
import { skillsOverview, languages, personalDetails, interests } from "@/data/personal";
import { calculateDuration, isPromotedRole } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import CertificateDialog from "@/components/CertificateDialog";

const stats = [
  { value: `${new Date().getFullYear() - careerStartYear}+`, label: "Years of experience" },
  { value: String(experiences.length), label: "Companies" },
  { value: String(certifications.length), label: "Certifications" },
  { value: String(languages.length), label: "Languages" },
];

const contacts = [
  { label: "Email", value: "ahmedmalmoselhy@gmail.com", href: "mailto:ahmedmalmoselhy@gmail.com" },
  { label: "Phone", value: "+20 111 700 1262", href: "tel:+201117001262" },
  { label: "LinkedIn", value: "in/ahmedmalmoselhy", href: "https://www.linkedin.com/in/ahmedmalmoselhy/" },
  { label: "GitHub", value: "ahmedmalmoselhy", href: "https://github.com/ahmedmalmoselhy" },
];

const certificationsByEmployer = (company: string) =>
  certifications.filter((cert) => cert.employer === company);

/** "Period · duration" in small slate text */
const Period: React.FC<{ period: string }> = ({ period }) => {
  const duration = calculateDuration(period);
  return (
    <span className="font-mono text-xs text-faint">
      {period}
      {duration && ` · ${duration}`}
    </span>
  );
};

/** Plain bullet list: slate text, small square markers */
const Bullets: React.FC<{ items: string[]; marker?: string }> = ({ items, marker = "marker:text-primary/60" }) => (
  <ul className={cn("mt-3 list-[square] space-y-1.5 pl-5 leading-relaxed text-portfolio-lightSlate", marker)}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

/** Small mono tag on the right of a row, coloured by kind */
const Tag: React.FC<{ kind: "cert" | "edu" | "training" }> = ({ kind }) => (
  <span
    className={cn(
      "hidden self-start rounded px-2 py-0.5 font-mono text-[11.5px] sm:inline",
      kind === "cert" && "bg-domain-crm/15 text-domain-crm",
      kind === "edu" && "bg-accent text-accent-foreground",
      kind === "training" && "bg-domain-web/15 text-domain-web",
    )}
  >
    {kind}
  </span>
);

/** Sidebar block: small heading over a hairline */
const SideBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <h3 className="border-b border-border pb-2 font-mono text-sm font-medium">
      <span className="text-primary">//</span> {title.toLowerCase()}
    </h3>
    <div className="pt-3">{children}</div>
  </section>
);

const Resume = () => {
  return (
    <Layout className="pt-0 md:pt-16">
      <PageHeader
        eyebrow="Resume"
        title="Professional experience"
        description="Telecom order management, CRM and full-stack web work, newest first."
        actions={
          <a href="/AhmedAlMoselhy.pdf" download className="btn-band">
            <Download size={17} aria-hidden="true" /> Download CV
          </a>
        }
        stats={stats}
      />

      <div className="container mx-auto grid gap-14 px-4 py-14 lg:grid-cols-[1fr_18rem] lg:gap-16 md:py-16">
        <div className="min-w-0 space-y-14">
          {/* Experience */}
          <section>
            <SectionHeading title="Experience" />
            {experiences.map((exp) => {
              const earned = certificationsByEmployer(exp.company);
              return (
                <article
                  key={exp.company}
                  className="reveal grid gap-3 border-b border-border py-8 first:pt-0 md:grid-cols-[10rem_1fr] md:gap-8"
                >
                  <div className="text-sm text-portfolio-slate">
                    <p className="flex items-center gap-2 font-mono text-[13px] text-portfolio-white">
                      {exp.period.includes("Present") && <i className="live-dot" aria-label="current" />}
                      {exp.period.replace(" - ", " – ").replace("Present", "now")}
                    </p>
                    <p className="mt-1">{exp.location}</p>
                    <p>{exp.workType}</p>
                  </div>

                  <div className="min-w-0">
                    <h3 className="flex items-center gap-3 text-xl font-semibold">
                      {exp.logo && (
                        <img src={exp.logo} alt="" className="h-8 w-8 rounded-sm border border-border bg-white object-contain p-0.5" />
                      )}
                      {exp.link ? (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:text-portfolio-highlight">
                          {exp.company}
                        </a>
                      ) : (
                        exp.company
                      )}
                    </h3>

                    {/* Roles: stacked for promotions, side by side for parallel roles */}
                    {exp.roles.map((roleItem, roleIndex) => {
                      const roles = Array.isArray(roleItem) ? roleItem : [roleItem];
                      return (
                        <div key={roleIndex} className="mt-5 grid gap-6 md:grid-flow-col md:auto-cols-fr">
                          {roles.map((role, rIndex) => (
                            <div key={role.title + rIndex}>
                              <p className="font-semibold">
                                {role.title}
                                {exp.roles.length > 1 && isPromotedRole(roleIndex, rIndex) && (
                                  <span className="ml-2 text-sm font-normal text-portfolio-highlight">Promoted</span>
                                )}
                              </p>
                              <Period period={role.period} />
                              <Bullets items={role.responsibilities} />
                            </div>
                          ))}
                        </div>
                      );
                    })}

                    {exp.projects && (
                      <div className="mt-7">
                        <h4 className="text-sm font-semibold text-portfolio-slate">Client projects</h4>
                        {exp.projects.map((project) => (
                          <div
                            key={project.name}
                            className="mt-3 rounded-r-md border-l-2 border-primary/40 py-1 pl-4 transition-colors hover:border-primary hover:bg-card"
                          >
                            <p className="flex flex-wrap items-baseline gap-x-2">
                              <span className="font-semibold">{project.name}</span>
                              <span className="text-portfolio-slate">{project.client ? `for ${project.client}` : "internal"}</span>
                              <span className="flex items-center gap-1.5 font-mono text-xs text-portfolio-slate">
                                <i
                                  className={cn(
                                    "live-dot",
                                    project.status !== "Ongoing" && "bg-faint after:hidden",
                                    project.status === "On hold" && "bg-warn",
                                  )}
                                />
                                {project.status.toLowerCase()}
                              </span>
                            </p>
                            {project.role && <p className="text-sm text-portfolio-slate">{project.role}</p>}
                            <Bullets items={project.highlights} />
                            {project.technologies && (
                              <p className="mt-2 font-mono text-xs text-muted-foreground">{project.technologies.join(" · ")}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {exp.achievements && (
                      <div className="mt-7">
                        <h4 className="text-sm font-semibold text-portfolio-slate">Key results</h4>
                        <Bullets items={exp.achievements} marker="marker:text-domain-web" />
                      </div>
                    )}

                    {earned.length > 0 && (
                      <p className="mt-6 text-sm text-portfolio-slate">
                        Certified here:{" "}
                        {earned.map((cert, i) => (
                          <React.Fragment key={cert.id}>
                            {i > 0 && ", "}
                            <CertificateDialog cert={cert}>
                              <button type="button" className="text-portfolio-white underline decoration-border underline-offset-4 hover:decoration-portfolio-highlight">
                                {cert.name}
                              </button>
                            </CertificateDialog>
                          </React.Fragment>
                        ))}
                      </p>
                    )}

                    {exp.technologies && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </section>

          {/* Education */}
          <section>
            <SectionHeading title="Education" />
            {education.map((item) => (
              <article key={item.id} className="reveal grid gap-2 border-b border-border py-6 first:pt-0 md:grid-cols-[10rem_1fr_auto] md:gap-8">
                <p className="font-mono text-[13px] text-faint">{item.period}</p>
                <div>
                  <h3 className="font-semibold">{item.degree}</h3>
                  <p className="text-portfolio-slate">{item.institution}</p>
                  <p className="mt-2 leading-relaxed text-portfolio-lightSlate">{item.description}</p>
                </div>
                <Tag kind="edu" />
              </article>
            ))}
          </section>

          {/* Certifications */}
          <section>
            <SectionHeading title="Certifications" />
            <ul>
              {certifications.map((cert) => (
                <li key={cert.id} className="border-b border-border">
                  <CertificateDialog cert={cert}>
                    <button
                      type="button"
                      className="-mx-2 grid w-[calc(100%+1rem)] items-baseline gap-1 rounded px-2 py-3.5 text-left transition-[background,transform] hover:translate-x-1 hover:bg-card md:grid-cols-[10rem_1fr_auto_auto] md:gap-6"
                    >
                      <span className="font-mono text-[13px] text-faint">{cert.year}</span>
                      <span className="font-medium">{cert.name}</span>
                      <span className="text-sm text-portfolio-slate">
                        {cert.issuer}
                        {cert.employer && ` · via ${cert.employer}`}
                      </span>
                      <Tag kind="cert" />
                    </button>
                  </CertificateDialog>
                </li>
              ))}
            </ul>
          </section>

          {/* Training */}
          <section>
            <SectionHeading title="Training" />
            {training.map((item) => (
              <article key={item.id} className="reveal grid gap-2 border-b border-border py-6 first:pt-0 md:grid-cols-[10rem_1fr_auto] md:gap-8">
                <p className="font-mono text-[13px] text-faint">{item.year}</p>
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-portfolio-slate">{item.provider}</p>
                  {item.description && <p className="mt-2 leading-relaxed text-portfolio-lightSlate">{item.description}</p>}
                </div>
                <Tag kind="training" />
              </article>
            ))}
          </section>
        </div>

        {/* Sidebar: plain reference facts */}
        <aside className="space-y-9 lg:sticky lg:top-24 lg:self-start">
          <SideBlock title="Contact">
            <dl className="space-y-2 text-sm">
              {contacts.map(({ label, value, href }) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-portfolio-slate">{label}</dt>
                  <dd className="min-w-0 truncate">
                    <a
                      href={href}
                      {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                      className="hover:text-portfolio-highlight"
                    >
                      {value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </SideBlock>

          <SideBlock title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {skillsOverview.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </SideBlock>

          <SideBlock title="Languages">
            <dl className="space-y-2 text-sm">
              {languages.map((lang) => (
                <div key={lang.name} className="flex justify-between gap-4">
                  <dt>{lang.name}</dt>
                  <dd className="text-portfolio-slate">{lang.level}</dd>
                </div>
              ))}
            </dl>
          </SideBlock>

          <SideBlock title="Personal details">
            <dl className="space-y-2 text-sm">
              {personalDetails.map((detail) => (
                <div key={detail.label} className="flex justify-between gap-4">
                  <dt className="text-portfolio-slate">{detail.label}</dt>
                  <dd className="text-right">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </SideBlock>

          <SideBlock title="Outside work">
            <div className="flex flex-wrap gap-1.5">
              {interests.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </SideBlock>
        </aside>
      </div>
    </Layout>
  );
};

export default Resume;
