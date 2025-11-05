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
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    period: "2022 - Present",
    responsibilities: [
      "Led development of enterprise-level web applications using Laravel and Vue.js",
      "Implemented RESTful APIs and microservices architecture",
      "Mentored junior developers and conducted code reviews",
      "Optimized database performance, reducing query time by 40%",
      "Collaborated with cross-functional teams in Agile environment"
    ],
    technologies: ["Laravel", "Vue.js", "PostgreSQL", "Docker", "AWS"]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations Ltd.",
    location: "City, Country",
    period: "2020 - 2022",
    responsibilities: [
      "Developed and maintained multiple client-facing web applications",
      "Built custom CRM integrations with Salesforce and HubSpot",
      "Implemented automated testing procedures, improving code quality",
      "Designed and implemented database schemas for complex applications",
      "Participated in daily standups and sprint planning sessions"
    ],
    technologies: ["PHP", "JavaScript", "MySQL", "Git", "Jira"]
  },
  {
    title: "Backend Developer",
    company: "StartUp Ventures",
    location: "City, Country",
    period: "2018 - 2020",
    responsibilities: [
      "Developed backend services and APIs for mobile applications",
      "Implemented authentication and authorization systems",
      "Worked with Oracle Database for data management",
      "Participated in system architecture design discussions",
      "Provided technical support and bug fixes"
    ],
    technologies: ["Node.js", "Express", "OracleDB", "REST APIs"]
  },
  {
    title: "Junior Developer",
    company: "Web Agency Pro",
    location: "City, Country",
    period: "2016 - 2018",
    responsibilities: [
      "Assisted in development of client websites and web applications",
      "Wrote clean, maintainable code following best practices",
      "Learned modern web development frameworks and tools",
      "Collaborated with designers to implement responsive designs",
      "Participated in team meetings and planning sessions"
    ],
    technologies: ["HTML/CSS", "JavaScript", "PHP", "WordPress"]
  }
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
                              <span className="text-portfolio-highlight mt-1.5">▹</span>
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
