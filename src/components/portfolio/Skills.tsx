import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

export function Skills({ bundle }: { bundle: NicheBundle }) {
  if (bundle.skills.length === 0) return null;
  return (
    <SectionShell id="skills" eyebrow="Skills" title="Tools and techniques I rely on.">
      <motion.div
        className="grid gap-5 sm:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.08)}
      >
        {bundle.skills.map((skill: any) => (
          <motion.div
            key={skill.id}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-brand"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
