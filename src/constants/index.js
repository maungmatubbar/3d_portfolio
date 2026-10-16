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
  // Short, punchy intro for the hero (kept distinct from the longer About bio)
  heroIntro:
    "I design, build and ship production software end to end — from typed React interfaces to hardened cloud infrastructure and the automation that keeps it all running.",
  location: "Dhaka, Bangladesh",
  locationFull: "Vatara, Dhaka, Bangladesh",
  availability: "Available for select freelance & contract work",
  availabilityShort: "Open to work",
  email: "maungmatubbar@gmail.com",
  phone: "+880 1726969417",
  linkedin: "https://linkedin.com/in/mong-mong",
  github: "https://github.com/",
  // Portrait used across the hero / about (optimized copy lives in /public)
  photo: "/mong.png",
  // Branded, print-optimized resume generated from /resume/resume.html
  // (regenerate with: npm run resume). Edit the HTML, then rebuild.
  resumeUrl: "/Mong_Mong_Resume.pdf",
};

export const navLinks = [
  { id: "about", title: "About" },
  { id: "services", title: "Services" },
  { id: "experience", title: "Experience" },
  { id: "work", title: "Work" },
  { id: "stack", title: "Stack" },
  { id: "contact", title: "Contact" },
];

// Hero + about outcome metrics. `to` drives the count-up animation,
// `suffix`/`prefix` wrap it, `decimals` keeps values like 99.9 intact.
// Focused on delivered results — not years on a clock.
export const stats = [
  { label: "Production systems shipped", to: 20, suffix: "+", icon: "rocket" },
  { label: "Automations shipped", to: 30, suffix: "+", icon: "bolt" },
  { label: "Cloud uptime maintained", to: 99.9, suffix: "%", decimals: 1, icon: "cloud" },
  { label: "Payment gateways integrated", to: 5, suffix: "+", icon: "cart" },
];

// Short, scannable value props shown in the About section
export const highlights = [
  "Own problems end to end — data model, API, UI and the infrastructure under it.",
  "Translate business goals into systems that cut cost and manual work.",
  "Fluent across React/Next.js, NestJS/Node, Django & Laravel and AWS.",
  "Integrate real payment gateways, webhooks and n8n pipelines in production.",
];

// Spoken / written languages
export const languages = [
  { name: "Bengali", level: "Native" },
  { name: "English", level: "Professional" },
];

// Quick, scannable facts for the profile card
export const quickFacts = [
  { icon: "mapPin", label: "Based in", value: "Dhaka, Bangladesh" },
  { icon: "layers", label: "Works with", value: "React · NestJS · AWS" },
  { icon: "spark", label: "Focus", value: "SaaS · Logistics · AI" },
  { icon: "mail", label: "Availability", value: "Freelance & contract" },
];

// How I work — business-first, problem-solving methodology
export const approach = [
  {
    icon: "spark",
    title: "Start with the business problem",
    desc: "I map the real bottleneck and what it costs, then design the smallest system that removes it — not the biggest one I could build.",
  },
  {
    icon: "layers",
    title: "Architect for scale & cost",
    desc: "Reliable, maintainable systems that stay affordable to run. Clean data models, typed APIs and infrastructure that won't surprise you.",
  },
  {
    icon: "bolt",
    title: "Automate the manual work",
    desc: "Webhooks, n8n pipelines and AI tooling that eliminate repetitive tasks, cut human error and free the team to focus on growth.",
  },
  {
    icon: "shield",
    title: "Ship, measure, harden",
    desc: "Iterate to production fast, watch the numbers, then secure and optimize — zero-downtime releases backed by automated tests.",
  },
];

