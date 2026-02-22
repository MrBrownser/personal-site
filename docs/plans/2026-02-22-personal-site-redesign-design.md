# Personal Site Redesign -- Design Document

## Overview

A complete redesign of adriacastany.com (currently mrbrownser.github.io) as a modern, neumorphism-styled personal site built with Astro and Tailwind CSS. The site serves as a professional introduction for potential employers, collaborators, and anyone wanting to learn about Adrià's journey from developer to Head of Product & Tech.

## Stack

- **Framework**: Astro (static site generator)
- **Styling**: Tailwind CSS with custom neumorphism design tokens
- **Components**: Pure `.astro` components (no React/Vue/Svelte needed)
- **Blog**: Astro Content Collections (future addition, architecture prepared from day one)
- **Contact form backend**: TBD (custom form UI, submission endpoint wired later -- compatible with Formspree, Web3Forms, or similar POST-based services)
- **Deployment**: GitHub Pages (existing setup), easily portable to Netlify/Vercel

## Design Style: Neumorphism (Soft UI)

### Principles

- Elements appear extruded from or pressed into a soft matte surface
- Dual box-shadows: light highlight (top-left) + dark shadow (bottom-right)
- No hard borders; depth conveyed entirely through shadows
- Rounded corners throughout (8-16px radius)
- Muted, low-contrast background palette

### Color Palette (Dual Mode -- Dark Default, Light Toggle)

**Dark mode (default):**

| Token              | Value     | Usage                          |
|--------------------|-----------|---------------------------------|
| `bg-base`          | `#2d3436` | Primary background              |
| `text-primary`     | `#dfe6e9` | Headings and body text          |
| `text-secondary`   | `#b2bec3` | Subtle text, dates, labels      |
| `accent`           | `#74b9ff` | Interactive elements, links     |
| `accent-hover`     | `#0984e3` | Hover states                    |
| `shadow-light`     | `#3d4a4d` | Light shadow (top-left)         |
| `shadow-dark`      | `#1e2526` | Dark shadow (bottom-right)      |

**Light mode (toggle):**

| Token              | Value     | Usage                          |
|--------------------|-----------|---------------------------------|
| `bg-base`          | `#e0e5ec` | Primary background              |
| `text-primary`     | `#2d3436` | Headings and body text          |
| `text-secondary`   | `#636e72` | Subtle text, dates, labels      |
| `accent`           | `#0984e3` | Interactive elements, links     |
| `accent-hover`     | `#0652DD` | Hover states                    |
| `shadow-light`     | `#ffffff` | Light shadow (top-left)         |
| `shadow-dark`      | `#a3b1c6` | Dark shadow (bottom-right)      |

Theme toggle: a neumorphic sun/moon button in the navigation. Preference persisted to `localStorage`.

### Typography

- **Font family**: Inter (or Satoshi / General Sans -- to be decided during implementation)
- **Headings**: Bold, geometric, large scale (clamp-based fluid sizing)
- **Body**: Regular weight, comfortable line-height (~1.6)
- **Style**: Technical but warm -- not corporate-cold, not startup-playful

### Tailwind Neumorphism Tokens

Custom utilities defined in `tailwind.config.mjs`:

- `shadow-neu-raised`: Raised element (convex) -- `8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff`
- `shadow-neu-inset`: Pressed/inset element (concave) -- `inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff`
- `shadow-neu-flat`: Flat element with subtle depth
- `rounded-neu`: Default border-radius for neumorphic elements

## Page Structure

Single-page layout with smooth scroll navigation. Five sections.

### Section 1: Hero

- Full viewport height
- Name in large display type: "Adrià Castany Serrano"
- Tagline: concise positioning statement (e.g., "Head of Product & Tech. Builder. Learner.")
- Neumorphic circular avatar frame
- Minimal navigation (section anchors) -- sticky on scroll
- No clutter; typography and whitespace do the talking

### Section 2: About Me

- Neumorphic card/panel
- 2-3 paragraphs covering:
  - The journey from software developer to product & tech leader
  - The Master's in Digital Product Management (Nuclio Digital School, 2025)
  - Identity as a product developer: motivated by solving problems, not by coding dogma
  - Current role leading Product and Tech at Videocation.no
- Tone: confident, genuine, first-person

### Section 3: Career Timeline

A vertical timeline showing the full professional arc. Each node is a neumorphic card with date range, role title, company, and a one-line summary.

Timeline entries (chronological):

1. **Sage** (Oct 2008 -- May 2015)
   - Data Migrations Technician (2008-2013), then Consultor (2013-2015)
   - First tech career chapter; Servitel subsidiary acquired by Sage
