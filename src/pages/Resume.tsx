import React from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import {
  Briefcase,
  GraduationCap,
  FileText,
  Mail,
  Phone,
  Linkedin,
  Github,
  Download,
  Award,
  TrendingUp,
  BookOpen,
  Clock,
  Building2,
  CheckCircle,
  Zap,
  Calendar,
  MapPin,
  Globe,
  Code,
  Database,
  FolderKanban,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experiences, careerStartYear, type ProjectStatus } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { training } from "@/data/training";
import { skillsOverview, languages, personalDetails, interests } from "@/data/personal";
import { calculateDuration, isPromotedRole } from "@/lib/date-utils";
import CertificateDialog from "@/components/CertificateDialog";

const stats = [
  { value: `${new Date().getFullYear() - careerStartYear}+`, label: "Years of experience" },
  { value: String(experiences.length), label: "Companies" },
  { value: String(certifications.length), label: "Certifications" },
  { value: String(languages.length), label: "Languages" },
];

const projectStatusStyles: Record<ProjectStatus, string> = {
  Ongoing: "border-emerald-500/50 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10",
  Completed: "border-sky-500/50 text-sky-700 dark:text-sky-400 bg-sky-500/10",
  "On hold": "border-amber-500/50 text-amber-700 dark:text-amber-400 bg-amber-500/10",
};

const certificationsByEmployer =(company: string) =>
  certifications.filter((cert) => cert.employer === company);

