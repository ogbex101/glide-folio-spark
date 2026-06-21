// Niche-aware mock fallbacks. Real Supabase data always wins; mocks only
// fill in when a section has no rows yet. Replace by adding records via the
// admin dashboard.

type AnyRecord = Record<string, any>;

export type NicheMock = {
  settings?: AnyRecord;
  story?: AnyRecord;
  services?: AnyRecord[];
  skills?: AnyRecord[];
  testimonials?: AnyRecord[];
  certifications?: AnyRecord[];
  brandLogos?: AnyRecord[];
};

/* ---------------- Generic defaults (any niche) ---------------- */

const GENERIC: NicheMock = {
  services: [
    { id: "g-svc-1", title: "Strategy & Discovery", description: "Workshops to align goals, audience and success metrics before a single pixel is shipped.", icon: "Compass", is_starred: true, sort_order: 1 },
    { id: "g-svc-2", title: "Design & Prototyping", description: "High-fidelity UI and motion-rich prototypes that feel real before we build.", icon: "Palette", is_starred: true, sort_order: 2 },
    { id: "g-svc-3", title: "Build & Launch", description: "End-to-end implementation with clean, type-safe code and zero-stress deploys.", icon: "Rocket", is_starred: true, sort_order: 3 },
  ],
  skills: [
    { id: "g-sk-1", name: "Strategy", percentage: 90, sort_order: 1 },
    { id: "g-sk-2", name: "Design", percentage: 88, sort_order: 2 },
    { id: "g-sk-3", name: "Delivery", percentage: 92, sort_order: 3 },
  ],
  testimonials: [
    { id: "g-t-1", client_name: "Michael Thompson", role: "CEO, Xperience Games", review_text: "The platform they built for us redefined how we engage with gamers. Smooth, fast and absolutely premium. Our user retention doubled after launch.", rating: 5, photo_url: "", is_starred: true, sort_order: 1 },
    { id: "g-t-2", client_name: "Phid 2.5", role: "CEO, Jobcondi", review_text: "Jobcondi went from idea to fully-functioning job marketplace in record time. The attention to detail in the UI and the backend reliability blew us away.", rating: 5, photo_url: "", is_starred: true, sort_order: 2 },
    { id: "g-t-3", client_name: "Leinad Thomas", role: "CEO, Xpers Streaming App", review_text: "Building a streaming platform is no joke — but they nailed it. Real-time performance, beautiful interface, and the kind of code quality that makes scaling painless.", rating: 5, photo_url: "", is_starred: true, sort_order: 3 },
  ],
};

/* ---------------- Full-Stack / Vibe-Coding Developer ---------------- */

