import React from "react";
import { motion } from "framer-motion";
import { education, certifications } from "../constants";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";

const Education = () => (
  <>
    <SectionHeading
      index="05"
      eyebrow="Background"
      title="Education & certifications."
      desc="A formal engineering foundation, backed by focused, framework-specific professional training."
    />

    <div className="mt-14 grid lg:grid-cols-2 gap-8">
      {/* Education */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-accent/10 border border-accent/25 text-accent-soft">
            <Icon name="cap" size={20} />
          </span>
          <h3 className="text-white font-display font-bold text-[20px]">Education</h3>
        </div>

        {education.map((e, i) => (
          <motion.div
            key={e.degree}
            variants={fadeIn("right", "spring", 0.12 * i, 0.7)}
            className="card-grad p-6 flex gap-4"
          >
            <span className="font-display font-extrabold text-[22px] text-gradient-accent shrink-0 w-14">
              {e.year}
            </span>
            <div className="border-l border-white/10 pl-4">
              <h4 className="text-white font-semibold text-[16px] leading-snug">
                {e.degree}
              </h4>
              <p className="text-accent-soft text-[13px] mt-1">{e.school}</p>
              <p className="text-secondary text-[12px] font-mono mt-1.5">{e.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-accent-2/10 border border-accent-2/25 text-accent-2">
            <Icon name="award" size={20} />
          </span>
          <h3 className="text-white font-display font-bold text-[20px]">
            Certifications
          </h3>
        </div>

        <motion.div
          variants={fadeIn("left", "spring", 0.15, 0.8)}
          className="card-grad p-6 flex flex-col"
        >
          {certifications.map((c, i) => {
            const [title, meta] = c.split(" — ");
            return (
              <div
                key={c}
                className={`flex items-start gap-3 py-4 ${
                  i !== 0 ? "border-t border-white/5" : ""
                }`}
              >
                <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 text-accent-2 shrink-0">
                  <Icon name="star" size={15} filled />
                </span>
                <div>
                  <p className="text-white text-[15px] font-medium leading-snug">
                    {title}
                  </p>
                  {meta && (
                    <p className="text-secondary text-[12px] font-mono mt-1">{meta}</p>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="card-grad p-6 flex items-center gap-4">
          <span className="grid place-items-center w-11 h-11 rounded-xl bg-accent-gradient text-primary shrink-0">
            <Icon name="globe" size={20} />
          </span>
          <p className="text-secondary text-[13.5px] leading-[21px]">
            Continuously learning across cloud, AI tooling and automation — currently
            deepening <span className="text-white">AWS</span>,{" "}
            <span className="text-white">n8n</span> and{" "}
            <span className="text-white">AI-assisted engineering</span>.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default SectionWrapper(Education, "education");
