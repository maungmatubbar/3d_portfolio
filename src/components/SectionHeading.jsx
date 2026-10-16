import React from "react";
import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../style";

// Editorial, numbered section heading used across the site for a
// consistent, senior-level rhythm: 01 · EYEBROW ──── + big title + lede.
const SectionHeading = ({
  index,
  eyebrow,
  title,
  desc,
  align = "left",
  className = "",
}) => (
  <div className={`${align === "center" ? "text-center items-center" : ""} flex flex-col ${className}`}>
    <motion.div
      variants={textVariant()}
      className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
    >
      {index && <span className="section-index">{index}</span>}
      <span className="kicker">{eyebrow}</span>
      {align !== "center" && <span className="heading-rule flex-1 max-w-[140px]" />}
    </motion.div>

    <motion.h2
      variants={textVariant(0.05)}
      className={`${styles.sectionHeadText} mt-4`}
    >
      {title}
    </motion.h2>

    {desc && (
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className={`mt-5 text-secondary text-[16px] sm:text-[17px] leading-[28px] ${
          align === "center" ? "max-w-2xl mx-auto" : "max-w-3xl"
        }`}
      >
        {desc}
      </motion.p>
    )}
  </div>
);

export default SectionHeading;
