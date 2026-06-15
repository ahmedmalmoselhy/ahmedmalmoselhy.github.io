export interface CertificationItem {
    id: string;
    name: string;
    issuer: string;
    year: string;
    logo?: string;
    image?: string;
}

export const certifications: CertificationItem[] = [
    {
        id: "creatio-ai",
        name: "Creatio.AI",
        issuer: "Creatio Academy",
        year: "2026",
        logo: "/logos/creatio.png",
        image: "/certificates/creatio-ai.png",
    },
    {
        id: "creatio-advanced",
        name: "Creatio Software Developer [Advanced]",
        issuer: "Creatio Academy",
        year: "2025",
        logo: "/logos/creatio.png",
        image: "/certificates/creatio-software-developer.jpeg",
    },
    {
        id: "creatio-basic",
        name: "Creatio No-Code Creator [Basic]",
        issuer: "Creatio Academy",
        year: "2025",
        logo: "/logos/creatio.png",
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
