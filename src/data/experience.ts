export interface Role {
  title: string;
  period: string;
  responsibilities: string[];
}

export interface ExperienceItem {
  company: string;
  logo?: string;
  outsourced?: string;
  period: string;
  link?: string;
  workType: string;
  location: string;
  roles: (Role | Role[])[];
  technologies?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    company: "Jawwy by STC",
    outsourced: "Qeema",
    logo: "/logos/Jawwy.png",
    period: "July 2023 - Present",
    workType: "Outsourced Full-time Remote",
    location: "Riyadh, Saudi Arabia",
    roles: [
      [
        {
          title: "EOC/ECM Support Engineer",
          period: "January 2024 - Present",
          responsibilities: [
            "Troubleshooting and resolving complex issues related to Ericsson Order Care (EOC) and Ericsson Catalog Manager (ECM) systems.",
            "Providing technical guidance and support to end-users, ensuring smooth operations and customer satisfaction.",
            "Collaborating with cross-functional teams to identify and implement system enhancements and improvements.",
          ],
        },
        {
          title: "EOC/ECM Developer",
          period: "July 2023 - Present",
          responsibilities: [
            "Product Catalog Management: Oversaw catalog components using Ericsson Catalog Manager (ECM), ensuring accurate and efficient handling of product data.",
            "Technical Support: Delivered advanced support to maintain system reliability and swiftly resolve critical issues in the L3 layer of support.",
            "System Integration: Contributed to the development efforts, implementing logic to interface with external systems for streamlined operations and improved overall performance.",
          ],
        },
      ],
    ],
    technologies: [
      "Ericsson Order Care [EOC]",
      "Ericsson Catalog Manager [ECM]",
      "JavaScript",
      "SQL",
      "Oracle DB",
      "Git",
      "Docker",
    ],
  },
  {
    company: "Qeema",
    logo: "/logos/Qeema.png",
    period: "December 2022 - Present",
    link: "https://qeema.net/",
    workType: "Full-time Hybrid",
    location: "Cairo, Egypt",
    roles: [
      {
        title: "Software Engineer",
        period: "December 2022 - Present",
        responsibilities: [
          "Developed and implemented EOC solutions for the Jawwy DT project, customizing CRM solutions to meet telecom industry-specific requirements",
          "Provided Level 3 advanced application support ensuring optimal performance and rapid issue resolution",
          "Played a pivotal role in the successful release of the Jawwy DT project by maintaining EOC/ECM modules and supporting the client's operation team",
          "Led the EOC/ECM upgrade from version 20 to 22, resolving version conflicts while maintaining system integration and implementation flow",
        ],
      },
    ],
    technologies: [
      "Ericsson Order Care [EOC]",
      "Ericsson Catalog Manager [ECM]",
      "Creatio",
      "JavaScript",
      "SQL",
      "C#",
      "Oracle DB",
      "Microsoft SQL Server",
      "Git",
      "Docker",
    ],
  },
  {
    company: "Devolum",
    logo: "/logos/Devolum.png",
    period: "September 2022 - October 2022",
    link: "https://devolum.com/",
    workType: "Part-time Remote",
    location: "Mansoura, Egypt",
    roles: [
      {
        title: "Full-stack Developer",
        period: "September 2022 - October 2022",
        responsibilities: [
          "Enhanced web application performance through comprehensive front-end and back-end optimizations",
          "Improved codebase quality to align with industry standards and best practices",
          "Delivered projects with high quality",
        ],
      },
    ],
    technologies: ["PHP", "Laravel", "JavaScript", "MySQL", "Git"],
  },
  {
    company: "Serv5",
    logo: "/logos/Serv5.png",
    period: "October 2021 - November 2022",
    link: "https://serv5.com/",
    workType: "Full-time On-site",
    location: "Mansoura, Egypt",
    roles: [
      {
        title: "Full-stack Developer",
        period: "July 2022 - November 2022",
        responsibilities: [
          "Enhanced web application performance through comprehensive front-end and back-end optimizations",
          "Provided post-sales technical support to address client needs and ensure smooth deployment",
          "Streamlined development processes by introducing modern tools and frameworks for workflow automation",
          "Improved codebase quality to align with industry standards and best practices",
          "Integrated Vue.js components to enhance user experience and improve performance",
          "Delivered projects with high quality",
        ],
      },
      {
        title: "Backend Developer",
        period: "October 2021 - June 2022",
        responsibilities: [
          "Enhanced web application performance through comprehensive and back-end optimizations",
          "Integrated third-party APIs to support mobile application functionality and improve user experience",
          "Improved codebase quality to align with industry standards and best practices",
        ],
      },
    ],
    technologies: [
      "PHP",
      "Laravel",
      "JavaScript",
      "Vue.js",
      "MySQL",
      "RESTful APIs",
      "Git",
      "Node JS",
      "Express.js",
    ],
  },
];
