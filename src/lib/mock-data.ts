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
    { id: "g-t-1", client_name: "Sarah Chen", role: "Founder, Aurora Commerce", review_text: "Shipped an entire storefront in two weeks. Clean code, beautiful UI and zero hand-holding required.", rating: 5, photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", is_starred: true, sort_order: 1 },
    { id: "g-t-2", client_name: "Marcus Rivera", role: "CTO, Pulse Analytics", review_text: "One of those rare developers who treats design and DX with the same care as the architecture.", rating: 5, photo_url: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80", is_starred: true, sort_order: 2 },
    { id: "g-t-3", client_name: "Priya Natarajan", role: "Product Lead, Forge Studio", review_text: "The animations and micro-interactions made our brand feel premium without slowing anything down.", rating: 5, photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80", is_starred: true, sort_order: 3 },
  ],
};

/* ---------------- Full-Stack / Vibe-Coding Developer ---------------- */

const FULLSTACK: NicheMock = {
  settings: {
    full_name: "Ogbeifun Daniel Osewe",
    title: "Full-Stack Developer & Vibe Coder",
    bio: "I design, code and ship modern web applications end-to-end — from the database all the way to delightful UI. I lean into AI-assisted vibe coding tools to move fast without sacrificing craft, and I obsess over performance, accessibility and motion that feels alive.",
    projects_count: 40,
    happy_clients: 25,
    years_experience: 5,
  },
  story: {
    story_text:
      "I started by tinkering with HTML and CSS late at night, fell in love with the moment an idea becomes something you can click. Years later I've shipped SaaS dashboards, AI assistants, marketplaces and brand sites — most of them solo, all of them with the same obsession for detail. Today I blend traditional engineering with AI-powered vibe-coding platforms like Lovable and Bubble to ship in days what used to take months, without ever cutting corners on quality.",
    quote: "Code is just design that happens to run.",
    image_url:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
  },
  services: [
    { id: "fs-svc-1", title: "Full-Stack Web Apps", description: "React, Next.js and TanStack Start apps with type-safe APIs, auth, payments and real-time data.", icon: "Code2", is_starred: true, sort_order: 1 },
    { id: "fs-svc-2", title: "AI-Powered Vibe Coding", description: "Rapid prototyping and production builds using Lovable, Bubble, Cursor and the latest AI tooling.", icon: "Sparkles", is_starred: true, sort_order: 2 },
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
    { id: "fs-sk-12", name: "Bubble.io",             percentage: 85, icon: "Boxes",      sort_order: 12 },
    { id: "fs-sk-13", name: "Webflow",               percentage: 88, icon: "Workflow",   sort_order: 13 },
    { id: "fs-sk-14", name: "Figma",                 percentage: 92, icon: "Figma",      sort_order: 14 },
    { id: "fs-sk-15", name: "VS Code",               percentage: 95, icon: "FileCode2",  sort_order: 15 },
    { id: "fs-sk-16", name: "Cursor AI",             percentage: 90, icon: "MousePointer2", sort_order: 16 },
    { id: "fs-sk-17", name: "GitHub & Git",          percentage: 93, icon: "Github",     sort_order: 17 },
    { id: "fs-sk-18", name: "Vercel & Cloudflare",   percentage: 90, icon: "Cloud",      sort_order: 18 },
    { id: "fs-sk-19", name: "Stripe Integrations",   percentage: 86, icon: "CreditCard", sort_order: 19 },
    { id: "fs-sk-20", name: "OpenAI / AI Gateways",  percentage: 88, icon: "Bot",        sort_order: 20 },
  ],
  certifications: [
    { id: "fs-c-1", name: "Meta Front-End Developer", issuer: "Meta / Coursera", date_earned: "2023-08-12", credential_link: "https://coursera.org", badge_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&q=80", sort_order: 1 },
    { id: "fs-c-2", name: "Full-Stack Open", issuer: "University of Helsinki", date_earned: "2023-04-02", credential_link: "https://fullstackopen.com", sort_order: 2 },
    { id: "fs-c-3", name: "Supabase Certified Developer", issuer: "Supabase", date_earned: "2024-02-18", credential_link: "https://supabase.com", sort_order: 3 },
    { id: "fs-c-4", name: "Lovable Vibe-Coding Pro", issuer: "Lovable", date_earned: "2025-01-09", credential_link: "https://lovable.dev", sort_order: 4 },
    { id: "fs-c-5", name: "Webflow Expert", issuer: "Webflow", date_earned: "2024-05-21", credential_link: "https://webflow.com", sort_order: 5 },
    { id: "fs-c-6", name: "Bubble Certified Developer", issuer: "Bubble.io", date_earned: "2024-09-30", credential_link: "https://bubble.io", sort_order: 6 },
    { id: "fs-c-7", name: "Stripe Certified Integration", issuer: "Stripe", date_earned: "2024-07-14", credential_link: "https://stripe.com", sort_order: 7 },
    { id: "fs-c-8", name: "Google UX Design", issuer: "Google / Coursera", date_earned: "2022-11-03", credential_link: "https://coursera.org", sort_order: 8 },
    { id: "fs-c-9", name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date_earned: "2024-03-22", credential_link: "https://aws.amazon.com", sort_order: 9 },
  ],
  brandLogos: [
    { id: "fs-b-1", alt_text: "Lovable",   bg_color: "#FFFFFF", logo_url: "https://cdn.simpleicons.org/lovable/FF4F8B",      is_starred: true, sort_order: 1 },
    { id: "fs-b-2", alt_text: "Supabase",  bg_color: "#0F1115", logo_url: "https://cdn.simpleicons.org/supabase/3ECF8E",     is_starred: true, sort_order: 2 },
    { id: "fs-b-3", alt_text: "Vercel",    bg_color: "#000000", logo_url: "https://cdn.simpleicons.org/vercel/FFFFFF",       is_starred: true, sort_order: 3 },
    { id: "fs-b-4", alt_text: "Stripe",    bg_color: "#635BFF", logo_url: "https://cdn.simpleicons.org/stripe/FFFFFF",       is_starred: true, sort_order: 4 },
    { id: "fs-b-5", alt_text: "Figma",     bg_color: "#FFFFFF", logo_url: "https://cdn.simpleicons.org/figma/F24E1E",        is_starred: true, sort_order: 5 },
    { id: "fs-b-6", alt_text: "Webflow",   bg_color: "#146EF5", logo_url: "https://cdn.simpleicons.org/webflow/FFFFFF",      is_starred: true, sort_order: 6 },
    { id: "fs-b-7", alt_text: "Bubble",    bg_color: "#0E1A2B", logo_url: "https://cdn.simpleicons.org/bubble/0070F3",       is_starred: true, sort_order: 7 },
    { id: "fs-b-8", alt_text: "OpenAI",    bg_color: "#000000", logo_url: "https://cdn.simpleicons.org/openai/FFFFFF",       is_starred: true, sort_order: 8 },
    { id: "fs-b-9", alt_text: "GitHub",    bg_color: "#0D1117", logo_url: "https://cdn.simpleicons.org/github/FFFFFF",       is_starred: true, sort_order: 9 },
    { id: "fs-b-10", alt_text: "Cloudflare", bg_color: "#F38020", logo_url: "https://cdn.simpleicons.org/cloudflare/FFFFFF", is_starred: true, sort_order: 10 },
    { id: "fs-b-11", alt_text: "Notion",   bg_color: "#FFFFFF", logo_url: "https://cdn.simpleicons.org/notion/000000",       is_starred: true, sort_order: 11 },
    { id: "fs-b-12", alt_text: "Framer",   bg_color: "#000000", logo_url: "https://cdn.simpleicons.org/framer/0055FF",       is_starred: true, sort_order: 12 },
  ],
  testimonials: GENERIC.testimonials,
};

const BY_NICHE: Record<string, NicheMock> = {
  "fullstack-developer": FULLSTACK,
};

export function getNicheMock(slug: string): NicheMock {
  return { ...GENERIC, ...(BY_NICHE[slug] ?? {}) };
}

// Backwards-compatible export (was used by older code paths).
export const MOCK = {
  services: GENERIC.services!,
  skills: GENERIC.skills!,
  testimonials: GENERIC.testimonials!,
};
