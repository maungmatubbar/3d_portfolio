import React from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { ComputersCanvas } from "./canvas";
import { profile, stats } from "../constants";
import Icon from "./Icon";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto hero-bg overflow-hidden">
      {/* 3D computer sits behind, lower-right */}
      <div className="absolute inset-0 top-[90px] z-0 opacity-90">
        <ComputersCanvas />
      </div>
      {/* scrim so text stays readable over the 3D scene */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-primary/40 via-transparent to-primary pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary via-primary/50 to-transparent pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`${styles.paddingX} relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-center pt-28 pb-20`}
      >
        <motion.div variants={item} className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-2" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-2" />
          </span>
          <span className="font-mono text-[12px] sm:text-[13px] tracking-wide text-secondary">
            {profile.availability}
          </span>
        </motion.div>

        <motion.p variants={item} className="kicker mb-5 w-fit">
          <Icon name="spark" size={13} /> {profile.location}
        </motion.p>

        <motion.h1 variants={item} className={styles.heroHeadText}>
          Hi, I'm <span className="text-gradient-accent">{profile.firstName}</span>.
          <br className="hidden sm:block" />
          <span className="text-gradient">{profile.role}.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className={`${styles.heroSubText} mt-6 max-w-2xl`}
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#work" className="btn-primary">
            View my work <Icon name="arrow" size={18} />
          </a>
          <a href="#contact" className="btn-ghost">
            <Icon name="mail" size={18} /> Let's talk
          </a>
          <a
            href={profile.resumeUrl}
            download="Mong_Mong_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <Icon name="download" size={18} /> Resume
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden glass max-w-3xl"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-black-200/40 p-5">
              <div className="font-display text-[26px] sm:text-[30px] font-extrabold text-gradient-accent">
                {s.value}
              </div>
              <div className="mt-1 text-[12px] text-secondary leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute xs:bottom-8 bottom-6 w-full flex justify-center items-center z-10">
        <a href="#about" aria-label="Scroll to about">
          <div className="w-[32px] h-[58px] rounded-3xl border-2 border-secondary/40 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 22, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: "loop" }}
              className="w-2.5 h-2.5 rounded-full bg-accent-2"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
