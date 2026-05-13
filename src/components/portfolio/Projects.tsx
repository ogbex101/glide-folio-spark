import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { ExternalLink, ChevronLeft, ChevronRight, Sparkles, Clock, Figma } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  brand_name?: string;
  title?: string;
  description?: string;
  category?: string;
  platform?: string;
  media_url?: string;
  external_link?: string;
  figma_link?: string;
  technologies?: string[] | string;
  is_starred?: boolean;
};

const MOCK_PROJECTS: Project[] = [
  {
    id: "m1",
    brand_name: "Aurora Commerce",
    description:
      "A modern e-commerce platform redesign focused on conversion, speed, and accessibility.",
    category: "Web App",
    platform: "Web",
    media_url:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80",
    external_link: "https://example.com",
    technologies: ["React", "TypeScript", "Tailwind", "Supabase"],
  },
  {
    id: "m2",
    brand_name: "Pulse Analytics",
    description:
      "Realtime dashboard with live charts, alerting and team collaboration.",
    category: "Dashboard",
    platform: "SaaS",
    media_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    technologies: ["Next.js", "tRPC", "Prisma", "Postgres"],
  },
  {
    id: "m3",
    brand_name: "Nimbus Mobile",
    description:
      "Cross-platform mobile app with offline-first sync and rich animations.",
    category: "Mobile",
    platform: "iOS / Android",
    media_url:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    technologies: ["React Native", "Expo", "Reanimated"],
  },
  {
    id: "m4",
    brand_name: "Forge Studio",
    description:
      "Marketing site & CMS for a creative studio — design system, MDX content, blazing fast.",
    category: "Marketing",
    platform: "Web",
    media_url:
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=1200&q=80",
    technologies: ["Astro", "MDX", "Tailwind"],
  },
  {
    id: "m5",
    brand_name: "LoopAI Assistant",
    description:
      "AI-powered productivity assistant with streaming responses and tool use.",
    category: "AI",
    platform: "Web",
    media_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    technologies: ["Next.js", "OpenAI", "Edge Functions"],
  },
];

export function Projects({ bundle, showAll = false }: { bundle: NicheBundle; showAll?: boolean }) {
  const limit = bundle.limits.projects ?? 6;
  const real = bundle.projects as Project[];
  const source = real.length > 0 ? real : MOCK_PROJECTS;
  const starred = source.filter((p) => p.is_starred);
  const list = showAll
    ? source
    : (starred.length ? starred : source).slice(0, limit);

  const [active, setActive] = useState<Project | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-project-card]");
    const delta = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  // Wheel → horizontal scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Drag to scroll (mouse)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDown = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      isDown = true;
      moved = false;
      el.classList.add("cursor-grabbing");
      startX = e.pageX;
      startScroll = el.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };
    const up = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
      if (moved) {
        // Block the click that follows a drag
        const blocker = (ev: MouseEvent) => {
          ev.stopPropagation();
          ev.preventDefault();
          window.removeEventListener("click", blocker, true);
        };
        window.addEventListener("click", blocker, true);
      }
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  if (list.length === 0) return null;

  return (
    <SectionShell
      id="projects"
      eyebrow="Selected work"
      title="Projects I'm proud of."
      description="Drag, scroll or swipe — each card snaps into focus. Click any project for the full story."
      alt
      viewAllTo={!showAll ? "/niche/$slug/projects" : undefined}
      viewAllParams={!showAll ? { slug: bundle.niche.slug } : undefined}
    >
      <div className="relative">
        {/* Nav arrows (desktop) */}
        <div className="pointer-events-none absolute -top-14 right-0 hidden gap-2 md:flex">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-auto rounded-full"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous project"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-auto rounded-full"
            onClick={() => scrollByCard(1)}
            aria-label="Next project"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 cursor-grab select-none [scrollbar-width:thin]"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {list.map((p, idx) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={idx}
              onOpen={() => setActive(p)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </SectionShell>
  );
}

