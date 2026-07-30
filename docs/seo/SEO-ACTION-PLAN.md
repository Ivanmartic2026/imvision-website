# SEO-handlingsplan — imvision.se

**Uppdaterad:** 2026-07-30 med verklig Search Console-data · **Branch:** `seo/full-audit-and-optimization`
**Underlag:** [`SEO-AUDIT-AND-IMPLEMENTATION.md`](./SEO-AUDIT-AND-IMPLEMENTATION.md)
**GSC-property:** `sc-domain:imvision.se` (domänproperty) · **Perioder:** 28 d (2026-06-30 – 07-27) och 3 mån (2026-04-28 – 07-27)

Status: `Klar` = implementerad och verifierad · `Blockerad` = kräver beslut eller underlag från dig · `Att göra` = redo.
Förväntad effekt anges som **riktning med evidensstyrka**, aldrig som utlovad siffra.

---

## ⚠️ Största kvarvarande tekniska problemet: LCP

| Evidens | Berörd URL | Rekommenderad ändring | Förväntad riktning | Insats | Status | Beroende |
|---|---|---|---|---|---|---|
| Lighthouse 13.4.1 mot produktion, mobil: **LCP 4,4–6,0 s** mot gränsvärdet 2,5 s. `lcp-breakdown-insight` visar att LCP-elementet är **text** och att tiden är *element render delay*: `/service/` 2 097 ms, `/contact/` 1 612 ms. CLS 0, TBT 10–40 ms, TTFB 53–131 ms — allt annat är utmärkt | `/`, `/service/`, `/contact/` och alla sidor med reveal-animation | Låt innehåll **ovanför vikningen** måla direkt i stället för att starta på `opacity: 0` i `Reveal`/`StaggerReveal`. Behåll animationen för allt under vikningen | Störst enskild prestandavinst som finns. **Hög** evidens — uppmätt orsakssamband (sidan utan animation får 95/2,9 s, sidan med mest får 73/5,1 s) | 4 h | **Blockerad** | **Designbeslut** — ändrar sajtens synliga rörelse, som `PROJECT.md` behandlar som medvetet val |
| Samma körning: `unused-javascript` ~281 KiB / 1 350 ms; `gtag.js` är 175 KB, största enskilda resursen | Alla sidor | Överväg att skjuta upp gtag.js till efter LCP | Medel evidens. Rör GDPR-känslig kod | 2 h | **Blockerad** | Får inte bryta Consent Mode v2 |

**Not:** LCP kan inte verifieras i fält — CrUX saknar data för sajten (§13.6). Uppföljning
måste ske med Lighthouse-labbkörningar tills trafiken ökar.

---

## Implementerat i denna branch

