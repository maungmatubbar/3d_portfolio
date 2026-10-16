import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { services } from "../constants";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";

const ServiceCard = ({ index, title, desc, icon }) => (
  <Tilt className="w-full h-full" options={{ max: 14, scale: 1.02, speed: 500 }}>
    <motion.div
      variants={fadeIn("up", "spring", 0.15 * index, 0.7)}
      className="card-grad group h-full p-7 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="grid place-items-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 text-accent-soft group-hover:text-accent-2 transition-colors">
          <Icon name={icon} size={24} />
        </div>
        <span className="font-mono text-[12px] text-secondary/50">
          0{index + 1}
        </span>
      </div>
      <h3 className="text-white text-[18px] font-bold font-display">{title}</h3>
      <p className="text-secondary text-[14px] leading-[23px] flex-1">{desc}</p>
      <span className="inline-flex items-center gap-1.5 text-[12px] font-mono text-accent-soft opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <Icon name="arrowUpRight" size={14} />
      </span>
    </motion.div>
  </Tilt>
);

const Services = () => (
  <>
    <SectionHeading
      index="02"
      eyebrow="What I do"
      title="Services & expertise."
      desc="Four core capabilities that cover a product's full lifecycle — build, run, automate and harden — handled by one engineer instead of a hand-off chain."
    />

    <div className="mt-14 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5">
      {services.map((service, index) => (
        <ServiceCard key={service.key} index={index} {...service} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Services, "services");
