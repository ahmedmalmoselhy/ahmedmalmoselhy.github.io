import React from "react";
import Layout, { GroupedSection, PageHeader } from "@/components/Layout";
import {
  Award,
  BookOpen,
  Building2,
  Download,
  GraduationCap,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { experiences } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { training } from "@/data/training";
import {
  contactLinks,
  skillsOverview,
  languages,
  personalDetails,
  interests,
} from "@/data/personal";
import { calculateDuration, isPromotedRole } from "@/lib/date-utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

/** Organization logo on a white tile so it reads in both appearances. Decorative: the name sits beside it. */
const Logo = ({ src, icon: Icon }: { src?: string; icon: LucideIcon }) => (
  <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-border">
    {src ? (
      <img src={src} alt="" className="h-full w-full object-contain" />
    ) : (
      <Icon aria-hidden size={22} className="text-neutral-500" />
    )}
  </span>
);

const Chips = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li key={item} className="rounded-full bg-card px-3.5 py-1.5 text-subhead">
        {item}
      </li>
    ))}
  </ul>
);

const SectionTitle = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="mb-6 text-title1 font-bold">
    {children}
  </h2>
);

const Resume = () => {
  return (
    <Layout>
      <PageHeader
        title="Resume"
        description="Where I've worked, what I've studied, and the credentials along the way."
      >
        <Button asChild size="lg" className="rounded-full px-6 text-callout">
          <a href="/AhmedAlMoselhy.pdf" download>
            <Download aria-hidden /> Download PDF
          </a>
        </Button>
      </PageHeader>

      <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
        <div className="space-y-16 lg:col-span-2">
          <section aria-labelledby="experience">
            <SectionTitle id="experience">Experience</SectionTitle>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <article key={`${exp.company}-${exp.period}`} className="surface p-6 md:p-8">
                  <header className="flex items-start gap-4">
                    <Logo src={exp.logo} icon={Building2} />
                    <div className="min-w-0">
                      <h3 className="text-title3 font-semibold">
                        {exp.link ? (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </h3>
                      <p className="mt-1 text-subhead text-muted-foreground">
                        {[exp.period, exp.location, exp.workType, exp.outsourced && `via ${exp.outsourced}`]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                  </header>

                  <div className="mt-6 space-y-6">
                    {exp.roles.map((roleItem, roleIndex) => {
                      const isParallel = Array.isArray(roleItem);
                      const roles = isParallel ? roleItem : [roleItem];

                      return (
                        <div key={roleIndex} className={cn(isParallel && "grid gap-4 md:grid-cols-2")}>
                          {roles.map((role, rIndex) => {
                            const duration = calculateDuration(role.period);
                            return (
                              <div key={rIndex} className={cn(isParallel && "rounded-2xl bg-secondary/60 p-5")}>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                  <h4 className="text-headline">{role.title}</h4>
                                  {exp.roles.length > 1 && isPromotedRole(roleIndex, rIndex) && (
                                    <span className="inline-flex items-center gap-1 text-footnote font-semibold text-signal-green">
                                      {/* <TrendingUp aria-hidden size={14} /> Promoted */}
                                    </span>
                                  )}
                                </div>
                                <p className="text-subhead text-muted-foreground">
                                  {role.period}
                                  {duration && ` · ${duration}`}
                                </p>
                                <ul className="mt-3 list-disc space-y-2 pl-5 text-callout marker:text-muted-foreground">
                                  {role.responsibilities.map((resp, i) => (
                                    <li key={i}>{resp}</li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  {exp.technologies && (
                    <p className="mt-6 border-t pt-4 text-footnote text-muted-foreground">
                      <span className="font-semibold text-foreground">Tech Stack </span>
                      {exp.technologies.join(" · ")}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="education">
            <SectionTitle id="education">Education</SectionTitle>
            <ul className="inset-group">
              {education.map((item) => (
                <li key={item.id} className="inset-row items-start py-5">
                  <Logo src={item.logo} icon={GraduationCap} />
                  <div className="min-w-0">
                    <h3 className="text-headline">{item.degree}</h3>
                    <p className="text-subhead text-muted-foreground">
                      {item.institution} · {item.period}
                    </p>
                    <p className="mt-2 text-callout text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="certifications">
            <SectionTitle id="certifications">Certifications</SectionTitle>
            <ul className="grid gap-4 md:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="surface flex h-full w-full items-center gap-4 p-5 text-left transition-shadow hover:shadow-lg">
                        <Logo src={cert.logo} icon={Award} />
                        <span className="min-w-0">
                          <span className="line-clamp-2 text-headline">{cert.name}</span>
                          <span className="block text-subhead text-muted-foreground">
                            {cert.issuer} · {cert.year}
                          </span>
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-3xl p-0 sm:rounded-3xl">
                      <DialogTitle className="p-6 pr-14 text-title3 font-semibold">{cert.name}</DialogTitle>
                      <div className="bg-background p-6">
                        {cert.image ? (
                          <img
                            src={cert.image}
                            alt={`${cert.name} certificate`}
                            className="mx-auto w-full max-w-2xl rounded-xl"
                          />
                        ) : (
                          <p className="py-16 text-center text-body text-muted-foreground">
                            No certificate image is available for this one yet.
                          </p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="training">
            <SectionTitle id="training">Training</SectionTitle>
            <ul className="inset-group">
              {training.map((item) => (
                <li key={item.id} className="inset-row items-start py-5">
                  <Logo src={item.logo} icon={BookOpen} />
                  <div className="min-w-0">
                    <h3 className="text-headline">{item.name}</h3>
                    <p className="text-subhead text-muted-foreground">
                      {item.provider} · {item.year}
                    </p>
                    {item.description && (
                      <p className="mt-2 text-callout text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-10">
          <GroupedSection title="Contact">
            <ul className="inset-group">
              {contactLinks.map(({ label, value, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="inset-row text-subhead"
                  >
                    <Icon aria-hidden size={18} className="shrink-0 text-primary" />
                    <span className="min-w-0 break-all">{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </GroupedSection>

          <GroupedSection title="Skills Overview">
            <Chips items={skillsOverview} />
          </GroupedSection>

          <GroupedSection title="Languages">
            <ul className="inset-group">
              {languages.map((lang) => (
                <li key={lang.name} className="inset-row justify-between">
                  <span>{lang.name}</span>
                  <span className="text-muted-foreground">{lang.level}</span>
                </li>
              ))}
            </ul>
          </GroupedSection>

          <GroupedSection title="Personal Details">
            <ul className="inset-group">
              {personalDetails.map((detail) => (
                <li key={detail.label} className="inset-row justify-between">
                  <span>{detail.label}</span>
                  <span className="text-muted-foreground">{detail.value}</span>
                </li>
              ))}
            </ul>
          </GroupedSection>

          <GroupedSection title="Interests">
            <Chips items={interests} />
          </GroupedSection>
        </aside>
      </div>
    </Layout>
  );
};

export default Resume;
