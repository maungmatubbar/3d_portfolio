import React from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import { techStack } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import Icon from "./Icon";

// Techs that deserve a highlighted chip (the stars of this build)
const featured = new Set(["NestJS", "n8n", "Next.js", "AWS"]);

const StackCategory = ({ category, icon, accent, items, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.6)}
    className="card-grad p-6"
  >
    <div className="flex items-center gap-3 mb-5">
      <span
        className="grid place-items-center w-10 h-10 rounded-xl border"
        style={{
          color: accent,
          borderColor: `${accent}40`,
          background: `${accent}14`,
        }}
      >
        <Icon name={icon} size={20} />
      </span>
      <h3 className="text-white font-display font-bold text-[18px]">{category}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isFeatured = featured.has(item);
        return (
          <span
            key={item}
            className={`font-mono text-[12.5px] px-3 py-1.5 rounded-lg border transition-colors ${
              isFeatured
                ? "text-primary font-semibold border-transparent"
                : "text-secondary border-white/10 bg-white/[0.03] hover:border-white/25 hover:text-white"
            }`}
            style={
              isFeatured
                ? { background: "linear-gradient(135deg,#7c5cff,#4ff0c5)" }
                : undefined
            }
          >
            {item}
          </span>
        );
      })}
    </div>
  </motion.div>
);

const Tech = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Capabilities</p>
      <h2 className={styles.sectionHeadText}>Tech stack.</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-6 text-secondary text-[17px] max-w-3xl leading-[30px]"
    >
      A battle-tested toolkit spanning the full product lifecycle — from typed frontends
      and backend services to cloud infrastructure, data layers and automation. Highlighted
      chips power this very portfolio's live contact pipeline.
    </motion.p>

    <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {techStack.map((group, index) => (
        <StackCategory key={group.category} index={index} {...group} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Tech, "stack");
