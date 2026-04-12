# Avidara — Project Brief for Claude

## What is Avidara
A compliance intelligence platform serving multiple regulated industries in South Africa.
Independent external review layer — finds what internal teams miss before regulators do.
One methodology, multiple industries, rulebook changes per vertical.

**Live URL:** avidara.co.za  
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, deployed on Vercel  
**Repo:** stevher/avidara_beta  
**Working branch:** `claude/build-website-OXRqL` (also push to `main`)

---

## Project Structure
```
apps/
  frontend/          ← Next.js app (all website work happens here)
    src/
      app/           ← Pages (App Router)
      components/
        landing/     ← All landing page sections
        industry/    ← IndustrySelectorGrid
      content/blog/  ← Blog MDX posts
```

---

## Industries Served (homepage)
1. Pharmaceuticals (primary — deepest expertise)
2. Medical Devices
3. Consumer Health (Nutraceuticals, Cosmetics, OTC)
4. Veterinary
5. Transport & Logistics (Dangerous Goods)

---

## Key Files
| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage — hero + industry selector + platform/how-it-works sections |
| `src/components/landing/Navbar.tsx` | Site nav with `alwaysOpaque` prop + hash link handler |
| `src/components/landing/FAQ.tsx` | FAQ accordion with category filter |
| `src/app/faq/page.tsx` | Standalone FAQ page |
| `src/app/sample-report/page.tsx` | Sample report page (uses `<Navbar alwaysOpaque />`) |
| `src/app/sample-report/SampleReportClient.tsx` | Report viewer with fixed toolbar + section anchors |
| `src/app/layout.tsx` | Root layout — includes Vercel Analytics |
| `src/app/sitemap.ts` | Dynamic sitemap including blog posts |

---

## What Has Been Built / Done
- Full marketing site: Hero, Platform, How It Works, Why Avidara, CTA, Footer
- Industry selector grid on homepage with 5 verticals
- Navbar: transparent → opaque on scroll, hash link handler (fixes Next.js dropping anchors), `alwaysOpaque` prop
- Sample report page: fixed toolbar below navbar with section jump links + print button
- FAQ page with category filter accordion
- Blog with MDX posts
- Vercel Analytics installed (`@vercel/analytics/next` in layout)
- Dynamic sitemap (auto-includes blog posts)
- Cookie banner
- Chat widget
- Dark/light theme toggle
- `py-20` section padding (was `py-32`, caused large gaps)
- `scroll-mt-20` on all anchor sections
- Hero CTA: 3 buttons — "Book a review" (primary), "See how it works" (secondary), "See a sample report" (dashed emerald ghost border, tertiary)
- `id="industries"` anchor moved to industry selector div (was on hero section, causing wrong scroll target)

---

## Design Tokens (CSS vars)
```
--bg, --bg2       background levels
--surf, --surf2   surface/card levels
--b, --b2         border levels
--t, --t2, --t3   text levels (t3 = dimmest)
--indigo          #4f46e5 (primary brand)
--indigo-light    lighter indigo
--indigo-deep     darker indigo
--emerald         #10b981 (secondary accent)
--amber           #f59e0b
--glow            subtle background glow
--shadow          card hover shadow
--font-fraunces   display/heading font
```

---

## Pending Tasks
1. **FAQ rewrite** — FAQ is pharma-centric but site now serves 5 industries. Needs:
   - Update metadata: remove "Pharmaceutical Regulatory Services" framing
   - Update standalone page subtitle (currently mentions "pharma companies" only)
   - Rename category "Pharma & Regulatory" → "Regulatory & Compliance"
   - Update "About & Services" answers to reflect multi-industry scope
   - Add "Industries" category with Q&As for each vertical (Pharma, Medical Devices, Consumer Health, Veterinary, Transport)
   - Update "Who works with Avidara?" to cover all client types
   - Keep AI, Data Security, Engagement & Pricing categories largely unchanged

2. **Social proof section** — User doesn't have testimonials/clients yet. Build placeholder when ready.

3. **Admin section** — Deferred. Clerk auth + leads/chat/post-review panels for 2 users (owner + sales/marketing director).

---

## Important Patterns

### Hash link navigation
Next.js App Router drops hash from `/#hash` links. Navbar has a `handleHashLink` workaround using `scrollIntoView`. All hash links must use `onClick={(e) => handleHashLink(e, link.href)}`.

### Navbar on non-hero pages
Pass `alwaysOpaque` prop to avoid transparent navbar on pages without a dark hero:
```tsx
<Navbar alwaysOpaque />
```

### Section anchors
Use `scrollMarginTop: 88` (inline) or `scroll-mt-20` (Tailwind) on anchor elements to clear the fixed navbar.

### Git
- Always push to both `claude/build-website-OXRqL` and `main`
- Do NOT create PRs unless explicitly asked