2. **UPF -- Telecommunications Engineering** (2008-2012)
   - Universitat Pompeu Fabra; engineering foundation
3. **Ironhack** (2015)
   - Web Development Bootcamp; career pivot into software development
   - Top 5 project at Demo Day
4. **Season** (Jun 2015 -- Jun 2016)
   - Web Developer; Ruby on Rails, Drupal, DevOps
   - First professional development role
5. **DenDen** (Jun 2016 -- Jun 2017)
   - Creative Software Developer
   - Built Forbidden City Game (React Native + Firebase)
6. **Haufe Group** (Jun 2017 -- Jun 2021)
   - Full Stack Engineer
   - Prototyped apps in React Native, moved to production, microservices architecture
   - Full DevOps: Azure, Kubernetes, Jenkins, CI/CD
7. **Videocation.no** (Jun 2021 -- Present)
   - Progression through 4 roles in ~4 years:
     - Full Stack Engineer (2021-2023)
     - Senior Software Engineer & Scrum Master (2023-2024)
     - Lead Product Manager (2024-2025)
     - Head of Product and Tech (2025-Present)
   - Norwegian e-learning company; growth story
8. **Nuclio Digital School** (2024-2025)
   - Master's in Digital Product Management

Visual treatment: vertical line connecting neumorphic node-cards. Alternating left/right on desktop, stacked on mobile. Each node has a raised neumorphic card with a subtle accent-colored dot on the timeline axis.

### Section 4: AI & Adaptability -- How I Work

The differentiator section. A neumorphic panel with:

- A short narrative (3-5 paragraphs) about:
  - How AI has transformed the way Adrià works day-to-day
  - The philosophy: flexibility, adaptation, continuous learning
  - How this is being promoted across the team and company -- leading by practicing
  - Not a buzzword pitch; a genuine, opinionated perspective from someone who builds with these tools
- Optional: a pull-out quote or highlighted statement (e.g., "The best tool is the one that makes you rethink how you work.")
- This section positions Adrià as someone who doesn't just adopt tools but reshapes workflows around them

### Section 5: Contact

- Fully custom neumorphic form (our own HTML/CSS)
- Fields: Name, Email, Message
- Inputs styled as inset neumorphic elements (pressed into the surface)
- Submit button styled as a raised neumorphic element that transitions to inset on press
- Form action/endpoint: TBD (will be wired to a POST-based service later)
- Below the form: links to LinkedIn, GitHub, Twitter/X

## Interactions & Motion

- Subtle, purposeful -- not flashy
- Neumorphic buttons: raised-to-inset shadow swap on click/tap (CSS transitions)
- Smooth scroll between sections (CSS `scroll-behavior: smooth`)
- Timeline nodes: gentle fade-in on scroll (Intersection Observer, minimal JS)
- No parallax, no heavy animation libraries -- the design confidence comes from craft, not motion

## Responsive Strategy

- Mobile-first design
- Timeline: stacked single-column on mobile, alternating left/right on desktop
- Neumorphic cards: full-width on mobile with maintained shadow proportions
- Navigation: hamburger or minimal collapsible on mobile
- Shadow values may need slight reduction on mobile for visual comfort

## Future Considerations (Not in initial scope)

- **Blog section**: Astro Content Collections, Markdown/MDX posts, tag system, RSS feed
- **Internationalization**: Catalan / Spanish / English toggle
- **Analytics**: Privacy-friendly analytics (Plausible, Fathom, or similar)

## Design Generation Prompt

The following prompt can be used with design generation tools (Midjourney, v0, Figma AI) to produce visual concepts:

> Design a personal portfolio website in dark neumorphism (soft UI) style. Background color is a deep charcoal gray (#2d3436). All UI elements -- cards, buttons, inputs, avatar frame -- appear extruded from or pressed into the surface using dual box-shadows (slightly lighter gray highlight top-left #3d4a4d, darker shadow bottom-right #1e2526). No hard borders anywhere. Rounded corners (12-16px). Typography is Inter or a similar geometric sans-serif: large confident headings in off-white (#dfe6e9), clean body text. The page is a single-page scroll with five sections: (1) a full-viewport hero with the person's name in large display type and a circular neumorphic avatar frame, (2) an about-me section in a raised neumorphic card, (3) a vertical career timeline with alternating left-right neumorphic node-cards connected by a subtle vertical line, (4) a thought-leadership section in a wide neumorphic panel, and (5) a contact form with inset neumorphic input fields and a raised submit button. Accent color is a soft blue (#74b9ff) used sparingly for interactive elements and links. The overall feel is tactile, technical, and crafted -- like touching sculpted dark matte clay. Include a light mode variant with soft warm gray background (#e0e5ec) and corresponding inverted shadows. Show both desktop and mobile views.
