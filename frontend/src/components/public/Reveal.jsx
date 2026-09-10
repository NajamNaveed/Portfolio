import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade/slide-in wrapper used across every public section so entrance
 * animation stays consistent and is defined in exactly one place.
 * Falls back to a plain, instant render when the visitor has
 * prefers-reduced-motion enabled.
 */
const Reveal = ({ children, delay = 0, y = 16, className = "", as = "div" }) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
