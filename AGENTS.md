# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project status — migration COMPLETE, PHP app is LIVE

The rebuild from static React SPA to **server-rendered PHP + MySQL** fullstack app (custom CMS for staff, no framework, no Composer) is done: the PHP app went **live at `ekonomi.feb.unpas.ac.id` on 18 Jul 2026** (branch `rebuild-php`).

- The **PHP app** (`app/`, `admin/`, `public/`, `database/`, `scripts/build-dist.php`) is what runs in production and where all work happens.
- **Read `DEPLOY.md` (repo root, gitignored) before any deploy/server work** — it maps the infrastructure (live + staging, DB names, DNS constraints), the update workflow, known hosting gotchas (e.g. hPanel's zip extractor silently skips `.htaccess`), and rollback. Migration history lives in `MIGRATION_PLAN.archive.md` (also gitignored).
- A permanent **staging site** exists (`demo-ekonomi` subdomain, no public DNS — access details in `DEPLOY.md`). Test changes there before pushing to live.
- The **old React/Vite SPA** (`src/`, `index.html`, `vite.config.js`, `package.json`) is replaced and no longer served anywhere; it's kept in the repo temporarily as reference/rollback material — don't delete until the user explicitly asks for cleanup.
- Host is Hostinger **shared hosting** (Premium plan) with **no SSH and no Node runtime on the server** — this constrains the whole architecture (see below).

## New PHP app — architecture

- **No Composer, no framework.** Manual `spl_autoload_register` autoloading. PDO with a driver switch: SQLite for local dev (`database/dev.sqlite`), MySQL in production.
- **Structure**:
  - `app/Core/` — `Database`, `Router`, `Session`, `Csrf`, `Auth`, `View`, `Seo`, `Html`, `Icons` (inline SVG icon system replacing react-icons), `StorageInterface`/`LocalFilesystemStorage` (upload abstraction).
  - `app/Models/` — `News`, `Faculty`, `Curriculum`, `GraduateProfile`, `Page` (generic `page_fields`/`page_items` tables back page copy for Home/Profile/Academics/Contact instead of dedicated tables per section).
  - `app/Controllers/` — thin controllers per public route, call Models and `View::render()`.
  - `app/Views/layout.php` + `partials/` (navbar, footer, seo-tags, section-header, page-hero, news-card, tab-nav) + `pages/` (home, profil, akademik, mahasiswa, berita-list, berita-detail, kontak, pendaftaran, 404).
  - `admin/` — hand-rolled CMS, plain PHP scripts per page (no router — internal tool, URLs don't need to be pretty): `login.php`, `index.php` (dashboard), `news/`, `faculty/`, `curriculum/`, `pages/`, `profiles/`, `users/`, plus shared `_bootstrap.php`, `_layout.php`, `_crud.php`.
  - `public/` — document root for local dev: `index.php` front controller, `.htaccess`, `assets/css/app.css` (compiled Tailwind, committed), `assets/js/app.js` (vanilla JS), `uploads/`. In dev, `public/admin` is a **symlink** to `../admin`.
  - `database/schema/001_init.sql` — numbered schema migrations, applied manually via phpMyAdmin (no migration runner). `database/seed.php` seeds the dev DB and regenerates `database/seed.sql` (gitignored — contains password hashes) for one-time phpMyAdmin import into production/staging.
- **Routing is hybrid**: public site goes through one front controller (`public/index.php`) for dynamic slugs + centralized SEO/CSRF; admin is plain per-file PHP scripts.
- **SEO is server-rendered per page** via `App\Core\Seo::page()`/`::article()` + `app/Views/partials/seo-tags.php` — title/description/canonical/OG/Twitter/JSON-LD are in the *first* HTML response, not injected client-side. `SitemapController` generates `/sitemap.xml` dynamically from published news + static routes.
- **Styling**: Tailwind CSS, same theme as the old site (`forest`/`gold` palette, `fade-up`/`fade-in`/`slide-right` animations) defined in `tailwind.public.config.js`, source in `assets/css/tailwind.css`, compiled locally (no Node on server) to `public/assets/css/app.css` and **committed**. **Recompile after any class changes in `app/Views/**/*.php` or `public/assets/js/app.js`**:
  ```bash
  npx tailwindcss -c tailwind.public.config.js -i assets/css/tailwind.css -o public/assets/css/app.css --minify
  ```
- **Animation**: `framer-motion` is replaced by vanilla JS in `public/assets/js/app.js` — IntersectionObserver-based scroll reveal (`data-reveal`), navbar condense-on-scroll, tabbed nav (`data-tab-group`/`data-panel`), accordions, expanding cards, image slider, category filter, lightbox.
- **Deploy**: `scripts/build-dist.php` (CLI-only, run with a local PHP binary, e.g. `/opt/homebrew/opt/php@8.1/bin/php scripts/build-dist.php`) assembles an upload-ready flat-layout `dist/` folder (public + app + admin all in one docroot, matching the old manual-upload workflow) for File Manager/FTP upload to Hostinger — no Git/SSH deploy pipeline. It excludes legacy React `dist/` assets, writes a hardened root `.htaccess` (blocks `app/`, `database/`, `*.sql`/`*.sqlite`, `config.local.php`), `app/.htaccess` (`Require all denied`), and a production-flavored `app/Config/config.example.php` template.
- **Config**: `app/Config/config.local.php` (gitignored) holds real DB credentials + `base_url`; `config.example.php` is the committed template.
- **Security**: prepared statements everywhere, CSRF token on all admin POST forms (field name is **`_csrf`**, not `csrf_token` — see `app/Core/Csrf.php`), `password_hash`/`password_verify`, uploaded images re-encoded via GD, session hardening.

## Legacy React SPA (replaced 18 Jul 2026 — kept only as reference)

The previous production site: static marketing/informational site for **Program Studi Ekonomi Pembangunan, FEB (Fakultas Ekonomi dan Bisnis), Universitas Pasundan**, built with React + Vite. No longer deployed anywhere; its data/design were the source material for the PHP port.

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

No lint/test script configured in `package.json`.

- **Routing**: `src/App.jsx`, `react-router-dom`, lazy-loaded pages, Indonesian-language paths (`/profil`, `/akademik`, `/mahasiswa`, `/pendaftaran`, `/berita-kegiatan`, `/berita-kegiatan/:slug`).
- **Content centralized in `src/constants/`** (`contentData.js`, `facultyData.js`, `newsData.js`, `index.js`) — this is the data being migrated into the new MySQL schema (see `database/export-data.mjs` → `seed-data.json` → `database/seed.php`).
- **SEO**: `src/components/SEO.jsx` (`react-helmet-async`) — client-rendered, which is the exact limitation the PHP rebuild's server-rendered SEO fixes.
- **Contact form**: `src/components/ContactForm.jsx` + `src/utils/email.js`, EmailJS-only (no server-side record) — being replaced by DB-backed submissions in the new stack.
- **Styling**: Tailwind (`tailwind.config.js` — the theme source of truth that `tailwind.public.config.js` mirrors), `framer-motion` for animation.
- **Static assets**: `public/` (old faculty photos with commas/periods in filenames, `news/` folder, etc.) — being re-slugged and moved to `public/uploads/` in the new stack.
- `dist/` is a committed build output directory — never hand-edit files there; regenerate via `npm run build` (legacy) or `scripts/build-dist.php` (new stack).

## Conventions worth preserving

- Keep visual layout/styling/responsiveness unchanged unless a task explicitly calls for a redesign — the new PHP views are a 1:1 visual port of the old React pages.
- Don't delete assets, text, or config unless verified as completely unused across the whole project.
- News content mixes Indonesian prose with English-keyed structure — match the existing language of whatever section you're editing rather than translating wholesale.
- Never have the user paste passwords/secrets into chat — have them run password-setting commands (e.g. `ADMIN_PASSWORD='...' php database/seed.php`) in their own local terminal.
