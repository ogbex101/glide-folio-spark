import { motion } from "framer-motion";

/** Deterministic hash so each brand always renders the same generated mark. */
function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function shiftHue(hex: string, deg: number) {
  // Cheap HSL rotation for a two-tone gradient from a single accent.
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2) || "66", 16) / 255;
  const g = parseInt(m.slice(2, 4) || "66", 16) / 255;
  const b = parseInt(m.slice(4, 6) || "f1", 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  h = (h * 60 + deg + 360) % 360;
  return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

/**
 * A premium, generated brand mark for brands/projects without an uploaded logo.
 * One of four geometric glyph styles is picked deterministically per name, so
 * every brand gets a distinct yet cohesive "logo".
 */
export function BrandMark({
  name,
  accent = "#6366F1",
  size = 96,
  className = "",
  animated = true,
}: {
  name: string;
  accent?: string;
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  const h = hash(name);
  const variant = h % 4;
  const id = `bm-${h}`;
  const c1 = accent;
  const c2 = shiftHue(accent, 40);

  const glyph = (() => {
    switch (variant) {
      case 0: // orbit ring
        return (
          <>
            <circle cx="50" cy="50" r="26" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="3" />
            <circle cx="76" cy="50" r="6" fill="white" />
          </>
        );
      case 1: // stacked chevrons
        return (
          <path
            d="M30 38 L50 52 L70 38 M30 54 L50 68 L70 54"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        );
      case 2: // diamond grid
        return (
          <>
            <rect x="38" y="38" width="24" height="24" rx="5" transform="rotate(45 50 50)" fill="white" fillOpacity="0.18" />
            <rect x="44" y="44" width="12" height="12" rx="3" transform="rotate(45 50 50)" fill="white" fillOpacity="0.5" />
          </>
        );
      default: // signal arcs
        return (
          <>
            <path d="M34 62 A22 22 0 0 1 66 62" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="4" strokeLinecap="round" />
            <path d="M40 60 A14 14 0 0 1 60 60" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="62" r="3.5" fill="white" />
          </>
        );
    }
  })();

  const Wrapper: any = animated ? motion.svg : "svg";
  const wrapperProps = animated
    ? {
        initial: { rotate: -6, scale: 0.9 },
        whileInView: { rotate: 0, scale: 1 },
        viewport: { once: true },
        whileHover: { rotate: 3, scale: 1.04 },
        transition: { type: "spring", stiffness: 200, damping: 14 },
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`drop-shadow-lg ${className}`}
      role="img"
      aria-label={`${name} logo`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="92" height="92" rx="24" fill={`url(#${id})`} />
      <rect x="4" y="4" width="92" height="92" rx="24" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" />
      {glyph}
      <text
        x="50"
        y="30"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="white"
      >
        {initials(name)}
      </text>
    </Wrapper>
  );
}
