# LCP-analys — Arbetsström A

**Datum:** 2026-07-30 · **Branch:** `seo/phase-2-lcp-content-local` · **Bas:** `a191f20`
**Miljö:** lokal production build (`next build` + `next start -p 3111`), Lighthouse 13.4.1,
`--form-factor=mobile --throttling-method=simulate`, headless Chrome, samma maskin och
version för samtliga körningar. **3 körningar per sida och variant, medianvärden.**

> ⚠️ **Allt nedan är labbdata.** Ingen mätning gjordes mot `imvision.se` — produktionsdomänen
> är skyddad av Vercels Security Checkpoint. Se avsnittet *Production verification pending*
> i [`SEO-AUDIT-AND-IMPLEMENTATION.md`](./SEO-AUDIT-AND-IMPLEMENTATION.md).

**Sanity-kontroll före varje mätserie:** verifierat att sidan som mättes var IM Vision-sidan
och inte en challenge- eller felsida (titelkontroll + `_next`-markörer i HTML:en).

---

## 1. Slutsats först

**Hypotesen att `Reveal` och `StaggerReveal` håller innehåll ovanför vikningen på
`opacity: 0` tills JavaScript kört är motbevisad.** Ingen kodändring har genomförts, eftersom
ingen testad ändring förbättrade median-LCP.

---

## 2. Test av hypotesen

`Reveal` och `StaggerReveal` använder båda `initial="hidden"` med `whileInView`, och den
dolda varianten är `opacity: 0`. Det stämmer — och `opacity:0` **finns** i den
servergenererade HTML:en:

| Sida | `opacity:0` i server-HTML |
|---|---:|
| `/` | 28 |
| `/sales/` | 56 |
| `/rental/` | 22 |
| `/service/` | 7 |
| `/projects/the-curve/` | 2 |

Men den avgörande frågan är *vilka* element som är dolda. Jag parsade HTML:en före hydration
och gick uppåt genom förfäderna för varje `<h1>` och första CTA:

| Sida | H1 dold? | H1 | Första CTA dold? |
|---|---|---|---|
| `/` | **nej** | "Light, built into space." | nej |
| `/sales/` | **nej** | "LED built into architecture." | nej |
| `/rental/` | **nej** | "Built for the moment." | **ja** |
| `/service/` | **nej** | "We stay with you after install." | nej |
| `/support/` | **nej** | "We're here when you need us." | **ja** |
| `/projects/the-curve/` | **nej** | "The Curve" | nej |
| `/contact/` | **nej** | "Contact IM Vision" | nej |
| `/sv/` | **nej** | "LED som formar upplevelsen." | nej |
| `/sv/sales/` | **nej** | "LED som blir en del av arkitekturen." | nej |
| `/sv/service/` | **nej** | "Vårt ansvar slutar inte vid installationen." | nej |

**Ingen rubrik ovanför vikningen är dold.** `opacity:0` sitter på element under vikningen —
projektkort, dekorativa blur-cirklar — samt på första CTA på två sidor.

Mätningen bekräftar samma sak: **element render delay är 43–185 ms**, inte sekunder.

---

## 3. Baslinje (median av 3 körningar)

| Sida | Perf | LCP | FCP | CLS | TBT | Render delay | LCP-element |
|---|---:|---:|---:|---:|---:|---:|---|
| `/` | 79 | 5 711 ms | 903 ms | 0,000 | 8 ms | 143 ms | Cookie-bannerns text |
| `/sales/` | 86 | 4 209 ms | 903 ms | 0,000 | 8 ms | 53 ms | Hjältebild |
| `/rental/` | 89 | 3 756 ms | 903 ms | 0,000 | 8 ms | 55 ms | Hjältebild |
| `/service/` | 90 | 3 685 ms | 903 ms | 0,000 | 16 ms | 79 ms | H1 (text) |
| `/projects/the-curve/` | 90 | 3 634 ms | 903 ms | 0,000 | 10 ms | 70 ms | Hjältebild |

**FCP är 903 ms och identisk på varje sida. CLS är 0. TBT är 8–16 ms.**

Det som *inte* är problemet: render-blockerande resurser (inga), layoutförskjutning (noll),
huvudtrådsblockering (försumbar), dolda rubriker (inga), saknad bildprioritering (`priority`
är satt och Next genererar korrekt `<link rel="preload" as="image">` för hjältebilden på
`/sales/`, `/rental/` och projektsidorna).

Vad Lighthouse faktiskt pekar på för `/sales/`: **784 KB över 37 requests**, med
`unused-javascript` ~1 050 ms. Största enskilda resurs är `gtag.js` på **175 KB** — 22 % av
sidvikten.

---

## 4. Experiment: skjut upp gtag.js

