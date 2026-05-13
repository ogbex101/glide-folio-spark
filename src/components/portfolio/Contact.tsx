import type { NicheBundle } from "@/lib/niche-queries";
import { SectionShell } from "./SectionShell";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { gentleBounce, stagger } from "@/lib/motion";

export function Contact({ bundle }: { bundle: NicheBundle }) {
  const s = bundle.settings;
  if (!s) return null;
  const items = [
    s.email && { icon: Mail, label: "Email", value: s.email, href: `mailto:${s.email}` },
    s.phone && { icon: Phone, label: "Phone", value: s.phone, href: `tel:${s.phone}` },
    s.whatsapp && { icon: MessageCircle, label: "WhatsApp", value: s.whatsapp, href: `https://wa.me/${s.whatsapp.replace(/[^\d]/g, "")}` },
    s.location && { icon: MapPin, label: "Location", value: s.location, href: undefined },
  ].filter(Boolean) as Array<{ icon: any; label: string; value: string; href?: string }>;

  return (
    <SectionShell id="contact" eyebrow="Get in touch" title="Let's build something great." description="Available for new projects. Drop a message and I'll reply within 24 hours.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => {
      <motion.div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.1)}
      >
        {items.map((it) => {
          const Icon = it.icon;
          const inner = (
            <div className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{it.label}</div>
                <div className="mt-1 font-medium break-words">{it.value}</div>
              </div>
            </div>
          );
          return (
            <motion.div key={it.label} variants={gentleBounce}>
              {it.href ? (
                <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
