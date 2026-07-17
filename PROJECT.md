# IM Vision — Project Handbook

> Read this first. It is the single source of truth for how this project is built, how it deploys, and the landmines that have already bitten us. Keep it updated when you change architecture, conventions, or the deploy pipeline.

## 1. What this is

Marketing website for **IM Vision**, a premium European LED‑display company. The site must make five things instantly clear: IM Vision **buys/sells**, **rents**, **installs**, **services**, and **operates LED displays across Europe**.

- **Bilingual:** English (default, at `/`) and Swedish (at `/sv/…`).
- Marketing site with a **thin server layer** (one App Router API route for form submissions). No database, no logged‑in users. Runs on Vercel's Next.js serverless runtime.
- Repo: `github.com/Ivanmartic2026/imvision-website`, branch `main`.
- Production domain: **imvision.se** (see §7 — not yet pointed at this project).

## 2. Tech stack

| Area | Choice |
|---|---|
| Framework | **Next.js 16.2.10**, App Router, **Vercel server runtime** (NOT static export). Pages are static‑rendered; `/api/contact` is a serverless function. |
| Email | **Resend** (`resend`) — form submissions emailed server‑side from `/api/contact` |
| Runtime | React 19.2.4 |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"` in `globals.css`, tokens via `@theme inline`) |
| Animation | `motion` (Framer Motion) + GSAP + **Lenis** smooth scroll |
| Forms | `react-hook-form` + `zod` |
| Icons | `lucide-react` |
| Hosting | **Vercel** (Next.js server runtime). ⚠️ The old `deploy-imclaw.sh` rsync‑to‑nginx path is retired — a static file server can't run the `/api/contact` function. |

### ⚠️ "This is NOT the Next.js you know"
This Next version has breaking changes vs. older training data. **Before writing Next‑specific code, read the relevant guide in `node_modules/next/dist/docs/`.** (This is also stated in `AGENTS.md`.)

## 3. Commands

```bash
npm run dev            # local dev (next dev)
npm run build          # next build → server build in .next/
npm run start          # run the production server locally — needed to test /api/contact
npx vercel --prod      # deploy to Vercel (serverless; CLI, not auto on git push)
```

## 4. Structure

```
src/
├─ app/
│  ├─ layout.tsx            # root: <html>, metadata (title template, OG, robots,
│  │                        #   Google verification via env), site-wide JSON-LD,
│  │                        #   providers (SmoothScroll, LanguageGate, Analytics)
│  ├─ page.tsx              # EN home (exports HomePage, reused by /sv)
│  ├─ sitemap.ts            # sitemap.xml (see §6)
│  ├─ robots.ts             # robots.txt metadata route (see §8 — must survive build)
│  ├─ not-found.tsx         # 404 (auto noindex)
│  ├─ {about,contact,rental,sales,service,support,projects,privacy,terms}/page.tsx
│  ├─ projects/[slug]/page.tsx   # generateStaticParams + generateMetadata
│  └─ sv/…                  # Swedish mirror of every route
├─ components/
│  ├─ layout/     Header, Footer, PageHeader
│  ├─ sections/   Hero, BusinessIntro, Technology, ServicesPreview, PortfolioPreview,
│  │              StoryTimeline, ProjectSlider, ContactCTA, ContactForm, ServiceForm,
│  │              Stats, TrustStrip … + per-page content in
│  │              sections/{about,contact,projects,sales,service,support}/
│  ├─ providers/  SmoothScroll (Lenis + MotionConfig reduced-motion),
│  │              LanguageGate (fullscreen EN/SV chooser), Analytics (GA4 + consent)
│  ├─ seo/        JsonLd.tsx  (renders <script type="application/ld+json">)
│  ├─ ui/         Button, LanguageSwitcher, SectionLabel, form/ (Input, Select, …)
│  └─ effects/    Reveal, StaggerReveal, Counter, MagneticButton, LedGrid
└─ lib/
   ├─ seo.ts          # ⭐ metadata + JSON-LD helpers (see §6)
   ├─ i18n.ts         # Locale type + localizedHref()
   ├─ projects.ts     # project data (EN) — has `verified` flag (see §6)
   ├─ projects-sv.ts  # Swedish project copy
   ├─ content/sales.ts# sales page copy
   └─ utils.ts        # cn() classnames helper
public/images/photon-material/  # AI-rendered hero/section imagery (recompressed, WebP-worthy)
public/images/projects/         # project photos
```

## 5. Core conventions

