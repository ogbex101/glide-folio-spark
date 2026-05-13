// Mock fallback data so empty portfolio sections still look complete.
// Replace by adding real records via the admin dashboard.

export const MOCK = {
  services: [
    {
      id: "mock-svc-1",
      title: "Web Application Development",
      description:
        "End-to-end React, Next.js and TanStack Start apps with type-safe APIs and clean UI.",
      icon: "Code",
      is_starred: true,
      sort_order: 1,
    },
    {
      id: "mock-svc-2",
      title: "UI / UX Design Systems",
      description:
        "Component libraries, tokens and accessible patterns that scale across products.",
      icon: "Palette",
      is_starred: true,
      sort_order: 2,
    },
    {
      id: "mock-svc-3",
      title: "Full-Stack Integrations",
      description:
        "Supabase, Stripe, AI gateways and edge functions wired into production-ready flows.",
      icon: "Zap",
      is_starred: true,
      sort_order: 3,
    },
    {
      id: "mock-svc-4",
      title: "Performance & SEO",
      description:
        "Core Web Vitals, semantic HTML, structured data and image optimisation.",
      icon: "Gauge",
      is_starred: false,
      sort_order: 4,
    },
    {
      id: "mock-svc-5",
      title: "Vibe Coding Sessions",
      description:
        "Pair programming and rapid prototyping — turn an idea into a deployed app in a day.",
      icon: "Sparkles",
      is_starred: false,
      sort_order: 5,
    },
    {
      id: "mock-svc-6",
      title: "Maintenance & Support",
      description:
        "Ongoing iteration, monitoring and feature work with predictable monthly capacity.",
      icon: "Wrench",
      is_starred: false,
      sort_order: 6,
    },
  ],

  skills: [
    { id: "mock-sk-1", name: "React & TypeScript", percentage: 95, sort_order: 1 },
    { id: "mock-sk-2", name: "TanStack Start / Next.js", percentage: 90, sort_order: 2 },
    { id: "mock-sk-3", name: "Tailwind & Design Systems", percentage: 92, sort_order: 3 },
    { id: "mock-sk-4", name: "Supabase / Postgres", percentage: 88, sort_order: 4 },
    { id: "mock-sk-5", name: "Framer Motion", percentage: 85, sort_order: 5 },
    { id: "mock-sk-6", name: "Edge & Serverless", percentage: 80, sort_order: 6 },
  ],

  testimonials: [
    {
      id: "mock-t-1",
      client_name: "Sarah Chen",
      role: "Founder, Aurora Commerce",
      review_text:
        "Shipped an entire storefront in two weeks. Clean code, beautiful UI and zero hand-holding required.",
      rating: 5,
      photo_url:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      is_starred: true,
      sort_order: 1,
    },
    {
      id: "mock-t-2",
      client_name: "Marcus Rivera",
      role: "CTO, Pulse Analytics",
      review_text:
        "One of those rare developers who treats design and DX with the same care as the architecture.",
      rating: 5,
      photo_url:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80",
      is_starred: true,
      sort_order: 2,
    },
    {
      id: "mock-t-3",
      client_name: "Priya Natarajan",
      role: "Product Lead, Forge Studio",
      review_text:
        "The animations and micro-interactions made our brand feel premium without slowing anything down.",
      rating: 5,
      photo_url:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
      is_starred: true,
      sort_order: 3,
    },
  ],
};
