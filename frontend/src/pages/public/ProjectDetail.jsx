import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";import { ArrowLeft, ExternalLink, FolderX, Github, Star, TriangleAlert } from "lucide-react";
import useProjectDetail from "../../hooks/useProjectDetail.js";
import useDocumentHead from "../../hooks/useDocumentHead.js";
import { fetchPublicProjects, fetchPublicSiteSettings } from "../../services/cms/publicContentService.js";
import PublicHeader from "../../components/public/PublicHeader.jsx";
import PublicFooter from "../../components/public/PublicFooter.jsx";
import ProjectGallery from "../../components/public/ProjectGallery.jsx";
import Reveal from "../../components/public/Reveal.jsx";
import { ProjectCard } from "../../components/public/ProjectsSection.jsx";
import SafeImage from "../../components/ui/SafeImage.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Button from "../../components/ui/Button.jsx";

const DetailSkeleton = () => (
  <div className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-24 pt-12 sm:px-6 lg:px-8" aria-hidden="true">
    <Skeleton className="h-5 w-32" />
    <Skeleton className="h-10 w-2/3" />
    <Skeleton className="h-5 w-1/3" />
    <Skeleton className="aspect-video w-full rounded-2xl" />
    <Skeleton className="h-24 w-full rounded-xl" />
  </div>
);

const ProjectDetail = () => {
  const { slug } = useParams();
  const { project, isLoading, isNotFound, hasError, reload } = useProjectDetail(slug);

  // Independent of the project fetch: needed for the global header/footer
  // and the page <title>/favicon (Phase 6 head logic), not re-implemented
  // here - see useDocumentHead below.
  const [siteSettings, setSiteSettings] = useState(null);
  useEffect(() => {
    let isMounted = true;
    fetchPublicSiteSettings()
      .then((data) => {
        if (isMounted) setSiteSettings(data);
      })
      .catch(() => {
        // Non-critical for this page - header/title just fall back to defaults.
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Related projects: one lightweight extra request, only once the
  // current project is known (so we can exclude it and avoid fetching
  // on every render/slug change unnecessarily).
  const [relatedProjects, setRelatedProjects] = useState([]);
  useEffect(() => {
    if (!project) return undefined;
    let isMounted = true;
    fetchPublicProjects()
      .then((items) => {
        if (!isMounted) return;
        setRelatedProjects((items || []).filter((item) => item.slug !== project.slug).slice(0, 3));
      })
      .catch(() => {
        // Related projects are a nice-to-have - fail silently and just hide the section.
      });
    return () => {
      isMounted = false;
    };
  }, [project]);

  const galleryImages = useMemo(() => {
    if (!project) return [];
    const all = [project.coverImage, ...(project.images || [])].filter(Boolean);
    return Array.from(new Set(all));
  }, [project]);

  useDocumentHead({
    title: project
      ? `${project.title}${siteSettings?.siteName ? ` | ${siteSettings.siteName}` : ""}`
      : siteSettings?.siteName,
    description: project?.shortDescription || siteSettings?.defaultSeoDescription,
    favicon: siteSettings?.favicon,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PublicHeader header={null} siteSettings={siteSettings} />

      <main>
        {isLoading && <DetailSkeleton />}

        {!isLoading && (isNotFound || hasError) && (
          <div className="flex min-h-[60vh] items-center justify-center px-4 py-24">
            <EmptyState
              icon={isNotFound ? FolderX : TriangleAlert}
              title={isNotFound ? "Project not found" : "Something went wrong"}
              description={
                isNotFound
                  ? "This project doesn't exist or is no longer available."
                  : "This project couldn't be loaded right now. Please try again."
              }
              action={
                isNotFound ? (
                  <Button as={Link} to="/#projects">
                    Back to Projects
                  </Button>
                ) : (
                  <Button onClick={reload} variant="outline">
                    Try again
                  </Button>
                )
              }
            />
          </div>
        )}

        {!isLoading && !isNotFound && !hasError && project && (
          <article className="mx-auto w-full max-w-4xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
            <Reveal>
              <Link
                to="/#projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Projects
              </Link>
            </Reveal>

            <Reveal delay={0.05} className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">{project.title}</h1>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white">
                    <Star className="h-3 w-3" aria-hidden="true" />
                    Featured
                  </span>
                )}
              </div>
              {project.shortDescription && (
                <p className="mt-3 max-w-2xl text-lg text-slate-400">{project.shortDescription}</p>
              )}
            </Reveal>

            {project.technologies?.length > 0 && (
              <Reveal delay={0.1} className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </Reveal>
            )}

            {(project.githubUrl || project.liveUrl) && (
              <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    View Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button as="a" href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="outline">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View Source
                  </Button>
                )}
              </Reveal>
            )}

            {project.coverImage && (
              <Reveal delay={0.2} className="mt-8">
                <SafeImage
                  src={project.coverImage}
                  alt={project.title}
                  className="aspect-video w-full rounded-2xl border border-slate-800 object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </Reveal>
            )}

            {project.description && (
              <Reveal delay={0.25} className="mt-10">
                <h2 className="text-lg font-semibold text-slate-100">About this project</h2>
                <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-slate-400">
                  {project.description}
                </p>
              </Reveal>
            )}

            {galleryImages.length > 0 && (
              <Reveal delay={0.3} className="mt-10">
                <h2 className="mb-4 text-lg font-semibold text-slate-100">Gallery</h2>
                <ProjectGallery images={galleryImages} title={project.title} />
              </Reveal>
            )}

            {relatedProjects.length > 0 && (
              <Reveal delay={0.35} className="mt-16 border-t border-slate-800 pt-10">
                <h2 className="mb-6 text-lg font-semibold text-slate-100">More Projects</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map((item) => (
                    <ProjectCard key={item._id || item.slug} project={item} />
                  ))}
                </div>
              </Reveal>
            )}
          </article>
        )}
      </main>

      <PublicFooter footer={null} socialLinks={[]} siteSettings={siteSettings} />
    </div>
  );
};

export default ProjectDetail;