### i18n / bilingual
- `Locale = "en" | "sv"`. EN lives at root, SV under `/sv`. Every page has a `sv/` twin.
- Use **`localizedHref(locale, "/path/")`** for internal links — it prefixes `/sv` for Swedish.
- Most components take a `locale` prop and switch copy inline (`locale === "sv" ? … : …`).
- **`LanguageGate`** (providers) is a fullscreen chooser that asks EN/SV on first visit.
- **`lang` attribute:** the root `<html lang="en">` is static; Swedish pages are corrected client‑side (LanguageGate / a pre‑hydration script / Header effect). A fully static per‑locale `lang` would need route‑group layouts — not done (acceptable: Google renders JS).

### Design system (`src/app/globals.css`)
- **Dark by default:** `--background:#070807`, `--text-primary:#f2f1ec`, `--text-secondary:#a3aaa6`, `--text-muted:#808983`, `--accent:#91a9a1`.
- **`.theme-light`** = light bands (cream bg). Inside it `--accent` is **darkened to `#4f6f66`** so small accent text stays ≥4.5:1 (WCAG AA).
- **`.theme-dark`** = reset tokens back to dark, for a dark panel nested inside a `.theme-light` section (e.g. the `Technology` band). Use it whenever you put dark UI in a light section.
- **Button `primary`** background is pinned to literal `#91a9a1` (NOT `--accent`) so its dark text keeps contrast on `.theme-light` bands. Don't change it back to `bg-accent`.
- Fonts (`app/fonts/index.ts`): **Manrope** loaded once as a variable font → drives both `--font-body` and `--font-heading`; IBM Plex Mono → `--font-plex-mono`; Fraunces (italic) for accent words (`lib/fonts.ts`).
- Accessibility target: **WCAG 2.2 AA / Lighthouse 100**. Reduced motion is honored globally via `<MotionConfig reducedMotion="user">` in SmoothScroll. Keep 1 `<h1>` per page, alt text on all images, ARIA on form errors.

### Forms
- `ContactForm` and `ServiceForm` (react-hook-form + zod). They **POST to an endpoint if one is set**, else fall back to a `mailto:` link. Confirmation copy is honest about which happened. Honeypot spam trap included.
- **Both forms POST `FormData` (fields + file attachments) to the App Router route `src/app/api/contact/route.ts`**, which emails the enquiry to `sales@imvision.se` via **Resend** (`src/lib/email.ts`) with the files attached. No `mailto:` on submit. `replyTo` = the submitter's email. Honeypot + server‑side required‑field validation. Success/error states are shown in‑page; the submit button disables + shows a spinner while sending.
- The `mailto:` **links** that remain (footer, "prefer email" card, privacy/terms pages) are intentional "email us" links — not form submissions.
- ⚠️ **Attachments:** Vercel serverless caps request bodies (~4.5 MB). The route rejects >4 MB total attachments with a clear error. For larger files, move to Vercel Blob and email links (future work).
- Requires `RESEND_API_KEY` (see §9) to actually send.

## 6. SEO (this is a big part of the project)

Everything routes through **`src/lib/seo.ts`**. Use the helpers; don't hand‑roll meta tags.

- **`pageMeta({ locale, path, title, description, image?, absoluteTitle? })`** → returns Next `Metadata` with **canonical + hreflang** (`en`/`sv`/`x-default`), Open Graph, Twitter. `path` is the EN path (e.g. `"/sales/"`); it derives the SV URL itself. Every page's `export const metadata` uses this.
  - The root layout sets `title.template = "%s | IM Vision"`. **It does NOT apply to the home page** (same segment) — so `app/page.tsx` uses `absoluteTitle: true` with the brand in the title. Keep home titles ≤ ~60 chars.
