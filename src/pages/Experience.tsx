import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, TrendingUp, Clock, Building2 } from "lucide-react";
import { experiences } from "@/data/experience";
import { calculateDuration } from "@/lib/date-utils";

const Experience = () => {
  return (
    <Layout className="pt-28">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-white mb-4 animate-fade-in">
            Work Experience
          </h1>
          <p className="text-portfolio-slate max-w-3xl mx-auto animate-fade-in">
            A journey through my professional career, highlighting key roles,
            responsibilities, and achievements in software development.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-portfolio-slate/30 hidden md:block"></div>

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-portfolio-highlight border-4 border-background hidden md:block"></div>

                  {/* Content card */}
                  <Card className="md:ml-20 bg-portfolio-lightNavy border-portfolio-slate/20 hover:border-portfolio-highlight/50 transition-all duration-300">
                    <CardContent className="p-6">
                      {/* Company Header */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div className="flex items-center gap-3">
                          {/* Company Logo */}
                          <div className="w-12 h-12 rounded-lg bg-white border border-portfolio-slate/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {exp.logo ? (
                              <img
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                className="w-full h-full object-contain p-1"
                              />
                            ) : (
                              <Building2 size={24} className="text-portfolio-highlight" />
                            )}
                          </div>
                          <span className="text-xl md:text-2xl font-bold text-portfolio-white flex flex-col md:flex-row md:items-baseline gap-2">
                            <a
                              href={exp.link ? exp.link : undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline hover:text-portfolio-highlight transition-colors"
                            >
                              {exp.company}
                            </a>
                            {exp.outsourced && (
                              <span className="text-sm font-normal text-portfolio-slate/80">
                                (Contracted via {exp.outsourced})
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 mt-2 md:mt-0 md:text-right">
                          <div className="flex items-center gap-2 text-portfolio-slate">
                            <MapPin size={16} />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-portfolio-slate">
                            <Briefcase size={16} />
                            <span className="text-sm">{exp.workType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-portfolio-slate">
                            <Calendar size={16} />
                            <span className="text-sm">{exp.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Roles */}
                      <div className="space-y-6">
                        {exp.roles.map((role, roleIdx) => {
                          // Handle both single Role and Role[] cases
                          const roles = Array.isArray(role) ? role : [role];
                          return roles.map((singleRole, singleRoleIdx) => (
                            <div
                              key={`${roleIdx}-${singleRoleIdx}`}
                              className={`${roleIdx > 0 || singleRoleIdx > 0 ? "pt-6 border-t border-portfolio-slate/20" : ""}`}
                            >
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-lg md:text-xl font-semibold text-portfolio-white">
                                    {singleRole.title}
                                  </h3>
                                  {(exp.roles.length > 1 || roles.length > 1) && (roleIdx > 0 || singleRoleIdx > 0) && (
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 flex items-center gap-1">
                                      <TrendingUp size={12} />
                                      Promoted
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-portfolio-slate mt-1 md:mt-0">
                                  <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span className="text-sm">{singleRole.period}</span>
                                  </div>
                                  {calculateDuration(singleRole.period) && (
                                    <div className="flex items-center gap-1 text-portfolio-highlight/70">
                                      <Clock size={14} />
                                      <span className="text-sm">{calculateDuration(singleRole.period)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-portfolio-lightSlate font-semibold mb-3 text-sm">
                                  Key Responsibilities:
                                </h4>
                                <ul className="space-y-2">
                                  {singleRole.responsibilities.map((resp, respIdx) => (
                                    <li
                                      key={respIdx}
                                      className="text-portfolio-slate flex items-start gap-2"
                                    >
                                      <span className="text-portfolio-highlight mt-1.5">
                                        ▹
                                      </span>
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ));
                        })}
                      </div>

                      {exp.technologies && (
                        <div className="mt-6 pt-4 border-t border-portfolio-slate/20">
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIdx) => (
                              <span
                                key={techIdx}
                                className="px-3 py-1 text-sm rounded-full bg-portfolio-highlight/10 text-portfolio-highlight border border-portfolio-highlight/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Experience;
