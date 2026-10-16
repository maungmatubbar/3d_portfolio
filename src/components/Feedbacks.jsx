import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import { testimonials } from "../constants";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  initials,
}) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="card-grad p-8 flex flex-col"
  >
    <Icon name="quote" size={34} filled className="text-accent/50" />
    <p className="mt-4 text-white/90 text-[16px] leading-[26px] flex-1">
      {testimonial}
    </p>
    <div className="mt-7 flex items-center gap-3">
      <span className="grid place-items-center w-11 h-11 rounded-full bg-accent-gradient text-primary font-display font-extrabold text-[15px]">
        {initials}
      </span>
      <div className="flex flex-col">
        <p className="text-white font-semibold text-[15px]">{name}</p>
        <p className="text-secondary text-[12px] font-mono">
          {designation} · {company}
        </p>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => (
  <>
    <SectionHeading
      index="08"
      eyebrow="Kind words"
      title="References & testimonials."
      desc="What colleagues and clients say about working with me across training, logistics operations and product delivery."
    />

    <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t, index) => (
        <FeedbackCard key={t.name} index={index} {...t} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Feedbacks, "testimonials");
