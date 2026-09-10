import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button.jsx";
import SafeImage from "../ui/SafeImage.jsx";

const DEFAULT_NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const isAnchor = (href) => typeof href === "string" && href.startsWith("#");

// A CMS-configured href might be an in-page anchor ("#projects") or a
// full external URL. Anchors need to route through "/" first when the
// visitor isn't already on the homepage (e.g. a project detail page),
// so they render as a router Link to "/#section" instead of a bare <a
// href="#section">, which would silently do nothing on any other route.
const NavLink = ({ href, className, onClick, children }) => {
  if (isAnchor(href)) {
    return (
      <Link to={`/${href}`} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
};

const PublicHeader = ({ header, siteSettings }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = (header?.navigationItems?.length ? header.navigationItems : DEFAULT_NAV)
    .filter((item) => item.isVisible !== false)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const cta = header?.cta?.isVisible && header.cta.label && header.cta.href ? header.cta : null;
  const brand = siteSettings?.siteName || "Portfolio";
  // The Header CMS resource has its own logo (a header-specific override);
  // Site Settings' logo is the general site identity image. Header's takes
  // precedence when explicitly set, but Site Settings' logo is the one an
  // admin is more likely to fill in first, so it must not be silently
  // ignored just because Header.logo happens to be empty.
  const logo = header?.logo || siteSettings?.logo;

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold tracking-tight text-slate-50">
          {logo ? <SafeImage src={logo} alt={brand} className="h-8 w-auto" /> : brand}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.href + item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          {cta &&
            (isAnchor(cta.href) ? (
              <Button as={Link} to={`/${cta.href}`} size="sm">
                {cta.label}
              </Button>
            ) : (
              <Button as="a" href={cta.href} size="sm">
                {cta.label}
              </Button>
            ))}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:bg-slate-900 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-800/80 bg-slate-950 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.href + item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-slate-900"
                >
                  {item.label}
                </NavLink>
              ))}
              {cta &&
                (isAnchor(cta.href) ? (
                  <Button as={Link} to={`/${cta.href}`} className="mt-2" onClick={handleNavClick}>
                    {cta.label}
                  </Button>
                ) : (
                  <Button as="a" href={cta.href} className="mt-2" onClick={handleNavClick}>
                    {cta.label}
                  </Button>
                ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default PublicHeader;
