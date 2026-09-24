import React from 'react';
import Layout from '@/components/Layout';
import PageHeader, { SectionHeading } from '@/components/PageHeader';
import { ArrowUpRight, Download, Mail, MessageCircle, Phone, Github, Linkedin, Briefcase, Building2, Lightbulb, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const EMAIL = 'ahmedmalmoselhy@gmail.com';
// Same link is baked into public/whatsapp-qr.svg — regenerate the SVG if this changes:
// npx qrcode -t svg -e M -q 2 -d "#0f1a2eff" -l "#ffffffff" -o public/whatsapp-qr.svg "<url>"
const WHATSAPP_URL = 'https://wa.me/201117001262?text=Hi%20Ahmed%2C%20we%20just%20met!';

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
    <Layout className="pt-0 md:pt-16">
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

      {/* WhatsApp QR: shown in person, so it comes first and enlarges on tap */}
      <section className="container mx-auto px-4 pt-16 md:pt-20">
        <div className="panel grid items-center gap-6 p-6 sm:grid-cols-[auto_1fr] md:gap-10 md:p-8">
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="mx-auto block rounded-lg border border-border bg-white p-2 transition-transform hover:scale-[1.02]"
                aria-label="Enlarge WhatsApp QR code"
              >
                <img src="/whatsapp-qr.svg" alt="QR code that opens a WhatsApp chat with Ahmed" width={200} height={200} className="h-48 w-48 md:h-52 md:w-52" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white p-6">
              <DialogTitle className="text-center text-lg font-semibold text-[hsl(var(--band))]">
                Scan to chat on WhatsApp
              </DialogTitle>
              <img src="/whatsapp-qr.svg" alt="QR code that opens a WhatsApp chat with Ahmed" className="mx-auto aspect-square w-full" />
              <p className="text-center text-sm text-[hsl(218_15%_38%)]">Point your phone camera at the code</p>
            </DialogContent>
          </Dialog>

          <div className="text-center sm:text-left">
            <span className="eyebrow">
              <MessageCircle size={14} aria-hidden="true" /> WhatsApp
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-portfolio-white md:text-3xl">Scan to chat with me</h2>
            <p className="mt-2 max-w-lg leading-relaxed text-portfolio-slate">
              Point your phone camera at the code to open a WhatsApp chat with me instantly. Tap the code to enlarge it.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">
              <MessageCircle size={17} aria-hidden="true" /> Open WhatsApp
            </a>
          </div>
        </div>
      </section>

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
