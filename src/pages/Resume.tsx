import React from 'react';
import Layout from '@/components/Layout';
import { Briefcase, GraduationCap, FileText, Mail, Phone, Linkedin, Github, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const jobs = [
  {
    title: 'EOC/ECM Developer',
    company: 'STC [outsourced from Qeema]',
    duration: 'July 2023 - Present',
    roles: [
      "Product Catalog Management: Oversaw catalog components using Ericsson Catalog Manager (ECM), ensuring accurate and efficient handling of product data.",
      "Technical Support: Delivered advanced support to maintain system reliability and swiftly resolve critical issues in the L3 layer of support.",
      "System Integration: Contributed to the development efforts, implementing logic to interface with external systems for streamlined operations and improved overall performance."
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Qeema',
    duration: 'December 2022 - Present',
    roles: [
      'Developed and implemented EOC solutions for the Jawwy DT project, customizing CRM solutions to meet telecom industry-specific requirements',
      'Provided Level 3 advanced application support ensuring optimal performance and rapid issue resolution',
      'Played a pivotal role in the successful release of the Jawwy DT project by maintaining EOC/ECM modules and supporting the client\'s operation team',
      'Led the EOC/ECM upgrade from version 20 to 22, resolving version conflicts while maintaining system integration and implementation flow',
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Serv5',
    duration: 'October 2021 - November 2022',
    roles: [
      'Enhanced web application performance through comprehensive front-end and back-end optimizations',
      'Integrated third-party APIs to support mobile application functionality and improve user experience',
      'Provided post-sales technical support to address client needs and ensure smooth deployment',
      'Streamlined development processes by introducing modern tools and frameworks for workflow automation',
      'Improved codebase quality to align with industry standards and best practices',
    ]
  }
]


const Resume = () => {
  return (
    <Layout className="pt-28">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-white mb-4 animate-fade-in">
            My Resume
          </h1>
          <p className="text-portfolio-slate max-w-2xl mx-auto mb-8 animate-fade-in">
            A comprehensive overview of my professional experience, education, and skills
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
                {jobs.map((job, index) => (
                  <div className="card" key={index}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <h3 className="text-xl font-semibold text-portfolio-white">{job.title}</h3>
                      <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">{job.duration}</span>
                    </div>
                    <h4 className="text-portfolio-lightSlate mb-4">{job.company}</h4>
                    <ul className="space-y-2 text-portfolio-lightSlate">
                      {job.roles.map((role, roleIndex) => (
                        <li className="flex items-start" key={roleIndex}>
                          <span className="text-portfolio-highlight mr-2">▹</span>
                          {role}
                        </li>
                      ))}
                    </ul>
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
                    <h3 className="text-xl font-semibold text-portfolio-white">Bachelor's Degree in Computers & Systems Engineering</h3>
                    <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">2014 - 2020</span>
                  </div>
                  <h4 className="text-portfolio-lightSlate mb-4">Mansoura University</h4>
                  <p className="text-portfolio-lightSlate">
                    Algorithms, Data Structures, Programming Languages, Agile Methodology, Waterfall Methodology, Software Development, Work Ethics, Classic Control Systems, PLC, Embedded Systems, Databases.
                  </p>
                </div>
              </div>
            </section>

            {/* Certifications */}
            {/* <section>
              <h2 className="section-title flex items-center gap-3">
                <Award size={24} className="text-portfolio-highlight" />
                Certifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-xl font-semibold text-portfolio-white mb-2">AWS Certified Developer</h3>
                  <p className="text-portfolio-lightSlate">Issued by Amazon Web Services, 2021</p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-portfolio-white mb-2">Certified Scrum Master</h3>
                  <p className="text-portfolio-lightSlate">Scrum Alliance, 2020</p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-portfolio-white mb-2">React Advanced Developer</h3>
                  <p className="text-portfolio-lightSlate">Frontend Masters, 2019</p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-portfolio-white mb-2">MongoDB Certification</h3>
                  <p className="text-portfolio-lightSlate">MongoDB University, 2018</p>
                </div>
              </div>
            </section> */}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Info */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">Contact Information</h3>
              <div className="space-y-3 text-portfolio-lightSlate">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-portfolio-highlight" />
                  <span><span><a href="mailto:ahmedalmoselhy.slm@gmail.com" className="hover:text-portfolio-highlight">ahmedalmoselhy.slm@gmail.com</a></span></span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-portfolio-highlight" />
                  <span><a href="tel:+201117001262" className="hover:text-portfolio-highlight">+20 111 700 1262</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-portfolio-highlight" />
                  <a href="https://www.linkedin.com/in/ahmedmalmoselhy/" className="hover:text-portfolio-highlight">LinkedIn Profile</a>
                </div>
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-portfolio-highlight" />
                  <a href="https://github.com/ahmedmalmoselhy" className="hover:text-portfolio-highlight">GitHub Profile</a>
                </div>
              </div>
            </div>

            {/* Skills Overview */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">Skills Overview</h3>

              <div className="space-y-4">
                <div>
                  {/* <h4 className="text-portfolio-white mb-2">Frontend</h4> */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">JavaScript</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Node JS</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Express JS</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Vue JS</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">HTML/CSS</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Python</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">PHP</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Laravel</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">C#</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Oracle DB</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Maria DB</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">MySQL</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">PostgreSQL</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">SQL</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Git</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Docker</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Ericsson Order Care [EOC]</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Ericsson Catalog Manager [ECM]</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Creatio</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Jira</span>

                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">Languages</h3>
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
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">Personal Details</h3>
              <ul className="space-y-2 text-portfolio-lightSlate">
                <li>Date of Birth: <span className="text-portfolio-highlight">1996</span></li>
                <li>Military Service: <span className="text-portfolio-highlight">Completed</span></li>
                <li>Marital Status: <span className="text-portfolio-highlight">Married</span></li>
              </ul>
            </div>

            {/* Interests */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Open Source</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Web Development</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Database Design</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">CRM Development</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Photography</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Reading</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Traveling</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Gaming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;
