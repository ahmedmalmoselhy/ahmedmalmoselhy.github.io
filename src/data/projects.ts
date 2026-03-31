export interface Project {
  id: number;
  title: string;
  description: string;
  extendedDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  demo: boolean;
  date?: string;
  status:
    | "completed"
    | "on-hold"
    | "in-progress"
    | "new"
    | "archived"
    | "planned"
    | "canceled";
  contributors?: string[];
  relatedProjects?: number[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Laravel Modular Dashboard",
    description:
      "Developed a configurable admin dashboard with Laravel Blade templates.",
    extendedDescription:
      "I developed a highly configurable admin dashboard using Laravel Blade templates, focusing on flexibility, performance, and ease of customization. The solution allows administrators to manage interface components, layouts, and dynamic data displays without modifying core code, making the dashboard scalable and adaptable to different business needs. By leveraging Blade's templating capabilities, reusable components, and clean structure, the system ensures maintainability while providing a streamlined and user-friendly experience for both developers and end-users.",
    technologies: ["Laravel", "MariaDB", "Laravel Blade", "PHP"],
    image: "/projects-images/laravel-modular-dashboard.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/laravel-dashboard",
    liveUrl: "",
    demo: true,
    status: "on-hold",
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "Laravel GetText Package",
    description:
      "Extended compatibility to PHP 8.1 and Laravel 9 for multilingual support.",
    extendedDescription:
      "I extended the system's compatibility to PHP 8.1 and Laravel 9 to ensure improved performance, stability, and long-term maintainability, while also enabling robust multilingual support. This upgrade allowed the application to leverage the latest framework enhancements, modern language features, and better localization tools, ultimately providing a more seamless and scalable environment for serving users across different regions and languages.",
    technologies: ["PHP", "Laravel"],
    image: "/projects-images/laravel-gettext-package.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/laravel-gettext",
    liveUrl: "",
    demo: true,
    status: "archived",
    date: "2023-08-10",
  },
  {
    id: 3,
    title: "CSED 2020 Yearbook",
    description:
      "Created a memorial website including backend and layout in Laravel Blade.",
    extendedDescription:
      "I created a memorial website that included both the backend functionality and the full layout implementation using Laravel Blade. The project focused on delivering a clean, respectful, and user-friendly experience, allowing visitors to view memories, stories, and tributes through an organized and visually appealing interface. By building the backend from scratch and designing the Blade templates for the front-end, I ensured a seamless integration between data management and presentation, resulting in a stable and meaningful platform for preserving and sharing memories.",
    technologies: ["PHP", "Laravel", "PostgreSQL", "Heroku"],
    image: "/projects-images/csed-2020-yearbook.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/csed_yearbook",
    liveUrl: "",
    demo: true,
    status: "completed",
    date: "2021-05-20",
  },
  {
    id: 4,
    title: "Curey Healthcare App",
    description:
      "Graduation project focused on backend API and database systems",
    extendedDescription:
      "My graduation project focused on designing and implementing robust backend APIs and database systems, emphasizing scalability, security, and efficient data management. I structured the API to support clean integration with various front-end clients, while the database architecture was optimized for performance and reliability. Through this project, I gained hands-on experience with system design principles, API lifecycle management, and data modeling, resulting in a solid and well-documented backend foundation.",
    technologies: [
      "PHP",
      "Laravel",
      "MySQL",
      "Postman",
      "Heroku",
      "PostgreSQL",
    ],
    image: "/projects-images/curey-healthcare-app.png",
    githubUrl:
      "https://github.com/Curey-HealthCare/Curey-HealthCareApp-Backend",
    liveUrl: "",
    demo: true,
    status: "completed",
    date: "2020-06-15",
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description:
      "My personal portfolio website built with React and Tailwind CSS.",
    extendedDescription:
      "I built my personal portfolio website using React and Tailwind CSS, focusing on delivering a clean, modern, and responsive user experience. The site showcases my projects, skills, and professional background through a visually appealing layout powered by reusable React components and Tailwind's utility-first styling. By optimizing performance and ensuring seamless navigation across devices, the portfolio serves as an effective platform for presenting my work and personal brand.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "/projects-images/personal-portfolio.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/ahmedmalmoselhy.github.io",
    liveUrl: "https://ahmedmalmoselhy.github.io",
    demo: false,
    status: "completed",
    date: "2024-01-10",
  },
  {
    id: 6,
    title: "UniOne",
    description:
      "University management system for handling academic operations.",
    extendedDescription:
      "This is a personal and very dear project to my heart, I've had it in my backlog for a log time, but now I'm officially starting my work on it, this project will have so much details and many many technoligical challanges, which I'm so happy and excited to tackle, and to make matters more exciting, I'll work on this project multiple times wilth more than one framework/technology. I might not be able to finalize every single one of these clones, but I'm excited to tackle and work with something new to me. This repository is just my personal documentations for the project, with links to all other repositories with that house the project with each technology separate, will update this repository with some stuff like database schema, phases of development of each clone, design and APIs documentation.",
    technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
    image: "/projects-images/unione.png",
    githubUrl: "https://github.com/ahmedmalmoselhy/UniOne",
    liveUrl: "",
    demo: true,
    status: "in-progress",
    date: "2024-05-01",
  },
];

export const statusStyles: Record<Project["status"], string> = {
  completed:
    "bg-portfolio-green/20 text-portfolio-green border-portfolio-green/30",
  "in-progress":
    "bg-portfolio-yellow/20 text-portfolio-yellow border-portfolio-yellow/30",
  "on-hold":
    "bg-portfolio-orange/20 text-portfolio-orange border-portfolio-orange/30",
  archived: "bg-portfolio-red/20 text-portfolio-red border-portfolio-red/30",
  new: "bg-portfolio-highlight/20 text-portfolio-highlight border-portfolio-highlight/30",
  planned: "bg-portfolio-blue/20 text-portfolio-blue border-portfolio-blue/30",
  canceled:
    "bg-portfolio-slate/20 text-portfolio-slate border-portfolio-slate/30",
};

export const statusLabels: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  "on-hold": "On Hold",
  archived: "Archived",
  new: "New",
  planned: "Planned",
  canceled: "Canceled",
};
