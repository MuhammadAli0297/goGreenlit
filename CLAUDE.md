@AGENTS.md

# GoGreenlit Engineering Guide

This file is the source of truth for how this codebase is organized and how
to work in it. Read [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md) before
touching copy, color, or layout, since it defines the brand this site exists
to express. The `brand-design` project skill
(`.claude/skills/brand-design/SKILL.md`) condenses both docs into a
quick-reference checklist for exactly this kind of work.

## What this is

The public marketing site for GoGreenlit, an embedded QA consulting company
(manual + automation testing) for startups. **This is now a multi-page
site, by deliberate choice, expanding deliberately rather than all at
once.** The rebuild was intentionally kept to a single, polished homepage
first ("get it perfect before expanding," in the founder's words), and has
since grown route by route: `/software-testing-services` (the services
overview) plus six subpages, `manual-testing`, `playwright-automation`,
`selenium-testing`, `api-data-testing`, `regression-testing`, and
`mobile-app-testing` (added 2026-08-04, reachable via a `Services`
dropdown); `/qa-consulting` (the QA consulting overview) plus six
subpages, `embedded-qa-team`, `test-strategy-consulting`,
`qa-process-design`, `cicd-quality-gates`, `qa-audit-assessment`, and
`release-readiness` (added 2026-08-05, reachable via a `QA Consulting`
dropdown); `/about` (added 2026-08-05, a standalone top-level link,
no dropdown); and `/blog` (added 2026-08-05, an index with category
filters and pagination, plus a `/blog/[slug]` post template with 12
initial posts, reachable via a `Blog` dropdown listing the five
categories). See the repository structure below for what lives where.
New pages are expected and welcome. When adding one:

- Reuse the established **universal** shared patterns, the ones every
  page regardless of family relies on: `PageHero` for a secondary page's
  header (see `src/components/marketing/page-hero.tsx`, the same
  on-brand dark/aurora treatment as the homepage hero, shorter, plus its
  own scroll-linked zoom effect, see gotcha #5), `CtaSection`, `Reveal`,
  and `FaqAccordion` if the page has an FAQ section.
- **Give each new page family its own visual identity, don't just reskin
  an existing family's layout with new words.** This site now has four
  deliberately distinct "families," and that's the standing expectation
  going forward, not a one-off: Software Testing Services uses a Palm
  Leaf bold band and the `bold` `ServiceCard` variant; QA Consulting uses
  a Muted Olive bold band (via the shared `PhaseTimeline` component), the
  `subtle` `ServiceCard` variant, and the `CompareColumns` two-column
  contrast block; About uses neither an icon grid nor a claimed bold
  band color at all, founder profile cards, an italic pull-quote, and a
  typographic "manifesto" list instead, specifically because it was
  asked to feel different even from the other bold-section pages, not
  just different from the calm homepage; Blog differentiates through its
  own scroll animation and interaction system (category-filtered,
  paginated index, a calm reading-width post template) rather than a new
  claimed bold color, reusing the existing chart-1 through chart-5 theme
  tokens for per-category color coding instead. See gotcha #7 for the
  full breakdown and which components are family-specific versus
  universal.
- Add the route to `src/lib/site-config.ts`'s `navItems` array so it
  shows up in the header (nest it under an existing item's `items` array
  for a dropdown entry, or add a top-level entry for a standalone link),
  to `sitemap.ts`, and to `layout.tsx`'s structured data `makesOffer`
  array if it introduces a new service. See gotcha #8 if the new entry
  makes the header nav overflow on mobile.
- When a subpage's real-world content already exists on the live
  production site (https://www.gogreenlit.com), treat that copy as
  reference material to pull facts and structure from, not something to
  copy verbatim. Rewrite it to this project's voice and SEO rules (see
  BRAND_GUIDELINES.md), and reuse the site's existing verified stats
  (18+ years combined experience, 45% reduction in escaped defects, 95%
  release coverage, $1B+ revenue supported) rather than inventing new
  numbers. Match the production URL slug exactly when one exists, but
  this project's own convention is no trailing slash (prod uses one),
  that's a deliberate, confirmed deviation, not an oversight.
- Prod also has a Blog that has not been rebuilt here yet, out of scope
  until explicitly requested.
- Still don't add a blog or a contact form without being asked, those are
  bigger architectural additions than a new marketing page and were
  explicitly removed from the original build (see the project history if
  you're curious why).
- Prefer a new page for a genuinely distinct topic/service with enough
  content to justify its own URL and search intent, not for a subsection
  that fits fine as more homepage content.

### Redesign in progress: "Live Build" (started 2026-10-18)

The whole site is being redesigned on one long-lived branch
(`chat/oct-18-session`), phase by phase, and **nothing merges to `main`
until the full redesign is approved**. Pushing the branch is fine, merging
is not (deploy rule: `main` is production). The direction keeps the five
swatches, the warm voice and every page family's identity, and adds
motion, interactive widgets and a sharper component look: hard-edged
"sticker" cards, pill buttons with a press-down edge, mono status labels,
one italic accent word per headline, and live demos (a looping test-run
terminal, a run matrix) in place of static illustration. Design source of
truth while it is in flight: the Live Build design canvas artifact
(https://claude.ai/artifact/EZczMG9LP1hscifNEaFLU3, 20 boards covering
every page, the menus, the shared pieces and phone widths) and the
progress tracker (https://claude.ai/artifact/MkU75tfmdu3vVt69E9WBiZ, 10
phases, 87 tasks). **Status as of 2026-10-23:** Phase 0 (decisions) is
open, Phases 1 to 5 (foundation, site chrome, shared components, homepage,
Services family) are built and pushed, Phase 6 (QA Consulting family:
overview, six subpages, OG images, phone check) is built and pushed, Phase 7
(Blog: tile, hero, filters and search, featured post, category header, pagination, post header, contents pill, callouts, related, SEO check, OG images, phone check) is built, with its last commits not yet pushed. Phase 8 (long tail) is built and pushed. Phase 9 (hardening) is in progress (z-devices, z-lh, z-keys and z-contrast done).
The savings calculator is deliberately not built (Phase 0 never approved it,
gotcha #35). See gotchas #32 to #36 for what each finished phase established.
Pages not yet redone still look
mixed on purpose (old highlight chips, old CTA buttons inside new
components), each later phase converts its own pages.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19.2): Next.js 16 (App Router, Turbopack, React 19.2)
- **Language**: TypeScript, `strict` + extra strictness flags on (see
  `tsconfig.json`)
- **Styling**: Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`,
  tokens live in `src/app/globals.css`)
- **Components**: shadcn/ui (`base-nova` style) on top of **Base UI**
  (`@base-ui/react`), not Radix. See the Base UI gotcha below before you use
  `asChild` out of habit.
- **Fonts**: Bespoke Serif (self-hosted, `next/font/local`) for everything, plus
  JetBrains Mono (a self-hosted 12KB subset through `next/font/local`, gotcha #66) for small
  uppercase labels only (`font-label`), see gotcha #32
- **Testing**: Vitest + React Testing Library (unit), Playwright (e2e)
- **Tooling**: ESLint (flat config), Prettier (+ `prettier-plugin-tailwindcss`),
  Husky + lint-staged + commitlint
- **Deploy target**: Vercel

Package manager is **npm**, don't introduce a lockfile from another package
manager.

### Brand palette (quick reference)

Full token mapping and usage rules are in [BRAND_GUIDELINES.md §4](./BRAND_GUIDELINES.md#4-color).
Live in `src/app/globals.css`.

| Name            | Hex       |
| --------------- | --------- |
| Dark Slate Grey | `#354639` |
| Palm Leaf       | `#8fa175` |
| Muted Olive     | `#b1c680` |
| Navajo White    | `#ffe0ad` |
| Sandy Brown     | `#ee9e58` |

## ⚠️ Read before you write code

1. **This Next.js version is newer than most training data.** Before
   assuming an API or convention, check `node_modules/next/dist/docs/`,
   the real, version-matched documentation bundled with the installed
   package. Notable things that changed in Next.js 16 and _will_ bite you if
   you assume otherwise:
   - `params` and `searchParams` in pages/layouts/route handlers are
     `Promise`s, always `await` them. There is no synchronous fallback.
   - `middleware.ts` is now `proxy.ts` (we don't currently have one).
   - `next lint` is gone. Lint via `npm run lint` (plain `eslint`).
   - Turbopack is the default bundler for both `dev` and `build`, don't add
     `--turbopack` flags, they're implied.
2. **shadcn/ui here is built on Base UI, not Radix.** Base UI does **not**
   support the `asChild` prop. Its polymorphic API is a `render` prop
   instead, and critically, **Base UI's own docs say links should never
   be rendered through a `Button`'s `render` prop**, because `<a>` and
   `<button>` have different semantics. For anything that is a link styled
   as a button (CTAs, hero buttons, etc.), do this:

   ```tsx
   import Link from "next/link";
   import { buttonVariants } from "@/components/ui/button";

   <Link href="#services" className={buttonVariants({ size: "lg" })}>
     Explore services
   </Link>;
   ```

   Only use `<Button render={...}>` when composing with another
   _non-link_ interactive element, and even then, prefer applying
   `buttonVariants()` directly to the target element instead of nesting a
   full `<Button>` inside another Base UI component's `render` prop. Two
   components both trying to stamp their own `data-slot` on the same
   element causes a hydration mismatch (hit this once with `SheetTrigger` +
   `Button`; fixed by styling the trigger directly instead).

3. **Aligning a row of independent flex/grid columns that have
   variable-height content (a title that wraps to one line in one column
   and two in another) needs CSS subgrid, not a fixed height guess.** The
   process steps section (`page.tsx`) hit this: a 2-line step title threw
   off every description's vertical start position versus the 1-line
   titles next to it. Fixed with `grid-rows-subgrid` on each `<li>`
   (`row-span-3`) inside a parent `<ol>` with an explicit
   `grid-template-rows`, so all four columns share the same row
   boundaries regardless of how any one title wraps. Reach for this
   pattern first for any future multi-column row of cards/items with
   independently variable title or content length.
4. **Background-color "chips" around inline text (a highlighted word in
   a heading) need enough `line-height`/padding to contain descenders**,
   especially with Bespoke Serif, which has deeper descenders than
   Geist did. The hero's "ship fast" highlight clipped the bottom of the
   "p" until `leading-[1.2]` and more generous `py` were added. Check any
   new highlighted-text chip against a letter with a descender (p, g, y)
   at the actual font size being used, tight default leading on large
   text sizes will clip it.
5. **Scroll-triggered animations go through the shared `Reveal`
   component, not a hand-rolled `IntersectionObserver`.**
   `src/components/marketing/reveal.tsx` fades an element up when it
   scrolls into view and **replays every time it re-enters**, it does
   not disconnect after firing once. It renders `as="div"` by default;
   pass `as="li"` when wrapping something that must stay a direct
   grid/subgrid child, wrapping the process steps' `<li>` items in an
   extra `<div>` would have broken `grid-rows-subgrid` (see gotcha #3).
   Stagger siblings with a `delay` prop in ms, `index * 80` is the
   established step. Reduced motion is handled by a CSS override
   (`.reveal-on-scroll` in `globals.css`) that always wins over the
   component's Tailwind opacity/transform classes, don't add a
   `matchMedia` branch inside a new consumer, it's redundant. For an
   effect that's tied to continuous scroll _position_ rather than a
   one-time enter/exit (like the homepage hero's shrink-on-scroll in
   `hero-scroll-shrink.tsx`, or `PageHeroScrollZoom` for the secondary-page
   hero, see below), don't reuse `Reveal`, read `scrollY` in a
   `{ passive: true }` listener throttled with `requestAnimationFrame`,
   and write styles directly to the DOM node via a ref instead of
   through React state, so scrolling never triggers a re-render. This is
   no longer a homepage-only pattern: `PageHeroScrollZoom`
   (`src/components/marketing/page-hero-scroll-zoom.tsx`) applies the
   same technique to every `PageHero` consumer (the services overview
   page and all of its subpages), zooming the badge/heading/description
   in and fading them out as the hero scrolls past, reversing on the way
   back up. It uses the hero `<section>`'s own rendered height (via
   `closest("section")`) as the scroll range, not a fixed viewport
   fraction, since `PageHero` is shorter and content-driven, unlike the
   homepage hero's fixed `min-h-dvh` (exactly one viewport, the floating
   header takes no layout space since the 2026-10-18 chrome rebuild, see
   gotcha #20). CTAs live outside the zoom
   wrapper so they stay normal-sized and clickable at any scroll
   position. A third scroll-linked instance exists now too:
   `BlogHeroScroll` (`src/components/marketing/blog-hero-scroll.tsx`),
   used only by the blog index's own hero (`blog-hero.tsx`, not
   `PageHero`). It was added deliberately, not as a default reach,
   because the blog hero was explicitly asked to feel different from
   every other scroll effect on the site: it's translate-based (heading/
   description drift upward and fade, no scale at all) plus a ring of
   decorative, `aria-hidden` category-name chips that parallax past at
   different rates and directions, the actual "new technique" versus the
   other two, which are both scale-based. Don't add a fourth without a
   similarly explicit reason, the reveal pattern above is still the
   default for anything that isn't a hero.
6. **The FAQ accordion (`faq-accordion.tsx`) is closed by default, click
   a question to open it, nothing auto-expands.** An earlier version
   auto-opened the nearest question via a sticky, `IntersectionObserver`-
   driven scroll takeover; that was replaced because it read as
   distracting rather than helpful. It wraps the generated
   `src/components/ui/accordion.tsx` (Base UI, added via
   `npx shadcn@latest add accordion`, don't hand-edit it, compose via
   `className`) left fully **uncontrolled** (no `value`/`onValueChange`),
   so Base UI's own default state and single-open toggle behavior apply.
   Each row is wrapped in the shared `Reveal` component
   (`src/components/marketing/reveal.tsx`) and staggered with
   `delay={index * 80}`, the same scroll-triggered fade-up used
   everywhere else on the site, instead of a bespoke scroll effect. One
   consequence of that wrapping: the generated `AccordionItem`'s own
   `not-last:border-b` relies on DOM adjacency to its siblings, which no
   longer holds once each item is wrapped, so the border moved to the
   `Reveal` wrapper's `className` instead (`AccordionItem` gets
   `border-none`). The expand/collapse animation itself is still the
   generated primitive's, with a plain `transition: height` on top (see
   `.faq-panel` in `globals.css`) since the generated component doesn't
   declare one itself. Its `answer` text is rendered through the shared
   `renderWithInlineLinks()` (added 2026-08-24, gotcha #17), the same
   `[label](/path)` parser `ArticleBody` uses, so a blog post's FAQ
   answers can carry real in-content links. Every other `FaqAccordion`
   consumer (the Services/QA Consulting overview pages) passes plain
   strings with no brackets, which the parser returns unchanged, so this
   is a safe no-op for them, not a behavior change.
7. **Each page family has its own claimed bold-section color and its own
   composition devices, don't mix them across families.** "Family" means
   an overview page plus its subpages (Software Testing Services, QA
   Consulting), a standalone page built for its own distinct feel
   (About), or an index-plus-detail-template pair (Blog). Universal,
   reused by every family: `PageHero`, `CtaSection`, `Reveal`,
   `FaqAccordion`. Family-specific:
   - **Software Testing Services**: Palm Leaf (`#8fa175`) bold band,
     `ServiceCard` with `variant="bold"`.
   - **QA Consulting**: Muted Olive (`#b1c680`) bold band via the shared
     `PhaseTimeline` component (`src/components/marketing/phase-timeline.tsx`,
     a numbered vertical timeline with a connecting line, extracted once
     it had 7 call sites, the overview page plus all six subpages),
     `ServiceCard` with `variant="subtle"` (the default, so just omit the
     prop), and `CompareColumns`
     (`src/components/marketing/compare-columns.tsx`, a muted "the wrong
     way" column against an `#ee9e58`-bordered "the GoGreenlit way"
     column). `StatBand` and a dark, Dark-Slate-Grey inverted checklist
     section are used on the QA Consulting overview page only, not
     repeated on every subpage, so they stay a distinguishing moment for
     that one page rather than diluting into another repeated template.
   - **About**: deliberately breaks further than a new bold color, per an
     explicit "make this feel different" ask. Zero Lucide icons anywhere
     on the page (the only page on the site with none), founder profile
     cards with colored-initial avatars instead of `ServiceCard`, an
     italic pull-quote (the only use of the Bespoke Serif italic weight
     on the site), a typographic "manifesto" list (bold statements with a
     colored left border, no cards, no icons) instead of a grid, and no
     FAQ section. Its one bold-section moment (the founders section) uses
     Dark Slate Grey, the same color the homepage hero and every
     `PageHero` already use, not a new claimed swatch, since the ask here
     was about composition and restraint, not about owning a fourth
     accent color.
   - **Blog**: no claimed bold-section color at all, not even a reused
     one. Its own `BlogHero` (not `PageHero`, see gotcha #5) instead of a
     bold band, plus the site's existing `--chart-1` through `--chart-5`
     theme tokens mapped one-to-one onto the five post categories.
     Originally just a small color-coded dot on filter pills, post cards,
     and post headers; amplified 2026-08-24 (the blog read as too plain
     against the colorful hero, per direct feedback) into a colored top
     border strip on cards, a tinted icon tile, and a tinted category
     badge/pill, still the same five chart tokens, no new hue introduced.
     `BlogCategory`'s `tintClass`/`borderClass` fields (see gotcha #9)
     are why this counts as amplifying the existing device rather than
     claiming a new bold color, chart-2 through chart-5 fail WCAG text
     contrast against the card background (checked, as low as 1.47:1),
     so the color only ever lives in backgrounds/borders, dark text sits
     on top everywhere. See gotcha #9 for the rest of the blog's own
     patterns (content model, URL-driven filters/pagination, why
     individual posts don't reuse a bold hero at all).

   When adding a new page to an existing family, match that family's
   devices. When starting a new family (or reworking one, like the
   founders section's background did mid-session), pick a bold color (or
   deliberately reuse Dark Slate Grey, as About does) and a set of
   composition devices that aren't already another family's signature,
   and check contrast on any new pairing rather than assuming a swatch
   that worked elsewhere works here too (see BRAND_GUIDELINES.md §4).

8. **The header nav is a real hamburger/drawer below `md`, not a
   hand-squeezed row.** **Update 2026-10-18: the whole header was rebuilt
   in the Live Build redesign, see gotcha #33 for the current shape**
   (floating pill, `HeaderBar` client component, Base UI mega menus,
   full-screen drawer, breakpoint raised from `sm` to `md`). What still
   holds from this entry: no squeezed third state, the Accordion reuse and
   its `no-underline!` fix, the `cn` import fix after `add sheet`,
   `overviewLabel`, `NavItem.shortLabel` stays gone, and the Playwright
   mid-animation click gotcha. The rest below is the history of the
   earlier shape, written when the breakpoint was `sm`. Before 2026-09-04 the header shrank the logo, nav
   item padding/font-size, and the "Book a call" button below `sm` to
   cram all four top-level entries (`Services`, `QA Consulting`, `About`,
   `Blog`) into one row without wrapping, down to a 320px viewport (see
   the memory record if curious about that era's specific squeeze
   levers). That approach was explicitly replaced, not extended further,
   once asked for a proper mobile drawer instead of another squeeze
   round. Current shape: `site-header.tsx` renders the full desktop
   `NavigationMenu` row plus a normal-sized `Logo` and "Book a call"
   button inside a `hidden sm:flex` wrapper, and `MobileNav`
   (`src/components/layout/mobile-nav.tsx`, a small `"use client"`
   component) inside a `sm:hidden` wrapper, so exactly one of the two
   renders at any width, there is no longer a squeezed third state
   in between. `MobileNav` is a shadcn `Sheet` (`src/components/ui/
sheet.tsx`, Base UI's `Dialog` under the hood, added via
   `npx shadcn@latest add sheet`) sliding in from the right: the sheet's
   own local `open` state is lifted into the component so every nav Link
   and the "Book a call" link can call `setOpen(false)` on click,
   otherwise the drawer would stay open after navigating. Subpage groups
   (`Services`, `QA Consulting`, `Blog`, anything with `NavItem.items`)
   reuse the existing `Accordion` primitive rather than a bespoke
   collapsible, consistent with "no new pattern below 3 call sites,"
   Base UI's Accordion defaults to single-open/collapsible behavior with
   no `type`/`collapsible` props to set (unlike Radix's Accordion API,
   don't reach for those prop names here). One real style leak from
   reusing `AccordionContent`: its default inner wrapper applies
   `[&_a]:underline` to every descendant `<a>` (built for FAQ prose
   links), which is higher specificity than a plain utility class on the
   link itself, so a normal `no-underline` override loses to it. Fixed
   with the Tailwind v4 trailing-bang important modifier,
   `no-underline!`, on every nav Link inside the accordion, not by
   editing the generated `accordion.tsx`. Also fixed along the way: the
   shadcn CLI's generated `sheet.tsx` imports `cn` from a literal
   package named `"cn"` instead of this project's own `@/lib/utils`
   (every other generated primitive does the latter), which the CLI also
   silently installs as a real dependency, remove it
   (`npm uninstall cn`) and fix the import by hand after running
   `add sheet`, don't leave the stray package or the wrong import in
   place. `NavItem.shortLabel` (the old below-`sm` abbreviated label
   escape hatch, e.g. `"QA"` for `"QA Consulting"`) is gone entirely,
   nothing renders a shrunk label anymore since the mobile drawer always
   shows full labels. `overviewLabel` is still live, both the desktop
   dropdown and the mobile accordion use it for the "link back to the
   overview page" row. **A real Playwright-testing gotcha hit while
   verifying this**: clicking a Link inside a still-animating
   `AccordionContent` panel can silently "succeed" (no thrown error, no
   strict-mode violation) while actually navigating nowhere, a
   real click landed mid-height-transition can resolve to the wrong
   effective target even though the locator's bounding box and href both
   check out correctly in isolation. Fixed the same way gotcha #5's
   screenshot-methodology note already prescribes for `Reveal`:
   `page.emulateMedia({ reducedMotion: "reduce" })` before interacting,
   not a longer arbitrary `waitForTimeout`. If a fifth top-level nav
   entry is ever added, it just becomes one more row inside the drawer,
   there is no width constraint left to re-check.
9. **The blog (`src/app/blog/`) has no MDX and no client-side filter
   state, both deliberate.** MDX was tried and removed earlier in this
   project (see the memory record if curious), so post bodies are plain
   data in `src/lib/blog-data.ts`: a `BlogContentBlock` union (paragraph/
   heading/subheading/list, plus the answer/stat/redflags callouts of gotcha #55) rendered by the dumb `ArticleBody` mapper,
   keeping every post a Server Component. `heading` renders as `<h2>`,
   `subheading` as `<h3>` (added 2026-08-16 alongside gotcha #15's SEO
   structure, use it for sub-topics inside a long section rather than
   stacking more H2s). Category filtering and pagination are both
   just `?category=` and `?page=` query params read via `searchParams`
   (a `Promise` in Next 16, always awaited) on `src/app/blog/page.tsx`,
   not client state: `BlogFilterPills` and `BlogPagination` are plain
   `<Link>`s, not a `"use client"` component with `useState`. That's what
   makes the filters work correctly from anywhere, not just the blog
   page itself: the header's `Blog` dropdown (gotcha #8) links straight
   into `/blog?category=slug` from any page on the site, and paginating
   within a filtered view never drops the category because it's baked
   into every pagination link too. An unknown `category` value falls
   back to "all" rather than a dead end; an out-of-range `page` clamps
   into range (`clampPage` in `blog-data.ts`) rather than erroring.
   Individual posts (`blog/[slug]/page.tsx`) deliberately use
   `BlogPostHeader`, not `BlogHero` or `PageHero`: a full dark aurora
   hero repeated on every post would fight against actually reading
   them, so posts get a calm, light, `max-w-3xl` reading-width header
   instead (icon tile, category badge, `h1`, author/date/read-time line,
   plus a one-line author bio underneath, see gotcha #18). `BlogCategory`
   also carries `borderClass`/`tintClass` (added 2026-08-24 alongside the
   color amplification in gotcha #7) next to the original `colorClass`
   dot, all three literal Tailwind classes referencing the same chart-N
   token so Tailwind's build-time scan picks them up, don't try to derive
   one from another at runtime with string manipulation. `BlogPost` also
   carries an optional `faqs?: BlogFaq[]` (added 2026-08-24): when
   present, `blog/[slug]/page.tsx` renders an `FaqAccordion` section and
   emits `FAQPage` JSON-LD, when absent, neither renders, so adding an
   FAQ to a post is just adding the array. See gotcha #17 for the
   in-content-link syntax both `ArticleBody` and `FaqAccordion` share,
   and gotcha #18 for the full standing process a post follows end to
   end, including when an FAQ section is expected, not just how the
   pieces are wired.
10. **Dead URLs from the old pre-rebuild Eleventy site still get crawled
    by Google and need a redirect, not a silent 404.** The previous site
    (see `git show c60ec12 --stat` for its full file list) had pages at
    slugs that don't exist in this rebuild, either because a page was
    renamed/consolidated (`/software-testing-services/qa-strategy-process`
    duplicated what is now `/qa-consulting/test-strategy-consulting`) or
    dropped entirely (`/software-testing-services/website-testing`, whose
    cross-browser/accessibility/UX content doesn't map to one current
    subpage). Google Search Console's Page Indexing report surfaces these
    as "Not found (404)" long after the rebuild, since it keeps re-crawling
    URLs it already knew about. Fix by adding a permanent redirect in
    `next.config.ts`'s `redirects()` array (source without the trailing
    slash, this project's convention, see gotcha #9's cousin issue above)
    pointing at the closest current equivalent, the overview page of that
    family if nothing maps cleanly. Don't just let it 404, a redirect
    preserves any inbound links/bookmarks and signals the move to Google
    instead of dropping the URL. If a future GSC report flags another old
    URL, check it against the old site's file list the same way before
    guessing a target.

    **The other 25 of the old site's 27 pages need no redirect entry at
    all**, because their slug is unchanged, only the old site's Eleventy
    trailing-slash convention (`/about/`, `/qa-consulting/embedded-qa-team/`)
    differs from this rebuild's no-trailing-slash one. Next.js's own
    default behavior already 308s `/about/` to `/about` with zero config,
    no `trailingSlash` setting or explicit redirect needed, confirmed
    live. If Google Search Console's Page Indexing count looks inflated
    well past the real route count (`sitemap.xml` is always the ground
    truth, verify with `curl .../sitemap.xml | grep -c '<loc>'` rather
    than trusting a remembered number), that's very likely these same 25
    old trailing-slash URLs still sitting in Google's index from before
    the rebuild, still correctly redirecting, just not yet recrawled and
    consolidated by Google. That's expected lag, not a bug, and not
    something to add a redirect for, don't add explicit trailing-slash
    redirect entries to `next.config.ts`, Next already handles it.

11. **Contextual cross-links between the two subpage families are
    curated, not derived.** Every Services and QA Consulting subpage
    renders a `RelatedLinks` block (`src/components/marketing/related-links.tsx`)
    between its FAQ section and `CtaSection`: every sibling subpage in its
    own family, plus one cross-family link. Siblings come for free from
    `siteConfig.nav`, no per-page list to maintain, but the cross-family
    pairing (which QA Consulting subpage best matches which Services
    subpage) is a hand-picked 1:1 map, `crossFamilyPairs` in
    `src/lib/related-pages.ts`, since that relationship isn't derivable
    from nav structure and needed real judgment (Regression Testing pairs
    with Release Readiness because that page's own copy already says
    "more than a passing regression run", not because they happen to sit
    at the same index). `getRelatedLinkGroups()` checks the map in both
    directions, so a pairing only needs to be added once. Added because
    these pages previously had zero contextual in-content links to each
    other, only the header dropdown and the footer's link columns (see
    Repository structure below) connected them, and a contextual body
    link with descriptive anchor text carries more topical-relevance
    weight with search engines than the same URL repeated in nav/footer
    chrome. A new subpage in either family gets its siblings automatically;
    only add it to `crossFamilyPairs` if it has a genuine cross-family
    counterpart worth pointing at.
12. **Every non-home page carries `BreadcrumbList` JSON-LD, not just the
    deep ones, and (added 2026-09-10) a matching visible trail, not just
    the schema.** `src/lib/breadcrumbs.ts`'s `buildBreadcrumbSchema()`
    takes an ordered `{ name, href }[]` and returns a schema.org
    `BreadcrumbList` (absolute URLs via `siteConfig.url`, "Home" first).
    Every route except `/` renders one via its own inline `<script>`, the
    same per-page pattern already used for `FAQPage`/`BlogPosting`/`Blog`
    JSON-LD (see gotcha #6 and the SEO section below).
    Overview/index pages (`/software-testing-services`, `/qa-consulting`,
    `/about`, `/blog`) get a 2-item trail (Home, self); the 12 family
    subpages and every `/blog/[slug]` post get 3 (Home, family or Blog,
    self). `blog/[slug]/page.tsx` builds its `breadcrumbSchema` inside the
    async component body, not at module level, since the post title isn't
    known until `getPostBySlug` runs; everywhere else it's a module-level
    `const` reusing the page's own `title` string, so the breadcrumb label
    can never drift from the page's actual `<title>`. A new page should
    follow whichever of these two patterns matches its depth, this is the
    standing convention now, not an exception to add case by case.
    **The schema went unaccompanied by any visible UI for over a month**
    (a real audit finding, 2026-09-01), fixed by extracting the raw items
    array into its own `breadcrumbItems` const on every page (previously
    it was built inline and thrown away right after
    `buildBreadcrumbSchema()` consumed it) and feeding that same array to
    both `buildBreadcrumbSchema(breadcrumbItems)` and the new
    `<Breadcrumbs items={breadcrumbItems} />` component
    (`src/components/marketing/breadcrumbs.tsx`), so the visible trail
    and the JSON-LD read from one source and can never drift apart. The
    component renders right after the page's JSON-LD `<script>` tags and
    before its hero (`PageHero`/`BlogHero`/`BlogPostHeader`), on the
    plain background, not inside any family's bold section, and uses a
    plain `/` text separator rather than an icon, since it also has to
    render correctly on the icon-free About page (gotcha #7). A new page
    should follow the same shape: a module-level (or in-body, for
    `[slug]`-style dynamic routes) `breadcrumbItems` array feeding both
    calls, never a bespoke visible trail.
13. **(Superseded 2026-10-23 by gotcha #62: `public/og-image.png` is deleted and
    the homepage card is code-rendered.) `public/og-image.png` was generated, not
    designed in an external tool.** It's a screenshot of real HTML/CSS styled to match the
    homepage hero exactly (same `#354639` background, the same static
    aurora blob composition, the real wordmark, the real `ship fast`
    highlight chip, and the actual self-hosted Bespoke Serif variable
    font inlined as a base64 `@font-face` data URI), rendered at exactly
    1200x630 with a headless Playwright `chromium` page and
    `page.screenshot()`, no image-generation service or stock asset,
    consistent with `BRAND_GUIDELINES.md` §8's "text/UI-first, no
    photography system" rule. If the tagline, palette, or wordmark ever
    changes, regenerate it the same way: a throwaway HTML file inlining
    the font (read the woff2, base64-encode it, string-replace it into
    the HTML, entirely outside any chat context since the encoded string
    alone is tens of thousands of characters) and a short Playwright
    script that navigates to it and screenshots at a 1200x630 viewport
    with `deviceScaleFactor: 1`, don't hand-design a new one from
    scratch. Lay out the card content as a flex column with
    `justify-content: space-between` (logo top, heading/subline middle,
    footer row bottom), not absolute positioning for the footer, that's
    what caused a real overlap bug on the first render when the heading
    wrapped to more lines than expected.

14. **The favicon/app icon set was regenerated 2026-08-16 after a routine
    SEO audit found it was actively off-brand, not just incomplete.** The
    site's only icon asset until then, `favicon.ico`, was a leftover
    pre-rebrand black-circle-white-triangle mark (predates the current
    hot-sauce palette, violates the "no pure white/black anywhere" rule in
    `BRAND_GUIDELINES.md` §4, and has no relation to the current wordmark).
    Fixed by reusing the header logo's own dot-and-halo device (see
    `BRAND_GUIDELINES.md` §3) scaled up: a Dark Slate Grey (`#354639`)
    square with a Sandy Brown (`#ee9e58`) circle and a soft
    Navajo-White-tinted halo, generated as code, not exported from a
    design tool, consistent with gotcha #13's `og-image.png` approach.
    Two different generation techniques were used for a reason: `icon.tsx`
    and `apple-icon.tsx` use Next's native icon file convention (a
    `next/og` `ImageResponse` Server Component, see
    `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md`),
    which auto-injects the correct `<link>` tags and is the framework's
    own recommended path for exactly this. `favicon.ico` can't use that
    convention (Next only allows a static `.ico` file for the root
    favicon, `ImageResponse` can't produce one), so it was hand-assembled
    instead: render the same design at 16x16 and 32x32 via a headless
    Playwright screenshot, then pack both PNGs into a valid `.ico`
    container (ICO can embed PNG-format frames directly, a well-documented
    format detail, avoided pulling in a new npm dependency just for this).
    **Real gotcha hit along the way:** the first hand-assembled `.ico`
    500'd both `/icon` and `/apple-icon` at runtime with "The PNG is not
    in RGBA format", because a Playwright screenshot of an opaque
    (non-transparent) element produces an RGB PNG with no alpha channel,
    and Next's ICO decoder requires RGBA for embedded PNG frames. Fixed by
    forcing the alpha channel with `sharp(...).ensureAlpha()` (already a
    transitive dependency of Next, no new package added) before packing.
    If a favicon is ever hand-assembled again outside Next's own
    generation path, check the source PNGs are RGBA first, this failure
    mode is silent until the route is actually requested.

    The same audit pass also fixed three smaller, unrelated SEO findings
    in the same session, all still live: `siteConfig.metaDescription`
    trimmed from 171 to 156 characters (the project's own 155-160 target,
    see the SEO section below); `sitemap.ts` now gives every static route
    a real per-route `lastModified` date (hand-maintained, the same
    upkeep the blog's own `date` field already requires) instead of a
    build-time `new Date()` that made every route look identically
    "just changed" regardless of actual edit history; and the homepage
    now sets `alternates.canonical: "/"` in `layout.tsx`'s root metadata,
    since it was the one route on the entire site without an explicit
    canonical tag, every other route already sets one at the page level.

15. **Every blog post follows a standard SEO content structure, not just
    whatever shape reads well.** Established 2026-08-16 when all 12 launch
    posts were rewritten to it in one pass (piloted on one post first,
    approved, then applied to the rest with no changes to the approach,
    confirming this is the standing bar for blog content going forward,
    not a one-off treatment). Apply the same shape by hand to any new
    post or future rewrite, there is no script or component that enforces
    it:
    - **Open with a direct-answer H2.** After the intro paragraph(s),
      the first heading is phrased as the actual question a reader or an
      AI answer engine would ask (`"What does outsourcing QA testing
actually mean?"`, not `"Overview"`), and the paragraph immediately
      beneath it is a tight 1-2 sentence answer sized to be lifted
      verbatim as a featured snippet, before the post continues into
      supporting depth. This is the concrete mechanism behind
      `BRAND_GUIDELINES.md` §10's "structure for both a human reader and
      a search engine," applied at the blog-post level.
    - **Use real H2/H3 depth, not a flat list of H2s.** `BlogContentBlock`
      (`src/lib/blog-data.ts`) has a `subheading` variant alongside
      `heading`, rendered as an `<h3>` by `article-body.tsx` (added
      specifically for this, the type was flat H2-only before). Reach
      for it to break a long section, a cost breakdown, a build-order
      timeline, into sub-topics instead of stacking more H2s at the same
      level.
    - **Every post needs one section a generic competitor listicle would
      not have.** A red-flags list, a common-mistakes list, a worked
      example, a decision framework, something that could not have been
      generated by paraphrasing the same five "benefits of X" articles
      every competitor already has. Build it from the site's own
      verified stats (18+ years combined QA experience, 45% reduction in
      escaped defects, 95% release coverage achieved, $1B+ in revenue
      supported, see `stat-band.tsx`) or a real mechanism, never an
      invented number or a fabricated case detail, that rule from
      `BRAND_GUIDELINES.md` §2 applies to blog copy exactly as strictly
      as everywhere else on the site.
    - **Meta title budget accounts for the title template.** The root
      layout's `title.template` appends ` | GoGreenlit` (13 characters)
      to every page's `<title>`, so a post's `title` field needs to stay
      short enough that `title + " | GoGreenlit"` lands under 60
      characters total, not just the bare title on its own. **This is a
      hard requirement, not a guideline to eyeball**: 9 of the 10 posts
      in the 2026-09-04 AI-topics batch shipped over this budget (one as
      long as 82 characters) and were only caught in a later SEO audit,
      not during writing. Before calling any new post or batch done,
      verify every title in `blog-data.ts` with a real length check
      (`title.length + 13 <= 60` for each post, a one-line script is
      enough), don't estimate by reading it. All 9 offending titles were
      corrected 2026-09-10 following a live-site SEO audit.
    - **`excerpt` is doing four jobs at once**: meta description, OG/
      Twitter description, and the blog index card blurb, in addition to
      being the human-facing summary. Keep it 138-160 characters and
      keyword-led so all four uses stay effective, there is no separate
      field for any of them.
    - **No em dash, no contractions**, matching the rest of the site's
      copy exactly (see `AGENTS.md` and `BRAND_GUIDELINES.md` §2), not a
      relaxed register for "just" a blog post.
    - **`date` gets bumped and `readTime` recalculated whenever a post's
      content meaningfully changes**, the same principle gotcha #14
      already applies to `sitemap.ts`'s per-route `lastModified`.
16. **The blog grew from 15 posts to 25 in a second content batch
    (2026-08-23), 2 new posts per existing category, and that batch
    established how to source new blog topics going forward: real
    research, not invented trends.** Topics were pulled from an actual
    web search on 2026-era QA industry trends (AI-generated code
    straining existing QA processes, agentic/AI-assisted test
    generation, self-healing automation, shift-left/shift-right, leaner
    QA headcount) rather than guessed, and 4 of the 10 new posts turned
    that research into AI-focused topics, spread across QA Strategy,
    Test Automation, Outsourcing & Hiring, and Testing Practices so AI
    content did not dominate the whole batch. Do the same before writing
    a next batch: search current QA/testing trends first, don't invent
    topics from memory.

    **The Case Studies category hit a real constraint worth knowing
    about before writing more of them**: it already used the site's
    only 3 verified track-record stats (45% reduction in escaped
    defects, 95% release coverage, $1B+ revenue supported) as 3
    individual client stories, so 2 more "case studies" could not be
    written the same way without either fabricating a new client story
    or a new number, both banned by `BRAND_GUIDELINES.md` §2. Resolved
    by writing composite pattern pieces instead
    (`what-18-years-of-qa-experience-looks-like`,
    `the-pattern-behind-every-successful-qa-engagement`), honestly
    framed as patterns observed across engagements, built only from the
    4 real verified stats (the 3 above plus 18+ years combined
    experience, which had not been used as its own post yet), never a
    new fabricated client. If a future Case Studies post is needed and
    there is no new real client detail to write from, use this same
    composite-pattern approach rather than inventing one.

    **Also worth knowing**: this batch was originally built on a feature
    branch (`add-ga4-analytics`) that turned out to already have its own
    open, unrelated PR. The blog changes were moved to a fresh branch
    off `main` (`git stash`, `git checkout -b <new> origin/main`,
    `git stash pop`) before committing, so the blog PR did not get
    bundled with or blocked by the unrelated one. Check `git log
main..<current-branch>` before committing unrelated work to whatever
    branch happens to be checked out.

17. **Every blog post needs real in-content links, 5 to 8 in the body and
    5 to 8 more in the FAQ section when the post has one, scaled to the
    post's length and to how many genuinely fit, never padded to hit a
    number.** Established 2026-08-24 during a full SEO pass on
    `how-to-outsource-qa-testing` (piloted there first, same standing bar
    going forward as gotcha #15's content structure). A shorter post
    (6-7 min read) sits nearer 5 in each section, a longer one (9-10+ min)
    nearer 8. Body and FAQ are counted separately, a post's total can run
    10-16 links across both.
    - **Syntax**: body (`paragraph`/`list` blocks) and FAQ `answer`
      strings support a lightweight `[anchor text](/path)` syntax, not
      real markdown, just this one pattern. Parsed by
      `renderWithInlineLinks()` in
      `src/components/marketing/inline-links.tsx`, shared by
      `ArticleBody` and `FaqAccordion` so a link works identically in
      either. A plain string with no brackets is unaffected, so this is
      fully backward compatible with every post that predates the rule,
      nothing needs retrofitting just to keep building.
    - **Real gotcha already hit once**: `FaqAccordion` is also used by
      the Services/QA Consulting overview pages (see gotcha #7), whose
      FAQ answers are plain strings, so it is easy to add link parsing to
      `ArticleBody` and forget `FaqAccordion` needs the same treatment,
      that exact miss shipped once (3 of 5 FAQ links silently rendered
      as dead bracket text) before being caught and fixed. If a third
      consumer of body-style text ever needs links, route it through
      `renderWithInlineLinks()` too rather than re-implementing parsing.
    - **Second real gotcha**: a `BlogPost`'s `faqs` also feed the
      `FAQPage` JSON-LD block in `blog/[slug]/page.tsx` (gotcha #12's
      structured data), and that field needs plain text, not the
      bracket syntax, one already shipped with raw `[label](/path)`
      visible in a live JSON-LD `text` field before being caught. Use
      `stripInlineLinks()` (same file as `renderWithInlineLinks`) when
      building that field, never the raw `answer` string directly.
    - **Real destinations only, and prefer variety over repetition**:
      link to an actual Services/QA Consulting subpage whose topic
      matches the anchor phrase, or another real blog post, especially a
      case study post when the surrounding claim cites a stat (the 45%
      escaped-defect and 95% coverage numbers each link to their own
      case study post, turning an aggregate claim into a traceable one,
      see the EEAT discussion below). Spread links across distinct
      destinations rather than reusing the same target twice on one page
      where a different real destination fits just as well, that spread
      is itself part of what makes the linking read as genuine rather
      than mechanical.
    - **This is also the fix for a specific EEAT gap, not just a link
      quota**: aggregate stats in body/FAQ copy ("across the embedded
      engagements we have run") read as vague on their own. Linking the
      specific number to the real post it came from is what makes the
      claim verifiable, prefer that over inventing a new client story or
      a new number, which stays banned per `BRAND_GUIDELINES.md` §2 and
      gotcha #16's case-study constraint.
18. **Every blog post, new or rewritten, follows one fixed end-to-end
    process, not just a content structure to hit.** Established
    2026-08-24, piloted on `how-to-outsource-qa-testing` before being
    written up here as the standing default for every post going
    forward, the same way gotcha #15 already is. Gotchas #15-17 cover
    the individual pieces in technical detail, this entry is the order
    to run them in and what each step actually produces:
    1. **Research before outlining.** Pull the real heading structure
       and content gaps from actual top-ranking or competitor content
       for the post's primary keyword (WebSearch/WebFetch, not recalled
       from memory), the same way gotcha #16 already requires for topic
       selection. One primary keyword per post, resist the urge to
       target every keyword on a list in one piece.
    2. **Build and confirm an outline before writing.** Structured
       around gotcha #15's shape (direct-answer H2 first, real H2/H3
       depth, one unique-angle section), noting where the post's
       real internal-link and FAQ opportunities will go before drafting
       prose around them.
    3. **Write to gotcha #15's structure**, voice per
       `BRAND_GUIDELINES.md` §2 (no em dash, no contractions, admit
       tradeoffs).
    4. **Add 5 to 8 in-content links in the body**, per gotcha #17.
    5. **Add an FAQ section when the post has enough natural question-
       shaped sub-topics to support 5 to 8 real Q&A pairs** (`faqs` on
       the post, gotcha #9), each answer carrying its own share of that
       same 5 to 8 in-content link range. Skip the section entirely
       rather than padding it with thin questions just to have one, a
       post genuinely can be complete without it.
    6. **Add the one-line author bio.** `authorBios` in `blog-data.ts`
       keyed by `BlogPost["author"]`, rendered under the byline in
       `BlogPostHeader`, sourced only from the real founder facts
       centralized in `src/lib/founders.ts` (gotcha #28), never a
       new invented credential. This is what a byline alone does not do:
       it ties the claims in the post to a real, named role, an EEAT
       signal search engines and AI answer engines both weight.
    7. **Run an EEAT self-review before calling the post done**: where
       does it lack first-hand proof, and can that be fixed by linking
       an aggregate stat to the real case-study post it came from (step
       4), never by inventing a client detail or number (gotcha #16).
    8. **Offer, don't auto-apply, title tag and meta description
       options.** 3 options each, budgeted per gotcha #15 (title short
       enough that `title + " | GoGreenlit"` stays under 60 characters,
       `excerpt` 138-160 characters), always including the current live
       version as a baseline option. A post that already ranks should
       not have its `title`/`excerpt` changed without the user
       deliberately picking a replacement, changing what is already
       indexed is a real, not a cosmetic, decision. **Verify every
       option's character count with an actual count, not by eye**,
       before offering it, per the enforcement note added to gotcha #15
       after the 2026-09-04 batch shipped 9 posts over budget undetected.
       This applies per-post and per-batch alike: a batch is not done
       until every title in it has been checked, not just the one you
       happened to write most recently.

    **This reverses an earlier, now-outdated decision.** The original
    2026-08-16 SEO pass considered inline hyperlinks inside post body
    text and deliberately decided against it, judged a bigger
    architectural change than one post warranted at the time. That
    decision no longer holds, gotcha #17's `[label](/path)` syntax is
    now standard. If an older note anywhere still says post bodies have
    no internal linking, treat gotcha #17 as the current, correct
    behavior instead.

    **Rollout status as of 2026-08-25: all 25 posts are brought up to
    this standard for in-content links and an FAQ section.** The rollout
    ran as a checklist-driven, one-post-at-a-time pass across two
    sessions (2026-08-24 and 2026-08-25), see
    [[project-gogreenlit-rebuild]] for the full narrative and
    [[feedback-sequential-checklist-work]] for the working method. The
    author bio line lives in the shared `BlogPostHeader` template keyed
    only by `post.author`, so it already rendered on every post
    automatically throughout, nothing per-post was needed for that piece.
    A future post (new or substantially rewritten) still needs this
    standard applied deliberately, don't assume it happens automatically
    just because the rest of the catalog complies, check `faqs` presence
    and in-content links in `blog-data.ts` directly for that specific
    post rather than trusting this note as a live source.

    **A pattern specific to the 5 case-study posts**
    (`how-we-reduced-escaped-defects`, `how-we-reached-95-percent-coverage`,
    `how-we-supported-1b-in-revenue`, `what-18-years-of-qa-experience-looks-like`,
    `the-pattern-behind-every-successful-qa-engagement`): unlike the
    how-to and comparison posts, these did not benefit from
    competitor-gap research, since the content is a real internal
    narrative, not a competable topic. The real work was linking each
    step of the narrative to the real service page it corresponds to (an
    audit step to `/qa-consulting/qa-audit-assessment`, a regression step
    to `/software-testing-services/regression-testing`, and so on), plus
    cross-linking the sibling case studies and
    `/blog/the-pattern-behind-every-successful-qa-engagement` so the
    result reads as one observed pattern across engagements rather than
    an isolated, unverifiable outlier. Apply this same approach, not the
    competitor-research-first approach used for the how-to posts, to any
    future case-study post.

19. **The unfiltered blog index never shows two same-category posts back
    to back, by design, not by accident of insertion order.** Added
    2026-08-31 once the catalog reached 35 posts across 5 categories,
    Muhammad said the color-coded cards read better with categories
    mixed than clustered and asked for this as a standing rule going
    forward, not a one-time reshuffle. `interleaveByCategory()` in
    `src/lib/blog-data.ts` round-robins through `blogCategories` in its
    fixed order, pulling one post per category per pass, which
    guarantees zero adjacent duplicates whenever no single category
    holds more than half the total (true today at an even 7-per-category
    split, and the safe general case for any reasonably balanced future
    split). `src/app/blog/page.tsx` calls it only for the unfiltered "all
    categories" view (`category ? posts : interleaveByCategory(posts)`),
    a single-category filtered view is already one color throughout, so
    interleaving it would be a no-op. This only reorders the _display_
    list, `blogPosts` itself and `getPostsByCategory()`'s own return
    order are untouched, so `sitemap.ts`, `getRelatedPosts()`, and
    anything else reading `blogPosts` directly still sees the original
    catalog order. Covered by 3 unit tests in `blog-data.test.ts`
    (`interleaveByCategory` describe block): no adjacent duplicates
    across the real catalog, no post dropped or duplicated, and a
    single-category input passes through unchanged. If a future category
    ever holds more than half of all posts, this algorithm degrades
    gracefully (adjacent duplicates become possible only in that
    category's own overflow, it will not crash or drop posts), that
    edge case has not been hit yet and does not need a fix pre-emptively.
20. **The homepage hero always fills exactly one screen, header included,
    on any device, and that is a deliberate height calculation, not a
    round number.** Added 2026-09-05 on direct request ("the hero should
    always take up the entire web page no matter what size the screen
    is"), replacing the previous fixed `min-h-[85vh]` (which left a
    visible sliver of the next section on load). `hero.tsx`'s content
    wrapper uses `min-h-[calc(100dvh-4rem)]`, `100dvh` (dynamic viewport
    height, not `100vh`) because `100vh` on mobile Safari/Chrome does not
    account for the address bar showing or hiding, a well-documented
    source of mobile hero sections that overflow or leave a gap; `4rem`
    is the sticky header's own `h-16`, subtracted so header plus hero
    together equal exactly one viewport, not the hero alone plus a
    header's worth of extra scroll. Verified by measuring
    `header.getBoundingClientRect().height + section.getBoundingClientRect().height`
    against the real viewport height in Playwright across desktop,
    laptop, and phone sizes, not by eyeballing a screenshot, since a 1px
    rounding difference is invisible to the eye but would fail a strict
    equality check.

    **Update 2026-10-18: the header no longer takes layout space, so the
    "minus `4rem`" is gone.** The floating pill header (gotcha #33) is
    `sticky top-0 h-0`, it overlays the page instead of sitting above it,
    so `hero.tsx` is now plain `min-h-dvh` and the hero alone equals one
    viewport. Re-verified by measuring the hero section against
    `innerHeight` at 1440x900, 1280x720, 1920x1080, 768x1024 and 390x844,
    all exactly equal. The short-viewport variant below changed from
    `py-10` to `pt-(--header-clearance) pb-10` so the headline still
    clears the pill, and the accepted overflow shrank slightly (375x667
    now 31px, landscape 844x390 now 207px, was 48 and 239). Everything
    else in this entry (the `dvh` reasoning, the height-based
    `[@media(max-height:700px)]` mechanism, never shrinking the headline)
    still applies unchanged.

    **A real content-overflow gap surfaced immediately, and was fixed as
    a deliberate follow-up, not folded into the same change blindly.** On
    a short viewport (a phone in portrait under roughly 700px tall, or
    any phone in landscape), the hero's actual content, badge, headline,
    paragraph, two buttons, is taller than the available space, since
    `min-height` only sets a floor and content pushes past it when it
    does not fit. Multiple fix options were weighed before picking one
    (shrink text globally, drop the fullscreen constraint on short
    screens, or shrink padding/hide non-essential content only when
    short): the chosen fix is a **height-based** Tailwind arbitrary
    variant, `[@media(max-height:700px)]:...`, applied only to spacing
    and the badge, never the headline's font size, so the headline stays
    full-size and visually anchoring on every device, and normal-height
    devices (including a 1280x720 laptop, deliberately checked since 720
    sits just above the 700px cutoff) render byte-for-byte identically to
    before. Below that cutoff: the badge pill (`No long-term contracts,
founder-embedded from day one`) hides entirely via
    `[@media(max-height:700px)]:hidden`, and `py-24`/`mt-6`/`mt-10` each
    compress to a smaller value at the same breakpoint. This closes most
    of the gap on a real short phone (iPhone SE portrait went from a
    232px overflow to 48px) but does not fully eliminate it on an extreme
    case like a phone rotated to landscape (423px down to 239px), an
    explicitly accepted tradeoff of the "never shrink the headline"
    decision, not an oversight, don't try to silently close that last gap
    with a font-size reduction without checking that decision again
    first. This is the first height-based (rather than width-based)
    responsive breakpoint anywhere on the site, reach for the same
    `[@media(max-height:...)]:` pattern for a future short-viewport
    problem rather than inventing a different mechanism, but combine it
    with a width variant too (e.g. `max-sm:[@media(max-height:700px)]:`)
    if the future case, unlike this one, should not also apply to a short
    but wide desktop window.

21. **`next/og`'s bundled Satori renderer cannot parse WOFF2 at all, a hard
    blocker for any future OG/social-card image that needs the site's own
    typography.** Discovered 2026-09-10 building distinct per-post blog OG
    images: passing `BespokeSerif-Variable.woff2` straight into
    `ImageResponse`'s `fonts` option throws `Unsupported OpenType
signature wOF2` immediately, before variable-font support even
    becomes a question. Fixed by extracting two static (non-variable)
    TTF instances, weight 400 and 600 (the two weights actually used
    sitewide, see `layout.tsx`'s `localFont` call and `hero.tsx`'s
    `font-semibold` heading), from the existing variable woff2 using
    `fontTools` (Python, `pip install fonttools`, not an npm dependency):
    `TTFont(path)`, then
    `varLib.instancer.instantiateVariableFont(font, {"wght": weight})`,
    set `.flavor = None`, `.save()`. The two ~55KB TTFs are pre-generated
    once and checked into `src/app/fonts/`
    (`BespokeSerif-OG-Regular.ttf`, `BespokeSerif-OG-SemiBold.ttf`)
    alongside the original woff2 files, the same "generate the derived
    asset once, commit it" pattern gotcha #14 already established for
    the favicon, not a build-time conversion step (Vercel's build
    environment isn't guaranteed to have `fonttools` available, and
    shelling out to Python mid-`next build` would be fragile). If a
    future OG image needs a weight this pair doesn't cover, regenerate
    with the same two-line `fontTools` snippet rather than reaching for
    a different tool or a hosted font conversion service.
22. **Dropping or never-building a page leaves phantom references in more
    than one place, and a technical SEO audit reliably catches only the
    schema instance, not matching visible content.** The
    `/software-testing-services/website-testing` page was intentionally
    dropped during the original rebuild (gotcha #10) and only ever got a
    redirect, never a rebuilt page. That decision was correctly reflected
    in `next.config.ts`'s `redirects()`, but two other references to it
    silently survived for weeks: the sitewide `ProfessionalService`
    JSON-LD's `makesOffer` array in `layout.tsx` (caught by the
    2026-09-01 live-site audit, since a crawler parses structured data
    directly) and a live, unlinked `ServiceCard` tile on the Services
    overview page itself, full descriptive copy ("cross-browser and
    cross-device compatibility checks... an accessibility pass") for a
    service with no page behind it anywhere on the site (missed by that
    same audit, since it checked schema and metadata, not page-copy-
    versus-sitemap consistency; found and fixed 2026-09-10 while fixing
    the schema instance). **When intentionally dropping a page or
    service, or discovering one that already doesn't map to a real
    subpage, check all of:** the sitewide `makesOffer` array
    (`layout.tsx`), the relevant overview page's own service grid/card
    copy, `site-config.ts`'s `navItems`, `site-footer.tsx`'s generated
    columns (both nav-driven so usually already safe, but verify), any
    FAQ answer or blog in-content link that might reference it, and
    `sitemap.ts` plus `next.config.ts`'s redirect list. Fixing the schema
    is not the whole fix, don't stop there.
23. **A `page.tsx` with query-param-driven behavior (`searchParams`)
    needs `generateMetadata`, not a static `metadata` export, or its
    canonical and title never actually vary with the query string.**
    `blog/page.tsx` handles both `?category=` and `?page=`, but shipped
    with a static, module-level `metadata` const hardcoding
    `alternates.canonical: "/blog"`, so `/blog?page=2` told Google it was
    a duplicate of page 1, the outdated pre-2019 pagination pattern
    (caught by the 2026-09-01 audit, fixed 2026-09-10). Converted to an
    async `generateMetadata({ searchParams })` that recomputes
    `category`/`currentPage` with the exact same
    `getCategoryBySlug`/`getPostsByCategory`/`interleaveByCategory`/
    `getTotalPages`/`clampPage` calls the page component itself uses, so
    an out-of-range `?page=` clamps to the same real last page in both
    the canonical tag and the rendered content, never a canonical
    pointing at a page that doesn't exist, then self-canonicalizes to
    `/blog?page=N` only when unfiltered and `N > 1`. **Update 2026-09-11:
    `?category=` views now also self-canonicalize** (see gotcha #29),
    reversing the "trade indexability for avoiding duplicate-content
    risk" call this gotcha originally documented, once each category
    had enough posts and real per-category copy to earn a genuine,
    non-thin identity. If an older note anywhere still says category
    views intentionally share the bare `/blog` canonical, gotcha #29 is
    the current, correct behavior. Any future paginated or filtered
    route on this site should follow the same shape: `generateMetadata`
    reruns the identical filter/clamp logic the page uses, and only the
    dimension(s) actually meant to be indexable get a self-referencing
    canonical, real per-dimension metadata (title/description, not just
    a canonical tag) is what actually earns that indexability, a
    canonical alone doesn't fix thin content.

24. **Sitewide security headers are set in `next.config.ts`'s `headers()`,
    with a deliberately simple `'unsafe-inline'` CSP, not a nonce-based
    strict one.** Added 2026-09-10 to close a medium-priority SEO audit
    finding (no CSP/X-Frame-Options/X-Content-Type-Options/Referrer-
    Policy/Permissions-Policy at all). A strict, nonce-based CSP (no
    `unsafe-inline`) is Next's more secure documented option, but it
    requires every page to opt into dynamic rendering, since a nonce can
    only be generated and injected per-request via `proxy.ts`, which
    would drop static generation, CDN edge caching, and ISR sitewide,
    the exact things this site's fast TTFB and edge-cached HTML (see the
    Technical & security findings in the 2026-09-01 audit) depend on.
    There is also an experimental Subresource-Integrity path that keeps
    static generation, but Next's own docs flag it as experimental and
    "may change or be removed," too fragile a foundation for a
    production CSP. Chosen instead: `script-src 'self' 'unsafe-inline'`
    (plus `'unsafe-eval'` only in development, matching Next's own
    documented dev-mode requirement for React's debugging `eval`),
    justified by the site having no user-generated content, forms, or
    dynamic user input rendered anywhere, so the realistic XSS surface
    `unsafe-inline` gives up is low. Verified against a real headless
    browser (zero console/CSP violations) including the mobile nav
    drawer, and the full Playwright e2e suite, before shipping.
    **If GA4, Vercel Analytics, or any other third-party script is ever
    added** (closing the audit's separate "no analytics detected"
    finding), the CSP in `next.config.ts` needs updating at the same
    time: add the script's origin to `script-src`, its collection
    endpoint to `connect-src`, and any tracking pixel host to `img-src`,
    don't just drop the script into `layout.tsx` and assume it will load,
    a CSP violation silently blocks it with no visible error on the page
    itself, only in the browser console.
25. **The per-post blog OG image pipeline (gotcha #21) now has a marketing-
    page sibling, `src/lib/marketing-og-image.tsx`, covering the 16
    static pages that aren't blog posts but also shouldn't share the
    homepage's `og-image.png`.** Added 2026-09-10 alongside gotcha #24,
    closing the "12+ pages share one generic OG image" finding for
    everything except the homepage itself (which keeps `og-image.png`,
    that image was always built specifically for it, see gotcha #13, not
    a generic fallback other pages were incorrectly reusing). Same
    `next/og` + static-TTF-font technique as blog, but the design
    differs deliberately: each page reuses its own real `<h1>` text
    (hardcoded per `opengraph-image.tsx`/`twitter-image.tsx` file, there
    is no shared data source for H1 wording the way blog posts have
    `post.title`, so keep the string in sync by hand if a page's H1
    copy changes) on its family's existing claimed bold color rather
    than blog's fixed dark background: Palm Leaf with dark
    (`#1f2a20`-ish) text for Software Testing Services, Muted Olive with
    dark text for QA Consulting, Dark Slate Grey with cream text for
    About and the blog index. The light-background families need dark
    text, the inverse of blog's white-on-dark scheme, get this backwards
    and the eyebrow/title become nearly invisible against the light
    green. A new marketing page in an existing family should add its own
    `opengraph-image.tsx`/`twitter-image.tsx` pair calling
    `buildMarketingOgElement(title, family)` with that family's slug,
    not invent a new rendering path.
26. **A "thin content" finding on a service page is fixed by adding one
    genuinely new section that borrows a device a sibling page already
    established, never by padding existing prose or inventing a new
    visual pattern.** `qa-consulting/cicd-quality-gates`,
    `qa-audit-assessment`, and `release-readiness` all rendered
    noticeably fewer words (431-435) than the rest of the QA Consulting
    family (485-569) and Services (550-680), a 2026-09-01 audit finding,
    fixed 2026-09-10. The actual gap, once measured on the rendered
    page rather than guessed from file size: the thin pages each had 3
    real content sections (an overview grid, `PhaseTimeline`, plus
    either a plain checklist or a deliverables grid) where every deeper
    page in the family had 4. Fixed by giving each thin page the
    specific section type it was missing, reusing a pattern already
    live elsewhere in the family rather than designing a new one:
    `qa-audit-assessment` got a "signs you need this" checklist (the
    same device `qa-process-design`'s own `signals` section already
    uses, Reveal-wrapped `ul` with a `CheckCircle2` per item, see gotcha
    below on where that lives), `cicd-quality-gates` and
    `release-readiness` each got a "what you actually get" deliverables
    icon-grid (the same device `qa-audit-assessment`'s own existing
    `deliverables` section already uses). All three now render
    630-643 words, past the family's own previous high end, still zero
    fabricated stats or claims (`BRAND_GUIDELINES.md` §2 applies here as
    strictly as anywhere else on the site). **Measure a "thin content"
    claim against the actual rendered page**
    (`document.body.innerText.split(/\s+/).length` via a real headless
    browser navigation), not the source file's line or word count,
    since JSX/props inflate a raw file count in a way that does not
    track visible copy.
27. **`llms.txt` was evaluated 2026-09-11 and deliberately skipped, don't
    build it on a future pass without re-checking the evidence first.**
    It's a proposed (not standardized) convention for giving an LLM a
    markdown map of a site, and was considered as one of the 2026-09-01
    audit's four forward-looking opportunity items. Real research at the
    time found: Google confirmed (July 2025, reiterated June 2026) it
    has zero effect on Search rankings or AI Overviews and Search simply
    ignores the file; no major AI vendor (OpenAI, Anthropic, Google,
    Meta, Mistral) has committed to reading it in production crawl/search
    systems; and real crawler logs show negligible uptake (408 requests
    to `/llms.txt` out of 500M+ monitored AI bot visits over 90 days).
    The one place it demonstrably helps is developer documentation sites,
    where a coding agent is told to go read an API's docs and fetches
    `llms.txt` as a curated table of contents for agentic retrieval, a
    real, observed use case (Anthropic's and Cursor's own docs sites, via
    Mintlify). GoGreenlit is a marketing/consulting site with no docs for
    an agent to retrieve and act on, so that use case doesn't apply here.
    This is a live-standards judgment call, not a permanent fact, if a
    future session revisits this, re-check current adoption and vendor
    support rather than trusting this note indefinitely, the point of
    recording it is to save re-deriving the same research, not to freeze
    the conclusion forever.
28. **Founder identity (for `Person` schema) lives in one shared module,
    `src/lib/founders.ts`, not duplicated across the pages that reference
    it.** Added 2026-09-11 closing the "no `Person` schema for the two
    named founders" opportunity finding. A bare `"author":
{"@type":"Person","name":"..."}` (what every `BlogPosting` had before)
    is a weak E-E-A-T signal, it asserts a name but proves nothing.
    `founders.ts` exports `Founder` (slug, name, jobTitle, bio, initials,
    avatarClassName, linkedin, real individually-owned profile URLs, never
    fabricated) plus `buildFounderPersonSchema()` and `getFounderByName()`
    (throws on an unknown name, there are exactly two valid authors and
    that's an internal guarantee, not a scenario to defensively handle).
    Consumed in three places so the same entity reinforces itself across
    the site rather than living once on `/about`: the About page's
    profile cards (which now import `founders` from here instead of
    declaring a local array) plus a `@graph` array of `Person` JSON-LD;
    the sitewide `Organization` schema in `layout.tsx` (a `founder` array,
    the structural link Google's own documented Organization schema
    recommends for founder-led companies); and every `BlogPosting`'s
    `author` field (both founders write posts, see `blog-data.ts`'s
    `author` union type). `Person.url` points at `/about#{slug}`, a real
    anchor on each founder's card, which required adding an optional `id`
    passthrough prop to the shared `Reveal` component
    (`src/components/marketing/reveal.tsx`), non-breaking, every other
    consumer omits it and gets the same behavior as before. If a third
    founder or author is ever added, add them to `founders.ts` (with a
    real LinkedIn URL or no `sameAs` at all, never a placeholder) and to
    `BlogPost["author"]`'s union type, don't hand-write a `Person` object
    inline anywhere.
29. **Blog category views (`/blog?category=slug`) now self-canonicalize
    with real, unique metadata and on-page copy, reversing the decision
    gotcha #23 originally documented.** Added 2026-09-11 once the catalog
    reached 8 posts per category, five genuine topical search intents
    worth ranking for on their own, whereas at launch a category view had
    no unique copy of its own and canonicalizing it to `/blog` was the
    correct call to avoid indexing a thin duplicate. `BlogCategory`
    (`blog-data.ts`) gained a `description` field, a real 150-160
    character sentence per category, reused as both the filtered view's
    meta description and its on-page intro paragraph (the same
    dual-purpose-copy pattern blog post `excerpt` already established,
    write it once, use it twice). `blog/page.tsx`'s `generateMetadata`
    builds the canonical from a `URLSearchParams` carrying `category` and
    (when present) `page`, in the same param order `BlogPagination`
    already generates, title becomes `"{label} Articles"`, description
    becomes the category's own. The page body renders a small `h2` +
    `p` intro block (the category label and its description) above
    `BlogFilterPills`, only when a category is active, since a canonical
    tag alone doesn't fix thin content, the visible page needs to
    actually differ too, that's what makes this a genuinely separate,
    indexable page rather than the same content with a different meta
    tag. Deliberately did **not** move to real static routes
    (`/blog/category/[slug]`), that was considered and rejected as
    disproportionate engineering effort (new routes, redirects from every
    existing `?category=` link in the header nav and internal blog
    copy, new `generateStaticParams`) for a 5-category blog at this
    traffic stage, revisit only if the blog grows meaningfully larger or
    external sites start linking to a category specifically. A new
    category needs a real `description` written the same way, not a
    placeholder, before it should be added.
30. **Core Web Vitals field data needs Search Console or a CrUX API key,
    neither reachable by Claude directly, `npx lighthouse` against the
    live production URL is the fallback for lab data, not a permanent
    dependency to add to `package.json`.** The PageSpeed Insights API
    (`pagespeedonline.googleapis.com`) hit its daily quota on both
    2026-09-01 and 2026-09-10/11, and even a working key only returns lab
    data from that API's own single Lighthouse run server-side, not real
    field data either. Genuine field data (what Google actually ranks on)
    only comes from Search Console (needs the site owner's own Google
    login, and the domain may not even be verified there yet, see the
    still-deferred analytics finding) or the separate Chrome UX Report
    API (`chromeuxreport.googleapis.com`, a different quota bucket, needs
    a free API key generated in the user's own Google Cloud Console, and
    even then may come back empty if the site doesn't have enough
    real-world Chrome traffic to clear CrUX's inclusion threshold, a
    real possibility for a smaller consulting site, not a failure if it
    happens). When neither is available, run
    `npx --yes lighthouse <url> --output=json --chrome-flags="--headless=new --no-sandbox" --only-categories=performance --preset=perf --form-factor=mobile --screenEmulation.mobile --quiet`
    against the live URL, a one-off diagnostic tool call (same "use the
    right tool once, don't add it as a dependency" pattern gotcha #21
    already established for `fontTools`), and present the result clearly
    labeled as lab data, a single synthetic run, not the field data
    Google ranks on. 2026-09-11 baseline for future comparison: homepage
    0.95 performance score / 2.3s LCP / 0.052 CLS / 20ms TBT, blog index
    0.94 / 2.5s LCP (sitting right at the "Good" threshold's edge, the
    one to watch first if the blog gets heavier) / 0.019 CLS / 20ms TBT,
    a blog post 0.97 / 2.1s LCP / 0 CLS / 20ms TBT, QA Consulting overview
    0.95 / 2.2s LCP / 0.062 CLS / 20ms TBT. All comfortably inside
    Google's "Good" thresholds (LCP ≤2.5s, CLS ≤0.1) across every page
    type sampled, no fix was needed, this gotcha exists to record the
    measurement method and baseline, not a defect.
31. **A third content batch (2026-09-15) grew the blog from 40 posts to
    45, 1 new post per existing category, following the same real-research-
    first sourcing gotcha #16 established and the same full process gotcha
    #18 lays out.** Topics came from an actual web search on 2026 QA
    industry trends (QAOps, the codeless test automation market, the
    outcome-based/managed-QA pricing shift, performance and load testing
    practices) cross-checked against every existing post title so no topic
    duplicated prior coverage: `qa-strategy` got QAOps (the QA/DevOps
    convergence trend), `test-automation` got codeless test automation
    (deliberately framed around its honest limitations, not just its
    benefits, gotcha #15's unique-angle requirement), `outsourcing-hiring`
    got outcome-based QA pricing (a distinct angle from the existing
    `qa-outsourcing-cost-pricing-guide` post, which covers rate ranges,
    not the newer outcome-versus-hourly contract structure), and
    `testing-practices` got performance and load testing, a genuine gap,
    no post in that category touched performance at all before this.
    `case-studies` again hit the fabrication constraint gotcha #16
    documents (all 4 real verified stats already used across 5 existing
    posts), resolved the same way as before: a composite pattern piece
    (`what-a-qa-audit-usually-finds`), generalized across engagements
    rather than one identified client, linking each finding category to
    a real service page and closing on the same two real stats (45%
    escaped-defect reduction, 95% coverage) via their own case-study
    posts rather than a new number. All 5 posts carry 5 to 8 in-content
    links in the body plus a 5 to 8 link FAQ section per gotcha #17, an
    author bio via the existing `authorBios` map (no new entry needed,
    both founders already covered), and every title was verified against
    the `title.length + 13 <= 60` budget from gotcha #15 before being
    written into `blog-data.ts`, not estimated by eye. The category split
    stayed even (9 per category, 45 total) and
    `interleaveByCategory()`'s no-adjacent-duplicate guarantee (gotcha
    #19) was reverified against the larger catalog via the existing
    Vitest suite rather than assumed to still hold. `README.md`'s and
    this file's own "40 posts / 57 routes" figures were updated to
    45/62 in the same change, the same upkeep gotcha #14 already
    established for `sitemap.ts`'s per-route dates.
32. **Live Build foundation layer (2026-10-18): additive tokens, one new
    font, shared motion utilities, a global focus ring, and a brand
    component folder outside `ui/`.** Phase 1 of the redesign, built so
    every later phase assembles from finished parts.
    - **Tokens are additive.** `globals.css` gained `--ink` (#1c2820),
      `--paper` (#fbf3e2), `--surface` (#fffaf0), the five swatches as
      `--deep`/`--leaf`/`--olive`/`--navajo`/`--sandy`, the status pair
      `--pass` (= olive) and `--bug` (= sandy), and `--header-clearance`
      (5.5rem). They are exposed to Tailwind (`bg-ink`, `text-ink`,
      `bg-paper`, `bg-surface`, `bg-sandy`, `bg-pass` and so on). The
      shadcn tokens (`--background`, `--card`...) are untouched so pages
      that are not redone yet look the same. The site has no dark mode
      switch, so the new tokens have no `.dark` values. Olive means a check
      passed, Sandy Brown means a bug was found, in every widget, and never
      by color alone (see `StatusPill`).
    - **`font-label`** is JetBrains Mono (a 12KB subset self-hosted through
      `next/font/local`, weights 400 to 500, so there is no request to Google
      and the CSP needs no change, and it is preloaded, see gotchas #65 and
      #66 for why). Small uppercase labels, statuses and numbers
      only. `font-mono` still points at the serif on purpose: three
      existing call sites use it (404, a homepage line, the old stat
      value), and they migrate with their pages.
    - **`lb-*` motion utilities** (globals.css, pure CSS, no library):
      `lb-float`, `lb-pulse`, `lb-caret`, `lb-marquee` + `lb-marquee-track`,
      `lb-sweep` (set `--lb-i`), `lb-term-line` (looping terminal log),
      and the scroll-driven `lb-rise`, `lb-slide-l/r`, `lb-parallax`,
      `lb-parallax-soft`, `lb-zoom-out`, `lb-draw`, `lb-wipe`,
      `lb-progress`, all behind `@supports (animation-timeline: view())`
      with keyframes that end on the natural resting state, so an
      unsupported browser or a screenshot shows the finished page. Every
      class drops to its resting state under `prefers-reduced-motion`.
      They sit beside `Reveal`, which is still the default calm fade-up.
      The terminal needs one keyframe set per line (`lb-term-1` to
      `lb-term-10`, a shared `animation-delay` only offsets the first loop),
      so ten lines is the supported maximum.
    - **Focus ring.** A zero-specificity `:where(a, button, ...):focus-visible`
      rule in `@layer base` draws a 3px ring in `--focus-ring` (ink on light,
      Navajo White inside a section that carries the `on-dark` class).
      Components that draw their own ring with `outline-none`, like Button,
      keep it. **Sandy Brown is not used for focus**: it is 1.97:1 on paper,
      below the 3:1 non-text minimum.
    - **Brand components live in `src/components/brand/`, not in `ui/`**
      (that folder is shadcn-generated and not hand-edited, so
      `buttonVariants` and the generated Card are unchanged):
      `cta-variants.ts` (`ctaVariants`: `cta` Sandy Brown press-down pill,
      `outline`, `outlineOnDark`, sizes `md`/`lg`/`xl`, applied to a `<Link>`
      like `buttonVariants`), `status-pill.tsx` (`StatusPill`, pass / bug /
      idle, each pass and bug carries an icon), `sticker-card.tsx`
      (`StickerCard`, ink outline, hard offset shadow, tones surface / leaf /
      olive / navajo / sandy / deep, lifts on hover unless
      `interactive={false}`; the deep tone uses an ink shadow because a slate
      one would vanish).
    - **Contrast is a test.** `src/lib/brand-contrast.test.ts` reads the
      real hex values out of `globals.css` and asserts WCAG ratios, so a
      swatch change fails before an unreadable pairing ships. Checked
      2026-10-18: ink on paper 13.85, ink on sandy 7.04, ink on olive 8.20,
      ink on leaf 5.48, navajo on deep 7.92, sandy on deep 4.63. **Deep on
      leaf is 3.61, large text only.** Sandy, olive and leaf on paper are
      all under 3:1, decoration only, never text or a focus ring.
    - **Test setup.** `vitest.setup.ts` now stubs `IntersectionObserver`
      (Reveal creates one on mount) and `matchMedia` (reports reduced motion
      as ON, so scroll-linked effects skip their listeners). A test that
      needs the animated path, like `count-up.test.tsx`, overrides
      `matchMedia` to `matches: false` itself.
33. **Site chrome rebuilt (2026-10-18): a floating pill header that takes
    no layout space, Base UI mega menus, a full-screen drawer, a new
    footer and breadcrumbs.** Phase 2.
    - **The header is `sticky top-0 z-50 h-0`** with the pill inside
      (`site-header.tsx`, a Server Component, passes plain props to
      `header-bar.tsx`, a `"use client"` component). It overlays the page,
      so **the first element of every page must clear it** with
      `pt-(--header-clearance)`: `Breadcrumbs` carries it (every page but
      the homepage), the homepage hero uses `py-24`, 404 and error use
      `py-32`. A new page whose first element is not Breadcrumbs needs the
      padding itself. The pill is paper-colored everywhere, one variant, no
      scroll-position detection for dark versus light heroes.
    - **Breakpoint is `md` (768px), not `sm`.** Four items plus the booking
      button do not fit comfortably between 640 and 768. Below `md` the
      `MobileNav` drawer renders instead.
    - **Mega menus** use one `NavigationMenu` root built directly from
      `@base-ui/react/navigation-menu` parts inside `header-bar.tsx`, not the
      generated `ui/navigation-menu.tsx` (its popup classes are hardcoded
      inside the root, so a custom look cannot be composed from outside).
      The popup is anchored to the pill element via the Positioner's
      `anchor` ref with `positionMethod="fixed"`, `align="center"`. Services
      and QA Consulting show their subpages with a one-line `description`
      (a new optional field on `navItems` sub-items in `site-config.ts`)
      plus a booking card. Blog shows category tiles with real article
      counts and the latest post, **computed on the server in `SiteHeader`
      and passed down as props** so none of `blog-data.ts`'s post bodies
      reach the client bundle. There is deliberately no hover preview of
      invented test-log lines in the Services menu (they would need numbers
      the brand rules ban). **Every `NavigationMenu.Link` needs
      `closeOnClick`**, otherwise the menu stays open after a client
      navigation (caught by the e2e suite).
    - **Playwright gotcha:** while a menu is open Base UI sets
      `pointer-events: none` on the `NavigationMenu.List`, so Playwright's
      `hover()` cannot reach a second trigger (the actionability check says
      the `nav` intercepts the pointer). Real mouse movement between
      triggers works fine. `e2e/navigation.spec.ts` opens menus with focus
      plus Enter instead, which also covers the keyboard path.
    - **`MobileNav`** is a full-screen Ink sheet with large type. The
      generated sheet's own close button is turned off
      (`showCloseButton={false}`) in favor of a `SheetClose` in the header
      row, the generated one is a light ghost button that sits wrong on the
      dark ground. Rows rise in with `tw-animate-css` (`animate-in
slide-in-from-right-8`, staggered by index) each time it opens.
      `Logo` gained an optional `onClick` so tapping it closes the drawer.
    - **Footer.** Back to top is a client button (`back-to-top.tsx`) calling
      `window.scrollTo`, **not a `#` link: Next's router swallows a bare `#`
      click on this layout and never scrolls.** The oversized decorative
      wordmark's glyph boxes extend up past its tight `leading-[0.85]`, and
      `elementFromPoint` showed them covering the Back to top button, so the
      row above carries `relative z-10`. Link columns still come from
      `siteConfig.nav`.
    - **Breadcrumbs** are mono labels with a plain `/` separator (still no
      icon, so About stays icon-free), and no bottom border band.
    - **Tests.** `e2e/navigation.spec.ts` (15 tests: header, mega menus,
      Escape, current-page highlight, hero is exactly one viewport, mobile
      drawer, breadcrumb clearance, footer columns, Back to top) plus the 3
      in `home.spec.ts` make 18. `breadcrumbs.test.tsx` covers breadcrumbs.
34. **Shared marketing components restyled (2026-10-18), props kept stable
    so all 15 consuming pages still work.** Phase 3. The old per-page
    pieces they replace (the `aurora-glow` highlight chip inside an `h1`,
    `buttonVariants` CTA overrides) still render inside these components
    until each page's own phase converts them.
    - **`PageHero`** gained `tone` (`deep` default, `leaf`, `olive` for the
      family bands, with ink text since sandy fails on leaf and olive) and
      `aside` (a widget slot, switches to two left-aligned columns on `lg`).
      An `<em>` inside the `h1` is the italic accent word. The scroll zoom
      (`PageHeroScrollZoom`) is unchanged.
    - **`CtaSection`** is a full-bleed band with the aurora. `tone` is
      `navajo` (default), `leaf` or `olive`, **no deep tone, because it is
      always the last section before the footer and the footer is Dark
      Slate Grey, a deep CTA would merge into it.** `title` accepts
      `*word*` for the italic accent via `renderWithEmphasis()`
      (`emphasis.tsx`), a string without asterisks is unchanged. The old
      default copy had contractions, now fixed and guarded by a test.
    - **`StatBand`** is four `StickerCard`s with the four verified stats
      only, each number a **`CountUp`** (`count-up.tsx`, a `"use client"`
      leaf): server-rendered as the final value, resets to 0 only while off
      screen, then eases up over 1.8s when it enters (staggered 80ms with its
      card's `Reveal`), replays on every re-entry, reduced motion shows the
      final value, real value repeated in an `sr-only` span. **A lesson from
      building it:** a first CSS-only version scrubbed the count to scroll
      position over the card's own height, it technically worked but finished
      in about 100px of scrolling, too fast to see, and the check had only
      confirmed the final numbers. Verify an animation by sampling its
      values over time in a real browser, not by checking the end state.
      `animated-stat-value.tsx` and the CSS `lb-count` were removed.
    - **`FaqAccordion`** keeps its structure (closed by default, inline-link
      parser, `Reveal` per row) with large questions, ink rules and a plus
      icon in a ring that rotates and fills Sandy Brown when open. The
      generated chevrons are hidden with `hidden!` (a plain `hidden` loses
      to the primitive's own expanded-state rule). **`ServiceCard`** is a
      `StickerCard` (`bold` = leaf card with sandy icon tile, `subtle` =
      surface card with olive tile), the old blurred hover-glow CSS is
      removed. **`RelatedLinks`**, **`PhaseTimeline`** (line draws with
      `lb-draw`, numbered navajo circles) and **`CompareColumns`** (flat
      tinted left, sandy-bordered sticker right, every item has an icon) are
      restyled in place.
    - **Two reusable widgets**, both decorative and Server Components:
      `TestRunTerminal` (`test-run-terminal.tsx`, `aria-hidden`, at most ten
      lines, tones pass / bug / note) and `RunMatrix` (`run-matrix.tsx`, one
      `role="img"` with a plain-language label, cells sweep diagonally). Keep
      their example text honest and generic, **never put a number in them
      that is not one of the four verified stats** (BRAND_GUIDELINES.md
      section 2).
    - **Verification at the end of Phase 3:** 100 unit tests across 16
      files, 18 e2e tests, lint, format, typecheck clean, and every one of
      the 62 sitemap routes returning 200.

35. **Homepage rebuilt (2026-10-18), Phase 4.** Section order and grounds
    alternate on purpose: hero (deep), what-we-test strip (navajo), stat
    band (paper), service explorer (deep), QA consulting teaser (paper),
    why-embedded bento (leaf), process (paper), `CtaSection` (navajo), footer
    (deep).
    - **Hero** keeps the keyword H1 "Embedded QA teams for startups that
      _ship fast_" (SEO, and the e2e test matches it), the italic accent is an
      `<em>` in Sandy Brown replacing the old highlight chip. The mockup's
      "Ship fast. Skip the escaped bugs." was not used for that reason. From
      `lg` the right column is a `TestRunTerminal` plus two floating
      stickers, **below `lg` they are not rendered** so the hero stays
      exactly one viewport on a phone (gotcha #20 still holds, re-measured
      at 1440x900 and 390x844). Terminal lines carry no numbers.
    - **`WhatWeTestMarquee`**: an ink ticker tape (mono capitals, an olive
      tick or a sandy flag before each topic, no pills; chosen from five
      options, the first pill version read as a widget and not premium). One
      `lb-marquee-track` holds two identical rows, the track slides by 50%
      so each row must carry its own spacing (`gap-0! pr-0!` on the track,
      `pr-7` on rows and items), otherwise the loop jumps. The second row is
      `aria-hidden`.
    - **`ServiceExplorer`** (client): ARIA tabs for Manual, Playwright, API
      and data, Regression, with arrow/Home/End keys and a roving tabindex.
      **All four panels are in the server HTML**, inactive ones only
      `hidden`, so copy and links stay crawlable. The log lines animate in
      with `tw-animate-css` classes each time a panel un-hides. The mockup's
      "212 of 214 checks" and "31 endpoints" were dropped (no invented
      numbers, a unit test fails on digits in the logs other than HTTP
      codes). Selenium, mobile testing and the overview are linked underneath
      so all six services keep an in-content link. The H2 stays
      keyword-led, "Software testing services built for _shipping teams_".
    - **`WhyEmbeddedBento`** keeps the five claims the page already made
      (founder-led, transparent reporting with a sweeping coverage grid, no
      long-term contracts, embedded, manual plus automated), no new claims.
    - The QA consulting teaser section and its `#qa-consulting` anchor are
      kept (internal links to that family). The process section reuses
      `PhaseTimeline` with the old four steps.
    - **Savings calculator not built**: Phase 0 never approved it. Add it
      only on a yes, labelled illustrative, applying the verified 45% only.
    - Verification: 110 unit tests (18 files), 20 e2e, lint, format and
      typecheck clean, tab animation and marquee sampled over time in a
      real browser. Metadata and JSON-LD untouched.

36. **Services overview rebuilt (2026-10-23), first task of Phase 5.**
    `software-testing-services/page.tsx` now reads: Palm Leaf `PageHero`
    (`tone="leaf"`, `<em>` accent in ink) / "every layer" intro with the four
    sprint steps as small `StickerCard`s / services grid (the seven
    `ServiceCard variant="bold"` plus an eighth navajo "Not sure where to
    start?" booking card, so the four-column grid has no orphan row) / a deep
    "how we work" band with navajo cards on an ink shadow (a deep shadow would
    vanish on the deep ground) / stack list as ruled `dl` rows, no boxes / FAQ /
    `CtaSection tone="leaf"`. Copy, FAQ and JSON-LD are unchanged except that
    the contractions that had crept into this page ("What's", "can't",
    "we'll", "you're", "doesn't", "it's") were removed, which also changes the
    first FAQ question text to "What is included in outsourced software testing
    services?". **`SectionHeading`** (`section-heading.tsx`) was extracted for
    this page, it already had two call sites (home and here) and every
    Services and QA Consulting subpage needs it next. The hero
    carries a `RunMatrix` as its `aside` (Chrome, Firefox, Safari, Android,
    iOS, tilted 1.5 degrees from `lg`), which switches the hero to two
    left-aligned columns, stacked on a phone. Sampled in a real browser: the
    cells cycle through several distinct colors over time. A
    leaf band after the grid holds `FrameworkPicker` (client, ARIA tabs,
    Playwright default, Selenium, both panels in the server HTML; no "fit"
    percentage bar, the mockup's 88% and 64% were invented numbers; a unit test
    fails on any percentage). **Gotcha:** `<pre><code>` inherits `font-mono`,
    which still aliases the serif, so set `font-label` on the `code` element
    too. `CoverageRing`
    (client, a proof card before the stack list) fills to the verified 95%
    over 1.8s as it enters and replays, time-based like `CountUp` (not
    scroll-scrubbed, per the stat-card feedback), sampled in a real browser:
    339, 156, 67, 35, 23, 18, 17 offset values over time, reset to empty off
    screen, final 17. `RelatedLinks` (all 12
    subpages) was reshaped from two stacked lists to a feature card plus pills:
    the cross-family pairing is a dark ink card (whole card clickable through an
    `after:` overlay on its link, hit-tested) beside the siblings as two-column
    pills, 325px tall on desktop instead of about 440px. Same `groups` props,
    both headings still h2. `DevicePicker` (client, iPhone / Android / Tablet tabs under the proof
    card) morphs a drawn phone to each device's size and radius (sampled:
    150x290 to 224x290 over about 450ms) while the checklist swaps; no counts,
    a unit test fails on any digit. The three tab widgets (service explorer,
    framework picker, device picker) share **`useTabs`** (`src/lib/use-tabs.ts`,
    arrow/Home/End with wrap, roving tabindex), extracted at the third call
    site. **Hero badges are one line, always.** `PageHero`'s badge is `whitespace-nowrap`
    with a truncating inner span as a safety net, and every page's badge was
    shortened to 38 characters or fewer (measured single-line and untruncated on
    all 15 PageHero pages at 360, 390, 768 and 1440 wide). A new badge must stay
    that short. SEO is unaffected, the badge is a label, the H1, meta
    description and section headings carry the keywords. **The subpage template** was set on the Playwright subpage and is what the
    other five Services subpages copy next: Palm Leaf `PageHero` with a widget
    `aside` / eyebrow-led sections via **`SectionIntro`** (`section-intro.tsx`,
    eyebrow, headline with `*accent*`, lead, `tone` light or dark, `align`) /
    `ServiceCard` grids (bold first, subtle after) / **`DeepBand`**
    (`deep-band.tsx`, deep ground, aurora, navajo cards on an ink shadow, also
    now used by the overview's "how we work") / FAQ / `RelatedLinks` /
    `CtaSection tone="leaf"`. The Playwright hero widget is
    **`RunTestWidget`** (`run-test-widget.tsx`, client, generic over spec
    code and result lines): Run test plays a failure, a trace, a fix and a pass
    line by line (sampled 0 to 5 lines over about 3s, button Running then Run
    again), reduced motion shows everything at once, results sit in a polite
    live region, no numbers or timings. Contractions in this page's copy were
    removed. **All six Services subpages are on the template** (manual, selenium, api-data,
    regression and mobile were rebuilt by the same pattern, with `CheckGrid`
    for statement lists: `tone="bug"` for problem lists such as why suites decay
    and mobile testing gaps, olive tick for benefits). Regression's 95%
    standard reuses `CoverageRing` in an olive card. Page metadata, titles,
    descriptions and heading text are unchanged, apart from contraction fixes
    in body copy and two FAQ questions ("automation will not", "What is the
    difference"). **Pre-existing copy not changed but worth a decision:** the
    regression page says "a suite of 50 well-maintained tests that runs in 8
    minutes with a 0% false-positive rate" and the Playwright page says
    "200 to 500 tests" and "three to six months", illustrative figures outside
    the four verified stats. **Services family OG and Twitter images** (all 7 pages, 14 files) use a
    new `buildServicesOgElement` inside `marketing-og-image.tsx`: Palm Leaf
    with olive and navajo radial glows (Satori cannot blur), wordmark and
    family pill, the page's real H1 with an `accent` phrase (third argument of
    `buildMarketingOgElement`, in Dark Slate Grey since Satori has no italic
    instance and sandy fails on leaf), and a six-cell result strip with one bug.
    The QA Consulting, About and blog-index families still use the old layout
    until their own phases. Rendered and viewed all 14 (each returns 200
    `image/png`, the longest H1 fits). **Phone check (390px) of the overview and Playwright page, done:** every
    section reviewed from screenshots; no horizontal overflow, the coverage ring
    fills on a phone (sampled 339 to 17), and the code windows in the framework
    picker and run widget now wrap below `sm` (`whitespace-pre-wrap`, they
    clipped their long lines before) and keep `whitespace-pre` with scrolling
    from `sm`. Remaining small tap targets are inline text links only. Still to
    come in
    Phase 5: coverage ring,
    device picker, the subpage template and the family OG images.

37. **QA Consulting overview rebuilt (2026-10-23), task q-overview of Phase 6.**
    `qa-consulting/page.tsx` now reads: Muted Olive `PageHero` (`tone="olive"`,
    `<em>` accent in ink, no `aside` yet) / `StatBand` / "Two ways to run QA"
    via `SectionIntro` plus `CompareColumns` / olive `#model` band with
    `PhaseTimeline` / a deep "signs you need this" section (navajo sticker
    cards on an ink shadow, the same trick as `DeepBand`, written inline
    because it has one call site) / `ServiceCard` grid (subtle) / FAQ /
    `CtaSection tone="olive"`. Grounds alternate so the olive hero and olive
    model band never touch. Metadata, H1 and heading text are unchanged
    (asterisks in `title` props are stripped to the same words). Body copy and
    FAQ answers lost their contractions ("what's", "don't", "shouldn't",
    "We'll"), which also changes the matching FAQPage JSON-LD answer text, the
    same trade-off gotcha #36 accepted. **Deliberately not built yet, each is
    its own tracker task that slots into this page:** the pipeline widget
    (q-pipeline, goes under the hero), the usual-way versus GoGreenlit-way
    switch (q-compare, replaces the static `CompareColumns`), the one-minute
    maturity check (q-check, new deep section), and the six-ways carousel
    (q-carousel, replaces the services grid). The mockup's "1-minute check"
    advice text must point only at real subpages. Verified: no horizontal
    overflow at 1440 and 390, badge one line at 37 characters, the hero
    "See the consulting model" link lands on `#model`, 132 unit tests and 23
    e2e pass, lint, format and typecheck clean.

38. **`QualityGateDemo` (2026-10-23), the QA Consulting overview's live widget,
    built in place of the old stat band after the hero.** A client component
    (`quality-gate-demo.tsx`, takes `areas` with an optional `gap` flag):
    an example audit scans five areas, the gap areas keep a five-node release
    pipeline's tests and gate Sandy Brown with the deploy node reading HOLD,
    "Close the gaps" turns them to passed one at a time and the gate opens to
    GO, "Run the audit again" replays the scan. It was picked from six options
    (the five single widgets plus the A and E combination) in a scratch
    artifact. **Placement decision:** it sits in its own full-width section
    right after the hero, not in the hero, because the wide card puts the audit
    beside the pipeline and stays short, and the hero stays plain text. It
    replaced `StatBand` on this page, so **the four verified stats no longer
    appear on `/qa-consulting`**, they could move into the "signs you need
    this" section if wanted. **Complete at rest:** the server render, a
    reduced-motion visitor and a failed observer all see the finished audit
    with two gaps and the gate holding; the scan plays once, the first time the
    card is 40 percent in view (`IntersectionObserver`), reduced motion jumps
    straight to the open state on click. The release packet is CSS
    (`lb-packet`, `lb-packet-held` in globals.css, base `left` is the resting
    position so the reduced-motion rule just drops the animation), and a held
    packet waits in front of the gate, not behind it (an earlier stop at the
    gate's center hid it under the node). Results sit in a polite live region,
    status uses `StatusPill` (tick, exclamation, word), the pipeline itself is
    `aria-hidden` because the message says the same thing, no digits anywhere
    (a unit test fails on any). Sampled in a real browser at 1440 and 390: row
    labels step Scanning, Passed, Gap found over about 4 seconds, the gaps close
    at 600ms steps, the packet moved 770 to 1017px then held, the button was
    hit-tested, no horizontal overflow. 5 new unit tests.

39. **`CompareSwitch` (2026-10-23), the usual-way versus GoGreenlit-way switch,
    task q-compare.** A client component (`compare-switch.tsx`) on the QA
    Consulting overview in place of the static `CompareColumns` (which stays on
    the Embedded QA team and Test strategy subpages). A two-tab ARIA segmented
    control flips one card between the two sides on the same four questions
    (when testing happens, who owns quality, how a bug is found, how the release
    decision is made). **It opens on the GoGreenlit way**, so the page at rest
    and with scripts off shows the recommended answer, which needed an optional
    `initial` argument on `useTabs` (default 0, every other consumer unchanged).
    Both panels are in the server HTML, the inactive one `hidden`, so all copy
    stays crawlable. The old three-bullet lists became one summary sentence per
    side, keeping their facts (adds a person to the existing queue, inherits
    the gaps, value ends with the contract; assesses, redesigns, embeds, your
    team owns it after). A `StatusPill` marks each side, bug for "Defects
    escape", pass for "Defects caught", so the contrast never rests on color.
    The four row values come from the canvas and are generic, no numbers. The
    panel fades up each time it un-hides (`tw-animate-css`, sampled opacity 0,
    0.41, 0.8, 0.95, 0.99 over about 280ms, off under reduced motion). **Phone
    gotcha:** the two labels did not fit one row at 390px and wrapped into
    stacked pills, fixed with `px-3.5 text-[15px] whitespace-nowrap` below `sm`,
    verified single row (54px tall) at 360 and 390 with no overflow. 4 new unit
    tests (default side, both panels in the DOM, flip with its status pill,
    arrow keys with wrap).

40. **`MaturityCheck` and the stats back as cards (2026-10-23), task q-check.**
    `maturity-check.tsx` (client) is the one-minute check on the QA Consulting
    overview, in a deep section with `id="check"` after the compare switch. Five
    statements, each a real `<input type="checkbox">` inside a `<label>` (the
    input is `sr-only` with a `peer` box, so keyboard and screen readers work,
    Space toggles, the focus ring shows on the label via `has-[:focus-visible]`).
    **The first statement still unticked decides the advice**, so the order of
    `questions` is the priority order, and each points at a real subpage:
    strategy to test-strategy-consulting, CI to cicd-quality-gates, go or no-go
    to release-readiness, triage to qa-process-design, QA in planning to
    embedded-qa-team, and all five true to qa-audit-assessment. The tally card
    (navajo, ink shadow, sticky on `lg`) sits after the statements in the DOM so
    a phone reads statements first, and the tally and advice sit in a polite live
    region. The "n of 5 true" is the visitor's own count of their answers, not a
    claim, so the no-digits rule for demo widgets does not apply to it. Nothing
    is stored or sent. Sampled in a real browser at 1440 and 390: ticking the
    first two moved the advice to release readiness, Space on the third moved it
    to process design, all five gave the audit link, bar width 0, 40, 60, 100
    percent. **Section order** is now hero (olive), quality gate demo, compare
    switch, check (deep), model (olive), signs (navajo), services, FAQ, CTA
    (olive), so no two same-colored bands touch. **The four verified stats are
    back on the page** as `StatBand compact` (a new prop on the shared band, a
    `role="group"` two-column grid of the same four `CountUp` cards with no
    section chrome) beside the "signs you need this" list, which became a
    one-column `CheckGrid` on the navajo band. The homepage's full-width
    `StatBand` is unchanged. 5 new unit tests (4 for the check, 1 for compact).
    Still to come in Phase 6: q-carousel, q-sub, q-sub-rest, q-og, q-mobile.

41. **`ServiceCarousel` (2026-10-23), the "six ways in" carousel, task
    q-carousel.** Replaces the six-card `ServiceCard` grid on the QA Consulting
    overview. The H2 text ("QA consulting services") and its intro sentence are
    unchanged, the eyebrow became "Six ways in". **Split on purpose:**
    `service-carousel.tsx` is a Server Component that renders the cards, and
    only the scroll controls are client (`carousel-track.tsx`), because an icon
    component cannot be passed as a prop from a server file to a client one, so
    the cards are passed in as `children`. Each card is now a real link to its
    subpage (the old grid cards were not links), so the overview gained six
    in-content links with the service name as anchor text; the card is an `<h3>`
    inside the link, flips to Dark Slate Grey on hover and keyboard focus, and
    the arrow nudges forward. The track is a plain scroll-snap list, so touch
    swipe, trackpad and keyboard (focusing a card link scrolls it into view)
    work with no JavaScript; the previous and next buttons only show when the
    cards overflow and disable at each end, and a progress rail's thumb is
    written straight to the DOM from a passive scroll listener (state is only
    the two button flags). Drag-with-the-mouse from the canvas was not built,
    the buttons cover mouse users on a desktop. **Gotcha:** with `px-2` on the
    track, snap alignment ignored the padding, so the list began scrolled 8px
    and Previous was enabled on the first card, fixed with `scroll-px-2`.
    Sampled in a real browser at 1440 and 390: start at 0 with Previous
    disabled, a Next click moved the track 287, 374, 384, 384 (smooth, one card
    step), the end disables Next, focusing the first card scrolls back to 0, the
    hover background resolved to Dark Slate Grey, no horizontal overflow. 3 new
    unit tests. `ServiceCard` is unchanged and still used by the subpages.
    Still to come in Phase 6: q-sub, q-sub-rest, q-og, q-mobile.

42. **QA Consulting subpage template, set on Embedded QA team (2026-10-23),
    task q-sub. The other five subpages copy it next (q-sub-rest).** Same shape
    as the Services template (gotcha #36) in the Muted Olive family: olive
    `PageHero` with a widget `aside`, `SectionIntro` eyebrows, `CheckGrid`,
    static `CompareColumns` (the switch is overview only, gotcha #39), an olive
    `PhaseTimeline` band with a `border-y` ink rule, a `DeepBand` for the
    three engagement models, FAQ via `SectionIntro align="center"`,
    `RelatedLinks`, `CtaSection tone="olive"`. Every heading's words are
    unchanged (the asterisks only mark the italic accent), metadata and badge
    (33 characters, one line) too. **The week widget is the hero aside, not its
    own section as in the canvas**, to match how the Services subpages carry a
    hero widget; say so if it should move below the hero. **`WeekPicker`**
    (`week-picker.tsx`, client): five ARIA day tabs (full day names as
    `aria-label`, arrow keys, Home and End through `useTabs`) swapping what an
    embedded engineer does that day. **All five panels are in the server HTML,
    stacked in one grid cell** with the inactive ones `invisible opacity-0` and
    `aria-hidden`, so the card keeps the height of the tallest day (sampled 476px
    on every day at 1440, 478 at 390) and the hero never jumps, which a plain
    `hidden` panel would cause. The panel cross-fades in about 200ms (sampled
    opacity 0, 0.34, 0.86, 0.99). It is an example rhythm with no numbers or
    times (a unit test fails on any digit). **The mockup's "first 30 days"
    timeline was not used**: its schedule (week one, weeks two and three, week
    four's first release gate) is new claims, the real discovery call, week one
    ramp and sprint participation phases stay. Contractions removed from body
    copy and from the FAQ answer ("We do not introduce"), which changes that
    FAQPage answer text, as before. **Screenshot gotcha:** a full-page capture
    without scrolling shows every `Reveal` section blank, set
    `emulateMedia({ reducedMotion: "reduce" })` first. 4 new unit tests. Copy
    already on the page that is not one of the four verified stats: "a 30
    minute conversation", "under about 30 engineers", "30 days notice".

43. **The other five QA Consulting subpages are on the template (2026-10-23),
    task q-sub-rest.** Test strategy, QA process design, CI/CD quality gates,
    QA audit and Release readiness copy gotcha #42: olive `PageHero` with a
    widget `aside` (tilted 1.5 degrees from `lg`), `SectionIntro` eyebrows,
    `ServiceCard` and `CheckGrid` sections, an olive `PhaseTimeline` band, a
    `DeepBand` for the deliverables, FAQ, `RelatedLinks`, olive `CtaSection`.
    Each page's data, metadata and badge are kept, and every heading's words
    are unchanged (checked in a real browser against the originals) except the
    contraction fixes ("Signs you are overdue for a QA audit"). **Hero widgets,
    picked from two options each in a scratch artifact:** `RiskMap`
    (`risk-map.tsx`, tap an example product area to cycle low, medium, high
    risk, the effort follows), `TriageSorter` (`triage-sorter.tsx`, pick a
    severity and the bug lands in fix now, next sprint or backlog, opens on
    Blocker), `MergeGateDemo` (`merge-gate-demo.tsx`, a pull request whose unit
    tests check failed, Merge locked, "Fix the failing test" re-runs the checks
    one by one at 800ms, then Merge unlocks, Replay resets, reduced motion skips
    the re-run), `AuditReportPreview` (`audit-report-preview.tsx`, cycles three
    example findings with area, evidence and recommendation, labelled an example
    and with no "1 of 3" counter), `KnownIssuesDemo` (`known-issues-demo.tsx`,
    accept or block each of three deferred bugs, verdict Go or Hold, opens on
    Hold). All five are client components, complete at rest, status carried by a
    word as well as a color through `StatusPill`, results in polite live regions,
    no digits (one shared unit test fails on any). The generated structure also
    meant a **gotcha for the CI/CD page**: the platforms block (label plus detail
    with no icon) became ruled `dl` rows like the Services stack list, not
    cards. FAQ questions and answers lost their contractions, so their FAQPage
    JSON-LD text changed, as before. **Illustrative figures stay (confirmed 2026-10-23):** only the four
    verified stats are track-record claims, other figures in service copy
    ("two-week audit" and its day ranges, "under ten minutes" for pre-merge
    checks, "90-day roadmap", "three to four weeks", "two to four pages",
    "30 days notice") are examples of how an engagement can run and depend on
    client needs, so they are kept and not flagged again. Never invent a result
    or a new track-record number, and see BRAND_GUIDELINES.md section 2. 8 new unit tests across the five widgets. Still to come in Phase 6: q-og,
    q-mobile.

44. **QA Consulting family OG and Twitter images (2026-10-23), task q-og.** All
    7 pages, 14 files, use a new `buildConsultingOgElement` inside
    `marketing-og-image.tsx` (the `qa-consulting` family now routes to it, the
    About and blog-index families keep the old layout until their own phases).
    Muted Olive ground with navajo and palm leaf radial glows (Satori cannot
    blur), the wordmark and a "QA consulting" pill, the page's real H1 with its
    accent phrase as a **navajo sticker chip** (ink border, hard ink shadow)
    instead of a colored word, so it reads clearly different from the Services
    card, and a small five-node release pipeline at the bottom with one Sandy
    Brown gate, the family's signature idea. Every `opengraph-image.tsx` and
    `twitter-image.tsx` passes the page's real H1 and its accent as the third
    argument of `buildMarketingOgElement`, so a changed H1 needs both files
    edited by hand (there is no shared source). Rendered and viewed all 7: each
    returns 200 `image/png` at 1200 by 630, the Twitter image is byte-identical
    to the Open Graph one, the longest H1 ("Release readiness reviews that mean
    more than a passing test run") fits with no clipping.

45. **QA Consulting phone check (2026-10-23), task q-mobile, ends Phase 6.**
    Checked at 390 wide with touch emulation (`isMobile`, `hasTouch`, real
    taps, a CDP `synthesizeScrollGesture` swipe) on the overview, Embedded QA
    team and CI/CD quality gates, and every section of the overview was reviewed
    from screenshots. No horizontal overflow on any of them, the hero badges stay
    on one line, the page content has no tap target under 44px apart from inline
    text links. Taps worked on the quality gate demo (Close the gaps, then Run
    the audit again), the compare tabs, the maturity check statements (tally and
    advice updated), and a touch swipe moved the carousel from 0 to 344px with
    Previous enabling. **What the audit found was shared chrome, not Phase 6
    content, and is fixed for every page:** the breadcrumb links were 16px tall,
    the footer column heading links 16px, the header and footer logo 28px and
    the CTA "or email" link 23px. Each now has an invisible `after:` layer that
    stretches the tap area to about 44px (`relative after:absolute
after:-inset-y-*`), so nothing moves and hit-testing at 18px above and below
    the text still lands on the link. **Left at their natural size on purpose:**
    the footer link rows (31px tall with spacing between, past the 24px WCAG 2.5.8
    minimum) and inline text links inside paragraphs. A note from Phase 5 that
    "remaining small tap targets are inline text links only" was not quite true
    for the chrome, this entry is the correction. **A page whose first element is
    a card and not a link list needs no chrome change,** but audit a new family's
    phone view with the same script: list every visible `button`, `a[href]`,
    `[role=tab]` under 44px in either direction and ignore only inline links and
    cards that are whole-card links through an `after:` overlay.

46. **Blog post tile with a cover panel (2026-10-23), task b-tile, first of
    Phase 7.** `BlogPostCard` was restyled in place, so the blog index and the
    "more on this topic" block on every post both get it. A `StickerCard` that
    is one link, with a cover panel on top (the category's swatch, a pill that
    spells the category out, the post's own lucide icon drawn large over two soft
    rings, the date as a mono `<time>`) and the title (a real `h3`, three lines
    max), excerpt (three lines max, the full text stays in the markup), founder
    initials, author, read time and an arrow below. The icon is the post's own
    (the canvas used a two-letter category code, which would have repeated on
    every card in a category). The tile lifts on hover through the sticker card
    and the icon tips, sampled lift 3px left and up, and every tile in the grid
    measures the same height (425px at 1440 and 390). **Category colors changed
    at the source to match the canvas**, because the tile cover, the filter dots
    and the Blog menu tiles all read the same fields: QA Strategy is Sandy Brown,
    Test Automation Muted Olive, Outsourcing and Hiring Palm Leaf, Testing
    Practices Navajo White, Case Studies Dark Slate Grey, replacing the old
    chart-1 to chart-5 tokens (which included a gold, `#f1b650`, that was never
    a brand swatch). `colorClass`, `borderClass` and `tintClass` in `blog-data.ts`
    now point at the swatches, and a new **`coverClass`** pairs each swatch with
    the text color that reads on it (ink on four, navajo on deep, all past 5:1).
    **A regression this caused and fixed:** the Blog menu hard-coded which
    category needed light text (`DARK_TILE_SLUGS`, qa-strategy, true for the old
    tokens), so the new deep Case Studies tile had dark text on dark. The menu now
    takes `coverClass` and the special case is gone, so a future color change
    cannot make that mistake again. **Their follow-ups are done:** the per-post OG images (gotcha #58) and the
    filter pills (gotcha #51). 4 new unit tests.

47. **Blog hero (2026-10-23), task b-hero.** `BlogHero` is now the deep hero
    with the italic accent: the page's H1 words are unchanged ("Straight talk
    on shipping quality software", the old highlight chip became `<em>` in Sandy
    Brown), the badge is the mono pill (32 characters, one line), the button is
    the `ctaVariants` pill with its press edge. **It is still its own component
    and still the one translate-based scroll effect** (gotcha #5): the heading
    block drifts up and fades (sampled opacity 0.77, 0.55, 0.32 at 150, 300,
    450px of scroll), and five category chips drift sideways and fade at
    different rates and directions, reversing on the way back. **What is new is
    the chips themselves:** each is the category's own swatch with an ink outline
    in the mono label style, tilted at rest, and floats on its own `lb-float`
    loop (sampled 0 to -14px over about 3s) with a different delay each. The
    float lives on an **inner** span and the scroll transform on the **outer**
    one, so the two never overwrite each other's `transform`. **Case Studies
    would vanish** (Dark Slate Grey chip on a Dark Slate Grey hero), so that one
    chip uses surface and ink, a unit test guards it. Reduced motion drops the
    float (`animation-name: none`) and the scroll effect, and the chips stay
    `aria-hidden` and are hidden below `sm`, as before. The hero's own section is
    not one viewport tall (it never was). **Test gotcha:** `pointer-events-none`
    is also on the aurora layer, so select the chips by `.lb-float`, not by that
    class. 3 new unit tests.

48. **Blog live search and filter pills (2026-10-23), task b-filters.** Search
    is a **`?q=` query param kept as the source of truth**, with a small client
    component on top: `BlogSearch` (`blog-search.tsx`) updates the URL as you type
    (250ms debounce, then `router.replace(buildBlogHref({category, q}))`,
    `scroll: false`) and the server re-renders the matching posts, so there is no
    client copy of the post data and every result is a shareable URL. `replace`,
    not `push`, so typing does not add a history entry per letter (sampled: history
    stayed at 2 after ten keystrokes). The input is controlled, follows the URL
    only when it changes from outside (back button, a pill that dropped the
    search) via `lastSent`, and keeps focus while the page re-renders. It is still
    a real `role="search"` GET form, so Enter works with scripts off, and there is
    no Search button. Clear is a button that empties the box and keeps focus.
    `searchPosts()` and `normalizeSearchQuery()` match every word
    (case-insensitive) against title, excerpt, category label and section
    headings, not whole bodies. **Gotcha:** the client component must not import
    `blog-data.ts` (45 post bodies would ship to the browser), so
    `normalizeSearchQuery`, `MAX_SEARCH_LENGTH` and **`buildBlogHref`**
    live in `src/lib/blog-href.ts` (pure, used by the pills, pagination and
    search) and `blog-data.ts` re-exports them. **SEO:** a search view is
    `noindex, follow` with its canonical on the bare `/blog` or the category view
    it narrows, so query URLs never enter the index; category and page canonicals
    (gotchas #23, #29) are unchanged. A polite `role="status"` line reports the
    result count. The filter pills were restyled (mono label, ink outline, active
    pill ink fill with a sandy offset edge, the category swatch as a dot, 44px on a
    phone) and carry the active query. Pagination only gained a `query` prop here,
    its restyle is b-pagination. 7 new unit tests.

49. **Featured post block (2026-10-23), task b-featured.** `BlogFeaturedPost`
    (`blog-featured-post.tsx`, server) is one wide sticker card above the grid:
    a category-colored cover (rings, the post's own icon, a Sandy Brown "Featured
    article" pill and the category pill) beside the date, title, full excerpt,
    byline and a "Read the article" pill; it stacks on a phone. The whole card is
    one link and its title is the page's first `h2`. **The featured post is
    chosen by hand**, `FEATURED_POST_SLUG` in `blog-data.ts` (currently
    `how-to-outsource-qa-testing`), not "newest", because five posts share
    2026-09-15; change that one line to feature another. It shows only on page 1
    of the plain index (no category, no search), and there it is **taken out of
    the grid so it is not shown twice**, which makes the plain index 44 posts
    over 5 pages. On page 2 and later the featured post is not listed, it stays
    in its category view, in search, in the sitemap and in related links.
    **`getBlogIndexView({category, q, page})`** in `blog-data.ts` now computes
    category, query, featured, the display list, clamped page and the page's posts
    for both the page and `generateMetadata`, so they cannot disagree (the
    duplicated filter logic gotcha #23 warned about is gone). 6 new unit tests.

50. **Category view header (2026-10-23), task b-category.** `BlogCategoryHeader`
    (`blog-category-header.tsx`, server) replaces the plain heading and paragraph
    that gotcha #29 added: a non-interactive sticker banner in the category's own
    `coverClass` swatch with two decorative rings, a mono "Category" pill, the
    same `h2` ("{label} articles"), the category's real `description` (still the
    same string as its meta description, so the visible copy and the metadata
    cannot drift), the category's total article count (not narrowed by a search)
    and an "All articles" link back to `/blog`. Pills use the light surface so they
    read on every swatch, including dark Case Studies (viewed on that one and on
    Sandy Brown at 1440 and 390). **Metadata, canonicals and the H2 text are
    unchanged**, so the self-canonical and unique title from gotcha #29 still
    hold. 6 new unit tests (every category, singular count).

51. **Blog filters and pagination style (2026-10-23), tasks b-filters and
    b-pagination.** Both were first built as outlined mono pills with an offset
    edge and rejected as cartoony, five calmer options were shown in a scratch
    artifact and **option C (soft tint chips and quiet square keys) was chosen**.
    **Filter pills** (`BlogFilterPills`): borderless 10px-radius chips in the
    serif, each a low-opacity tint of its category swatch (`tintClass`), solid in
    its `coverClass` with bold text when active (so Case Studies goes Dark Slate
    Grey with cream text), "All articles" goes ink when active, a faint inset
    shadow darkens any chip on hover, 44px tall on a phone. No dots (the tint is
    the color) and the category name is always spelled out. **Pagination**
    (`BlogPagination`): 44px square keys in a faint ink tint, the current page
    ink-filled with `aria-current`, each number labelled "Page N", Previous and
    Next as arrow keys with sr-only "Previous page" and "Next page" text. **At the
    ends they are not links**, they render as dimmed `span`s with `aria-disabled`
    (a disabled link stays focusable and crawlable), and the live ones carry
    `rel="prev"` and `rel="next"`. One row that wraps only if the screen is too
    narrow (checked at 1440, 390 and 360, no overflow). URLs and canonicals are
    untouched, links come from `buildBlogHref` in the order `category`, `q`,
    `page`, so gotchas #23 and #29 still match every link. 3 new unit tests.

52. **Post header and reading progress (2026-10-23), task b-post.**
    `BlogPostHeader` stays the calm light reading header (gotcha #9, no dark
    hero on posts) but is restyled: mono back link, the category as a link pill in
    its `coverClass` swatch to that category's view, the date (a real `<time>`)
    and read time in mono, a larger serif `h1`, the post's own icon in a swatch
    tile beside the title from `sm`, and a byline with the founder's initials
    whose name links to **`/about#slug`** (their card, which is also the `Person`
    schema's url) with the one-line bio under it. Tap areas on the back link,
    category pill and author link are stretched with `after:` layers (hit-tested
    9px above and below on a phone). **`ReadingProgress`** (`reading-progress.tsx`,
    client leaf) is a 4px Sandy Brown bar fixed to the top of the screen
    (`z-[60]`, above the header pill), tracking **the article body only**
    (`#article-body`, an id added to `ArticleBody`'s inner div), not the whole
    page: empty while the header is in view, full when the end of the article
    reaches the bottom of the screen, still full over the FAQ and footer. It
    writes `scaleX` straight to the DOM from a passive rAF-throttled scroll
    listener (gotcha #5), no state, no re-render. The CSS `lb-progress` utility
    was not used because `scroll(root)` would count the FAQ, related posts and
    footer. It is a position indicator, not motion, so reduced motion keeps it,
    and it is `aria-hidden` (decorative). Sampled in a real browser at 1440 and
    390: 0, 0.25, 0.5, 0.75, 1 at the matching scroll positions, 1 at the page
    bottom, no overflow, one `h1`. The table of contents is the next task and will
    reuse `#article-body`. Metadata and JSON-LD untouched. 3 new unit tests.

53. **Table of contents as a floating reading pill (2026-10-23), task b-toc.**
    The first version was a sticky sidebar list, rejected (it sat 8px under the
    header line at rest and looked like more body text), five options were shown in
    a scratch artifact and **the floating pill was chosen, with the rule that it
    must not cover article text while collapsed.** `TableOfContents`
    (`table-of-contents.tsx`, client, `items`, `bodyId`, `endId`) is a dark Ink pill
    showing the current section (or "Introduction"), a thin Sandy Brown progress
    line and a chevron; tapping it opens the full H2 list upward. **Placement is
    what keeps it off the text:** from `xl` (1280px) it is `fixed` at
    `left-[calc(50%+384px+24px)]`, `w-56`, in the empty margin right of the 768px
    article column (checked at 1440 and 1280: zero text ranges intersect it, no
    overflow); **below `xl` there is no free margin, so it is a solid bar docked to
    the bottom edge** (safe-area padding), and text scrolls out under its top edge,
    which cannot be avoided on a phone without making the viewport shorter. Only
    the open list may cover text, and it closes on a link tap, Escape, a tap
    outside, or when the pill hides. **It only shows while reading:** from when the
    article body top reaches the upper half of the screen until `endId` (the FAQ
    section when the post has one, else the article body) has scrolled away, then
    fades and becomes `inert`. One list in the DOM, plain `#hash` anchors, closed
    items are `tabIndex -1`. **The closed pill shows a number, never a title**
    (titles were cut off on every post): the current section as a Sandy Brown mono
    number out of the total ("04 / 10", "00" in the introduction) beside a muted
    "On this page" label, with the full title and position in an `sr-only` span for
    screen readers. The open list keeps the full titles, each prefixed with the same
    mono number (the current one in Sandy Brown), and opening scrolls the current
    section into view. The page passes it `endId="faq"` or `"article-body"`.
    Current section and visibility come from one passive rAF-throttled scroll
    listener (gotcha #5), the progress line is written to the DOM directly.
    **Anchors:** `buildToc()` in `src/lib/blog-toc.ts` makes a unique ASCII id per
    H2 (`-2`, `-3` on a repeat, never `faq` or `article-body`), `ArticleBody` puts
    the id and `scroll-mt-28` on each `h2` (it no longer takes a `toc` prop), the
    FAQ section has `id="faq"`, and a jump lands the heading at 112px, just under
    the floating header. Sampled in a real browser at 1440, 1280 and 390: hidden
    and inert at the top, shown from the first section, the title changed at each
    heading, a link jumped and closed it, hidden again at the page bottom. The top
    `ReadingProgress` bar (gotcha #52) stays. 9 new unit tests across the toc
    files.

    **History gotcha (fixed 2026-10-23):** the pill's links were plain `#hash`
    anchors, and every hash click pushes a history entry, so after jumping through
    two or three sections the browser Back button and the "Back to the blog" link
    (`BackToBlogLink` calls `router.back()`) only walked back through the sections
    instead of leaving the post. The links now scroll with `scrollIntoView`
    (smooth, instant under reduced motion) and update the address bar with
    `history.replaceState(history.state, ...)`, keeping Next's own state, so a post
    is one history entry however many sections you visit. The `href` stays for
    no-JS, and a modified click (cmd, ctrl, shift, alt) still opens normally. The
    `blog-post.spec.ts` e2e opens a post from the index, jumps through three
    sections, and checks both browser Back and the link return to the blog (it
    fails on the old behavior). Back to the same category, page and scroll
    position was checked at 1440 and 390. **Any future in-page jump control on a
    post must use `replaceState`, not a plain hash link.**

54. **Blog filter and pagination clicks scroll to the content, not the hero
    (2026-10-23).** Next scrolls a same-page search-param navigation to the top of
    the page, which threw readers back up past the hero on every filter or page
    click. Fixed with anchors: filter links (`BlogFilterPills`, the category
    header's "All articles") end in **`#blog-top`**, which sits on a wrapper
    around the category header (when a category is active) and the search box, so
    the category header (or the search box on the plain index) lands at the top of
    the screen; pagination links end in **`#blog-list`**, which is the featured
    article on page 1 of the plain index and the first row of cards everywhere
    else (only one element carries the id). Both have `scroll-mt-28`, so the target
    lands 112px down, just under the floating header (sampled at 1440 and 390,
    including a second filter click with the same hash, the All articles link, and
    pages 1, 2 and 3). `buildBlogHref` got an optional `hash`; **never pass it when
    building a canonical** (canonicals in `generateMetadata` use `buildBlogHref`
    without it, checked: still `/blog`). The live search's `router.replace`
    deliberately has no hash and `scroll: false`. **The featured article stays on
    page 1 only:** repeating one wide card above every page would cost 360px
    (desktop) to 620px (phone) per page, repeat the same article on every
    paginated URL, and push the older posts down, so later pages begin at the
    first row. 2 new e2e tests (`blog-index.spec.ts`).

55. **Article callouts (2026-10-23), task b-callouts.** Three new
    `BlogContentBlock` types, still plain data in a post's `body` (no MDX, gotcha
    #9), rendered by `ArticleBody` through `blog-callouts.tsx` (server
    components, no motion):
    - **`{ type: "answer", text }` renders `AnswerBox`**: the post's direct answer
      (gotcha #15) in a Navajo White sticker with a mono "The short answer" label.
      It replaces the plain paragraph directly under the question H2 with the
      **same words**, so the snippet-shaped answer stays right there in the markup.
      A unit test fails if an `answer` block is not directly under a `heading`.
    - **`{ type: "stat", stat, note }` renders `StatCallout`**: `stat` is a
      `VerifiedStatKey` (`experience`, `escapedDefects`, `coverage`, `revenue`),
      **never a typed number**, so an invented figure will not type-check. The four
      stats moved to **`src/lib/verified-stats.ts`** (with `formatVerifiedStat`),
      shared with `StatBand`, which now maps over them. The card uses the stat's
      own band color, the `note` says where it comes from and takes `[label](/path)`
      links (link it to the real case study post, gotcha #17).
    - **`{ type: "redflags", items, title? }` renders `RedFlags`**: a Sandy Brown
      tinted card with the bug `StatusPill` ("Red flags", an icon and a word, never
      color alone) and a flag marker per item, still a real `ul` with inline links.
      **Shown on one post, `how-to-outsource-qa-testing`:** the answer under its
      first H2, the 45% stat callout after the escaped defects paragraph (linking
      `/blog/how-we-reduced-escaped-defects`, the claim was already in that
      paragraph), and its red flags list. **No post copy, heading, title, excerpt or
      JSON-LD changed** (the 45% claim was already in the post, the callout only
      repeats it with its source). The other 44 posts are untouched and can adopt a
      block by editing their data; a post that earns a callout should follow
      gotcha #15's unique-angle rule. Checked in a real browser at 1440 and 390, no
      overflow, one `h1`. 9 new unit tests.

56. **Related posts block (2026-10-23), task b-related.** `BlogRelatedPosts`
    is restyled in place and takes the post's `category`: a full-width band in the
    **category's own tint** (`tintClass`, so it ties to the cover colors on the
    tiles inside it), a mono "Keep reading" label, the **same H2, "More on this
    topic"**, an "All {category} articles" pill linking to
    `/blog?category=slug#blog-top` (gotcha #54), and the same `BlogPostCard`
    tiles, three across from `sm`, one column on a phone. It sits between the FAQ
    and the closing call to action. **The selection changed:**
    `getRelatedPosts()` used to return the first three siblings in catalog order
    for every post, so in each category the same three got the inbound links and
    the rest got none from their own category. It now starts at the post after the
    current one and wraps around, still deterministic and still the same category
    only, so each post points at its own neighbours and every post is linked from
    at least one other (a unit test checks all 45). Viewed on an Outsourcing post
    and a Case Studies post at 1440 and 390, no overflow. 4 new unit tests.

57. **Blog SEO regression check (2026-10-23), task b-seo. Clean, nothing
    regressed.** The method is worth repeating at the end of the redesign (Phase 9):
    check out `origin/main` as a git worktree in the scratchpad, **symlink
    `node_modules` into it and run `npx next dev --webpack -p 3100`** (Turbopack
    refuses a symlinked `node_modules`, webpack does not, and a second project dir
    gets its own dev lock), then fetch every blog URL from both servers with
    JavaScript off in Playwright (what a crawler sees) and diff title, description,
    canonical, robots, OG and Twitter tags, JSON-LD, headings and in-content
    links. Set both sites' URL to the same origin before comparing (a copied
    `.env.local` pointed `main` at port 3000, which showed up as a false sitemap
    diff), and strip the `?hash` Next appends to the OG image URLs, it depends on
    the checkout path. Remove the worktree and its symlink afterwards. **Results
    over 61 URLs (all 45 posts, the index at pages 1, 2, 3, 5 and an out-of-range
    page, an unknown category, every category at pages 1 and 2):** title,
    description, canonical, robots, OG and Twitter text, and every JSON-LD block
    (`BlogPosting`, `BreadcrumbList`, `FAQPage`, `Blog`) are **identical** to
    `main`; the sitemap (62 URLs with the same `lastModified`) and `robots.txt` are
    identical; every post has exactly one `h1`, no skipped heading level, no
    duplicate ids, every contents link has its target, no em dash, no bracket link
    syntax in FAQ schema text, FAQ schema count equals the visible questions on all
    45 FAQ posts, every title is 60 characters or fewer with the template and every
    description 138 to 160, self-canonical on every post, an unknown slug is a 404
    as before. **Headings differ on 35 posts only inside the related block**
    (`getRelatedPosts` now rotates, gotcha #56), on the index the featured post is
    an `h2` where it was an `h3` (gotcha #49), and a search view is `noindex,
follow` with a canonical on `/blog` (gotcha #48). **Pre-existing, not caused by
    the redesign:** the plain index and its pages have no `h2` before the first
    card `h3` (the `h1` is followed by `h3`s, the same on `main`), and
    `how-to-evaluate-an-ai-testing-vendor` has 4 in-body links where gotcha #17
    asks for 5 to 8 (its FAQ has 6). The per-post OG images were restyled
    afterwards (gotcha #58).

58. **Blog OG and Twitter images (2026-10-23), task b-og.** **Per post**
    (`buildBlogOgElement` in `blog-og-image.tsx`, used by both
    `[slug]/opengraph-image.tsx` and `twitter-image.tsx`): the blog tile at
    1200 by 630. The category's swatch is the ground (the same pairing as
    `coverClass`, repeated as hex in `CATEGORY_COVER` because Satori cannot read
    Tailwind classes or CSS variables, **keep it in step with the swatches**), with
    a radial glow and two soft rings, the wordmark and a category pill on top, the
    title large, **the post's own icon drawn big at the bottom right**, and the
    founder's initials chip, name and read time. The old hex map of dark-mode
    `chart-1..5` colors is gone. **Index** (`buildBlogIndexOgElement` in
    `marketing-og-image.tsx`, the `blog-index` family now routes to it, About keeps
    the old layout until Phase 8): Dark Slate Grey with glows like the hero, the
    page's real H1 with "shipping quality software" in Sandy Brown (passed as the
    third argument in both `opengraph-image.tsx` and `twitter-image.tsx`, edit both
    if the H1 changes), and the five category chips tilted along the bottom, Case
    Studies the light one for the same reason as the hero. **Three gotchas.**
    (1) **A lucide icon cannot be rendered in Satori**: it is a forwardRef that
    renders another forwardRef which calls `useContext`, so a direct `<Icon />`
    returns a 500. The outer one only builds an element that carries
    `props.iconNode` (a list of `[tag, attrs]`), so `renderIcon()` calls
    `icon.render()` one level and draws the `<svg>` itself, and returns null on
    anything unexpected (a unit test fails if any of the 45 posts loses its svg, so a
    lucide upgrade cannot silently drop the icons). (2) **Satori breaks words at
    hyphens**, so "AI-Generated" split across two lines; titles are rendered as one
    flex item per word with `columnGap` instead of a text run. (3) **Sandy Brown
    accents vanish on the Sandy Brown (QA Strategy) ground**, so the wordmark dot
    goes Navajo White and the initials chip surface there. No digits or claims were
    added, the cards show the post's own title, author and read time. Verified: all
    90 post image routes (45 posts times two) return `200 image/png`, the Twitter
    image is the same renderer, and the longest title (47 characters) and each
    category color were viewed. 3 new unit tests.

59. **Blog phone check (2026-10-23), task b-mobile, ends Phase 7.** Checked at
    390 and 360 wide with touch emulation (`isMobile`, `hasTouch`, real taps) on the
    index, page 2, a category view, a search with results and one with none, and
    three posts. **No horizontal overflow on any of them.** Real taps worked on a
    category filter (landed the category header at 112px), typing in the search
    (results after the pause, focus kept in the box, Clear emptied it), a page
    number (landed the list at 112px), a post tile, the contents pill (docked bar
    appears only while reading, tap opened the numbered list, a section tap jumped
    the heading to 112px and closed it, a tap outside closed it, one history entry
    stayed), the answer box, stat callout and red flags card (all inside the 16px
    gutters), a FAQ question, and the related block's "All ... articles" link and
    "Back to the blog". The bar is inert at the top of a post, shown from the first
    section through the FAQ, and hidden at the related block. **What the audit
    changed:** the post header's back link (40px), author link (36px) and category
    pill (43px) were under 44px even with their invisible `after:` layers, now
    `-inset-y-3.5`, `-inset-y-3` and `-inset-y-2.5`, so each is about 44px. Every
    other target under 44px in the audit was shared chrome already handled in
    gotcha #45, plus the footer link rows left at their natural size on purpose.
    **Probe gotcha:** hit-testing a tap layer on a phone can land on the next flex
    row (the post date wraps 8px under the category pill), which is not a failure,
    count the layer's real reach up to the next row. **Known and accepted:** on a
    phone the open contents list covers about 60 percent of the screen (it is the
    only time it may cover text, gotcha #53), and Next's dev indicator sits over the
    docked bar's number in `next dev` only.

60. **About page rebuilt (2026-10-23), first task of Phase 8 (a-about).** Still
    the one **icon-free** page (a unit test fails on any `svg` in its content) with
    the Dark Slate Grey founders section, now in the board's typographic style.
    Order: a **big-type hero on paper** (not `PageHero`), the story, the DSG
    founders section with aurora, a giant italic pull quote, the manifesto, the
    Chicago section, an olive `CtaSection`. **Hero:** the H1 keeps its words ("Two
    QA engineers who got tired of watching bugs ship", the board's "Two founders.
    One standard." was not used so the headline, the founders' story and the H1
    stay in step with the meta description), set at up to 112px with each word
    rising in one after another on load (`lb-word`, `--lb-i` is the index, 0.7s
    each, 60ms apart, ends on the resting state, off under reduced motion). The
    accent is `lb-marker`, a **Sandy Brown text-decoration underline** under ink
    italic text (chosen from five options in a scratch artifact: italic only,
    underline, soft highlighter, olive highlighter, wavy underline). **Sandy Brown
    text fails contrast on paper, so the phrase stays ink.** It replaced a first
    version that painted a gradient bar behind the phrase, which sat at the wrong
    height and covered only part of a wrapped line. **Gotcha:** an underline on a
    parent does not reach inside an `inline-block` child, and the hero words are
    inline blocks (for the rise-in), so the accent words carry `lb-marker`
    themselves as well as the `<em>`, which underlines the spaces; without that only
    the spaces were underlined. Sampled at 1440, 1100 and 390, one continuous stroke
    per wrapped line. Two decorative circles
    (`lb-parallax`) show **only from 1400px**, below that they touched the headline
    (checked at 1440, 1399, 1280, 1100, 1024 by intersecting real text ranges, not
    boxes). The hero keeps the two CTAs the page already had. **Founders:** two
    white sticker cards (28px radius, hard Ink shadow, the shared `StickerCard` was
    not used because its shadow vanishes on this ground), a 96 to 112px initials
    avatar that spins on hover (not under reduced motion), name as `h3`, job title in
    mono, the bio and **a LinkedIn link** (new, from `founders.ts`, opens in a new
    tab with `rel="noopener noreferrer"`, an `after:` layer makes it 48px tall). All
    founder data still comes from `founders.ts`. **The four-card `StatBand` left
    this page** (the board shows only the 18+ years figure, a `CountUp` from
    `verifiedStats` under the cards); put it back if you want all four stats here.
    **Pull quote:** the real founders' quote, not the board's "Founder-embedded
    from day one." placeholder, as a 60px italic with `lb-wipe` and the same
    underline on "cannot afford to hire yet". **Manifesto:** the four existing statements (not
    the board's five, whose extra lines were new claims), numbered, each with a
    colored left rule that fills on hover and slides 10px (not under reduced
    motion). **Copy:** metadata, breadcrumb and `Person` JSON-LD are unchanged and
    every contraction in body copy was removed ("We are not a testing factory",
    "do not", "cannot", "had each spent"), with a unit test that fails on any
    contraction or em dash. The CTA title is the same words with the accent on "QA".
    Checked at 1440, 390 and 360: no overflow, no text under the circles, word rise
    sampled opacity 0, 0.3, 0.7, 0.9 over about 900ms. 5 new unit tests. Still to
    come in Phase 8: the 404, the homepage and About OG images, the favicon check
    and the sitemap, robots and redirects check.

61. **404 page rebuilt (2026-10-23), task a-404.** `not-found.tsx` is a deep
    `on-dark` section (with a navajo hairline under it so it does not merge into
    the deep footer) with the aurora: a giant Sandy Brown "404" whose zero
    wobbles (`lb-wobble`, 4s, off under reduced motion, sampled rotating about
    plus and minus 6 degrees), the H1 "This test _failed._ The page is not here."
    with an `sr-only` "Error 404." lead, the board's lead sentence, a cta "Back to
    home" and an outline "Browse the blog", three small text links (services,
    consulting, About, each with an `after:` tap layer) and a `TestRunTerminal`
    titled `route-check` ending on a FAIL line. The big number is `aria-hidden`
    and the terminal is decorative, so the real content is the heading, sentence
    and links. Metadata title "Page not found" (Next adds noindex on a 404).
    `error.tsx` is not restyled. Checked at 1440 and 390, no overflow. 2 new unit
    tests.
62. **Homepage and About OG cards (2026-10-23), task a-og.** The static
    `public/og-image.png` (and `siteConfig.ogImage`, `ogImageWidth`,
    `ogImageHeight`, and the `images` arrays in `layout.tsx`'s `openGraph` and
    `twitter`) are **gone**: the homepage card is now code-rendered like every
    other, `src/app/opengraph-image.tsx` and `twitter-image.tsx` (Next's file
    convention emits the tags, with an `alt`). Both cards live in
    `src/lib/brand-og-cards.tsx`: **home** is Dark Slate Grey with the hero's
    glows, the real H1 ("Embedded QA teams for startups that ship fast", "ship
    fast" in Sandy Brown; the mockup's "Ship fast. Skip the escaped bugs." was not
    used, same reason as the hero), a top-right label and a Green pill; **About**
    (the `about` family in `buildMarketingOgElement` now routes there, the old
    generic fallback and `FAMILY_STYLES` were deleted) is Paper with ink type, a
    Sandy Brown underline under "watching bugs ship" (a border under each word,
    Satori has no text-decoration on flex items), both founders' initials from
    `founders.ts` and "Chicago-based, remote-first, founder-led". **Gotcha:**
    Satori returned an empty reply (a crash, curl exit 52) when the helpers were
    React function components that return arrays; call them as plain functions
    (`{words(...)}`), as the blog cards do. Every family OG card now uses the new
    layout. The H1 and accent are passed in each `opengraph-image.tsx` and
    `twitter-image.tsx` (edit both). Rendered all four routes: 200 `image/png`, the
    Twitter image is byte-identical to the Open Graph one, and the homepage head now
    lists `/opengraph-image?hash` and `/twitter-image?hash`. 2 new unit tests.
63. **Favicon and app icons confirmed unchanged (2026-10-23), task a-favicon.**
    No code change. Checked the live head and the three assets against the
    redesign: `/favicon.ico` (200, 16 and 32 px RGBA PNG frames), `/icon` (200,
    32 px RGBA) and `/apple-icon` (200, 180 px RGBA) all render, the head carries
    the three `<link>` tags, and the mark is still the Sandy Brown dot with its
    Navajo halo on Dark Slate Grey, which is the same dot-and-halo as the new
    wordmark (Sandy dot, DSG ground in the footer, hero and OG cards). No new
    swatch or shape entered the redesign, so the set still fits. Viewed beside
    the wordmark at 180, 128, 32 and 16 px, the dot stays readable at 16.
64. **Sitemap, robots and redirects confirmed untouched (2026-10-23), task
    a-sitemap, ends Phase 8.** `git diff origin/main` on `src/app/sitemap.ts`,
    `src/app/robots.ts` and `next.config.ts` is empty, so routes, per-route
    `lastModified` dates, the robots rules, the security headers and the two dead
    URL redirects are byte-identical to `main`. Live check: the sitemap lists 62
    URLs and every one returns 200; `robots.txt` still allows all and points at the
    sitemap; `/software-testing-services/website-testing` and
    `/software-testing-services/qa-strategy-process` still 308 to the overview and
    to test-strategy-consulting, and trailing-slash URLs (`/about/`) still 308 to
    the plain URL. **Open decision, not changed:** the sitemap's hand-kept
    `lastModified` dates were not bumped for the redesign (gotcha #14 says to bump
    when content meaningfully changes, and the visuals and some copy did); do it
    in Phase 9 if wanted. The full SEO regression against `main` for every page
    type is still the Phase 9 task (method in gotcha #57).
65. **Lighthouse and layout-shift pass (2026-10-23), task z-lh, first doable task
    of Phase 9.** Built the branch and `origin/main` as production builds in two
    scratchpad worktrees (`cp -cR node_modules` clones it fast on APFS, then a
    normal Turbopack `npm run build`, `next start` on 3200 and 3300) and ran mobile
    Lighthouse on both, twice per page. **Absolute numbers from a local server are
    not comparable to the 2026-09-11 production baseline** (local `main` itself
    reads LCP 3.2s against 2.3s live, there is no CDN or compression), so the test
    is branch against `main` on the same machine. **Found and fixed three real
    shifts the redesign introduced** (`main` had CLS 0 on all of them):
    (1) `PageHero`'s text column and its zoom wrapper had no width limit, so while
    the fallback font showed, the `whitespace-nowrap` badge made them 16px wider
    than the padding and the heading reflowed when the real font arrived
    (CLS 0.12 on `/software-testing-services`, 0.05 on `/qa-consulting`); the
    column is now `w-full min-w-0`, the zoom wrapper `w-full`, the badge text
    `min-w-0`. (2) **The mono font was `preload: false`** and the breadcrumb row is
    mono, so on QA Consulting subpages the trail fit on one line in the real font
    and wrapped in the fallback, moving the whole page 20px when the font landed
    (CLS 0.19 on four subpages, never seen by Lighthouse because it only samples
    the overview pages). `JetBrains_Mono` is now preloaded (one latin file). (3) the
    footer's giant decorative wordmark was scored as low-contrast text on every
    page (it was already on `main`); it is now `before:content-[attr(data-text)]`
    on an empty `aria-hidden` `p`, so it is not text to a contrast checker. **How
    to find this kind of shift:** record `layout-shift` entries with `sources` in
    Playwright under CDP network (150ms, 200kbps) and CPU (4x) throttling and read
    `previousRect` against `currentRect`, a width change of 16px or a whole-page
    height step names the cause at once. **After the fixes, CLS is 0.0000 on all 14
    pages tried** (every PageHero family, the blog index and a post, About, home).
    **Mobile Lighthouse, branch against `main` (same machine):** performance 0.91
    to 0.94 against 0.92 to 0.93, accessibility 1.00 on blog, post, QA Consulting
    and Services against 0.94 to 0.96, best practices 1.00 and SEO 1.00, TBT 0 to
    10ms, **LCP about 0.3s slower on the branch under simulated throttling (3.5s
    against 3.2s)**, the one cost of the redesign, it is the same 3.5s on every
    page so it is probably the shared CSS and fonts, not a page. **Open:** the
    homepage still scores accessibility 0.96 from one `color-contrast` hit on the
    ticker tape (`#ffe0ad` on `#777b5d`); the real stack under it is `bg-ink`
    (13:1), so it reads as a false positive from the hero's overlapping layers, but
    it was not proven, so say if you want it chased.
66. **LCP gap closed (2026-10-23), follow-up to gotcha #65.** The redesign
    was 0.3s slower than `main` in mobile Lighthouse (LCP 3.5s against 3.2s, FCP
    1.2s against 0.9s) and about 240ms slower in a real throttled browser (150ms
    RTT, 1.6Mbps, 4x CPU, FCP 1032ms against 776ms; the hero paragraph is the LCP
    element on every page and is painted at FCP, so the gap is all render-blocking
    bytes). Measured with five-run medians (`lhmed`, a script that runs Lighthouse
    five times and takes the median) and a Playwright script reading paint
    entries. **Causes found and fixed:** (1) **two stylesheets instead of one.**
    `next/font/google` for JetBrains Mono made Turbopack split the font CSS into
    its own file (an extra render-blocking request, Lighthouse's estimate for
    render-blocking went from 153ms to 410ms), and the Google loader also emitted
    12 `@font-face` rules for every script although only latin ever downloads. The
    mono font is now self-hosted with `localFont` like Bespoke Serif, and the page
    is back to **one** CSS file. (2) **The mono font file was 31KB**, preloaded in
    parallel with the CSS. It is now a 12KB subset (`src/app/fonts/
JetBrainsMono-Latin-Variable.woff2`: basic Latin and Latin-1, weight axis cut
    to 400 to 500, no code ligatures, made with `fontTools` `subset` then
    `instancer`, in that order, instancing first crashes the subsetter on
    `.notdef`). The file the Google loader served had no check mark or arrow
    glyphs either, so nothing is lost. The font has no adjusted fallback
    (`adjustFontFallback: false`, there is no mono option), CLS was re-measured and
    is still 0.0000 on 14 pages at 412 and 360 wide. (3) **Three unused generated
    shadcn files** (`badge.tsx`, `card.tsx`, `navigation-menu.tsx`, nothing
    imported them since the chrome rebuild) were still scanned by Tailwind and
    added about 15KB of CSS (117KB to 102KB raw, 18.6KB to 17.1KB gzip); they are
    deleted, per the rule to remove unused primitives. **Result against `main`,
    same machine:** Lighthouse FCP 903ms equal, LCP 3205ms equal on the homepage
    (score 0.93 both), 3359ms against 3206ms on QA Consulting (0.92 against 0.93);
    real throttled FCP 948ms against 788ms, so about 160ms is left, from 4.7KB more
    gzipped CSS (a 70 percent larger utility layer is the redesign itself) and
    1.4KB more HTML, with a local server sharing bandwidth between the CSS and
    five other downloads, which is harsher than HTTP/2 priorities on Vercel.
    **Tried and rejected:** `experimental.inlineCss` (CSS is inlined into the HTML
    and again into the RSC payload, the compressed page went from 19KB to 82KB and
    LCP got worse, 3.6s); dropping the italic Bespoke preload (saves 28ms, risks a
    font swap in the hero `<em>`); dropping the mono preload (saves about 50ms but
    brings back the 0.19 breadcrumb shift of gotcha #65).
67. **Keyboard pass (2026-10-23), task z-keys.** Tabbed through 19 page types
    (every family page, a post, the 404) and checked each stop for a visible focus
    ring, zero size and hidden or inert ancestors, then drove every widget with the
    keyboard. **Clean:** every focus stop had a ring (the one that read faint was a
    mid-`transition-colors` read, it settles to Navajo White), the five tab groups
    (service explorer, framework and device pickers, compare switch, week picker)
    have a roving tabindex, arrows wrap, Home and End work and the panel shows, all
    the demo buttons (Run test, Close the gaps, Fix the failing test, Next finding,
    risk map, triage, known issues) respond to Enter and Space, the maturity check
    boxes toggle with Space and update the live advice, the FAQ opens with
    Enter and Space and ArrowDown moves between questions, the mega menu closes on
    Escape with focus back on its trigger, blog search keeps focus while typing.
    **Three real problems, fixed:** (1) **no skip link** (the floating header put 8
    stops before every page): `layout.tsx` now has a "Skip to content" link, first
    in the body, visible on focus (Navajo pill with an ink edge), targeting
    `<main id="main-content" tabIndex={-1}>`. `focus:not-sr-only` also sets
    `padding: 0`, so the padding is on `focus:px-5 focus:py-3`. (2) **The mobile
    drawer did not trap Tab**: after its last link focus went out to the skip link,
    header and breadcrumbs behind the full-screen sheet and back in, although Base
    UI's Dialog is modal. `MobileNav` now sets `inert` on every other child of
    `<body>` while open and removes it on close (checked after Escape and after a
    link navigation: none left, focus returns to the menu button). A couple of
    Tabs still land on Base UI's invisible focus guards at the end of the list,
    that is its own and is left. (3) **The contents pill was not keyboard
    reachable once open** (its list sits before the button in the DOM, so Tab from
    the button went to the next thing on the page): opening now focuses the current
    section link, Escape closes and returns focus to the pill, and a keyboard jump
    moves focus onto the target heading (`tabIndex -1`, `preventScroll`) instead of
    leaving it on a link that has collapsed (`e.detail === 0` tells a keyboard
    activation from a click). 3 new e2e tests in `e2e/keyboard.spec.ts`, the drawer
    one fails on the old code.
68. **Final contrast audit (2026-10-24), task z-contrast.** The token tests
    (`brand-contrast.test.ts`) only cover flat grounds, and axe could not score
    the 168 text nodes that sit over the aurora blobs ("background could not be
    determined because it is overlapped"), so the audit measures pixels. **Method
    (reusable):** for every sitemap page plus the 404, at 1280 and 390 wide, scroll
    in viewport slices with `behavior: "instant"` (the page has smooth scroll, a
    screenshot taken mid-scroll mismatches the rects), collect every visible text
    element's client rects and computed color (converted to RGBA through a 1px
    canvas, `oklab()` colors do not parse by hand) times its ancestors' opacity,
    then inject `color: transparent !important` and screenshot with the fixed and
    sticky elements hidden (the floating header covers the top 80px and was a false
    failure on every slice), draw the PNG on a canvas, and take the worst contrast
    between the text color (alpha-blended) and every sampled background pixel under
    each rect, 4.5 for normal text and 3 for 24px or larger (or 18.66px bold).
    Elements that fail only on the first slice of a mobile page or are `aria-hidden`
    are skipped. **Findings, desktop:** olive mono eyebrows on Dark Slate Grey
    dropped to 3.8 (2.8 on About) where a blob sat behind them, the home hero badge
    to 3.7, the Navajo White hero and About descriptions at 80 to 90 percent to 3.8,
    the CTA description at 85 percent ink on Palm Leaf to 4.2, large Sandy Brown
    accents on the blob to 2.8. **On a phone it was worse** (badge 2.5, "Explore
    services" 3.6, About eyebrow 3.4) because the same fixed-size blobs cover most of
    a 390px section. **Fixes:** blob alphas lowered (sandy 40 to 30, olive 35 to 28,
    leaf 40 to 32, navajo 25 to 18, and `max-sm:` 16, 14, 18, 10), dark section
    eyebrows (`SectionIntro dark`, home Services, About founders) olive to Navajo
    White, descriptions on dark and on the CTA to full opacity, the three hero badges
    on `bg-ink/30` instead of `bg-navajo/10`, the blog hero's aurora at 75 percent,
    the 404's links to full Navajo White. **After:** no real failure on any page at
    either width. What still prints in the scan is artifact: the sr-only skip link,
    the disabled "Merge blocked" button (inactive controls are exempt), and a few
    mobile slices that mismatch their screenshot. **Guard:** `brand-contrast.test.ts`
    now reads the blob alphas out of `aurora-background.tsx` and asserts Navajo
    White stays at 4.5:1 over each blob alone, desktop and phone alpha. Overlaps of
    two blobs and large Sandy Brown accents are only covered by rerunning the scan.
    Olive text on a blob cannot be made to pass (olive on Dark Slate Grey is 5.4 and
    any sandy blob under it drops it), so olive stays for text on flat deep grounds
    only. **Not checked by this scan:** hover and open states (the pairings are
    token-covered), text inside the OG images, and dark mode (there is none).

## Repository structure

```
src/app/                  Routes (App Router). Keep page files thin,
                          compose components, don't inline large JSX trees.
  layout.tsx              Root layout: self-hosted fonts (Bespoke Serif plus
                          JetBrains Mono for labels, gotcha #32), metadata (including
                          the homepage's own `alternates.canonical`, added
                          2026-08-16, gotcha #14), JSON-LD structured data
                          (the sitewide `ProfessionalService` block includes
                          a `founder` array built from `src/lib/founders.ts`,
                          added 2026-09-11, gotcha #28), header/footer shell
  fonts/                  Bespoke Serif woff2 files, loaded via
                          `next/font/local` in layout.tsx. Also two static
                          TTF instances (`BespokeSerif-OG-Regular.ttf`,
                          `BespokeSerif-OG-SemiBold.ttf`, added 2026-09-10,
                          gotcha #21) extracted from the woff2 via
                          `fontTools`, used only by the blog OG image
                          routes below since `next/og`'s Satori renderer
                          can't parse woff2 at all
  favicon.ico             On-brand icon (regenerated 2026-08-16, see
                          gotcha #14), not the pre-rebrand black/white
                          triangle it replaced
  icon.tsx, apple-icon.tsx  Code-generated app icons via `next/og`
                          `ImageResponse` (added 2026-08-16, gotcha #14),
                          Next's native icon convention, not static image
                          files
  page.tsx                Home. Sections: Hero, StatBand, services grid
                          (#services anchor, 6 cards), differentiators, QA
                          consulting (#qa-consulting anchor), process
                          steps, CtaSection.
  software-testing-services/
    page.tsx              Services overview, added 2026-08-04. Own `<h1>`
                           (via PageHero), metadata, and page-scoped
                           FAQPage and BreadcrumbList JSON-LD blocks
                           (gotcha #12, separate from the sitewide
                           ProfessionalService block in layout.tsx).
                           Reuses PageHero/ServiceCard/CtaSection/Reveal/
                           FaqAccordion rather than inventing new section
                           components, the template every subpage below
                           follows.
    manual-testing/page.tsx           Same template, all added 2026-08-04
    playwright-automation/page.tsx    with real content pulled from the
    selenium-testing/page.tsx         equivalent production page and
    api-data-testing/page.tsx         rewritten to this project's voice
    regression-testing/page.tsx       and SEO rules, each with its own
    mobile-app-testing/page.tsx       FAQPage and BreadcrumbList JSON-LD
                                       blocks, plus a RelatedLinks
                                       cross-link section (gotchas #11-12)
                                       Every page in this family, overview
                                       included, also has its own
                                       opengraph-image.tsx/twitter-image.tsx
                                       pair (added 2026-09-10, gotcha #25),
                                       Palm Leaf background with dark text.
  qa-consulting/
    page.tsx              QA consulting overview, added 2026-08-05. Own
                           FAQPage and BreadcrumbList JSON-LD blocks
                           (gotcha #12). Deliberately different "family"
                           from software-testing-services (see gotcha #7):
                           Muted Olive bold band via PhaseTimeline, subtle
                           ServiceCard, CompareColumns, plus a StatBand
                           and a dark inverted checklist section that are
                           unique to this one page, not repeated on its
                           subpages.
    embedded-qa-team/page.tsx         Same QA Consulting family template,
    test-strategy-consulting/page.tsx all added 2026-08-05 with content
    qa-process-design/page.tsx        pulled from the equivalent prod
    cicd-quality-gates/page.tsx       page and rewritten to this
    qa-audit-assessment/page.tsx      project's voice, each with its own
    release-readiness/page.tsx        FAQPage and BreadcrumbList JSON-LD
                                       blocks, plus a RelatedLinks
                                       cross-link section (gotchas #11-12)
                                       Every page in this family also has
                                       its own opengraph-image.tsx/
                                       twitter-image.tsx pair (gotcha #25),
                                       Muted Olive background, dark text.
  about/
    page.tsx              Added 2026-08-05, explicitly asked to look
                           "super different" from every other page while
                           still on-brand, and to emphasize the founders
                           (see gotcha #7). Zero icons, founder profile
                           cards (colored-initial avatars, on a Dark
                           Slate Grey bold section), an italic pull-quote,
                           and a typographic manifesto list instead of a
                           card grid. Founder data (name/jobTitle/bio/
                           initials/avatarClassName/linkedin) is imported
                           from `src/lib/founders.ts`, not declared locally
                           (moved 2026-09-11, gotcha #28), and each card
                           carries a real `id={founder.slug}` anchor. Carries
                           a 2-item BreadcrumbList plus, as of 2026-09-11, a
                           `@graph` array of `Person` JSON-LD for both
                           founders (gotcha #28), no FAQPage JSON-LD. Also
                           has its own opengraph-image.tsx/twitter-image.tsx
                           pair (gotcha #25), Dark Slate Grey background.
  blog/
    page.tsx               Blog index, added 2026-08-05. Its own BlogHero
                            (not PageHero, see gotcha #5), category filter
                            pills, a 9-per-page grid (`POSTS_PER_PAGE` in
                            `blog-data.ts`, three rows of three at the `lg`
                            breakpoint), and pagination, all
                            driven by `?category=`/`?page=` searchParams,
                            no client state (see gotcha #9). The
                            unfiltered "all categories" view runs posts
                            through `interleaveByCategory()` before
                            paginating (gotcha #19), so no two adjacent
                            cards share a category; a filtered view skips
                            it since it is already single-category. A
                            category-filtered view (2026-09-11, gotcha #29)
                            self-canonicalizes to its own `/blog?category=
slug` URL with a real, unique title/description drawn from that
                            category's own `BlogCategory.description`, and
                            renders a matching on-page intro (`h2` + `p`)
                            above the filter pills, not just a different
                            meta tag. Page-scoped Blog and BreadcrumbList
                            (2-item) JSON-LD blocks (gotcha #12). Also has
                            its own opengraph-image.tsx/twitter-image.tsx
                            pair (gotcha #25, Dark Slate Grey background),
                            separate from each individual post's own pair
                            below.
    [slug]/page.tsx         Post template, `generateStaticParams` over all
                            slugs in blog-data.ts (12 posts at launch, 25
                            as of 2026-08-23, 35 as of 2026-08-31, 40 as
                            of 2026-09-04, 45 as of 2026-09-15, see
                            gotchas #16, #19, and #31),
                            `notFound()` on an unknown slug. Uses
                            BlogPostHeader, not BlogHero/PageHero (gotcha
                            #9), plus ArticleBody, BlogRelatedPosts (same
                            category, up to 3), and page-scoped
                            BlogPosting and BreadcrumbList (3-item)
                            JSON-LD blocks per post, the one place
                            breadcrumbSchema is built inside the
                            component body rather than at module level
                            (gotcha #12). When a post has `faqs` (gotcha
                            #9), also renders an FaqAccordion section and
                            a page-scoped FAQPage JSON-LD block, built
                            from `stripInlineLinks(answer)` so the
                            structured data carries plain text, not the
                            `[label](/path)` link syntax (gotcha #17).
                            `BlogPosting`'s `image` field (added
                            2026-09-10) points at
                            `/blog/[slug]/opengraph-image` below.
    [slug]/opengraph-image.tsx,
    [slug]/twitter-image.tsx  Added 2026-09-10 (gotcha #21), Next's native
                            per-route image convention, `generateStaticParams`
                            over the same slugs so all 40 posts x 2 image
                            routes prerender at build time. Both files
                            share their actual rendering via
                            `buildBlogOgElement()`/`loadBlogOgFonts()` in
                            `src/lib/blog-og-image.tsx`, a real title and
                            category-colored eyebrow per post rather than
                            the one shared sitewide `og-image.png`.
  sitemap.ts, robots.ts   Generated SEO files, list every route, keep in
                          sync by hand when a route is added or removed.
                          Static routes carry a hand-maintained
                          `lastModified` date (see gotcha #14), bump a
                          route's date when its content meaningfully
                          changes, blog posts already do this via their
                          own `date` field

next.config.ts            `redirects()` for dead URLs from the pre-rebuild
                           Eleventy site that Google still crawls (see
                           gotcha #10), add a new entry here rather than
                           letting an old, still-indexed URL 404. Also
                           `headers()` (added 2026-09-10, gotcha #24):
                           sitewide CSP and the other four security
                           response headers, update the CSP here if a
                           third-party script is ever added

src/components/
  ui/                     shadcn/ui primitives, generated, don't hand-edit.
                          Add more via `npx shadcn@latest add <component>`.
                          Only add a primitive when a page actually uses it.
                          accordion.tsx is Base UI's, its Header part
                          renders an `<h3>` around the trigger button by
                          default, don't add a separate heading yourself.
                          (badge, card and navigation-menu were removed 2026-10-23, gotcha #66,
                          nothing imported them.)
  brand/                  Live Build primitives (added 2026-10-18, gotcha
                           #32), outside ui/ because ui/ is shadcn-generated:
                           cta-variants.ts (`ctaVariants`, pill buttons with
                           a press-down edge), status-pill.tsx (`StatusPill`),
                           sticker-card.tsx (`StickerCard`)
  layout/                 Site chrome (rebuilt 2026-10-18, gotcha #33): header
                           (site-header.tsx is the zero-height floating
                           shell and computes the blog menu data on the
                           server, header-bar.tsx is the client pill with
                           the Base UI mega menus, shown from `md` up;
                           mobile-nav.tsx is the full-screen Sheet drawer
                           below `md`, see gotchas #8 and #33), footer
                           (back-to-top.tsx is its one client leaf; site-footer.tsx renders
                           link columns for every navItems entry that
                           carries subpages, plus a Company column for
                           About/Blog/Book a call, built from siteConfig.nav
                           rather than a separate hardcoded list; redesigned
                           2026-08-16 onto the same hardcoded Dark Slate
                           Grey (`#354639`) bold-section treatment the hero
                           and About's founders section use, since the
                           footer sitting on the plain `bg-background` with
                           only a thin `border-t` made it blend into every
                           page rather than read as a closing anchor;
                           tightened vertical spacing at the same time,
                           `py-12`/`gap-10`/`mt-10` down to `py-10`/`gap-8`/
                           `mt-8`), logo (accepts a `variant="onDark"` prop,
                           added alongside the footer redesign, for use
                           inside any bold dark section, swaps `text-
                           foreground`/`bg-primary` for hardcoded cream/
                           Sandy Brown since those tokens invert oddly
                           against a hardcoded dark background in dark
                           mode, see gotcha #7's hardcoded-hex-inside-a-
                           bold-section rule)
  marketing/              Reusable marketing sections (hero, CTA, stat
                           band, service cards, page-hero.tsx for a
                           secondary page's on-brand dark/aurora header),
                           breadcrumbs.tsx (added 2026-09-10, gotcha #12,
                           the visible counterpart to buildBreadcrumbSchema,
                           reused across every non-home page),
                           aurora-background.tsx (the shared ambient
                           background layer both heroes use), the shared
                           scroll-animation helpers: reveal.tsx
                           (scroll-triggered fade-up, replays every
                           re-entry, takes an optional `id` passthrough
                           added 2026-09-11 for real anchor targets like
                           the About page's founder cards, gotcha #28),
                           count-up.tsx (the stat
                           band's number that eases up from 0 when it enters
                           and replays, gotcha #34), hero-scroll-shrink.tsx
                           (scroll-position-linked shrink/grow, homepage
                           hero only), page-hero-scroll-zoom.tsx (the same
                           technique applied to every PageHero consumer,
                           zooming the heading/description in and fading
                           them out on the way past, reversing on the way
                           back up, see gotcha #5), faq-accordion.tsx
                           (closed by default, click to open, each row
                           enters via Reveal, see gotcha #6), and the QA
                           Consulting family's two signature composition
                           components (see gotcha #7): compare-columns.tsx
                           and phase-timeline.tsx, both built on Reveal,
                           not a new animation pattern; and the Blog
                           family's own components (see gotchas #5, #7,
                           #9): blog-hero.tsx + blog-hero-scroll.tsx (the
                           blog index's own scroll-linked hero, not
                           PageHero), blog-post-card.tsx, blog-filter-
                           pills.tsx and blog-pagination.tsx (both plain
                           Links driven by searchParams, no client state),
                           blog-post-header.tsx (the calm per-post reading
                           header, plus a one-line author bio under the
                           byline, gotcha #18), article-body.tsx (renders
                           a post's BlogContentBlock[]), and
                           blog-related-posts.tsx; inline-links.tsx (added
                           2026-08-24, gotcha #17), the `[label](/path)`
                           parser shared by article-body.tsx and
                           faq-accordion.tsx, so a link written into a
                           blog post's body or FAQ answer renders
                           identically in either, plus a plain-text
                           `stripInlineLinks()` counterpart for anywhere
                           that needs a real string instead of JSX, such
                           as FAQPage JSON-LD's `text` field; and
                           related-links.tsx, the Services/QA Consulting
                           cross-link block (see gotcha #11), built on
                           Reveal like everything else here, not a new
                           animation pattern

                           Live Build additions (2026-10-18, gotcha #34):
                           emphasis.tsx (`renderWithEmphasis`, turns
                           `*word*` in a string prop into an italic `<em>`),
                           test-run-terminal.tsx (`TestRunTerminal`, looping
                           fake log) and run-matrix.tsx (`RunMatrix`, sweeping
                           test grid), both decorative widgets. PageHero,
                           CtaSection, StatBand, FaqAccordion, ServiceCard,
                           RelatedLinks, PhaseTimeline and CompareColumns
                           were restyled in place, see gotcha #34

src/lib/
  site-config.ts          Single source of truth for site name, tagline,
                           meta description, on-page description, footer
                           copy, `founders` (a plain string, "Muhammad and
                           Mohammad", used only in homepage prose, not to
                           be confused with the structured founder identity
                           data in `founders.ts` below), location, links
                           (email, booking calendar), and `navItems` (typed
                           as `NavItem[]`,
                           each entry optionally carrying a nested `items`
                           array that renders as a header dropdown (desktop)
                           or an accordion group (mobile drawer), and an
                           `overviewLabel` for that group's link back to
                           its own overview page, see gotcha #8,
                           site-header.tsx, and mobile-nav.tsx), add a new
                           page's header link there, don't hardcode it in
                           site-header.tsx or mobile-nav.tsx
  blog-data.ts            All blog content and category data (see gotcha
                           #9): `blogCategories` (5, each mapped to a
                           chart-N token via `colorClass`/`borderClass`/
                           `tintClass`, plus a real `description` field
                           added 2026-09-11, gotcha #29, powering the
                           category-filtered blog view's own metadata and
                           on-page intro), `blogPosts` (45 as of 2026-09-15,
                           an even 9 per category, each a
                           title/excerpt/category/author/date/readTime/
                           icon plus a `BlogContentBlock[]` body and an
                           optional `faqs?: BlogFaq[]`),
                           `interleaveByCategory()` (added 2026-08-31,
                           gotcha #19, round-robins the unfiltered blog
                           index so same-category posts never sit
                           adjacent), `authorBios`
                           (added 2026-08-24, a one-line credential per
                           author name rendered under the byline, sourced
                           from the same real founder facts now centralized
                           in `founders.ts` below, kept as its own shorter
                           one-liner rather than reused verbatim since the
                           byline needs a single line, not a full bio), and
                           the filter/pagination helpers
                           `getPostsByCategory`, `getRelatedPosts`,
                           `clampPage`, `paginatePosts`. Add a new post
                           here, not by hand-editing a page, and follow
                           the full process in gotcha #18 (research,
                           outline, gotcha #15's content structure, 5-8
                           in-content links per gotcha #17, an FAQ section
                           when it earns one, an EEAT self-review, then
                           title/meta options) rather than free-writing
                           it.
  founders.ts             Added 2026-09-11 (gotcha #28). Single source of
                           truth for founder identity: `Founder` (slug,
                           name, jobTitle, bio, initials, avatarClassName,
                           linkedin), `buildFounderPersonSchema()`, and
                           `getFounderByName()`. Consumed by the About
                           page's profile cards and `Person` JSON-LD, the
                           sitewide `Organization` schema's `founder` array
                           in `layout.tsx`, and every `BlogPosting`'s
                           `author` field in `blog/[slug]/page.tsx`.
  blog-og-image.tsx       Added 2026-09-10 (gotcha #21). Shared rendering
                           for the blog's per-post OG/Twitter images:
                           `buildBlogOgElement()` (the JSX, restyled
                           2026-10-23, gotcha #58: the category's swatch
                           as ground via a hex map since Satori can't
                           resolve CSS custom properties, the post title,
                           its own icon, author and read time) and
                           `loadBlogOgFonts()`
                           (reads the two static TTFs from `src/app/fonts/`).
                           Consumed by both `blog/[slug]/opengraph-image.tsx`
                           and `twitter-image.tsx`, not duplicated between
                           them.
  marketing-og-image.tsx  Added 2026-09-10 (gotcha #25), the non-blog
                           sibling of blog-og-image.tsx above. Same
                           next/og + static-TTF-font technique, but
                           `buildMarketingOgElement(title, family)` picks
                           light-background-dark-text or dark-background-
                           light-text per family (Software Testing
                           Services/QA Consulting are light, About/blog
                           index are dark), and title is passed in per
                           call site rather than read from shared data,
                           since these pages have no equivalent of
                           blog's `post.title`.
  related-pages.ts        `getRelatedLinkGroups()` and the curated
                           `crossFamilyPairs` map behind the RelatedLinks
                           cross-link block (see gotcha #11). Add a pairing
                           here when a subpage's genuine cross-family
                           counterpart isn't obvious from nav structure.
  breadcrumbs.ts          `buildBreadcrumbSchema()`, the shared
                           BreadcrumbList JSON-LD builder every non-home
                           page calls (see gotcha #12). Data-shaping only,
                           each page still renders its own <script> tag.
  utils.ts                `cn()` class-merging helper

e2e/                      Playwright specs: home.spec.ts (8 tests),
                          navigation.spec.ts (15, added 2026-10-18),
                          keyboard.spec.ts (3, added 2026-10-23) and
                          blog-post.spec.ts (2) and blog-index.spec.ts (2),
                          both added 2026-10-23
src/**/*.test.ts(x)       Vitest unit/component tests, colocated with source
                          (229 across 45 files as of 2026-10-24)
vitest.setup.ts           jest-dom matchers plus IntersectionObserver and
                          matchMedia stubs for jsdom (gotcha #32)

public/                   Static assets served as-is. Empty of images now: the
                           homepage OG card is `src/app/opengraph-image.tsx`
                           (gotcha #62), and favicon.ico and the icon/apple-icon
                           generators live in src/app/ (gotcha #14).
```

## Coding standards

- **Server Components by default.** Only add `"use client"` when a
  component needs state, effects, or browser APIs. Keep client components
  small and push them as far down the tree as possible.
- **No new abstractions until there are ≥3 real call sites.** Three similar
  lines of JSX beat a premature `<Section>` wrapper component.
- **Path alias**: import app code via `@/*` (maps to `src/*`), never deep
  relative paths.
- **Metadata**: every route should export a `metadata` object. `metadataBase`
  is already set globally in the root layout, so relative OG image paths
  work everywhere.
- **Don't hand-edit `src/components/ui/*`.** Those are generated by the
  shadcn CLI. If you need to customize one, prefer composing it from
  outside; if you truly must change the primitive, re-run the CLI with
  `--overwrite` after upstream updates rather than letting local edits
  drift silently. Remove a primitive from `src/components/ui/` if nothing
  imports it anymore, don't let unused generated components accumulate.
- Formatting is enforced by Prettier (`prettier-plugin-tailwindcss` sorts
  class lists, don't manually reorder Tailwind classes, let it run).
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
  (enforced by commitlint on every commit): `feat:`, `fix:`, `chore:`,
  `docs:`, `test:`, `refactor:`, etc.
- **Keep dependencies matched to what's actually used.** Before adding a
  package, check it's genuinely needed; before deleting a feature, remove
  its now-unused dependencies from `package.json` in the same change, don't
  leave orphaned packages around "in case."
- **Bold section treatments (hero-style hardcoded palette colors, full
  section backgrounds, continuous ambient animation) are a deliberate,
  standing pattern**, not a one-off exception. See
  [BRAND_GUIDELINES.md §4 and §9](./BRAND_GUIDELINES.md#4-color) for when
  and how to use it. Technically: hardcoded hex (`bg-[#354639]`) is fine
  inside a bold section only, custom animation keyframes live in
  `src/app/globals.css` with a matching `prefers-reduced-motion` override,
  and no animation library should be added, pure CSS keyframes plus
  Tailwind's arbitrary `animate-[...]` syntax keep the component a Server
  Component. This is separate from scroll-triggered reveal animation
  (see gotcha #5 above), which is a site-wide pattern used in calm
  sections too, not confined to bold treatments.

## SEO

This site's main growth lever is organic search, so SEO is a first-class
concern, not an afterthought bolted on at the end. SEO here is driven by
semantic HTML, metadata, structured data, and real on-page content, not by
CSS. CSS only matters for the performance side of SEO (avoiding layout
shift, keeping the bundle lean), which Turbopack and the defaults in this
repo already handle well.

- **One `<h1>` per page, then a clean heading outline.** The hero owns the
  only `h1`. Section headings are `h2`. Card and list-item titles inside a
  section (service cards, process steps, differentiator points) are `h3`.
  Never skip a level, and never use a heading tag purely for its font size,
  use Tailwind classes for that instead.
- **Every card-style component that shows a title needs a real heading
  element**, not a styled `<div>`. `ServiceCard` renders its title as an
  `<h3>` directly rather than through the generated `CardTitle` primitive
  (which is a plain `div`) for exactly this reason. If you add a new
  card-style component with a title, do the same instead of reaching for
  `CardTitle`.
- **`siteConfig.metaDescription` is the short, keyword-led copy** used in
  `<meta name="description">` and social previews. Keep it near 150 to 160
  characters so it doesn't get truncated in search results.
  `siteConfig.description` is the longer on-page hero paragraph. Keep these
  two separate, don't reuse the long one as the meta description.
- **Structured data lives in `src/app/layout.tsx`** as a `ProfessionalService`
  JSON-LD block. If the list of services in `page.tsx` changes, update the
  `makesOffer` array in that structured data to match, they should never
  drift apart. When a service or page is dropped rather than added, the
  same rule cuts the other way: remove it from `makesOffer` and check the
  other places a phantom reference can hide (gotcha #22), don't assume
  the schema is the only place it was ever written down. The block also
  carries `logo` and `sameAs` (added 2026-09-10, real profile URLs only,
  see `siteConfig.sameAs`), and every `BlogPosting` block carries
  `publisher.logo` and `dateModified` (same date, since there is no
  separate last-edited field to distinguish it from `datePublished`).
- **Author and founder identity uses real `Person` schema, not a bare
  name string.** Added 2026-09-11 (gotcha #28). `src/lib/founders.ts` is
  the single source of truth (`buildFounderPersonSchema()`), consumed by
  the sitewide `ProfessionalService` block's `founder` array, the About
  page's own `Person` JSON-LD, and every `BlogPosting`'s `author` field.
  A `Person` with just a `name` proves nothing for E-E-A-T, one with a
  real `jobTitle`, `url` (an anchor on `/about`), and `sameAs` (a real,
  individually-owned profile, never fabricated) does. A new author needs
  an entry in `founders.ts`, not a hand-written `Person` object inline.
- **Any page whose content depends on `searchParams` (pagination,
  category filters, anything else query-driven) needs `generateMetadata`,
  not a static `metadata` export**, so its canonical and title can
  actually vary with the query string instead of silently describing
  only the unfiltered, page-1 view. See gotcha #23 for the concrete
  pattern (`blog/page.tsx`), and gotcha #29 for how each dimension
  (page number, category) earns its own self-referencing canonical once
  it has real, unique metadata behind it, a canonical alone doesn't
  justify indexing a thin duplicate.
- **Every non-home page also carries `BreadcrumbList` JSON-LD** via
  `buildBreadcrumbSchema()` (see gotcha #12), additive to, not a
  replacement for, the sitewide `ProfessionalService` block and any
  page-scoped `FAQPage`/`BlogPosting`/`Blog` block already on that page.
- **Services and QA Consulting subpages cross-link to their siblings and
  to one paired subpage in the other family** via the `RelatedLinks`
  block (see gotcha #11). Don't remove it as "redundant" with the header
  dropdown or footer, a contextual in-content link with real anchor text
  is a different, more valuable SEO signal than the same URL repeated in
  nav or footer chrome.
- **Don't add a meta keywords tag.** Search engines stopped using it years
  ago. Put effort into real headings and body copy instead, that's what
  actually gets indexed and ranked.
- **Internal anchor links (`#services`, `#qa-consulting`) must point at a
  section whose visible heading matches the link text.** Anchors are for
  real in-page sections, not decoration.
- **Every route exports a `metadata` object** (see Coding standards above).
  This is as much an SEO requirement as a code convention: a page with no
  title or description does not get indexed well.
- Keep `sitemap.ts` and `robots.ts` in sync with the actual route list.
  62 marketing routes today (`/`, `/software-testing-services` and its
  six subpages, `/qa-consulting` and its six subpages, `/about`, `/blog`
  and its 45 `/blog/[slug]` posts, see the repository structure above), a
  new page needs an entry in `sitemap.ts` too. Don't trust this number
  blindly, check `src/app/`, `blog-data.ts`, and `sitemap.ts` directly
  since another page or post has likely been added since this was
  written.
- See [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md) for voice, tone, and
  keyword usage rules for the actual copy. Technical SEO structure lives
  here, writing style lives there.

## Commands

| Command                 | What it does                                        |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Next.js dev server                                  |
| `npm run build`         | Production build                                    |
| `npm run start`         | Serve the production build                          |
| `npm run lint`          | ESLint                                              |
| `npm run format`        | Prettier, write mode                                |
| `npm run format:check`  | Prettier, check mode (used in CI)                   |
| `npm run typecheck`     | `tsc --noEmit`                                      |
| `npm run test`          | Vitest, single run                                  |
| `npm run test:watch`    | Vitest, watch mode                                  |
| `npm run test:coverage` | Vitest with coverage report                         |
| `npm run test:e2e`      | Playwright (requires `npx playwright install` once) |

CI (`.github/workflows/ci.yml`) runs lint, format check, typecheck, unit
tests, and a production build on every push/PR to `main`, followed by a
separate Playwright job.

**Dev server gotcha**: Next.js 16 allows only one `next dev`/`next build`
instance per project (`.next/dev/lock`). If a previous session's dev
server was left running in the background, your own `npm run dev` can
fail or hang. If that happens, find and kill stale `next dev`/`node`
processes for this project and remove `.next/dev/lock` before retrying.

## Environment variables

See `.env.example` for the full list. Currently just
`NEXT_PUBLIC_SITE_URL`, which overrides the canonical site URL used in
metadata, the sitemap, and OG tags (defaults to the production URL).
