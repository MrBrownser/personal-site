# Personal portfolio site (Astro)

A single-page portfolio with neumorphic styling, light/dark theme, and a career timeline. All public-facing copy, links, and metadata live in a JSON file so you can swap your details without editing components.

## Quick start

```bash
npm install
cp site-content.example.json site-content.json
# Edit site-content.json with your information
npm run dev
```

- **`site-content.json`** (optional, gitignored) — your real name, experience, `meta.siteUrl`, and social links. If this file is missing, the site falls back to **`site-content.example.json`** (demo: “Matt Murdock” and companies like Acme Inc. and Evil Corp).
- **`src/`** — layout and structure only; do not put personal data here if you want a clean, forkable template.

## JSON shape

`site-content.example.json` is the full reference. Notable fields:

- **`meta`**: `siteUrl` (used for canonical URLs and [Astro `site`](https://docs.astro.build/en/reference/configuration-reference/#site)), `pageTitle`, `pageDescription` (SEO / Open Graph).
- **`brand.navInitials`**: Short initials in the nav and hero placeholder.
- **`hero`**: Name, taglines, `hasAvatar` + `/public/images/avatar.jpg` if you set `hasAvatar` to `true`.
- **`about`**: Section copy and optional `roleParagraph` (company name is the linked segment).
- **`timeline`**: Career and education entries (`type`: `"work"` | `"education"`).
- **`contact`**: `email`, `socials` with `icon` one of `linkedin` | `github` | `twitter`.
- **`footer`**: `note` and `copyrightName` (the year is applied automatically).

## GitHub Pages

The workflow in **`.github/workflows/deploy.yml`** builds on every push to `main`.

- Without any extra setup, CI uses **`site-content.example.json`**, so the live site will show the demo copy until you provide real content in CI.
- To deploy **your** content without committing `site-content.json`, add a repository secret named **`SITE_CONTENT`** whose value is the full JSON (same format as the example file, as a single string). The workflow writes it to `site-content.json` before `npm run build`.

## Security notes

- No API keys, tokens, or private credentials belong in the JSON; only information you are comfortable making public.
- The optional `SITE_CONTENT` secret is never printed in workflow logs; keep the JSON to public portfolio data only.

## Scripts

| Command         | Action                    |
| --------------- | ------------------------- |
| `npm run dev`   | Start dev server          |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build |

## License

Use and modify freely for your own portfolio.
