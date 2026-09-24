import React from 'react';
import Layout from '@/components/Layout';
import { FileHeader } from '@/components/CodeView';
import { Download, Mail } from 'lucide-react';

const EMAIL = 'ahmedmalmoselhy@gmail.com';

const channels = [
  { key: 'email', value: EMAIL, href: `mailto:${EMAIL}` },
  { key: 'phone', value: '+20 111 700 1262', href: 'tel:+201117001262' },
  { key: 'linkedin', value: 'linkedin.com/in/ahmedmalmoselhy', href: 'https://www.linkedin.com/in/ahmedmalmoselhy/', external: true },
  { key: 'github', value: 'github.com/ahmedmalmoselhy', href: 'https://github.com/ahmedmalmoselhy', external: true },
];

const availability = [
  { key: 'freelance', text: 'short to medium-term projects' },
  { key: 'full-time', text: 'open to discussing new opportunities' },
  { key: 'consulting', text: 'CRM, telecom, and web projects' },
  { key: 'collaboration', text: 'partnering on innovative projects' },
];

const Prompt = ({ command }: { command: string }) => (
  <p>
    <span className="syn-string">ahmed@portfolio</span>
    <span className="text-portfolio-slate">:</span>
    <span className="syn-keyword">~</span>
    <span className="text-portfolio-slate">$ </span>
    <span className="text-portfolio-white">{command}</span>
  </p>
);

const Contact = () => {
  return (
    <Layout>
      <FileHeader
        comment="contact.sh — email is the fastest way to reach me"
        keyword="export"
        name="CONTACT"
        description="Have a question, a project idea, or an opportunity? Run the script below or pick any channel."
        actions={
          <>
            <a href={`mailto:${EMAIL}`} className="btn-primary">
              <Mail size={16} aria-hidden="true" /> Send email
            </a>
            <a href="/AhmedAlMoselhy.pdf" download className="btn-secondary">
              <Download size={16} aria-hidden="true" /> resume.pdf
            </a>
          </>
        }
      />

      {/* Terminal panel */}
      <section aria-label="Terminal" className="panel overflow-hidden bg-[hsl(var(--chrome))]">
        <div className="flex items-center gap-5 border-b border-border px-4 font-mono text-[11px] uppercase tracking-wider text-portfolio-slate">
          <span className="py-2">Problems</span>
          <span className="py-2">Output</span>
          <span className="border-b border-portfolio-highlight py-2 text-portfolio-white">Terminal</span>
          <span className="ml-auto normal-case tracking-normal">bash</span>
        </div>

        <div className="space-y-6 p-4 font-mono text-[13px] leading-6 md:p-6 md:text-sm">
          <div>
            <Prompt command="./contact.sh" />
            <p className="syn-comment mt-1"># contact channels — select one</p>
            <ul className="mt-2">
              {channels.map(({ key, value, href, external }) => (
                <li key={key}>
                  <a
                    href={href}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group grid min-h-11 grid-cols-[8.5rem_minmax(0,1fr)] items-center rounded px-2 hover:bg-muted/60 sm:grid-cols-[10rem_minmax(0,1fr)]"
                  >
                    <span className="syn-fn">{key}</span>
                    <span className="text-portfolio-white underline decoration-dotted underline-offset-4 [overflow-wrap:anywhere] group-hover:text-portfolio-highlight group-hover:decoration-solid">
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Prompt command="./contact.sh --available-for" />
            <ul className="mt-2">
              {availability.map(({ key, text }) => (
                <li key={key} className="grid grid-cols-[8.5rem_minmax(0,1fr)] px-2 py-1 sm:grid-cols-[10rem_minmax(0,1fr)]">
                  <span>
                    <span className="syn-string">✓ </span>
                    <span className="syn-type">{key}</span>
                  </span>
                  <span className="text-portfolio-slate">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            <span className="syn-string">ahmed@portfolio</span>
            <span className="text-portfolio-slate">:</span>
            <span className="syn-keyword">~</span>
            <span className="text-portfolio-slate">$ </span>
            <span className="caret" aria-hidden="true" />
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
