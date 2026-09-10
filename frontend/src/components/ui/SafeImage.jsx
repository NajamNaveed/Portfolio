import { useState } from "react";
import { ImageOff } from "lucide-react";
import cn from "../../utils/cn.js";

/**
 * Renders a CMS-supplied image URL, but never a broken <img> icon:
 * missing src or a failed load both fall back to a neutral placeholder
 * instead of a visibly broken element.
 */
const SafeImage = ({ src, alt, className = "", loading = "lazy", fetchPriority }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-slate-800/60 text-slate-600",
          className
        )}
        role="img"
        aria-label={alt || "Image unavailable"}
      >
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ""}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  );
};

export default SafeImage;
