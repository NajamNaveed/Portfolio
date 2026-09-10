import Reveal from "./Reveal.jsx";
import SafeImage from "../ui/SafeImage.jsx";
import SectionShell from "./SectionShell.jsx";

const AboutSection = ({ about }) => {
  if (!about) return null;

  const hasContent = about.description || about.image || about.highlights?.length || about.statistics?.length;
  if (!hasContent) return null;

  const highlights = (about.highlights || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const statistics = (about.statistics || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <SectionShell id="about" eyebrow={about.subtitle} title={about.title || "About Me"}>
      <div className={`grid grid-cols-1 gap-12 ${about.image ? "lg:grid-cols-5" : ""}`}>
        {about.image && (
          <Reveal className="lg:col-span-2">
            <SafeImage
              src={about.image}
              alt={about.title || "About"}
              className="aspect-[4/5] w-full rounded-2xl border border-slate-800 object-cover"
            />
          </Reveal>
        )}

        <div className={about.image ? "lg:col-span-3" : ""}>
          {about.description && (
            <Reveal delay={0.05}>
              <p className="whitespace-pre-line text-base leading-relaxed text-slate-400">
                {about.description}
              </p>
            </Reveal>
          )}

          {highlights.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <Reveal key={item._id || item.title} delay={0.08 + index * 0.05}>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                    <h3 className="text-sm font-semibold text-slate-100">{item.title}</h3>
                    {item.description && (
                      <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {statistics.length > 0 && (
            <Reveal delay={0.15} className="mt-8 grid grid-cols-2 gap-6 border-t border-slate-800 pt-8 sm:grid-cols-4">
              {statistics.map((stat) => (
                <div key={stat._id || stat.label}>
                  <p className="text-2xl font-bold text-slate-50">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </SectionShell>
  );
};

export default AboutSection;
