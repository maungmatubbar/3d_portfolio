import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { highlights, languages } from "../constants";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";

const About = () => (
  <>
    <SectionHeading
      index="01"
      eyebrow="Introduction"
      title="About me."
    />

    <div className="mt-12 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
      {/* ---------- Narrative ---------- */}
      <motion.div
        variants={fadeIn("up", "spring", 0.1, 0.9)}
        className="lg:col-span-7 flex flex-col"
      >
        <p className="text-secondary text-[17px] leading-[31px]">
          I build <span className="text-white font-semibold">enterprise-grade SaaS platforms</span>, global
          logistics networks and AI-augmented web systems — and own each one from the data model to the
          cloud it runs on. I move comfortably across modern frontend (React, Next.js, TypeScript, Tailwind),
          scalable backend architecture (NestJS, Node, Django, Laravel) and cloud infrastructure (AWS, Linux,
          Nginx, Docker).
        </p>
        <p className="mt-5 text-secondary text-[17px] leading-[31px]">
          What I really do is <span className="text-white font-semibold">solve business problems with software</span> —
          wiring together payment gateways, webhook pipelines and{" "}
          <span className="text-accent-soft font-semibold">n8n automation</span> to cut cost and remove manual work.
          I care about clean systems, reliable delivery and shipping things that last.
        </p>

        {/* Languages — the one detail not surfaced elsewhere on the page */}
        <div className="mt-9 flex flex-wrap items-center gap-2.5">
          <span className="text-secondary text-[11px] font-mono uppercase tracking-wider mr-1">
            Languages
          </span>
          {languages.map((l) => (
            <span
              key={l.name}
              className="font-mono text-[12px] px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-secondary"
            >
              {l.name} · <span className="text-white/70">{l.level}</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* ---------- What I bring ---------- */}
      <motion.div
        variants={fadeIn("up", "spring", 0.25, 0.9)}
        className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10"
      >
        <h3 className="text-white font-display font-bold text-[20px]">
          What I bring
        </h3>
        <div className="mt-6 flex flex-col gap-5">
          {highlights.map((h, i) => (
            <motion.div
              key={h}
              variants={fadeIn("up", "spring", 0.1 * i, 0.6)}
              className="flex items-start gap-3"
            >
              <span className="grid place-items-center w-6 h-6 rounded-md bg-accent-2/10 border border-accent-2/30 text-accent-2 shrink-0 mt-0.5">
                <Icon name="check" size={14} strokeWidth={2.4} />
              </span>
              <p className="text-white-100/80 text-[15px] leading-[24px]">{h}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </>
);

export default SectionWrapper(About, "about");
