# Astro V0 Design Migration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the existing Astro personal site so it uses the v0 neumorphic design (from my-site-made-in-v0) while keeping Adrià’s content; pure Astro, no React; dark/light toggle defaulting to light; contact = socials + email only.

**Architecture:** In-place rewrite of mrbowrnser-personal-site. Update global CSS and Tailwind config to v0 tokens (with dark mode). Rewrite each component to match v0 layout and styling. Add Footer; remove contact form in favor of email + socials. Vanilla JS for theme toggle and mobile nav.

**Tech Stack:** Astro 5, Tailwind CSS 3, @fontsource-variable/inter, no React.

---

### Task 1: Update global styles and Tailwind config for v0 design + dark mode

**Files:**
- Modify: `mrbowrnser-personal-site/src/styles/global.css`
- Modify: `mrbowrnser-personal-site/tailwind.config.mjs`

**Step 1:** In `global.css`, replace the existing `:root` and `:root.light` blocks with a single source of truth: default = light (v0), and a `.dark` class for dark mode. Define CSS variables for background, foreground, muted-foreground, primary, primary-foreground, and neumorphic shadows (neu-shadow-light, neu-shadow-dark, neu-raised, neu-raised-sm, neu-inset, neu-flat). Light values: background `#e0e5ec`, foreground `#2d3436`, primary `#0984e3`, shadows as in v0 globals.css. Dark values: background `#2d3436`, foreground `#dfe6e9`, primary `#74b9ff`, with matching shadow colors. Keep `scroll-behavior: smooth` and body using `var(--background)` and `var(--foreground)`.

**Step 2:** In `tailwind.config.mjs`, extend theme with colors that map to the new CSS variables (e.g. background, foreground, primary, muted-foreground) and boxShadow utilities for neu-raised, neu-raised-sm, neu-inset, neu-flat so components can use `shadow-neu-raised` etc. Ensure `darkMode: "class"` and content paths include `./src/**/*.{astro,html,js,ts,tsx}`.

**Step 3:** In `global.css`, keep or add component-layer classes: `.neu-card`, `.neu-card-sm`, `.neu-btn`, `.neu-input`, `.neu-inset`, and `.timeline-line` / `.timeline-dot` using the new variables. Remove any obsolete neu-* variable names that referred to the old naming.

**Step 4:** Run `npm run build` in `mrbowrnser-personal-site`. Fix any missing utilities or variable references until build succeeds.

**Step 5:** Commit with message: `style: add v0 design tokens and dark mode to global CSS and Tailwind`

---

### Task 2: Base layout — font, meta, theme script (light default)

**Files:**
- Modify: `mrbowrnser-personal-site/src/layouts/BaseLayout.astro`

**Step 1:** Ensure layout imports `@fontsource-variable/inter` and `@/styles/global.css`. Set `<html lang="en">` with a class that reflects theme (e.g. no class = light, class `dark` = dark). Default to light: in the inline script that runs before paint, if `localStorage.getItem("theme")` is `"dark"` add `document.documentElement.classList.add("dark")`, otherwise ensure class is removed so default is light. Body: `class="font-sans antialiased"` and ensure font-sans uses Inter in Tailwind.

**Step 2:** Update meta description and title to match (Adrià Castany Serrano, Head of Product & Tech). Keep favicon and OG tags. No other structural changes.

**Step 3:** Run `npm run build` and preview. Confirm font loads and default is light.

**Step 4:** Commit: `chore: default theme light and ensure Inter in BaseLayout`

---

### Task 3: Nav component — v0 look, theme toggle, mobile menu

**Files:**
- Modify: `mrbowrnser-personal-site/src/components/Nav.astro`

**Step 1:** Rewrite the nav to match v0: fixed top, `bg-background/80 backdrop-blur-md`, max-width container, padding. Logo link “AC” to `#hero`. Desktop: links About, Career, How I Work, Contact (hrefs `#about`, `#career`, `#how-i-work`, `#contact`) as text links with hover:text-primary; add a theme toggle button with sun (light mode) / moon (dark mode) icon (inline SVG or character), aria-label “Toggle theme”.

**Step 2:** Mobile: hamburger button that toggles a menu panel; panel contains same links and theme toggle. When a link is clicked, close the menu. Use vanilla script: get theme from `document.documentElement.classList.contains("dark")`, toggle class and `localStorage.setItem("theme", "dark"|"light")`, update icon visibility. Run script on load and on `astro:after-swap` so it works after navigation.

**Step 3:** Style nav links and toggle with small neumorphic raised style (e.g. rounded-xl, shadow-neu-raised-sm) where it matches v0 navbar. Ensure no React; only Astro + HTML + one script block.

**Step 4:** Build and manually test: desktop links, mobile open/close, theme toggle (persists and applies .dark).

**Step 5:** Commit: `feat(nav): v0 navbar with theme toggle and mobile menu`

---

### Task 4: Hero component — v0 layout and content

**Files:**
- Modify: `mrbowrnser-personal-site/src/components/Hero.astro`

**Step 1:** Structure: section `id="hero"`, full min-height screen, flex center, padding top for nav. Inner: avatar, name, subtitle, tagline, two CTAs, scroll indicator.

**Step 2:** Avatar: wrapper with neumorphic raised shadow; inner circle with inset shadow. If `public/images/avatar.jpg` exists, use `<img>`, else show “AC” initials in the circle. Alt text for image or sr-only for initials.

**Step 3:** Name: “Adrià Castany Serrano”. Subtitle: “Head of Product & Tech. Builder. Learner.” Short tagline (one line) if desired. Typography: large bold name (text-5xl–8xl), muted subtitle and tagline.

