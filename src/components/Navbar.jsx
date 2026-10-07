import React, { useEffect, useState } from "react";
import { styles } from "../style";
import { navLinks, profile } from "../constants";
import Icon from "./Icon";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full fixed top-0 z-30 transform-gpu">
      {/* Single, always-composited blur layer — we only fade its opacity on
          scroll instead of toggling backdrop-filter on/off, which eliminates
          the repaint flicker caused by a blurring fixed element over the
          fixed atmospheric grid. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-white/5 transition-opacity duration-300 will-change-[opacity]"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(8,8,15,0.72)",
          opacity: scrolled ? 1 : 0,
        }}
      />
      <div
        className={`${styles.paddingX} relative w-full flex justify-between items-center max-w-7xl mx-auto transition-[padding] duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <a
          href="#"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-accent-gradient text-primary font-display font-extrabold text-[18px] shadow-glow">
            M
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-white text-[16px] font-bold tracking-tight">
              {profile.name}
            </span>
            <span className="text-secondary text-[11px] font-mono tracking-wide">
              {profile.shortRole}
            </span>
          </span>
        </a>

        <ul className="list-none hidden md:flex flex-row items-center gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[15px] font-medium cursor-pointer transition-colors duration-300`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`} className="relative group">
                {link.title}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent-gradient transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <a
            href={profile.resumeUrl}
            download="Mong_Mong_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost !py-2 !px-4 text-[14px]"
          >
            <Icon name="download" size={16} />
            Resume
          </a>
        </ul>

        {/* Mobile */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <button
            aria-label="Toggle menu"
            onClick={() => setToggle(!toggle)}
            className="grid place-items-center w-10 h-10 rounded-lg glass"
          >
            <Icon name={toggle ? "arrow" : "code"} size={20} className="text-white" />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 glass-strong absolute top-16 right-4 my-2 min-w-[200px] z-20 rounded-2xl flex-col gap-1`}
          >
            <ul className="list-none flex flex-col gap-1 w-full">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => {
                      setToggle(false);
                      setActive(link.title);
                    }}
                    className={`${
                      active === link.title ? "text-white bg-white/5" : "text-secondary"
                    } block px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 text-[15px] font-medium transition-colors`}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
              <a
                href={profile.resumeUrl}
                download="Mong_Mong_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-2 btn-primary justify-center text-[14px]"
              >
                <Icon name="download" size={16} />
                Download Resume
              </a>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
