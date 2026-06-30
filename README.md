# João Pedro Cardoso — Portfolio

A clean, fast, accessible personal portfolio. Dark-mode-first with a light toggle,
strong typography, a single restrained accent, and subtle scroll transitions.

**Stack:** [Astro](https://astro.build) (TypeScript) · [Tailwind CSS v4](https://tailwindcss.com) ·
Astro content collections for case studies · self-hosted fonts · deploys to Vercel or GitHub Pages.

---

## Prerequisites

- **Node.js 18.20.8+, 20.3.0+, or 22+** (Astro 5 requirement) and npm.
  Check with `node -v`. If Node isn't installed, get it from
  [nodejs.org](https://nodejs.org) or via [nvm](https://github.com/nvm-sh/nvm):

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  # restart your shell, then:
  nvm install 22 && nvm use 22
  ```

## Run locally

```bash
npm install
npm run dev
```

Open the URL it prints (default <http://localhost:4321>).

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload         |
| `npm run build`   | Production build to `./dist`                 |
| `npm run preview` | Preview the production build locally          |
| `npm run check`   | Type-check Astro + TypeScript                 |

---

## Project structure

```
src/
├── components/        Hero, Nav, ThemeToggle, Section, ProjectCard,
│                      Projects, Writing, About, Contact, Footer
├── content/
│   └── case-studies/  Markdown case studies (one per file)
├── content.config.ts  Content-collection schema
├── i18n/              en.ts (all copy + links) + index.ts (locale layer)
├── layouts/           BaseLayout.astro (head, theme script, reveal observer)
├── pages/
│   ├── index.astro            Single-page site (anchor sections)
│   └── case-studies/[...slug].astro   Case-study pages
└── styles/global.css  Tailwind v4 theme + design tokens
public/                favicon.svg, profile-placeholder.svg
```

### Where to edit content

- **All visible text and links** live in [`src/i18n/en.ts`](src/i18n/en.ts) —
  hero copy, projects, writing, about, contact, and your profile links.
- **Case studies** are Markdown in
  [`src/content/case-studies/`](src/content/case-studies/). The filename is the
  URL slug.
- **Profile photo:** replace `public/profile-placeholder.svg` with your image
  and update `profile.photo` in `en.ts`.

See [`PLACEHOLDERS.md`](PLACEHOLDERS.md) for the exact list of values to fill in.

### Theming

Colors are CSS variables in [`src/styles/global.css`](src/styles/global.css)
(`:root` for light, `.dark` for dark). Change `--accent` there to re-skin the site.

### Adding a Portuguese (pt) version later

The site is structured for it: copy `src/i18n/en.ts` to `pt.ts`, translate the
strings, register it in `src/i18n/index.ts`, and add `'pt'` to `locales` in
`astro.config.mjs`. Routing/components already read from the dictionary.

---

## Deploy

### Option A — Vercel (recommended)

A [`vercel.json`](vercel.json) is included (framework preset, security headers,
asset caching). Two ways to deploy:

**Dashboard (no CLI):**

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Astro — Build `astro build`, Output `dist`. Click **Deploy**.

**CLI:**

```bash
npm i -g vercel
vercel          # preview deploy (follow prompts)
vercel --prod   # production deploy
```

After deploying, set your real domain and update `site` in `astro.config.mjs`.

### Option B — GitHub Pages

1. In `astro.config.mjs`, set `site` to `https://<username>.github.io` and, for a
   **project** site, uncomment `base: '/<repo-name>'`.
2. Add `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: withastro/action@v3   # installs deps, builds, uploads artifact
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
   Push to `main` to deploy.

> Note: `vercel.json` is ignored by GitHub Pages — its headers apply on Vercel only.

---

## Accessibility & performance

- Semantic landmarks (`header`/`nav`/`main`/`footer`), one `h1` per page, skip link.
- Keyboard-navigable with visible focus rings; theme toggle is a real `<button>`
  with an `aria-label`.
- AA-contrast accent in both themes; respects `prefers-reduced-motion` and
  `prefers-color-scheme`.
- No external CDNs (fonts self-hosted), no client framework, minimal JS — built to
  score >95 in Lighthouse. Run your own audit after filling in real content/images.
