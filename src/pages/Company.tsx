import React from "react";
import { ArrowLeft, Award, ExternalLink, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader, { SectionHeading } from "@/components/PageHeader";
import { Bullets, CompanyProjectCard, Period } from "@/components/CompanyProject";
import { findCompany } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { calculateDuration } from "@/lib/date-utils";
import type { Navigate } from "@/App";

interface CompanyProps {
  slug: string;
  onSectionChange: Navigate;
}

const BackToResume: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="btn-band-outline">
    <ArrowLeft size={17} aria-hidden="true" /> Resume
  </button>
);

const Dot = () => <span aria-hidden="true">·</span>;

/** One page per employer, full width: achievements, roles, projects, certificates, then skills. */
const Company: React.FC<CompanyProps> = ({ slug, onSectionChange }) => {
  const company = findCompany(slug);
  const back = () => onSectionChange("resume");

  if (!company) {
    return (
      <Layout className="pt-0 md:pt-16">
        <PageHeader eyebrow="Experience" title="Company not found" actions={<BackToResume onClick={back} />} />
      </Layout>
    );
  }

  const roles = company.roles.flat();
  const projects = company.projects ?? [];
  const earned = certifications.filter((cert) => cert.employer === company.company);

  return (
    <Layout className="pt-0 md:pt-16">
      <PageHeader
        eyebrow="Experience"
        title={company.company}
        meta={
          <>
            {company.logo && (
              <img src={company.logo} alt="" className="h-6 w-6 rounded-sm border border-border bg-white object-contain p-0.5" />
            )}
            <span className="flex items-center gap-2">
              {company.period.includes("Present") && <i className="live-dot" aria-label="current" />}
              {company.period.replace(" - ", " – ").replace("Present", "now")}
            </span>
            <Dot />
            <span>{company.location}</span>
            <Dot />
            <span>{company.workType}</span>
            {company.link && (
              <>
                <Dot />
                <a
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  {company.link.replace(/^https?:\/\/(www\.)?|\/$/g, "")}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </>
            )}
          </>
        }
        description={company.overview}
        actions={<BackToResume onClick={back} />}
        stats={[
          { value: calculateDuration(company.period) || company.period, label: "Time there" },
          { value: String(roles.length), label: roles.length === 1 ? "Role" : "Roles" },
          { value: String(projects.length), label: "Projects" },
          { value: String(earned.length), label: "Certifications" },
        ]}
      />

      <div className="container mx-auto space-y-20 px-4 py-14 md:py-20">
        {company.achievements && (
          <section aria-label="Achievements" className="rounded-lg border border-t-2 border-border border-t-primary bg-card">
            <ul className="grid divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
              {company.achievements.map((item) => (
                <li key={item} className="flex gap-3 p-5">
                  <Trophy size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                  <p className="font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <SectionHeading title="Roles" />
          {roles.map((role) => (
            <article
              key={role.title + role.period}
              className="grid gap-4 border-b border-border py-8 first:pt-0 last:border-b-0 md:grid-cols-[16rem_1fr] md:gap-12"
            >
              <div>
                <h3 className="text-xl font-semibold">{role.title}</h3>
                <Period period={role.period} />
              </div>
              <div className="max-w-4xl">
                {role.details && <p className="text-lg leading-relaxed text-portfolio-lightSlate">{role.details}</p>}
                <Bullets items={role.responsibilities} />
              </div>
            </article>
          ))}
        </section>

        {[
          { title: "Customer projects", items: projects.filter((p) => p.client) },
          { title: "Internal projects", items: projects.filter((p) => !p.client) },
        ].map(
          ({ title, items }) =>
            items.length > 0 && (
              <section key={title}>
                <SectionHeading title={title} />
                <div className="space-y-6">
                  {items.map((project) => (
                    <CompanyProjectCard key={project.name} project={project} />
                  ))}
                </div>
              </section>
            ),
        )}

        {earned.length > 0 && (
          <section>
            <SectionHeading title="Certifications" />
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {earned.map((cert) => (
                <figure key={cert.id} className="overflow-hidden rounded-lg border border-border bg-card">
                  {cert.image ? (
                    <a href={cert.image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${cert.name} certificate`}>
                      <img
                        src={cert.image}
                        alt={`${cert.name} certificate`}
                        loading="lazy"
                        className="aspect-[4/3] w-full bg-white object-contain p-2 transition-transform hover:scale-[1.02]"
                      />
                    </a>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-muted/40 text-muted-foreground">
                      <Award size={40} aria-hidden="true" />
                    </div>
                  )}
                  <figcaption className="border-t border-border px-5 py-4">
                    <p className="font-semibold">{cert.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {cert.issuer} · {cert.year}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {company.technologies && (
          <section>
            <SectionHeading title="Skills" />
            <div className="flex flex-wrap gap-2.5">
              {company.technologies.map((tech) => (
                <span key={tech} className="rounded-md border border-border bg-card px-3.5 py-2 font-mono text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Company;
