import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { profile } from "../constants";
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
  const loading = status.state === "sending";

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
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Let's work together.</h3>
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
        <div className="mt-9 pt-6 border-t border-white/5 flex flex-col gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 text-secondary hover:text-white transition-colors text-[14px]"
          >
            <Icon name="mail" size={18} className="text-accent-soft" /> {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 text-secondary hover:text-white transition-colors text-[14px]"
          >
            <Icon name="phone" size={18} className="text-accent-soft" /> {profile.phone}
          </a>
          <span className="flex items-center gap-3 text-secondary text-[14px]">
            <Icon name="mapPin" size={18} className="text-accent-soft" /> {profile.location}
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-[600px] md:h-[550px] h-[380px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
