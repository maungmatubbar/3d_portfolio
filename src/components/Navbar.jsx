import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  // Scroll-spy: highlight the nav link for whichever section is in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => {
        const anchor = document.getElementById(l.id);
        const el = anchor ? anchor.closest("section") || anchor.parentElement : null;
        return el ? { id: l.id, el } : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const idByEl = new Map(sections.map((s) => [s.el, s.id]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(idByEl.get(entry.target));
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
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
                active === link.id ? "text-white" : "text-secondary"
              } hover:text-white text-[15px] font-medium cursor-pointer transition-colors duration-300`}
              onClick={() => setActive(link.id)}
            >
              <a href={`#${link.id}`} className="relative group">
                {link.title}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-accent-gradient transition-all duration-300 ${
                    active === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
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

        {/* Mobile trigger */}
        <button
          aria-label="Open menu"
          onClick={() => setToggle(true)}
          className="md:hidden grid place-items-center w-10 h-10 rounded-lg glass text-white"
        >
          <Icon name="menu" size={20} />
        </button>

        {/* Mobile drawer — portaled to <body> so the nav's `transform-gpu`
            doesn't become its containing block (which would clip this fixed
            overlay to the nav's height and let the page show through). */}
        {createPortal(
          <AnimatePresence>
            {toggle && (
              <motion.div
                key="drawer-root"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setToggle(false)}
              className="md:hidden fixed inset-0 z-50 bg-black/70"
            >
              <motion.aside
                key="drawer-panel"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.33, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundColor: "#0a0a14" }}
                className="absolute top-0 right-0 flex h-full w-[80%] max-w-[320px] flex-col border-l border-white/10 shadow-2xl p-6"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent-gradient text-primary font-display font-extrabold text-[15px]">
                      M
                    </span>
                    <span className="text-white font-bold text-[15px] tracking-tight">
                      {profile.name}
                    </span>
                  </span>
                  <button
                    aria-label="Close menu"
                    onClick={() => setToggle(false)}
                    className="grid place-items-center w-9 h-9 rounded-lg glass text-secondary hover:text-white transition-colors"
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>

                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={() => {
                          setToggle(false);
                          setActive(link.id);
                        }}
                        className={`${
                          active === link.id ? "text-white bg-white/5" : "text-secondary"
                        } block rounded-xl px-4 py-3 text-[16px] font-medium transition-colors hover:bg-white/5 hover:text-white`}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href={profile.resumeUrl}
                  download="Mong_Mong_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setToggle(false)}
                  className="btn-primary mt-auto justify-center"
                >
                  <Icon name="download" size={16} />
                  Download Resume
                </a>
              </motion.aside>
            </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </nav>
  );
};

export default Navbar;
