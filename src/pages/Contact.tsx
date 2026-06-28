
import React from 'react';
import Layout from '@/components/Layout';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <Layout className="pt-20 md:pt-28">
      <section className="container mx-auto px-4 py-8 md:py-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-portfolio-highlight to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-portfolio-white mb-6 animate-fade-in tracking-tight">
            Get In <span className="text-portfolio-highlight">Touch</span>
          </h1>
          <p className="text-portfolio-slate max-w-2xl mx-auto text-lg md:text-xl animate-fade-in leading-relaxed">
            Have a question, a project idea, or just want to say hi?
            Feel free to contact me through any of the channels below.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Info - Now better responsive sizing */}
          <div className="space-y-8 md:space-y-12 animate-fade-in">
            <div className="bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 p-8 md:p-10 rounded-3xl shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-portfolio-white mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-portfolio-highlight rounded-full"></span>
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-portfolio-lightNavy/40 transition-colors duration-300">
                  <div className="bg-portfolio-navy p-4 rounded-full flex-shrink-0 border border-portfolio-slate/10 group-hover:border-portfolio-highlight/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Mail size={28} className="text-portfolio-highlight" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-portfolio-white font-bold mb-1 text-lg">Email</h3>
                    <a href="mailto:ahmed.malmoselhy@gmail.com" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-base md:text-lg break-all font-mono">
                      ahmed.malmoselhy@gmail.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-portfolio-lightNavy/40 transition-colors duration-300">
                  <div className="bg-portfolio-navy p-4 rounded-full flex-shrink-0 border border-portfolio-slate/10 group-hover:border-portfolio-highlight/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Phone size={28} className="text-portfolio-highlight" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-portfolio-white font-bold mb-1 text-lg">Phone</h3>
                    <a href="tel:+201117001262" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-base md:text-lg font-mono">
                      +20 111 700 1262
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-portfolio-lightNavy/40 transition-colors duration-300">
                  <div className="bg-portfolio-navy p-4 rounded-full flex-shrink-0 border border-portfolio-slate/10 group-hover:border-portfolio-highlight/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Linkedin size={28} className="text-portfolio-highlight" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-portfolio-white font-bold mb-1 text-lg">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/ahmedmalmoselhy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-base md:text-lg break-all"
                    >
                      linkedin.com/in/ahmedmalmoselhy
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-portfolio-lightNavy/40 transition-colors duration-300">
                  <div className="bg-portfolio-navy p-4 rounded-full flex-shrink-0 border border-portfolio-slate/10 group-hover:border-portfolio-highlight/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Github size={28} className="text-portfolio-highlight" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-portfolio-white font-bold mb-1 text-lg">GitHub</h3>
                    <a
                      href="https://github.com/ahmedmalmoselhy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-base md:text-lg break-all"
                    >
                      github.com/ahmedmalmoselhy
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-portfolio-white mb-6 md:mb-8 text-center flex items-center justify-center gap-3">
                <span className="w-8 h-1 bg-portfolio-slate/20 rounded-full"></span>
                Available For
                <span className="w-8 h-1 bg-portfolio-slate/20 rounded-full"></span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-portfolio-lightNavy/20 backdrop-blur-sm rounded-xl p-6 border border-portfolio-slate/10 hover:border-portfolio-highlight/20 hover:bg-portfolio-lightNavy/40 transition-all duration-300 text-center group hover:-translate-y-1">
                  <h3 className="text-portfolio-white font-bold mb-2 text-lg group-hover:text-portfolio-highlight transition-colors">Freelance Work</h3>
                  <p className="text-portfolio-slate text-sm leading-relaxed">Available for short to medium-term projects</p>
                </div>

                <div className="bg-portfolio-lightNavy/20 backdrop-blur-sm rounded-xl p-6 border border-portfolio-slate/10 hover:border-portfolio-highlight/20 hover:bg-portfolio-lightNavy/40 transition-all duration-300 text-center group hover:-translate-y-1">
                  <h3 className="text-portfolio-white font-bold mb-2 text-lg group-hover:text-portfolio-highlight transition-colors">Full-time Positions</h3>
                  <p className="text-portfolio-slate text-sm leading-relaxed">Open to discussing new opportunities</p>
                </div>

                <div className="bg-portfolio-lightNavy/20 backdrop-blur-sm rounded-xl p-6 border border-portfolio-slate/10 hover:border-portfolio-highlight/20 hover:bg-portfolio-lightNavy/40 transition-all duration-300 text-center group hover:-translate-y-1">
                  <h3 className="text-portfolio-white font-bold mb-2 text-lg group-hover:text-portfolio-highlight transition-colors">Consulting</h3>
                  <p className="text-portfolio-slate text-sm leading-relaxed">Technical consulting for your projects</p>
                </div>

                <div className="bg-portfolio-lightNavy/20 backdrop-blur-sm rounded-xl p-6 border border-portfolio-slate/10 hover:border-portfolio-highlight/20 hover:bg-portfolio-lightNavy/40 transition-all duration-300 text-center group hover:-translate-y-1">
                  <h3 className="text-portfolio-white font-bold mb-2 text-lg group-hover:text-portfolio-highlight transition-colors">Collaboration</h3>
                  <p className="text-portfolio-slate text-sm leading-relaxed">Interested in partnering on innovative projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
