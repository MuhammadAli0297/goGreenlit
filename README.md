# GoGreenlit

The marketing site for [GoGreenlit](https://www.gogreenlit.com), embedded
QA (manual + automation testing) for startups.

**A multi-page site, expanding deliberately, route by route**: the
homepage, a `/software-testing-services` overview and six subpages
(manual testing, Playwright automation, Selenium testing, API testing,
regression testing, mobile testing) behind a `Services` dropdown, a
`/qa-consulting` overview and six subpages (embedded QA team, test
strategy, QA process design, CI/CD quality gates, QA audit, release
readiness) behind a `QA Consulting` dropdown, a standalone `/about` page,
and a `/blog` index (category filters, pagination) plus 12
`/blog/[slug]` posts behind a `Blog` dropdown. Each page family has its
own deliberately distinct visual identity, not a reskin of the others,
see [CLAUDE.md](./CLAUDE.md) for the history and the pattern to follow
before adding another page.

For architecture, conventions, coding standards, and SEO rules, see
**[CLAUDE.md](./CLAUDE.md)**. For voice, tone, color, and design rules, see
**[BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)**. Never use an em dash in
any text written for this project, see [AGENTS.md](./AGENTS.md).

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI) ·
Vitest + Playwright · Vercel

## Getting started

Requires Node.js 24 (see `.nvmrc`, run `nvm use` if you use nvm).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

One-time setup if you'll run the end-to-end suite locally:

```bash
npx playwright install chromium
```

## Common commands

| Command             | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the local dev server    |
| `npm run build`     | Production build              |
| `npm run start`     | Serve the production build    |
| `npm run lint`      | ESLint                        |
| `npm run format`    | Prettier (write)              |
| `npm run typecheck` | TypeScript, no emit           |
| `npm run test`      | Unit tests (Vitest)           |
| `npm run test:e2e`  | End-to-end tests (Playwright) |

## Project structure

```
src/app/            Routes (App Router): home, software-testing-services/
                    and its six subpages, qa-consulting/ and its six
                    subpages, about/, and blog/ (index + [slug] posts)
src/components/     ui/ (shadcn, generated) · layout/ · marketing/
src/lib/            Site config, blog content/data, cross-link and
                    breadcrumb schema helpers, utilities
next.config.ts      Redirects for dead URLs from the pre-rebuild site
e2e/                Playwright specs
```

See [CLAUDE.md](./CLAUDE.md) for the full breakdown, including the one
Base UI gotcha (`asChild` doesn't exist here, use `buttonVariants()` on
links) that trips up anyone coming from a Radix-based shadcn project, and
a note on a Next.js 16 dev-server lock issue if `npm run dev` won't start.

## Environment variables

Copy `.env.example` to `.env.local` and adjust as needed. See that file
for what each variable does.

## Deployment

This is configured to deploy to Vercel with zero additional setup, connect
the repository and it will build with `npm run build`. CI
(`.github/workflows/ci.yml`) gates `main` on lint, format, typecheck, unit
tests, a production build, and Playwright e2e tests.
