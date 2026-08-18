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

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19.2)
- **Language**: TypeScript, `strict` + extra strictness flags on (see
  `tsconfig.json`)
- **Styling**: Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`,
  tokens live in `src/app/globals.css`)
- **Components**: shadcn/ui (`base-nova` style) on top of **Base UI**
  (`@base-ui/react`), not Radix. See the Base UI gotcha below before you use
  `asChild` out of habit.
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
   homepage hero's fixed `min-h-[85vh]`. CTAs live outside the zoom
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
   declare one itself.
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
     theme tokens (previously unused) mapped one-to-one onto the five
     post categories for a small color-coded dot on filter pills, post
     cards, and post headers. See gotcha #9 for the rest of the blog's
     own patterns (content model, URL-driven filters/pagination, why
     individual posts don't reuse a bold hero at all).

   When adding a new page to an existing family, match that family's
   devices. When starting a new family (or reworking one, like the
   founders section's background did mid-session), pick a bold color (or
   deliberately reuse Dark Slate Grey, as About does) and a set of
   composition devices that aren't already another family's signature,
   and check contrast on any new pairing rather than assuming a swatch
   that worked elsewhere works here too (see BRAND_GUIDELINES.md §4).

8. **The header nav has no mobile hamburger/drawer, it's hand-squeezed to
   fit every top-level entry at once, and that squeeze is at its
   practical limit now.** `site-header.tsx` shrinks the logo, nav item
   padding/font-size, and the "Book a call" button size below the `sm`
   breakpoint to fit four top-level entries (`Services`, `QA Consulting`,
   `About`, `Blog`) without wrapping or overflowing down to a 320px
   viewport. `NavItem` (in `site-config.ts`) has two escape hatches for
   this: `overviewLabel` (custom text for the dropdown's link back to its
   own overview page, defaults to `"All {label}"`) and `shortLabel` (an
   abbreviated label shown only below `sm`, e.g. `"QA"` for
   `"QA Consulting"`, defaults to the full `label`). Adding `Blog` as a
   fourth entry overflowed at 360px (confirmed via a Playwright
   `document.documentElement.scrollWidth` check, not eyeballing a desktop
   viewport) even with `shortLabel` already in place, so closing the gap
   took more than that one lever: nav item horizontal padding dropped to
   `px-0` below `sm` (spacing now comes from a `gap-1.5` on the `<nav>`
   itself instead), the logo's gap/text size shrank further, and the
   "Book a call" button swaps to a `CalendarClock` icon with `sr-only`
   text below `sm` instead of shrinking the label text, since the label
   was already as short as it could usefully get. If a fifth top-level
   entry is ever added and none of these levers close the gap, that's the
   actual signal to build a real mobile drawer/hamburger menu, not
   another round of shrinking padding.
9. **The blog (`src/app/blog/`) has no MDX and no client-side filter
   state, both deliberate.** MDX was tried and removed earlier in this
   project (see the memory record if curious), so post bodies are plain
   data in `src/lib/blog-data.ts`: a `BlogContentBlock` union (paragraph/
   heading/subheading/list) rendered by the dumb `ArticleBody` mapper,
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
   hero repeated on all 12 posts would fight against actually reading
   them, so posts get a calm, light, `max-w-3xl` reading-width header
   instead (icon tile, category badge, `h1`, author/date/read-time line).
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
    deep ones.** `src/lib/breadcrumbs.ts`'s `buildBreadcrumbSchema()`
    takes an ordered `{ name, href }[]` and returns a schema.org
    `BreadcrumbList` (absolute URLs via `siteConfig.url`, "Home" first).
    Every route except `/` renders one via its own inline `<script>`, the
    same per-page pattern already used for `FAQPage`/`BlogPosting`/`Blog`
    JSON-LD (see gotcha #6 and the SEO section below), not a shared
    rendering component, `buildBreadcrumbSchema` only builds the data.
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
13. **`public/og-image.png` is generated, not designed in an external
    tool.** It's a screenshot of real HTML/CSS styled to match the
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
      characters total, not just the bare title on its own.
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

## Repository structure

```
src/app/                  Routes (App Router). Keep page files thin,
                          compose components, don't inline large JSX trees.
  layout.tsx              Root layout: self-hosted font, metadata (including
                          the homepage's own `alternates.canonical`, added
                          2026-08-16, gotcha #14), JSON-LD structured data,
                          header/footer shell
  fonts/                  Bespoke Serif woff2 files, loaded via
                          `next/font/local` in layout.tsx
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
  about/
    page.tsx              Added 2026-08-05, explicitly asked to look
                           "super different" from every other page while
                           still on-brand, and to emphasize the founders
                           (see gotcha #7). Zero icons, founder profile
                           cards (colored-initial avatars, on a Dark
                           Slate Grey bold section), an italic pull-quote,
                           and a typographic manifesto list instead of a
                           card grid. No FAQ section, no FAQPage JSON-LD,
                           but does carry a 2-item BreadcrumbList (gotcha
                           #12), the only structured data it emits.
  blog/
    page.tsx               Blog index, added 2026-08-05. Its own BlogHero
                            (not PageHero, see gotcha #5), category filter
                            pills, a 9-per-page grid (`POSTS_PER_PAGE` in
                            `blog-data.ts`, three rows of three at the `lg`
                            breakpoint), and pagination, all
                            driven by `?category=`/`?page=` searchParams,
                            no client state (see gotcha #9). Page-scoped
                            Blog and BreadcrumbList (2-item) JSON-LD
                            blocks (gotcha #12).
    [slug]/page.tsx         Post template, `generateStaticParams` over all
                            slugs in blog-data.ts (12 posts at launch),
                            `notFound()` on an unknown slug. Uses
                            BlogPostHeader, not BlogHero/PageHero (gotcha
                            #9), plus ArticleBody, BlogRelatedPosts (same
                            category, up to 3), and page-scoped
                            BlogPosting and BreadcrumbList (3-item)
                            JSON-LD blocks per post, the one place
                            breadcrumbSchema is built inside the
                            component body rather than at module level
                            (gotcha #12).
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
                           letting an old, still-indexed URL 404

src/components/
  ui/                     shadcn/ui primitives, generated, don't hand-edit.
                          Add more via `npx shadcn@latest add <component>`.
                          Only add a primitive when a page actually uses it.
                          accordion.tsx is Base UI's, its Header part
                          renders an `<h3>` around the trigger button by
                          default, don't add a separate heading yourself.
                          navigation-menu.tsx is Base UI's too, used for
                          the header's Services dropdown, its Link part
                          takes a `render` prop the same as other Base UI
                          polymorphic components, safe to point at
                          `next/link` directly (see gotcha #2, that only
                          warns about Button, not Link-to-Link).
  layout/                 Site chrome: header (site-header.tsx renders a
                           dropdown via NavigationMenu for any navItems
                           entry with nested items, a plain Link
                           otherwise, and hand-squeezes both for mobile,
                           see gotcha #8), footer (site-footer.tsx renders
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
                           aurora-background.tsx (the shared ambient
                           background layer both heroes use), the shared
                           scroll-animation helpers: reveal.tsx
                           (scroll-triggered fade-up, replays every
                           re-entry), animated-stat-value.tsx (count-up
                           numbers, also replays), hero-scroll-shrink.tsx
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
                           header), article-body.tsx (renders a post's
                           BlogContentBlock[]), and blog-related-posts.tsx;
                           and related-links.tsx, the Services/QA
                           Consulting cross-link block (see gotcha #11),
                           built on Reveal like everything else here, not
                           a new animation pattern

src/lib/
  site-config.ts          Single source of truth for site name, tagline,
                           meta description, on-page description, footer
                           copy, founders, location, links (email, booking
                           calendar), and `navItems` (typed as `NavItem[]`,
                           each entry optionally carrying a nested `items`
                           array that renders as a header dropdown, an
                           `overviewLabel` for that dropdown's link back
                           to its own overview page, and a `shortLabel`
                           shown below the `sm` breakpoint when the full
                           label doesn't fit, see gotcha #8 and
                           site-header.tsx), add a new page's header link
                           there, don't hardcode it in site-header.tsx
  blog-data.ts            All blog content and category data (see gotcha
                           #9): `blogCategories` (5, each mapped to a
                           chart-N theme token), `blogPosts` (12, each a
                           title/excerpt/category/author/date/readTime/
                           icon plus a `BlogContentBlock[]` body), and the
                           filter/pagination helpers `getPostsByCategory`,
                           `getRelatedPosts`, `clampPage`, `paginatePosts`.
                           Add a new post here, not by hand-editing a page,
                           and follow the SEO content structure in gotcha
                           #15 (direct-answer H2, H2/H3 depth, a real
                           unique-angle section, title/excerpt length
                           budgets) rather than free-writing it.
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

e2e/                      Playwright specs
src/**/*.test.ts(x)       Vitest unit/component tests, colocated with source

public/                   Static assets served as-is. og-image.png (1200x630,
                           the sitewide OG/Twitter card image referenced by
                           siteConfig.ogImage) is generated, not hand-designed,
                           see gotcha #13 before touching it. That's the only
                           file here, favicon.ico and the icon/apple-icon
                           generators live in src/app/ instead (Next's app
                           icon convention requires it, see gotcha #14).
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
  drift apart.
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
  32 marketing routes today (`/`, `/software-testing-services` and its
  six subpages, `/qa-consulting` and its six subpages, `/about`, `/blog`
  and its 15 `/blog/[slug]` posts, see the repository structure above), a
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

See `.env.example` for the full list.

- `NEXT_PUBLIC_SITE_URL` overrides the canonical site URL used in
  metadata, the sitemap, and OG tags (defaults to the production URL).
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (added 2026-08-17) enables GA4 via
  `@next/third-parties`' `GoogleAnalytics` component, rendered
  conditionally in `layout.tsx` only when this is set, so a local dev
  server or a preview build with no env var configured never sends
  traffic to the real property. No custom click-tracking code was added
  for the "Book a call" CTA specifically: `calendly.com` (via
  `siteConfig.links.calendar`) is the only external domain linked
  anywhere on the site, so GA4's own Enhanced Measurement automatically
  captures every "Book a call" click as an `outbound_click` (i.e.
  `click` with `outbound: true`) event with zero code, no dilution risk
  from other outbound links since there are none. Mark that event as a
  key event (GA4's current term for a conversion) in the GA4 Admin UI
  once traffic is flowing, not something configurable from code.
