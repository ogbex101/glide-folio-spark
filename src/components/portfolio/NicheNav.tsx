import { Link, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { allNichesQuery } from "@/lib/niche-queries";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const SECTIONS: { id: string; label: string }[] = [
  { id: "about", label: "About" },
  { id: "story", label: "Story" },
  { id: "services", label: "What I do" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "brands", label: "Brands" },
  { id: "contact", label: "Contact" },
];

export function NicheNav() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const navigate = useNavigate();
  const { data: niches = [] } = useQuery(allNichesQuery());
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Are we on the niche home (where the anchor sections live)?
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // True on either /niche/$slug or /$user/niche/$slug (but not their subpages).
  const onHome = !!slug && new RegExp(`/niche/${slug}/?$`).test(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    if (!onHome) return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome, pathname]);

  const goToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (slug) {
      // Navigate to the home page then scroll once it renders.
      navigate({ to: "/niche/$slug", params: { slug }, hash: id });
    }
  };

  const active = niches.find((n) => n.slug === slug);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-smooth",
        scrolled ? "glass border-b border-border/40 shadow-soft" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/niche/$slug"
          params={{ slug: slug ?? "email-marketer" }}
          className="flex shrink-0 items-center gap-2 font-display text-base font-bold tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-elegant">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Ogbeifun Daniel</span>
        </Link>

        {/* Section anchors */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => goToSection(sec.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-smooth",
                onHome && activeSection === sec.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {sec.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Niche switcher */}
          {niches.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden gap-1 md:inline-flex">
                  <span className="max-w-[140px] truncate">{active?.display_name ?? "Switch"}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {niches.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    onClick={() => navigate({ to: "/niche/$slug", params: { slug: n.slug } })}
                    className={cn(n.slug === slug && "font-semibold text-[color:var(--brand-primary-hex)]")}
                  >
                    {n.display_name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="default"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => goToSection("contact")}
          >
            Hire Me
          </Button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            <div className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sections
            </div>
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => goToSection(sec.id)}
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-sm font-medium transition-smooth",
                  onHome && activeSection === sec.id ? "bg-muted text-foreground" : "hover:bg-muted"
                )}
              >
                {sec.label}
              </button>
            ))}

            {niches.length > 1 && (
              <>
                <div className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Switch portfolio
                </div>
                {niches.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      setMobileOpen(false);
                      navigate({ to: "/niche/$slug", params: { slug: n.slug } });
                    }}
                    className={cn(
                      "rounded-lg px-3 py-2 text-left text-sm font-medium transition-smooth",
                      n.slug === slug ? "bg-gradient-brand text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    {n.display_name}
                  </button>
                ))}
              </>
            )}

            <Button className="mt-2" onClick={() => goToSection("contact")}>
              Hire Me
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
