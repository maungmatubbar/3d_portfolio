// ----------------------------------------------------------------------------
// Portfolio content — Mong Mong, Senior Full-Stack & DevOps Engineer
// Pure data (no asset imports): components render SVG icons & generated covers.
// ----------------------------------------------------------------------------

export const profile = {
  name: "Mong Mong",
  firstName: "Mong",
  role: "Senior Full-Stack & DevOps Engineer",
  shortRole: "Full-Stack & DevOps Engineer",
  tagline:
    "I architect and ship enterprise SaaS platforms, global logistics networks, and AI-augmented systems — end to end, from React interfaces to hardened cloud infrastructure.",
  location: "Dhaka, Bangladesh",
  availability: "Available for select freelance & contract work",
  email: "maungmatubbar@gmail.com",
  phone: "+880 1726969417",
  linkedin: "https://linkedin.com/in/mong-mong",
  github: "https://github.com/",
  // Branded, print-optimized resume generated from /resume/resume.html
  // (regenerate with: npm run resume). Edit the HTML, then rebuild.
  resumeUrl: "/Mong_Mong_Resume.pdf",
};

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "work", title: "Work" },
  { id: "stack", title: "Stack" },
  { id: "contact", title: "Contact" },
];

export const stats = [
  { label: "Years of experience", value: "5+" },
  { label: "Production systems shipped", value: "20+" },
  { label: "Cloud uptime maintained", value: "99.9%" },
  { label: "Automations orchestrated", value: "n8n" },
];

// What I do — rendered with inline SVG icons (see About.jsx iconMap)
export const services = [
  {
    key: "fullstack",
    title: "Full-Stack Web Apps",
    icon: "layers",
    desc: "End-to-end product delivery with React, Next.js (App Router, SSR/SSG) and TypeScript on top of robust, typed APIs.",
  },
  {
    key: "backend",
    title: "Backend & APIs",
    icon: "server",
    desc: "Scalable services with NestJS, Node/Express, Django and Laravel — REST, webhooks, payments and microservices.",
  },
  {
    key: "devops",
    title: "DevOps & Cloud",
    icon: "cloud",
    desc: "AWS (EC2, S3, CloudFront, Lambda) and Linux VPS with Nginx, Docker, CI/CD, SSL hardening and auto-healing.",
  },
  {
    key: "automation",
    title: "Automation & AI",
    icon: "bolt",
    desc: "n8n workflow orchestration, webhook pipelines and Claude/AI-assisted systems that remove manual, repetitive work.",
  },
];

// Categorized tech stack — rendered as glass chips grouped by domain
export const techStack = [
  {
    category: "Frontend",
    icon: "layout",
    accent: "#4ff0c5",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Three.js",
      "Bootstrap",
    ],
  },
  {
    category: "Backend",
    icon: "server",
    accent: "#7c5cff",
    items: [
      "NestJS",
      "Node.js",
      "Express.js",
      "Django (Python)",
      "Laravel (PHP/OOP)",
      "REST APIs",
      "Webhooks",
      "Microservices",
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "cloud",
    accent: "#4ff0c5",
    items: ["AWS", "Docker", "Nginx", "Linux VPS", "CI/CD", "SSL / Hardening"],
  },
  {
    category: "Databases",
    icon: "database",
    accent: "#7c5cff",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    category: "Automation & AI",
    icon: "bolt",
    accent: "#4ff0c5",
    items: ["n8n", "Claude AI API", "Cursor AI", "Webhook Orchestration"],
  },
  {
    category: "Payments & Testing",
    icon: "shield",
    accent: "#7c5cff",
    items: ["Stripe", "SSLCommerz", "bKash", "Playwright (E2E)", "Unit / Integration"],
  },
];

