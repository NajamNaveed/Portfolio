import { Github, Linkedin, Link as LinkIcon, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionShell from "./SectionShell.jsx";
import Button from "../ui/Button.jsx";

const PLATFORM_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  email: Mail,
  mail: Mail,
};

const platformIcon = (platform) => PLATFORM_ICONS[(platform || "").toLowerCase().trim()] || LinkIcon;

const ContactSection = ({ socialLinks, siteSettings }) => {
  const links = (socialLinks || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const email = siteSettings?.email;
  const phone = siteSettings?.phone;
  const location = siteSettings?.location;

  if (links.length === 0 && !email && !phone && !location) return null;

  return (
    <SectionShell id="contact" eyebrow="Get in touch" title="Contact">
      <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        {(email || phone || location) && (
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            {email && (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phone}
              </a>
            )}
            {location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {location}
              </span>
            )}
          </div>
        )}

        {email && (
          <Button as="a" href={`mailto:${email}`} size="lg">
            Contact Me
          </Button>
        )}

        {links.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {links.map((link) => {
              const Icon = platformIcon(link.platform);
              const isExternal = /^https?:\/\//i.test(link.url || "");
              return (
                <a
                  key={link._id || link.url}
                  href={link.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={link.label || link.platform}
                  title={link.label || link.platform}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-800 bg-slate-900/60 text-slate-300 transition hover:border-indigo-700 hover:text-white"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        )}
      </Reveal>
    </SectionShell>
  );
};

export default ContactSection;
