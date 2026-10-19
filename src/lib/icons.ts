import {
  Brain, Briefcase, Building2, ChartColumn, Clock, Code, Handshake, Heart, Lightbulb,
  MessageSquare, Palette, Rocket, Star, Users, type LucideIcon,
} from "lucide-react";

/**
 * Icons that content in src/content/*.json can refer to by name.
 * Keep in sync with the `icon` select options in public/admin/config.yml.
 */
const icons: Record<string, LucideIcon> = {
  Brain, Briefcase, Building2, ChartColumn, Clock, Code, Handshake, Heart, Lightbulb,
  MessageSquare, Palette, Rocket, Star, Users,
};

export const iconFor = (name: string): LucideIcon => icons[name] ?? Star;
