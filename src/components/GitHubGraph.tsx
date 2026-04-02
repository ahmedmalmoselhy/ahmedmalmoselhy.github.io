import React from "react";

const GITHUB_USERNAME = "ahmedmalmoselhy";

const GitHubGraph: React.FC = () => {
  return (
    <div className="w-full bg-portfolio-lightNavy/30 backdrop-blur-sm border border-portfolio-slate/10 rounded-xl p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={`https://github.com/${GITHUB_USERNAME}.png`}
          alt={`${GITHUB_USERNAME}'s avatar`}
          className="w-10 h-10 rounded-full border border-portfolio-slate/20"
        />
        <div>
          <h3 className="text-portfolio-white font-semibold text-lg">GitHub Activity</h3>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-highlight text-sm font-mono hover:underline"
          >
            @{GITHUB_USERNAME}
          </a>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <img
          src={`https://ghchart.rshah.org/64ffda/${GITHUB_USERNAME}`}
          alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
          className="w-full min-w-[680px] h-auto rounded-md"
        />
      </div>
    </div>
  );
};

export default GitHubGraph;
