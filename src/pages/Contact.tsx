import React from 'react';
import Layout from '@/components/Layout';
import PageHeader, { SectionHeading } from '@/components/PageHeader';
import { ArrowUpRight, Download, Mail, Phone, Github, Linkedin, Briefcase, Building2, Lightbulb, Users } from 'lucide-react';

const EMAIL = 'ahmedmalmoselhy@gmail.com';

const channels = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
  { label: 'Phone', value: '+20 111 700 1262', href: 'tel:+201117001262', icon: Phone },
  { label: 'LinkedIn', value: 'linkedin.com/in/ahmedmalmoselhy', href: 'https://www.linkedin.com/in/ahmedmalmoselhy/', icon: Linkedin, external: true },
  { label: 'GitHub', value: 'github.com/ahmedmalmoselhy', href: 'https://github.com/ahmedmalmoselhy', icon: Github, external: true },
];

const availability = [
  { title: 'Freelance work', text: 'Available for short to medium-term projects.', icon: Briefcase },
  { title: 'Full-time positions', text: 'Open to discussing new opportunities.', icon: Building2 },
  { title: 'Consulting', text: 'Technical consulting for CRM, telecom, and web projects.', icon: Lightbulb },
  { title: 'Collaboration', text: 'Interested in partnering on innovative projects.', icon: Users },
];

const Contact = () => {
  return (
    <Layout className="pt-16">
      <PageHeader
        eyebrow="Contact"
        title="Let's work together"
        description="Have a question, a project idea, or an opportunity? Reach out through any channel below — email is the fastest."
        actions={
          <>
            <a href={`mailto:${EMAIL}`} className="btn-band">
              <Mail size={17} aria-hidden="true" /> Email me
            </a>
            <a href="/AhmedAlMoselhy.pdf" download className="btn-band-outline">
              <Download size={17} aria-hidden="true" /> Download CV
            </a>
          </>
        }
      />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading eyebrow="Get in touch" title="Contact channels" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {channels.map(({ label, value, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              className="panel card-interactive reveal group flex items-center gap-4 p-5 md:p-6"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-portfolio-highlight/10 text-portfolio-highlight">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wider text-portfolio-slate">{label}</span>
                <span className="mt-0.5 block font-medium text-portfolio-white [overflow-wrap:anywhere]">{value}</span>
              </span>
              <ArrowUpRight
                size={20}
                aria-hidden="true"
                className="shrink-0 text-portfolio-slate transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-portfolio-highlight"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <SectionHeading eyebrow="Engagements" title="Available for" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {availability.map(({ title, text, icon: Icon }) => (
            <article key={title} className="panel reveal p-6">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-portfolio-highlight/10 text-portfolio-highlight">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-portfolio-white">{title}</h3>
              <p className="text-sm leading-relaxed text-portfolio-slate">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
