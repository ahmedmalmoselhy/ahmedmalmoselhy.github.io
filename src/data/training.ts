export interface TrainingItem {
  id: string;
  name: string;
  provider: string;
  year: string;
  description?: string;
  logo?: string;
}

export const training: TrainingItem[] = [
  {
    id: "training-1",
    name: "ITI Summer Internship for students [Front End]",
    provider: "ITI - Mansoura University",
    year: "2018",
    description:
      "A Front-End web development internship included : (HTML, CSS, JavaScript, jQuery, HTML5, CSS3, Angular JS)",
    logo: "/logos/logoITI.png",
  },
];
