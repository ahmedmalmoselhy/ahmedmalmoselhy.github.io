export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  logo?: string;
}

export const education: EducationItem[] = [
  {
    id: "education-1",
    degree: "Bachelor's Degree in Computers & Systems Engineering",
    institution: "Mansoura University",
    period: "2014 - 2020",
    description:
      "Algorithms, Data Structures, Programming Languages, Agile Methodology, Waterfall Methodology, Software Development, Work Ethics, Classic Control Systems, PLC, Embedded Systems, Databases.",
    logo: "/logos/MansouraUniLogo.png",
  },
];