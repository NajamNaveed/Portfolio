import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SafeImage from "../ui/SafeImage.jsx";
import Button from "../ui/Button.jsx";

const HeroSection = ({ hero }) => {
  if (!hero) return null;

  const primary = hero.primaryButton?.isVisible && hero.primaryButton.label ? hero.primaryButton : null;
  const secondary = hero.secondaryButton?.isVisible && hero.secondaryButton.label ? hero.secondaryButton : null;

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-20 sm:pb-24 sm:pt-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,theme(colors.indigo.900/40),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          {hero.badge && (
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-indigo-800 bg-indigo-950/60 px-3 py-1 text-xs font-medium text-indigo-300">
                {hero.badge}
              </span>
            </Reveal>
          )}

          {hero.heading && (
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
                {hero.heading}
              </h1>
            </Reveal>
          )}

          {hero.subheading && (
            <Reveal delay={0.1}>
              <p className="mt-3 text-xl font-medium text-indigo-300">{hero.subheading}</p>
            </Reveal>
          )}

          {hero.description && (
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">{hero.description}</p>
            </Reveal>
          )}

          {(primary || secondary) && (
            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-3">
              {primary && (
                <Button as="a" href={primary.href} size="lg">
                  {primary.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
              {secondary && (
                <Button as="a" href={secondary.href} variant="outline" size="lg">
                  {secondary.label}
                </Button>
              )}
            </Reveal>
          )}
        </div>

        {hero.image && (
          <Reveal delay={0.1} className="mx-auto w-full max-w-sm lg:max-w-none">
            <SafeImage
              src={hero.image}
              alt={hero.heading || "Profile"}
              className="aspect-square w-full rounded-3xl border border-slate-800 object-cover shadow-2xl shadow-indigo-950/40"
              loading="eager"
              fetchPriority="high"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
