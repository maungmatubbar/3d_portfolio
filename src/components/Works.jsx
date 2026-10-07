import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import Icon from "./Icon";

const ProjectCard = ({
  index,
  name,
  subtitle,
  description,
  highlights,
  tags,
  theme,
  glyph,
  source_code_link,
  live_link,
}) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.75)}>
    <Tilt
      options={{ max: 12, scale: 1, speed: 450 }}
      className="card-grad h-full flex flex-col overflow-hidden"
    >
      {/* Generated cover art */}
      <div
        className="relative h-[180px] w-full overflow-hidden"
        style={{
          background: `radial-gradient(120% 120% at 0% 0%, ${theme[0]}55 0%, transparent 55%), radial-gradient(120% 120% at 100% 100%, ${theme[1]}55 0%, transparent 55%), #0b0b14`,
        }}
      >
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ color: theme[0] }}
        >
          <Icon name={glyph} size={64} strokeWidth={1.2} className="opacity-90" />
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {live_link ? (
            <button
              onClick={() => window.open(live_link, "_blank")}
              aria-label="Live demo"
              className="grid place-items-center w-9 h-9 rounded-full glass-strong hover:text-accent-2 text-white transition-colors"
            >
              <Icon name="external" size={16} />
            </button>
          ) : null}
          <button
            onClick={() => window.open(source_code_link, "_blank")}
            aria-label="Source code"
            className="grid place-items-center w-9 h-9 rounded-full glass-strong hover:text-accent-2 text-white transition-colors"
          >
            <Icon name="github" size={18} filled />
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white font-display font-bold text-[22px] tracking-tight">
          {name}
        </h3>
        <p className="text-accent-soft text-[13px] font-mono mt-0.5">{subtitle}</p>
        <p className="mt-3 text-secondary text-[14px] leading-[22px]">{description}</p>

        <ul className="mt-4 space-y-1.5">
          {highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-[13px] text-white-100/75"
            >
              <Icon name="check" size={15} className="text-accent-2 mt-[2px] shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className="font-mono text-[12px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-secondary"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </Tilt>
  </motion.div>
);

const Works = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Selected work</p>
      <h2 className={styles.sectionHeadText}>Featured projects.</h2>
    </motion.div>

    <div className="w-full flex">
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Real systems shipped to production — booking engines, cross-border logistics,
        HRMS/CRM platforms and automation pipelines. Each one reflects how I solve complex
        problems end to end, from data model to deployment.
      </motion.p>
    </div>

    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Works, "work");
