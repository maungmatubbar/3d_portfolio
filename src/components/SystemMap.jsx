import React, { useState } from "react";
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
    <div className="flex h-full flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04]">
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
              className="rounded-md border border-white/10 bg-black-200/50 px-2 py-[3px] font-mono text-[10.5px] text-white-100/70"
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
        <span className="pointer-events-none absolute right-[-21px] top-1/2 z-10 hidden -translate-y-1/2 text-secondary/40 lg:block">
          <Icon name="arrow" size={16} strokeWidth={1.8} />
        </span>
        {/* vertical connector (mobile / tablet) */}
        <span className="pointer-events-none absolute bottom-[-19px] left-1/2 z-10 -translate-x-1/2 text-secondary/40 lg:hidden">
          <Icon name="arrowDown" size={16} strokeWidth={1.8} />
        </span>
      </>
    )}
  </div>
);

const SystemMap = () => {
  const [active, setActive] = useState("all");

  const filters = [
    { key: "all", label: "All" },
    ...systemMap.lanes.map((l) => ({ key: l.key, label: l.filterLabel })),
  ];

  return (
    <>
      {/* ---------- Header + filters ---------- */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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
            platform surface and the business outcome it delivers. Pick a workstream to
            focus it.
          </motion.p>
        </div>

        {/* filter pills */}
        <motion.div
          variants={fadeIn("left", "spring", 0.2, 0.8)}
          className="flex flex-wrap gap-2 lg:max-w-[460px] lg:justify-end"
        >
          {filters.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                aria-pressed={isActive}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white shadow-glow"
                    : "border border-white/10 bg-white/[0.02] text-secondary hover:border-accent/40 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>
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
          {systemMap.lanes.map((lane) => {
            const dim = active !== "all" && active !== lane.key;
            return (
              <div
                key={lane.key}
                className={`transition-all duration-300 ${
                  dim ? "opacity-35 saturate-50" : "opacity-100"
                }`}
              >
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
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(SystemMap, "services");
