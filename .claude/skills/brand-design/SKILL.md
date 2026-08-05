---
name: brand-design
description: Enforces GoGreenlit's brand and design system, color tokens, typography, spacing, component patterns, and voice/tone, when building or editing any page, section, component, or marketing copy in this repo. Use before creating a new page/section, adding a UI component, choosing colors or Tailwind classes, or writing marketing/blog copy, so output matches BRAND_GUIDELINES.md and CLAUDE.md instead of generic shadcn/Tailwind defaults.
---

# GoGreenlit Brand & Design Consistency

Quick-reference for any user-facing work in this repo. Full detail lives in
[BRAND_GUIDELINES.md](../../../BRAND_GUIDELINES.md) (voice, color, logo) and
[CLAUDE.md](../../../CLAUDE.md) (code conventions), read those for anything
not covered here.

## Color

- Palette: Dark Slate Grey `#354639`, Palm Leaf `#8fa175`, Muted Olive
  `#b1c680`, Navajo White `#ffe0ad`, Sandy Brown `#ee9e58`. Full semantic
  token mapping (light/dark, derived shades) is in BRAND_GUIDELINES.md §4
  and is live in `globals.css`.
- **Default system** (body content, cards, most of the site): Dark Slate
  Grey (`primary`) is the only color used for actions and signals. Palm
  Leaf is a support accent (icon tiles/hover), not a CTA color.
  `destructive` is a deepened, red-leaning shade of Sandy Brown, this
  palette has no true red. Navajo White and Sandy Brown are the warm
  neutral scale. Use semantic Tailwind classes (`bg-primary`,
  `text-muted-foreground`, `border-border`), never hardcode hex values
  here.
- **Bold section treatments** (hero and other standout moments, see
  `src/components/marketing/hero.tsx` as the reference): any swatch can
  be a full section background, including Dark Slate Grey, and hardcoded
  hex (`bg-[#354639]`) is fine. Which color acts as the "action" color
  can flip per section, pick whatever contrasts on that background. Not
  every section should be bold, that restraint is what makes the bold
  ones read as intentional. Always check contrast before shipping a new
  color pairing, don't assume any two palette colors read well together
  (Sandy Brown icons on Palm Leaf measured 1.29:1 and were nearly
  invisible; Sandy Brown tiles with Dark Slate Grey icons measured
  4.63:1 and shipped). A new page's own hero should use `PageHero`
  (`src/components/marketing/page-hero.tsx`), the same dark/aurora
  treatment, not a plain calm section, don't reintroduce the "plain
  white intro" the services page hero replaced.
- **Each page family claims its own bold color and composition devices,
  don't reuse another family's.** Software Testing Services = Palm Leaf
  band + `ServiceCard variant="bold"`. QA Consulting = Muted Olive band
  (via `PhaseTimeline`) + `ServiceCard variant="subtle"` (the default) +
  `CompareColumns` for "the wrong way vs. our way" contrasts, both in
  `src/components/marketing/`. About goes further still, per an explicit
  "make this feel different" ask: zero icons anywhere, founder profile
  cards, an italic pull-quote, a typographic manifesto list instead of a
  grid, and it reuses Dark Slate Grey (not a new swatch) for its one bold
  section since the differentiation there is about composition, not
  color. When starting a new page family, decide deliberately whether the
  ask calls for a new claimed color, new composition devices, or both.
- **No pure white or black anywhere**, not backgrounds, not button/badge
  text, not translucent borders (`rgba(255,255,255,…)` is banned too).
  Every surface is a tint/shade mixed from the five swatches; check
  `globals.css` before assuming a plain white/black value is safe to add.

## Animation

Three patterns, don't mix them up:

- **Ambient/bold-section only**: pure CSS `@keyframes` in `globals.css`,
  triggered via Tailwind's arbitrary
  `animate-[name_duration_easing_infinite]` syntax, no animation
  library, this keeps animated components Server Components. Every
  keyframe needs a `prefers-reduced-motion: reduce` override
  (`animation: none`). Keep it slow (15 to 30s loops, staggered
  durations); a focal pulse/glow can run faster. Reserved for bold
  sections, not sprinkled through the calm parts of the site.
- **Scroll-triggered reveal (anywhere, including calm sections)**: use
  the shared `Reveal` component (`src/components/marketing/reveal.tsx`),
  don't hand-roll a new `IntersectionObserver`. Fades an element up when
  it scrolls into view and **replays every time it re-enters**, not
  just once. Stagger siblings with `delay={index * 80}`. Reduced motion
  is already handled by a CSS override in `globals.css`, no `matchMedia`
  branch needed in a new consumer. This is the site's main
  animation-performance lever: `IntersectionObserver` does no work while
  an element is off-screen, unlike a scroll-event handler.
- **Scroll-linked continuous transforms (two standing instances)**: read `scrollY` in
  a passive, rAF-throttled listener and write styles directly to the DOM
  via a ref, not React state, so scrolling doesn't trigger re-renders.
  Two standing instances: `hero-scroll-shrink.tsx` shrinks the whole
  homepage hero panel, `page-hero-scroll-zoom.tsx` zooms and fades the
  badge/heading/description on every `PageHero` (the services overview
  and all of its subpages), using the hero `<section>`'s own height as
  the scroll range. Don't add a third without a real reason, prefer the
  reveal pattern above.
