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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experience";

const Certifications = [
  {
    name: "Creatio Software Developer [Advanced]",
    issuer: "Creatio Academy",
    year: "2025",
  },
  {
    name: "Creatio No-Code Creator [Basic]",
    issuer: "Creatio Academy",
    year: "2025",
  },
  {
    name: "Using Databases with Python",
    issuer: "Coursera",
    year: "2018",
  },
  {
    name: "Using Python to Access Web Data",
    issuer: "Coursera",
    year: "2016",
  },
  {
    name: "Python Data Structures",
    issuer: "Coursera",
    year: "2016",
  },
  {
    name: "Programming for Everybody (Getting Started with Python)",
    issuer: "Coursera",
    year: "2016",
  },
];

const Resume = () => {
  return (
    <Layout className="pt-28">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-white mb-4 animate-fade-in">
            My Resume
          </h1>
          <p className="text-portfolio-slate max-w-2xl mx-auto mb-8 animate-fade-in">
            A comprehensive overview of my professional experience, education,
            and skills
          </p>
          <a href="/AhmedAlMoselhy.pdf" download className="inline-block">
            <Button className="btn-primary animate-fade-in flex items-center gap-2">
              <Download size={18} />
              Download CV
            </Button>
          </a>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Work Experience */}
            <section>
              <h2 className="section-title flex items-center gap-3">
                <Briefcase size={24} className="text-portfolio-highlight" />
                Work Experience
              </h2>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div className="card" key={index}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-portfolio-white">
                          {exp.company}
                        </h3>
                        <p className="text-sm text-portfolio-slate mt-1">
                          {exp.workType} &middot; {exp.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6 mt-4">
                      {exp.roles.map((role, roleIndex) => (
                        <div
                          key={roleIndex}
                          className={`${roleIndex > 0 ? "pt-4 border-t border-portfolio-slate/20" : ""}`}
                        >
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                            <h4 className="text-lg md:text-xl font-semibold text-portfolio-white">
                              {role.title}
                            </h4>
                            <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">
                              {role.period}
                            </span>
                          </div>
                          <ul className="space-y-2 text-portfolio-lightSlate">
                            {role.responsibilities.map((resp, respIndex) => (
                              <li className="flex items-start" key={respIndex}>
                                <span className="text-portfolio-highlight mr-2">
                                  ▹
                                </span>
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="section-title flex items-center gap-3">
                <GraduationCap size={24} className="text-portfolio-highlight" />
                Education
              </h2>

              <div className="space-y-8">
                {/* Education 1 */}
                {/* <div className="card">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h3 className="text-xl font-semibold text-portfolio-white">Master's Degree in Computer Science</h3>
                    <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">2017 - 2019</span>
                  </div>
                  <h4 className="text-portfolio-lightSlate mb-4">University Name</h4>
                  <p className="text-portfolio-lightSlate">
                    Specialized in Software Engineering with focus on web technologies and distributed systems.
                    Graduated with honors.
                  </p>
                </div> */}

                {/* Education 2 */}
                <div className="card">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h3 className="text-xl font-semibold text-portfolio-white">
                      Bachelor's Degree in Computers & Systems Engineering
                    </h3>
                    <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">
                      2014 - 2020
                    </span>
                  </div>
                  <h4 className="text-portfolio-lightSlate mb-4">
                    Mansoura University
                  </h4>
                  <p className="text-portfolio-lightSlate">
                    Algorithms, Data Structures, Programming Languages, Agile
                    Methodology, Waterfall Methodology, Software Development,
                    Work Ethics, Classic Control Systems, PLC, Embedded Systems,
                    Databases.
                  </p>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="section-title flex items-center gap-3">
                <Award size={24} className="text-portfolio-highlight" />
                Certifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Certifications.map((cert, index) => (
                  <div className="card" key={index}>
                    <h3 className="text-lg font-semibold text-portfolio-white mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-portfolio-lightSlate">
                      {cert.issuer} &middot;{" "}
                      <span className="text-portfolio-highlight">
                        {cert.year}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Info */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-3 text-portfolio-lightSlate">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-portfolio-highlight" />
                  <span>
                    <span>
                      <a
                        href="mailto:ahmedalmoselhy.slm@gmail.com"
                        className="hover:text-portfolio-highlight"
                      >
                        ahmedalmoselhy.slm@gmail.com
                      </a>
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-portfolio-highlight" />
                  <span>
                    <a
                      href="tel:+201117001262"
                      className="hover:text-portfolio-highlight"
                    >
                      +20 111 700 1262
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-portfolio-highlight" />
                  <a
                    href="https://www.linkedin.com/in/ahmedmalmoselhy/"
                    className="hover:text-portfolio-highlight"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-portfolio-highlight" />
                  <a
                    href="https://github.com/ahmedmalmoselhy"
                    className="hover:text-portfolio-highlight"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Skills Overview */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">
                Skills Overview
              </h3>

              <div className="space-y-4">
                <div>
                  {/* <h4 className="text-portfolio-white mb-2">Frontend</h4> */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      JavaScript
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Node JS
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Express JS
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Vue JS
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      HTML/CSS
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Python
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      PHP
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Laravel
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      C#
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Oracle DB
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Maria DB
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      MySQL
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      PostgreSQL
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      SQL
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Git
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Docker
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Ericsson Order Care [EOC]
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Ericsson Catalog Manager [ECM]
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Creatio
                    </span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">
                      Jira
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">
                Languages
              </h3>
              <ul className="space-y-2 text-portfolio-lightSlate">
                <li className="flex justify-between">
                  <span>English</span>
                  <span className="text-portfolio-highlight">Professional</span>
                </li>
                <li className="flex justify-between">
                  <span>Arabic</span>
                  <span className="text-portfolio-highlight">Native</span>
                </li>
              </ul>
            </div>

            {/* Personal Details */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">
                Personal Details
              </h3>
              <ul className="space-y-2 text-portfolio-lightSlate">
                <li>
                  Date of Birth:{" "}
                  <span className="text-portfolio-highlight">1996</span>
                </li>
                <li>
                  Military Service:{" "}
                  <span className="text-portfolio-highlight">Completed</span>
                </li>
                <li>
                  Marital Status:{" "}
                  <span className="text-portfolio-highlight">Married</span>
                </li>
              </ul>
            </div>

            {/* Interests */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">
                  Open Source
                </span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">
                  Web Development
                </span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">
                  Database Design
                </span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">
                  CRM Development
                </span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">
                  Photography
                </span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">
                  Reading
                </span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">
                  Traveling
                </span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">
                  Gaming
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;
