import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../style";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "rgba(16,16,25,0.72)",
      backdropFilter: "blur(12px)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "18px",
      boxShadow: "0 30px 80px -40px rgba(124,92,255,0.5)",
    }}
    contentArrowStyle={{ borderRight: "7px solid rgba(255,255,255,0.08)" }}
    date={experience.date}
    dateClassName="!text-secondary font-mono !text-[13px] md:!opacity-90"
    iconStyle={{
      background: experience.iconBg,
      color: "#06060b",
      boxShadow: `0 0 0 4px #0d0d17, 0 0 24px -2px ${experience.iconBg}`,
    }}
    icon={
      <div className="flex justify-center items-center w-full h-full font-display font-extrabold text-[20px]">
        {experience.initials}
      </div>
    }
  >
    <div>
      <h3 className="text-white text-[22px] font-bold font-display tracking-tight">
        {experience.title}
      </h3>
      <p className="text-accent-soft text-[15px] font-semibold mt-1">
        {experience.company_name}
      </p>
      <p className="text-secondary text-[12px] font-mono mt-1">
        {experience.location}
      </p>
    </div>
    <ul className="mt-5 list-none space-y-2.5">
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className="text-white-100/80 text-[14px] leading-[22px] pl-5 relative"
        >
          <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-accent-2" />
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Career so far</p>
      <h2 className={styles.sectionHeadText}>Work experience.</h2>
    </motion.div>

    <div className="mt-16 flex flex-col">
      <VerticalTimeline lineColor="rgba(124,92,255,0.25)">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </VerticalTimeline>
    </div>
  </>
);

export default SectionWrapper(Experience, "experience");
