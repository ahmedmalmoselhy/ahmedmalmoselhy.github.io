import { ordered } from "@/lib/content";

export interface CertificationItem {
    id: string;
    name: string;
    issuer: string;
    year: string;
    logo?: string;
    image?: string;
    /** Company the certificate was earned while working at (matches ExperienceItem.company). */
    employer?: string;
}

export const certifications = ordered<CertificationItem>(
  import.meta.glob("/src/content/certifications/*.json", { eager: true, import: "default" }),
);
