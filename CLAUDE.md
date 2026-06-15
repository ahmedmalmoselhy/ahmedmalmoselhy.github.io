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
- `npm run deploy` — runs `predeploy` (build) then publishes `dist/` to the `gh-pages` branch via the `gh-pages` package

There is no test runner configured. `bun` is also usable (`bun.lock`/`bun.lockb` present) but npm is the primary path.

## Architecture

**Single-page app with custom state-based navigation — NOT react-router.** Although `react-router-dom` is a dependency, routing is hand-rolled:

- `App.tsx` holds the single source of truth: `appState: { section: PageSection, projectId? }`, mutated by `handleSectionChange`. `PageSection` is a union type (`'home' | 'resume' | 'skills' | 'projects' | 'contact' | 'experience' | 'project-detail'`) exported from `App.tsx`.
- `SinglePageApp.tsx` is a `switch` over `appState.section` that renders the matching page component. There are no URL routes — section changes are in-memory state, and every section change scrolls to top.
- To add a "page": extend the `PageSection` union in `App.tsx`, add a `case` in `SinglePageApp.tsx`, and wire a trigger (usually `Navbar`) to call `onSectionChange`.
- `onSectionChange(section, projectId?)` is threaded as a prop down to any component that needs to navigate (e.g. project cards pass a `projectId` to open `project-detail`).

**Content is data-driven.** Page content lives in typed arrays under `src/data/` (`projects.ts`, `experience.ts`, `education.ts`, `certifications.ts`, `training.ts`), each exporting a TypeScript `interface` plus the data. Editing the portfolio's content means editing these files, not the page components. Project images and logos referenced by these files live in `public/` (e.g. `/projects-images/...`).

**Providers** (in `App.tsx`): `next-themes` `ThemeProvider` (class-based, **defaults to dark**, system theme disabled), `@tanstack/react-query`, Radix `TooltipProvider`, and two toasters (`@/components/ui/toaster` and `sonner`).

**GitHub contributions** (`GitHubGraph.tsx`) are fetched at runtime from the public `github-contributions-api.jogruber.de` API — no token, no build step.

## Conventions

- Import alias `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig`). Prefer it over relative paths.
- shadcn-ui components live in `src/components/ui/` and are configured via `components.json`; treat them as generated primitives and compose rather than editing heavily.
- Custom Tailwind theme colors use the `portfolio-*` namespace (`portfolio-highlight`, `portfolio-navy`, `portfolio-slate`, `portfolio-white`, `portfolio-lightSlate`) defined in `tailwind.config.ts`.
- `base` is `/` in Vite config because this is a user GitHub Pages repo (served from the domain root, not a subpath).
