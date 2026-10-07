import React from "react";
import { profile, navLinks } from "../constants";
import Icon from "./Icon";

const Footer = () => (
  <footer className="relative z-10 border-t border-white/5 bg-black-200/60">
    <div className="max-w-7xl mx-auto sm:px-16 px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-sm">
          <a href="#" className="flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-accent-gradient text-primary font-display font-extrabold text-[18px]">
              M
            </span>
            <span className="text-white font-bold tracking-tight">{profile.name}</span>
          </a>
          <p className="mt-4 text-secondary text-[14px] leading-[22px]">
            {profile.shortRole} building reliable, automated systems from frontend to cloud.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-secondary hover:text-white transition-colors text-[14px]"
            >
              {l.title}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid place-items-center w-10 h-10 rounded-xl glass hover:text-accent-2 text-white transition-colors"
          >
            <Icon name="github" size={18} filled />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid place-items-center w-10 h-10 rounded-xl glass hover:text-accent-2 text-white transition-colors"
          >
            <Icon name="linkedin" size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid place-items-center w-10 h-10 rounded-xl glass hover:text-accent-2 text-white transition-colors"
          >
            <Icon name="mail" size={18} />
          </a>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-secondary text-[13px] font-mono">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="text-secondary/70 text-[13px] font-mono">
          Built with React · Three.js · NestJS · n8n
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
