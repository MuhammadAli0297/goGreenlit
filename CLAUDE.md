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
   homepage hero's fixed `min-h-[calc(100dvh-4rem)]` (full viewport height
   minus the sticky header's `h-16`, see gotcha #20). CTAs live outside the zoom
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

8. **The header nav is a real hamburger/drawer below `sm`, not a
   hand-squeezed row.** Before 2026-09-04 the header shrank the logo, nav
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

## Repository structure

```
src/app/                  Routes (App Router). Keep page files thin,
                          compose components, don't inline large JSX trees.
  layout.tsx              Root layout: self-hosted font, metadata (including
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
                            of 2026-09-04, see gotchas #16 and #19),
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
                          navigation-menu.tsx is Base UI's too, used for
                          the header's Services dropdown, its Link part
                          takes a `render` prop the same as other Base UI
                          polymorphic components, safe to point at
                          `next/link` directly (see gotcha #2, that only
                          warns about Button, not Link-to-Link).
  layout/                 Site chrome: header (site-header.tsx renders a
                           dropdown via NavigationMenu for any navItems
                           entry with nested items, a plain Link
                           otherwise, desktop-only below `sm`; mobile-nav.tsx
                           renders the same nav as a Sheet drawer for
                           `sm`-and-below, see gotcha #8), footer (site-footer.tsx renders
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
                           animated-stat-value.tsx (count-up
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
                           on-page intro), `blogPosts` (40 as of 2026-09-04,
                           an even 8 per category, each a
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
                           `buildBlogOgElement()` (the JSX, dark brand
                           background, category-colored eyebrow via a
                           hardcoded dark-mode chart-1..5 hex map since
                           Satori can't resolve CSS custom properties,
                           post title, logo mark) and `loadBlogOgFonts()`
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
  57 marketing routes today (`/`, `/software-testing-services` and its
  six subpages, `/qa-consulting` and its six subpages, `/about`, `/blog`
  and its 40 `/blog/[slug]` posts, see the repository structure above), a
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
