## Goal
Restructure the hero so the profile image fills the full width and all text content (headline, bio, buttons, stats) is overlaid on top of it.

## Plan

### 1. Hero layout overhaul (`src/components/portfolio/Hero.tsx`)
- Remove the `md:grid-cols-2` two-column grid.
- Make the profile picture container span the full width of the hero at a taller aspect ratio (e.g. `aspect-[16/9]` or `aspect-[21/9]`, or `h-[70vh]`).
- Move the text content block (badge, headline, bio, buttons, stats) so it sits absolutely over the image area, not in a separate column.
- Add a subtle dark gradient overlay behind the text to guarantee readability over the image.
- Preserve existing motion/animation on text elements and the profile image.
- Keep the floating accent chips and 3D tilt on the image.
- Adjust the stats bar so it reads clearly when overlaid (e.g. stronger backdrop blur / higher opacity).

### 2. Visual polish
- Ensure responsive behavior: on mobile the image stays full-width and text remains legible.
- Keep the existing scroll parallax (`yText`, `opacity`) working.
- The spotlight + grid overlay should still apply across the whole hero.

No backend changes, no new dependencies, no route changes.