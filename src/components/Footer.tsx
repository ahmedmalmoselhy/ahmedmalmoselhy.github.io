import React from "react";
import { contactLinks } from "@/data/personal";

const Footer = () => (
  <footer className="container mt-24 border-t py-8">
    <div className="flex flex-col-reverse items-center justify-between gap-4 text-footnote text-muted-foreground md:flex-row">
      <p>© {new Date().getFullYear()} Ahmed AlMoselhy</p>
      <ul className="flex">
        {contactLinks.map(({ href, label, icon: Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Icon aria-hidden size={20} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