- **JSON-LD** via `<JsonLd data={…}>` (`components/seo/JsonLd.tsx`):
  - Site‑wide `siteGraphLd()` (Organization + LocalBusiness + WebSite) — rendered once in `layout.tsx`.
  - `pageBreadcrumbLd(locale, path, name)` — on every subpage.
  - `serviceLd(...)` — on sales / rental / service (service via `ServicePageContent`; **don't double‑add** it in the page wrapper).
  - `faqLd(items)` — on `/support`.
- **`robots.ts`** → generates `dist/robots.txt` (allow all + Sitemap + Host). See §8.
- **`sitemap.ts`** → `dist/sitemap.xml`. It **only lists indexable pages**: `projects.filter(p => p.verified === true)`. Unverified/draft projects are `noindex` (set in their `generateMetadata`) and **must stay out of the sitemap**. Each URL carries `alternates.languages` (hreflang).
- **NAP** (name/address/phone) lives in `CONTACT` in `seo.ts`: IM Vision · sales@imvision.se · +46 8 505 204 80 · Spånga, Stockholm, SE. Keep it identical everywhere (footer, schema, Google Business Profile).
- **`SOCIAL_PROFILES`** in `seo.ts` (currently empty) feeds `sameAs` — paste LinkedIn/Instagram/etc. URLs to strengthen the entity.

## 7. Deployment

- **Vercel** (Next.js server runtime, auto‑detected). `vercel.json` holds a `www.imvision.se → imvision.se` redirect and security headers (X‑Frame‑Options, X‑Content‑Type‑Options, Referrer‑Policy). No `outputDirectory`/`buildCommand` overrides — Vercel builds the Next app and runs `/api/contact` as a serverless function.
- **Deploys are currently manual:** `npx vercel --prod`. A GitHub push does **not** auto‑deploy (the Git integration isn't connected). To change that: Vercel → Project → Settings → Git → connect `Ivanmartic2026/imvision-website`.
- **Domain not connected yet:** `imvision.se` still serves an OLD site. To go live: Vercel → Settings → Domains → add `imvision.se` + `www`, set DNS at the registrar. Until then, verify changes on the deployment URL that `npx vercel --prod` prints.
- Canonical/hreflang/OG all point to `https://imvision.se` (correct — they resolve once the domain is connected).

## 8. ⚠️ Critical gotchas (things that already broke)

1. **Do NOT re‑add `output: "export"`.** The site left static export so the `/api/contact` route can run server‑side. Re‑enabling export silently strips API routes and breaks the forms.
2. **robots.txt is a metadata route** (`app/robots.ts`) — served by the server. (Historically a static `public/robots.txt` was 404'd by Vercel's adapter and a `clean:dist` script deleted the generated one — both problems are gone now that we're on the server runtime; `clean:dist` was removed.)
3. **`<Link prefetch>` is disabled** on nav (Header/Footer) via `prefetch={false}` — a leftover from the static‑export era. Harmless on the server runtime; can be re‑enabled if desired, but leaving it is fine.
4. **`images.unoptimized: true`** is still set (images in `public/` are pre‑compressed; the hero LCP image is preloaded in `app/page.tsx`). You may now enable Next image optimization if wanted.
5. **`trailingSlash: true`** — always link with a trailing slash (`/sales/`).
6. **Draft projects:** `verified !== true` ⇒ `noindex` **and** excluded from the sitemap. Keep both in sync.
7. **`/api/contact` + `trailingSlash`:** forms POST to `/api/contact/` (with the slash) to avoid a 308 redirect hop. The route is `runtime = "nodejs"` (needs Buffer for attachments).

## 9. Environment variables (Vercel → Settings → Environment Variables)

All optional — features stay inert until set, then activate on redeploy:

| Var | Effect |
|---|---|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Renders `<meta name="google-site-verification">` (Search Console HTML‑tag method). |
| `NEXT_PUBLIC_GA_ID` (`G-XXXXXXX`) | Loads GA4 **after** cookie consent (opt‑in, IP‑anonymised). No GA ID ⇒ no cookies, no banner. |
| **`RESEND_API_KEY`** | **Required for the forms to send email** (from resend.com). Without it, `/api/contact` returns 500 and the form shows its error state. |
| `MAIL_TO` | Recipient. Defaults to `sales@imvision.se`. |
| `MAIL_FROM` | Verified Resend sender, e.g. `IM Vision <noreply@imvision.se>`. Defaults to Resend's onboarding sender (testing only — verify `imvision.se` in Resend for production). |

## 10. Current status

**Done & deployed** (verified on the live Vercel deploy): full technical SEO (canonical, hreflang, OG, JSON‑LD graph, breadcrumbs, Service/FAQ schema), robots.txt + sitemap correct, WCAG AA (Lighthouse A11y/Best‑Practices/SEO 100), CLS 0, fonts optimized, images −52%, GA4+consent scaffold, Google‑verification wiring.

## 11. Outstanding (needs the owner / accounts)

1. **Connect `imvision.se`** to this Vercel project (+ DNS). *Nothing is live on the real domain until this is done.*
2. **Google Search Console** — verify domain, submit `https://imvision.se/sitemap.xml`.
3. **GA4** — create property, set `NEXT_PUBLIC_GA_ID`.
4. **`SOCIAL_PROFILES`** — add real social URLs for `sameAs`.
5. **Form email** — set `RESEND_API_KEY` (+ verify `imvision.se` in Resend, set `MAIL_FROM`). The forms already POST server‑side; they just need the key to actually send.
6. **Google Business Profile** — create/claim (local SEO).
7. **Real installation photography** — replace "concept visual" AI renders (trust + image SEO).
