import React from 'react';
import Layout, { GroupedSection, PageHeader } from '@/components/Layout';
import { ArrowUpRight } from 'lucide-react';
import { contactLinks } from '@/data/personal';

const availability = [
  { title: 'Freelance Work', description: 'Short to medium-term projects' },
  { title: 'Full-Time Positions', description: 'Open to discussing new opportunities' },
  { title: 'Consulting', description: 'Technical consulting for your projects' },
  { title: 'Collaboration', description: 'Partnering on new products' },
];

const Contact = () => {
  return (
    <Layout>
      <PageHeader
        title="Contact"
        description="Have a question, a project idea, or just want to say hi? Reach me on any of these."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <GroupedSection title="Reach Me">
          <ul className="inset-group">
            {contactLinks.map(({ label, value, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="inset-row min-h-[64px]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon aria-hidden size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-subhead text-muted-foreground">{label}</span>
                    <span className="block break-all text-body">{value}</span>
                  </span>
                  {external && <ArrowUpRight aria-hidden size={18} className="shrink-0 text-muted-foreground" />}
                </a>
              </li>
            ))}
          </ul>
        </GroupedSection>

        <GroupedSection title="Available For">
          <ul className="inset-group">
            {availability.map(({ title, description }) => (
              <li key={title} className="inset-row block">
                <span className="block text-headline">{title}</span>
                <span className="block text-subhead text-muted-foreground">{description}</span>
              </li>
            ))}
          </ul>
        </GroupedSection>
      </div>
    </Layout>
  );
};

export default Contact;
