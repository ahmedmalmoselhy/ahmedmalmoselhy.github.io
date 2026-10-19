import content from "@/content/certifications.json";

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

export const certifications = content.certifications as CertificationItem[];
