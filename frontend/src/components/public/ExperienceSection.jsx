import Reveal from "./Reveal.jsx";
import SectionShell from "./SectionShell.jsx";
import formatDate from "../../utils/formatDate.js";

const ExperienceSection = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  const sorted = experience.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <SectionShell id="experience" eyebrow="Where I've worked" title="Experience">
      <div className="relative space-y-8 border-l border-slate-800 pl-6 sm:pl-8">
        {sorted.map((item, index) => {
          const range = item.current
            ? `${formatDate(item.startDate)} — Present`
            : `${formatDate(item.startDate)} — ${formatDate(item.endDate) || "Present"}`;

          return (
            <Reveal key={item._id || `${item.company}-${item.position}`} delay={index * 0.05} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-indigo-500 sm:-left-[37px]" />

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-slate-100">{item.position}</h3>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{range}</span>
              </div>

              <p className="mt-0.5 text-sm font-medium text-indigo-400">
                {item.company}
                {item.location ? ` · ${item.location}` : ""}
              </p>

              {item.description && (
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              )}

              {item.technologies?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-800 bg-slate-900/60 px-2.5 py-0.5 text-xs text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
};

export default ExperienceSection;
