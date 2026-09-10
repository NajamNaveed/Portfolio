import { Github, Linkedin, Link as LinkIcon, Mail, Twitter } from "lucide-react";

const PLATFORM_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  email: Mail,
  mail: Mail,
};

const platformIcon = (platform) => PLATFORM_ICONS[(platform || "").toLowerCase().trim()] || LinkIcon;

const PublicFooter = ({ footer, socialLinks, siteSettings }) => {
  const siteName = siteSettings?.siteName || "Portfolio";
  const year = new Date().getFullYear();
  const copyright = footer?.copyrightText || `© ${year} ${siteName}. All rights reserved.`;

  const columns = (footer?.columns || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const links = (socialLinks || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 gap-10 ${columns.length > 0 ? "sm:grid-cols-2 lg:grid-cols-4" : ""}`}>
          <div className={columns.length > 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <p className="text-lg font-bold text-slate-50">{siteName}</p>
            {footer?.description && (
              <p className="mt-2 max-w-sm text-sm text-slate-500">{footer.description}</p>
            )}
            {links.length > 0 && (
              <div className="mt-4 flex items-center gap-3">
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
                      className="text-slate-500 transition hover:text-slate-200"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {columns.map((column) => (
            <div key={column._id || column.title}>
              <h3 className="text-sm font-semibold text-slate-200">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {(column.links || [])
                  .slice()
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((link) => (
                    <li key={link._id || link.href}>
                      <a href={link.href} className="text-sm text-slate-500 transition hover:text-slate-200">
                        {link.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-600">{copyright}</p>
      </div>
    </footer>
  );
};

export default PublicFooter;
