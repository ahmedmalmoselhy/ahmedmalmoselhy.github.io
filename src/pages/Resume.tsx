import React from "react";
import Layout from "@/components/Layout";
import PageHeader, { SectionHeading } from "@/components/PageHeader";
import { ArrowRight, Download } from "lucide-react";
import { experiences, careerStartYear, companySlug } from "@/data/experience";
import { Bullets, Period } from "@/components/CompanyProject";
import type { Navigate } from "@/App";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { training } from "@/data/training";
import { skillsOverview, languages, personalDetails, interests } from "@/data/personal";
import { isPromotedRole } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { site, githubUrl, linkedinUrl } from "@/data/site";
import CertificateDialog from "@/components/CertificateDialog";
import CertificateGallery from "@/components/CertificateGallery";

const stats = [
  { value: `${new Date().getFullYear() - careerStartYear}+`, label: "Years of experience" },
  { value: String(experiences.length), label: "Companies" },
  { value: String(certifications.length), label: "Certifications" },
  { value: String(languages.length), label: "Languages" },
];

const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phoneDisplay, href: `tel:${site.phone}` },
  { label: "LinkedIn", value: `in/${site.linkedin}`, href: linkedinUrl },
  { label: "GitHub", value: site.github, href: githubUrl },
];

const certificationsByEmployer = (company: string) =>
  certifications.filter((cert) => cert.employer === company);

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

const Resume: React.FC<{ onSectionChange?: Navigate }> = ({ onSectionChange }) => {
  return (
    <Layout className="pt-0 md:pt-16">
      <PageHeader
        eyebrow="Resume"
        title="Professional experience"
        description="Telecom order management, CRM and full-stack web work, newest first."
        actions={
          <a href={site.resume} download className="btn-band">
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
                      <button
                        onClick={() => onSectionChange?.("company", companySlug(exp.company))}
                        className="group inline-flex items-center gap-2 text-left hover:text-portfolio-highlight"
                      >
                        {exp.company}
                        <ArrowRight
                          size={17}
                          aria-hidden="true"
                          className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-portfolio-highlight"
                        />
                      </button>
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
            <CertificateGallery certs={certifications} showEmployer />
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
