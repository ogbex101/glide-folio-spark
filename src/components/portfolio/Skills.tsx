import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { motion, type Variants } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowDown } from "lucide-react";
import { ShowcaseStage } from "./showcase/ShowcaseStage";

interface SkillsProps {
  bundle: NicheBundle;
  activeFilter?: string | null;
  onFilterChange?: (tech: string | null) => void;
}

/** Pattern B — vertical card flip with a soft scale. */
const skillsVariants: Variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "40%" : "-40%",
    opacity: 0,
    scale: 0.85,
    rotateX: dir > 0 ? 20 : -20,
  }),
  center: { y: 0, opacity: 1, scale: 1, rotateX: 0 },
  exit: (dir: number) => ({
    y: dir > 0 ? "-40%" : "40%",
    opacity: 0,
    scale: 0.85,
    rotateX: dir > 0 ? -20 : 20,
  }),
};

export function Skills({ bundle, activeFilter, onFilterChange }: SkillsProps) {
  if (bundle.skills.length === 0) return null;

  const filterToProjects = (name: string) => {
    onFilterChange?.(activeFilter === name ? null : name);
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="The toolkit, one at a time."
      description="Every tool gets the spotlight for 10 seconds. Tap a skill to see the projects I built with it."
    >
      <div style={{ perspective: 1400 }}>
        <ShowcaseStage
          items={bundle.skills}
          variants={skillsVariants}
          duration={10_000}
          stageClassName="min-h-[20rem]"
          getKey={(s: any) => s.id}
          controlsLabel={(i, n) => `Skill ${i + 1} of ${n}`}
          renderItem={(skill: any) => {
            const Icon =
              (skill.icon && (Icons[skill.icon as keyof typeof Icons] as any)) ?? Icons.Sparkles;
            const pct = Math.max(0, Math.min(100, skill.percentage ?? 0));
            const R = 52;
            const C = 2 * Math.PI * R;
            const isActive = activeFilter === skill.name;
            return (
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 rounded-3xl border border-border bg-card p-8 text-center shadow-elegant sm:flex-row sm:gap-12 sm:p-12 sm:text-left">
                {/* Radial dial */}
                <div className="relative grid shrink-0 place-items-center">
                  <svg width="160" height="160" viewBox="0 0 140 140" className="-rotate-90">
                    <circle cx="70" cy="70" r={R} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth="10" />
                    <motion.circle
                      cx="70"
                      cy="70"
                      r={R}
                      fill="none"
                      stroke="var(--brand-accent-hex)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      initial={{ strokeDashoffset: C }}
                      animate={{ strokeDashoffset: C * (1 - pct / 100) }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    />
                  </svg>
                  <div className="absolute grid place-items-center">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-elegant">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <span className="absolute -bottom-1 rounded-full border border-border bg-background px-2.5 py-0.5 font-display text-sm font-bold">
                    {pct}%
                  </span>
                </div>

                {/* Detail */}
                <div className="flex flex-col items-center sm:items-start">
                  <motion.h3
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="font-display text-3xl font-bold sm:text-4xl"
                  >
                    {skill.name}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-2 max-w-md text-muted-foreground"
                  >
                    {pct >= 90
                      ? "A daily driver — I reach for this without thinking."
                      : pct >= 80
                      ? "Comfortable and production-tested across real projects."
                      : "Solid working knowledge, and growing with every build."}
                  </motion.p>
                  {onFilterChange && (
                    <motion.button
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      onClick={() => filterToProjects(skill.name)}
                      className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth ${
                        isActive
                          ? "bg-[color:var(--brand-accent-hex)] text-white shadow-elegant"
                          : "border border-border bg-background hover:border-[color:var(--brand-accent-hex)]/50"
                      }`}
                    >
                      {isActive ? "Showing projects below" : "See projects built with this"}
                      <ArrowDown className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>
    </SectionShell>
  );
}
