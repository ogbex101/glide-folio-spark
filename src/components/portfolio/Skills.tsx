import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import * as Icons from "lucide-react";
import { X } from "lucide-react";

interface SkillsProps {
  bundle: NicheBundle;
  activeFilter?: string | null;
  onFilterChange?: (tech: string | null) => void;
}

export function Skills({ bundle, activeFilter, onFilterChange }: SkillsProps) {
  if (bundle.skills.length === 0) return null;

  const handleClick = (skillName: string) => {
    if (!onFilterChange) return;
    onFilterChange(activeFilter === skillName ? null : skillName);
    // Scroll to projects section
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="Tools, languages & techniques I rely on."
      description={
        onFilterChange
          ? "Click any skill to filter projects by that technology."
          : undefined
      }
    >
      {/* Active filter banner */}
      {activeFilter && onFilterChange && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 flex items-center justify-between rounded-xl border border-[color:var(--brand-accent-hex)]/40 bg-[color:var(--brand-accent-hex)]/10 px-4 py-2.5"
        >
          <span className="text-sm font-medium">
            Showing projects built with{" "}
            <span className="font-semibold text-[color:var(--brand-accent-hex)]">
              {activeFilter}
            </span>
          </span>
          <button
            onClick={() => onFilterChange(null)}
            className="ml-3 grid h-6 w-6 place-items-center rounded-full bg-[color:var(--brand-accent-hex)]/20 transition-colors hover:bg-[color:var(--brand-accent-hex)]/40"
            aria-label="Clear filter"
          >
            <X className="h-3.5 w-3.5 text-[color:var(--brand-accent-hex)]" />
          </button>
        </motion.div>
      )}

      <motion.div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.04)}
      >
        {bundle.skills.map((skill: any) => {
          const Icon =
            (skill.icon &&
              (Icons[skill.icon as keyof typeof Icons] as any)) ??
            Icons.Sparkles;
          const isActive = activeFilter === skill.name;
          const isFiltering = !!activeFilter;
          const isClickable = !!onFilterChange;

          return (
            <motion.div
              key={skill.id}
              variants={fadeUp}
              onClick={() => isClickable && handleClick(skill.name)}
              className={`group relative rounded-2xl border bg-card p-5 shadow-soft transition-all duration-300 ${
                isClickable ? "cursor-pointer select-none" : ""
              } ${
                isActive
                  ? "border-[color:var(--brand-accent-hex)] shadow-elegant ring-1 ring-[color:var(--brand-accent-hex)]/40"
                  : isFiltering && !isActive
                  ? "border-border opacity-50"
                  : "border-border hover:-translate-y-0.5 hover:shadow-elegant hover:border-[color:var(--brand-accent-hex)]/50"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="skill-active-bg"
                  className="absolute inset-0 rounded-2xl bg-[color:var(--brand-accent-hex)]/5"
                />
              )}

              <div className="relative flex items-center gap-3">
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-elegant transition-all duration-300 ${
                    isActive
                      ? "bg-[color:var(--brand-accent-hex)] text-white scale-110"
                      : "bg-gradient-brand text-primary-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`truncate font-medium text-sm transition-colors ${
                        isActive ? "text-[color:var(--brand-accent-hex)]" : ""
                      }`}
                    >
                      {skill.name}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className={`h-full rounded-full transition-all ${
                        isActive
                          ? "bg-[color:var(--brand-accent-hex)]"
                          : "bg-gradient-brand"
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  {isClickable && (
                    <p
                      className={`mt-1 text-[10px] transition-opacity ${
                        isActive
                          ? "text-[color:var(--brand-accent-hex)]/70 opacity-100"
                          : "opacity-0 group-hover:opacity-100 text-muted-foreground"
                      }`}
                    >
                      {isActive ? "Filtering projects ↓" : "Click to filter projects"}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
