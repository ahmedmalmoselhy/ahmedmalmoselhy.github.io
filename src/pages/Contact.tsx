import React from 'react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import PageHeader, { SectionHeading } from '@/components/PageHeader';
import CairoClock from '@/components/CairoClock';
import { ArrowUpRight, Copy, Download, Mail, MessageCircle, Phone, Github, Linkedin } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { magnet, resetTransform, tiltHandlers } from '@/lib/pointer';
import { site, githubUrl, linkedinUrl, whatsappUrl, openTo } from '@/data/site';

const EMAIL = site.email;
// Same link is baked into public/whatsapp-qr.svg — regenerate the SVG if the WhatsApp number changes:
// npx qrcode -t svg -e M -q 2 -d "#0f1a2eff" -l "#ffffffff" -o public/whatsapp-qr.svg "<url>"
const WHATSAPP_URL = whatsappUrl('Hi Ahmed, we just met!');

// `c` is the card's domain colour; `copy` adds a copy-to-clipboard button
const channels = [
  { label: 'email', value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail, c: 'var(--c-tel)', copy: EMAIL },
  { label: 'phone', value: site.phoneDisplay, href: `tel:${site.phone}`, icon: Phone, c: 'var(--c-crm)', copy: site.phone },
  { label: 'linkedin', value: `linkedin.com/in/${site.linkedin}`, href: linkedinUrl, icon: Linkedin, c: 'var(--c-web)', external: true },
  { label: 'github', value: `github.com/${site.github}`, href: githubUrl, icon: Github, c: 'var(--warn)', external: true },
];

const tints = [
  'border-primary/30 bg-primary/[0.07] text-primary',
  'border-domain-crm/30 bg-domain-crm/[0.07] text-domain-crm',
  'border-domain-web/30 bg-domain-web/[0.07] text-domain-web',
  'border-warn/30 bg-warn/[0.08] text-warn',
];

const copy = (text: string, label: string) =>
  navigator.clipboard?.writeText(text).then(() => toast.success(`${label} copied`));

const Contact = () => {
  return (
    <Layout className="pt-0 md:pt-16">
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="A question, a project idea or an opportunity: reach out on any channel below. Email is the fastest."
        actions={
          <>
            <a href={`mailto:${EMAIL}`} className="btn-band group" onPointerMove={magnet} onPointerLeave={resetTransform}>
              <Mail size={17} aria-hidden="true" /> Email me
            </a>
            <a href={site.resume} download className="btn-band-outline">
              <Download size={17} aria-hidden="true" /> Download CV
            </a>
          </>
        }
      />

      {/* Status line */}
      <div className="container mx-auto flex flex-wrap gap-x-6 gap-y-2 px-4 pt-8 text-sm text-muted-foreground">
        {site.availability.available && (
          <span className="flex items-center gap-2">
            <i className="live-dot" /> {site.availability.status}
          </span>
        )}
        <span>
          Cairo · <CairoClock /> local
        </span>
      </div>

      <section className="container mx-auto px-4 py-12 md:py-14">
        <SectionHeading title="Channels" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {channels.map(({ label, value, href, icon: Icon, c, copy: copyText, external }) => (
            <div
              key={label}
              {...tiltHandlers}
              className="card-dev reveal group flex-row items-center gap-4 p-5 md:p-6"
              style={{ '--c': c } as React.CSSProperties}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-[hsl(var(--c)/0.12)] text-[hsl(var(--c))] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Icon size={22} aria-hidden="true" />
              </span>
              <a
                href={href}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="min-w-0 flex-1 after:absolute after:inset-0 after:content-['']"
              >
                <span className="block font-mono text-xs text-[hsl(var(--c))]">{label}</span>
                <span className="mt-0.5 block font-medium [overflow-wrap:anywhere]">{value}</span>
              </a>
              {copyText ? (
                <button
                  onClick={() => copy(copyText, label === 'email' ? 'Email' : 'Phone number')}
                  className="relative z-20 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-[hsl(var(--c))] hover:text-[hsl(var(--c))]"
                  aria-label={`Copy ${label}`}
                >
                  <Copy size={15} aria-hidden="true" />
                </button>
              ) : (
                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--c))]"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp QR: handy in person; tap to enlarge */}
      <section className="container mx-auto px-4 pb-12 md:pb-14">
        <SectionHeading title="WhatsApp" />
        <div className="reveal grid items-center gap-6 rounded-lg border border-border bg-domain-crm/[0.05] p-6 sm:grid-cols-[auto_1fr] md:gap-10 md:p-8">
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="mx-auto block rotate-[-1.5deg] rounded-lg border border-border bg-white p-2 transition-transform hover:rotate-0 hover:scale-[1.03]"
                aria-label="Enlarge WhatsApp QR code"
              >
                <img src="/whatsapp-qr.svg" alt="QR code that opens a WhatsApp chat with Ahmed" width={200} height={200} className="h-44 w-44 md:h-48 md:w-48" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white p-6">
              <DialogTitle className="text-center text-lg font-semibold text-[hsl(var(--band))]">
                Scan to chat on WhatsApp
              </DialogTitle>
              <img src="/whatsapp-qr.svg" alt="QR code that opens a WhatsApp chat with Ahmed" className="mx-auto aspect-square w-full" />
              <p className="text-center text-sm text-[hsl(220_5%_39%)]">Point your phone camera at the code</p>
            </DialogContent>
          </Dialog>

          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-semibold">Scan to chat with me</h3>
            <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground">
              Point your phone camera at the code to open a WhatsApp chat with me. Tap the code to enlarge it.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-band mt-5">
              <MessageCircle size={17} aria-hidden="true" /> Open WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <SectionHeading title="Available for" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {openTo.map(({ title, text, icon: Icon }, i) => (
            <article
              key={title}
              className={cn(
                'reveal group rounded-lg border p-5 transition-transform duration-200 hover:-translate-y-1',
                i % 2 ? 'hover:rotate-1' : 'hover:-rotate-1',
                tints[i % tints.length],
              )}
            >
              <span className="flex items-center justify-between">
                <Icon size={22} aria-hidden="true" className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125" />
                <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <i className="live-dot" /> open
                </span>
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
