-- ─────────────────────────────────────────────────────────────────────────
-- Schema additions for the redesigned portfolio sections
-- ─────────────────────────────────────────────────────────────────────────

-- Long-form story shown on the dedicated "See more story" page.
ALTER TABLE public.niche_stories ADD COLUMN IF NOT EXISTS story_long TEXT;

-- Brand logos: allow logoless brands (we render a generated placeholder) and
-- let each brand carry a clickable website link.
ALTER TABLE public.brand_logos ALTER COLUMN logo_url DROP NOT NULL;
ALTER TABLE public.brand_logos ADD COLUMN IF NOT EXISTS external_link TEXT;

-- ─────────────────────────────────────────────────────────────────────────
-- Polished copy for the Full-Stack Developer niche (only overwrite the old
-- auto-generated defaults, never a value the owner has since customised).
-- ─────────────────────────────────────────────────────────────────────────

UPDATE public.niche_settings ns
SET
  hero_tagline = 'I turn rough ideas into web apps people actually love to use.',
  bio = 'I''m a full-stack developer who builds the whole thing — the database, the logic, and the polished, animated interface people actually touch. I care about the small stuff: how fast it loads, how it feels on a cheap phone, whether the next developer can read my code. I move quickly with modern tooling, but I never ship something I wouldn''t be proud to put my name on.'
FROM public.niches n
WHERE ns.niche_id = n.id
  AND n.slug = 'fullstack-developer'
  AND (
    ns.hero_tagline IS NULL
    OR ns.hero_tagline IN ('Shipping production apps with style and speed.', 'Crafting work that drives results.')
  );

-- Seed / refresh the story for the Full-Stack niche.
INSERT INTO public.niche_stories (niche_id, story_text, story_long, quote, image_url)
SELECT
  n.id,
  $story$It started with a borrowed laptop and a stubborn question: how do these websites actually work? I spent nights breaking things, refreshing the browser, and chasing that small rush when something finally clicked into place. That curiosity never left — it just got bigger. One landing page became a dashboard, a dashboard became a full product, and somewhere along the way building things for other people turned into the thing I'd happily do for free.$story$,
  $long$I never had a clean, linear start. I learned the way most self-taught developers do — out of order, late at night, and usually because something I wanted to build didn't exist yet. The first time I deployed something to a real URL and sent it to a friend, I was hooked for life. That feeling of "I thought of this, and now it's live and you can touch it" is still the reason I do this.

The early years were messy in the best way. I shipped ugly projects, rewrote them, broke production more than once, and learned that the bugs I hated most were the ones that taught me the most. I stopped chasing clever code and started caring about code the next person could actually read — usually because that next person was me, six months later, with no memory of what I'd written.

Over time I grew from "can you make this button work" into building entire products end to end: the database, the API, the auth, the payments, and the polished, animated front end on top. I fell hard for design too — motion, spacing, the tiny details most people feel but never notice. I learned that performance and accessibility aren't extras you bolt on later; they're part of respecting the people who use what you build.

These days I move fast without cutting corners. I lean into modern tooling and AI-assisted workflows to go from idea to working product in days, then spend my energy where it actually matters — the experience, the reliability, the feel of the thing. I've built gaming platforms, marketplaces, trading dashboards, streaming apps and brand sites, most of them solo, all of them with the same obsession I had on night one.

I'm still that curious kid breaking things to understand them. I just have better tools now — and a much longer list of ideas I can't wait to ship.$long$,
  $quote$As long as there is programming, there is no idea that can't be materialized or digitalized on the web.$quote$,
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80'
FROM public.niches n
WHERE n.slug = 'fullstack-developer'
  AND NOT EXISTS (SELECT 1 FROM public.niche_stories WHERE niche_id = n.id);

-- ─────────────────────────────────────────────────────────────────────────
-- Seed editable Projects for the Full-Stack niche (only if none exist yet).
-- Media + links are intentionally blank so they can be filled in from admin.
-- ─────────────────────────────────────────────────────────────────────────

INSERT INTO public.projects
  (niche_id, brand_name, category, platform, description, media_url, media_type, external_link, is_starred, sort_order)
SELECT n.id, p.brand_name, p.category, p.platform, p.description, '', 'image', '', p.is_starred, p.sort_order
FROM public.niches n
CROSS JOIN (VALUES
  ('Xperience Games', 'Gaming Platform', 'Web',  'A next-generation gaming platform built to deliver immersive experiences, community features, leaderboards, and real-time multiplayer matchmaking.', true, 1),
  ('Xanctum', 'Brand Platform', 'Web', 'A premium brand identity and digital platform built with bold design, immersive animations, and cutting-edge technology that makes Xanctum impossible to ignore.', true, 2),
  ('Jobcondi', 'Web App', 'SaaS', 'A modern job marketplace connecting top talent with forward-thinking companies. Features smart matching, real-time notifications and a beautiful application pipeline.', true, 3),
  ('Scholar Forge', 'EdTech', 'Web', 'An e-learning platform that forges academic pathways for students through interactive courses, AI-assisted tutoring, and progress-tracking dashboards.', true, 4),
  ('Luxe Estate', 'Real Estate', 'Web', 'A high-end real estate platform presenting premium properties with cinematic imagery, virtual tours, and a seamless inquiry-to-viewing booking flow.', true, 5),
  ('Bloom Trader Pro', 'FinTech', 'Web', 'A sophisticated trading dashboard giving investors a real-time overview of their portfolio, market trends, alerts and analytics — all in one beautiful interface.', true, 6),
  ('Vision Mail Research', 'AI Tool', 'SaaS', 'An AI-powered email research and intelligence tool that helps teams mine insights from email campaigns, track deliverability, and optimise outreach strategies.', false, 7),
  ('Alat', 'Productivity', 'Web', 'A versatile productivity web application designed to streamline workflows, manage tasks and automate repetitive operations for teams of all sizes.', false, 8),
  ('Xpers Streaming', 'Streaming', 'Web', 'A full-featured streaming web app with real-time broadcast, live chat, viewer analytics, and monetisation tools — built to scale from day one.', true, 9)
) AS p(brand_name, category, platform, description, is_starred, sort_order)
WHERE n.slug = 'fullstack-developer'
  AND NOT EXISTS (SELECT 1 FROM public.projects WHERE niche_id = n.id);

-- ─────────────────────────────────────────────────────────────────────────
-- Seed editable Brand logos for the Full-Stack niche (logoless → generated
-- placeholder mark renders on the site). Only if none exist yet.
-- ─────────────────────────────────────────────────────────────────────────

INSERT INTO public.brand_logos
  (niche_id, alt_text, bg_color, external_link, is_starred, sort_order)
SELECT n.id, b.alt_text, b.bg_color, '', true, b.sort_order
FROM public.niches n
CROSS JOIN (VALUES
  ('Xanctum', '#8B5CF6', 1),
  ('Xperience Games', '#6366F1', 2),
  ('Jobcondi', '#10B981', 3),
  ('Scholar Forge', '#F59E0B', 4),
  ('Luxe Estate', '#D97706', 5),
  ('Bloom Trader Pro', '#34D399', 6),
  ('Vision Mail Research', '#38BDF8', 7),
  ('Alat', '#F87171', 8),
  ('Xpers Streaming', '#A78BFA', 9)
) AS b(alt_text, bg_color, sort_order)
WHERE n.slug = 'fullstack-developer'
  AND NOT EXISTS (SELECT 1 FROM public.brand_logos WHERE niche_id = n.id);
