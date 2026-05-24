import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NicheBundle } from "@/lib/niche-queries";
import { FULLSTACK_PROJECTS } from "@/lib/mock-data";
import { SectionShell } from "./SectionShell";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  Figma,
  Play,
  Pause,
} from "lucide-react";
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

const SLIDE_INTERVAL = 4000;

export function Projects({
  bundle,
  showAll = false,
  techFilter,
}: {
  bundle: NicheBundle;
  showAll?: boolean;
  techFilter?: string | null;
}) {
  const limit = bundle.limits.projects ?? 9;
  const real = bundle.projects as Project[];
  const source = real.length > 0 ? real : (FULLSTACK_PROJECTS as Project[]);

  // Apply tech filter if provided
  const filtered = techFilter
    ? source.filter((p) => {
        const techs = normalizeTechs(p.technologies);
        return techs.some(
          (t) => t.toLowerCase() === techFilter.toLowerCase()
        );
      })
    : source;

  const starred = filtered.filter((p) => p.is_starred);
  const list = showAll
    ? filtered
    : (starred.length ? starred : filtered).slice(0, limit);

  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState<Project | null>(null);
  const [playing, setPlaying] = useState(true);
  const [direction, setDirection] = useState<1 | -1>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((c) => {
        const next = c + dir;
        if (next < 0) return list.length - 1;
        if (next >= list.length) return 0;
        return next;
      });
    },
    [list.length]
  );

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => go(1), SLIDE_INTERVAL);
  }, [go]);

  useEffect(() => {
    if (playing && list.length > 1) startAutoplay();
    else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, list.length, startAutoplay]);

  // Reset slide when list changes (filter changes)
  useEffect(() => {
    setCurrent(0);
  }, [techFilter]);

  if (list.length === 0) {
    return (
      <SectionShell
        id="projects"
        eyebrow="Selected work"
        title="Projects I'm proud of."
        description="No projects match this technology filter yet."
        alt
      >
        <p className="text-muted-foreground text-sm">
          Try selecting a different tool or language above.
        </p>
      </SectionShell>
    );
  }

  const handlePrev = () => {
    go(-1);
    if (playing) startAutoplay();
  };
  const handleNext = () => {
    go(1);
    if (playing) startAutoplay();
  };

  const prev = list[(current - 1 + list.length) % list.length];
  const cur = list[current];
  const next = list[(current + 1) % list.length];

  return (
    <SectionShell
      id="projects"
      eyebrow={techFilter ? `Projects using ${techFilter}` : "Selected work"}
      title="Projects I'm proud of."
      description="Auto-playing showcase — click any project for the full story."
      alt
      viewAllTo={!showAll ? "/niche/$slug/projects" : undefined}
      viewAllParams={!showAll ? { slug: bundle.niche.slug } : undefined}
    >
      <div className="relative overflow-hidden">
        {/* Controls row */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                    if (playing) startAutoplay();
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-[color:var(--brand-accent-hex)]"
                      : "w-1.5 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleNext}
              aria-label="Next project"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Three-card cinematic view */}
        <div className="relative flex items-center justify-center gap-4">
          {/* Ghost prev card */}
          {list.length > 1 && (
            <div
              className="hidden md:block w-[280px] lg:w-[320px] shrink-0 scale-90 opacity-40 cursor-pointer transition-all duration-500 select-none"
              onClick={handlePrev}
            >
              <ProjectCardSlide project={prev} ghost />
            </div>
          )}

          {/* Main active card */}
          <div className="w-full max-w-[620px] shrink-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={cur.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="cursor-pointer"
                onClick={() => setActive(cur)}
              >
                <ProjectCardSlide project={cur} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Ghost next card */}
          {list.length > 1 && (
            <div
              className="hidden md:block w-[280px] lg:w-[320px] shrink-0 scale-90 opacity-40 cursor-pointer transition-all duration-500 select-none"
              onClick={handleNext}
            >
              <ProjectCardSlide project={next} ghost />
            </div>
          )}
        </div>

        {/* Progress bar */}
        {playing && (
          <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              key={`${current}-${playing}`}
              className="h-full rounded-full bg-[color:var(--brand-accent-hex)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
            />
          </div>
        )}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </SectionShell>
  );
}

