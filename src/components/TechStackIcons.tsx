import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Skill {
  name: string;
  level: number;
}

interface TechStackIconsProps {
  skills: Skill[];
  categoryColor: string;
}

// SVG icons for common technologies
export const techIcons: Record<string, React.ReactNode> = {
  JavaScript: <img src="/tech/javascript.svg" alt="JavaScript" className="w-full h-full object-contain" />,
  PHP: <img src="/tech/php.svg" alt="PHP" className="w-full h-full object-contain" />,
  Java: <img src="/tech/java.svg" alt="Java" className="w-full h-full object-contain" />,
  Python: <img src="/tech/python.svg" alt="Python" className="w-full h-full object-contain" />,
  "HTML/CSS": (
    <div className="flex w-full h-full items-center justify-center gap-1">
      <img src="/tech/html.svg" alt="HTML" className="w-1/2 h-full object-contain" />
      <img src="/tech/css.svg" alt="CSS" className="w-1/2 h-full object-contain" />
    </div>
  ),
  "C#": <img src="/tech/csharp.svg" alt="C#" className="w-full h-full object-contain" />,
  Laravel: <img src="/tech/laravel.svg" alt="Laravel" className="w-full h-full object-contain" />,
  "Vue.js": <img src="/tech/vue.svg" alt="Vue.js" className="w-full h-full object-contain" />,
  "Node.js": <img src="/tech/nodejs.svg" alt="Node.js" className="w-full h-full object-contain" />,
  "Express.js": <img src="/tech/express.svg" alt="Express.js" className="w-full h-full object-contain" />,
  "React.js": <img src="/tech/react.svg" alt="React.js" className="w-full h-full object-contain" />,
  PostgreSQL: <img src="/tech/postgresql.svg" alt="PostgreSQL" className="w-full h-full object-contain" />,
  MySQL: <img src="/tech/mysql.svg" alt="MySQL" className="w-full h-full object-contain" />,
  OracleDB: <img src="/tech/oracle.svg" alt="OracleDB" className="w-full h-full object-contain" />,
  MariaDB: <img src="/tech/mariadb.svg" alt="MariaDB" className="w-full h-full object-contain" />,
  Git: <img src="/tech/git.svg" alt="Git" className="w-full h-full object-contain" />,
  GitHub: <img src="/tech/github.svg" alt="GitHub" className="w-full h-full object-contain" />,
  VSCode: <img src="/tech/vscode.svg" alt="VSCode" className="w-full h-full object-contain" />,
  Docker: <img src="/tech/docker.svg" alt="Docker" className="w-full h-full object-contain" />,
  "Ericsson Order Care [EOC]": <img src="/tech/ericsson.png" alt="Ericsson" className="w-full h-full object-contain" />,
  "Ericsson Catalog Manager [ECM]": <img src="/tech/ericsson.png" alt="Ericsson" className="w-full h-full object-contain" />,
  Creatio: <img src="/tech/creatio.png" alt="Creatio" className="w-full h-full object-contain" />,
  Jira: <img src="/tech/jira.svg" alt="Jira" className="w-full h-full object-contain" />,
  Confluence: <img src="/tech/confluence.svg" alt="Confluence" className="w-full h-full object-contain" />,
};

// Fallback icon for skills without custom icons
export const FallbackIcon = ({ name }: { name: string }) => (
  <div className="w-full h-full flex items-center justify-center bg-portfolio-lightNavy/50 rounded-lg">
    <span className="text-xs font-bold text-portfolio-lightSlate">
      {name.substring(0, 2).toUpperCase()}
    </span>
  </div>
);

const colorMap: Record<string, string> = {
  "portfolio-highlight": "#569CD6",
  "portfolio-blue": "#569CD6",
  "portfolio-teal": "#4EC9B0",
  "portfolio-slate": "#858585",
  "portfolio-lightSlate": "#9D9D9D",
};

const TechStackIcons: React.FC<TechStackIconsProps> = ({
  skills,
  categoryColor,
}) => {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4 justify-center">
        {skills.map((skill, idx) => {
          const icon = techIcons[skill.name];
          return (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <div
                  className="group relative w-14 h-14 md:w-16 md:h-16 rounded-xl bg-portfolio-lightNavy/30 border border-portfolio-slate/10 hover:border-portfolio-highlight/30 p-2.5 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-portfolio-highlight/10 flex items-center justify-center"
                  style={{
                    ["--hover-color" as any]: colorMap[categoryColor],
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center p-1">
                    {icon ? icon : <FallbackIcon name={skill.name} />}
                  </div>
                  {/* Skill level indicator */}
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                      width: `${skill.level}%`,
                      maxWidth: "80%",
                      backgroundColor: colorMap[categoryColor],
                    }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-portfolio-lightNavy border-portfolio-slate/30 z-50"
              >
                <div className="text-center">
                  <p className="text-portfolio-white font-semibold">
                    {skill.name}
                  </p>
                  <p
                    className="text-sm font-mono"
                    style={{ color: colorMap[categoryColor] }}
                  >
                    {skill.level}% proficiency
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default TechStackIcons;
