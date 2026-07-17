# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing/informational website for **Program Studi Ekonomi Pembangunan, FEB (Fakultas Ekonomi dan Bisnis), Universitas Pasundan**. Single-page-app style site built with React + Vite, deployed as a static build (see `dist/`).

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

There is no lint or test script configured in `package.json` — don't assume `npm test`/`npm run lint` exist.

## Architecture

- **Routing**: `src/App.jsx` defines all routes with `react-router-dom`. Every page component is lazy-loaded (`React.lazy`) and wrapped in a single `Suspense` boundary with a shared `PageLoader`. Routes use Indonesian-language paths (`/profil`, `/akademik`, `/mahasiswa`, `/pendaftaran`, `/berita-kegiatan`, `/berita-kegiatan/:slug`), not English ones — keep this mapping in mind when cross-referencing nav labels to routes.
- **Content is centralized in `src/constants/`, not hardcoded in JSX.** This is the most important structural convention in the codebase:
  - `contentData.js` — all page copy grouped by module (`HOME_DATA`, `PROFILE_DATA`, `ACADEMICS_DATA`, `CONTACT_DATA`, `FOOTER_DATA`, `NAV_DATA`, `NEWS_PAGE_DATA`), plus `NAV_ROUTES` and `FEATURE_ICONS`.
  - `facultyData.js` — lecturer roster (`DOSEN_DATA`), academic nav (`NAV_MENU`), `GRADUATE_PROFILES`, `CURRICULUM_DATA`.
  - `newsData.js` — `NEWS_DATA` array driving both the news list (`NewsActivities.jsx`) and detail page (`NewsDetail.jsx`) via `slug`. Each entry has `image` (card cover), `gallery` (detail-page images), and `content` (array of paragraphs).
  - `index.js` — design tokens (`COLORS`, `BREAKPOINTS`), `SEO_DEFAULTS`, the `getSEO(page)` helper, `FORM_CONFIG` (EmailJS env vars), `ANIMATION_DELAYS`, and re-exports `NEWS_DATA`.
  - When adding/editing page copy or data-driven content, edit these constants files rather than the page components.
- **The site previously used i18next for bilingual ID/EN content; this was fully removed** (see deleted `GEMINI.md`/`SUMMARY.md` in git history for the migration rationale). All copy is now static English or Indonesian strings directly in the constants files — do not reintroduce an i18n library or `src/locales/`.
- **SEO**: `src/components/SEO.jsx` wraps `react-helmet-async`'s `Helmet` and is rendered once globally in `App.jsx` with `SEO_DEFAULTS`, then again per-page with page-specific overrides from `getSEO('pagekey')` (see usage in `Home.jsx`, `Profile.jsx`, `Academics.jsx`, `Contact.jsx`, `NewsActivities.jsx`).
- **Contact form**: `src/components/ContactForm.jsx` + `src/utils/email.js` send via EmailJS (`@emailjs/browser`), configured through `FORM_CONFIG` which reads `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` from `.env` (gitignored). Includes a honeypot field (`bot-field`) silently swallowed before sending.
- **Error handling**: `src/components/ErrorBoundary.jsx` wraps the whole routed app inside `App.jsx`.
- **Styling**: Tailwind CSS with a custom theme in `tailwind.config.js` — brand colors are `forest` (primary green) and `gold` (accent), plus custom `fade-up`/`fade-in`/`slide-right` animations and `card`/`card-hover`/`gold` box-shadows. Prefer these existing tokens over ad-hoc colors/shadows.
- **Animation**: `framer-motion` is used throughout pages/components for scroll/entry animations; `ANIMATION_DELAYS` in `constants/index.js` centralizes stagger timing.
- **Build**: `vite.config.js` defines a `@` alias to `src/` and manually splits vendor chunks (`vendor`: react/react-dom/react-router-dom, `motion`: framer-motion) — keep this in mind if adding new heavy dependencies.
- **Static assets**: images/PDFs/video live in `public/` and are referenced by absolute path (e.g. `/logo.webp`, `/news/kegiatan-1-1.jpg`). `dist/` is a committed build output directory, not source — never hand-edit files there.

## Conventions worth preserving

- Keep visual layout/styling/responsiveness unchanged unless a task explicitly calls for a redesign.
- Don't delete assets, text, or config unless verified as completely unused across the whole project.
- News content (`NEWS_DATA`) mixes Indonesian prose with English-keyed structure — match the existing language of whatever section you're editing rather than translating wholesale.
