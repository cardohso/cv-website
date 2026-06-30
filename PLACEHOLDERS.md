# Placeholders to fill in

Everything you still need to provide, grouped by file. Search the codebase for
`TODO` to jump to each one.

## 1. Your contact details — `src/i18n/en.ts` → `profile`

| Field      | Current value           | Replace with                         |
| ---------- | ----------------------- | ------------------------------------ |
| `email`    | `joaocavacocardoso@gmail.com`      | your real email                      |
| `linkedin` | `www.linkedin.com/in/cardohso` (empty)            | your LinkedIn URL                    |
| `github`   | `github.com/cardohso`   | ✅ already set — change if needed     |
| `photo`    | `/profile-placeholder.jpeg` | path to your real photo in `public/` |

> When `email`/`linkedin` are left as the placeholder/empty, the CTA, contact
> row, and footer degrade gracefully (the link shows a "TODO/coming" state
> instead of breaking).

## 2. Profile photo — `public/`

Replace `public/profile-placeholder.svg` with a real image (e.g.
`public/profile.jpg`, ideally square ~400×400) and point `profile.photo` at it.

## 3. Projects — `src/i18n/en.ts` → `projects.items`

- **LLM-as-a-Judge Evaluation Pipeline** — anchor card, already written, links to
  the case study. Review the copy.
- **RAG Retrieval System** — `description` is a `TODO`; add a `href` (repo/demo) or
  leave `''` for a non-clickable card.
- **Agent Orchestration** — `description` is a `TODO`; add a `href` or leave `''`.

## 4. Writing — `src/i18n/en.ts` → `writing.items`

- **CAPSI 2026 paper** — add the public `href` once the paper is available
  (currently `''`, which shows "Link coming when public").

## 5. Anchor case study — `src/content/case-studies/llm-as-a-judge-evaluation-pipeline.md`

⚠️ **Confirm with your employer which internal details are OK to publish before
going live** (reminder is at the top of the file). Then fill in:

- `Problem` — optional product/domain context (kept general).
- `Approach` — judge model(s), scoring scale, any human-agreement checks.
- `Architecture` — dataset size, thresholds, where results are stored.
- `Results` — `<<TODO: insert eval scores once cleared as shareable>>`.
- `Lessons learned` — `<<TODO>>`.

## 6. Site URL — `astro.config.mjs`

- Set `site` to your real domain (used for canonical/OG links).
- For GitHub Pages project sites, also uncomment and set `base`.

---

### Quick check before going live

```bash
grep -rn "TODO" src/        # find every remaining placeholder
npm run check               # type-check
npm run build               # ensure it builds clean
```
