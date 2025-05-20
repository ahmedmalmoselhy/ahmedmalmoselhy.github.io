
import React from 'react';
import Layout from '@/components/Layout';
import { Briefcase, GraduationCap, Award, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          <Button className="btn-primary animate-fade-in flex items-center gap-2">
            <FileText size={18} />
            Download CV
          </Button>
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
                {/* Job 1 */}
                <div className="card">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h3 className="text-xl font-semibold text-portfolio-white">Senior Software Engineer</h3>
                    <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">Jan 2022 - Present</span>
                  </div>
                  <h4 className="text-portfolio-lightSlate mb-4">Example Company Inc.</h4>
                  <ul className="space-y-2 text-portfolio-lightSlate">
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Led development of a high-traffic web application with over 100k daily users
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Implemented new features resulting in a 25% increase in user engagement
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Optimized database queries reducing load times by 40%
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Mentored junior developers and conducted code reviews to maintain code quality
                    </li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="card">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h3 className="text-xl font-semibold text-portfolio-white">Software Developer</h3>
                    <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">Mar 2019 - Dec 2021</span>
                  </div>
                  <h4 className="text-portfolio-lightSlate mb-4">Previous Company LLC</h4>
                  <ul className="space-y-2 text-portfolio-lightSlate">
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Developed and maintained multiple client-facing applications
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Implemented responsive designs ensuring compatibility across devices
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Collaborated with design and product teams to deliver features on time
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Participated in agile development process, including daily standups and sprint planning
                    </li>
                  </ul>
                </div>

                {/* Job 3 */}
                <div className="card">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h3 className="text-xl font-semibold text-portfolio-white">Junior Developer</h3>
                    <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">Jun 2018 - Feb 2019</span>
                  </div>
                  <h4 className="text-portfolio-lightSlate mb-4">First Job Inc.</h4>
                  <ul className="space-y-2 text-portfolio-lightSlate">
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Assisted in developing features for company's main product
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Fixed bugs and improved application performance
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-highlight mr-2">▹</span>
                      Learned and worked with various technologies in the company's stack
                    </li>
                  </ul>
                </div>
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
                <div className="card">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h3 className="text-xl font-semibold text-portfolio-white">Master's Degree in Computer Science</h3>
                    <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">2017 - 2019</span>
                  </div>
                  <h4 className="text-portfolio-lightSlate mb-4">University Name</h4>
                  <p className="text-portfolio-lightSlate">
                    Specialized in Software Engineering with focus on web technologies and distributed systems.
                    Graduated with honors.
                  </p>
                </div>

                {/* Education 2 */}
                <div className="card">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h3 className="text-xl font-semibold text-portfolio-white">Bachelor's Degree in Computer Engineering</h3>
                    <span className="text-portfolio-highlight font-mono text-sm mt-1 md:mt-0">2013 - 2017</span>
                  </div>
                  <h4 className="text-portfolio-lightSlate mb-4">University Name</h4>
                  <p className="text-portfolio-lightSlate">
                    Studied computer architecture, algorithms, and software development.
                    Participated in various hackathons and coding competitions.
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
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Info */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">Contact Information</h3>
              <div className="space-y-3 text-portfolio-lightSlate">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-portfolio-highlight" />
                  <span>ahmed@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-portfolio-highlight" />
                  <span>+1 (234) 567-8901</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-portfolio-highlight" />
                  <a href="https://linkedin.com" className="hover:text-portfolio-highlight">LinkedIn Profile</a>
                </div>
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-portfolio-highlight" />
                  <a href="https://github.com" className="hover:text-portfolio-highlight">GitHub Profile</a>
                </div>
              </div>
            </div>

            {/* Skills Overview */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">Skills Overview</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-portfolio-white mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">React</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">TypeScript</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">JavaScript</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">HTML/CSS</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-portfolio-white mb-2">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Node.js</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Express</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">MongoDB</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">SQL</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-portfolio-white mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Git</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">Docker</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">AWS</span>
                    <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-highlight">CI/CD</span>
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
                  <span className="text-portfolio-highlight">Native</span>
                </li>
                <li className="flex justify-between">
                  <span>Arabic</span>
                  <span className="text-portfolio-highlight">Native</span>
                </li>
                <li className="flex justify-between">
                  <span>French</span>
                  <span className="text-portfolio-highlight">Intermediate</span>
                </li>
                <li className="flex justify-between">
                  <span>German</span>
                  <span className="text-portfolio-highlight">Basic</span>
                </li>
              </ul>
            </div>
            
            {/* Interests */}
            <div className="card">
              <h3 className="text-xl font-semibold text-portfolio-white mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Open Source</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Web Development</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">UI/UX Design</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Machine Learning</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Photography</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Reading</span>
                <span className="px-2 py-1 bg-portfolio-navy rounded text-sm border border-portfolio-highlight/30 text-portfolio-slate">Traveling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;
