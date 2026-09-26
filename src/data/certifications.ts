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

export const certifications: CertificationItem[] = [
    {
        id: "creatio-ai",
        name: "Creatio.AI",
        issuer: "Creatio",
        year: "2026",
        logo: "/logos/creatio.png",
        employer: "Qeema",
        image: "/certificates/creatio-ai.png",
    },
    {
        id: "creatio-solution-consultant",
        name: "Creatio Solution Consultant",
        issuer: "Creatio",
        year: "2026",
        logo: "/logos/creatio.png",
        employer: "Qeema",
        image: "/certificates/creatio-solution-consultant.png",
    },
    {
        id: "creatio-advanced",
        name: "Creatio Software Developer [Advanced]",
        issuer: "Creatio",
        year: "2025",
        logo: "/logos/creatio.png",
        employer: "Qeema",
        image: "/certificates/creatio-software-developer.jpeg",
    },
    {
        id: "creatio-basic",
        name: "Creatio No-Code Creator [Basic]",
        issuer: "Creatio",
        year: "2025",
        logo: "/logos/creatio.png",
        employer: "Qeema",
        image: "/certificates/creatio-no-code-creator.png",
    },
    {
        id: "coursera-db-python",
        name: "Using Databases with Python",
        issuer: "Coursera",
        year: "2018",
        logo: "/logos/coursera.png",
        image: "/certificates/coursera-db-python.jpeg",
    },
    {
        id: "coursera-web-data",
        name: "Using Python to Access Web Data",
        issuer: "Coursera",
        year: "2016",
        logo: "/logos/coursera.png",
        image: "/certificates/coursera-web-data.jpeg",
    },
    {
        id: "coursera-python-ds",
        name: "Python Data Structures",
        issuer: "Coursera",
        year: "2016",
        logo: "/logos/coursera.png",
        image: "/certificates/coursera-python-ds.jpeg",
    },
    {
        id: "coursera-python-start",
        name: "Programming for Everybody (Getting Started with Python)",
        issuer: "Coursera",
        year: "2016",
        logo: "/logos/coursera.png",
        image: "/certificates/coursera-python-start.jpeg",
    },
];
