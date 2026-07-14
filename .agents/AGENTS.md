# CIMA - project guidance

## Project

Single-page marketing website for **CIMA**, a business-growth consulting service. The public-facing copy is primarily in Spanish.

## Stack

- Vite
- Vanilla JavaScript with ES modules
- Plain CSS, organized by responsibility
- GSAP and ScrollTrigger, loaded from CDN for page animations
- Static HTML in `index.html`

## Project structure

```text
index.html                  Main page markup and SEO metadata
src/
  js/main.js                DOM behaviour, menu, FAQ, scrolling, GSAP
  css/
    base/                   Reset, design tokens, typography, base styles
    layout/                 Shared layout: header, hero, footer, container
    sections/               Styles for individual page sections
    components/             Reusable UI components
    pages/                  Page-specific styles
    style.css               CSS entry point; imports all CSS modules
  assets/images/            Source images and logo assets
public/                     Static files copied unchanged by Vite
dist/                       Generated production output; do not edit manually
```

## Commands

```bash
npm run dev       # Start the Vite development server
npm run build     # Build production files into dist/
npm run preview   # Preview the production build
```

Do not run a build only for inspection: it updates `dist/`. Run it when the user asks for verification or approves it.

## Code and style rules

- Preserve the existing Vanilla JavaScript and plain-CSS architecture. Do not introduce React, SCSS, jQuery, Swiper, or another dependency without explicit approval.
- Follow the existing BEM-style class naming and reuse the existing CSS variables in `src/css/base/variables.css`.
- Keep styles out of HTML and avoid `!important`.
- Use `const` by default; use `let` only when reassignment is necessary; never use `var`.
- Prefer small, focused functions and early returns where they improve readability.
- Cache DOM queries that are reused. Check for optional DOM elements before attaching event listeners.
- Keep JavaScript as ES modules and use double quotes to match the current codebase.
- For substantial new motion, use GSAP. Respect `prefers-reduced-motion` and do not add animation merely for decoration.
- Keep mobile behaviour and responsive styles in mind for every visual change.
- Do not rename CSS classes, move assets, or reorganize files unless the task requires it.
- Do not create files unless they have a clear purpose; put new styles in the closest existing CSS module whenever possible.

## Working agreement

- Before changing an existing file, inspect the relevant code and explain the intended change.
- Do not make any file, dependency, configuration, API, deployment, or content change without the user's explicit approval.
- Make the smallest change that solves the agreed task. Do not rewrite unrelated code.
- Preserve user changes in a dirty working tree. Never revert, reset, or overwrite unrelated work.
- When a task is complete, report the files changed and how the result was checked.
- If information such as a domain name, form endpoint, analytics ID, or social URL is missing, keep the existing value and ask before replacing it.