const FULLSTACK: NicheMock = {
  settings: {
    full_name: "Ogbeifun Daniel Osewe",
    title: "Full-Stack Developer & Vibe Coder",
    hero_tagline: "I turn rough ideas into web apps people actually love to use.",
    bio: "I'm a full-stack developer who builds the whole thing — the database, the logic, and the polished, animated interface people actually touch. I care about the small stuff: how fast it loads, how it feels on a cheap phone, whether the next developer can read my code. I move quickly with modern tooling, but I never ship something I wouldn't be proud to put my name on.",
    projects_count: 40,
    happy_clients: 25,
    years_experience: 5,
  },
  story: {
    story_text:
      "It started with a borrowed laptop and a stubborn question: how do these websites actually work? I spent nights breaking things, refreshing the browser, and chasing that small rush when something finally clicked into place. That curiosity never left — it just got bigger. One landing page became a dashboard, a dashboard became a full product, and somewhere along the way building things for other people turned into the thing I'd happily do for free.",
    story_long:
      "I never had a clean, linear start. I learned the way most self-taught developers do — out of order, late at night, and usually because something I wanted to build didn't exist yet. The first time I deployed something to a real URL and sent it to a friend, I was hooked for life. That feeling of \"I thought of this, and now it's live and you can touch it\" is still the reason I do this.\n\nThe early years were messy in the best way. I shipped ugly projects, rewrote them, broke production more than once, and learned that the bugs I hated most were the ones that taught me the most. I stopped chasing clever code and started caring about code the next person could actually read — usually because that next person was me, six months later, with no memory of what I'd written.\n\nOver time I grew from \"can you make this button work\" into building entire products end to end: the database, the API, the auth, the payments, and the polished, animated front end on top. I fell hard for design too — motion, spacing, the tiny details most people feel but never notice. I learned that performance and accessibility aren't extras you bolt on later; they're part of respecting the people who use what you build.\n\nThese days I move fast without cutting corners. I lean into modern tooling and AI-assisted workflows to go from idea to working product in days, then spend my energy where it actually matters — the experience, the reliability, the feel of the thing. I've built gaming platforms, marketplaces, trading dashboards, streaming apps and brand sites, most of them solo, all of them with the same obsession I had on night one.\n\nI'm still that curious kid breaking things to understand them. I just have better tools now — and a much longer list of ideas I can't wait to ship.",
    quote: "As long as there is programming, there is no idea that can't be materialized or digitalized on the web.",
    image_url:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
  },
  services: [
    { id: "fs-svc-1", title: "Full-Stack Web Apps", description: "React, Next.js and TanStack Start apps with type-safe APIs, auth, payments and real-time data.", icon: "Code2", is_starred: true, sort_order: 1 },
    { id: "fs-svc-2", title: "AI-Powered Vibe Coding", description: "Rapid prototyping and production builds using Lovable, Bubble, Builder.io, Cursor and the latest AI tooling.", icon: "Sparkles", is_starred: true, sort_order: 2 },
    { id: "fs-svc-3", title: "UI / UX Engineering", description: "Pixel-perfect interfaces, design systems and Framer Motion micro-interactions that feel premium.", icon: "Palette", is_starred: true, sort_order: 3 },
    { id: "fs-svc-4", title: "Backend & APIs", description: "Postgres, Supabase, edge functions, webhooks and clean REST/GraphQL contracts.", icon: "Database", is_starred: true, sort_order: 4 },
    { id: "fs-svc-5", title: "Performance & SEO", description: "Core Web Vitals, semantic HTML, structured data, image and bundle optimisation.", icon: "Gauge", is_starred: true, sort_order: 5 },
    { id: "fs-svc-6", title: "Maintenance & Iteration", description: "Ongoing feature work, monitoring, bug-fixing and product iteration with predictable capacity.", icon: "Wrench", is_starred: true, sort_order: 6 },
  ],
  // Skills carry an optional `icon` (lucide name) used by the Skills component.
  skills: [
    { id: "fs-sk-1",  name: "JavaScript",            percentage: 96, icon: "Braces",     sort_order: 1 },
    { id: "fs-sk-2",  name: "TypeScript",            percentage: 94, icon: "FileCode",   sort_order: 2 },
    { id: "fs-sk-3",  name: "Python",                percentage: 82, icon: "Terminal",   sort_order: 3 },
    { id: "fs-sk-4",  name: "HTML5 & CSS3",          percentage: 97, icon: "Code",       sort_order: 4 },
    { id: "fs-sk-5",  name: "React & Next.js",       percentage: 95, icon: "Atom",       sort_order: 5 },
    { id: "fs-sk-6",  name: "TanStack Start",        percentage: 90, icon: "Layers",     sort_order: 6 },
    { id: "fs-sk-7",  name: "Tailwind CSS",          percentage: 96, icon: "Wind",       sort_order: 7 },
    { id: "fs-sk-8",  name: "Framer Motion",         percentage: 88, icon: "Sparkles",   sort_order: 8 },
    { id: "fs-sk-9",  name: "Node.js & Bun",         percentage: 90, icon: "Server",     sort_order: 9 },
    { id: "fs-sk-10", name: "Supabase / Postgres",   percentage: 92, icon: "Database",   sort_order: 10 },
    { id: "fs-sk-11", name: "Lovable (Vibe Coding)", percentage: 98, icon: "Heart",      sort_order: 11 },
    { id: "fs-sk-12", name: "Builder.io",            percentage: 87, icon: "Layout",     sort_order: 12 },
    { id: "fs-sk-13", name: "Bubble.io",             percentage: 85, icon: "Boxes",      sort_order: 13 },
    { id: "fs-sk-14", name: "Webflow",               percentage: 88, icon: "Workflow",   sort_order: 14 },
    { id: "fs-sk-15", name: "Figma",                 percentage: 92, icon: "Figma",      sort_order: 15 },
    { id: "fs-sk-16", name: "VS Code",               percentage: 95, icon: "FileCode2",  sort_order: 16 },
    { id: "fs-sk-17", name: "Cursor AI",             percentage: 90, icon: "MousePointer2", sort_order: 17 },
    { id: "fs-sk-18", name: "GitHub & Git",          percentage: 93, icon: "Github",     sort_order: 18 },
    { id: "fs-sk-19", name: "Vercel & Cloudflare",   percentage: 90, icon: "Cloud",      sort_order: 19 },
    { id: "fs-sk-20", name: "Stripe Integrations",   percentage: 86, icon: "CreditCard", sort_order: 20 },
    { id: "fs-sk-21", name: "OpenAI / AI Gateways",  percentage: 88, icon: "Bot",        sort_order: 21 },
    { id: "fs-sk-22", name: "WebRTC & Streaming",    percentage: 83, icon: "Radio",      sort_order: 22 },
  ],
  certifications: [
    { id: "fs-c-1", name: "Meta Front-End Developer", issuer: "Meta / Coursera", date_earned: "2023-08-12", credential_link: "https://coursera.org", badge_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&q=80", sort_order: 1 },
    { id: "fs-c-2", name: "Full-Stack Open", issuer: "University of Helsinki", date_earned: "2023-04-02", credential_link: "https://fullstackopen.com", sort_order: 2 },
    { id: "fs-c-3", name: "Supabase Certified Developer", issuer: "Supabase", date_earned: "2024-02-18", credential_link: "https://supabase.com", sort_order: 3 },
    { id: "fs-c-4", name: "Lovable Vibe-Coding Pro", issuer: "Lovable", date_earned: "2025-01-09", credential_link: "https://lovable.dev", sort_order: 4 },
    { id: "fs-c-5", name: "Builder.io Certified", issuer: "Builder.io", date_earned: "2025-03-15", credential_link: "https://builder.io", sort_order: 5 },
    { id: "fs-c-6", name: "Webflow Expert", issuer: "Webflow", date_earned: "2024-05-21", credential_link: "https://webflow.com", sort_order: 6 },
    { id: "fs-c-7", name: "Bubble Certified Developer", issuer: "Bubble.io", date_earned: "2024-09-30", credential_link: "https://bubble.io", sort_order: 7 },
    { id: "fs-c-8", name: "Stripe Certified Integration", issuer: "Stripe", date_earned: "2024-07-14", credential_link: "https://stripe.com", sort_order: 8 },
    { id: "fs-c-9", name: "Google UX Design", issuer: "Google / Coursera", date_earned: "2022-11-03", credential_link: "https://coursera.org", sort_order: 9 },
    { id: "fs-c-10", name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date_earned: "2024-03-22", credential_link: "https://aws.amazon.com", sort_order: 10 },
  ],
  // Brand logos replaced with the founder's own brands (placeholders for real assets)
  brandLogos: [
    { id: "own-b-1", alt_text: "Xanctum",           bg_color: "#0A0A0F", logo_url: "", is_starred: true, sort_order: 1 },
    { id: "own-b-2", alt_text: "Xperience Games",   bg_color: "#0F0F1A", logo_url: "", is_starred: true, sort_order: 2 },
    { id: "own-b-3", alt_text: "Jobcondi",           bg_color: "#0D1A0D", logo_url: "", is_starred: true, sort_order: 3 },
    { id: "own-b-4", alt_text: "Scholar Forge",      bg_color: "#1A0D00", logo_url: "", is_starred: true, sort_order: 4 },
    { id: "own-b-5", alt_text: "Luxe Estate",        bg_color: "#1A1200", logo_url: "", is_starred: true, sort_order: 5 },
    { id: "own-b-6", alt_text: "Bloom Trader Pro",   bg_color: "#001A0D", logo_url: "", is_starred: true, sort_order: 6 },
    { id: "own-b-7", alt_text: "Vision Mail Research", bg_color: "#001020", logo_url: "", is_starred: true, sort_order: 7 },
    { id: "own-b-8", alt_text: "Alat",               bg_color: "#1A0A00", logo_url: "", is_starred: true, sort_order: 8 },
    { id: "own-b-9", alt_text: "Xpers Streaming",    bg_color: "#10001A", logo_url: "", is_starred: true, sort_order: 9 },
  ],
  testimonials: [
    { id: "fs-t-1", client_name: "Michael Thompson", role: "CEO, Xperience Games", review_text: "The platform built for us redefined how we engage with our gaming community. Smooth, fast and absolutely premium. Our user retention doubled after launch.", rating: 5, photo_url: "", is_starred: true, sort_order: 1 },
    { id: "fs-t-2", client_name: "Phid 2.5", role: "CEO, Jobcondi", review_text: "Jobcondi went from idea to fully-functioning job marketplace in record time. The attention to UI detail and backend reliability blew us away completely.", rating: 5, photo_url: "", is_starred: true, sort_order: 2 },
    { id: "fs-t-3", client_name: "Leinad Thomas", role: "CEO, Xpers Streaming App", review_text: "Building a streaming platform is no joke — but they nailed every single requirement. Real-time performance, beautiful interface, and the code quality that makes scaling painless.", rating: 5, photo_url: "", is_starred: true, sort_order: 3 },
    { id: "fs-t-4", client_name: "Dolapo Omosanya", role: "CEO, Bloom Trader Pro", review_text: "The trading dashboard they built is slick, fast, and gives our traders everything they need at a glance. Honestly the best tech decision we made as a company.", rating: 5, photo_url: "", is_starred: true, sort_order: 4 },
    { id: "fs-t-5", client_name: "Michael Essential", role: "CEO, Xanctum", review_text: "Xanctum needed a visual identity and web presence that matched our ambition. What they delivered was beyond our brief — bold, animated, and instantly memorable.", rating: 5, photo_url: "", is_starred: true, sort_order: 5 },
  ],
};

// MOCK_PROJECTS used in Projects.tsx when no real DB data exists
export const FULLSTACK_PROJECTS = [
  {
    id: "fp-1",
    brand_name: "Xperience Games",
    description: "A next-generation gaming platform built to deliver immersive experiences, community features, leaderboards, and real-time multiplayer matchmaking.",
    category: "Gaming Platform",
    platform: "Web",
    media_url: "",
    external_link: "",
    technologies: ["React", "Node.js & Bun", "Supabase / Postgres", "WebRTC & Streaming", "Framer Motion"],
    is_starred: true,
    sort_order: 1,
  },
  {
    id: "fp-2",
    brand_name: "Xanctum",
    description: "A premium brand identity and digital platform built with bold design, immersive animations, and cutting-edge technology that makes Xanctum impossible to ignore.",
    category: "Brand Platform",
    platform: "Web",
    media_url: "",
    external_link: "",
    technologies: ["React & Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase / Postgres"],
    is_starred: true,
    sort_order: 2,
  },
  {
    id: "fp-3",
    brand_name: "Jobcondi",
    description: "A modern job marketplace connecting top talent with forward-thinking companies. Features smart matching, real-time notifications and a beautiful application pipeline.",
    category: "Web App",
    platform: "SaaS",
    media_url: "",
    external_link: "",
    technologies: ["React & Next.js", "TypeScript", "Supabase / Postgres", "Stripe Integrations"],
    is_starred: true,
    sort_order: 3,
  },
  {
    id: "fp-4",
    brand_name: "Scholar Forge",
    description: "An e-learning platform that forges academic pathways for students through interactive courses, AI-assisted tutoring, and progress-tracking dashboards.",
    category: "EdTech",
    platform: "Web",
    media_url: "",
    external_link: "",
    technologies: ["React & Next.js", "TypeScript", "Supabase / Postgres", "OpenAI / AI Gateways", "Node.js & Bun"],
    is_starred: true,
    sort_order: 4,
  },
  {
    id: "fp-5",
    brand_name: "Luxe Estate",
    description: "A high-end real estate platform presenting premium properties with cinematic imagery, virtual tours, and a seamless inquiry-to-viewing booking flow.",
    category: "Real Estate",
    platform: "Web",
    media_url: "",
    external_link: "",
    technologies: ["React & Next.js", "Tailwind CSS", "Framer Motion", "Supabase / Postgres"],
    is_starred: true,
    sort_order: 5,
  },
  {
    id: "fp-6",
    brand_name: "Bloom Trader Pro",
    description: "A sophisticated trading dashboard giving investors a real-time overview of their portfolio, market trends, alerts and analytics — all in one beautiful interface.",
    category: "FinTech",
    platform: "Web",
    media_url: "",
    external_link: "",
    technologies: ["React & Next.js", "TypeScript", "Node.js & Bun", "Supabase / Postgres", "Stripe Integrations"],
    is_starred: true,
    sort_order: 6,
  },
  {
    id: "fp-7",
    brand_name: "Vision Mail Research",
    description: "An AI-powered email research and intelligence tool that helps teams mine insights from email campaigns, track deliverability, and optimise outreach strategies.",
    category: "AI Tool",
    platform: "SaaS",
    media_url: "",
    external_link: "",
    technologies: ["React & Next.js", "OpenAI / AI Gateways", "Node.js & Bun", "Supabase / Postgres"],
    is_starred: false,
    sort_order: 7,
  },
  {
    id: "fp-8",
    brand_name: "Alat",
    description: "A versatile productivity web application designed to streamline workflows, manage tasks and automate repetitive operations for teams of all sizes.",
    category: "Productivity",
    platform: "Web",
    media_url: "",
    external_link: "",
    technologies: ["React & Next.js", "TypeScript", "Supabase / Postgres", "Lovable (Vibe Coding)"],
    is_starred: false,
    sort_order: 8,
  },
  {
    id: "fp-9",
    brand_name: "Xpers Streaming",
    description: "A full-featured streaming web app with real-time broadcast, live chat, viewer analytics, and monetisation tools — built to scale from day one.",
    category: "Streaming",
    platform: "Web",
    media_url: "",
    external_link: "",
    technologies: ["React & Next.js", "WebRTC & Streaming", "Node.js & Bun", "Supabase / Postgres"],
    is_starred: true,
    sort_order: 9,
  },
];

const BY_NICHE: Record<string, NicheMock> = {
  "fullstack-developer": FULLSTACK,
};

export function getNicheMock(slug: string): NicheMock {
  return { ...GENERIC, ...(BY_NICHE[slug] ?? {}) };
}

// Rotating quotes for the Story section — written to reflect the real
// journey of a self-taught builder. The first one is the founder's signature line.
export const DEV_QUOTES: string[] = [
  "As long as there is programming, there is no idea that can't be materialized or digitalized on the web.",
  "Every bug I ever cursed at turned out to be the lesson I actually needed.",
  "I don't write code to look clever — I write it so the next person, usually me, can breathe.",
  "Shipping beats perfect. You learn more from one thing that's live than ten that are 'almost ready.'",
  "The best feature I ever built started as a problem that personally annoyed me.",
];

// Backwards-compatible export (was used by older code paths).
export const MOCK = {
  services: GENERIC.services!,
  skills: GENERIC.skills!,
  testimonials: GENERIC.testimonials!,
};
