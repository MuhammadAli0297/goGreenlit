# GoGreenlit Brand Guidelines

This is the working brand system for GoGreenlit, built fresh alongside
the new site. It exists so that copy, design, and code all pull in the
same direction, whether that work is done by a designer, an engineer, or
Claude. When in doubt, this document wins over "what the last page did."

For engineering conventions (folder structure, component patterns, how
tokens below map to code) and technical SEO structure, see
[CLAUDE.md](./CLAUDE.md).

---

## 1. Brand essence

**Name**: GoGreenlit (styled `goGreenlit` in the wordmark, lowercase "go,"
capitalized "Greenlit.")

**What we do**: Embedded QA, manual and automated testing, for startups
and growing companies at any stage of a project. We onboard into an
existing product and team, rather than starting from a blank slate.

**Positioning**: The alternative to traditional QA outsourcing. Not a
ticket queue you throw builds over a wall to, but an engineer embedded in
your sprint, present in your standups, testing what you actually shipped
this week.

**The name, as a concept**: A greenlight is a decision, "this is
approved, proceed." That's the emotional core of the brand: confidence to
ship, backed by someone who actually checked. Every visual and verbal
choice below should reinforce _earned confidence_, not generic
"quality" platitudes.

**Tagline**: "Embedded QA teams for startups that ship fast."

**Supporting proof points** (use real, current numbers, update these as
the business updates its own claims; never invent a stat that isn't
backed by something the company can stand behind):

- 18+ years combined QA experience
- 45% reduction in escaped defects
- 95% release coverage achieved
- $1B+ in revenue supported

---

## 2. Voice & tone

**Voice** (constant): The voice of someone who has clearly spent years
doing QA at a high level and is completely at ease talking about it, not
someone trying to prove it. Direct, technically credible, and warm. Think
of a senior QA engineer explaining a decision to a founder they respect,
over coffee, not a marketing team pitching a category to a buyer. The
expertise should come through in the specificity of what we say, never in
how loudly we say it.

**Tone** (shifts by context): Confident, plain, and inviting for the
homepage's own copy. Warm does not mean soft, we still lead with real
numbers and concrete mechanisms, but the delivery should feel like good
advice from someone who wants the reader to succeed, not a pitch trying
to close them. If longer-form writing (a blog, case studies) gets added
later, that register can get more exploratory and specific, since showing
the reasoning _is_ the credibility there.

### Do

