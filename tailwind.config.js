/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Deep near-black navy base
        primary: "#06060b",
        "primary-900": "#0a0a14",
        secondary: "#9ca3c4", // muted slate-violet text
        tertiary: "#101019",
        "black-100": "#0d0d17",
        "black-200": "#08080f",
        "white-100": "#f4f4f8",
        // Accent system — signature violet + cyan/mint
        accent: "#7c5cff",
        "accent-2": "#4ff0c5",
        "accent-soft": "#b9a8ff",
        ink: "#e9e9f2",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Manrope"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0px 35px 120px -25px rgba(124,92,255,0.25)",
        glow: "0 0 0 1px rgba(124,92,255,0.25), 0 20px 60px -20px rgba(124,92,255,0.45)",
        "glow-cyan": "0 0 0 1px rgba(79,240,197,0.25), 0 20px 60px -20px rgba(79,240,197,0.35)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(60% 50% at 50% 0%, rgba(124,92,255,0.18) 0%, rgba(6,6,11,0) 70%)",
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "accent-gradient": "linear-gradient(135deg, #7c5cff 0%, #4ff0c5 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%,100%": { transform: "scale(1.8)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        marquee: "marquee 32s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
