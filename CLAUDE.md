# Avidara - Project Brief for Claude

## What is Avidara
A compliance intelligence platform serving 18 regulated industries in South Africa.
Independent external review layer - finds what internal teams miss before regulators do.
One methodology, many industries, the encoded ruleset changes per vertical.

**Live URL:** avidara.co.za (marketing site) · app.avidara.co.za (the product, separate repo: `Stevher/AvidaraApp`, not attached here)
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, deployed on Vercel
**Repo:** stevher/avidara_beta
**Working branch:** check the current session's own instructions for the exact branch name (it has changed between sessions - e.g. `claude/initial-setup-mHfbO` at the time this file was last updated). Whatever it is, **always also sync to `main`** via cherry-pick (not merge - see Git section below).

---

## Project Structure
```
apps/
  frontend/            ← Next.js app (all website work happens here)
    src/
      app/              ← Pages (App Router) - one directory per industry vertical,
                           plus pricing/, contact/, faq/, terms/, privacy/, blog/,
                           consult/, sample-report/, international/, api/
      components/
        landing/        ← Shared landing/marketing sections (Navbar, Footer, CTA, WhyAvidara, etc.)
        industry/       ← Shared per-industry-page components (IndustryHero, IndustryProblem, IndustryNudge)
        (root)/         ← ChatWidget, CookieBanner, ContactForm, Logo, ThemeProvider/Toggle, FadeIn
      data/
        industries.tsx  ← SINGLE SOURCE OF TRUTH for all 18 industries - see below
        faq.ts          ← SINGLE SOURCE OF TRUTH for all FAQ Q&As - see below
      content/blog/posts/  ← Blog markdown posts (auto-generated, see Blog Automation below)
```

Dead code still sitting in the repo - don't be confused by these, they are not imported anywhere:
`src/components/landing/Hero.tsx`, `Problem.tsx`, `Industries.tsx`. The live homepage hero is
inline in `src/app/page.tsx`; the live shared components are `IndustryHero.tsx`, `IndustryProblem.tsx`,
and the homepage industry grid is `IndustrySelectorGrid.tsx` (in `components/industry/`).

---

## Industries Served (18, in 3 groups)
Source of truth: `src/data/industries.tsx` (`industries` array + `INDUSTRY_GROUPS`). Navbar, Footer,
the homepage grid, and `IndustryNudge` all read from this file automatically - adding a new industry
there is enough to wire it into every one of those surfaces. **It is not enough to make the industry
show up correctly everywhere else** - see "Adding a new industry vertical" below.

- **Health & Life Sciences:** Pharmaceuticals, Medical Devices, Consumer Health, Veterinary,
  Pharma Manufacturing, Pharmacovigilance, Managed Healthcare
- **Professional & Regulated Services:** Publishing, Financial Services, Legal, Competition Law,
  Public Procurement, Data Protection
- **Industrial & Resources:** Transport, Agriculture, Mining, Energy & IPP, Environmental

### Adding a new industry vertical - checklist
Adding one entry to `industries.tsx` is necessary but not sufficient. Also needed:
1. `src/app/<slug>/page.tsx` - the actual page (follow an existing recent one as a template,
   e.g. `managed-healthcare` or `environmental`; standard shape is `IndustryHero` → "who it's for"
   or `IndustryProblem` → `WhatIsAvidara` → services section → `HowItWorksDemo` → `WhyAvidara` →
   `IndustryNudge` → `CTA industry="<slug>"`)
2. `src/components/landing/CTA.tsx` - add a `TIERS["<slug>"]` entry (two tiers: a same-day flat-rate
   "Document Review" and a scoped "Package/Programme Review")
3. `src/app/sitemap.ts` - add the URL
4. `src/app/api/chat/route.ts` - the chat widget does **not** read any page content; its industries
   list, services, and "Website pages" section are a hand-maintained copy that goes stale the moment
   you add a vertical anywhere else. Update it in the same pass, not as an afterthought.