export const experiences = [
  {
    title: "Full-Stack & DevOps Engineer",
    company_name: "woow bd — Woow Global Ecosystem",
    initials: "W",
    iconBg: "#7c5cff",
    date: "Nov 2022 — Present",
    location: "Dhaka, Bangladesh",
    points: [
      "Architected and deployed enterprise software — custom Logistics Management Systems, HRMS portals and CRM platforms for Woow Global.",
      "Engineered high-concurrency cloud infrastructure on AWS (EC2, S3, CloudFront) and Linux VPS with Nginx hardening, auto-healing scripts and SSL.",
      "Integrated multi-channel payment gateways (Stripe, SSLCommerz, local mobile banking) with webhook listeners for real-time transaction reconciliation.",
      "Streamlined workflows with n8n automation and custom webhooks to sync logistics tracking, CRM leads and internal HR processes.",
      "Leveraged the Claude API and Cursor AI to accelerate backend logic, automate communication pipelines and refactor architecture.",
      "Implemented end-to-end (E2E) automated test suites with Playwright to ensure zero-downtime releases.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "RITE Solutions Ltd.",
    initials: "R",
    iconBg: "#4ff0c5",
    date: "Jan 2021 — Feb 2022",
    location: "rite.com.bd",
    points: [
      "Designed, developed and deployed web application features with PHP & Laravel, maintaining scalable backend logic and clean architecture.",
      "Engineered a custom Point-of-Sale (POS) system — product cataloging, real-time inventory, order processing and transaction reporting.",
      "Optimized relational schema design and SQL queries, improving data-retrieval speed and overall system efficiency.",
      "Implemented authentication, authorization and role-based access control (RBAC) for administrative and retail users.",
      "Resolved performance bottlenecks and ran regular refactoring to maximize application uptime and reliability.",
    ],
  },
  {
    title: "Web Developer Trainee & Project Apprentice",
    company_name: "BITM (BASIS)",
    initials: "B",
    iconBg: "#7c5cff",
    date: "Feb 2022 — Nov 2022",
    location: "Karwan Bazar, Dhaka",
    points: [
      "Engineered enterprise web modules using native PHP (OOP), the Laravel framework, MySQL and modern frontend technologies.",
      "Designed normalized relational database schemas, role-based access control (RBAC) and AJAX-driven data-processing layers.",
      "Completed PHP with Laravel Framework certification through the BASIS Institute of Technology & Management.",
    ],
  },
];

export const projects = [
  {
    name: "FlatBook",
    subtitle: "Global Hospitality & Booking System",
    description:
      "Multi-tenant property booking engine with instant payment webhook verification, live availability and AWS S3/EC2 infrastructure provisioning.",
    highlights: [
      "Instant payment webhook verification",
      "Multi-tenant architecture",
      "AWS S3 / EC2 provisioning",
    ],
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "AWS", color: "pink-text-gradient" },
      { name: "Webhooks", color: "blue-text-gradient" },
    ],
    theme: ["#7c5cff", "#4ff0c5"],
    glyph: "building",
    source_code_link: "https://github.com/",
    live_link: "",
  },
  {
    name: "Woow Global Ecosystem",
    subtitle: "Logistics · HRMS · CRM",
    description:
      "Cross-border parcel & freight tracking alongside custom HRMS employee-lifecycle portals and CRM dashboards — unified under one operations platform.",
    highlights: [
      "Cross-border parcel tracking",
      "HRMS employee lifecycle",
      "CRM dashboards + n8n sync",
    ],
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Django", color: "green-text-gradient" },
      { name: "Laravel", color: "pink-text-gradient" },
      { name: "PostgreSQL", color: "blue-text-gradient" },
      { name: "n8n", color: "green-text-gradient" },
    ],
    theme: ["#4ff0c5", "#7c5cff"],
    glyph: "network",
    source_code_link: "https://github.com/",
    live_link: "",
  },
  {
    name: "Ship For Me",
    subtitle: "Automated Logistics Order Parser",
    description:
      "An integration that parses order-confirmation emails from Gmail and pushes them into an automated warehouse system in real time — zero manual data entry.",
    highlights: [
      "Gmail API email parsing",
      "Real-time warehouse sync",
      "n8n webhook orchestration",
    ],
    tags: [
      { name: "Django", color: "green-text-gradient" },
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Gmail API", color: "pink-text-gradient" },
      { name: "n8n", color: "green-text-gradient" },
    ],
    theme: ["#7c5cff", "#b9a8ff"],
    glyph: "bolt",
    source_code_link: "https://github.com/",
    live_link: "",
  },
];

export const testimonials = [
  {
    testimonial:
      "Mong is a rare engineer who owns a problem from the database schema all the way to production infrastructure. Disciplined, dependable and genuinely senior in how he thinks about systems.",
    name: "Habibur Rahman",
    designation: "Lead Instructor",
    company: "BITM (BASIS)",
    initials: "HR",
  },
  {
    testimonial:
      "He rebuilt our logistics and payment flows with webhook-driven reconciliation and n8n automation. What used to be manual, error-prone work now just runs itself — reliably.",
    name: "Operations Lead",
    designation: "Logistics Operations",
    company: "Woow Global",
    initials: "OL",
  },
  {
    testimonial:
      "Our POS and inventory system became noticeably faster and far more stable after Mong's refactoring. Clean code, clear communication, and he hits his deadlines.",
    name: "Product Manager",
    designation: "Product",
    company: "RITE Solutions",
    initials: "PM",
  },
];

export const education = [
  {
    degree: "B.Engg. in Computer Science & Engineering",
    school: "Green University of Bangladesh",
    detail: "CGPA 3.15 / 4.00",
    year: "2022",
  },
  {
    degree: "Diploma in Engineering (Computer Technology)",
    school: "Barishal Polytechnic Institute",
    detail: "CGPA 3.12 / 4.00",
    year: "2018",
  },
];

export const certifications = [
  "PHP with Laravel Framework — BITM (BASIS), 2022",
  "Desktop Application Development (C#.NET) — People and Tech, 2018",
];
