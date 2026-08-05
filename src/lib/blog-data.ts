import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Calculator,
  ClipboardCheck,
  GitCompare,
  Handshake,
  Layers,
  Repeat,
  Rocket,
  TrendingDown,
  UserCheck,
  Webhook,
  Workflow,
} from "lucide-react";

export type BlogCategorySlug =
  | "qa-strategy"
  | "test-automation"
  | "outsourcing-hiring"
  | "testing-practices"
  | "case-studies";

export interface BlogCategory {
  slug: BlogCategorySlug;
  label: string;
  /** Literal Tailwind class referencing one of the theme's chart-N tokens, used as a small per-category color cue. Kept literal (not built from a template string) so Tailwind's build-time scan picks it up. */
  colorClass: string;
}

export const blogCategories: BlogCategory[] = [
  {
    slug: "qa-strategy",
    label: "QA Strategy",
    colorClass: "bg-[var(--chart-1)]",
  },
  {
    slug: "test-automation",
    label: "Test Automation",
    colorClass: "bg-[var(--chart-2)]",
  },
  {
    slug: "outsourcing-hiring",
    label: "Outsourcing & Hiring",
    colorClass: "bg-[var(--chart-3)]",
  },
  {
    slug: "testing-practices",
    label: "Testing Practices",
    colorClass: "bg-[var(--chart-4)]",
  },
  {
    slug: "case-studies",
    label: "Case Studies",
    colorClass: "bg-[var(--chart-5)]",
  },
];

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategorySlug;
  author: "Muhammad Ali" | "Mohammad Khan";
  date: string;
  readTime: string;
  icon: LucideIcon;
  body: BlogContentBlock[];
}

