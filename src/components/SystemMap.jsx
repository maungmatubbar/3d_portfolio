import React from "react";
import { motion } from "framer-motion";
import { systemMap } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../style";
import Icon from "./Icon";

// Badge colour per workstream kind — stays on-brand (violet / mint).
const kindStyles = {
  Automation: "text-accent-2 border-accent-2/30 bg-accent-2/10",
  Development: "text-accent-soft border-accent/30 bg-accent/10",
};

const StepCard = ({ step, isLast }) => (
  <div className="relative h-full">
    <div className="flex h-full flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-white/[0.04] group-hover:shadow-[0_0_34px_-18px_rgba(124,92,255,0.85)]">
      <h4 className="font-display text-[14.5px] font-semibold leading-snug text-white">
        {step.title}
      </h4>
      {step.desc && (
        <p className="mt-1.5 text-[12.5px] leading-[19px] text-secondary">{step.desc}</p>
      )}
      {step.chips && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2.5">
          {step.chips.map((c) => (
            <span
              key={c}
              className="rounded-md border border-white/10 bg-black-200/50 px-2 py-[3px] font-mono text-[10.5px] text-white-100/70 transition-colors duration-300 group-hover:border-accent/25"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </div>

    {!isLast && (
      <>
        {/* horizontal connector (desktop) */}
        <span className="pointer-events-none absolute left-full top-1/2 z-10 hidden -translate-y-1/2 items-center gap-1 pl-1.5 lg:flex">
          <span className="h-0 w-4 border-t border-dashed border-secondary/30 transition-colors duration-300 group-hover:border-accent" />
          <span className="text-secondary/40 transition-colors duration-300 group-hover:animate-flow-x group-hover:text-accent">
            <Icon name="arrow" size={13} strokeWidth={2} />
          </span>
        </span>
        {/* vertical connector (mobile / tablet) */}
        <span className="pointer-events-none absolute left-1/2 top-full z-10 flex -translate-x-1/2 flex-col items-center pt-1.5 lg:hidden">
          <span className="h-4 w-0 border-l border-dashed border-secondary/30 transition-colors duration-300 group-hover:border-accent" />
          <span className="-mt-0.5 text-secondary/40 transition-colors duration-300 group-hover:text-accent">
            <Icon name="arrowDown" size={13} strokeWidth={2} />
          </span>
        </span>
      </>
    )}
  </div>
);

const SystemMap = () => {
  return (
    <>
      {/* ---------- Header ---------- */}
      <div className="flex flex-col">
        <motion.div variants={textVariant()} className="flex items-center gap-4">
          <span className="section-index">02</span>
          <span className="kicker">System map</span>
          <span className="heading-rule hidden flex-1 max-w-[120px] sm:block" />
        </motion.div>

        <motion.h2 variants={textVariant(0.05)} className={`${styles.sectionHeadText} mt-4`}>
          Four workstreams, one platform.
        </motion.h2>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-5 max-w-2xl text-[16px] leading-[28px] text-secondary sm:text-[17px]"
        >
          Each lane runs from a real-world trigger through the service I build to the
          platform surface and the business outcome it delivers. Hover a lane to trace it
          end to end.
        </motion.p>
      </div>

      {/* ---------- Map ---------- */}
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.9)}
        className="glass-strong mt-12 rounded-2xl p-4 sm:p-6"
      >
        {/* column headers (desktop) */}
        <div className="mb-5 hidden grid-cols-4 gap-x-[42px] lg:grid">
          {systemMap.columns.map((c) => (
            <span
              key={c}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary/60"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-7 lg:gap-6">
          {systemMap.lanes.map((lane) => (
            <div key={lane.key} className="group">
                {/* lane header */}
                <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide ${kindStyles[lane.kind]}`}
                  >
                    {lane.kind}
                  </span>
                  <span className="text-secondary/70">
                    <Icon name={lane.icon} size={15} />
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-white-100/70">
                    {lane.name}
                  </span>
                </div>

                {/* steps */}
                <div className="grid grid-cols-1 gap-x-[42px] gap-y-9 lg:grid-cols-4 lg:gap-y-0">
                  {lane.steps.map((step, si) => (
                    <StepCard
                      key={step.title}
                      step={step}
                      isLast={si === lane.steps.length - 1}
                    />
                  ))}
                </div>
              </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(SystemMap, "services");
