import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { nicheBundleQuery } from "@/lib/niche-queries";
import { motion } from "framer-motion";
import { ArrowLeft, Quote } from "lucide-react";
import { DEV_QUOTES } from "@/lib/mock-data";

export const Route = createFileRoute("/niche/$slug/story")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(nicheBundleQuery(params.slug)),
  component: StoryPage,
});

function StoryPage() {
  const { slug } = Route.useParams();
  const { data: bundle } = useQuery(nicheBundleQuery(slug));
  if (!bundle?.story) return null;

  const s: any = bundle.story;
  const full: string = s.story_long || s.story_text || "";
  const paragraphs = full.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const name = bundle.settings?.full_name ?? "Ogbeifun Daniel";
  const signature = s.quote || DEV_QUOTES[0];

  return (
    <article className="relative">
      {/* Hero band */}
      <header className="relative overflow-hidden bg-gradient-hero">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-brand)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <Link
            to="/niche/$slug"
            params={{ slug }}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to portfolio
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-accent-hex)]">
              My story
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              How I went from breaking websites to building them.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">— {name}</p>
          </motion.div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {s.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 aspect-[16/9] overflow-hidden rounded-3xl border border-border shadow-elegant"
          >
            <img src={s.image_url} alt="My story" className="h-full w-full object-cover" />
          </motion.div>
        )}

        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3) }}
              className={`leading-relaxed text-muted-foreground ${
                i === 0 ? "text-xl text-foreground first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-[color:var(--brand-primary-hex)]" : "text-lg"
              }`}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Signature quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-12"
        >
          <Quote className="mx-auto mb-4 h-8 w-8 text-[color:var(--brand-accent-hex)]" />
          <p className="font-display text-2xl font-medium italic leading-relaxed text-balance sm:text-3xl">
            “{signature}”
          </p>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{name}</p>
        </motion.blockquote>

        <div className="mt-12 text-center">
          <Link
            to="/niche/$slug"
            params={{ slug }}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--brand-primary-hex)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to the portfolio
          </Link>
        </div>
      </div>
    </article>
  );
}
