import { WifiOff } from "lucide-react";
import usePublicPortfolioData from "../../hooks/usePublicPortfolioData.js";
import useDocumentHead from "../../hooks/useDocumentHead.js";
import PublicHeader from "../../components/public/PublicHeader.jsx";
import HeroSection from "../../components/public/HeroSection.jsx";
import AboutSection from "../../components/public/AboutSection.jsx";
import SkillsSection from "../../components/public/SkillsSection.jsx";
import ExperienceSection from "../../components/public/ExperienceSection.jsx";
import ServicesSection from "../../components/public/ServicesSection.jsx";
import ProjectsSection from "../../components/public/ProjectsSection.jsx";
import ContactSection from "../../components/public/ContactSection.jsx";
import BlogSection from "../../components/public/BlogSection.jsx";
import PublicFooter from "../../components/public/PublicFooter.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Button from "../../components/ui/Button.jsx";

const HomeSkeleton = () => (
  <div className="mx-auto w-full max-w-6xl space-y-6 px-4 pb-24 pt-28 sm:px-6 lg:px-8" aria-hidden="true">
    <Skeleton className="h-10 w-2/3 max-w-md" />
    <Skeleton className="h-5 w-1/2 max-w-sm" />
    <Skeleton className="mt-8 h-64 w-full rounded-2xl" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
    </div>
  </div>
);

const Home = () => {
  const { data, isLoading, isFullyDown, reload } = usePublicPortfolioData();

  useDocumentHead({
    title: data?.siteSettings?.defaultSeoTitle || data?.siteSettings?.siteTitle || data?.siteSettings?.siteName,
    description: data?.siteSettings?.defaultSeoDescription || data?.siteSettings?.siteDescription,
    favicon: data?.siteSettings?.favicon,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <HomeSkeleton />
      </div>
    );
  }

  // Every public CMS request failed (e.g. the backend is unreachable).
  // Never leave the visitor on a stuck/blank screen - show a clear,
  // non-technical message with a retry action instead.
  if (isFullyDown) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <EmptyState
          icon={WifiOff}
          title="This page is temporarily unavailable"
          description="Some content couldn't be loaded right now. Please try again in a moment."
          action={
            <Button onClick={reload} variant="outline">
              Try again
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PublicHeader header={data?.header} siteSettings={data?.siteSettings} />

      <main>
        <HeroSection hero={data?.hero} />
        <AboutSection about={data?.about} />
        <SkillsSection skills={data?.skills} />
        <ExperienceSection experience={data?.experience} />
        <ServicesSection services={data?.services} />
        <ProjectsSection projects={data?.projects} />
        <BlogSection posts={data?.blogs} />
        <ContactSection socialLinks={data?.socialLinks} siteSettings={data?.siteSettings} />
      </main>

      <PublicFooter footer={data?.footer} socialLinks={data?.socialLinks} siteSettings={data?.siteSettings} />
    </div>
  );
};

export default Home;
