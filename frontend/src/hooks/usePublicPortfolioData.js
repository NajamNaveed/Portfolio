import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPortfolioData } from "../services/cms/publicContentService.js";

/**
 * Page-level data loader for the public portfolio. Fetches every CMS
 * resource once (in parallel) and hands sections their own slice plus a
 * per-section "did this fail" flag, so one broken endpoint never takes
 * down the whole page (see publicContentService.fetchPortfolioData).
 */
const usePublicPortfolioData = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFullyDown, setIsFullyDown] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setIsLoading(true);

    const result = await fetchPortfolioData();

    if (!isMountedRef.current) return;

    const failedCount = Object.keys(result.errors).length;
    const totalCount = Object.keys(result.data).length;

    setData(result.data);
    setErrors(result.errors);
    setIsFullyDown(totalCount > 0 && failedCount === totalCount);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, errors, isLoading, isFullyDown, reload: load };
};

export default usePublicPortfolioData;
