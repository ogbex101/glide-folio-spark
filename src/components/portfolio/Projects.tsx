import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
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
    let startX = 0;
    let startScroll = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      isDown = true;
      el.classList.add("cursor-grabbing");
      startX = e.pageX;
      startScroll = el.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!isDown) return;
      el.scrollLeft = startScroll - (e.pageX - startX);
    };
    const up = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
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
            <motion.article
              key={p.id}
              data-project-card
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ y: -6 }}
              onClick={() => setActive(p)}
              className="group relative flex-shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-elegant w-[85vw] sm:w-[60vw] md:w-[420px] lg:w-[460px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {p.media_url ? (
                  <img
                    src={p.media_url}
                    alt={p.brand_name ?? p.title ?? "Project"}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-brand font-display text-3xl font-bold text-primary-foreground">
                    {(p.brand_name ?? p.title ?? "?")[0]}
                  </div>
                )}
                {p.platform && (
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
                    {p.platform}
                  </span>
                )}
              </div>
              <div className="p-5">
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
                  {(p.external_link || p.figma_link) && (
                    <a
                      href={p.external_link || p.figma_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="Open external link"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                {p.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </SectionShell>
  );
}

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

  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        {project && (
          <>
            {project.media_url && (
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={project.media_url}
                  alt={project.brand_name ?? project.title ?? ""}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="space-y-4 p-6">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {project.brand_name ?? project.title}
                </DialogTitle>
                {project.category && (
                  <DialogDescription className="text-xs uppercase tracking-wider">
                    {project.category}
                    {project.platform ? ` • ${project.platform}` : ""}
                  </DialogDescription>
                )}
              </DialogHeader>
              {project.description && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              )}
              {techs && techs.length > 0 && (
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(project.external_link || project.figma_link) && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.external_link && (
                    <Button asChild>
                      <a
                        href={project.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live link
                      </a>
                    </Button>
                  )}
                  {project.figma_link && (
                    <Button asChild variant="outline">
                      <a
                        href={project.figma_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View design
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
