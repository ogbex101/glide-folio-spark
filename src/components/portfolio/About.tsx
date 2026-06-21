import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Coffee, Heart, Zap } from "lucide-react";

function CountUp({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const PRINCIPLES = [
  { icon: Zap, label: "Fast, but never sloppy" },
  { icon: Heart, label: "Obsessed with the details" },
  { icon: Coffee, label: "Builds I'd actually use" },
];

export function About({ bundle }: { bundle: NicheBundle }) {
  const s = bundle.settings;
  const stats = [
    { title: "Projects Delivered", value: s?.projects_count ?? 0 },
    { title: "Happy Clients", value: s?.happy_clients ?? 0 },
    { title: "Years Building", value: s?.years_experience ?? 0 },
  ];

  return (
    <SectionShell id="about" eyebrow="About me" title={`Hey — I'm ${s?.full_name ?? "Daniel"}.`} alt>
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Narrative */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {s?.title && (
            <p className="mb-4 inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-[color:var(--brand-primary-hex)]">
              {s.title}
            </p>
          )}
          <p className="text-lg leading-relaxed text-muted-foreground text-balance sm:text-xl">
            {s?.bio ??
              "I build web applications end to end — and I care just as much about how they feel as how they work."}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {PRINCIPLES.map(({ icon: Icon, label }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 240, damping: 16 }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium"
              >
                <Icon className="h-4 w-4 text-[color:var(--brand-accent-hex)]" />
                {label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats with count-up */}
        <div className="grid grid-cols-3 gap-3 lg:col-span-2 lg:grid-cols-1">
          {stats.map((st, i) => (
            <motion.div
              key={st.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elegant sm:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 group-hover:scale-x-100" />
              <div className="font-display text-3xl font-bold text-[color:var(--brand-primary-hex)] sm:text-5xl">
                <CountUp to={st.value} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{st.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
