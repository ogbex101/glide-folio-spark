import { type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useShowcase, type ShowcaseApi } from "./useShowcase";

type RenderArgs = { index: number; active: boolean; api: ShowcaseApi };

export function ShowcaseStage<T>({
  items,
  renderItem,
  variants,
  transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  duration = 10_000,
  getKey,
  stageClassName = "",
  className = "",
  controlsLabel,
}: {
  items: T[];
  renderItem: (item: T, args: RenderArgs) => ReactNode;
  /** Per-section enter/exit motion — this is what makes each section feel unique. */
  variants: Variants;
  transition?: Transition;
  duration?: number;
  getKey?: (item: T, index: number) => string | number;
  stageClassName?: string;
  className?: string;
  controlsLabel?: (index: number, count: number) => string;
}) {
  const api = useShowcase(items.length, { duration });
  const { index, count, direction } = api;
  const item = items[index];
  if (!item) return null;
  const key = getKey ? getKey(item, index) : index;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => api.setPlaying(false)}
      onMouseLeave={() => api.setPlaying(true)}
    >
      <div className={`relative ${stageClassName}`}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={key}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -400) api.next();
              else if (info.offset.x > 80 || info.velocity.x > 400) api.prev();
            }}
            className="h-full w-full cursor-grab active:cursor-grabbing"
          >
            {renderItem(item, { index, active: true, api })}
          </motion.div>
        </AnimatePresence>
      </div>

      <ShowcaseControls api={api} label={controlsLabel?.(index, count)} />
    </div>
  );
}

export function ShowcaseControls({
  api,
  label,
}: {
  api: ShowcaseApi;
  label?: string;
}) {
  const { index, count, playing, progress } = api;
  // Circular progress geometry for the play/pause ring.
  const R = 18;
  const C = 2 * Math.PI * R;

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {/* Segmented progress / dots */}
      <div className="flex w-full max-w-md items-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api.goto(i)}
            aria-label={`Go to item ${i + 1}`}
            className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-border"
          >
            <span
              className="absolute inset-0 origin-left rounded-full bg-[color:var(--brand-accent-hex)] transition-transform"
              style={{
                transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})`,
              }}
            />
            <span className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-20 bg-[color:var(--brand-primary-hex)]" />
          </button>
        ))}
      </div>

      {/* Transport controls */}
      <div className="flex items-center gap-2">
        <CtrlButton onClick={() => api.goto(0, -1)} label="Rewind to start">
          <SkipBack className="h-4 w-4" />
        </CtrlButton>
        <CtrlButton onClick={api.prev} label="Previous">
          <ChevronLeft className="h-5 w-5" />
        </CtrlButton>

        {/* Play / pause with circular progress */}
        <button
          onClick={api.toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="relative grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-smooth hover:shadow-elegant"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r={R} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth="2.5" />
            <circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke="var(--brand-accent-hex)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
            />
          </svg>
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>

        <CtrlButton onClick={api.next} label="Next">
          <ChevronRight className="h-5 w-5" />
        </CtrlButton>
        <CtrlButton onClick={() => api.goto(count - 1, 1)} label="Skip to end">
          <SkipForward className="h-4 w-4" />
        </CtrlButton>
      </div>

      {label && (
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </div>
      )}
    </div>
  );
}

function CtrlButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-soft transition-colors hover:text-foreground"
    >
      {children}
    </motion.button>
  );
}
