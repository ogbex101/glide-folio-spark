import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { Quote, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { reveal, stagger } from "@/lib/motion";
import { DEV_QUOTES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function useRotatingQuotes(custom?: string | null) {
  const quotes = (() => {
    const base = [...DEV_QUOTES];
    if (custom && !base.includes(custom)) base.unshift(custom);
    return base.slice(0, 5);
  })();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (quotes.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % quotes.length), 5200);
    return () => clearInterval(t);
  }, [quotes.length]);
  return { quote: quotes[i], index: i, count: quotes.length, setIndex: setI };
}

export function Story({ bundle }: { bundle: NicheBundle }) {
  const story: any = bundle.story;
  const { quote, index, count, setIndex } = useRotatingQuotes(story?.quote);
  if (!story?.story_text) return null;
  const hasMore = !!(story.story_long || story.story_text);

  return (
    <SectionShell id="story" eyebrow="My story" title="The path that brought me here.">
      <motion.div
        className="grid gap-8 md:grid-cols-5 md:gap-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.15)}
      >
        <motion.div className="space-y-6 md:col-span-3" variants={reveal}>
          <p className="text-lg leading-relaxed text-muted-foreground text-balance">{story.story_text}</p>

          {/* Rotating quotes */}
          <div className="relative min-h-[8.5rem] overflow-hidden rounded-2xl border-l-4 border-[color:var(--brand-primary-hex)] bg-card p-6 shadow-soft">
            <Quote className="absolute -left-2 -top-2 h-6 w-6 text-[color:var(--brand-accent-hex)]" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-lg italic leading-relaxed sm:text-xl"
              >
                “{quote}”
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-4 flex gap-1.5">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show quote ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-[color:var(--brand-accent-hex)]" : "w-1.5 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>

          {hasMore && (
            <Button asChild size="lg" variant="outline" className="group">
              <Link to="/niche/$slug/story" params={{ slug: bundle.niche.slug }}>
                See more of my story
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </motion.div>

        <motion.div className="md:col-span-2" variants={reveal}>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-gradient-brand shadow-elegant">
            {story.image_url ? (
              <img src={story.image_url} alt="My story" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center text-primary-foreground">
                <Quote className="h-16 w-16 opacity-30" />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
