## Goal

Add the 7 client/portfolio sites you listed to the **"Projects I'm proud of"** section on `/niche/fullstack-developer`, each with its own screenshot as the preview image and a working "Visit live site" link.

## Projects to add

| Brand | URL | Category |
|---|---|---|
| Customer Result | https://outcome-engine-core.lovable.app/ | Homepage Redesign |
| Motion Health | https://motion-health-launch.lovable.app/ | Healthtech Redesign |
| Allied Properties | https://allied-property-compass.lovable.app/ | Real Estate |
| Innate Gathering | https://golden-coast-gather.lovable.app/ | Landing Page |
| Clairvoyant Program | https://serene-path-redesign.lovable.app/ | UX Redesign |
| Muscular Dystrophy NZ (MDANZ) | https://heart-of-nz.lovable.app | Nonprofit |
| Faith Portfolio | https://caleb-ai-vision.lovable.app/faith | Portfolio |

## Steps

1. **Capture screenshots** — drive Playwright via shell to load each URL at 1280×800, wait for the hero to render, save a 16:9 PNG for each site.
2. **Upload to CDN** — push each PNG through `lovable-assets create` so the images live on the CDN, not in the repo, and grab the `.url` from each pointer.
3. **Extend the mock data** — append the 7 entries to `FULLSTACK_PROJECTS` in `src/lib/mock-data.ts` with:
   - `brand_name`, `description` (from the table), `category`, `platform: "Web"`
   - `media_url` = CDN URL from step 2
   - `external_link` = the live URL (so the green "Live" badge + "Visit live site" CTA work)
   - `technologies: ["React", "Tailwind CSS", "Framer Motion", "Lovable (Vibe Coding)"]`
   - `is_starred: true` so they surface in the homepage carousel
4. **Verify** — open `/niche/fullstack-developer#projects`, screenshot the carousel, and confirm the new cards render with their previews and live links.

## Scope notes

- Code-only change (mock data + new asset pointer files). No DB migration, no admin work.
- These appear under **fullstack-developer** only, as you confirmed.
- The existing 9 fullstack projects stay; the 7 new ones are appended.
- I'm **not** importing services/skills/story copy from the other portfolios this round.

## Technical details

- Files touched: `src/lib/mock-data.ts`, plus 7 new `src/assets/projects/*.png.asset.json` pointer files.
- Screenshots taken headlessly with Playwright (`viewport={1280,800}`, `wait_until="networkidle"`, 2s settle for animations).
- If any URL fails to load or returns a Lovable preview-not-found page, I'll fall back to a `PlaceholderMedia` (no `media_url`) for that one entry and tell you which.
