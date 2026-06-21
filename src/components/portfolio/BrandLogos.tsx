import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { motion, type Variants } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { ShowcaseStage } from "./showcase/ShowcaseStage";

// Optional accent + tagline metadata for the founder's own brands.
const BRAND_META: Record<string, { accent: string; tagline: string }> = {
  Xanctum: { accent: "#8B5CF6", tagline: "The future of brand intelligence." },
  "Xperience Games": { accent: "#6366F1", tagline: "Next-gen gaming — built to immerse." },
  Jobcondi: { accent: "#10B981", tagline: "Connecting talent with opportunity." },
  "Scholar Forge": { accent: "#F59E0B", tagline: "Forging tomorrow's academic leaders." },
  "Luxe Estate": { accent: "#D97706", tagline: "Premium real estate, elevated." },
  "Bloom Trader Pro": { accent: "#34D399", tagline: "Trade smarter. Grow faster." },
  "Vision Mail Research": { accent: "#38BDF8", tagline: "AI-driven email intelligence." },
  Alat: { accent: "#F87171", tagline: "Productivity, supercharged." },
  "Xpers Streaming": { accent: "#A78BFA", tagline: "Stream, engage, monetise." },
};

const FALLBACK_ACCENTS = ["#6366F1", "#8B5CF6", "#10B981", "#F59E0B", "#38BDF8", "#F472B6"];

function metaFor(name: string, idx: number) {
  return (
    BRAND_META[name] ?? {
      accent: FALLBACK_ACCENTS[idx % FALLBACK_ACCENTS.length],
      tagline: "A brand built with intent and care.",
    }
  );
}

/** Pattern D — blurred zoom spotlight. */
const brandVariants: Variants = {
  enter: { opacity: 0, scale: 1.18, filter: "blur(16px)" },
  center: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.86, filter: "blur(16px)" },
};

export function BrandLogos({ bundle }: { bundle: NicheBundle }) {
  const limit = bundle.limits.brand_logos ?? 12;
  const starred = bundle.brandLogos.filter((b: any) => b.is_starred);
  const list = (starred.length ? starred : bundle.brandLogos).slice(0, limit);
  if (list.length === 0) return null;

  return (
    <SectionShell
      id="brands"
      eyebrow="Brands I've built"
      title="My product portfolio."
      description="A spotlight on each brand I've designed, built and shipped — auto-advancing every 10 seconds."
      alt
    >
      <ShowcaseStage
        items={list}
        variants={brandVariants}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        stageClassName="min-h-[24rem]"
        getKey={(b: any) => b.id}
        controlsLabel={(i, n) => `Brand ${i + 1} of ${n}`}
        renderItem={(b: any, { index }) => {
          const meta = metaFor(b.alt_text, index);
          const link = b.external_link || b.link;
          return (
            <div
              className="relative mx-auto flex min-h-[24rem] max-w-4xl flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-border p-10 text-center shadow-elegant sm:p-16"
              style={{
                background: `radial-gradient(120% 120% at 50% 0%, ${meta.accent}22, transparent 60%), var(--gradient-hero)`,
              }}
            >
              {/* Animated orbs */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
                style={{ background: meta.accent }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
                style={{ background: meta.accent }}
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />

              {/* Logo */}
              <motion.div
                initial={{ y: 24, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 14 }}
                className="relative"
              >
                {b.logo_url ? (
                  <img src={b.logo_url} alt={b.alt_text} className="h-28 w-auto object-contain drop-shadow-2xl" />
                ) : (
                  <BrandMark name={b.alt_text || "Brand"} accent={meta.accent} size={120} />
                )}
              </motion.div>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.55 }}
                className="mt-8 font-display text-4xl font-black tracking-tight sm:text-6xl"
              >
                {b.alt_text}
              </motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.38, duration: 0.55 }}
                className="mt-3 text-lg font-light text-muted-foreground sm:text-xl"
              >
                {meta.tagline}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.48, duration: 0.55 }}
                className="mt-8"
              >
                {link ? (
                  <Button asChild size="lg" className="rounded-full" style={{ backgroundColor: meta.accent }}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Visit {b.alt_text}
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" disabled className="rounded-full border border-border bg-background/60">
                    <Sparkles className="mr-2 h-4 w-4" /> Coming soon
                  </Button>
                )}
              </motion.div>
            </div>
          );
        }}
      />
    </SectionShell>
  );
}
