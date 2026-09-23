import React from "react";

// Logos for common technologies. Decorative (alt=""): each one is shown next to its name.
const logo = (file: string) => (
  <img src={`/tech/${file}`} alt="" className="w-full h-full object-contain" />
);

export const techIcons: Record<string, React.ReactNode> = {
  JavaScript: logo("javascript.svg"),
  PHP: logo("php.svg"),
  Java: logo("java.svg"),
  Python: logo("python.svg"),
  "HTML/CSS": (
    <div className="flex w-full h-full items-center justify-center gap-0.5">
      <img src="/tech/html.svg" alt="" className="w-1/2 h-full object-contain" />
      <img src="/tech/css.svg" alt="" className="w-1/2 h-full object-contain" />
    </div>
  ),
  "C#": logo("csharp.svg"),
  Laravel: logo("laravel.svg"),
  "Vue.js": logo("vue.svg"),
  "Node.js": logo("nodejs.svg"),
  "Express.js": logo("express.svg"),
  "React.js": logo("react.svg"),
  PostgreSQL: logo("postgresql.svg"),
  MySQL: logo("mysql.svg"),
  OracleDB: logo("oracle.svg"),
  MariaDB: logo("mariadb.svg"),
  Git: logo("git.svg"),
  GitHub: logo("github.svg"),
  VSCode: logo("vscode.svg"),
  Docker: logo("docker.svg"),
  "Ericsson Order Care [EOC]": logo("ericsson.png"),
  "Ericsson Catalog Manager [ECM]": logo("ericsson.png"),
  Creatio: logo("creatio.png"),
  Jira: logo("jira.svg"),
  Confluence: logo("confluence.svg"),
};

// Fallback for skills without a logo
export const FallbackIcon = ({ name }: { name: string }) => (
  <div aria-hidden className="w-full h-full flex items-center justify-center rounded-md bg-secondary">
    <span className="text-[0.625rem] font-bold text-muted-foreground">
      {name.substring(0, 2).toUpperCase()}
    </span>
  </div>
);
