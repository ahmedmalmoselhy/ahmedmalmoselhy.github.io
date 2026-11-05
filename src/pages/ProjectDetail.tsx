import React from "react";
import Layout from "@/components/Layout";
import { ExternalLink, Github, ArrowLeft, ArrowRight, Mail } from "lucide-react";
import ContactForDemo from "@/components/ContactForDemo";
import { Button } from "@/components/ui/button";
import { projectsData, statusLabels, type ProjectMedia } from "@/data/projects";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SectionHeading } from "@/components/PageHeader";
import { cn } from "@/lib/utils";

/** Video ID from any common YouTube link: watch?v=, youtu.be/, shorts/, embed/, live/ */
const youtubeId = (url: string) =>
  url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/)?.[1];

const MediaItem: React.FC<{ item: ProjectMedia; title: string }> = ({ item, title }) => {
  const alt = item.caption || `${title} screenshot`;
  let body: React.ReactNode;
  if (item.type === "image") {
    body = (
      <Dialog>
        <DialogTrigger asChild>
          <button className="block w-full cursor-zoom-in" aria-label={`Enlarge: ${alt}`}>
            <img src={item.src} alt={alt} loading="lazy" className="aspect-video w-full object-cover object-top" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl p-2">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <img src={item.src} alt={alt} className="max-h-[85vh] w-full rounded object-contain" />
        </DialogContent>
      </Dialog>
    );
  } else if (item.type === "video") {
    body = <video src={item.src} controls preload="metadata" className="aspect-video w-full bg-black" />;
  } else {
    const id = youtubeId(item.url);
    body = id ? (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={item.caption || `${title} video`}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="aspect-video w-full"
      />
    ) : (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block p-6 text-primary underline">
        {item.caption || item.url}
      </a>
    );
  }
  return (
    <figure className={cn("overflow-hidden rounded-lg border border-border bg-card", item.type !== "image" && "sm:col-span-2")}>
      {body}
      {item.caption && <figcaption className="px-4 py-3 font-mono text-[13px] text-muted-foreground">{item.caption}</figcaption>}
    </figure>
  );
};

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
  /** Opens a company's page (for projects done at a company) */
  onCompany: (company: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, onCompany }) => {
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <Layout>
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={onBack}
              variant="ghost"
              className="mb-8 text-portfolio-highlight hover:text-portfolio-highlight/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold">
              Project not found
            </h1>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8 md:py-16 relative">
        

        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="group mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            cd ../projects
          </button>

          <div className="animate-slide-up space-y-12">
            {/* Header */}
            <div className="border-b border-border pb-8">
              <span className="eyebrow">// project</span>
              <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
                {project.title}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] text-muted-foreground">
                <span className="flex items-center gap-2">
                  <i className={cn("live-dot", project.status !== "in-progress" && "bg-faint after:hidden")} />
                  {statusLabels[project.status].toLowerCase()}
                </span>

                {project.company && (
                  <button onClick={() => onCompany(project.company!)} className="text-primary hover:underline">
                    at {project.company}
                  </button>
                )}
                {project.company && <span>{project.client ? `for ${project.client}` : "internal project"}</span>}
                {project.role && <span>{project.role}</span>}
                {project.period && <span>{project.period}</span>}
                {project.location && <span>{project.location}</span>}
                {project.date && <span>updated {project.date}</span>}
                <span>{project.technologies.length} technologies</span>
              </div>
            </div>

            {/* Project Image */}
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_24px_48px_-28px_hsl(var(--primary)/0.45)]">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Description (skipped when it only repeats the summary above) */}
            {project.extendedDescription !== project.description && (
              <div className="space-y-4">
                <SectionHeading title="About this project" />
                <p className="whitespace-pre-line text-portfolio-lightSlate text-lg leading-relaxed">
                  {project.extendedDescription}
                </p>
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-4">
                <SectionHeading title="What I did" />
                <ul className="list-[square] space-y-2 pl-5 text-lg leading-relaxed text-portfolio-lightSlate marker:text-primary/60">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery: extra screenshots and videos */}
            {project.media?.length > 0 && (
              <div className="space-y-4">
                <SectionHeading title="Gallery" />
                <div className="grid items-start gap-4 sm:grid-cols-2">
                  {project.media.map((item, i) => (
                    <MediaItem key={i} item={item} title={project.title} />
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-4">
              <SectionHeading title="Built with" />
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="chip px-2.5 py-1 text-[13px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 border-t border-border pt-8">
              {project.company ? (
                <button onClick={() => onCompany(project.company!)} className="btn-band-outline">
                  <span>More from my time at {project.company}</span>
                  <ArrowRight size={18} />
                </button>
              ) : project.monetized ? (
                <ContactForDemo
                  title={project.title}
                  className="btn-band"
                >
                  <Mail size={18} />
                  <span>Request a Demo / Buy an Installation</span>
                </ContactForDemo>
              ) : (
                project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-band-outline"
                  >
                    <Github size={18} />
                    <span>View Source Code</span>
                  </a>
                )
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-band"
                >
                  <ExternalLink size={18} />
                  <span>View Live {project.demo ? "Demo" : "Site"}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