**Step 4:** Two buttons: “Explore My Journey” → `#about`, “Get In Touch” → `#contact`. First button primary (bg-primary, text-primary-foreground, neumorphic shadow); second secondary (bg-background, shadow-neu-raised-sm). Bottom: scroll indicator (arrow down) linking to `#about`, optional animate-bounce.

**Step 5:** Build and check layout and contrast in light and dark.

**Step 6:** Commit: `feat(hero): v0 hero with avatar, CTAs, scroll indicator`

---

### Task 5: About component — v0 section label and card

**Files:**
- Modify: `mrbowrnser-personal-site/src/components/About.astro`

**Step 1:** Section: `id="about"`, scroll-mt for nav. Label: “01” in a small neumorphic box + “About” uppercase tracking. Headline: “Bridging technology & product strategy.” (or same as current) with one word in primary color.

**Step 2:** One main card: rounded-2xl, shadow-neu-raised, padding. Content: existing About paragraphs (Videocation, Nuclio, product developer, etc.) with link to https://videocation.no. Use existing copy from current About.astro.

**Step 3:** Optional: add 2–4 short “skills” or focus pills (e.g. Product, Tech, Leadership, Learning) in a small grid with inset style. If omitted for YAGNI, skip.

**Step 4:** Build and verify. Commit: `feat(about): v0 about section with card and copy`

---

### Task 6: Timeline component — v0 alternating timeline from data

**Files:**
- Modify: `mrbowrnser-personal-site/src/components/Timeline.astro`
- Read only: `mrbowrnser-personal-site/src/data/timeline.ts` (no changes)

**Step 1:** Section label “02 — Career”. Vertical line (absolute, centered on desktop, left on mobile) with timeline-line styling. Loop over `timeline` from `@/data/timeline`.

**Step 2:** Each entry: timeline dot (circle, primary or distinct for education), card on left/right alternating (desktop). Card: rounded-2xl, shadow-neu-raised. Content: date, title, organization, description; if `entry.tags` exists, render as small inset pills. Use same data shape (date, title, organization, description, type, tags).

**Step 3:** Optional: different dot or badge for `type === "education"` (e.g. color or icon). Preserve or adapt existing timeline intersection observer for subtle reveal if desired; otherwise keep static.

**Step 4:** Build and check layout and data. Commit: `feat(timeline): v0 career timeline from timeline.ts`

---

### Task 7: How I Work component — v0 card and copy

**Files:**
- Modify: `mrbowrnser-personal-site/src/components/HowIWork.astro`

**Step 1:** Section `id="how-i-work"`. Label “03 — How I Work”. Headline “AI & adaptability.”

**Step 2:** One card (rounded-2xl, shadow-neu-raised) containing existing How I Work copy (AI as thinking partner, mindset, quote, leading by example, etc.). Optionally put the blockquote in an inner inset box.

**Step 3:** No data changes; copy stays in the component. Build and verify. Commit: `feat(how-i-work): v0 How I Work section`

---

### Task 8: Contact component — email + socials only, no form

**Files:**
- Modify: `mrbowrnser-personal-site/src/components/Contact.astro`

**Step 1:** Section `id="contact"`. Label “04 — Contact”. Headline “Let’s talk.” Short intro line (e.g. “Whether you have a project in mind…”).

**Step 2:** Remove the contact form entirely. Add one prominent email link: `<a href="mailto:YOUR_EMAIL">...</a>` (placeholder YOUR_EMAIL or real if available). Add three social links as icon buttons (neumorphic raised): LinkedIn `https://www.linkedin.com/in/adriacastany`, GitHub `https://github.com/mrbrownser`, Twitter/X `https://twitter.com/mrbrownser`. Use inline SVGs or simple icons; aria-labels for accessibility.

**Step 3:** Layout: optional two-column on large screens (intro + email left, socials right) or stacked. Match v0 contact section spacing and typography.

**Step 4:** Build and test. Commit: `feat(contact): replace form with email and social links`

---

### Task 9: Footer component and index page

**Files:**
- Create: `mrbowrnser-personal-site/src/components/Footer.astro`
- Modify: `mrbowrnser-personal-site/src/pages/index.astro`

**Step 1:** Create Footer.astro: footer with max-width container, subtle bar (e.g. shadow-neu-inset). Text: “Crafted with care. © 2026 Adrià Castany Serrano.” Links: Top (`#hero`), About (`#about`), Contact (`#contact`). Small text, muted-foreground.

**Step 2:** In index.astro, import and render Footer after Contact. Order: Hero, About, Timeline, HowIWork, Contact, Footer.

**Step 3:** Build and preview full page. Commit: `feat: add Footer and wire on index`

---

### Task 10: Remove v0 folder and final checks

**Files:**
- Delete (or move outside repo): `my-site-made-in-v0` (entire folder at repo root, i.e. `my-new-personal-site/my-site-made-in-v0`)

**Step 1:** Confirm the single Astro project builds and runs: `npm run build` and `npm run preview` in mrbowrnser-personal-site. Check all sections and theme toggle.

**Step 2:** Remove or archive the v0 project folder so only the Astro project remains in the workspace (user preference: delete or move). If workspace root is `my-new-personal-site` and it contains both folders, remove `my-site-made-in-v0` so the repo has one clear site.

**Step 3:** Commit: `chore: remove v0 project; single Astro site only`

---

## Execution handoff

After saving the plan, offer execution choice:

**Plan complete and saved to `docs/plans/2026-03-09-astro-v0-migration-plan.md`. Two execution options:**

1. **Subagent-driven (this session)** — One task at a time with a subagent, review between tasks, fast iteration.
2. **Parallel session (separate)** — Open a new session with executing-plans and run through the plan with checkpoints.

**Which approach?**