| Prio | Område | Evidens från GSC | Fråga / URL | Klick | Expo | CTR | Pos | Ändring | Riktning | Insats | Status |
|---|---|---|---|---:|---:|---:|---:|---|---|---|---|
| P1 | Redirects | Sidrapport 3 mån + indexrapport "Hittades inte (404)": 19 URL:er, validering misslyckades | `/contact-us` | 21 | 594 | 3,5 % | 6,3 | 308 → `/contact/` | Återvinner klick som idag går till 404. **Hög** evidens. 2–6 v efter recrawl | 2 h totalt | **Klar** `9b532d7` |
| P1 | Redirects | Samma | `/service-and-support` | 11 | 326 | 3,4 % | 7,5 | → `/support/` | Som ovan | — | **Klar** `9b532d7` |
| P1 | Redirects | Samma | `www/felanmalan` | 9 | 196 | 4,6 % | 3,1 | → `/sv/support/` | Som ovan | — | **Klar** `9b532d7` |
| P1 | Redirects | Samma | `www/installation` | 5 | 298 | 1,7 % | 4,5 | → `/service/` | Som ovan | — | **Klar** `9b532d7` |
| P1 | Redirects | Samma | `www/inspiration` | 2 | 366 | 0,5 % | 6,3 | → `/projects/` | Som ovan | — | **Klar** `9b532d7` |
| P1 | Redirects | Samma | `/our-projects` | 0 | 166 | 0 % | 7,4 | → `/projects/` | Som ovan | — | **Klar** `9b532d7` |
| P2 | Redirects | Samma | `/rentals`, `/cookies`, `/term`, `/services`, `/work-with-us`, `/rental-conditions`, `rental-agreement.pdf` | 0 | 51 | 0 % | — | → närmaste sida | Städar indexet | — | **Klar** `9b532d7` |
| P1 | Indexering | URL-inspektion: *"Webbadressen är okänd för Google"*, inga hänvisande sitemaps, ingen hänvisande sida, aldrig genomsökt | `/sv/servicevillkor/` | 0 | 0 | — | — | Sitemap-post + footer-länk | Från noll upptäcktsvägar till två. **Hög** evidens | 50 min | **Klar** `3080395`, `28f471d` |
| P2 | Indexering | Sitemap listade 42 av 47 indexerbara URL:er. *(Nyans: `/terms/` visade sig ändå indexerad — footer-länken räckte)* | `/privacy/`, `/terms/` × 2 språk | 0 | 10 | — | — | Lades till i sitemap | Fullständig täckning. Medel evidens | 15 min | **Klar** `3080395` |
| P2 | Metadata | Titlar på 19–20 tecken utan sökord | `/projects/`, `/support/`, `/contact/` × 2 språk | 0 | 34 | 0 % | 4,3–25,6 | Sökordsbärande titlar < 60 tecken | CTR-lyft. **Medel** evidens (låg volym att mäta på) | 1 h | **Klar** `ea6c4a2` |
| P1 | Trasiga länkar | Språkväxlaren pekade mot `/servicevillkor/` (404) | `/sv/servicevillkor/` | — | — | — | — | `SV_ONLY_PATHS` i `getEnglishPath()` | Eliminerar 404 i navigation. Hög evidens | 30 min | **Klar** `88f1603` |
| P1 | GEO | Lighthouse: produktion Agentic Browsing 100, `main` 67 — `llms.txt` genererade nakna URL:er i git medan produktion serverade markdown-länkar | `/llms.txt` | — | — | — | — | Lyfte in produktionsversionen från KimiV2 | Förhindrar regression av AI-sökbarhet. **Hög** evidens — uppmätt | 15 min | **Klar** |
| P2 | Metadata | `södertull malmö`: 52 expo, **0 klick**, position 12,2 mot `/sv/projects/sodertull-city/` vars titel var enbart "Södertull City" | 18 projektsidor | 0 | ~90 | 0 % | 2–35 | `projectTitle()` bygger titel av **befintliga** fält (`title` + `location`): "Södertull City — LED-skärm, Malmö" | CTR + long-tail på ortsökningar. **Medel** evidens | 1 h | **Klar** |
| P1 | Mobil | Regression jag själv införde: +47px overflow på alla `/sv/`-sidor | Alla `/sv/*` | — | — | — | — | `flex-wrap` i footern | Återställer mobilvyn. Hög evidens | 15 min | **Klar** `ad38d2a` |

---

## Blockerade av affärsbeslut

| Prio | Evidens | Fråga / URL | Klick | Expo | CTR | Pos | Rekommenderad ändring | Riktning | Insats | Status | Beroende |
|---|---|---|---:|---:|---:|---:|---|---|---|---|---|
| **P1** | Näst största avsikten efter varumärket. Sajten har ingen kundportal; `admin.imvision.se` (157 expo) och `new-admin.imvision.se` (18 expo) finns och rankar | `www/login` · frågan `imvision login` | 3 | 487 | 0,6 % | 10,4 | Bestäm destination: kundportal, supportsida med portallänk, eller behåll 404. **Redirect till en marknadsföringssida vore soft 404 — gör inte det** | Beror på beslut. Hög evidens för att problemet finns | 30 min när beslutat | **Blockerad** | Finns en kundportal? Var? |
| P3 | Samma avsikt, mindre volym | `www/register`, `www/forgot-password` | 0 | 16 | 0 % | 4,6 | Följer beslutet ovan | — | 10 min | **Blockerad** | Som ovan |

---

## Quick wins — hög nytta, låg insats