5. Severity grading: default is Critical/Major/Minor. Three pages (`/publishing`, `/legal`,
   `/competition-law`) actually run on a backend job type that returns High/Medium/Low priority
   instead - they use the `severityLabels` prop on `IndustryProblem` to relabel without touching
   the colour-coding logic. Don't assume Critical/Major/Minor is universal; verify against the real
   backend behaviour (via a handoff brief, not a guess) before grading a new vertical's findings.

---

## Key Files
| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage - full-bleed photo hero, industry grid, platform/how-it-works sections |
| `src/data/industries.tsx` | Single source of truth for all 18 industries - see above |
| `src/data/faq.ts` | Single source of truth for all FAQ content - shared by `FAQ.tsx` (accordion) and `/faq`'s FAQPage JSON-LD |
| `src/components/landing/Navbar.tsx` | Site nav, `alwaysOpaque` / `photoHero` props, hash link handler - see Patterns below |
| `src/components/landing/Footer.tsx` | Footer - industry links and company links both need new pages added manually |
| `src/components/landing/CTA.tsx` | The actual booking form/section (`id="book"`), rendered standalone or via `<CTA industry="...">` on every industry page, Pricing, Consult, and the homepage. `TIERS` record holds per-industry pricing-tier copy (no numbers - see Pricing below) |
| `src/components/landing/WhyAvidara.tsx` | Shared trust-signal block rendered verbatim on every single marketing page. Keep the copy platform-wide and industry-agnostic - no pharma-specific terms (e.g. "MLR"), no named regulator lists that aren't independently verified as monitored for every vertical the page is rendered on |
| `src/components/industry/IndustryHero.tsx` | Shared hero for industry pages - includes the "50+ regulatory frameworks encoded, platform-wide" stat row and a hand-built (non-interactive, purely decorative) fake app-UI mockup |
| `src/components/industry/IndustryProblem.tsx` | Shared "the problem" findings section, `severityLabels` prop for the 3 High/Medium/Low pages |
| `src/components/industry/IndustryNudge.tsx` | "Not in X? Try these other industries" footer-of-page cross-links, auto-generated from `industries.tsx` |
| `src/components/landing/HowItWorksDemo.tsx` | The 3-step "how it works" + interactive demo review panel |
| `src/components/landing/Services.tsx` | Homepage services catalogue (pharma-specific AVD-* service codes) |
| `src/components/CookieBanner.tsx` | Single "Got it" dismiss button - this site sets no cookies of its own (Vercel Analytics is cookieless, theme uses localStorage); don't reintroduce an Accept/Decline pattern unless the site actually starts using cookies |
| `src/app/api/chat/route.ts` | Chat assistant - `SYSTEM_PROMPT` is a hand-maintained duplicate of site facts, not a live read. Must be updated manually whenever industries, services, pricing framing, or regulatory claims change elsewhere on the site |
| `src/app/pricing/page.tsx` | Pricing page - states the credit-based *model* only, never specific numbers (site-wide rule, see Pricing below) |
| `src/app/terms/page.tsx`, `src/app/privacy/page.tsx` | Canonical Terms/Privacy, sourced from the app repo's own Terms/Privacy (not independently drafted) - see "Legal content" below |
| `src/app/layout.tsx` | Root layout - Organization JSON-LD, Vercel Analytics. Note: head-only elements (`<link>`, `<script>`) must be wrapped in an explicit `<head>` tag, not placed as direct children of `<html>` - this Next.js version throws a hydration error otherwise |
| `src/app/opengraph-image.tsx` | Dynamically generated OG image (reads `industryCount` live, embeds the logo SVG as a local file read, not a network fetch) |
| `src/app/sitemap.ts` | Dynamic sitemap - every static page listed explicitly, blog posts auto-included |
| `src/app/sample-report/SampleReportClient.tsx` | Full worked fictional artwork-review report (Cardivex 5mg, 8 findings) - fixed toolbar, section anchors, print button |

---