- **FAQ accordion (any page with an FAQ)**: use `FaqAccordion`
  (`src/components/marketing/faq-accordion.tsx`), don't hand-roll one.
  Closed by default, click a question to open it, nothing auto-expands.
  Each row fades up into view via the shared `Reveal` component,
  staggered `index * 80`ms, the same entrance used everywhere else on
  the site rather than a bespoke scroll effect.

## Typography

- Bespoke Serif for everything, headings, body copy, and the stat
  numbers that used to be monospace (see `StatBand`). One typeface,
  self-hosted via `next/font/local`, no second family anywhere.
- Headings: `font-semibold tracking-tight`; add `text-balance` on
  headings and short lead paragraphs so they wrap evenly.
- Use Tailwind's default scale (`text-sm` through `text-6xl`, or larger
  in a bold hero-style section), no one-off font sizes.

## Layout

- Containers: `max-w-6xl` for full-width sections, `max-w-3xl` /
  `max-w-2xl` for reading-width text, if any gets added.
- Outer gutter on every section: `px-4 sm:px-6 lg:px-8`.
- Vertical rhythm: `py-20` for standalone sections (`pt-20 pb-12` /
  `pb-16` for headers directly under the sticky site header). A bold
  hero-style section can run taller (`min-h-[85vh]` or similar) since it
  is meant to feel like a billboard moment, not a standard content block.
- Radius: `--radius: 0.5rem`, tighter than shadcn's default, keep it
  that way. It reads as precise/technical, not "soft SaaS."

## Buttons & links, the one real gotcha

This shadcn setup runs on **Base UI, not Radix**, there is no `asChild`.
For anything that's a link styled as a button:

```tsx
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

<Link href="#services" className={buttonVariants({ size: "lg" })}>
  Explore services
</Link>;
```

Also don't nest a full `<Button>` inside another Base UI component's
`render` prop (e.g. `<SheetTrigger render={<Button ... />}>`), both
stamp their own `data-slot` on the same element and disagree between
server and client render, causing a hydration mismatch. Apply
`buttonVariants()` directly to the outer component instead.

Never wrap a `<Link>` in `<Button render={...}>`, Base UI's own docs say
links shouldn't render through Button's `render` prop, since `<a>` and
`<button>` have different semantics.

## Icons

Lucide (`lucide-react`) only, default stroke width, sized via `size-*`
Tailwind classes. Don't mix in a second icon set.

## Voice & tone

- The voice of someone who clearly knows the QA space at a deep level
  and is completely at ease talking about it, warm and inviting, never
  showing off. Lead with a real number over a vague superlative: "45%
  reduction in escaped defects," not "world-class quality."
- Banned words: "world-class," "best-in-class," "cutting-edge,"
  "seamless," "QA resources" (say "QA engineers" instead).
- **Never use an em dash anywhere, in copy, code comments, commit
  messages, or documentation.** Use a period, comma, colon, or plain
  hyphen instead. No exceptions, does not expire.
- Never fabricate client quotes, logos, or case studies. If no real
  testimonial exists yet, leave the section out, don't invent one.
- Admit tradeoffs in copy; nuance reads as expertise for this audience.

## SEO

- Real service and domain keywords belong naturally in headings and
  body copy (embedded QA, manual testing, Playwright automation,
  Selenium testing, API testing, regression testing, QA strategy, CI/CD
  quality gates), never stacked into an unnatural list.
- One `<h1>` per page, `h2` per section, `h3` for card/list-item titles
  inside a section. Card-style components need a real heading element,
  not a styled `<div>` (see `ServiceCard`).
- More detail on the technical side lives in
  [CLAUDE.md §SEO](../../../CLAUDE.md#seo).

## Before shipping new UI or copy

- [ ] Colors are semantic classes in the default system, or checked
      hardcoded hex inside a deliberate bold section, never an
      unchecked color pairing
- [ ] Bold-section ambient animation is pure CSS with a reduced-motion
      override; any scroll-triggered fade-in reuses the shared `Reveal`
      component instead of a new `IntersectionObserver`
- [ ] A new page's hero uses `PageHero`, and any FAQ section uses
      `FaqAccordion`, instead of one-off equivalents
- [ ] A new page fits an existing family's devices (reuse its bold color
      and components), or deliberately claims new ones for a new family,
      rather than accidentally cloning another family's exact look
- [ ] Typography matches the scale/weight conventions above
- [ ] Any button-as-link uses `buttonVariants()` on `<Link>`, not
      `Button asChild`
- [ ] Copy has no banned words, no em dashes, and no fabricated social
      proof
- [ ] Headings form a clean outline (one `h1`, `h2` per section, `h3`
      for items inside)
- [ ] A new top-level page is added to `sitemap.ts`, the header `nav`
      array in `site-config.ts`, and `layout.tsx`'s structured data if it
      introduces a new service (this is a multi-page site now, adding a
      page is expected, just keep these in sync when you do)
