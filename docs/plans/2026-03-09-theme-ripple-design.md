# Theme Toggle Ripple Animation — Design

**Goal:** Add a full-page expanding-circle animation from the theme toggle button when switching dark/light theme, using the View Transitions API and CSS only for the animation.

**Approach:** View Transitions API + CSS `clip-path: circle()` expanding from the button. Theme names and storage key use constants to avoid hardcoded strings.

---

## Architecture

- **`src/styles/global.css`** — View Transition pseudo-element styles and `@keyframes` for the expanding circle.
- **`src/components/Nav.astro`** — `toggleTheme()` wraps the class toggle in `document.startViewTransition()`, sets `--ripple-x` / `--ripple-y` from the clicked button, and uses constants for theme values.

No new files. Graceful fallback: unsupported browsers get instant toggle.

---

## Constants

In `Nav.astro` script:

```javascript
const THEME_KEY = "theme";
const DARK = "dark";
const LIGHT = "light";
```

All theme-related strings (class names, `localStorage` key, values) use these constants.

---

## CSS (global.css)

- Remove (or guard) the existing `body` transition for `background-color` and `color` so it does not conflict with the view transition.
- Add:

```css
::view-transition-old(root) {
  animation: none;
  z-index: -1;
}

::view-transition-new(root) {
  animation: ripple-expand 0.5s ease-in-out;
}

@keyframes ripple-expand {
  from {
    clip-path: circle(0% at var(--ripple-x) var(--ripple-y));
  }
  to {
    clip-path: circle(150vmax at var(--ripple-x) var(--ripple-y));
  }
}
```

`150vmax` ensures the circle covers the viewport from any button position.

---

## JS (Nav.astro)

- `applyThemeIcons()` uses `DARK` instead of `"dark"`.
- `toggleTheme(event)`:
  - Reads `event.currentTarget` and computes center `x`, `y` via `getBoundingClientRect()`.
  - Sets `--ripple-x` and `--ripple-y` on `root` (documentElement).
  - Defines `applyToggle()` that toggles `DARK` class, writes `THEME_KEY` with `DARK` or `LIGHT`, and calls `applyThemeIcons()`.
  - If `!document.startViewTransition`, calls `applyToggle()` and returns.
  - Otherwise calls `document.startViewTransition(applyToggle)`.
- Both desktop and mobile theme buttons must pass the event into `toggleTheme` so the correct button is used for the ripple origin.

---

## Graceful degradation

Browsers without `startViewTransition` run `applyToggle()` directly. No extra UI or console errors.

---

## Out of scope

- `BaseLayout.astro` inline theme script continues to use string literals for `localStorage.getItem("theme")` and `"dark"` to keep the design scoped; can be refactored later if desired.
