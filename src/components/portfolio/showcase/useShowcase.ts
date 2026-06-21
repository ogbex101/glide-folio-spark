import { useCallback, useEffect, useRef, useState } from "react";

export type ShowcaseApi = {
  index: number;
  count: number;
  playing: boolean;
  direction: 1 | -1;
  /** 0 → 1 progress through the current slide's timer */
  progress: number;
  next: () => void;
  prev: () => void;
  goto: (i: number, dir?: 1 | -1) => void;
  toggle: () => void;
  setPlaying: (v: boolean) => void;
};

/**
 * Drives every "toggling" section (Services, Skills, Certifications, Brands).
 * Each slide gets a fixed time budget (default 10s) before auto-advancing.
 * You can fast-forward / rewind, jump to any slide, and pause/resume — the
 * timer resumes from where it left off instead of restarting.
 */
export function useShowcase(
  count: number,
  opts?: { duration?: number; autoplay?: boolean }
): ShowcaseApi {
  const duration = opts?.duration ?? 10_000;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(opts?.autoplay ?? true);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const lastSetRef = useRef(0);

  const resetTimer = () => {
    elapsedRef.current = 0;
    lastSetRef.current = 0;
    setProgress(0);
  };

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (count ? (i + 1) % count : 0));
    resetTimer();
  }, [count]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (count ? (i - 1 + count) % count : 0));
    resetTimer();
  }, [count]);

  const goto = useCallback(
    (i: number, dir?: 1 | -1) => {
      setIndex((cur) => {
        const target = count ? ((i % count) + count) % count : 0;
        setDirection(dir ?? (target >= cur ? 1 : -1));
        return target;
      });
      resetTimer();
    },
    [count]
  );

  const toggle = useCallback(() => setPlaying((p) => !p), []);

  // Keep index in range if the collection shrinks.
  useEffect(() => {
    if (index > count - 1) {
      setIndex(0);
      resetTimer();
    }
  }, [count, index]);

  // rAF-driven timer so the progress ring/bar stays buttery and resumable.
  useEffect(() => {
    if (!playing || count <= 1) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      elapsedRef.current += dt;
      const p = Math.min(elapsedRef.current / duration, 1);
      // Throttle React state updates (~1% steps) so the slide subtree isn't
      // re-rendered every animation frame.
      if (p - lastSetRef.current >= 0.01 || p === 1) {
        lastSetRef.current = p;
        setProgress(p);
      }
      if (p >= 1) {
        elapsedRef.current = 0;
        lastSetRef.current = 0;
        setProgress(0);
        setDirection(1);
        setIndex((i) => (i + 1) % count);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, count, duration, index]);

  return { index, count, playing, direction, progress, next, prev, goto, toggle, setPlaying };
}