// Tangible business outcomes delivered (qualitative, not inflated numbers)
export const businessImpact = [
  "Manual data entry removed end to end",
  "Real-time payment reconciliation",
  "Rollback-safe production deploys",
  "Logistics, CRM & HR synced automatically",
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

// System map — the four workstreams I run, each flowing left→right from a
// real-world trigger through the service I build to the platform surface and
// the business outcome. Powers the interactive "Services" section.
export const systemMap = {
  columns: ["Trigger", "Service", "Platform surface", "Outcome"],
  lanes: [
    {
      key: "qa",
      kind: "Automation",
      icon: "flask",
      name: "QA Automation & DevOps",
      filterLabel: "QA & DevOps",
      steps: [
        {
          title: "Test runs & events",
          desc: "Test suites and webhook events fired from internal systems.",
        },
        {
          title: "Playwright & n8n",
          desc: "TypeScript E2E suites and multi-step automation workflows.",
        },
        {
          title: "Core journeys",
          chips: ["Login", "Signup", "Order", "Payment", "Buy For Me", "Ship For Me"],
        },
        {
          title: "Environments in sync",
          desc: "Managed servers and DB hosts — internal systems kept in sync, zero-downtime deploys.",
        },
      ],
    },
    {
      key: "backend",
      kind: "Development",
      icon: "server",
      name: "Backend modules & business engines",
      filterLabel: "Backend modules",
      steps: [
        {
          title: "Customer & ops requests",
          desc: "Orders, shipments and staff adjustments from the operations team.",
        },
        {
          title: "Backend services",
          desc: "NestJS / Django order-processing and invoice-generation engines.",
        },
        {
          title: "Business modules",
          chips: [
            "Buy For Me",
            "Shipment invoices",
            "Discounts & coupons",
            "Salary generation",
            "Customer profiles",
          ],
        },
        {
          title: "Audit-friendly records",
          desc: "Filterable, trackable invoices and fully logged adjustments.",
        },
      ],
    },
    {
      key: "chatshop",
      kind: "Development",
      icon: "chat",
      name: "ChatShop AI & conversational commerce",
      filterLabel: "ChatShop & AI",
      steps: [
        {
          title: "Customer conversations",
          desc: "Support requests and shopping questions arriving in chat.",
        },
        {
          title: "AI chatbot",
          desc: "Claude-assisted automated support and conversational commerce.",
        },
        {
          title: "ChatShop",
          chips: ["AI web scraping", "Caching layer", "Real-time data"],
        },
        {
          title: "Automated support",
          desc: "Support workflows and data lookups that run without manual steps.",
        },
      ],
    },
    {
      key: "payments",
      kind: "Development",
      icon: "cart",
      name: "Payment & logistics integrations",
      filterLabel: "Payments & logistics",
      steps: [
        {
          title: "Checkout & delivery",
          desc: "Payments and shipments initiated from the storefronts.",
        },
        {
          title: "Gateway APIs",
          chips: ["Stripe", "SSLCommerz", "Pathao"],
        },
        {
          title: "Store platforms",
          chips: ["WooCommerce", "Magento"],
        },
        {
          title: "Catalog in sync",
          desc: "Import/export routines and inventory configuration kept consistent.",
        },
      ],
    },
  ],
};

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
    tech: ["Next.js", "NestJS", "AWS", "Nginx", "Docker", "n8n", "Stripe", "SSLCommerz", "Playwright", "Claude API"],
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
    tech: ["PHP", "Laravel", "MySQL", "POS", "RBAC", "AJAX"],
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
    tech: ["PHP (OOP)", "Laravel", "MySQL", "AJAX", "RBAC"],
  },
];

export const projects = [
  {
    name: "The School of Eternity",
    subtitle: "Online Learning & Community Platform",
    description:
      "A modern e-learning platform delivering structured courses and community content through a fast, responsive interface backed by a scalable content API and cloud hosting.",
    highlights: [
      "Course & content delivery",
      "Responsive, SEO-friendly UI",
      "Scalable cloud deployment",
    ],
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "React", color: "green-text-gradient" },
      { name: "Node.js", color: "pink-text-gradient" },
      { name: "AWS", color: "blue-text-gradient" },
    ],
    theme: ["#7c5cff", "#4ff0c5"],
    glyph: "cap",
    source_code_link: "",
    live_link: "https://theschoolofeternity.org/",
  },
  {
    name: "myBidesh",
    subtitle: "Overseas Services Web App",
    description:
      "A web application serving Bangladeshis living and working abroad — account-based dashboards, secure transactions and service workflows, engineered for reliability on hardened cloud infrastructure.",
    highlights: [
      "Account-based dashboards",
      "Secure transaction flows",
      "Cloud-hosted & hardened",
    ],
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "NestJS", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
      { name: "AWS", color: "blue-text-gradient" },
    ],
    theme: ["#4ff0c5", "#7c5cff"],
    glyph: "globe",
    source_code_link: "",
    live_link: "https://app.mybidesh.com/",
  },
  {
    name: "Nahid24",
    subtitle: "E-Commerce & Content Platform",
    description:
      "A Bengali e-commerce and content platform for books and publications — a web storefront paired with native iOS/Android apps, an integrated cart and a multi-channel content hub.",
    highlights: [
      "Web + iOS / Android apps",
      "Cart & checkout flow",
      "Content & media hub",
    ],
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "React", color: "green-text-gradient" },
      { name: "Node.js", color: "pink-text-gradient" },
      { name: "Payments", color: "blue-text-gradient" },
    ],
    theme: ["#7c5cff", "#b9a8ff"],
    glyph: "cart",
    source_code_link: "",
    live_link: "https://nahid24.com/",
  },
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
