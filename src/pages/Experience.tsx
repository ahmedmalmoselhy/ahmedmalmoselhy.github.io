import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies?: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "EOC/ECM Developer",
    company: "STC [outsourced from Qeema]",
    period: "July 2023 - Present",
    location: "Riyadh, Saudi Arabia",
    responsibilities: [
      "Product Catalog Management: Oversaw catalog components using Ericsson Catalog Manager (ECM), ensuring accurate and efficient handling of product data.",
      "Technical Support: Delivered advanced support to maintain system reliability and swiftly resolve critical issues in the L3 layer of support.",
      "System Integration: Contributed to the development efforts, implementing logic to interface with external systems for streamlined operations and improved overall performance.",
    ],
    technologies: [
      "Ericsson Order Care [EOC]",
      "Ericsson Catalog Manager [ECM]",
      "JavaScript",
      "SQL",
      "Oracle DB",
      "Git",
      "Docker",
    ],
  },
  {
    title: "Software Engineer",
    company: "Qeema",
    period: "December 2022 - Present",
    location: "Cairo, Egypt",
    responsibilities: [
      "Developed and implemented EOC solutions for the Jawwy DT project, customizing CRM solutions to meet telecom industry-specific requirements",
      "Provided Level 3 advanced application support ensuring optimal performance and rapid issue resolution",
      "Played a pivotal role in the successful release of the Jawwy DT project by maintaining EOC/ECM modules and supporting the client's operation team",
      "Led the EOC/ECM upgrade from version 20 to 22, resolving version conflicts while maintaining system integration and implementation flow",
    ],
    technologies: [
      "Ericsson Order Care [EOC]",
      "Ericsson Catalog Manager [ECM]",
      "Creatio",
      "JavaScript",
      "SQL",
      "C#",
      "Oracle DB",
      "Microsoft SQL Server",
      "Git",
      "Docker",
    ],
  },
  {
    title: "Software Engineer",
    company: "Serv5",
    period: "October 2021 - November 2022",
    location: "Mansoura, Egypt",
    responsibilities: [
      "Enhanced web application performance through comprehensive front-end and back-end optimizations",
      "Integrated third-party APIs to support mobile application functionality and improve user experience",
      "Provided post-sales technical support to address client needs and ensure smooth deployment",
      "Streamlined development processes by introducing modern tools and frameworks for workflow automation",
      "Improved codebase quality to align with industry standards and best practices",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "JavaScript",
      "Vue.js",
      "MySQL",
      "RESTful APIs",
      "Git",
      "Node JS",
      "Express.js",
    ],
  },
];

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
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-portfolio-white mb-2">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-portfolio-highlight mb-2">
                            <Briefcase size={18} />
                            <span className="font-semibold">{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2 md:mt-0 md:text-right">
                          <div className="flex items-center gap-2 text-portfolio-slate">
                            <Calendar size={16} />
                            <span className="text-sm">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2 text-portfolio-slate">
                            <MapPin size={16} />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-portfolio-lightSlate font-semibold mb-3">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, respIdx) => (
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

                      {exp.technologies && (
                        <div className="mt-4 pt-4 border-t border-portfolio-slate/20">
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
