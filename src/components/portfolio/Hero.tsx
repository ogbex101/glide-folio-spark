import type { NicheBundle } from "@/lib/niche-queries";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
  animate,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const wordV: Variants = {
  hidden: { opacity: 0, y: "120%", rotateX: -45, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedWords({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      variants={containerV}
      initial="hidden"
      animate="show"
      style={{ display: "inline-block", perspective: 800 }}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.12em", marginRight: "0.28em" }}
        >
          <motion.span variants={wordV} style={{ display: "inline-block", transformOrigin: "50% 100%" }}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function CountUp({ to }: { to: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const controls = animate(0, to, {
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setVal(Math.round(v)),
          });
          io.disconnect();
          return () => controls.stop();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}</span>;
}

export function Hero({ bundle }: { bundle: NicheBundle }) {
  const s = bundle.settings as any;
  const bg = s?.hero_background_url;

  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 120]);
  const yText = useTransform(scrollY, [0, 600], [0, -40]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Mouse-tracked spotlight + portrait tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 120, damping: 20 });
  const smy = useSpring(my, { stiffness: 120, damping: 20 });

  const rotX = useTransform(smy, [0, 1], [10, -10]);
  const rotY = useTransform(smx, [0, 1], [-12, 12]);
  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX} ${spotY}, color-mix(in oklab, var(--brand-accent-hex) 22%, transparent), transparent 60%)`;

  const handleMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative overflow-hidden bg-gradient-hero"
      style={{ perspective: 1200 }}
    >
      {/* Animated mesh blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand-accent-hex) 70%, transparent), transparent 70%)" }}
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mouse spotlight */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[1]" style={{ background: spotlight }} />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {bg && (
        <>
          <motion.div
            aria-hidden
            className="absolute inset-0 scale-110 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${bg})`, y: yBg }}
            initial={{ scale: 1.25, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.4 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </>
      )}

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-8 lg:py-32"
        style={{ y: yText }}
      >
        <div className="space-y-8">
          {/* Headline group — this is what gracefully fades on scroll */}
          <motion.div
            className="space-y-6"
            variants={containerV}
            initial="hidden"
            animate="show"
            style={{ opacity }}
          >
            <motion.div
              variants={itemV}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <motion.span
                animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <Sparkles className="h-3 w-3 text-[color:var(--brand-accent-hex)]" />
              </motion.span>
              {s?.title ?? bundle.niche.display_name}
              <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--brand-accent-hex)]" />
            </motion.div>

            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              <AnimatedWords
                text={s?.hero_tagline ?? "I build web apps people actually love to use."}
              />
            </h1>

            <motion.p variants={itemV} className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
              {s?.bio}
            </motion.p>

            <motion.div variants={itemV} className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group relative overflow-hidden">
                <a href="#projects">
                  <span className="relative z-10 inline-flex items-center">
                    See my work
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <a href="#contact">
                  Get in touch
                  <span className="ml-1 inline-block transition-transform group-hover:rotate-12">✨</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats — kept clear & readable; count up when they come into view */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur sm:gap-6 sm:p-5"
          >
            <Stat label="Projects" value={s?.projects_count ?? 0} />
            <Stat label="Happy Clients" value={s?.happy_clients ?? 0} />
            <Stat label="Years Experience" value={s?.years_experience ?? 0} />
          </motion.div>
        </div>

        {/* Portrait with 3D tilt */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85, rotateY: -25 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="relative mx-auto aspect-square w-full max-w-md"
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          >
            {/* Animated rotating conic glow */}
            <motion.div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--brand-primary-hex), var(--brand-accent-hex), var(--brand-primary-hex))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 -rotate-6 rounded-3xl bg-gradient-brand opacity-20 blur-3xl"
              animate={{ rotate: [-6, -2, -6] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div
              className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-border bg-card shadow-elegant"
              style={{ transform: "translateZ(40px)" }}
            >
              {s?.profile_picture_url ? (
                <motion.img
                  src={s.profile_picture_url}
                  alt={s.full_name ?? ""}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.2, filter: "blur(20px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-brand">
                  <span className="font-display text-7xl font-bold text-primary-foreground">
                    {(s?.full_name ?? "ODO").split(" ").map((n: string) => n[0]).join("").slice(0, 3)}
                  </span>
                </div>
              )}

              {/* Sweeping shine */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 35%, color-mix(in oklab, white 40%, transparent) 50%, transparent 65%)",
                }}
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 2.4, delay: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
              />
            </div>

            {/* Floating accent chips */}
            <motion.div
              className="absolute -right-4 top-8 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium shadow-soft backdrop-blur"
              style={{ transform: "translateZ(80px)" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦ Available
            </motion.div>
            <motion.div
              className="absolute -left-6 bottom-12 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium shadow-soft backdrop-blur"
              style={{ transform: "translateZ(60px)" }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              ⚡ Fast delivery
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <motion.span
            className="block h-8 w-px bg-current"
            animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
      <div className="font-display text-2xl font-bold sm:text-3xl">
        <CountUp to={value} />+
      </div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </motion.div>
  );
}
