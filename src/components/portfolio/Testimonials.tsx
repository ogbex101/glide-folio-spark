import { useCallback, useEffect, useRef, useState } from "react";
import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const SLIDE_INTERVAL = 5000;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "50%" : "-50%",
    opacity: 0,
    scale: 0.94,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-50%" : "50%",
    opacity: 0,
    scale: 0.94,
    filter: "blur(6px)",
  }),
};

export function Testimonials({
  bundle,
  showAll = false,
}: {
  bundle: NicheBundle;
  showAll?: boolean;
}) {
  const limit = bundle.limits.testimonials ?? 6;
  const starred = bundle.testimonials.filter((t: any) => t.is_starred);
  const list = showAll
    ? bundle.testimonials
    : (starred.length ? starred : bundle.testimonials).slice(0, limit);

  const [current, setCurrent] = useState(0);
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

  if (list.length === 0) return null;

  const handlePrev = () => {
    go(-1);
    if (playing) startAutoplay();
  };
  const handleNext = () => {
    go(1);
    if (playing) startAutoplay();
  };

  const t: any = list[current];

  return (
    <SectionShell
      id="testimonials"
      eyebrow="Praise"
      title="What clients are saying."
      alt
      viewAllTo={!showAll ? "/niche/$slug/testimonials" : undefined}
      viewAllParams={!showAll ? { slug: bundle.niche.slug } : undefined}
    >
      {/* Controls */}
      <div className="mb-6 flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {list.map((_: any, i: number) => (
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
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
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
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Slide area */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.figure
            key={t.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-elegant"
          >
            <Quote className="absolute right-6 top-6 h-10 w-10 text-[color:var(--brand-accent-hex)] opacity-30" />

            {/* Stars */}
            <div className="mb-4 flex gap-1 text-[color:var(--brand-accent-hex)]">
              {Array.from({ length: t.rating ?? 5 }).map((_: any, i: number) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            {/* Review text */}
            <blockquote className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
              "{t.review_text}"
            </blockquote>

            {/* Author */}
            <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-5">
              {t.photo_url ? (
                <img
                  src={t.photo_url}
                  alt={t.client_name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-[color:var(--brand-accent-hex)]/40"
                />
              ) : (
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[color:var(--brand-accent-hex)] to-purple-600 font-bold text-white text-lg ring-2 ring-[color:var(--brand-accent-hex)]/40">
                  {t.client_name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
              <div>
                <div className="font-semibold text-foreground">
                  {t.client_name}
                </div>
                {t.role && (
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                )}
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      {playing && list.length > 1 && (
        <div className="mx-auto mt-4 h-0.5 w-full max-w-3xl overflow-hidden rounded-full bg-border">
          <motion.div
            key={`${current}-playing`}
            className="h-full rounded-full bg-[color:var(--brand-accent-hex)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
          />
        </div>
      )}
    </SectionShell>
  );
}
