import { Check, Sparkles } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionShell from "./SectionShell.jsx";
import SafeImage from "../ui/SafeImage.jsx";

const isImageLike = (value) => typeof value === "string" && /^(https?:)?\//.test(value.trim());

const ServiceIcon = ({ icon }) => {
  if (isImageLike(icon)) {
    return <SafeImage src={icon} alt="" className="h-6 w-6 rounded object-cover" />;
  }
  // The project has no icon-name registry, so any non-URL "icon" value
  // (e.g. a bare string from the CMS) safely falls back to a generic icon
  // rather than guessing at a mapping that might not exist.
  return <Sparkles className="h-6 w-6" aria-hidden="true" />;
};

const ServicesSection = ({ services }) => {
  if (!services || services.length === 0) return null;

  const sorted = services.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <SectionShell id="services" eyebrow="How I can help" title="Services">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((service, index) => (
          <Reveal key={service._id || service.title} delay={index * 0.05}>
            <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <ServiceIcon icon={service.icon} title={service.title} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-100">{service.title}</h3>
              {service.description && (
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.description}</p>
              )}
              {service.features?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
};

export default ServicesSection;
