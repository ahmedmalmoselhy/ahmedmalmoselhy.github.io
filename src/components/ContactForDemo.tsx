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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={className}>
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[14rem] rounded-xl p-1.5">
        <DropdownMenuItem asChild className="min-h-[44px] cursor-pointer gap-3 rounded-lg px-3 text-callout">
          <a href={mailto}>
            <Mail aria-hidden size={18} /> Send Email
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="min-h-[44px] cursor-pointer gap-3 rounded-lg px-3 text-callout">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden size={18} /> Message on WhatsApp
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContactForDemo;
