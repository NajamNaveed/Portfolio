import { ExternalLink, Github, Star } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionShell from "./SectionShell.jsx";
import SafeImage from "../ui/SafeImage.jsx";
import cn from "../../utils/cn.js";

const ProjectCard = ({ project }) => (
  <div
    className={cn(
      "flex h-full flex-col overflow-hidden rounded-2xl border bg-slate-900/40 transition hover:border-indigo-700/60",
      project.featured ? "border-indigo-800/70 ring-1 ring-indigo-900/50" : "border-slate-800"
    )}
  >
    <div className="relative aspect-video w-full">
      <SafeImage src={project.coverImage} alt={project.title} className="h-full w-full object-cover" />
      {project.featured && (
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white">
          <Star className="h-3 w-3" aria-hidden="true" />
          Featured
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col p-5">
      <h3 className="text-base font-semibold text-slate-100">{project.title}</h3>
      {project.shortDescription && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.shortDescription}</p>
      )}

      {project.technologies?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-800 bg-slate-950/60 px-2.5 py-0.5 text-xs text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {(project.githubUrl || project.liveUrl) && (
        <div className="mt-5 flex items-center gap-4 border-t border-slate-800 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live demo
            </a>
          )}
        </div>
      )}
    </div>
  </div>
);

const ProjectsSection = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  const sorted = projects.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <SectionShell id="projects" eyebrow="Selected work" title="Projects">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((project, index) => (
          <Reveal key={project._id || project.slug} delay={index * 0.05} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
};

export default ProjectsSection;
