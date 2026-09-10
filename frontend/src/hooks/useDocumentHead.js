import { useEffect } from "react";

const FAVICON_LINK_ID = "cms-favicon";

const setMetaDescription = (content) => {
  if (!content) return;

  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

// Saving a favicon URL to MongoDB does nothing on its own - the browser
// only reads whatever <link rel="icon"> is in the document at load time.
// This creates/updates that tag from CMS data. An empty value removes the
// managed tag entirely, letting the browser fall back to its default;
// a broken URL is handled the same way via the link's error event, so a
// bad favicon URL never leaves a dead/broken tab icon.
const setFavicon = (href) => {
  const existing = document.getElementById(FAVICON_LINK_ID);

  if (!href) {
    existing?.remove();
    return;
  }

  const link = existing || document.createElement("link");
  link.id = FAVICON_LINK_ID;
  link.rel = "icon";
  link.onerror = () => link.remove();
  link.href = href;

  if (!existing) {
    document.head.appendChild(link);
  }
};

/**
 * Lightweight, dependency-free SEO/head helper for the public portfolio.
 * Sets <title>, the description meta tag, and the favicon from Site
 * Settings once that data has loaded. Intentionally simple - a full
 * head-management library (react-helmet-async etc.) isn't warranted for
 * a single public route with no client-side navigation between pages.
 */
const useDocumentHead = ({ title, description, favicon }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    setMetaDescription(description);
    setFavicon(favicon);
  }, [title, description, favicon]);
};

export default useDocumentHead;