| Prio | Evidens | Fråga / URL | Klick | Expo | CTR | Pos | Rekommenderad ändring | Riktning | Insats | Status | Beroende |
|---|---|---|---:|---:|---:|---:|---|---|---|---|---|
| P1 | Sitemap läst 2026-07-29 med 42 URL:er; branchen ger 47 | `sitemap.xml` | — | — | — | — | Efter deploy: skicka in på nytt + begär indexering av `/sv/servicevillkor/` | Snabbare recrawl. Hög evidens | 10 min | Att göra | Deploy |
| P1 | Indexrapport: 19 URL:er under "Hittades inte (404)", **validering misslyckades** | — | — | — | — | — | Efter deploy: klicka **Validera korrigering** i GSC | Rensar 404-posten. Hög evidens | 5 min | Att göra | Deploy + `9b532d7` |
| P2 | 52 exponeringar, noll klick, sida 2. Sidan är verifierat indexerad och tekniskt frisk — det är ett positionsproblem, inte ett tekniskt | `södertull malmö` → `/sv/projects/sodertull-city/` | 0 | 52 | 0 % | 12,2 | Fördjupa sidan (idag ~80 ord) med plats, mått, år; intern länk från `/sv/projects/` | Position 12 → sida 1 är realistiskt. **Medel** evidens | 3 h | **Blockerad** | Projektfakta |
| P2 | 11 svenska projektsidor har beskrivningar på 40–69 tecken mot Googles ~155 | `/sv/projects/*` | 0 | ~40 | 0 % | 2–35 | Utöka beskrivningarna. *(Titlarna är redan åtgärdade via `projectTitle()`)* | Bättre SERP-snippet. Medel evidens | 2 h | **Blockerad** | Projektfakta |
| P3 | `/service/` rankar djupt trots att det är en kärntjänst | `/service/` | 0 | 13 | 0 % | **25,6** | Tydligare sidfokus och intern länkning från `/`, `/sales/`, `/rental/` | Medel evidens | 2 h | Att göra | — |
| P3 | Befintlig overflow vid 320px (reproduceras på produktion) | `/sv/sales/` +10px, `/sv/projects/` +56px | — | — | — | — | Begränsa dekorativa `-right-[12%]`-element | Låg-medel evidens | 1 h | Att göra | Designbeslut |
| P3 | `/_not-found/` svarar 200 på produktion (lokalt korrekt 404); sidan är `noindex` | `/_not-found/` | — | — | — | — | Verifiera Vercel-routing | Låg evidens | 30 min | Att göra | — |

---

## Nästa 30 dagar

| Prio | Evidens | Berörd URL | Klick | Expo | Rekommenderad ändring | Riktning | Insats | Status | Beroende |
|---|---|---|---:|---:|---|---|---|---|---|
| **P1** | **Kommersiell icke-varumärkesefterfrågan är 12 exponeringar på 28 dagar.** 76 % av klicken är varumärke. Projektsidorna är 65–102 ord och utgör halva sajtens URL:er | `/projects/*` | 3 | ~90 | Fördjupa de 5 mest värdefulla till 250–400 ord: mått, pixelavstånd, år, uppdragsgivare, teknisk utmaning | Enda vägen till icke-varumärkestrafik. **Medel** evidens, 2–4 mån | 8 h | **Blockerad** | **Faktaunderlag från dig** |
| P2 | Inga frågor med köpintention rankar över position 10 utom `digital signage installation` (pos 2,0, 1 expo) och `digital display solutions` (pos 2,0, 1 expo) — mikrovolym men rätt avsikt | `/sales/`, `/service/` | 0 | 28 | Bygg ut mot "digital signage" som begrepp, inte bara "LED" — det är så marknaden söker på engelska | Medel evidens | 6 h | Att göra | — |
| P2 | Ingen namngiven person på sajten; ingen `Person`-schema | Hela sajten | — | — | Författar-/expertprofil | Tydligaste E-E-A-T-luckan. Medel evidens | 4 h | **Blockerad** | Vem ska stå som avsändare |
| P3 | CrUX: *otillräcklig data* för både mobil och desktop. Lighthouse saknar Performance-kategorin | — | — | — | Skaffa PageSpeed-API-nyckel för labbmätning över tid | Möjliggör uppföljning. Låg evidens för SEO-effekt | 20 min | **Blockerad** | Ditt godkännande för API-nyckel |
| P3 | 82 % av klicken från Sverige; Kanada 104 expo / 1 klick, USA 73 / 1 — brus, inte efterfrågan | — | — | — | Prioritera svenska/nordiska sökningar före europeisk expansion i innehållet | Medel evidens | — | Att göra | — |

