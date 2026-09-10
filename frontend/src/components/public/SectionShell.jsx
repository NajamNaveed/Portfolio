import Reveal from "./Reveal.jsx";
import cn from "../../utils/cn.js";

/**
 * Consistent wrapper for every homepage section: scroll-anchor id,
 * max-width container, optional eyebrow/title/subtitle heading block.
 * Keeps spacing and heading hierarchy identical across sections instead
 * of each one re-implementing its own header markup.
 */
const SectionShell = ({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  containerClassName = "",
}) => {
  return (
    <section id={id} className={cn("scroll-mt-20 py-16 sm:py-24", className)} aria-labelledby={title ? `${id}-heading` : undefined}>
      <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {(eyebrow || title) && (
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">{eyebrow}</p>
            )}
            {title && (
              <h2 id={`${id}-heading`} className="mt-2 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-4 text-base text-slate-400">{subtitle}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
