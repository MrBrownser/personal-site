# Theme Toggle Ripple Animation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a full-page expanding-circle animation from the theme toggle when switching dark/light theme, using the View Transitions API and CSS only for the animation.

**Architecture:** View Transitions API + CSS `clip-path: circle()` from the button. Constants for theme names and storage key in Nav.astro. No new files.

**Tech Stack:** Astro, Tailwind, vanilla CSS, View Transitions API.

**Design reference:** `docs/plans/2026-03-09-theme-ripple-design.md`

---

### Task 1: Add view transition CSS and remove conflicting body transition

**Files:**
- Modify: `mrbrownser-personal-site/src/styles/global.css`

**Step 1: Remove body theme transition**

In `global.css`, delete or comment out the `transition` line on `body` (lines 41–44) so it does not conflict with the view transition. Either remove the transition entirely or wrap in `@supports not (view-transition-name: root)` to only apply when View Transitions are unsupported.

Recommended: replace

```css
body {
  background-color: var(--background);
  color: var(--foreground);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

with

```css
body {
  background-color: var(--background);
  color: var(--foreground);
}

@supports not (view-transition-name: root) {
  body {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
```

**Step 2: Add view transition styles**

Append to `global.css` (after the `body` / `@supports` block):

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

**Step 3: Verify**

Run dev server, toggle theme. In supporting browsers you should see the new animation; in others, a simple transition or instant switch. No console errors.

**Step 4: Commit**

```bash
cd mrbrownser-personal-site
git add src/styles/global.css
git commit -m "style: add view transition ripple keyframes, guard body transition"
```

---

### Task 2: Theme constants and toggleTheme with View Transitions

**Files:**
- Modify: `mrbrownser-personal-site/src/components/Nav.astro` (script block, lines 102–124)

**Step 1: Add constants**

At the top of the `<script>` block, after `function initNav() {` and `const root = document.documentElement;`, add:

```javascript
const THEME_KEY = "theme";
const DARK = "dark";
const LIGHT = "light";
```

**Step 2: Use constants in applyThemeIcons**

Replace `root.classList.contains("dark")` with `root.classList.contains(DARK)` in `applyThemeIcons()`.

**Step 3: Replace toggleTheme with event-aware version**

Replace the existing `toggleTheme` function with:

```javascript
function toggleTheme(event) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  root.style.setProperty("--ripple-x", `${x}px`);
  root.style.setProperty("--ripple-y", `${y}px`);

  const applyToggle = () => {
    root.classList.toggle(DARK);
    const isDark = root.classList.contains(DARK);
    localStorage.setItem(THEME_KEY, isDark ? DARK : LIGHT);
    applyThemeIcons();
  };

  if (!document.startViewTransition) {
    applyToggle();
    return;
  }

  document.startViewTransition(applyToggle);
}
```

**Step 4: Pass event to toggleTheme**

Ensure both listeners pass the event: they already call `toggleTheme` on click, so change to `(e) => toggleTheme(e)` or keep `toggleTheme` and it will receive the event as first argument. Confirm `getElementById("theme-toggle")` and `getElementById("theme-toggle-mobile")` use `addEventListener("click", toggleTheme)` so `toggleTheme(event)` receives the event.

**Step 5: Verify**

- Click desktop theme button: ripple expands from button center.
- Click mobile theme button (with menu open): ripple expands from that button.
- In a browser without View Transitions: theme still toggles instantly with no errors.

**Step 6: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: theme ripple via View Transitions, theme constants"
```

---

## Execution handoff

Plan complete and saved to `docs/plans/2026-03-09-theme-ripple.md`. Two execution options:

1. **Subagent-Driven (this session)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Parallel Session (separate)** — Open a new session with executing-plans, batch execution with checkpoints.

Which approach?
