
import React from 'react';
import Layout from '@/components/Layout';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <Layout className="pt-20 md:pt-28">
      <div className="container mx-auto px-4">
        <header className="mb-8 md:mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-portfolio-white mb-3 md:mb-4 animate-fade-in">
            Get In Touch
          </h1>
          <p className="text-portfolio-slate max-w-2xl mx-auto text-sm md:text-base animate-fade-in">
            Have a question or want to work together? Feel free to contact me through any of the channels below.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info - Now better responsive sizing */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="card">
              <h2 className="text-xl md:text-2xl font-semibold text-portfolio-white mb-5 md:mb-8">Contact Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="bg-portfolio-highlight/20 p-3 md:p-4 rounded-full flex-shrink-0">
                    <Mail size={24} className="text-portfolio-highlight" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-portfolio-white font-medium mb-1 md:mb-2 text-lg md:text-xl">Email</h3>
                    <a href="mailto:ahmedalmoselhy.slm@gmail.com" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-sm md:text-lg break-all">
                      ahmedalmoselhy.slm@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="bg-portfolio-highlight/20 p-3 md:p-4 rounded-full flex-shrink-0">
                    <Phone size={24} className="text-portfolio-highlight" />
                  </div>
                  <div>
                    <h3 className="text-portfolio-white font-medium mb-1 md:mb-2 text-lg md:text-xl">Phone</h3>
                    <a href="tel:+201117001262" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-sm md:text-lg">
                      +20 111 700 1262
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="bg-portfolio-highlight/20 p-3 md:p-4 rounded-full flex-shrink-0">
                    <Linkedin size={24} className="text-portfolio-highlight" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-portfolio-white font-medium mb-1 md:mb-2 text-lg md:text-xl">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/ahmedmalmoselhy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-sm md:text-lg break-all"
                    >
                      linkedin.com/in/ahmedmalmoselhy
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="bg-portfolio-highlight/20 p-3 md:p-4 rounded-full flex-shrink-0">
                    <Github size={24} className="text-portfolio-highlight" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-portfolio-white font-medium mb-1 md:mb-2 text-lg md:text-xl">GitHub</h3>
                    <a
                      href="https://github.com/ahmedmalmoselhy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-sm md:text-lg break-all"
                    >
                      github.com/ahmedmalmoselhy
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl md:text-2xl font-semibold text-portfolio-white mb-4 md:mb-6">Available For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-portfolio-navy rounded p-4 md:p-6 border border-portfolio-slate/20 text-center">
                  <h3 className="text-portfolio-white font-medium mb-1 md:mb-2 text-base md:text-lg">Freelance Work</h3>
                  <p className="text-portfolio-slate text-xs md:text-sm">Available for short to medium-term projects</p>
                </div>

                <div className="bg-portfolio-navy rounded p-4 md:p-6 border border-portfolio-slate/20 text-center">
                  <h3 className="text-portfolio-white font-medium mb-1 md:mb-2 text-base md:text-lg">Full-time Positions</h3>
                  <p className="text-portfolio-slate text-xs md:text-sm">Open to discussing new opportunities</p>
                </div>

                <div className="bg-portfolio-navy rounded p-4 md:p-6 border border-portfolio-slate/20 text-center">
                  <h3 className="text-portfolio-white font-medium mb-1 md:mb-2 text-base md:text-lg">Consulting</h3>
                  <p className="text-portfolio-slate text-xs md:text-sm">Technical consulting for your projects</p>
                </div>

                <div className="bg-portfolio-navy rounded p-4 md:p-6 border border-portfolio-slate/20 text-center">
                  <h3 className="text-portfolio-white font-medium mb-1 md:mb-2 text-base md:text-lg">Collaboration</h3>
                  <p className="text-portfolio-slate text-xs md:text-sm">Interested in partnering on innovative projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
