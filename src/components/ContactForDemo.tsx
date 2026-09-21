import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const EMAIL = "ahmedmalmoselhy@gmail.com";
const WHATSAPP = "201117001262"; // wa.me wants digits only, country code included

interface ContactForDemoProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

/** Trigger button for monetized projects: opens an email / WhatsApp choice with a prefilled message. */
const ContactForDemo: React.FC<ContactForDemoProps> = ({
  title,
  className,
  children,
}) => {
  const text = `Hi Ahmed, I'm interested in ${title}. I'd like to request a demo or ask about buying an installation.`;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`${title} - demo / installation`)}&body=${encodeURIComponent(text)}`;
  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

  return (
    // The menu is portaled, but React events still bubble to the parent card; keep them here.
    <span
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className={className}>
            {children}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="bg-portfolio-lightNavy border-portfolio-slate/20 text-portfolio-lightSlate"
        >
          <DropdownMenuItem asChild className="cursor-pointer gap-2">
            <a href={mailto}>
              <Mail size={16} /> Send an email
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer gap-2">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> Message on WhatsApp
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  );
};

export default ContactForDemo;
