import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import * as Icons from "lucide-react";

export function Skills({ bundle }: { bundle: NicheBundle }) {
  if (bundle.skills.length === 0) return null;
  return (
    <SectionShell id="skills" eyebrow="Skills" title="Tools, languages & techniques I rely on.">
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.05)}
      >
        {bundle.skills.map((skill: any) => {
          const Icon =
            (skill.icon && (Icons[skill.icon as keyof typeof Icons] as any)) ??
            Icons.Sparkles;
          return (
            <motion.div
              key={skill.id}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-elegant">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-gradient-brand"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