const Resume = () => {
  return (
    <Layout className="pt-0 md:pt-16">
      <PageHeader
        eyebrow="Resume"
        title="Professional experience"
        description="A chronological overview of my professional path — telecom BSS, CRM, and full-stack web engineering."
        actions={
          <a href="/AhmedAlMoselhy.pdf" download className="btn-band">
            <Download size={17} aria-hidden="true" /> Download CV
          </a>
        }
        stats={stats}
      />
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Work Experience */}
            <section>
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-portfolio-highlight/10 text-portfolio-highlight">
                  <Briefcase size={22} aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-semibold text-portfolio-white md:text-3xl">Professional Journey</h2>
              </div>

              <div className="relative border-l-2 border-portfolio-highlight/25 ml-3 md:ml-6 space-y-12 pb-4">
                {experiences.map((exp, index) => (
                  <div className="relative pl-8 md:pl-12" key={index}>
                    {/* Glowing Timeline Node */}
                    <div className="absolute -left-[21px] md:-left-[26px] top-0 transition-transform duration-300 hover:scale-110">
                      <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-portfolio-navy border-2 border-portfolio-highlight/30 flex items-center justify-center overflow-hidden z-10">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain p-1.5 bg-white"
                          />
                        ) : (
                          <Building2
                            size={24}
                            className="text-portfolio-highlight"
                          />
                        )}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="panel reveal group relative p-5 md:p-7">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-semibold text-portfolio-white flex flex-wrap items-center gap-2 mb-2">
                            {exp.link ? (
                              <a
                                href={exp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-portfolio-highlight transition-colors flex items-center gap-2"
                              >
                                {exp.company}
                                <Globe size={18} className="opacity-50" />
                              </a>
                            ) : (
                              <span>{exp.company}</span>
                            )}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-portfolio-slate text-sm md:text-base">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} /> {exp.location}
                            </span>
                            <span className="hidden md:inline text-portfolio-slate/30">|</span>
                            <span>{exp.workType}</span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 inline-flex items-center gap-2 self-start whitespace-nowrap rounded-md bg-portfolio-highlight/10 px-3 py-1 text-sm font-medium text-portfolio-highlight">
                          <Calendar size={14} />
                          {exp.period}
                        </div>
                      </div>

                      <div className="space-y-6">
                        {exp.roles.map((roleItem, roleIndex) => {
                          const isParallel = Array.isArray(roleItem);
                          const roles = isParallel ? roleItem : [roleItem];

                          return (
                            <div
                              key={roleIndex}
                              className={
                                isParallel
                                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                                  : "bg-portfolio-lightNavy/20 rounded-xl p-0"
                              }
                            >
                              {roles.map((role, rIndex) => (
                                <div
                                  key={rIndex}
                                  className={`
                                    ${isParallel
                                      ? "panel rounded-2xl p-5"
                                      : "relative border-l-2 border-portfolio-highlight/20 pl-4 py-2"
                                    }
                                  `}
                                >
                                  <div className="mb-4">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                      <h4
                                        className={`${isParallel ? "text-lg md:text-xl font-semibold" : "text-xl md:text-2xl font-semibold"} text-portfolio-white`}
                                      >
                                        {role.title}
                                      </h4>
                                      {/* Logic for badges if needed, e.g. Promoted */}
                                      {/* Simplified logic: if not parallel and index > 0, it's a promotion in a linear stack usually */}
                                      {exp.roles.length > 1 && isPromotedRole(roleIndex, rIndex) && (
                                        <Badge variant="outline" className="border-emerald-500/50 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 gap-1">
                                          <TrendingUp size={12} /> Promoted
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-portfolio-slate font-mono">
                                      {role.period}
                                      {calculateDuration(role.period) && (
                                        <>
                                          <span className="text-portfolio-slate/30">•</span>
                                          <span>{calculateDuration(role.period)}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  <ul className="space-y-3">
                                    {role.responsibilities.map(
                                      (resp, respIndex) => (
                                        <li
                                          key={respIndex}
                                          className="flex items-start text-portfolio-lightSlate/90 group/item"
                                        >
                                          <span className="mt-1.5 mr-3 flex-shrink-0 text-portfolio-highlight/70 group-hover/item:text-portfolio-highlight transition-colors">
                                            <Zap size={14} className="fill-current" />
                                          </span>
                                          <span className="leading-relaxed">
                                            {resp}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>

                      {/* Client projects delivered at this company */}
                      {exp.projects && (
                        <div className="mt-8">
                          <h4 className="eyebrow mb-4 flex items-center gap-2">
                            <FolderKanban size={14} aria-hidden="true" /> Projects
                          </h4>
                          <div className="space-y-4">
                            {exp.projects.map((project) => (
                              <div key={project.name} className="panel rounded-xl p-5">
                                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                  <div className="flex items-start gap-3">
                                    {project.logo && (
                                      <img
                                        src={project.logo}
                                        alt={`${project.client ?? project.name} logo`}
                                        className="h-11 w-11 flex-shrink-0 rounded-lg bg-white object-contain p-1"
                                        loading="lazy"
                                      />
                                    )}
                                    <div>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h5 className="text-lg font-semibold text-portfolio-white">
                                          {project.name}
                                          {project.client && (
                                            <span className="font-normal text-portfolio-slate"> · {project.client}</span>
                                          )}
                                        </h5>
                                        <Badge variant="outline" className={`gap-1.5 ${projectStatusStyles[project.status]}`}>
                                          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                                          {project.status}
                                        </Badge>
                                      </div>
                                      {project.role && (
                                        <p className="text-sm text-portfolio-highlight">{project.role}</p>
                                      )}
                                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-portfolio-slate">
                                        {project.location && (
                                          <span className="flex items-center gap-1">
                                            <MapPin size={12} /> {project.location}
                                          </span>
                                        )}
                                        {project.workType && <span>{project.workType}</span>}
                                      </div>
                                    </div>
                                  </div>
                                  {project.period && (
                                    <div className="self-start whitespace-nowrap font-mono text-sm text-portfolio-slate">
                                      {project.period}
                                      {calculateDuration(project.period) && (
                                        <span className="text-portfolio-slate/60"> • {calculateDuration(project.period)}</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <ul className="space-y-2">
                                  {project.highlights.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm text-portfolio-lightSlate/90">
                                      <span className="mr-3 mt-1 flex-shrink-0 text-portfolio-highlight/70">
                                        <Zap size={12} className="fill-current" />
                                      </span>
                                      <span className="leading-relaxed">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                                {project.technologies && (
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                      <span key={tech} className="chip text-xs">{tech}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exp.achievements && (
                        <div className="mt-8">
                          <h4 className="eyebrow mb-4 flex items-center gap-2">
                            <Trophy size={14} aria-hidden="true" /> Achievements
                          </h4>
                          <ul className="space-y-3">
                            {exp.achievements.map((item, i) => (
                              <li key={i} className="flex items-start text-portfolio-lightSlate/90">
                                <span className="mr-3 mt-1 flex-shrink-0 text-portfolio-highlight">
                                  <CheckCircle size={16} />
                                </span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {certificationsByEmployer(exp.company).length > 0 && (
                        <div className="mt-8">
                          <h4 className="eyebrow mb-4 flex items-center gap-2">
                            <Award size={14} aria-hidden="true" /> Certifications earned
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {certificationsByEmployer(exp.company).map((cert) => (
                              <CertificateDialog key={cert.id} cert={cert}>
                                <button
                                  type="button"
                                  className="chip inline-flex items-center gap-2 transition-colors hover:border-portfolio-highlight hover:text-portfolio-highlight"
                                >
                                  {cert.logo && (
                                    <img src={cert.logo} alt="" className="h-4 w-4 rounded-sm bg-white object-contain" />
                                  )}
                                  {cert.name}
                                  <span className="font-mono text-xs opacity-60">{cert.year}</span>
                                </button>
                              </CertificateDialog>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack Footer */}
                      {exp.technologies && (
                        <div className="mt-6 pt-6 border-t border-portfolio-slate/10 flex flex-wrap gap-2">
                          <div className="flex items-center gap-2 mr-2 text-portfolio-slate text-sm">
                            <Code size={16} />
                            <span>Tech Stack:</span>
                          </div>
                          {exp.technologies.map((tech, tIndex) => (
                            <span
                              key={tIndex}
                              className="chip"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-portfolio-highlight/10 text-portfolio-highlight">
                  <GraduationCap size={22} aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-semibold text-portfolio-white md:text-3xl">Education</h2>
              </div>

              <div className="space-y-6">
                {education.map((item) => (
                  <div
                    key={item.id}
                    className="panel reveal p-6"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md p-2 border border-portfolio-slate/10">
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt={`${item.institution} logo`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <GraduationCap
                            size={24}
                            className="text-portfolio-highlight"
                          />
                        )}
                      </div>

                      <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-portfolio-white mb-2">
                            {item.degree}
                          </h3>
                          <h4 className="text-lg text-portfolio-highlight mb-1">
                            {item.institution}
                          </h4>
                        </div>
                        <span className="chip self-start whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>
                    </div>

                    <p className="text-portfolio-lightSlate leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-portfolio-highlight/10 text-portfolio-highlight">
                  <Award size={22} aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-semibold text-portfolio-white md:text-3xl">Certifications</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert) => (
                  <CertificateDialog key={cert.id} cert={cert}>
                      <div className="panel card-interactive reveal group h-full p-6">
                        <div className="flex items-start gap-4 h-full">
                          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md p-2">
                            {cert.logo ? (
                              <img
                                src={cert.logo}
                                alt={`${cert.issuer} logo`}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Award
                                size={24}
                                className="text-portfolio-highlight"
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-portfolio-white mb-2 group-hover:text-portfolio-highlight transition-colors line-clamp-2">
                              {cert.name}
                            </h3>
                            <p className="text-portfolio-slate text-sm flex flex-col gap-1">
                              <span className="font-semibold">{cert.issuer}</span>
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="text-portfolio-highlight/80 font-mono text-xs">
                                  {cert.year}
                                </span>
                                {cert.employer && (
                                  <span className="chip text-xs">via {cert.employer}</span>
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                  </CertificateDialog>
                ))}
              </div>
            </section>

            {/* Training */}
            <section>
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-portfolio-highlight/10 text-portfolio-highlight">
                  <BookOpen size={22} aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-semibold text-portfolio-white md:text-3xl">Training</h2>
              </div>

              <div className="space-y-6">
                {training.map((item) => (
                  <div
                    key={item.id}
                    className="panel reveal p-6"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md p-2 border border-portfolio-slate/10">
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt={`${item.provider} logo`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <BookOpen
                            size={24}
                            className="text-portfolio-highlight"
                          />
                        )}
                      </div>

                      <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-portfolio-white mb-2">
                            {item.name}
                          </h3>
                          <h4 className="text-lg text-portfolio-highlight mb-1">
                            {item.provider}
                          </h4>
                        </div>
                        <span className="chip self-start whitespace-nowrap">
                          {item.year}
                        </span>
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-portfolio-lightSlate leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Info */}
            <div className="panel reveal p-6">
              <h3 className="eyebrow mb-5">Contact Info</h3>
              <div className="space-y-4 text-portfolio-lightSlate">
                <a
                  href="mailto:ahmedmalmoselhy@gmail.com"
                  className="flex items-center gap-4 group p-3 rounded-lg hover:bg-portfolio-highlight/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-portfolio-highlight/10 flex items-center justify-center text-portfolio-highlight">
                    <Mail size={18} />
                  </div>
                  <span className="group-hover:text-portfolio-highlight transition-colors text-sm break-all">
                    ahmedmalmoselhy@gmail.com
                  </span>
                </a>
                <a
                  href="tel:+201117001262"
                  className="flex items-center gap-4 group p-3 rounded-lg hover:bg-portfolio-highlight/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-portfolio-highlight/10 flex items-center justify-center text-portfolio-highlight">
                    <Phone size={18} />
                  </div>
                  <span className="group-hover:text-portfolio-highlight transition-colors text-sm">
                    +20 111 700 1262
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ahmedmalmoselhy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-3 rounded-lg hover:bg-portfolio-highlight/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-portfolio-highlight/10 flex items-center justify-center text-portfolio-highlight">
                    <Linkedin size={18} />
                  </div>
                  <span className="group-hover:text-portfolio-highlight transition-colors text-sm">
                    LinkedIn Profile
                  </span>
                </a>
                <a
                  href="https://github.com/ahmedmalmoselhy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-3 rounded-lg hover:bg-portfolio-highlight/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-portfolio-highlight/10 flex items-center justify-center text-portfolio-highlight">
                    <Github size={18} />
                  </div>
                  <span className="group-hover:text-portfolio-highlight transition-colors text-sm">
                    GitHub Profile
                  </span>
                </a>
              </div>
            </div>

            {/* Skills Overview */}
            <div className="panel reveal p-6">
              <h3 className="eyebrow mb-5">Skills Overview</h3>

              <div className="flex flex-wrap gap-2">
                {skillsOverview.map((skill, i) => (
                  <span
                    key={i}
                    className="chip"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="panel reveal p-6">
              <h3 className="eyebrow mb-5">Languages</h3>
              <ul className="space-y-4">
                {languages.map((lang) => (
                  <li key={lang.name} className="flex justify-between items-center group">
                    <span className="text-portfolio-lightSlate group-hover:text-portfolio-white transition-colors">{lang.name}</span>
                    <Badge variant="outline" className="text-portfolio-highlight border-portfolio-highlight/30 bg-portfolio-highlight/5">{lang.level}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Details */}
            <div className="panel reveal p-6">
              <h3 className="eyebrow mb-5">Personal Details</h3>
              <ul className="space-y-4 text-portfolio-lightSlate text-sm">
                {personalDetails.map((detail, i) => (
                  <li
                    key={detail.label}
                    className={`flex justify-between ${i < personalDetails.length - 1 ? "border-b border-portfolio-slate/10 pb-2" : ""}`}
                  >
                    <span>{detail.label}</span>
                    <span className="text-portfolio-white font-mono">{detail.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interests */}
            <div className="panel reveal p-6">
              <h3 className="eyebrow mb-5">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <span
                    key={i}
                    className="chip"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;
