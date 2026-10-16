import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { profile } from "../constants";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import AnimatedGrid from "./AnimatedGrid";
import Icon from "./Icon";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    honeypot: "", // anti-spam: must stay empty
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [copied, setCopied] = useState(false);
  const loading = status.state === "sending";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", message: "" });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = Array.isArray(data?.message)
          ? data.message.join(" · ")
          : data?.message || "Something went wrong. Please try again.";
        setStatus({ state: "error", message: msg });
        return;
      }

      setStatus({
        state: "success",
        message:
          data?.message ||
          "Thanks — your message is on its way. I'll get back to you soon.",
      });
      setForm({ name: "", email: "", company: "", message: "", honeypot: "" });
    } catch (err) {
      setStatus({
        state: "error",
        message:
          "Couldn't reach the server. Make sure the API is running (npm run start:dev in /server) or email me directly.",
      });
    }
  };

  const inputClass =
    "bg-black-200/60 border border-white/10 py-3.5 px-4 placeholder:text-secondary/60 text-white rounded-xl outline-none font-medium transition-colors focus:border-accent/60 focus:bg-black-200/80";

  return (
    <div className="xl:mt-10 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] glass-strong p-8 rounded-3xl"
      >
        <div className="flex items-center gap-4">
          <span className="section-index">09</span>
          <span className="kicker">Get in touch</span>
        </div>
        <h3 className={`${styles.sectionHeadText} mt-4`}>Let's work together.</h3>
        <p className="mt-4 text-secondary text-[15px] leading-[24px] max-w-lg">
          Have a project, a role, or an automation idea? Drop a message — it runs
          through a live NestJS API and n8n pipeline, not a mailto link.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
        >
          {/* Honeypot (hidden from humans) */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2 text-[14px]">Your name</span>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className={inputClass}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2 text-[14px]">Company (optional)</span>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Acme Co"
                className={inputClass}
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 text-[14px]">Your email</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@company.com"
              className={inputClass}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 text-[14px]">Your message</span>
            <textarea
              rows={6}
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project, timeline and goals…"
              className={inputClass}
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? "Sending…" : "Send message"}
              {!loading && <Icon name="arrow" size={18} />}
            </button>

            {status.state === "success" && (
              <span className="flex items-center gap-2 text-accent-2 text-[14px] font-medium">
                <Icon name="check" size={18} /> {status.message}
              </span>
            )}
            {status.state === "error" && (
              <span className="text-[13px] text-red-300/90 font-medium max-w-xs">
                {status.message}
              </span>
            )}
          </div>
        </form>

        {/* Direct contact details */}
        <div className="mt-9 pt-6 border-t border-white/5 grid gap-2.5">
          {/* Email row with copy-to-clipboard */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black-200/40 px-4 py-3 transition-colors hover:border-white/20">
            <a
              href={`mailto:${profile.email}`}
              className="group flex min-w-0 items-center gap-3 text-secondary transition-colors hover:text-white"
            >
              <Icon name="mail" size={18} className="shrink-0 text-accent-soft" />
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary/50">
                  Email
                </span>
                <span className="truncate text-[14px]">{profile.email}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                copied
                  ? "border-accent-2/40 bg-accent-2/10 text-accent-2"
                  : "border-white/10 bg-white/[0.03] text-secondary hover:text-white"
              }`}
            >
              <Icon name={copied ? "check" : "copy"} size={13} strokeWidth={2.2} />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {/* Phone + location */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1 pt-1">
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2.5 text-secondary hover:text-white transition-colors text-[13.5px]"
            >
              <Icon name="phone" size={16} className="text-accent-soft" /> {profile.phone}
            </a>
            <span className="flex items-center gap-2.5 text-secondary text-[13.5px]">
              <Icon name="mapPin" size={16} className="text-accent-soft" /> {profile.location}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="relative xl:flex-1 xl:h-[600px] md:h-[550px] h-[380px] rounded-3xl overflow-hidden"
      >
        <AnimatedGrid variant="subtle" />
        <div className="relative z-10 w-full h-full">
          <CanvasErrorBoundary>
            <EarthCanvas />
          </CanvasErrorBoundary>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
