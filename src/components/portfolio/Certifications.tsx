import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { ShowcaseStage } from "./showcase/ShowcaseStage";

/** Pattern C — a 3D card flip around the Y axis. */
const certVariants: Variants = {
  enter: (dir: number) => ({ rotateY: dir > 0 ? 90 : -90, opacity: 0, scale: 0.9 }),
  center: { rotateY: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ rotateY: dir > 0 ? -90 : 90, opacity: 0, scale: 0.9 }),
};

function fmtDate(d?: string) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "UTC" });
}

export function Certifications({ bundle, showAll = false }: { bundle: NicheBundle; showAll?: boolean }) {
  const list = showAll ? bundle.certifications : bundle.certifications.slice(0, 10);
  if (list.length === 0) return null;

  // Dedicated "view all" page keeps the scannable grid.
  if (showAll) {
    return (
      <SectionShell id="certifications" eyebrow="Credentials" title="Certifications & training.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c: any) => (
            <div key={c.id} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-elegant">
                {c.badge_url ? (
                  <img src={c.badge_url} alt={c.name} className="h-full w-full rounded-xl object-cover" />
                ) : (
                  <Award className="h-6 w-6" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold leading-tight">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.issuer}</p>
                {fmtDate(c.date_earned) && <p className="mt-1 text-xs text-muted-foreground">{fmtDate(c.date_earned)}</p>}
                {c.credential_link && (
                  <a href={c.credential_link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--brand-primary-hex)] hover:underline">
                    Verify <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell
      id="certifications"
      eyebrow="Credentials"
      title="Certifications & training."
      description="Flipping through the things I've earned — 10 seconds each."
      viewAllTo="/niche/$slug/certifications"
      viewAllParams={{ slug: bundle.niche.slug }}
    >
      <div style={{ perspective: 1600 }}>
        <ShowcaseStage
          items={list}
          variants={certVariants}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          stageClassName="min-h-[20rem]"
          getKey={(c: any) => c.id}
          controlsLabel={(i, n) => `Credential ${i + 1} of ${n}`}
          renderItem={(c: any) => (
            <div
              className="relative mx-auto flex max-w-2xl flex-col items-center overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-elegant sm:p-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-25 blur-2xl"
                style={{ background: "var(--gradient-brand)" }}
              />
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 14 }}
                className="relative grid h-24 w-24 place-items-center rounded-3xl bg-gradient-brand text-primary-foreground shadow-elegant"
              >
                {c.badge_url ? (
                  <img src={c.badge_url} alt={c.name} className="h-full w-full rounded-3xl object-cover" />
                ) : (
                  <Award className="h-10 w-10" />
                )}
                <span className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full border-2 border-background bg-[color:var(--brand-accent-hex)] text-white">
                  <BadgeCheck className="h-4 w-4" />
                </span>
              </motion.div>

              <motion.h3
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 font-display text-2xl font-bold sm:text-3xl"
              >
                {c.name}
              </motion.h3>
              <motion.p
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.38, duration: 0.5 }}
                className="mt-1 text-muted-foreground"
              >
                {c.issuer}
                {fmtDate(c.date_earned) ? ` · ${fmtDate(c.date_earned)}` : ""}
              </motion.p>

              {c.credential_link && (
                <motion.a
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.46, duration: 0.5 }}
                  href={c.credential_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-smooth hover:border-[color:var(--brand-primary-hex)]/50"
                >
                  Verify credential <ExternalLink className="h-4 w-4" />
                </motion.a>
              )}
            </div>
          )}
        />
      </div>
    </SectionShell>
  );
}
