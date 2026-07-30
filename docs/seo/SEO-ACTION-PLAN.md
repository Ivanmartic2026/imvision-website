# SEO-handlingsplan — imvision.se

**Datum:** 2026-07-30 · **Branch:** `seo/full-audit-and-optimization`
**Underlag:** [`SEO-AUDIT-AND-IMPLEMENTATION.md`](./SEO-AUDIT-AND-IMPLEMENTATION.md)

Status: `Klar` = implementerad och verifierad i denna branch · `Blockerad` = kräver
åtkomst eller beslut från dig · `Att göra` = redo att plockas upp.

Förväntad effekt anges som riktning med evidensstyrka, inte som utlovad siffra.

---

## Implementerat nu

| Prio | Område | Problem / möjlighet | Berörd URL | Rekommenderad åtgärd | Status | Förväntad effekt | Arbetsinsats | Beroende | Verifieringsmetod |
|---|---|---|---|---|---|---|---|---|---|
| P1 | Indexering | Sidan är oupptäckbar: 200 OK men noll interna länkar och saknas i sitemap | `/sv/servicevillkor/` | Lägg till sitemap-post med sv + x-default (ingen EN-tvilling finns) | **Klar** `3080395` | Sidan blir indexerbar. Hög evidens — mekanisk orsak-verkan. 1–4 v efter recrawl | 30 min | — | `curl sitemap.xml \| grep servicevillkor` → 1 träff |
| P1 | Interna länkar | Samma sida saknar helt inlänkning | `/sv/servicevillkor/` | Footer-länk, endast `locale === "sv"` | **Klar** `28f471d` | Från noll till två upptäcktsvägar. Hög evidens | 20 min | P1 ovan | `curl /sv/ \| grep -c servicevillkor` → 1; `curl /` → 0 |
| P1 | Trasiga länkar | Språkväxlaren pekar mot `/servicevillkor/` som 404:ar | `/sv/servicevillkor/` | Fixa `getEnglishPath()` med lista över sv-unika routes | **Klar** `88f1603` | Eliminerar 404 i navigation. Hög evidens | 30 min | — | Chromium: EN-länk → `/`; `/sv/support/` → `/support/` |
| P2 | Indexering | Fyra indexerbara legala sidor utanför sitemap (42 av 47 URL:er listade) | `/privacy/`, `/terms/` × 2 språk | Lägg till med priority 0.2, changefreq yearly | **Klar** `3080395` | Fullständig sitemap-täckning. Hög evidens | 15 min | — | `grep -c "<loc>"` → 47 |
| P2 | Metadata | Innehållslösa titlar (19–20 tecken), bär inget sökord | `/projects/`, `/support/`, `/contact/` × 2 språk | Sökordsbärande titlar under 60 tecken | **Klar** `ea6c4a2` | CTR-lyft i SERP. Medel evidens. 2–6 v | 1 h | — | `<title>`-längd 42–58; H1 verifierat oförändrade |
| P2 | Metadata | Svensk beskrivning 73 tecken mot engelskans 146 | `/sv/support/` | Utöka till paritet med EN-innehållet | **Klar** `ea6c4a2` | Bättre SERP-snippet. Medel evidens | 15 min | — | Längd 149 tecken |
| P1 | Mobil | **Regression jag införde:** footerraden bröt inte rad → +47px overflow på alla `/sv/`-sidor | Alla `/sv/*` | `flex-wrap` + `gap-x`/`gap-y` | **Klar** `ad38d2a` | Återställer mobilvyn. Hög evidens | 15 min | — | Chromium 320px + 390px: 9/9 rena vid 390px |

---

## Quick wins — hög nytta, låg insats

| Prio | Område | Problem / möjlighet | Berörd URL | Rekommenderad åtgärd | Status | Förväntad effekt | Arbetsinsats | Beroende | Verifieringsmetod |
|---|---|---|---|---|---|---|---|---|---|
| P1 | Search Console | Ny sitemap (47 URL:er) inte inskickad | `sitemap.xml` | Skicka in på nytt + begär indexering av `/sv/servicevillkor/` | **Blockerad** | Snabbare recrawl. Hög evidens | 10 min | GSC-åtkomst; deploy | GSC → Sitemaps visar 47 upptäckta |
| P2 | Metadata | 18 projektsidor har bara egennamn som titel | `/projects/*`, `/sv/projects/*` | Lägg till typ + plats, t.ex. "The Curve — böjd LED-fasad, Täby Centrum" | Att göra | CTR + long-tail. Medel evidens | 3 h | Projektfakta | Titellängd 35–60; unik per språk |
| P2 | Metadata | 11 svenska projektsidor har beskrivningar på 40–69 tecken | `/sv/projects/*` | Utöka till 140–155 tecken | Att göra | Bättre snippet. Medel evidens | 2 h | Projektfakta | Längdkontroll via crawl |
| P3 | Struktur | Projektsidor saknar `datePublished` / `dateModified` | `/projects/*` | Lägg till i `projectLd()` när installationsår finns | Att göra | Färskhetssignal för AI-sök. Medel evidens | 1 h | Installationsår | Rich Results Test |
| P3 | Mobil | Befintlig overflow vid 320px | `/sv/sales/` +10px, `/sv/projects/` +56px | Begränsa dekorativa `-right-[12%]`-element eller `overflow-x-clip` på wrapper | Att göra | Mindre UX-friktion på små skärmar. Låg-medel evidens | 1 h | Designbeslut | Chromium @320px |
| P3 | Teknisk | `/_not-found/` svarar 200 på produktion (lokalt korrekt 404) | `/_not-found/` | Verifiera Vercel-routing; sidan är redan `noindex` så risken är låg | Att göra | Städsignal. Låg evidens | 30 min | — | `curl -I` → 404 |

