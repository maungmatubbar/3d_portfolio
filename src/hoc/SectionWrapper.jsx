import { motion } from "framer-motion";

import { styles } from "../style";
import { staggerContainer } from "../utils/motion";
const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        // amount must stay small: tall sections (e.g. Works ~4156px) exceed the
        // mobile viewport, so a high amount (0.25) can never be satisfied and the
        // section would never animate in — leaving a huge blank gap on phones.
        viewport={{ once: true, amount: 0.1 }}
        className={`${styles.padding} max-w-7xl
    mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