/* ---------- Slide variants ---------- */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "60%" : "-60%",
    opacity: 0,
    scale: 0.92,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-60%" : "60%",
    opacity: 0,
    scale: 0.92,
    filter: "blur(8px)",
  }),
};

/* ---------- Landscape card ---------- */
function ProjectCardSlide({
  project: p,
  ghost = false,
}: {
  project: Project;
  ghost?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow ${
        ghost ? "" : "hover:shadow-elegant"
      }`}
    >
      {/* Landscape image container — 16:9 */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-muted via-background to-muted">
        {p.media_url ? (
          <img
            src={p.media_url}
            alt={p.brand_name ?? p.title ?? "Project"}
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <PlaceholderMedia name={p.brand_name ?? p.title ?? "?"} />
        )}

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        {p.platform && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
            {p.platform}
          </span>
        )}
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
            <Clock className="h-3 w-3" /> Coming Soon
          </span>
        )}

        {/* Bottom title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-xl font-bold text-white drop-shadow">
            {p.brand_name ?? p.title}
          </h3>
          {p.category && (
            <p className="text-xs uppercase tracking-wider text-white/70">
              {p.category}
            </p>
          )}
        </div>
      </div>

      {/* Description strip */}
      {!ghost && p.description && (
        <div className="p-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {p.description}
          </p>
          {/* Tech chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {normalizeTechs(p.technologies)
              .slice(0, 4)
              .map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[10px] font-medium"
                >
                  {t}
                </span>
              ))}
            {normalizeTechs(p.technologies).length > 4 && (
              <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                +{normalizeTechs(p.technologies).length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/* ---------- Placeholder for projects without a media URL ---------- */
function PlaceholderMedia({ name }: { name: string }) {
  const colors: Record<string, string> = {
    "Xperience Games":  "from-violet-900 via-purple-800 to-indigo-900",
    Xanctum:           "from-slate-900 via-zinc-800 to-stone-900",
    Jobcondi:          "from-emerald-900 via-teal-800 to-cyan-900",
    "Scholar Forge":   "from-orange-900 via-amber-800 to-yellow-900",
    "Luxe Estate":     "from-yellow-900 via-amber-700 to-orange-800",
    "Bloom Trader Pro":"from-green-900 via-emerald-800 to-teal-900",
    "Vision Mail Research": "from-blue-900 via-cyan-800 to-sky-900",
    Alat:              "from-red-900 via-rose-800 to-pink-900",
    "Xpers Streaming": "from-fuchsia-900 via-purple-800 to-violet-900",
  };
  const gradient = colors[name] ?? "from-zinc-900 via-neutral-800 to-stone-900";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${gradient} gap-3`}
    >
      <div className="grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        <span className="font-display text-2xl font-bold text-white/90">
          {initials}
        </span>
      </div>
      <p className="text-sm font-medium text-white/60 tracking-wide">{name}</p>
      <p className="text-xs text-white/30">Image coming soon</p>
    </div>
  );
}

/* ---------- Normalise technologies field ---------- */
function normalizeTechs(tech: string[] | string | undefined): string[] {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  return tech
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/* ---------- Modal ---------- */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const techs = normalizeTechs(project?.technologies);
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
              {/* Landscape hero — 16:9 */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {project.media_url ? (
                  <motion.img
                    src={project.media_url}
                    alt={project.brand_name ?? project.title ?? ""}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : (
                  <PlaceholderMedia
                    name={project.brand_name ?? project.title ?? "?"}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>

              <motion.div
                className="space-y-5 p-6 sm:p-8"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.25 },
                  },
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

                {techs.length > 0 && (
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

                <motion.div
                  variants={lineUp}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {hasLive ? (
                    <Button
                      asChild
                      size="lg"
                      className="group/cta relative overflow-hidden"
                    >
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
