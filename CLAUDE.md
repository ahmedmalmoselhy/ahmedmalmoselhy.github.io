# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Ahmed AlMoselhy, deployed to GitHub Pages at `ahmedmalmoselhy.github.io`. React 18 + TypeScript + Vite, styled with Tailwind and shadcn-ui (Radix) components.

## Commands

- `npm run dev` — start the Vite dev server (serves on **port 8080**, not Vite's default 5173 — see `vite.config.ts`)
- `npm run build` — production build to `dist/`
- `npm run build:dev` — build in development mode (keeps `lovable-tagger` component tagging)
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint over the repo
- `npm run covers` — generate project covers (`scripts/generate-covers.mjs`) for every project without an uploaded cover image, into git-ignored `public/projects-images/auto/<id>.svg`. Runs automatically before `dev` and `build`, so covers for projects added in `/admin` appear on the next deploy. Company/client logos and Creatio/Ericsson marks are picked from the project's `company`, `client` + `logo`, and `technologies` fields
- Deploys are automatic: `.github/workflows/deploy.yml` type-checks, builds and publishes to GitHub Pages on every push to `main` (Pages source must be set to "GitHub Actions")

There is no test runner configured. `bun` is also usable (`bun.lock`/`bun.lockb` present) but npm is the primary path.

## Architecture

**Single-page app with custom state-based navigation — NOT react-router.** Although `react-router-dom` is a dependency, routing is hand-rolled:

- `App.tsx` holds the single source of truth: `appState: { section: PageSection, projectId? }`, mutated by `handleSectionChange`. `PageSection` is a union type (`'home' | 'resume' | 'skills' | 'projects' | 'contact' | 'project-detail'`) exported from `App.tsx`.
- `SinglePageApp.tsx` is a `switch` over `appState.section` that renders the matching page component. There are no URL routes — section changes are in-memory state, and every section change scrolls to top.
- To add a "page": extend the `PageSection` union in `App.tsx`, add a `case` in `SinglePageApp.tsx`, and wire a trigger (usually `Navbar`) to call `onSectionChange`.
- `onSectionChange(section, projectId?)` is threaded as a prop down to any component that needs to navigate (e.g. project cards pass a `projectId` to open `project-detail`).

**Content is data-driven and editable at `/admin`.** All content lives in JSON under `src/content/` (`site.json` for name, handle, avatar, CV, contact channels and availability; plus `home`, `skills`, `personal`). Lists are folders with one JSON file per entry (`projects/`, `experience/`, `certifications/`, `education/`, `training/`), loaded with `import.meta.glob` and sorted by their `order` field (set by drag-and-drop in the dashboard) via `ordered()` in `src/lib/content.ts`. The modules in `src/data/*.ts` hold the TypeScript interfaces and re-export the content typed, so components import from `@/data/...` as before. Never hardcode contact info in components: use `@/data/site`. Icons in content are stored as names and resolved by `src/lib/icons.ts`.

**Admin dashboard** is Sveltia CMS: `public/admin/index.html` + `public/admin/config.yml`. It commits JSON and uploaded media (to `public/`) straight to `main` through the GitHub API, which triggers the deploy workflow. When you add or rename a content field, update `config.yml` too, or the dashboard won't show it. Locally, open `http://localhost:8080/admin/index.html` (the dev server's SPA fallback swallows `/admin/`) and pick "Work with Local Repository" (Chrome/Edge) to edit files on disk without a token.

**Providers** (in `App.tsx`): `next-themes` `ThemeProvider` (class-based, **defaults to dark**, system theme disabled), `@tanstack/react-query`, Radix `TooltipProvider`, and two toasters (`@/components/ui/toaster` and `sonner`).

**GitHub contributions** (`GitHubGraph.tsx`) are fetched at runtime from the public `github-contributions-api.jogruber.de` API — no token, no build step.

## Conventions

- Import alias `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig`). Prefer it over relative paths.
- shadcn-ui components live in `src/components/ui/` and are configured via `components.json`; treat them as generated primitives and compose rather than editing heavily.
- Custom Tailwind theme colors use the `portfolio-*` namespace (`portfolio-navy`, `portfolio-lightNavy`, `portfolio-slate`, `portfolio-lightSlate`, `portfolio-white`, `portfolio-highlight`, `portfolio-teal`, plus syntax-style accents `portfolio-blue/orange/green/yellow/red`) defined in `tailwind.config.ts`.
- `base` is `/` in Vite config because this is a user GitHub Pages repo (served from the domain root, not a subpath).
