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
        id: "creatio-advanced",
        name: "Creatio Software Developer [Advanced]",
        issuer: "Creatio Academy",
        year: "2025",
        logo: "/logos/creatio.png",
        // image: "/certificates/creatio-advanced.png",
    },
    {
        id: "creatio-basic",
        name: "Creatio No-Code Creator [Basic]",
        issuer: "Creatio Academy",
        year: "2025",
        logo: "/logos/creatio.png",
        // image: "/certificates/creatio-basic.png",
    },
    {
        id: "coursera-db-python",
        name: "Using Databases with Python",
        issuer: "Coursera",
        year: "2018",
        logo: "/logos/coursera.png",
        // image: "/certificates/coursera-db-python.png",
    },
    {
        id: "coursera-web-data",
        name: "Using Python to Access Web Data",
        issuer: "Coursera",
        year: "2016",
        logo: "/logos/coursera.png",
        // image: "/certificates/coursera-web-data.png",
    },
    {
        id: "coursera-python-ds",
        name: "Python Data Structures",
        issuer: "Coursera",
        year: "2016",
        logo: "/logos/coursera.png",
        // image: "/certificates/coursera-python-ds.png",
    },
    {
        id: "coursera-python-start",
        name: "Programming for Everybody (Getting Started with Python)",
        issuer: "Coursera",
        year: "2016",
        logo: "/logos/coursera.png",
        // image: "/certificates/coursera-python-start.png",
    },
];
