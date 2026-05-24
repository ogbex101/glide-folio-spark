import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Brand accent colours & tag lines for each own brand
const BRAND_META: Record<
  string,
  { accent: string; tagline: string; link?: string }
> = {
  Xanctum: {
    accent: "#8B5CF6",
    tagline: "The future of brand intelligence.",
    link: "",
  },
  "Xperience Games": {
    accent: "#6366F1",
    tagline: "Next-gen gaming — built to immerse.",
    link: "",
  },
  Jobcondi: {
    accent: "#10B981",
    tagline: "Connecting talent with opportunity.",
    link: "",
  },
  "Scholar Forge": {
    accent: "#F59E0B",
    tagline: "Forging tomorrow's academic leaders.",
    link: "",
  },
  "Luxe Estate": {
    accent: "#D97706",
    tagline: "Premium real estate, elevated.",
    link: "",
  },
  "Bloom Trader Pro": {
    accent: "#34D399",
    tagline: "Trade smarter. Grow faster.",
    link: "",
  },
  "Vision Mail Research": {
    accent: "#38BDF8",
    tagline: "AI-driven email intelligence.",
    link: "",
  },
  Alat: {
    accent: "#F87171",
    tagline: "Productivity, supercharged.",
    link: "",
  },
  "Xpers Streaming": {
    accent: "#A78BFA",
    tagline: "Stream, engage, monetise.",
    link: "",
  },
};

const BRAND_GRADIENTS: Record<string, string> = {
  Xanctum: "from-violet-950 via-purple-900 to-slate-900",
  "Xperience Games": "from-indigo-950 via-violet-900 to-purple-900",
  Jobcondi: "from-emerald-950 via-teal-900 to-cyan-900",
  "Scholar Forge": "from-amber-950 via-orange-900 to-yellow-900",
  "Luxe Estate": "from-yellow-950 via-amber-900 to-orange-900",
  "Bloom Trader Pro": "from-green-950 via-emerald-900 to-teal-900",
  "Vision Mail Research": "from-sky-950 via-blue-900 to-cyan-900",
  Alat: "from-rose-950 via-red-900 to-pink-900",
  "Xpers Streaming": "from-fuchsia-950 via-purple-900 to-violet-900",
};

export function BrandLogos({ bundle }: { bundle: NicheBundle }) {
  const limit = bundle.limits.brand_logos ?? 12;
  const starred = bundle.brandLogos.filter((b: any) => b.is_starred);
  const list = (starred.length ? starred : bundle.brandLogos).slice(0, limit);
  if (list.length === 0) return null;

  // Xanctum is always featured hero
  const xanctum = list.find((b: any) => b.alt_text === "Xanctum");
  const rest = list.filter((b: any) => b.alt_text !== "Xanctum");

  return (
    <>
      {/* ─────────────────── XANCTUM HERO SPOTLIGHT ─────────────────── */}
      {xanctum && (
        <section className="relative overflow-hidden py-24">
          {/* Animated background */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-purple-900 to-slate-950" />
            {/* Animated orbs */}
            <motion.div
              className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
                x: [0, 60, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
                x: [0, -40, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/15 blur-3xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur">
                <Sparkles className="h-4 w-4 text-violet-400" />
                Brand I've Built & Promoted
              </span>
            </motion.div>

            {/* Main spotlight */}
            <div className="flex flex-col items-center text-center">
              {/* Logo placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 relative"
              >
                {xanctum.logo_url ? (
                  <img
                    src={xanctum.logo_url}
                    alt="Xanctum"
                    className="h-40 w-auto object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="relative">
                    {/* Glow ring */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-violet-500/30 blur-2xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="relative grid h-40 w-40 place-items-center rounded-3xl border border-violet-500/40 bg-gradient-to-br from-violet-900/60 to-purple-900/60 backdrop-blur-xl shadow-2xl">
                      <span className="font-display text-5xl font-black tracking-tighter text-white">
                        X
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-6xl font-black tracking-tighter text-white sm:text-8xl lg:text-9xl"
              >
                XANCTUM
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-4 text-xl font-light text-violet-200/80 sm:text-2xl"
              >
                {BRAND_META["Xanctum"]?.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mx-auto mt-6 max-w-2xl text-base text-violet-300/60 leading-relaxed"
              >
                A bold, forward-thinking brand built from the ground up — powered by cutting-edge technology, 
                premium design and the vision to redefine how brands show up in the digital age. 
                Xanctum is more than a product; it's a statement.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                {BRAND_META["Xanctum"]?.link ? (
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-violet-600 text-white hover:bg-violet-500"
                  >
                    <a href={BRAND_META["Xanctum"].link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Xanctum
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled
                    className="rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Coming Soon
                  </Button>
                )}
              </motion.div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-16 grid grid-cols-3 gap-8"
              >
                {[
                  { label: "Brand Vision", value: "100%" },
                  { label: "Built with Love", value: "∞" },
                  { label: "Ready to Scale", value: "✓" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-violet-300/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────── ALL OTHER BRANDS GRID ─────────────────── */}
      <SectionShell
        id="brands"
        eyebrow="Brands I've built"
        title="My product portfolio."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {rest.map((b: any, idx: number) => {
            const meta = BRAND_META[b.alt_text] ?? { accent: "#6366F1", tagline: "" };
            const gradient = BRAND_GRADIENTS[b.alt_text] ?? "from-zinc-900 via-neutral-800 to-stone-900";
            const initials = (b.alt_text as string)
              .split(" ")
              .map((w: string) => w[0])
              .join("")
              .slice(0, 3)
              .toUpperCase();
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group relative overflow-hidden rounded-2xl border border-border shadow-soft transition-shadow hover:shadow-elegant cursor-pointer"
              >
                {/* Gradient bg */}
                <div
                  className={`flex aspect-video w-full flex-col items-center justify-center bg-gradient-to-br ${gradient} gap-2 p-6`}
                >
                  {b.logo_url ? (
                    <img
                      src={b.logo_url}
                      alt={b.alt_text}
                      className="max-h-16 w-auto object-contain drop-shadow-lg"
                    />
                  ) : (
                    <>
                      <motion.div
                        className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span
                          className="font-display text-xl font-bold"
                          style={{ color: meta.accent }}
                        >
                          {initials}
                        </span>
                      </motion.div>
                      <p className="text-xs text-white/40">Image coming soon</p>
                    </>
                  )}
                </div>
                {/* Brand info */}
                <div className="bg-card p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{b.alt_text}</p>
                      {meta.tagline && (
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                          {meta.tagline}
                        </p>
                      )}
                    </div>
                    {/* Accent dot */}
                    <span
                      className="mt-1 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: meta.accent }}
                    />
                  </div>
                  {meta.link && (
                    <a
                      href={meta.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Visit
                    </a>
                  )}
                </div>

                {/* Hover shine */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${meta.accent}18 0%, transparent 60%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </SectionShell>
    </>
  );
}