---

## Nästa 90 dagar

| Prio | Evidens | Berörd URL | Rekommenderad ändring | Riktning | Insats | Status | Beroende |
|---|---|---|---|---|---|---|---|
| P2 | Driftavtal syns i portföljen (`ocean-outdoor-operations`, 2 expo, pos 28) men saknar landningssida | ny `/operations/` | Egen sida för drift och underhåll | Lågkonkurrenssegment. Medel evidens, 3–6 mån | 12 h | Att göra | Tjänstebeskrivning |
| P2 | Två `LocalBusiness` i schemat, noll lokala sidor. `herkulesvägen 56` förekommer som fråga (1 expo, pos 9) | ny `/jonkoping/`, `/stockholm/` | Lokala sidor med unikt innehåll — **inte** mallade dubbletter | Lokal synlighet. Medel evidens | 10 h | Att göra | Lokalt innehåll |
| P2 | Nämns som ogjord i `PROJECT.md` §11 | — | Skapa/gör anspråk på Google Business Profile för båda adresserna | Lokal synlighet + NAP. Hög evidens | 2 h | Att göra | Ägarverifiering |
| P3 | Inget redaktionellt innehåll; topical authority saknas helt | ny `/insights/` | 4–6 djupartiklar om permanenta installationer | Medel evidens, 4–8 mån | 30 h | Att göra | Redaktionell kapacitet |
| P3 | Få externa auktoritetslänkar | — | Digital PR mot arkitektur- och retailpress | Låg-medel evidens, hög varians | Löpande | Att göra | PR-resurs |
| P3 | `PROJECT.md` §7/§10/§11 motsägs av produktion (domän kopplad, GA4 aktiv, `SOCIAL_PROFILES` ifylld) | `PROJECT.md` | Uppdatera handboken | Undviker felbeslut. Hög evidens | 1 h | Att göra | — |

---

## Beslut som väntar på dig

1. **Destination för `/login`** — 487 exponeringar. Finns en kundportal, och är `admin.imvision.se` rätt adress för kunder?
3. **Faktaunderlag för projektsidorna** — mått, år, uppdragsgivare, teknik. Utan detta kan innehållsarbetet inte göras utan att uppfinna påståenden, och innehåll är enda vägen till icke-varumärkestrafik.
4. **Namngiven expert** för E-E-A-T.
5. **PageSpeed-API-nyckel** — annars finns ingen prestandamätning alls.
6. **Deploy-vägen** — `PROJECT.md` säger manuell deploy, tidigare anteckningar säger auto-deploy vid push till `main`. Avgör om en merge går live direkt.

---

## Vad jag medvetet inte gjorde

- **Inga irreversibla åtgärder i Search Console.** Inga removals, ingen sitemap inskickad, ingen property borttagen, inga behörighets- eller ägarskapsändringar, ingen massbegäran om indexering. Endast läsning, filterbyten och tre URL-inspektioner.
- **Inga Search Console-exporter i Git.** Siffrorna i rapporterna är sammanställda; råexporter ligger utanför repot.
- **Ingen redirect för `/login`** — det vore en soft 404 utan ett verkligt portalmål.
- **Ingen innehållskonsolidering eller canonical-ändring** — kannibaliseringen var gammal-mot-ny och löses korrekt av 308-redirects.
- **Ingen ändring av rörelsedesignen** trots att den är sajtens största prestandaproblem — det är ett synligt produktbeslut.
- **Ingen ändring av samtyckesflödet eller gtag-laddningen** — GDPR-känslig kod.
- **Inget påhittat innehåll** — inga kundnamn, mått, årtal, priser, certifieringar eller resultat.
- **Ingen merge, ingen push till `main`, ingen driftsättning.**
