import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Thin gradient bar pinned to the very top that tracks page scroll.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
};

export default ScrollProgress;
