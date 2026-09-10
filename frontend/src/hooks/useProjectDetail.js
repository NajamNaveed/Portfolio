import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProjectBySlug } from "../services/cms/publicContentService.js";

const useProjectDetail = (slug) => {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setIsLoading(true);
    setIsNotFound(false);
    setHasError(false);

    try {
      const data = await fetchProjectBySlug(slug);
      if (!isMountedRef.current) return;
      setProject(data);
    } catch (error) {
      if (!isMountedRef.current) return;
      setProject(null);
      if (error?.response?.status === 404) {
        setIsNotFound(true);
      } else {
        setHasError(true);
      }
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
  }, [slug]);

  // Re-fetches only when the slug itself changes (e.g. navigating from
  // one project detail page directly to another) - not on every render.
  useEffect(() => {
    if (!slug) return;
    load();
  }, [slug, load]);

  return { project, isLoading, isNotFound, hasError, reload: load };
};

export default useProjectDetail;
