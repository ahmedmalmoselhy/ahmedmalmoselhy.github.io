import React from 'react';
import Layout from '@/components/Layout';
import { ArrowUpRight, Mail, Phone, Github, Linkedin, Briefcase, Building2, Lightbulb, Users } from 'lucide-react';

const channels = [
  { label: 'Email', value: 'ahmedmalmoselhy@gmail.com', href: 'mailto:ahmedmalmoselhy@gmail.com', icon: Mail },
  { label: 'Phone', value: '+20 111 700 1262', href: 'tel:+201117001262', icon: Phone },
  { label: 'LinkedIn', value: 'linkedin.com/in/ahmedmalmoselhy', href: 'https://www.linkedin.com/in/ahmedmalmoselhy/', icon: Linkedin, external: true },
  { label: 'GitHub', value: 'github.com/ahmedmalmoselhy', href: 'https://github.com/ahmedmalmoselhy', icon: Github, external: true },
];

const availability = [
  { title: 'Freelance Work', text: 'Available for short to medium-term projects', icon: Briefcase },
  { title: 'Full-time Positions', text: 'Open to discussing new opportunities', icon: Building2 },
  { title: 'Consulting', text: 'Technical consulting for your projects', icon: Lightbulb },
  { title: 'Collaboration', text: 'Interested in partnering on innovative projects', icon: Users },
];

const Contact = () => {
  return (
    <Layout className="pt-28">
      <section className="container mx-auto px-4 py-8 md:py-12">
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <span className="eyebrow mb-5 animate-fade-in">Contact</span>
          <h1 className="page-title mb-5 animate-slide-up">
            Let's build something <span className="text-portfolio-highlight">together</span>
          </h1>
          <p className="text-lg leading-relaxed text-portfolio-slate animate-slide-up md:text-xl" style={{ animationDelay: '120ms' }}>
            Have a question, a project idea, or just want to say hi? Reach out
            through any of the channels below.
          </p>
        </header>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {channels.map(({ label, value, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              className="panel card-interactive reveal group flex items-center gap-4 p-5 md:p-6"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-portfolio-highlight/10 text-portfolio-highlight ring-1 ring-inset ring-portfolio-highlight/25 shadow-lg transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-portfolio-slate">{label}</span>
                <span className="block font-mono text-sm text-portfolio-white [overflow-wrap:anywhere] md:text-base">
                  {value}
                </span>
              </span>
              <ArrowUpRight
                size={20}
                aria-hidden="true"
                className="shrink-0 text-portfolio-slate transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-portfolio-highlight"
              />
            </a>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <h2 className="section-title reveal">Available for</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {availability.map(({ title, text, icon: Icon }) => (
              <div key={title} className="panel reveal p-6">
                <Icon size={22} className="mb-4 text-portfolio-highlight" aria-hidden="true" />
                <h3 className="mb-2 text-lg font-bold text-portfolio-white">{title}</h3>
                <p className="text-sm leading-relaxed text-portfolio-slate">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
