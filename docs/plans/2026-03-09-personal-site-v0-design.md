# Personal Site: V0 Design + Astro Content — Design Doc

**Date:** 2026-03-09  
**Status:** Approved

## Goal

One Astro project that keeps the content from `mrbowrnser-personal-site` (Adrià Castany Serrano, career, About, How I Work, Contact) and applies the visual design from `my-site-made-in-v0` (neumorphic, section numbering, typography, layout). No React; pure Astro + vanilla JS. Single folder outcome; remove or archive `my-site-made-in-v0` when done.

## Decisions

- **Sections:** Hero, About, Timeline, How I Work, Contact (no Insights).
- **Theme:** Dark/light toggle, default **light** (v0 aesthetic by default).
- **Contact:** Social links + email link only (no form).
- **Approach:** Rewrite the existing Astro project in-place (Option A).

---

## 1. Project structure & styling foundation

**Structure** (unchanged):

```
src/
  components/   Nav, Hero, About, Timeline, HowIWork, Contact, Footer (new)
  data/         timeline.ts (unchanged)
  layouts/      BaseLayout.astro
  pages/        index.astro
  styles/       global.css
tailwind.config.mjs
```

**Styling:**

- Merge v0’s neumorphic system with current Astro tokens. Light (default): `#e0e5ec` background, `#2d3436` text, `#0984e3` accent. Dark: `#2d3436` background, `#dfe6e9` text, `#74b9ff` accent.
- Shadow scale aligned to v0: e.g. raised `8px 8px 16px`, raised-sm `4px 4px 8px`, inset matching.
- Font: Inter via `@fontsource-variable/inter`.
- Theme: class-based (e.g. `.light` on `html`); default light; script in layout to read `localStorage` and set class before paint.

---

## 2. Component-by-component behavior

**Nav:** Fixed, backdrop blur. Logo “AC” → `#hero`. Links: About, Career, How I Work, Contact. Theme toggle (sun/moon). Mobile: hamburger → same links + toggle; links close menu. Vanilla JS for toggle and menu.

**Hero:** Full-height, centered. Avatar: circle with neumorphic frame; use `public/images/avatar.jpg` if present, else “AC” initials. Name: “Adrià Castany Serrano”. Subtitle: “Head of Product & Tech. Builder. Learner.” Two CTAs: “Explore My Journey” → `#about`, “Get In Touch” → `#contact`. Scroll indicator (arrow) → `#about`.

**About:** Label “01 — About”. Headline with accent (e.g. “Bridging technology & product strategy.”). One main card with existing About copy (Videocation, Nuclio, etc.). Optional short skills/focus pills in inset grid.

**Timeline:** Label “02 — Career”. Vertical line, alternating left/right cards. Data from `src/data/timeline.ts`. Each item: date, title, organization, description, tags; optional visual distinction for education vs work. Raised cards; tags as inset pills.

**How I Work:** Label “03 — How I Work”. Headline “AI & adaptability.” One card with existing copy; optional inset blockquote.

**Contact:** Label “04 — Contact”. Headline “Let’s talk.” Intro line. No form. Email link (`mailto:`) + socials (LinkedIn, GitHub, Twitter/X) as neumorphic icon buttons. Same URLs as current site.

**Footer:** One bar: “Crafted with care. © 2026 Adrià Castany Serrano” + links (Top, About, Contact). Subtle styling.

---

## 3. Data, assets & deployment

**Data:** Timeline from `src/data/timeline.ts` only. All other copy in components (or later in a small `src/data/site.ts`). Socials and email in Contact (and optionally shared constant).

**Assets:** Inter from `@fontsource-variable/inter`. Hero avatar: `public/images/avatar.jpg` or initials. Keep `public/favicon.svg`. No new analytics in design.

**Deployment:** GitHub Pages. Keep `astro.config.mjs` and `.github/workflows/deploy.yml` as-is. Single Astro project; remove or archive `my-site-made-in-v0` when done.

**Out of scope:** Blog/Insights, contact form, React.
