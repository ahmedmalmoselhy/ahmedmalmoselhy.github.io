import React from "react";
import Layout from "@/components/Layout";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { training } from "@/data/training";
import { skillsOverview, languages, personalDetails, interests } from "@/data/personal";
import { calculateDuration, isPromotedRole } from "@/lib/date-utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

const Resume = () => {
  return (
    <Layout className="pt-28">
      <div className="container mx-auto px-4">
        <header className="mb-20 pt-10 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-portfolio-highlight to-transparent opacity-50"></div>
          <h1 className="text-5xl md:text-7xl font-bold text-portfolio-white mb-6 animate-fade-in tracking-tight">
            My <span className="text-portfolio-highlight">Journey</span>
          </h1>
          <p className="text-portfolio-slate max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed animate-fade-in">
            Architecting scalable solutions and crafting exceptional digital experiences.
            Here is a chronological overview of my professional path.
          </p>

          <div className="flex justify-center gap-4 animate-fade-in">
            <a href="/AhmedAlMoselhy.pdf" download>
              <Button className="h-12 px-8 bg-portfolio-highlight hover:bg-portfolio-highlight/90 text-portfolio-navy font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2">
                <Download size={20} />
                Download CV
              </Button>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Work Experience */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-portfolio-highlight/10 rounded-xl">
                  <Briefcase size={28} className="text-portfolio-highlight" />
                </div>
                <h2 className="text-3xl font-bold text-portfolio-white">
                  Professional Journey
                </h2>
              </div>

              <div className="relative border-l-2 border-portfolio-slate/20 ml-3 md:ml-6 space-y-12 pb-4">
                {experiences.map((exp, index) => (
                  <div className="relative pl-8 md:pl-12" key={index}>
                    {/* Glowing Timeline Node */}
                    <div className="absolute -left-[21px] md:-left-[26px] top-0 transition-transform duration-300 hover:scale-110">
                      <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-portfolio-navy border-2 border-portfolio-highlight/30 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(100,255,218,0.15)] z-10">
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
                    <div className="group relative">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-portfolio-white flex flex-wrap items-center gap-2 mb-2">
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
                            {exp.outsourced && (
                              <span className="bg-portfolio-lightNavy/50 px-2 py-1 rounded text-portfolio-slate border border-portfolio-slate/20">
                                via {exp.outsourced}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <MapPin size={14} /> {exp.location}
                            </span>
                            <span className="hidden md:inline text-portfolio-slate/30">|</span>
                            <span>{exp.workType}</span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center gap-2 text-portfolio-highlight font-mono bg-portfolio-highlight/5 px-3 py-1 rounded-full border border-portfolio-highlight/10">
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
                                      ? "bg-portfolio-lightNavy/30 border border-portfolio-slate/10 p-5 rounded-xl hover:border-portfolio-highlight/30 transition-all duration-300"
                                      : "relative border-l-2 border-portfolio-highlight/20 pl-4 py-2"
                                    }
                                  `}
                                >
                                  <div className="mb-4">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                      <h4
                                        className={`${isParallel ? "text-lg md:text-xl font-bold" : "text-xl md:text-2xl font-semibold"} text-portfolio-white`}
                                      >
                                        {role.title}
                                      </h4>
                                      {/* Logic for badges if needed, e.g. Promoted */}
                                      {/* Simplified logic: if not parallel and index > 0, it's a promotion in a linear stack usually */}
                                      {exp.roles.length > 1 && isPromotedRole(roleIndex, rIndex) && (
                                        <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 gap-1">
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
                              className="px-2.5 py-1 text-xs rounded-md bg-portfolio-navy border border-portfolio-slate/20 text-portfolio-lightSlate hover:text-portfolio-highlight hover:border-portfolio-highlight/30 transition-colors cursor-default"
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
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-portfolio-highlight/10 rounded-xl">
                  <GraduationCap size={28} className="text-portfolio-highlight" />
                </div>
                <h2 className="text-3xl font-bold text-portfolio-white">
                  Education
                </h2>
              </div>

              <div className="space-y-6">
                {education.map((item) => (
                  <div
                    key={item.id}
                    className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 rounded-2xl hover:border-portfolio-highlight/30 transition-all duration-300"
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
                          <h3 className="text-xl font-bold text-portfolio-white mb-2">
                            {item.degree}
                          </h3>
                          <h4 className="text-lg text-portfolio-highlight mb-1">
                            {item.institution}
                          </h4>
                        </div>
                        <span className="md:text-right text-portfolio-slate font-mono bg-portfolio-navy/50 px-3 py-1 rounded-full border border-portfolio-slate/20 text-sm whitespace-nowrap">
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
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-portfolio-highlight/10 rounded-xl">
                  <Award size={28} className="text-portfolio-highlight" />
                </div>
                <h2 className="text-3xl font-bold text-portfolio-white">
                  Certifications
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert) => (
                  <Dialog key={cert.id}>
                    <DialogTrigger asChild>
                      <div className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 rounded-2xl cursor-pointer hover:border-portfolio-highlight/50 hover:bg-portfolio-lightNavy/50 hover:-translate-y-1 transition-all duration-300 group h-full shadow-lg shadow-transparent hover:shadow-portfolio-highlight/5">
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
                            <h3 className="text-lg font-bold text-portfolio-white mb-2 group-hover:text-portfolio-highlight transition-colors line-clamp-2">
                              {cert.name}
                            </h3>
                            <p className="text-portfolio-slate text-sm flex flex-col gap-1">
                              <span className="font-semibold">{cert.issuer}</span>
                              <span className="text-portfolio-highlight/80 font-mono text-xs">
                                {cert.year}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-portfolio-navy border-portfolio-slate/20 p-0 overflow-hidden">
                      <div className="p-6 border-b border-portfolio-slate/10">
                        <DialogTitle className="text-portfolio-white text-2xl font-bold">
                          {cert.name}
                        </DialogTitle>
                      </div>
                      <div className="bg-portfolio-lightNavy/50 p-6 flex justify-center">
                        <div className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl border border-portfolio-slate/20">
                          {cert.image ? (
                            <img
                              src={cert.image}
                              alt={`${cert.name} Certificate`}
                              className="w-full h-auto object-contain"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-portfolio-slate bg-portfolio-navy">
                              <Award size={48} className="mb-4 opacity-50" />
                              <p>Certificate image not available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </section>

            {/* Training */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-portfolio-highlight/10 rounded-xl">
                  <BookOpen size={28} className="text-portfolio-highlight" />
                </div>
                <h2 className="text-3xl font-bold text-portfolio-white">
                  Training
                </h2>
              </div>

              <div className="space-y-6">
                {training.map((item) => (
                  <div
                    key={item.id}
                    className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 rounded-2xl hover:border-portfolio-highlight/30 transition-all duration-300"
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
                          <h3 className="text-xl font-bold text-portfolio-white mb-2">
                            {item.name}
                          </h3>
                          <h4 className="text-lg text-portfolio-highlight mb-1">
                            {item.provider}
                          </h4>
                        </div>
                        <span className="md:text-right text-portfolio-slate font-mono bg-portfolio-navy/50 px-3 py-1 rounded-full border border-portfolio-slate/20 text-sm whitespace-nowrap">
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
            <div className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 rounded-2xl hover:border-portfolio-highlight/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-portfolio-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-portfolio-highlight rounded-full"></span>
                Contact Info
              </h3>
              <div className="space-y-4 text-portfolio-lightSlate">
                <a
                  href="mailto:ahmedmalmoselhy@gmail.com"
                  className="flex items-center gap-4 group p-3 rounded-lg hover:bg-portfolio-highlight/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-portfolio-navy flex items-center justify-center text-portfolio-highlight group-hover:scale-110 transition-transform">
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
                  <div className="w-10 h-10 rounded-full bg-portfolio-navy flex items-center justify-center text-portfolio-highlight group-hover:scale-110 transition-transform">
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
                  <div className="w-10 h-10 rounded-full bg-portfolio-navy flex items-center justify-center text-portfolio-highlight group-hover:scale-110 transition-transform">
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
                  <div className="w-10 h-10 rounded-full bg-portfolio-navy flex items-center justify-center text-portfolio-highlight group-hover:scale-110 transition-transform">
                    <Github size={18} />
                  </div>
                  <span className="group-hover:text-portfolio-highlight transition-colors text-sm">
                    GitHub Profile
                  </span>
                </a>
              </div>
            </div>

            {/* Skills Overview */}
            <div className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 rounded-2xl hover:border-portfolio-highlight/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-portfolio-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-portfolio-highlight rounded-full"></span>
                Skills Overview
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillsOverview.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-portfolio-navy/60 hover:bg-portfolio-navy rounded-lg text-xs font-mono border border-portfolio-highlight/10 hover:border-portfolio-highlight/40 text-portfolio-highlight transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 rounded-2xl hover:border-portfolio-highlight/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-portfolio-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-portfolio-highlight rounded-full"></span>
                Languages
              </h3>
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
            <div className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 rounded-2xl hover:border-portfolio-highlight/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-portfolio-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-portfolio-highlight rounded-full"></span>
                Personal Details
              </h3>
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
            <div className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-6 rounded-2xl hover:border-portfolio-highlight/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-portfolio-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-portfolio-highlight rounded-full"></span>
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-portfolio-navy/40 rounded-full text-xs border border-portfolio-slate/10 text-portfolio-slate hover:text-portfolio-highlight hover:border-portfolio-highlight/30 transition-colors cursor-default"
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
