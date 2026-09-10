import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SafeImage from "../ui/SafeImage.jsx";

/**
 * Fullscreen preview for a project's gallery images. `index` is the
 * currently-open image index, or null/undefined when closed - the
 * parent owns that state so it can also drive thumbnail highlighting.
 */
const ImageLightbox = ({ images, index, onClose, onNavigate }) => {
  const isOpen = typeof index === "number" && index >= 0 && index < images.length;

  useEffect(() => {
    if (!isOpen) return undefined;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate(1);
      if (event.key === "ArrowLeft") onNavigate(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-slate-200 transition hover:bg-slate-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-slate-200 transition hover:bg-slate-800 sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-slate-200 transition hover:bg-slate-800 sm:right-4"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="relative z-[1] max-h-[85vh] max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <SafeImage
              src={images[index]}
              alt={`Image ${index + 1} of ${images.length}`}
              className="max-h-[85vh] min-h-[200px] w-auto min-w-[280px] rounded-lg object-contain"
            />
            {images.length > 1 && (
              <p className="mt-3 text-center text-xs text-slate-400">
                {index + 1} / {images.length}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