/* ---------- Card with 3D tilt + shine sweep + Ken Burns ---------- */
function ProjectCard({
  project: p,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 180, damping: 18 });
  const shineX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(my, [0, 1], ["0%", "100%"]);

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      ref={ref as any}
      data-project-card
      initial={{ opacity: 0, y: 30, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={onOpen}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative flex-shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-elegant w-[85vw] sm:w-[60vw] md:w-[420px] lg:w-[460px]"
    >
      {/* Animated gradient border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from var(--angle,0deg), transparent 30%, color-mix(in oklab, var(--primary) 70%, transparent) 50%, transparent 70%)",
          padding: 1,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "spin-border 4s linear infinite",
        }}
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-muted" style={{ transform: "translateZ(30px)" }}>
        {p.media_url ? (
          <motion.img
            src={p.media_url}
            alt={p.brand_name ?? p.title ?? "Project"}
            draggable={false}
            className="h-full w-full object-cover"
            loading="lazy"
            initial={{ scale: 1.05 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-brand font-display text-3xl font-bold text-primary-foreground">
            {(p.brand_name ?? p.title ?? "?")[0]}
          </div>
        )}

        {/* Cursor-following shine */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
          style={{
            background: useTransform(
              [shineX, shineY] as any,
              ([x, y]: any) =>
                `radial-gradient(220px circle at ${x} ${y}, rgba(255,255,255,0.45), transparent 60%)`
            ),
          }}
        />

        {p.platform && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
            {p.platform}
          </span>
        )}

        {/* Live indicator */}
        {p.external_link ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Live
          </span>
        ) : (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
            <Clock className="h-3 w-3" /> Soon
          </span>
        )}
      </div>

      <div className="p-5" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold">
              {p.brand_name ?? p.title}
            </h3>
            {p.category && (
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {p.category}
              </p>
            )}
          </div>
        </div>
        {p.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {p.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}

/* ---------- Modal: flexible, scrollable, with text-split + magnetic CTA ---------- */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const techs = Array.isArray(project?.technologies)
    ? project?.technologies
    : typeof project?.technologies === "string"
      ? project!.technologies.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  const hasLive = !!project?.external_link;

  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[92vh] overflow-hidden p-0 sm:rounded-2xl border-border">
        <AnimatePresence mode="wait">
          {project && (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex max-h-[92vh] flex-col overflow-y-auto"
            >
              {project.media_url && (
                <motion.div
                  className="relative aspect-video w-full overflow-hidden bg-muted"
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                  <motion.img
                    src={project.media_url}
                    alt={project.brand_name ?? project.title ?? ""}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </motion.div>
              )}

              <motion.div
                className="space-y-5 p-6 sm:p-8"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
                }}
              >
                <DialogHeader>
                  <motion.div variants={lineUp}>
                    <DialogTitle className="font-display text-2xl sm:text-3xl">
                      {project.brand_name ?? project.title}
                    </DialogTitle>
                  </motion.div>
                  {(project.category || project.platform) && (
                    <motion.div variants={lineUp}>
                      <DialogDescription className="text-xs uppercase tracking-[0.18em]">
                        {project.category}
                        {project.platform ? ` • ${project.platform}` : ""}
                      </DialogDescription>
                    </motion.div>
                  )}
                </DialogHeader>

                {project.description && (
                  <motion.p
                    variants={lineUp}
                    className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {project.description}
                  </motion.p>
                )}

                {techs && techs.length > 0 && (
                  <motion.div variants={lineUp}>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Built with
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((t, i) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: 0.45 + i * 0.04,
                            type: "spring",
                            stiffness: 280,
                            damping: 16,
                          }}
                          whileHover={{ y: -2, scale: 1.05 }}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Live link is always rendered. Disabled state when no URL is provided yet. */}
                <motion.div variants={lineUp} className="flex flex-wrap gap-2 pt-2">
                  {hasLive ? (
                    <Button asChild size="lg" className="group/cta relative overflow-hidden">
                      <a
                        href={project.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="relative z-10 flex items-center">
                          <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/cta:rotate-12" />
                          Visit live site
                        </span>
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      disabled
                      className="cursor-not-allowed opacity-70"
                      title="Live link will be added soon"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Live link coming soon
                    </Button>
                  )}

                  {project.figma_link && (
                    <Button asChild variant="outline" size="lg">
                      <a
                        href={project.figma_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Figma className="mr-2 h-4 w-4" />
                        View design
                      </a>
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

const lineUp: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};
