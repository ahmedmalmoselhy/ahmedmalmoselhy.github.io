
import React from 'react';
import Layout from '@/components/Layout';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <Layout className="pt-28">
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-white mb-4 animate-fade-in">
            Get In Touch
          </h1>
          <p className="text-portfolio-slate max-w-2xl mx-auto animate-fade-in">
            Have a question or want to work together? Feel free to contact me through any of the channels below.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info - Now centered and expanded */}
          <div className="space-y-8 animate-fade-in">
            <div className="card">
              <h2 className="text-2xl font-semibold text-portfolio-white mb-8">Contact Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-portfolio-highlight/20 p-4 rounded-full">
                    <Mail size={30} className="text-portfolio-highlight" />
                  </div>
                  <div>
                    <h3 className="text-portfolio-white font-medium mb-2 text-xl">Email</h3>
                    <a href="mailto:ahmedalmoselhy.slm@gmail.com" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-lg">
                      ahmedalmoselhy.slm@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-portfolio-highlight/20 p-4 rounded-full">
                    <Phone size={30} className="text-portfolio-highlight" />
                  </div>
                  <div>
                    <h3 className="text-portfolio-white font-medium mb-2 text-xl">Phone</h3>
                    <a href="tel:+201117001262" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-lg">
                      +20 111 700 1262
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-portfolio-highlight/20 p-4 rounded-full">
                    <Linkedin size={30} className="text-portfolio-highlight" />
                  </div>
                  <div>
                    <h3 className="text-portfolio-white font-medium mb-2 text-xl">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/ahmedmalmoselhy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-lg"
                    >
                      linkedin.com/in/ahmedmalmoselhy
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-portfolio-highlight/20 p-4 rounded-full">
                    <Github size={30} className="text-portfolio-highlight" />
                  </div>
                  <div>
                    <h3 className="text-portfolio-white font-medium mb-2 text-xl">GitHub</h3>
                    <a
                      href="https://github.com/ahmedmalmoselhy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-slate hover:text-portfolio-highlight transition-colors text-lg"
                    >
                      github.com/ahmedmalmoselhy
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-semibold text-portfolio-white mb-6">Available For</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-portfolio-navy rounded p-6 border border-portfolio-slate/20 text-center">
                  <h3 className="text-portfolio-white font-medium mb-2">Freelance Work</h3>
                  <p className="text-portfolio-slate">Available for short to medium-term projects</p>
                </div>

                <div className="bg-portfolio-navy rounded p-6 border border-portfolio-slate/20 text-center">
                  <h3 className="text-portfolio-white font-medium mb-2">Full-time Positions</h3>
                  <p className="text-portfolio-slate">Open to discussing new opportunities</p>
                </div>

                <div className="bg-portfolio-navy rounded p-6 border border-portfolio-slate/20 text-center">
                  <h3 className="text-portfolio-white font-medium mb-2">Consulting</h3>
                  <p className="text-portfolio-slate">Technical consulting for your projects</p>
                </div>

                <div className="bg-portfolio-navy rounded p-6 border border-portfolio-slate/20 text-center">
                  <h3 className="text-portfolio-white font-medium mb-2">Collaboration</h3>
                  <p className="text-portfolio-slate">Interested in partnering on innovative projects</p>
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
