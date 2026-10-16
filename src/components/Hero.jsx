import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { styles } from "../style";
import { profile, stats } from "../constants";
import Icon from "./Icon";
import Counter from "./Counter";
import AnimatedGrid from "./AnimatedGrid";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const socials = [
  { name: "github", href: profile.github, label: "GitHub" },
  { name: "linkedin", href: profile.linkedin, label: "LinkedIn" },
  { name: "mail", href: `mailto:${profile.email}`, label: "Email" },
];

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto hero-bg overflow-hidden">
      <AnimatedGrid />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`${styles.paddingX} relative z-10 max-w-7xl mx-auto min-h-screen grid lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-32 pb-24`}
      >
        {/* ---------- Left: intro ---------- */}
        <div className="lg:col-span-7 flex flex-col">
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
            <Icon name="mapPin" size={13} /> {profile.locationFull}
          </motion.p>

          <motion.h1 variants={item} className={styles.heroHeadText}>
            Hi, I'm <span className="text-gradient-accent">{profile.firstName}</span>.{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient">{profile.role}.</span>
          </motion.h1>

          <motion.p variants={item} className={`${styles.heroSubText} mt-6 max-w-2xl`}>
            {profile.heroIntro}
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

          {/* Social rail */}
          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid place-items-center w-10 h-10 rounded-xl glass text-secondary hover:text-accent-2 hover:border-accent/40 transition-colors"
              >
                <Icon name={s.name} size={18} filled={s.name === "github"} />
              </a>
            ))}
            <span className="h-6 w-px bg-white/10 mx-1" />
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="text-secondary hover:text-white transition-colors text-[13px] font-mono"
            >
              {profile.phone}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-12 w-full max-w-2xl rounded-2xl glass-strong !border-0 overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="group relative px-5 py-5 transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  {/* top accent line on hover */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent/10 text-accent-2 ring-1 ring-inset ring-white/5 transition-colors duration-300 group-hover:bg-accent/15">
                    <Icon name={s.icon} size={16} strokeWidth={1.7} />
                  </span>

                  <div className="mt-3.5 flex items-baseline font-display text-[27px] sm:text-[31px] font-extrabold tracking-tight leading-none tabular-nums text-white">
                    <Counter to={s.to} decimals={s.decimals || 0} prefix={s.prefix || ""} />
                    {s.suffix && (
                      <span className="text-accent-2">{s.suffix}</span>
                    )}
                  </div>

                  <div className="mt-2 text-[11.5px] text-secondary leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Right: 3D portrait ---------- */}
        <motion.div
          variants={item}
          className="lg:col-span-5 relative flex justify-center lg:justify-end portrait-stage"
        >
          <div className="relative w-[280px] xs:w-[320px] sm:w-[360px]">
            {/* Ambient glow behind the card */}
            <div className="absolute -inset-10 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(124,92,255,0.35),transparent_70%)] blur-2xl" />

            <Tilt
              options={{ max: 12, scale: 1.03, speed: 700, glare: true, "max-glare": 0.25 }}
              className="relative"
            >
              <div className="ring-rotate portrait-frame aspect-[3/4]">
                <img src={profile.photo} alt={`${profile.name} — ${profile.shortRole}`} />
              </div>
            </Tilt>

            {/* Floating: coding/terminal chip */}
            <div
              className="float-badge absolute -bottom-6 -right-4 sm:-right-10 !flex-col !items-start !gap-1.5 !px-3.5 !py-3 min-w-[190px] animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                <span className="ml-1.5 text-secondary text-[10px] font-mono">zsh — deploy</span>
              </div>
              <span className="text-accent-2 text-[11.5px] font-mono">$ ship --prod</span>
              <span className="text-secondary text-[11px] font-mono">
                ✓ live in 42s · 0 downtime
              </span>
            </div>
          </div>
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