## What Has Been Built
- Full marketing site across 18 industry verticals, each following the shared component pattern
  (see "Adding a new industry vertical" above)
- Homepage: full-bleed photo hero, industry grid (3 groups), platform/how-it-works/WhyAvidara/CTA sections
- Dossier Bridging page (`/life-sciences/dossier-bridging`): 8 outbound African routes (Morocco, Ghana,
  Kenya, Nigeria, SADC/ZAZIBONA, EAC-MRH, Mauritius, Lesotho) + inbound routes from 7 international authorities
- Pricing page (`/pricing`) - model only, no numbers (see below)
- Terms of Service / Privacy Policy - the app's own canonical content, not independently drafted (see below)
- Organization + FAQPage JSON-LD structured data; dynamically generated OG image
- Chat widget with a hand-maintained system prompt (see Key Files above - this needs manual upkeep)
- Cookie banner: single dismiss button, accurate copy (site sets no cookies)
- Navbar: transparent → opaque on scroll, `alwaysOpaque` and `photoHero` props, hash link handler
  that checks the *current* page for the target section before deciding whether to navigate to the
  homepage (see Patterns below - this was a real sitewide bug, fixed)
- Sample report page, FAQ page with category filter, blog with auto-generated posts
- Dark/light theme toggle (localStorage, no cookie)
- `scroll-mt-20` on all anchor sections

---

## Design Tokens (CSS vars, `src/app/globals.css`)
```
--bg, --bg2             background levels
--surf, --surf2         surface/card levels
--b, --b2               border levels (translucent white in dark mode, solid grey in light)
--t, --t2, --t3         text levels (t3 = dimmest)
--indigo #4f46e5        primary brand
--indigo-light #818cf8
--indigo-deep #3730a3
--emerald #10b981       secondary accent
--emerald-light #34d399
--amber #f59e0b
--red #ef4444
--shadow, --shadow-lg   card hover shadows
--glow                  subtle background glow
--font-fraunces         display/heading serif
--font-jakarta          body sans-serif
```
Dark/light mode is driven by `data-theme` on `<html>`, toggled client-side (see `ThemeProvider.tsx`).

---

## Core Site-Wide Rules

### No em-dashes, anywhere
Every em-dash ("—") gets replaced with a spaced hyphen (" - "), including in code comments, in
copy you write yourself, and in any new content pulled from a handoff brief or pasted source. This
applies to new content too - **blog automation (see below) reliably introduces em-dashes in new
posts and must be checked and cleaned on every sync to `main`.**

### Never invent a fact
Never state a regulatory citation, retention period, monitored-regulator list, dossier-bridge route,
pricing detail, or any other verifiable claim that you haven't actually confirmed - from this
repo's own code, from a handoff brief sourced from the app repo, or from the user directly. If a
claim can't be verified, either omit it, soften it to something true but general, or ask. This has
caught real bugs multiple times (wrong-country regulatory citations, overclaimed data retention,
an unverified monitored-regulator list, an invented "credits never expire" claim) - treat any
confident-sounding specific claim you're about to write as a thing to verify, not assume.

### Pricing: never disclose specific numbers
Avidara is priced per review on a credit basis (buy credits via Paystack, consumed when a review
runs - see `/pricing` and the Terms of Service Section 4). The marketing site and the chat
assistant both state the *model*, never a number. Subscription arrangements can be mentioned as
"can be requested" - not as a published plan with specific benefits, since none is confirmed to
exist.

### Legal content (Terms / Privacy) is sourced from the app, not drafted here
This marketing site's `/terms` and `/privacy` mirror the actual canonical Terms/Privacy from the
product repo (`Stevher/AvidaraApp`), delivered via handoff briefs - they are not independently
written. When updating them, port the source content faithfully (every clause, no paraphrasing)
rather than inventing clauses, and remember this site's own data practices (contact form, chat
widget, Resend/Upstash as sub-processors) aren't covered by the app-sourced content by default -
they need their own disclosure added on top, since the source document was written for the app's
data practices, not this site's.

