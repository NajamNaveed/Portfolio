import { useState } from "react";
import SafeImage from "../ui/SafeImage.jsx";
import ImageLightbox from "./ImageLightbox.jsx";

/**
 * Renders a responsive grid of project images and wires them to the
 * lightbox. `images` should already be de-duplicated/filtered by the
 * caller (see ProjectDetail.jsx, which merges coverImage + images[]).
 */
const ProjectGallery = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const close = () => setActiveIndex(null);
  const navigate = (delta) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + delta + images.length) % images.length;
    });
  };

  return (
    <>
      <div className={images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2 gap-3 sm:grid-cols-3"}>
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group aspect-video overflow-hidden rounded-xl border border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-label={`View image ${index + 1} of ${images.length} for ${title}`}
          >
            <SafeImage
              src={src}
              alt={`${title} screenshot ${index + 1} of ${images.length}`}
              className="h-full w-full object-cover transition duration-200 motion-safe:group-hover:scale-105"
              loading={index < 3 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>

      <ImageLightbox images={images} index={activeIndex} onClose={close} onNavigate={navigate} />
    </>
  );
};

export default ProjectGallery;