export const POSTS_PER_PAGE = 6;

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-outsource-qa-testing",
    title: "How to Outsource QA Testing: A Practical Guide",
    excerpt:
      "Outsourcing QA is not just about finding someone to click buttons. Here is what actually determines whether the engagement works.",
    category: "outsourcing-hiring",
    author: "Muhammad Ali",
    date: "2026-04-20",
    readTime: "6 min read",
    icon: Handshake,
    body: [
      {
        type: "paragraph",
        text: "Most guides to outsourcing QA start with cost. That is the wrong place to start. Cost is easy to compare and hard to act on, since the cheapest option and the most expensive one can both fail you for the same reason: neither one was ever set up to catch the defects that actually matter to your product.",
      },
      {
        type: "heading",
        text: "Start with what you are actually trying to solve",
      },
      {
        type: "paragraph",
        text: "Teams reach for outsourced QA for two very different reasons, and mixing them up is where most engagements go wrong. The first is capacity: you have a testing process that works, but not enough hands to run it every sprint. The second is process: nobody on the team actually owns testing, and you need someone who can both execute and design how testing should work. A vendor built for the first case will happily execute a checklist you hand them and never tell you the checklist has gaps. Know which one you need before you start evaluating anyone.",
      },
      { type: "heading", text: "What to look for in a QA partner" },
      {
        type: "list",
        items: [
          "Engineers who join your sprint ceremonies, not a separate queue you file tickets into",
          "Comfort working inside your existing tools and repositories, not a proprietary test management platform you now have to maintain",
          "A mix of manual and automated testing, since a partner that only automates will miss the exploratory and usability testing a script cannot do",
          "Transparent reporting you can see in real time, not a summary that arrives after the sprint has already shipped",
          "No requirement for a long-term contract, since a partner confident in the work does not need one to keep you",
        ],
      },
      { type: "heading", text: "Questions to ask before signing" },
      {
        type: "list",
        items: [
          "How long until an engineer is actually contributing test coverage, not just reading documentation?",
          "What does defect reporting look like day to day, and who triages it?",
          "How do you handle a stack you have not tested before?",
          "What happens to test cases and documentation if we end the engagement?",
        ],
      },
      {
        type: "paragraph",
        text: "That last question matters more than it sounds. A good outsourced QA engagement leaves your team with something durable: test cases, a coverage map, a process your next hire can pick up. A bad one leaves you with a stack of closed tickets and nothing you can hand to anyone else.",
      },
      { type: "heading", text: "What the first 30 days should look like" },
      {
        type: "paragraph",
        text: "Ramp-up should be measured in days, not months. A QA engineer who already knows how to test software needs time to learn your product, not to learn how to test. Expect a kickoff call, a review of your existing documentation and codebase, and access to your tools set up within the first week. From there, active contribution to sprint coverage by day seven is a reasonable bar, and one worth holding any partner to before you commit to anything longer than a trial engagement.",
      },
    ],
  },
  {
    slug: "qa-process-setup-series-a-startups",
    title: "QA Process Setup for Series A Startups: What to Build and When",
    excerpt:
      "At Series A, you are shipping faster than your test coverage can keep up with. Here is the order to build QA process in.",
    category: "qa-strategy",
    author: "Mohammad Khan",
    date: "2026-04-20",
    readTime: "7 min read",
    icon: Rocket,
    body: [
      {
        type: "paragraph",
        text: "At Series A, you are shipping faster than your test coverage can keep up with, and that is not a failure, it is the normal shape of a company at this stage. The mistake is not having gaps. The mistake is not knowing where they are, or building process in an order that does not match how fast you are actually moving.",
      },
      { type: "heading", text: "Why Series A is the inflection point" },
      {
        type: "paragraph",
        text: "Pre-seed and seed-stage teams usually get away with founders and early engineers testing their own work, because the surface area is small enough for one or two people to hold in their heads. Series A breaks that. Headcount grows, the codebase grows faster, and the cost of a production incident grows fastest of all, since you now have paying customers and, often, an enterprise deal or two riding on uptime. Tribal knowledge stops being enough right around the time it stops being safe to rely on.",
      },
      { type: "heading", text: "The build order that actually works" },
      {
        type: "list",
        items: [
          "A risk-based test plan for your critical paths first, not full coverage everywhere at once",
          "Manual exploratory testing on anything customer-facing, since scripted tests alone will not catch what a real user does",
          "Automated regression on the paths that break most often, wired into your CI so a bad merge gets caught before release",
          "A defect triage process with clear severity levels, so a P1 does not wait behind a typo fix",
          "Release sign-off criteria, so shipping is a decision someone actually makes, not something that happens by default when the sprint ends",
        ],
      },
      {
        type: "paragraph",
        text: "Notice automation is third on that list, not first. Teams under fundraising pressure often want to buy a testing tool and call the problem solved. A tool without a risk-based plan behind it just automates chasing the wrong things faster.",
      },
      { type: "heading", text: "What good looks like at 90 days" },
      {
        type: "paragraph",
        text: "By the end of a quarter, a Series A team with QA process actually working should be able to answer three questions without a meeting: what got tested this release, what is still a known gap, and who signed off before it shipped. If those questions still need a Slack thread to answer, the process is not there yet, no matter how many tests exist.",
      },
    ],
  },
  {
    slug: "regression-testing-checklist",
    title: "Regression Testing Checklist: What to Test Before Every Release",
    excerpt:
      "A regression test suite that only covers happy paths is not a regression suite. Here is what belongs on the checklist.",
    category: "testing-practices",
    author: "Muhammad Ali",
    date: "2026-04-20",
    readTime: "6 min read",
    icon: ClipboardCheck,
    body: [
      {
        type: "paragraph",
        text: "A regression test suite that only covers happy paths is not a regression suite, it is a demo script. Regression testing exists to catch the thing that used to work and quietly stopped, and that means the checklist has to cover more than the feature someone just built.",
      },
      { type: "heading", text: "Before you write a single test case" },
      {
        type: "paragraph",
        text: "Start by mapping what actually breaks in your product, not what a generic template says should be tested. Pull the last two or three quarters of production incidents and look for the pattern. Most teams find the same handful of areas breaking repeatedly: authentication, payment flows, and whatever integration touches the most third-party APIs. Those areas earn a bigger share of the checklist than anything else.",
      },
      { type: "heading", text: "The checklist itself" },
      {
        type: "list",
        items: [
          "Core user flows end to end, not just the screen that changed",
          "Every integration point touched by the release, including third-party APIs and webhooks",
          "Permission and role-based access, since a broken permission check rarely shows up in a demo",
          "Data integrity across the release, especially for anything involving a migration",
          "Cross-browser and cross-device checks for anything customer-facing",
          "Previously fixed bugs in the same area of code, since regressions love to reopen old wounds",
        ],
      },
      { type: "heading", text: "Automate the boring parts, not all of it" },
      {
        type: "paragraph",
        text: "Automated regression should run on every pull request for the paths that are stable and well understood. Anything still changing shape, or anything that depends on judgment rather than a pass or fail check, stays manual until it settles down. Automating a flaky, half-finished feature just gives you a test suite that cries wolf, and a team that starts ignoring red builds is worse off than a team with no automation at all.",
      },
      { type: "heading", text: "How often to run the full pass" },
      {
        type: "paragraph",
        text: "Automated regression on every merge is the baseline. A fuller manual pass before a production release is worth scheduling weekly or biweekly, depending on how often the team actually ships. The goal is not maximum coverage on every single check-in, it is confidence at the moment that matters most: right before something goes live.",
      },
    ],
  },
  {
    slug: "when-to-hire-qa-consultant",
    title: "When to Hire a QA Consultant: 7 Clear Signs",
    excerpt:
      "Most teams wait too long to bring in QA help. Here are the signs that show up before the incident that finally forces the decision.",
    category: "outsourcing-hiring",
    author: "Mohammad Khan",
    date: "2026-04-20",
    readTime: "5 min read",
    icon: UserCheck,
    body: [
      {
        type: "paragraph",
        text: "Most teams wait too long to bring in QA help. The decision usually gets made right after a production incident that should never have shipped, but the signs were almost always there months earlier. Here are the seven that show up first.",
      },
      {
        type: "list",
        items: [
          "Engineers are testing their own code with no second set of eyes before it ships",
          "Bugs keep reaching production in the same handful of features, release after release",
          "Nobody can say with confidence what percentage of the product actually has test coverage",
          "A release used to take a day to ship and now takes a week, mostly spent on manual verification",
          "The team has hired one QA engineer, but that person has no strategy to work from and is drowning in tickets",
          "An enterprise deal or fundraise now requires a real QA process, and what exists today would not survive a due diligence review",
          "Leadership is making release decisions on gut feel because nobody can produce real coverage data",
        ],
      },
      {
        type: "paragraph",
        text: "Any one of these on its own is manageable. Three or more at the same time is usually the point where a consultant pays for themselves within the first engagement, simply by turning a set of symptoms into an actual diagnosis.",
      },
      { type: "heading", text: "Why a consultant instead of another engineer" },
      {
        type: "paragraph",
        text: "A QA engineer executes tests. A QA consultant looks at why defects are escaping in the first place and fixes the process, so the engineer you already have, or hire next, has something repeatable to run instead of building it themselves from nothing. Teams that hire an engineer before fixing the process usually end up with one very busy person and the same escape rate as before.",
      },
      { type: "heading", text: "What a first engagement typically looks like" },
      {
        type: "paragraph",
        text: "A structured audit first: what is tested, what is assumed, and where the real risk is hiding. Then a strategy sized to the team's actual stack and release cadence. Most assessment and design phases run two to four weeks, short enough that the signs above do not have time to turn into the incident that would have forced the decision anyway.",
      },
    ],
  },
  {
    slug: "test-automation-roi",
    title: "How to Calculate the ROI of Test Automation",
    excerpt:
      "Test automation ROI is not just about time saved on manual testing. Here is the fuller math most teams miss.",
    category: "test-automation",
    author: "Mohammad Khan",
    date: "2025-04-15",
    readTime: "6 min read",
    icon: Calculator,
    body: [
      {
        type: "paragraph",
        text: "Test automation ROI is not just about time saved on manual testing. That is the number most teams reach for, and it is also the smallest piece of the actual picture. The real return shows up somewhere else entirely: in the defects that never reach production in the first place.",
      },
      {
        type: "heading",
        text: "The obvious math, and why it undersells the case",
      },
      {
        type: "paragraph",
        text: "The simple version compares manual execution hours against the time spent building and maintaining a suite. That comparison usually looks unfavorable in month one, break-even somewhere around month three to six, and clearly positive after that. But stopping there misses the bigger number: the cost of the defects an automated suite catches before a customer does.",
      },
      { type: "heading", text: "What to actually put in the calculation" },
      {
        type: "list",
        items: [
          "Manual execution hours saved per release, at your team's fully loaded hourly rate",
          "Engineering hours not spent on hotfixes and incident response for defects caught earlier instead of in production",
          "Release velocity gained from shipping with confidence instead of a manual verification pass that used to take days",
          "Customer trust and churn risk avoided, which is real but harder to put a precise number on, so most teams use a conservative estimate rather than skip it",
        ],
      },
      { type: "heading", text: "Where automation ROI actually breaks down" },
      {
        type: "paragraph",
        text: "The math falls apart when a suite is built for the wrong layer of the product. Automating a UI that changes every sprint produces a maintenance bill that eats the savings. The highest-return automation targets are stable, high-traffic paths: authentication, checkout, core workflows, the things that do not change shape often but would be expensive if they broke.",
      },
      { type: "heading", text: "A rough benchmark" },
      {
        type: "paragraph",
        text: "Teams that automate the right layer typically see positive ROI within one to two quarters, and the 45% reduction in escaped defects we have seen across embedded engagements is a reasonable number to model against if you do not yet have your own baseline. Track your own escape rate for a quarter before automating, so you have a real before-and-after number rather than an industry average standing in for your product.",
      },
    ],
  },
  {
    slug: "qa-maturity-model",
    title: "The QA Maturity Model: Where Does Your Team Sit?",
    excerpt:
      "Most teams overestimate their QA maturity. Here is a five-stage model to place your team honestly, and what moving up actually takes.",
    category: "qa-strategy",
    author: "Muhammad Ali",
    date: "2025-04-01",
    readTime: "7 min read",
    icon: Layers,
    body: [
      {
        type: "paragraph",
        text: "Most teams overestimate their QA maturity. Ask an engineering lead where they sit and you will usually hear stage three or four. Look at the actual process and it is closer to stage one or two. The gap is not dishonesty, it is that maturity gets measured by intent, when it should be measured by what happens the day something breaks.",
      },
      { type: "heading", text: "The five stages" },
      {
        type: "list",
        items: [
          "Stage 1, Reactive: testing happens only after something breaks in production, and there is no defined process at all",
          "Stage 2, Ad hoc: individual engineers test their own work inconsistently, with no shared standard or documentation",
          "Stage 3, Defined: a documented process exists and manual testing happens on a regular cadence, but coverage is inconsistent across features",
          "Stage 4, Managed: test coverage is tracked, risk-based prioritization exists, and automation covers the stable core of the product",
          "Stage 5, Optimizing: quality metrics actively shape release decisions, and the process itself gets revisited and improved on a regular cycle",
        ],
      },
      { type: "heading", text: "How to place your team honestly" },
      {
        type: "paragraph",
        text: "Skip the self-assessment and look at what actually happened during your last three production incidents. Was there a documented test that should have caught it and did not? Did anyone know the coverage gap existed beforehand, or was it a surprise? Teams at stage 3 and below are almost always surprised. Teams at stage 4 and above usually already knew the gap was there and were tracking it.",
      },
      { type: "heading", text: "What moving up a stage actually takes" },
      {
        type: "paragraph",
        text: "Stage 1 to 2 is mostly a mindset shift: someone has to own testing as a real responsibility, not an afterthought squeezed into the end of a sprint. Stage 2 to 3 is documentation and consistency. Stage 3 to 4 is where most teams get stuck, since it requires actually measuring coverage and prioritizing by risk instead of by whoever is asking loudest. That jump is usually where outside help pays for itself fastest, since it takes someone who has built the measurement system before to set it up without months of trial and error.",
      },
    ],
  },
  {
    slug: "api-testing-best-practices",
    title: "API Testing Best Practices: What Every QA Engineer Should Know",
    excerpt:
      "API testing is where you get the most coverage for the least effort in a modern stack. Here is how to do it well.",
    category: "testing-practices",
    author: "Mohammad Khan",
    date: "2025-03-18",
    readTime: "6 min read",
    icon: Webhook,
    body: [
      {
        type: "paragraph",
        text: "API testing is where you get the most coverage for the least effort in a modern stack. A UI test exercises one path through the system and breaks the moment a button moves. An API test exercises the actual business logic underneath, and stays stable even while the interface changes around it.",
      },
      { type: "heading", text: "Start below the UI" },
      {
        type: "paragraph",
        text: "Most teams write UI tests first because that is what the product looks like from the outside. Flip that order. Testing the API layer first catches a wider set of defects with far less maintenance overhead, and gives you a stable foundation to layer UI and end-to-end tests on top of later.",
      },
      { type: "heading", text: "What good API test coverage includes" },
      {
        type: "list",
        items: [
          "Contract testing, so a change to a response shape gets caught before it breaks a consumer",
          "Status code and error handling for every documented failure mode, not just the happy path",
          "Authentication and authorization checks at the endpoint level, not assumed from the UI",
          "Data validation on both request and response payloads",
          "Load and performance checks on endpoints that sit in a critical path",
        ],
      },
      { type: "heading", text: "Do not skip GraphQL" },
      {
        type: "paragraph",
        text: "Teams that grew up on REST sometimes treat GraphQL testing as an afterthought, assuming the schema does the validation work for them. It does not cover business logic, resolver-level errors, or the n+1 query problems that only show up under real data volume. Treat a GraphQL API with the same rigor as REST: schema validation is a floor, not a ceiling.",
      },
      { type: "heading", text: "Where this fits with data pipeline testing" },
      {
        type: "paragraph",
        text: "The same discipline extends to the ETL jobs and data pipelines that never show up in a UI test but break production just as often. If your API returns data shaped by a pipeline, testing the API without validating what feeds it is testing half the system. A defect in a transform step upstream will pass every API contract test and still ship bad data to your users.",
      },
    ],
  },
  {
    slug: "agile-qa-sprint-cycles",
    title: "How to Run QA Inside Agile Sprint Cycles Without Slowing Down",
    excerpt:
      "QA in agile works when it is embedded in the sprint from day one, not bolted onto the end of it.",
    category: "qa-strategy",
    author: "Muhammad Ali",
    date: "2025-03-04",
    readTime: "6 min read",
    icon: Repeat,
    body: [
      {
        type: "paragraph",
        text: "QA in agile works when it is embedded in the sprint from day one, not bolted onto the end of it. Most teams that feel like testing slows them down are not experiencing a QA problem, they are experiencing a sequencing problem: testing is happening after the work is done instead of alongside it.",
      },
      { type: "heading", text: "Where testing actually belongs in the sprint" },
      {
        type: "list",
        items: [
          "Test cases get written during sprint planning, at the same time as the ticket itself, not after the code is merged",
          "Exploratory and smoke testing happens as features get built, in parallel with development",
          "Automated checks run pre-merge, so a defect is caught before it becomes part of the codebase everyone else builds on",
          "Coverage and open defects get reported in the same standups as everything else, not in a separate status update nobody reads",
          "Release sign-off happens against real coverage data collected during the sprint, not a scramble on the last day",
        ],
      },
      { type: "heading", text: "The mistake that causes the slowdown" },
      {
        type: "paragraph",
        text: "When testing happens only at the end of a sprint, it competes with the deadline instead of running alongside it. Every defect found late becomes a fire drill, and every fire drill teaches the team, wrongly, that testing is what makes releases slow. The fix is not less testing, it is moving testing earlier so defects get caught while there is still time in the sprint to fix them calmly.",
      },
      {
        type: "heading",
        text: "What an embedded QA engineer actually does day to day",
      },
      {
        type: "paragraph",
        text: "Sits in planning and estimates test effort alongside development effort. Joins standups like any other engineer on the team, not a vendor waiting for a status update. Writes and executes tests as features get built instead of queuing behind a backlog. Files and triages defects the same day they are found, so nothing sits unaddressed until the sprint is already over.",
      },
      { type: "heading", text: "The result teams actually notice" },
      {
        type: "paragraph",
        text: "Not a faster sprint on paper, but a calmer one. Defects surface early enough to fix without drama, releases stop depending on a last-minute testing scramble, and the team's velocity becomes something they can actually trust instead of a number that quietly assumes nothing will go wrong.",
      },
    ],
  },
  {
    slug: "playwright-cicd-integration",
    title: "Integrating Playwright Into Your CI/CD Pipeline",
    excerpt:
      "Getting Playwright running locally is easy. Getting it running reliably in CI is where most teams actually struggle.",
    category: "test-automation",
    author: "Mohammad Khan",
    date: "2025-02-19",
    readTime: "7 min read",
    icon: Workflow,
    body: [
      {
        type: "paragraph",
        text: "Getting Playwright running locally is easy. Getting it running reliably in CI, on every pull request, without flaking out and training the team to ignore red builds, is where most teams actually struggle.",
      },
      { type: "heading", text: "Get the environment right first" },
      {
        type: "paragraph",
        text: "Most CI flakiness traces back to environment mismatch, not the tests themselves. Pin browser versions explicitly rather than trusting whatever CI's cached image happens to have. Run tests in the same containerized environment locally and in CI, so a test that passes on a developer's machine has a real chance of passing in the pipeline too.",
      },
      { type: "heading", text: "A CI setup that holds up" },
      {
        type: "list",
        items: [
          "Run tests in parallel across shards to keep pipeline time reasonable as the suite grows",
          "Block merges on failure for the core suite, but keep a separate, non-blocking suite for anything still stabilizing",
          "Capture traces, screenshots, and video on failure automatically, so debugging a CI-only failure does not require reproducing it locally first",
          "Retry a failed test once automatically, then flag it for review if it fails a second time, rather than letting a flaky test block every future merge",
          "Run the full suite on every merge to the main branch, and a targeted subset on every pull request to keep feedback fast",
        ],
      },
      { type: "heading", text: "Wiring it into the release gate" },
      {
        type: "paragraph",
        text: "A test suite that runs but does not block anything is a suggestion, not a gate. Playwright results should be a required check before a pull request can merge, and a failing check should stop a deployment the same way a failing build does. This is the actual mechanism behind a CI/CD quality gate: automation only protects a release if failing it has a real consequence.",
      },
      { type: "heading", text: "Keeping the suite healthy over time" },
      {
        type: "paragraph",
        text: "A suite that nobody maintains degrades quietly. Review flaky tests weekly rather than letting them accumulate, and delete or rewrite anything that fails intermittently for reasons unrelated to a real defect. A smaller suite the team trusts is worth more than a larger one they have learned to click past.",
      },
    ],
  },
  {
    slug: "in-house-vs-outsourced-qa",
    title: "In-House vs Outsourced QA: A Practical Guide for Startups",
    excerpt:
      "The choice between in-house and outsourced QA is not really about cost. It is about what stage your product is at.",
    category: "outsourcing-hiring",
    author: "Muhammad Ali",
    date: "2025-02-05",
    readTime: "6 min read",
    icon: Building2,
    body: [
      {
        type: "paragraph",
        text: "The choice between in-house and outsourced QA is not really about cost, even though cost is usually the first thing that gets compared. It is about what stage your product is at, how fast the surface area you need tested is changing, and whether you need someone to execute a process or to also help build one.",
      },
      { type: "heading", text: "When in-house makes more sense" },
      {
        type: "list",
        items: [
          "Your product has a narrow, stable domain that takes real time to learn, and that learning curve is worth investing in permanently",
          "You have enough sustained testing volume to justify a full-time role, not just a handful of releases a month",
          "Deep, long-term institutional knowledge of the product is itself a competitive advantage worth owning directly",
        ],
      },
      { type: "heading", text: "When outsourced makes more sense" },
      {
        type: "list",
        items: [
          "You need coverage now and cannot wait through a multi-month hiring cycle",
          "Testing needs flex up and down with release cadence, rather than staying constant",
          "You want both manual and automation expertise without hiring two separate specialists",
          "You want an outside process built first, with the option to bring it in-house later once it exists",
        ],
      },
      {
        type: "heading",
        text: "The hybrid model most startups actually land on",
      },
      {
        type: "paragraph",
        text: "Very few teams stay purely one or the other for long. A common and effective pattern is starting with an embedded outsourced engineer to build the process and establish coverage, then hiring in-house once the role is well enough defined that a new hire has something real to step into, instead of building it themselves from a blank page. The outsourced phase de-risks the hire that follows it.",
      },
      { type: "heading", text: "The question that actually decides it" },
      {
        type: "paragraph",
        text: 'Not "what does this cost per hour," but "what happens to our test coverage the month after this person or team leaves." An outsourced engagement that leaves you with documented test cases and a repeatable process passes that test. One that leaves you with nothing but closed tickets does not, no matter how the hourly rate compared.',
      },
    ],
  },
  {
    slug: "how-we-reduced-escaped-defects",
    title: "How We Reduced Escaped Defects by 45% for a SaaS Client",
    excerpt:
      "Escaped defects were costing a SaaS client customer trust and developer time. Here is what actually changed.",
    category: "case-studies",
    author: "Mohammad Khan",
    date: "2025-01-22",
    readTime: "6 min read",
    icon: TrendingDown,
    body: [
      {
        type: "paragraph",
        text: "Escaped defects were costing a SaaS client customer trust and developer time in roughly equal measure. Every bug that reached production meant a support ticket, a context switch for an engineer already mid-sprint on something else, and a slower release cycle the next time around, since the team started double-checking everything out of caution rather than confidence.",
      },
      { type: "heading", text: "Where the process actually broke" },
      {
        type: "paragraph",
        text: "The team had engineers testing their own code with no second set of eyes, no documented test cases for their core flows, and no automated regression at all. None of that was unusual for a team their size. What made it costly was that their product had grown past the point where one or two engineers could hold the whole surface area in their heads, and nobody had noticed the moment that happened.",
      },
      { type: "heading", text: "What changed, in order" },
      {
        type: "list",
        items: [
          "A structured audit identified the three feature areas responsible for the majority of escaped defects",
          "Test cases got written for those areas first, in sprint planning, instead of after the code was already done",
          "An embedded QA engineer joined sprint ceremonies and ran manual exploratory testing alongside development",
          "Automated regression got built for the stable core paths and wired into their CI, so a bad merge got blocked before release",
          "Release sign-off criteria were introduced, so shipping became a decision with real coverage data behind it",
        ],
      },
      { type: "heading", text: "The result" },
      {
        type: "paragraph",
        text: "Escaped defects dropped 45% within the first 90 days. The mechanism was simple: catching a bug during the sprint that introduced it, instead of after a release had already gone out. Support ticket volume tied to product defects dropped alongside it, and the engineering team stopped losing sprint time to unplanned hotfixes, which freed up capacity for the roadmap work that had been slipping.",
      },
      { type: "heading", text: "What made the difference" },
      {
        type: "paragraph",
        text: "Not a tool, and not simply adding headcount. The change that mattered was moving testing earlier in the sprint and making coverage visible enough that a release decision could be made on real data instead of a gut check. That is a process change first, and everything else, the automation, the reporting, the sign-off criteria, exists to support it.",
      },
    ],
  },
  {
    slug: "playwright-vs-selenium-2026",
    title: "Playwright vs Selenium in 2026: Which One Should You Choose?",
    excerpt:
      "Playwright has overtaken Selenium as the default choice for most new web projects. Here is when Selenium still makes sense.",
    category: "test-automation",
    author: "Muhammad Ali",
    date: "2025-01-15",
    readTime: "7 min read",
    icon: GitCompare,
    body: [
      {
        type: "paragraph",
        text: "Playwright has overtaken Selenium as the default choice for most new web projects, and for good reason: faster execution, built-in auto-waiting that eliminates a huge share of flaky test failures, and native support for multiple browser engines out of the box. That does not make Selenium obsolete. It makes the choice more specific than it used to be.",
      },
      { type: "heading", text: "Where Playwright wins clearly" },
      {
        type: "list",
        items: [
          "New projects with no existing automation investment to protect",
          "Teams that want tests written in TypeScript alongside their application code",
          "Modern single-page applications, where Playwright's auto-waiting handles dynamic content far more reliably than manual waits",
          "Parallel execution out of the box, without extra infrastructure to set up",
        ],
      },
      { type: "heading", text: "Where a Selenium suite still makes sense" },
      {
        type: "list",
        items: [
          "An existing, mature Selenium suite with years of coverage built into it, where a rewrite would cost more than it returns",
          "Enterprise environments standardized on the Page Object Model with tooling built around it",
          "Legacy browser support requirements that Playwright's supported engine list does not fully cover",
          "Teams with deep existing Selenium expertise where the retraining cost outweighs the framework's benefits",
        ],
      },
      { type: "heading", text: "The decision that actually matters" },
      {
        type: "paragraph",
        text: "For a brand new automation effort, Playwright is the sensible default in 2026. For a team that already has a working Selenium suite, the right move is rarely a full rewrite for its own sake. Extend and maintain what already works, and consider Playwright for new coverage being built going forward, rather than treating the two as a single all-or-nothing decision.",
      },
      { type: "heading", text: "What this looks like in practice" },
      {
        type: "paragraph",
        text: "Most engagements that inherit an existing Selenium suite keep it running for regression on stable, well-covered paths, while building any new feature coverage in Playwright. Over time, the Selenium suite naturally shrinks as its covered paths get retired or rebuilt, without ever requiring a disruptive big-bang migration that pauses feature work to get there.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getCategoryBySlug(
  slug: string | undefined,
): BlogCategory | undefined {
  return blogCategories.find((category) => category.slug === slug);
}

export function getPostsByCategory(
  categorySlug: string | undefined,
): BlogPost[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return blogPosts;
  return blogPosts.filter((post) => post.category === category.slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter(
      (other) => other.category === post.category && other.slug !== post.slug,
    )
    .slice(0, limit);
}

export function getTotalPages(postCount: number): number {
  return Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE));
}

export function clampPage(page: number, totalPages: number): number {
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.min(page, totalPages);
}

export function paginatePosts(posts: BlogPost[], page: number): BlogPost[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return posts.slice(start, start + POSTS_PER_PAGE);
}
