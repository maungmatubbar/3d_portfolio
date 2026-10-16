import React from "react";
import { motion } from "framer-motion";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import SectionHeading from "./SectionHeading";
import Icon from "./Icon";

// --- Duration helper: turns "Nov 2022 — Present" into "3 yrs 11 mos" ---
const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

const parseMonthYear = (str) => {
  const s = str.trim();
  if (/present|now/i.test(s)) return new Date();
  const [mon, year] = s.split(/\s+/);
  const m = MONTHS[mon?.slice(0, 3)];
  if (m === undefined || !year) return null;
  return new Date(Number(year), m, 1);
};

const formatDuration = (range) => {
  const [startStr, endStr] = range.split("—").map((p) => p.trim());
  const start = parseMonthYear(startStr);
  const end = parseMonthYear(endStr || "Present");
  if (!start || !end) return "";
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  months = Math.max(months, 1);
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  const parts = [];
  if (yrs) parts.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
  if (mos) parts.push(`${mos} mo${mos > 1 ? "s" : ""}`);
  return parts.join(" ");
};

const CurrentBadge = () => (
  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold font-mono px-2.5 py-1 rounded-full bg-accent-2/10 border border-accent-2/30 text-accent-2">
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-2" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-2" />
    </span>
    Current
  </span>
);

const ExperienceItem = ({ experience, index, isLast }) => {
  const duration = formatDuration(experience.date);
  const isCurrent = /present|now/i.test(experience.date);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.12, 0.7)}
      className={`relative flex gap-5 sm:gap-7 ${!isLast ? "pb-9" : ""}`}
    >
      {/* ---------- Left rail: dates (desktop) ---------- */}
      <div className="hidden lg:flex w-[150px] shrink-0 flex-col items-end pt-6 text-right">
        <span className="font-mono text-[12.5px] tracking-wide text-accent-soft">
          {experience.date}
        </span>
        {duration && (
          <span className="mt-1 font-mono text-[11.5px] text-secondary/70">{duration}</span>
        )}
        {isCurrent && <span className="mt-2.5">{CurrentBadge()}</span>}
      </div>

      {/* ---------- Node + spine ---------- */}
      <div className="relative flex flex-col items-center">
        <span
          className="relative z-10 grid place-items-center w-12 h-12 rounded-xl font-display font-extrabold text-[18px] glass-strong"
          style={{
            color: experience.iconBg,
            boxShadow: `inset 0 0 0 1px ${experience.iconBg}55, 0 10px 28px -14px ${experience.iconBg}`,
          }}
        >
          {experience.initials}
        </span>
        {!isLast && (
          <span className="w-px flex-1 mt-3 bg-gradient-to-b from-white/15 via-white/[0.06] to-transparent" />
        )}
      </div>

      {/* ---------- Content card ---------- */}
      <div className="card-grad group flex-1 p-6 sm:p-8">
        <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[1fr_200px]">
          {/* main */}
          <div>
            {/* dates inline on mobile/tablet */}
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 lg:hidden">
              <span className="font-mono text-[12.5px] text-accent-soft">{experience.date}</span>
              {duration && (
                <span className="font-mono text-[11.5px] text-secondary/70">· {duration}</span>
              )}
              {isCurrent && CurrentBadge()}
            </div>

            <h3 className="text-white text-[20px] sm:text-[22px] font-bold font-display tracking-tight">
              {experience.title}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-accent-soft">
                <Icon name="briefcase" size={14} className="text-secondary/60" />
                {experience.company_name}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-mono text-secondary">
                <Icon name="mapPin" size={13} /> {experience.location}
              </span>
            </div>

            <div className="my-6 h-px bg-white/[0.06]" />

            <ul className="grid gap-3">
              {experience.points.map((point, i) => (
                <li
                  key={`point-${index}-${i}`}
                  className="flex items-start gap-3 text-white-100/75 text-[14px] leading-[23px]"
                >
                  <span className="grid place-items-center w-[18px] h-[18px] mt-[2px] shrink-0 rounded-md bg-accent-2/[0.08] border border-accent-2/20 text-accent-2">
                    <Icon name="check" size={11} strokeWidth={2.6} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* tech used */}
          {experience.tech?.length > 0 && (
            <div className="lg:border-l lg:border-white/[0.06] lg:pl-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary/60">
                Tech used
              </span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {experience.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-black-200/50 px-2 py-[3px] font-mono text-[10.5px] text-white-100/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => (
  <>
    <SectionHeading
      index="04"
      eyebrow="Career so far"
      title="Work experience."
      desc="Shipping production systems across logistics, SaaS and enterprise software — owning each one from architecture and APIs to deployment and automation."
    />

    <div className="mt-14 flex flex-col">
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={`exp-${index}`}
          experience={experience}
          index={index}
          isLast={index === experiences.length - 1}
        />
      ))}
    </div>
  </>
);

export default SectionWrapper(Experience, "experience");
