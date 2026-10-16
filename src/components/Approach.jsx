import React from "react";
import { motion } from "framer-motion";
import { approach, businessImpact } from "../constants";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";
import CodeWindow from "./CodeWindow";
import AnimatedGrid from "./AnimatedGrid";
import Icon from "./Icon";

const Approach = () => (
  <>
    {/* Full-bleed animated grid backdrop (body has overflow-x hidden) */}
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <AnimatedGrid variant="subtle" />
    </div>

    <SectionHeading
      index="03"
      eyebrow="How I work"
      title="Problem-solving, built for business."
      desc="I'm not just writing features — I'm removing bottlenecks. Every system I build starts from a business goal and ends in measurable, automated, reliable delivery."
    />

    <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* ---------- Methodology ---------- */}
      <div className="flex flex-col gap-5 min-w-0">
        {approach.map((a, i) => (
          <motion.div
            key={a.title}
            variants={fadeIn("right", "spring", 0.1 * i, 0.7)}
            className="card-grad p-6 flex gap-4"
          >
            <div className="flex flex-col items-center">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-accent/10 border border-accent/25 text-accent-soft shrink-0">
                <Icon name={a.icon} size={20} />
              </span>
              {i !== approach.length - 1 && (
                <span className="w-px flex-1 mt-2 bg-gradient-to-b from-accent/40 to-transparent" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12px] text-accent-2">
                  0{i + 1}
                </span>
                <h3 className="text-white font-display font-bold text-[17px]">
                  {a.title}
                </h3>
              </div>
              <p className="mt-2 text-secondary text-[14px] leading-[23px]">{a.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------- Coding view + outcomes ---------- */}
      <motion.div
        variants={fadeIn("left", "spring", 0.2, 0.9)}
        className="flex flex-col gap-6 lg:sticky lg:top-28 min-w-0"
      >
        <CodeWindow />

        <div className="card-grad p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="check" size={18} className="text-accent-2" />
            <h3 className="text-white font-display font-bold text-[16px]">
              Outcomes I deliver
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {businessImpact.map((b) => (
              <div
                key={b}
                className="flex items-start gap-2.5 text-[13.5px] text-white-100/80"
              >
                <span className="grid place-items-center w-5 h-5 rounded-md bg-accent-2/10 border border-accent-2/30 text-accent-2 shrink-0 mt-0.5">
                  <Icon name="arrow" size={12} strokeWidth={2.4} />
                </span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </>
);

export default SectionWrapper(Approach, "approach");
