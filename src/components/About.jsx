import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../style";
import { services, profile } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import Icon from "./Icon";

const ServiceCard = ({ index, title, desc, icon }) => (
  <Tilt className="xs:w-[250px] w-full" options={{ max: 20, scale: 1.02, speed: 500 }}>
    <motion.div
      variants={fadeIn("right", "spring", 0.2 * index, 0.75)}
      className="card-grad h-full p-6 flex flex-col gap-4"
    >
      <div className="grid place-items-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 text-accent-soft">
        <Icon name={icon} size={24} />
      </div>
      <h3 className="text-white text-[18px] font-bold font-display">{title}</h3>
      <p className="text-secondary text-[14px] leading-[22px]">{desc}</p>
    </motion.div>
  </Tilt>
);

const About = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>About me.</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-6 text-secondary text-[17px] max-w-3xl leading-[30px]"
    >
      I'm an accomplished <span className="text-white font-semibold">Full-Stack & DevOps Engineer</span> with
      over <span className="text-white font-semibold">5 years</span> building enterprise-grade SaaS platforms,
      global logistics networks and AI-augmented web systems. I work comfortably across modern frontend
      (React, Next.js, TypeScript, Tailwind), scalable backend architecture (NestJS, Node, Django, Laravel)
      and cloud infrastructure (AWS, Linux, Nginx, Docker) — and I'm fluent in wiring it all together with
      payment gateways, webhook pipelines and <span className="text-accent-soft font-semibold">n8n automation</span>.
      I care about clean systems, reliable delivery and removing manual work. Let's build something that lasts.
    </motion.p>

    <motion.div
      variants={fadeIn("up", "spring", 0.2, 1)}
      className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[14px] font-mono text-secondary"
    >
      <span className="flex items-center gap-2">
        <Icon name="mapPin" size={16} className="text-accent-2" /> {profile.location}
      </span>
      <span className="flex items-center gap-2">
        <Icon name="check" size={16} className="text-accent-2" /> 5+ years experience
      </span>
      <span className="flex items-center gap-2">
        <Icon name="check" size={16} className="text-accent-2" /> Available for freelance & contract
      </span>
    </motion.div>

    <div className="mt-16 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5">
      {services.map((service, index) => (
        <ServiceCard key={service.key} index={index} {...service} />
      ))}
    </div>
  </>
);

export default SectionWrapper(About, "about");