---

## Blog Automation
A scheduled bot (`Avidara Blog Bot`, via GitHub Actions) periodically opens a PR against `main`
titled `blog: draft — <topic>`, sourced from `apps/frontend/src/content/blog/topics.json`. Before
merging or syncing one of these:
- **Check for em-dashes** in the new post - they are reliably present and must be cleaned (replace
  with " - ") before the content is considered mergeable.
- **Check for duplicate topics.** The bot has generated the same topic twice on different dates
  (same title, same slug) when the topic queue didn't advance correctly, which produces a genuine
  merge conflict between the older and newer PR. When this happens, compare the two drafts rather
  than assuming - prefer the more accurate/complete one (check for things like wrong-country
  regulatory citations) and close the other PR without merging, not resolve the conflict.

---

## Pending Tasks
1. **Social proof section** - no testimonials/clients yet. Build a placeholder section when the
   user has real logos/quotes to use; don't fabricate any in the meantime.
2. **Admin section** - deferred. Clerk auth + leads/chat/post-review panels for 2 users (owner +
   sales/marketing director).
3. **ROI calculator** - parked idea (select a document type, hours spent manually vs. Avidara
   spend, with an explicit disclaimer that it's direct ROI only, not cumulative or risk-adjusted).
   Since pricing isn't published, "Avidara spend" needs to be a user-editable input, not an assumed
   default.
4. **www vs apex domain redirect** - not verified from inside this session (Vercel domain settings,
   not code). Confirm `avidara.co.za` (no www) 301-redirects to `https://www.avidara.co.za`, since
   the sitemap and all canonical tags standardize on the www form.

---

## Important Patterns

### Hash link navigation
Next.js App Router drops the hash from `/#hash` links on client-side navigation. `Navbar.tsx`'s
`handleHashLink` works around this - but the fix is smarter than just "navigate home and scroll":
it first checks whether the target id (e.g. `book`) already exists on the **current** page (every
industry page, Consult, and Pricing render their own local `<CTA id="book">`), and only navigates
to the homepage first if the section genuinely isn't present locally. Don't regress this to a
blind "always navigate home" - that was a real sitewide bug that silently discarded the page's own
industry-scoped booking context.

For a brand-new in-page CTA that links to a section on the *same* page (e.g. an industry page's
own hero linking to its own `<CTA id="book">` further down), a plain relative `href="#book"`
(no leading slash, no handler needed) is the correct and simpler pattern - see `IndustryHero.tsx`.
Only links that might be clicked from a *different* page need the `/#hash` + `handleHashLink` form.

### Navbar on non-hero pages
Pass `alwaysOpaque` prop to avoid a transparent navbar on pages without a dark hero:
```tsx
<Navbar alwaysOpaque />
```
`photoHero` is for the homepage's specific full-bleed photo hero (forces light nav text/logo until scrolled).

### Section anchors
Use `scrollMarginTop: 88` (inline) or `scroll-mt-20` (Tailwind) on anchor elements to clear the fixed navbar.

### Git
- Develop on this session's designated branch, **always also sync to `main`** - but via a
  **cherry-pick**, not a merge: checkout a temp branch from `origin/main`, cherry-pick the commit(s),
  resolve any conflicts (`main` accumulates its own independent blog-automation commits), verify
  (em-dash sweep + brace/paren balance), push to `main`, delete the temp branch, switch back.
- Before every sync to `main`, `git fetch origin main` and check for new commits since the last
  sync - if blog-automation posts landed, check them for em-dashes and duplicate topics (see Blog
  Automation above) and fold any cleanup into the same sync.
- Do NOT create PRs unless explicitly asked.
- Verify changes against a live dev server (`npm run dev`, actual HTTP requests / Playwright
  screenshots) before pushing, not just by reading the diff - this has caught real rendering bugs
  (a hydration error from `<head>`-less elements, a CSS summary-table truncation bug) that a code
  read alone wouldn't surface.