**Ändring:** `strategy="afterInteractive"` → `"lazyOnload"` för både `gtag.js` och
`ga4-init` i `src/components/providers/Analytics.tsx`. Consent Mode-skriptet lämnades först
och orört, så `window.gtag` fanns kvar och anrop hade köats i `dataLayer`.

**Resultat (median av 3 körningar per sida):**

| Sida | LCP baslinje | LCP experiment | Δ | Perf bas/exp |
|---|---:|---:|---:|---|
| `/` | 5 711 ms | 5 710 ms | −1 ms | 79 / 79 |
| `/projects/the-curve/` | 3 634 ms | 3 635 ms | +1 ms | 90 / 90 |
| `/rental/` | 3 756 ms | 3 757 ms | +1 ms | 89 / 89 |
| `/sales/` | 4 209 ms | 4 359 ms | **+151 ms** | 86 / 85 |
| `/service/` | 3 685 ms | 3 685 ms | −1 ms | 90 / 90 |

**Ingen förbättring — och en försämring på `/sales/`.** TBT gick svagt upp (8 → 11 ms).

Rimlig förklaring: `afterInteractive` laddar redan gtag efter hydration, alltså utanför den
kritiska vägen för LCP i Lighthouses simuleringsmodell. Att skjuta den ännu längre fram
flyttar inget som påverkar LCP.

**Ändringen är återställd.** Enligt uppdragets regel implementeras lösningen bara om
median-LCP förbättras tydligt.

---

## 5. Varför jag inte gick vidare med fler experiment

De lokala siffrorna skiljer sig **kvalitativt** från de produktionsmätningar som gjordes
tidigare samma dag, innan Vercel-checkpointen slog till:

| | Lokalt (idag) | Produktion (tidigare idag) |
|---|---|---|
| Render delay `/service/` | 79 ms | **2 097 ms** |
| Render delay `/contact/` | — | **1 612 ms** |
| TTFB | ~4 ms | 53–131 ms |

Lokalt finns ingen verklig nätverkslatens och TTFB är i praktiken noll, så den simulerade
LCP:n domineras av Lighthouses modell snarare än av sidans verkliga beteende. Att optimera
mot en siffra som inte reproducerar produktionens beteende vore att optimera mot fel mål.

**LCP-arbetet är därför pausat tills produktionsdomänen går att mäta igen.** Det som behövs
är render delay-uppdelningen från produktion, som var det ursprungliga skälet att misstänka
animationerna — och som lokalt inte reproduceras.

---

## 6. Vad detta betyder för handlingsplanen

Posten "LCP är sajtens största tekniska problem, orsakad av reveal-animationer" i
[`SEO-NEXT-STEPS.md`](./SEO-NEXT-STEPS.md) **stämmer inte i sin nuvarande formulering** och är
korrigerad där. LCP är fortfarande hög i produktionsmätningen, men orsaken är inte fastställd,
och den föreslagna åtgärden — att ändra rörelsedesignen — saknar stöd i data.

Det betyder också att den **visuella designändring** som föreslogs som P1 inte längre är
motiverad. Ingen designändring bör göras på denna grund.

### Kvarstående kandidater att testa när produktion är mätbar

1. Render delay-uppdelning per sida i produktion — reproducerar den 2 097 ms igen?
2. Om ja: isolera om det är typsnittsswap, hydrering eller consent-bannern.
3. Cookie-bannern är LCP-element på `/` — den är klientrenderad och kan inte måla före
   hydration. Det är en genuin kandidat, men den rör GDPR-känslig kod och kräver eget beslut.
4. `unused-javascript` ~1 050 ms och 784 KB totalvikt — bundlingsanalys, inte en snabbfix.

---

## 7. Uppföljning i produktion 2026-07-30 (efter release)

När Vercel-checkpointen släppte kördes **en** mätning på `https://imvision.se/service/`.

**Render delay reproduceras: 2 233 ms** (tidigare 2 097 ms). LCP 5,2 s, FCP 3,1 s, CLS 0,
TBT 20 ms, TTFB 65 ms. LCP-element: H1-texten *"We stay with you after install."*

Detta ändrar **inte** slutsatsen i §1–2. Två saker gäller samtidigt:

- Symptomet är verkligt och reproducerbart i produktion.
- Den hypotes som §2 testade är fortfarande motbevisad: H1 är inte `opacity: 0` i
  server-HTML:en, så reveal-animationerna döljer den inte.

Den lokala miljön reproducerar inte beteendet (79 ms mot 2 233 ms). **Orsaken kan därför
bara isoleras mot produktion, en hypotes i taget.** Ingen ändring har gjorts och ingen
designändring rekommenderas på nuvarande underlag.
