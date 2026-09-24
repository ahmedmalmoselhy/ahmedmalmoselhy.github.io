import React from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const socials = [
  { href: "https://github.com/ahmedmalmoselhy", label: "GitHub", icon: Github, external: true },
  { href: "https://www.linkedin.com/in/ahmedmalmoselhy/", label: "LinkedIn", icon: Linkedin, external: true },
  { href: "mailto:ahmedmalmoselhy@gmail.com", label: "Email", icon: Mail },
  { href: "tel:+201117001262", label: "Phone", icon: Phone },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto mt-24 px-4 pb-8">
      <div className="panel flex flex-col items-center gap-6 px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-lg font-mono text-lg font-semibold text-portfolio-highlight transition-opacity hover:opacity-80"
          >
            {"<Ahmed AlMoselhy />"}
          </button>
          <p className="mt-1 text-sm text-portfolio-slate">
            © {currentYear} · Built with React, TypeScript & Tailwind CSS
          </p>
        </div>

        <div className="flex gap-2">
          {socials.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-portfolio-slate transition-all duration-300 hover:-translate-y-1 hover:border-portfolio-highlight/50 hover:text-portfolio-highlight"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