- Lead with the specific claim, then support it. ("45% reduction in
  escaped defects" beats "we help you ship better quality.")
- Use concrete nouns from the domain: sprint, standup, release, quality
  gate, regression suite, flaky test, test coverage, sprint cycle. Startups
  evaluating a QA partner know this vocabulary, don't dumb it down.
- Write sentences a founder would actually say out loud.
- Admit tradeoffs. ("A fully outsourced model isn't wrong, it's just
  suited to a different shape of work.") Nuance reads as expertise.
- Sound like you are glad to be explaining this, not like you are
  performing expertise for an audience. Warmth and technical depth are
  not in tension here, both at once is the whole point of this brand.
- Use short, clear sentences and periods or commas to keep a technical
  audience moving.

### Don't

- **Never use an em dash (—) anywhere, in any copy, code comment,
  commit message, or documentation for this project.** Use a period, a
  comma, a colon, or a plain hyphen instead, whichever reads most
  naturally. This rule has no exceptions and does not expire. See
  [AGENTS.md](./AGENTS.md).
- Don't use unquantified superlatives: "world-class," "best-in-class,"
  "cutting-edge," "seamless." If a claim can't carry a number or a
  specific mechanism, cut it.
- Don't use fear-based urgency ("Don't let bugs destroy your startup!").
  The brand's confidence comes from competence, not scare tactics.
- Don't invent client quotes, logos, or named case studies. If real
  testimonials or logos exist, use them verbatim with permission. Until
  then, leave the space empty rather than fabricate social proof, see
  `src/components/marketing/` for where a real testimonials section
  should eventually go.
- Don't say "QA resources" or "testing resources." People aren't
  resources. Say "QA engineers."
- Don't sound like you are showing off. If a sentence reads like it's
  trying to impress rather than inform, rewrite it plainer.

### Example rewrite

> ❌ "Our world-class QA experts leverage cutting-edge automation
> frameworks to deliver seamless quality assurance solutions."

> ✅ "Our engineers write Playwright suites in TypeScript, check them
> into your repo, and run them in your CI, not handed back as a black
> box."

---

## 3. Logo

The current mark (implemented in
[`src/components/layout/logo.tsx`](./src/components/layout/logo.tsx)) is
a wordmark: `go` in the body color, `Greenlit` in Dark Slate Grey, preceded
by a small solid forest-green dot with a soft accent-colored halo, a
literal, minimal "greenlight."

This is a solid interim mark for a code-first build, but it is **not** a
substitute for a professionally designed logo system (proper vector
lockups, monochrome variants). Treat the current implementation as the
_content and color spec_ for a designer to execute properly, not as the
final asset.

**Standalone favicon/app icon mark (added 2026-08-16):** the wordmark's
dot-and-halo device was scaled up into a dedicated icon, since the site's
only icon asset before this was a leftover pre-rebrand black/white
triangle that matched nothing about the current brand. Implemented as
`src/app/icon.tsx` and `src/app/apple-icon.tsx` (Next's native icon
convention, a `next/og` `ImageResponse` generator, not a hand-designed
image file) plus a regenerated `src/app/favicon.ico`: a Dark Slate Grey
(`#354639`) square, the same bold-section color the hero/PageHero/founders
section already use, with a Sandy Brown (`#ee9e58`) circle and a soft
Navajo-White-tinted halo at its center, the same ring device as the header
wordmark's dot, just without the wordmark text (illegible at 16-32px).
Generated the same way as `og-image.png` (see the codebase engineering
guide's OG image gotcha), code-rendered from the real brand tokens rather
than exported from a design tool. This is still an interim, code-first
mark, not the "when a real logo is commissioned" deliverable below, a
professional pass should still revisit it, but the icon set is no longer
a placeholder that fails at the small end.

**Until a designed logo system exists:**

- Don't stretch, recolor outside the palette below, or add effects
  (drop shadows, gradients, outlines) to the wordmark.
- Maintain clear space around the mark equal to the height of the dot on
  all sides.
- On dark backgrounds, the wordmark should use the dark-theme token
  values (see §4). Never force the light-theme colors onto a dark
  surface.
- Minimum size: don't render the wordmark below ~20px tall (mark
  becomes illegible sooner than the text does).

**When a real logo is commissioned**, brief the designer with: the
"greenlight = approval to ship" concept, the color palette in §4, and
the constraint that it needs to work as a small favicon/app icon _and_ a
full lockup. Most QA/dev-tool logos fail at the small end first.

---

## 4. Color

Color tokens live as CSS custom properties in
[`src/app/globals.css`](./src/app/globals.css) and drive every shadcn/ui
component automatically (`bg-primary`, `text-muted-foreground`, etc.).
Don't hardcode hex values in components, use the semantic Tailwind
classes so light/dark mode and future palette tweaks stay centralized.

**Status: live**, these are the actual values in `globals.css`.

### Core swatches

The palette this brand is built from (verbatim, [coolors.co/354639-8fa175-b1c680-ffe0ad-ee9e58](https://coolors.co/354639-8fa175-b1c680-ffe0ad-ee9e58)):

| Name            | Hex       | Character                                                   |
| --------------- | --------- | ----------------------------------------------------------- |
| Dark Slate Grey | `#354639` | Deep green-grey, the one deliberate "go" color, CTAs, mark  |
| Palm Leaf       | `#8fa175` | Soft sage-green, accent tiles, hover backgrounds            |
| Muted Olive     | `#b1c680` | Pale olive-green, stat band, CTA box, secondary chart color |
| Navajo White    | `#ffe0ad` | Warm pale cream, the lightest tint, page-section base       |
| Sandy Brown     | `#ee9e58` | Warm orange-terracotta, secondary surfaces, borders         |

### Semantic tokens

**No pure white or pure black anywhere, including translucent overlays.**
Every token below, every background, card, input, and border, in both
themes, is a tint or shade mixed from one of the five core swatches.
Interactive tokens (`primary`, `destructive`) use a deepened or
brightened shade of their swatch for AA text contrast; surfaces
(`background`, `card`, `muted`, `secondary`) use light or dark tints of
Navajo White / Sandy Brown so the whole site reads as one warm, tinted
system instead of neutral-gray-with-color-accents.

| Token                  | Light     | Dark                        | Derived from / usage                                                      |
| ---------------------- | --------- | --------------------------- | ------------------------------------------------------------------------- |
| `primary`              | `#354639` | `#acbf92`                   | Dark Slate Grey, as-is (light) / brightened toward Palm Leaf (dark)       |
| `primary-foreground`   | `#f9f4eb` | `#132517`                   | Text on `primary`, a warm cream-tinted near-white, not `#fff`             |
| `accent`               | `#dfe7d5` | `#37402b`                   | Palm Leaf tint, icon tiles, hover backgrounds                             |
| `accent-foreground`    | `#33411f` | `#c6d9ab`                   | Text on `accent`                                                          |
| `secondary`            | `#ecdaca` | `#493422`                   | Sandy Brown tint, secondary buttons, badge fills                          |
| `secondary-foreground` | `#1f3324` | `#f2ebde`                   | Text on `secondary`                                                       |
| `background`           | `#f6efe5` | `#0f1a11`                   | Navajo White tint (light) / near-black slate (dark)                       |
| `card` / `popover`     | `#f1e5da` | `#19291d`                   | A warmer, Sandy-Brown-leaning tint, the "paper" surface atop `background` |
| `foreground`           | `#1f3324` | `#f2ebde`                   | Primary text, dark slate ink (light) / warm cream (dark)                  |
| `muted`                | `#e3ead1` | `#213025`                   | A more saturated Muted Olive tint, stat band, CTA box                     |
| `muted-foreground`     | `#516237` | `#b3c28e`                   | Secondary/supporting text                                                 |
| `border` / `input`     | `#e1cbb7` | `rgba(255,224,173,.12-.18)` | Warm tan divider, a translucent Navajo White, not translucent white       |
| `destructive`          | `#a73c1b` | `#e97d4e`                   | A deepened, red-leaning shade of Sandy Brown, errors only                 |

There is no separate `destructive-foreground` token in this component
system, destructive text renders as `text-destructive` on a translucent
`bg-destructive/10` fill (see the `destructive` variant in
`src/components/ui/button.tsx` or `badge.tsx`), not as solid-fill text.

**No true red exists in this palette**, `destructive` is deliberately a
darkened, rust-leaning shade of Sandy Brown rather than an imported
Tailwind red, so error states stay in the same warm-orange family as
everything else instead of introducing a foreign hue.

**Why this palette**: a hot-sauce-inspired register. Dark Slate Grey
reads as the same "actual forest, actual decision" green the brand has
always leaned on, just deeper and more muted; Palm Leaf and Muted Olive
carry the growth/greenlight metaphor into softer, more natural greens;
Navajo White and Sandy Brown bring warmth and contrast without ever
touching literal red, alarm-orange, or white. It's still one deliberate
"go" color against a warm, sunlit, never-gray-or-white neutral base.

### Rules for the default system (body content, cards, most of the site)

- **No pure white (`#fff`) or pure black (`#000`) anywhere**, not as a
  background, not as button/badge text, not as a translucent border
  overlay. If you need a near-white or near-black value, mix it from
  Navajo White (near-white) or Dark Slate Grey (near-black, darkened)
  rather than reaching for the literal hex.
- **Dark Slate Grey means "go," use it with intent.** Primary CTA
  buttons, active states, links, the logo mark. Don't tint large
  background areas with it or use it decoratively in the default system;
  it should always read as an action or a positive signal. (Bold section
  treatments, below, are the deliberate exception to this.)
- **Palm Leaf is a support tone, not the action color, in the default
  system.** It's for accent tiles and hover backgrounds. The moment it
  starts appearing on CTAs in the calm, token-driven parts of the site,
  there are two "go" colors competing, which defeats the point.
- **Navajo White and Sandy Brown are the warm neutral scale** in the
  default system, not a second and third accent, keep them backgrounds,
  ink, and borders there, not decorative fills competing with Dark Slate
  Grey.
- Maintain WCAG AA contrast (4.5:1 for body text, 3:1 for large text/UI
  components) for every foreground/background pairing. The token pairs
  above are sanity-checked but should get a final contrast pass with real
  design tooling before shipping, this table is a spec, not a guarantee.

### Bold section treatments (hero and other standout moments)

Not every section should look like this, and that restraint is the
point. The default system above is deliberately calm so that when a
section breaks from it, the break reads as intentional. The homepage
hero (`src/components/marketing/hero.tsx`) is the reference
implementation, and this pattern is the standard for **any future
standout section or page**, not a one-off. A secondary page's own hero
should reuse `PageHero` (`src/components/marketing/page-hero.tsx`), the
same dark Dark Slate Grey background and drifting aurora signature via
the shared `AuroraBackground` component, sized for a page header rather
than the homepage's full billboard moment. It has its own scroll-linked
effect too, distinct from the homepage's shrinking panel, see §9. The
`/software-testing-services` hero and its six subpages are the
reference for this, as are `/qa-consulting` (and its six subpages) and
`/about`, each its own distinct "family" beyond the shared hero shell,
see the page-family note below.

- **A bold section can use any of the five swatches as a full
  background, including Dark Slate Grey.** The "one action color" rule
  above governs the calm system; a bold section is a different register
  and is allowed to paint a whole section in the brand's darkest color,
  or in a green that would never be a full background elsewhere.
- **Which color is the "action" color can flip per section.** On a dark
  Dark Slate Grey background, Dark Slate Grey itself has no contrast to
  give a button, so the CTA becomes Sandy Brown fill with Dark Slate Grey
  text instead. Let contrast and legibility pick the action color for
  that specific background, don't force the default mapping onto a
  background it doesn't work on.
- **Hardcoded hex (`bg-[#354639]`, `text-[#ee9e58]`) is acceptable inside
  a bold section**, unlike the rest of the site. These are deliberate,
  fixed, one-off compositions, not surfaces that need to flip for
  light/dark mode or stay centrally tokenized. Keep the hex values to the
  five documented swatches only, never introduce a sixth color.
- **Always check contrast before shipping a pairing, don't assume any two
  palette colors read well together.** Two real failures from building
  the services grid: Sandy Brown icons on a Palm Leaf tile measured
  1.29:1 (icons nearly invisible), and a Muted Olive card background read
  as too bright and neon against the rest of the palette even though its
  contrast numbers were fine. The pairing that worked: Sandy Brown tiles
  with Dark Slate Grey icons (4.63:1), on a Palm Leaf card (title ink
  4.83:1, body copy needs full `text-foreground`, not `text-muted-foreground`,
  to clear 4.5:1 on that background). Recompute contrast for any new
  pairing rather than reusing these numbers for a different combination.
- **Bold sections need calm sections next to them.** The hero works
  because the rest of the page is quiet. If every section goes bold, the
  page stops having a focal point. When adding a new bold section, keep
  most of the page on the default system.
- **Each page "family" (an overview page plus its subpages, or a
  standalone page built for its own distinct feel) should claim its own
  bold-section color and composition devices, not reuse another family's
  verbatim.** Software Testing Services claims Palm Leaf as its bold band
  color. QA Consulting claims Muted Olive instead, specifically so the
  two families read as siblings, not clones, at a glance while still
  sharing `PageHero`/`CtaSection`/`Reveal`. About goes a step further: it
  was explicitly asked to feel different even from the other bold-section
  pages, so instead of claiming a fourth swatch as a background, it
  drops icon grids entirely (the only page on the site with zero Lucide
  icons), uses founder profile cards and an italic pull-quote instead,
  and reuses Dark Slate Grey, the same color the hero and every
  `PageHero` already use, for its one bold moment. The lesson: "give this
  page its own vibe" can mean a new color, or it can mean new composition
  devices with a familiar color, read the actual ask rather than
  defaulting to "pick an unused swatch" every time. See
  [CLAUDE.md gotcha #7](./CLAUDE.md#️-read-before-you-write-code) for the
  current full breakdown of which components are universal versus
  family-specific.
- **See §9 (Animation)** for motion inside a bold section, continuous
  ambient animation is part of this pattern, not a separate concern.
- **The footer (`src/components/layout/site-footer.tsx`) is a bold
  section too, added 2026-08-16, and it is sitewide chrome rather than
  page-family-scoped, so it reuses Dark Slate Grey (the same hardcoded
  `#354639` the hero and About's founders section use) instead of
  claiming its own color the way a page family would.** It previously
  sat on the plain calm `bg-background` with only a thin `border-t`,
  which made it blend into whatever page it closed rather than read as
  an intentional ending. `Logo` gained a `variant="onDark"` prop for use
  inside this and any future dark bold section, since its default
  `text-foreground`/`bg-primary` styling is tuned for the calm system and
  inverts oddly (near-black text on a bright green dot) against a
  hardcoded dark background once dark mode's own token values are in
  play.

---

## 5. Typography

- **Typeface**: [Bespoke Serif](https://www.fontshare.com/fonts/bespoke-serif)
  for everything on the site, headings, body copy, buttons, nav, and the
  stat numbers that used to be set in a monospace font. One family, used
  everywhere, on purpose. It's a free Fontshare variable font (weight
  range 300 to 800, with a matching italic), self-hosted via
  `next/font/local` in `src/app/layout.tsx`, with the woff2 files in
  `src/app/fonts/`. Don't add a second typeface without updating this
  document.
- **Why Bespoke Serif**: a deliberate move away from the neutral
  sans/mono system pairing toward a single, editorial serif with real
  character, warmer and more considered than a generic UI sans, which
  fits the "someone who knows their stuff, not showing off" voice this
  brand is going for. Using it for stat numbers too (instead of a
  monospace face) trades tabular digit alignment for total typographic
  consistency, that tradeoff was made deliberately, don't reintroduce a
  second face for numbers without checking first.
- **Scale**: use Tailwind's default type scale (`text-sm` through
  `text-6xl`) rather than one-off font sizes. Headings are
  `font-semibold` with `tracking-tight`; body copy is default weight.
- Use `text-balance` on headings and short lead paragraphs so they wrap
  evenly (already applied throughout the marketing pages), don't remove
  it when editing copy.

---

## 6. Layout & spacing

- **Container**: `max-w-6xl` for full-width sections, `max-w-3xl`/`max-w-2xl`
  for reading-width text blocks, if any get added. Stay consistent with the
  home page's existing sections rather than introducing new container
  widths.
- **Horizontal padding**: `px-4 sm:px-6 lg:px-8` on every top-level
  section, this is the site's outer gutter at every breakpoint.
- **Vertical rhythm**: sections use `py-20` (or `pt-20 pb-12`/`pb-16` for
  page headers immediately under the sticky header). Keep new sections on
  this rhythm rather than introducing arbitrary spacing values.
- **Radius**: `--radius: 0.5rem`, slightly tighter than shadcn's
  default. Reads more precise/technical than a heavily rounded, "soft
  SaaS" look, which fits an engineering-credibility brand better than a
  consumer-app one.

---

## 7. Iconography

- [Lucide](https://lucide.dev) icons only (`lucide-react`, already a
  dependency), don't mix in a second icon set.
- Default stroke width, sized via Tailwind (`size-4`, `size-5`, `size-10`
  for icon tiles). The shadcn button component auto-sizes icons inside
  it, don't manually override icon size inside a `Button`.
- **Status colors** (for future use, e.g. a test-status badge in a case
  study or blog post): pass/success reuses brand `primary` (Dark Slate
  Grey); failure uses `destructive`; in-progress/warning uses an amber
  (`#d97706` light / adjust for dark as needed, not yet tokenized, add it
  to `globals.css` as `--warning` if a real use case appears rather than
  hardcoding it inline).

---

## 8. Imagery

There is no photography or illustration system yet, the current site is
intentionally text/UI-first (stat bands, icon tiles, cards) rather than
leaning on imagery. If/when photography is introduced:

- Avoid generic "team laughing at laptop" stock photography, it
  undercuts the technical-credibility positioning. If real photos of the
  actual team or actual client work aren't available yet, prefer no
  image over a stock one.
- Screenshots of real test runs, CI pipelines, or dashboards (anonymized
  as needed) are on-brand and reinforce the "we actually did the work"
  positioning better than any stock photo could.

---

## 9. Animation

There are three distinct motion patterns on this site now. They live in
different places and follow different rules, don't reach for the wrong
one for a given job.

### Ambient background motion (bold sections only)

Reserved for bold section treatments (§4), not sprinkled throughout the
calm, token-driven parts of the site. The hero's aurora background and
pulsing "ship fast" highlight are the reference implementation.

- **Prefer pure CSS `@keyframes` over an animation library.** No
  `framer-motion` or similar has been added, and none should be, for
  ambient background motion; write the keyframes directly in
  `globals.css` and trigger them with Tailwind's arbitrary
  `animate-[keyframe-name_duration_easing_infinite]` syntax. This keeps
  the component a Server Component, no `"use client"` needed for
  animation that doesn't respond to state or events.
- **Keep it slow and ambient, not attention-grabbing.** The aurora blobs
  drift over 19 to 26 second loops with staggered durations so the
  motion feels organic rather than synchronized and mechanical. A glow
  or pulse on a single focal element (like the "ship fast" highlight) can
  run faster, a few seconds per cycle, since it's meant to draw the eye
  there specifically.
- **Always add a `prefers-reduced-motion` override.** Every custom
  keyframe animation needs a corresponding rule in the
  `@media (prefers-reduced-motion: reduce)` block in `globals.css` that
  sets `animation: none` for that element's class. Users who ask for
  reduced motion should get a static version of the same design, not a
  degraded one.
- Reserve continuous ambient motion for the one or two moments per page
  meant to be a standout, the same restraint that governs bold color
  treatments in §4.

### Scroll-triggered reveal (site-wide, calm sections included)

Every major heading, card, and list item on the homepage fades up into
place the first time it scrolls into view, **and replays every time it
re-enters the viewport**, not just once per page load. Unlike ambient
motion above, this pattern is not restricted to bold sections, it's used
throughout, including the calm token-driven parts of the site.

- Use the shared `Reveal` component
  (`src/components/marketing/reveal.tsx`), don't hand-roll a new
  `IntersectionObserver` for a new section. It wraps its children
  (`as="div"` by default, `as="li"` when the wrapped element must stay a
  direct grid/subgrid child, see the process steps in `page.tsx`) and
  accepts a `delay` in ms for staggering siblings, `index * 80` is the
  established step (service tiles, differentiators, process steps).
- Implementation is `IntersectionObserver` plus a Tailwind CSS
  transition on `opacity`/`translate-y` only, never `@keyframes` and
  never a layout-triggering property. It toggles visibility on every
  enter _and_ exit, which is what makes it replay on re-entry.
- **This is the site's main animation-performance lever.**
  `IntersectionObserver` does zero work while an element is off-screen,
  unlike a scroll-event handler that runs on every scroll tick
  regardless of what's actually visible. Reach for it, not a scroll
  listener, for anything that's just "fade in once visible."
- **Reduced motion is handled in CSS, not JS.** The `.reveal-on-scroll`
  rule inside the `@media (prefers-reduced-motion: reduce)` block in
  `globals.css` forces `opacity: 1; transform: none; transition: none`
  regardless of the component's internal state, so a new consumer
  doesn't need its own `matchMedia` branch.
- The stat band's count-up numbers (`animated-stat-value.tsx`) follow
  the same trigger/replay/reduced-motion shape, animating a number via
  `requestAnimationFrame` instead of toggling a CSS class.

### Scroll-linked continuous transforms (two standing instances)

Two elements shrink, zoom, or fade in direct proportion to scroll
position, not a one-time enter/exit trigger. This is a different
technique with real performance stakes if copied carelessly:

- The homepage hero shrinks, fades, and rounds its corners as the page
  scrolls, via `hero-scroll-shrink.tsx`.
- Every `PageHero` (the services overview and all six of its subpages)
  zooms its badge, heading, and description in and fades them out as
  the hero scrolls past, reversing back to full size and opacity on the
  way back up to it, via `page-hero-scroll-zoom.tsx`. The zoom range is
  the hero `<section>`'s own rendered height, not a fixed viewport
  fraction, since `PageHero` is shorter and content-driven than the
  homepage's full billboard hero. CTAs sit outside the zoom wrapper so
  they stay normal-sized and clickable at any scroll position.

Both share the same implementation approach:

- Read `window.scrollY` in a `{ passive: true }` scroll listener,
  throttled to once per frame with `requestAnimationFrame`.
- Write `transform`/`opacity` (plus `borderRadius` for the homepage
  hero) **directly to the DOM node via a ref**, bypassing React state
  entirely, so scrolling never triggers a re-render, only a
  compositor-friendly style update.
- Skip entirely under `prefers-reduced-motion`, checked once on mount
  before the scroll listener is even attached.
- These are genuine standout moments, not a default. Don't attach a
  third scroll-position listener elsewhere without confirming it's
  worth the added main-thread cost, prefer the reveal pattern above for
  anything that's really just "animate in once visible."

### FAQ accordion (any page with an FAQ)

An FAQ section is closed by default, showing only the questions. A
question opens on click, one at a time. `FaqAccordion`
(`src/components/marketing/faq-accordion.tsx`) is the reference
implementation, first built for `/software-testing-services` and now
used on all six of its subpages too.

- Built on the generated Base UI accordion primitive
  (`src/components/ui/accordion.tsx`) for the actual expand/collapse
  animation and correct heading/button semantics, not hand-rolled, and
  left fully uncontrolled so Base UI's own default closed state and
  single-open toggle behavior apply.
- An earlier version auto-expanded the nearest question as the user
  scrolled, with the active question sticking below the header via an
  `IntersectionObserver`. That was removed, it read as a distracting
  scroll hijack rather than a helpful one, not every scroll-adjacent
  interaction benefits from being scroll-driven.
- Instead, each question fades up into view via the shared `Reveal`
  component as the user scrolls to it, staggered `index * 80`ms, the
  same entrance used everywhere else on the site. This is the "better
  animation while scrolling" this section needed, distinct from making
  the questions themselves auto-open.

---

## 10. SEO and content strategy

The homepage carries the full weight of this site's organic search
presence, so copy has to work for both a human reader and a search
engine at the same time, without ever reading like it was written for
the search engine. Technical implementation (metadata, structured data,
heading hierarchy) lives in [CLAUDE.md §SEO](./CLAUDE.md#seo). This
section is about the writing itself.

- **Use real service and domain terms naturally, don't force them.**
  Words like embedded QA, manual testing, Playwright automation, Selenium
  testing, API testing, regression testing, QA strategy, sprint cycle,
  and CI/CD quality gates should show up because they are genuinely what
  we do, spread across headings and body copy in context, not stacked
  into a keyword list. If a sentence only exists to repeat a keyword, cut
  it or fold the term into a sentence that says something new.
- **Every section needs a heading that describes what it actually
  contains.** A search engine and a skimming founder both use headings
  the same way, as a table of contents. Vague headings ("What we offer")
  help neither, specific ones ("Software testing services built for
  shipping teams") help both.
- **More real, specific content beats thin pages.** The site is growing
  page by page now, not just section by section on the homepage (see
  [CLAUDE.md](./CLAUDE.md)), but the same rule applies at either level: a
  new page needs to earn its own URL with real depth and its own search
  intent, not just restate the homepage's summary with different
  headings. Prefer six concrete service descriptions over three vaguer
  ones, whether that's on the homepage or a dedicated services page.
- **Location and credibility details are real content, not filler.**
  Chicago-based, remote-ready, years of combined experience, and the
  founders being hands-on in every engagement are genuine facts about the
  business, use them, don't hedge them into vagueness.
- **Never keyword-stuff.** If a term appears in three different sections,
  each mention should teach the reader something the others didn't, not
  just repeat itself for search engine weight.
- **Every blog post opens its first real heading as a direct-answer
  question, not a topic label.** Established 2026-08-16 across all 12
  launch posts: after the intro, the first `H2` is phrased the way a
  reader or an AI answer engine would actually ask it (`"What does
outsourcing QA testing actually mean?"`), and the paragraph right
  beneath it answers in 1-2 plain sentences before the post goes deeper.
  That paragraph is written to be lifted verbatim as a featured snippet,
  so it needs to stand alone without the surrounding context. Every post
  also needs one section a generic competitor article would not have
  (red flags, a worked example, a decision framework), built from this
  site's real verified stats or a genuine mechanism, never an invented
  figure, the "don't invent testimonials or logos" rule below applies to
  fabricated data points just as much as fabricated quotes. Full
  technical spec (heading types, title/excerpt character budgets) in
  [CLAUDE.md gotcha #15](./CLAUDE.md#️-read-before-you-write-code).

---

## 11. Do / Don't summary

| Do                                                                                     | Don't                                               |
| -------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Lead with a specific, real number                                                      | Use unquantified superlatives                       |
| Say "QA engineers"                                                                     | Say "QA resources"                                  |
| Use Dark Slate Grey for actions/signals only in the default system                     | Use it as decorative fill in the default system     |
| Mix every surface from the five swatches                                               | Use `#fff`/`#000` or translucent white              |
| Keep Palm Leaf to accents, not CTAs, in the default system                             | Use it as a second action color there               |
| Use real client proof when available                                                   | Invent testimonials or logos                        |
| Use `buttonVariants()` on `<Link>` for link-styled buttons                             | Wrap a `<Link>` in `<Button render={...}>`          |
| Keep the warm neutral scale (cream/olive/terracotta) understated                       | Introduce a third accent color                      |
| Sound like a warm, confident expert                                                    | Sound like you are showing off                      |
| Use SEO keywords naturally, in context                                                 | Stack keywords into an unnatural list               |
| Use a period, comma, or colon to join clauses                                          | Use an em dash, ever, anywhere in this project      |
| In a bold section, use any swatch as background and let contrast pick the action color | Make every section bold, or skip the contrast check |
| Animate bold-section ambient motion with hand-written CSS keyframes                    | Add an animation library                            |
| Use the shared `Reveal` component for scroll-triggered fades, anywhere on the page     | Hand-roll a new `IntersectionObserver` per section  |
| Use `PageHero` for a new page's header, and `FaqAccordion` for a new FAQ section       | Rebuild either pattern by hand                      |
| Give each new page family its own bold color and composition devices                   | Reuse another family's bold color/devices verbatim  |
