import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import * as Icons from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { ShowcaseStage } from "./showcase/ShowcaseStage";

/** Pattern A — cinematic horizontal push with a slight 3D swing. */
const servicesVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "55%" : "-55%",
    opacity: 0,
    rotateY: dir > 0 ? 12 : -12,
    filter: "blur(10px)",
  }),
  center: { x: 0, opacity: 1, rotateY: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({
    x: dir > 0 ? "-55%" : "55%",
    opacity: 0,
    rotateY: dir > 0 ? -12 : 12,
    filter: "blur(10px)",
  }),
};

export function Services({ bundle }: { bundle: NicheBundle }) {
  const limit = bundle.limits.services ?? 6;
  const starred = bundle.services.filter((s: any) => s.is_starred);
  const list = (starred.length ? starred : bundle.services).slice(0, limit);
  if (list.length === 0) return null;

  return (
    <SectionShell
      id="services"
      eyebrow="What I do"
      title="One focus at a time."
      description="Each capability gets its moment — auto-advancing every 10 seconds. Pause, rewind or skip whenever you like."
      alt
    >
      <div style={{ perspective: 1400 }}>
        <ShowcaseStage
          items={list}
          variants={servicesVariants}
          stageClassName="min-h-[19rem] sm:min-h-[17rem]"
          getKey={(s: any) => s.id}
          controlsLabel={(i, n) => `Service ${i + 1} of ${n}`}
          renderItem={(svc: any, { index }) => {
            const Icon = (Icons[svc.icon as keyof typeof Icons] as any) ?? Icons.Star;
            return (
              <div className="relative mx-auto flex h-full max-w-3xl flex-col items-center overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-elegant sm:p-12">
                {/* Ambient gradient */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
                  style={{ background: "var(--gradient-brand)" }}
                />
                <span className="absolute right-6 top-5 font-display text-6xl font-black text-muted/30 sm:text-7xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <motion.div
                  initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 14 }}
                  className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-elegant"
                >
                  <Icon className="h-7 w-7" />
                </motion.div>

                <motion.h3
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="mt-6 font-display text-2xl font-bold sm:text-3xl"
                >
                  {svc.title}
                </motion.h3>

                <motion.p
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="mt-3 max-w-xl text-balance text-muted-foreground sm:text-lg"
                >
                  {svc.description}
                </motion.p>
              </div>
            );
          }}
        />
      </div>
    </SectionShell>
  );
}