---

## Nästa 30 dagar

| Prio | Område | Problem / möjlighet | Berörd URL | Rekommenderad åtgärd | Status | Förväntad effekt | Arbetsinsats | Beroende | Verifieringsmetod |
|---|---|---|---|---|---|---|---|---|---|
| P1 | Åtkomst | Ingen GSC-data → ingen mätbarhet | — | Ge åtkomst via inloggad Chrome-profil **eller** Google OAuth för `gsc_query.py` | **Blockerad** | Låser upp all trafikbaserad analys | 30 min | Din inloggning / 2FA | `/seo google` returnerar data |
| P1 | Innehåll | Projektsidor är 65–102 ord — hälften av sajtens URL:er, minst bidrag | `/projects/*` | Fördjupa de 5 mest värdefulla till 250–400 ord: mått, pixelavstånd, år, uppdragsgivare, teknisk utmaning | Att göra | Största organiska hävstången. Medel evidens. 2–4 mån | 8 h | **Faktaunderlag från dig** | Ordräkning via crawl; position i GSC |
| P2 | E-E-A-T | Ingen namngiven person eller expertis på sajten | Hela sajten | Lägg till författar-/expertprofil med `Person`-schema | Att göra | Tydligaste E-E-A-T-luckan. Medel evidens | 4 h | Vem som ska stå som avsändare | Rich Results Test; `Person` i grafen |
| P2 | Förtroende | Konkurrent använder "500+ uthyrningar sedan 2014"; IM Vision kvantifierar inget | `/about/`, `/` | Lägg till verifierbara tal: antal installationer, driftade m², år i branschen | Att göra | Konvertering + citerbarhet. Medel evidens | 2 h | **Verkliga siffror från dig** | Synligt på sida; ej i schema utan belägg |
| P3 | Mätning | Ingen baslinje för CWV-fältdata | — | Skaffa PageSpeed/CrUX API-nyckel | **Blockerad** | Möjliggör Lighthouse-uppföljning | 20 min | Ditt godkännande för API-nyckel | PSI returnerar 200 |

---

## Nästa 90 dagar

| Prio | Område | Problem / möjlighet | Berörd URL | Rekommenderad åtgärd | Status | Förväntad effekt | Arbetsinsats | Beroende | Verifieringsmetod |
|---|---|---|---|---|---|---|---|---|---|
| P2 | Innehåll | Driftavtal/operations saknar landningssida trots att tjänsten finns | ny `/operations/` | Egen sida för drift och underhåll av LED-installationer | Att göra | Lågkonkurrens-segment. Medel evidens. 3–6 mån | 12 h | Tjänstebeskrivning | Indexerad + `Service`-schema |
| P2 | Lokal SEO | Två fysiska platser har `LocalBusiness`-schema men ingen sida | ny `/jonkoping/`, `/stockholm/` | Lokala landningssidor med unikt innehåll — **inte** mallade dubbletter | Att göra | Lokal synlighet. Medel evidens | 10 h | Lokalt innehåll | Map-pack-synlighet; GSC land/region |
| P2 | Lokal SEO | Google Business Profile nämns som ogjord i `PROJECT.md` §11 | — | Skapa/gör anspråk på GBP för båda adresserna | Att göra | Lokal synlighet + NAP-konsistens. Hög evidens | 2 h | Ägarverifiering | GBP live; NAP matchar `seo.ts` |
| P3 | Topical authority | Inget redaktionellt innehåll om permanenta installationer | ny `/insights/` e.d. | 4–6 djupartiklar om det som differentierar er | Att göra | Topical authority. Medel evidens. 4–8 mån | 30 h | Redaktionell kapacitet | Impressions på icke-varumärke |
| P3 | Digital PR | Få externa auktoritetslänkar | — | Arkitektur- och retailpress kring genomförda fasadprojekt | Att göra | Domänauktoritet. Låg-medel evidens, hög varians | Löpande | PR-resurs | Referring domains |
| P3 | Dokumentation | `PROJECT.md` §7/§10/§11 är inaktuell (påstår att domänen inte är kopplad, GA4 saknas, `SOCIAL_PROFILES` tom — produktion motsäger alla tre) | `PROJECT.md` | Uppdatera handboken | Att göra | Undviker felaktiga beslut. Hög evidens | 1 h | — | Läsning mot produktion |

---

## Beslut som väntar på dig

1. **Search Console-åtkomst** — blockerar hela Fas 3. Antingen en Chrome-profil
   med din Google-session eller OAuth-uppgifter till pluginen.
2. **PageSpeed/CrUX API-nyckel** — blockerar Lighthouse-uppföljning.
3. **Faktaunderlag för projektsidorna** — mått, år, uppdragsgivare, teknik.
   Utan detta kan innehållsarbetet inte göras utan att uppfinna påståenden.
4. **Vem som ska stå som namngiven expert** för E-E-A-T.
5. **Om prisspann ska kommuniceras** — konkurrenter gör det och rankar på det.

---

## Vad jag medvetet inte gjorde

- Skickade inte in något i Search Console (ingen åtkomst, och inga irreversibla åtgärder).
- La inte till `Review`-, `Rating`- eller `AggregateRating`-schema — det finns inga
  synliga omdömen på sajten, så det skulle bryta mot Googles riktlinjer.
- Skapade inga programmatiska landningssidor.
- Rörde inte affärslogik, prissättning, betalning eller autentisering.
- Ändrade inget synligt innehåll eller varumärkets ton.
- Åtgärdade inte den befintliga lint-varningen i `ServicePageContent.tsx:10` —
  den ligger utanför uppdraget och skulle grumla diffen.
- Mergade och driftsatte inte.
