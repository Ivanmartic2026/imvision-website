# SEO-granskning och implementering — imvision.se

**Datum:** 2026-07-30
**Branch:** `seo/full-audit-and-optimization`
**Utgångsläge:** `aaa6493` på `main`
**Verktyg:** claude-seo v2.2.4 (isolerad runtime), Playwright/Chromium 1228, egen crawler

---

## 1. Executive summary

Sajten var i **ovanligt gott tekniskt skick** redan innan granskningen. Crawl av
54 produktionssidor gav noll trasiga länkar, noll redirectkedjor, noll
canonical-konflikter, fullständigt ömsesidig hreflang, korrekt `lang` på samtliga
54 sidor och alt-text på varje bild. Det finns ingen kris att åtgärda.

Värdet ligger därför i **täckning och intjäning**, inte i felrättning. Fyra
konkreta brister identifierades och åtgärdades:

1. `/sv/servicevillkor/` var **helt oupptäckbar** — 200 OK men noll interna
   länkar och frånvarande ur sitemap. Google hade ingen väg dit.
2. Fyra legala sidor (`/privacy/`, `/terms/` × 2 språk) saknades i sitemap.
3. Tre navsidor hade **innehållslösa titlar** (`"Projects | IM Vision"`, 20 tecken)
   som inte bar ett enda sökord utöver varumärket.
4. Språkväxlaren pekade mot `/servicevillkor/` som **404:ar**.

Fem commits levererade. Under verifieringen **introducerade jag en regression**
(horisontell overflow på mobil) som upptäcktes och åtgärdades innan arbetet
avslutades — detaljer i §10.

**Uppdatering 2026-07-30 — Search Console-data tillagd.** Åtkomsten löstes och §13 bygger nu
på verklig trafikdata. Den gav ett fynd som är större än allt ovan: **förra webbplatsens
engelska URL:er 404:ar fortfarande och drog 48 klick och ~1 950 exponeringar under tre
månader** — på en sajt med 416 klick totalt. Åtgärdat i `9b532d7`. Datan visar också att
76 % av trafiken är varumärkessökningar och att kommersiell icke-varumärkesefterfrågan i
praktiken är noll (12 exponeringar på 28 dagar).

**Andra omgången (samma dag)** lade till fullständig Lighthouse med Performance-kategorin,
vilket avslöjade sajtens största tekniska problem: **LCP är 4,4–6,0 s på mobil** därför att
scroll-reveal-animationer håller innehållet ovanför vikningen osynligt tills JavaScript kört
(§11). CLS är 0 och TTFB 53–131 ms — det är enbart animationerna. Dessutom är
llms.txt-regressionen nu åtgärdad och projektsidornas titlar bär sökord.

---

## 2. Teknisk miljö

| | |
|---|---|
| Ramverk | Next.js 16.2.10, App Router, route-grupper `(en)` / `(sv)` |
| Runtime | Vercel serverless (**inte** statisk export) |
| React | 19.2.4 |
| Rendering | Statiskt prerenderad; `/api/contact` är serverless-funktion |
| Sidor i build | 62 routes |
| Node / npm | v25.9.0 / 11.12.1 |
| Python (claude-seo) | 3.13, isolerad venv, Chromium ready |

### Baslinje före ändringar

| Kontroll | Resultat |
|---|---|
| `tsc --noEmit` | Ren |
| `eslint` | **1 befintlig varning** — `'Reveal' is defined but never used` i `ServicePageContent.tsx:10`. Fanns före mitt arbete och är kvar; jag har inte rört den. |
| `npm run build` | Ren, 62 routes |

> **Viktigt om arbetsmappen.** Uppdraget startade i `~/Desktop/HEMSIDAN IMV`, men
> den mappen är en **övergiven kopia**: statisk export, `/sv/`-sökvägar istället
> för route-grupper, inga API-routes, 83 filskillnader i `src/`. Produktion kör
> `Ivanmartic2026/imvision-website`. Allt arbete nedan är gjort i en klon av det
> repot (`~/Desktop/imvision-website`). Verifierat: `/api/contact` → 308,
> `/llms.txt` → 200, `/manifest.webmanifest` → 200, www → apex 308 — samtliga
> omöjliga i den lokala mappens arkitektur.

---

## 3. Använda datakällor

| Källa | Omfattning | Status |
|---|---|---|
| Egen crawler (requests + BeautifulSoup) | 54 prod-sidor före, 55 lokala efter | ✅ |
| Playwright/Chromium 1228 | 7 sidtyper × mobil + desktop | ✅ |
| Produktions-`robots.txt` / `sitemap.xml` | Direkthämtning | ✅ |
| Google-sökresultat (konkurrenter) | 1 sökning, svenska marknaden | ✅ Begränsad |
| **Google Search Console** | Domänproperty, 24 h / 28 d / 3 mån, 5 dimensioner, indexering, sitemap, CWV, 3 URL-inspektioner | ✅ 2026-07-30 |
| **Lighthouse (lab)** | 5 sidtyper lokalt + produktion, via Chromium 150.0 / Lighthouse 13.4.0 | ✅ |
| PageSpeed Insights API | — | ❌ 429, kräver API-nyckel |
| CrUX fältdata | — | ❌ **Finns inte** — otillräcklig trafik (§13.6) |

---

## 4. Search Console-perioder och filter

**Property:** `sc-domain:imvision.se` — **domänproperty** (verifierad domän, inte URL-prefix),
åtkomst via kontot `ivan@imvision.se`. Söktyp: Webb. Inga filter utöver de som anges.
Datafärskhet vid analysen: senaste uppdatering ~6,5 h innan körning; fullständig data t.o.m. **2026-07-27**.

| Period | Datumintervall | Klick | Exponeringar | CTR | Position |
|---|---|---:|---:|---:|---:|
| 24 timmar | 2026-07-28 – 07-29 | 2 | 44 | 4,5 % | 4,3 |
| **28 dagar** | **2026-06-30 – 07-27** | **105** | **865** | **12,1 %** | **9,7** |
| **3 månader** | **2026-04-28 – 07-27** | **416** | **2 880** | **14,4 %** | **7,9** |

⚠️ **12 månader finns inte.** `num_of_days=365` returnerade samma 3-månadersfönster —
propertyn exponerar ingen djupare historik (den skickades in 2026-07-17). Jämförelsen
"senaste 12 månaderna mot föregående 12" kunde därför inte göras.

⚠️ **Om trendberäkningen.** Jag läste absoluta värden per fönster i stället för att använda
GSC:s inbyggda jämförelseläge. Trenden nedan är alltså härledd, inte avläst:

- Föregående 63 dagar: (416 − 105) = 311 klick → **4,94 klick/dag**
- Senaste 28 dagarna: 105 klick → **3,75 klick/dag** (**−24 %**)
- Position försämrad: 9,7 senaste 28 d mot 7,9 i snitt över 3 mån

**Tolka detta försiktigt.** Volymen är låg (105 klick), och fönstret 2026-06-30 – 07-27 är
svensk semesterperiod. Nedgången är minst lika sannolikt säsongsbetingad som strukturell.
Med en bastrafik på ~4 klick/dag krävs flera månader innan en trend är statistiskt meningsfull.

## 5. Viktigaste nulägesproblemen

Grupperade enligt allvarlighetsgrad. Alla har verifierats, inte antagits.

### Critical
Inga. Crawlen hittade noll 4xx/5xx, noll redirectloopar, noll canonical-konflikter.

### High

**H1 — `/sv/servicevillkor/` var oupptäckbar** ✅ ÅTGÄRDAD
Bevis: `curl` → 200 OK; `grep servicevillkor sitemap.xml` → 0 träffar; crawl av
54 sidor → 0 interna länkar; sidan dök aldrig upp i crawlen.
Orsak: sidan lades till utan sitemap-post eller navigationslänk.
Effekt: ett juridiskt dokument som stärker förtroende (E-E-A-T) var osynligt för Google.

**H2 — Språkväxlaren länkade till en 404** ✅ ÅTGÄRDAD
Bevis: `/servicevillkor/` → 404 på både lokalt och produktion; länken renderas
av `LanguageSwitcher` via `getEnglishPath()`.
Orsak: `getEnglishPath()` strippar `/sv` från alla svenska sökvägar utan att
kontrollera om en engelsk motsvarighet finns.
Effekt: trasig UX och en spilld crawl-budget-signal. Latent tidigare eftersom
sidan ändå var onåbar — mina H1-fixar gjorde den nåbar.

### Medium

**M1 — Innehållslösa titlar på tre navsidor** ✅ ÅTGÄRDAD
Bevis: `"Projects | IM Vision"` (20 tecken), `"Support | IM Vision"` (19),
`"Contact | IM Vision"` (19), plus svenska motsvarigheter.
Effekt: titeln är den starkaste on-page-signalen och den mest CTR-avgörande
raden i SERP. Dessa bar noll sökintention.

**M2 — Fyra legala sidor utanför sitemap** ✅ ÅTGÄRDAD
`/privacy/`, `/terms/` × 2 språk. Indexerbara och footer-länkade, men
sitemap listade 42 av 47 indexerbara URL:er.

**M3 — Tunna projektsidor** ❌ EJ ÅTGÄRDAD (kräver ditt underlag)
Bevis: 65–102 ord brödtext. Tunnast: `/sv/projects/parksign/` (65 ord).
Jag kan inte åtgärda detta utan att hitta på fakta om installationerna.

**M4 — 18 projektsidor med bara egennamn som titel** ❌ EJ ÅTGÄRDAD
`"Kappahl | IM Vision"`, `"The Curve | IM Vision"`. Kräver per-projekt
sökordsbedömning; bör göras samtidigt som M3.

### Low

**L1 — `/_not-found/` returnerar 200 på produktion**
Bevis: `curl -I https://imvision.se/_not-found/` → `HTTP/2 200`. Lokalt ger
samma URL korrekt 404. Sidan är dock `noindex, nofollow`, så indexeringsrisken
är begränsad. Vercel-routingartefakt.

**L2 — Horisontell overflow vid 320px på två sidor**
`/sv/sales/` +10px, `/sv/projects/` +56px. Orsak: dekorativa absolutpositionerade
element (`-right-[15%]`, `-right-[12%]`). **Befintligt** — reproduceras identiskt
på produktion. Ej åtgärdat eftersom det är ett designval, inte en bugg.

**L3 — Korta meta-beskrivningar på 11 svenska projektsidor**
40–69 tecken mot Googles ~155. Hänger ihop med M3.

---

## 6. Viktigaste organiska möjligheterna

1. **Permanenta arkitektoniska installationer är mindre konkurrensutsatt** än
   event-uthyrning (se §7). IM Visions faktiska styrka — fasader, köpcentrum,
   driftavtal — möter tunnare SERP-konkurrens än `/rental/`-segmentet.
2. **Driftavtal / operations** (`ocean-outdoor-operations`) är en tjänst nästan
   ingen konkurrent kommunicerar. Egen sida värd att överväga.
3. **Geografiska sidor.** Verksamheten har två fysiska platser (Jönköping HQ,
   Saltsjö-Boo/Stockholm) och `LocalBusiness`-schema för båda, men ingen sida
   riktar sig mot lokal sökintention.
4. **Prissignal.** Displayteknik rankar med "Från 20 000 kr/m²" i titeln.
   IM Vision kommunicerar inget prisspann alls — ett medvetet val, men det
   kostar klick i en jämförande bransch.

---

## 7. Konkurrentanalys

⚠️ **Begränsad.** Utan GSC-queries kunde jag inte identifiera konkurrenter från
din faktiska sökdata. Nedan bygger på en svensk SERP-sökning och är därför en
riktningsangivelse, inte en fullständig analys.

| Konkurrent | Typ | Fokus |
|---|---|---|
| [LED Kings](https://led-kings.se/storbildsskarm/) | Organisk sökkonkurrent | Event-uthyrning |
| [FC Gruppen](https://fcgruppen.se/event/led/) | Affärskonkurrent | Försäljning + uthyrning, event |
| [Viriba](https://www.viriba.se/uthyrning) | Affärskonkurrent | Mobila storbildsskärmar |
| [Brightscreen](https://academy.brightscreen.se/uthyrning/) | Organisk sökkonkurrent | Mässa/event, Borås, 500+ uthyrningar |
| [VIDEOFORCE](https://www.videoforce.se/uthyrning/hyra-led-skarm) | Affärskonkurrent | Event, TV-produktion |
| [Displayteknik](https://displayteknik.se/led-skarmar) | Affärskonkurrent | Butik/fasad/event, **prissatt** |
| [ReissDisplay](https://reissdisplay.com/sv/rental-led-display-screen/) / [ReissOpto](https://www.reissopto.com/swe/rental-led-display/) | Tillverkare | Kinesisk tillverkare med svensk lokalisering |

**Slutsats:** SERP domineras av **event-uthyrning**. IM Visions differentiering —
permanenta arkitektoniska installationer, service och drift i hela Europa —
möter svagare konkurrens men kommuniceras inte tillräckligt tydligt i titlar
och rubriker. Brightscreen använder ett konkret trust-tal ("500+ uthyrningar
sedan 2014"); IM Vision har jämförbara referenser men kvantifierar dem inte.

---

## 8. Genomförda kodändringar

| # | Commit | Vad |
|---|---|---|
| 1 | `3080395` | Legala sidor + `/sv/servicevillkor/` till sitemap (42 → 47 URL:er) |
| 2 | `28f471d` | Footer-länk till `/sv/servicevillkor/` (endast svenska) |
| 3 | `ea6c4a2` | Sökordsbärande titlar på 6 navsidor + utökad sv-support-beskrivning |
| 4 | `ad38d2a` | **Regressionsfix** — radbrytning i footerns legalrad |
| 5 | `88f1603` | Språkväxlaren slutar länka till obefintlig engelsk sida |

---

## 9. Ändrade filer

```
 docs/seo/SEO-ACTION-PLAN.md
 docs/seo/SEO-AUDIT-AND-IMPLEMENTATION.md
 next.config.ts                          # 12 legacy-redirects
 src/app/(en)/contact/page.tsx            # titel
 src/app/(en)/projects/[slug]/page.tsx    # projekttitel-helper
 src/app/(en)/projects/page.tsx           # titel
 src/app/(en)/support/page.tsx            # titel
 src/app/(sv)/sv/contact/page.tsx         # titel
 src/app/(sv)/sv/projects/[slug]/page.tsx # projekttitel-helper
 src/app/(sv)/sv/projects/page.tsx        # titel
 src/app/(sv)/sv/support/page.tsx         # titel + beskrivning
 src/app/llms.txt/route.ts                # regressionsfix (från KimiV2)
 src/app/sitemap.ts                       # 42 → 47 URL:er
 src/components/layout/Footer.tsx         # servicevillkor-länk + flex-wrap
 src/lib/i18n.ts                          # SV_ONLY_PATHS
 src/lib/seo.ts                           # projectTitle()
```

Ingen affärslogik, prissättning, betalning eller autentisering berörd. Inget synligt
innehåll ändrat — H1:or verifierat oförändrade. Rörelsedesign och samtyckesflöde orörda.

## 10. Före- och efterresultat

| Mätvärde | Före (produktion) | Efter (lokal build) |
|---|---|---|
| Sidor crawlade | 54 | 55 |
| Statuskoder | 100 % 200 | 100 % 200 |
| URL:er i sitemap | 42 | **47** |
| Indexerbara sidor utanför sitemap | 4 (+8 avsedda noindex) | **0** (+8 avsedda noindex) |
| Oupptäckbara sidor | 1 (`/sv/servicevillkor/`) | **0** |
| Trasiga interna länkar | 0 känt | **0 verifierat** |
| Titlar under 25 tecken (navsidor) | 6 | **0** |
| Ömsesidig hreflang | 100 % | 100 % |
| Bilder utan alt | 0 | 0 |

### Regression som jag införde och åtgärdade

Commit `28f471d` lade ett fjärde element i footerns legalrad, som var
`flex items-center gap-4` utan radbrytning. De längre svenska etiketterna
("Integritetspolicy", "Användarvillkor", "Servicevillkor", "Cookie-inställningar")
sprängde mobilvyn.

| | Produktion | Efter `28f471d` | Efter `ad38d2a` |
|---|---|---|---|
| `/sv/` @390px | ingen overflow | **+47px** | ingen overflow |
| `/sv/support/` @390px | ingen overflow | **+47px** | ingen overflow |
| `/sv/sales/` @390px | ingen overflow | **+47px** | ingen overflow |
| `/sv/contact/` @390px | ingen overflow | **+47px** | ingen overflow |

Verifierat i Chromium vid 320px och 390px efter fixen: 9/9 testade sidor rena vid 390px.

---

## 11. Lighthouse-resultat

**Uppdaterad 2026-07-30 med fullständiga körningar.** Lighthouse **13.4.1** via CLI
(`npx lighthouse`), headless Chrome, `--form-factor=mobile`, simulerad strypning.
Nu ingår **Performance**, som saknades i den tidigare körningen.

Detta är **labbdata**. Det kan inte jämföras med Core Web Vitals i §13.6 — där konstaterar
Google att fältdata inte existerar för den här sajten.

### Produktion (mobil) — den relevanta mätningen

| Sida | Perf | A11y | BP | SEO | Agentic | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | **74** | 100 | 100 | 100 | 100 | **6,0 s** | 0 | 10 ms |
| `/contact/` | **82** | 100 | 100 | 100 | 100 | **5,0 s** | 0 | 40 ms |
| `/service/` | **73** | 100 | 100 | 100 | 100 | **5,1 s** | 0 | 10 ms |
| `/projects/the-curve/` | **85** | 100 | 100 | 100 | 100 | **4,4 s** | 0 | 10 ms |
| `/sv/servicevillkor/` | **95** | 100 | 100 | 100 | 100 | 2,9 s | 0 | 10 ms |

### ⚠️ LCP är sajtens största tekniska problem

Allt utom LCP är utmärkt: **CLS är 0 på varje sida**, TBT är försumbar (10–40 ms) och
TTFB ligger på 53–131 ms. Servern och layouten är alltså inte problemet.

Men **LCP är 4,4–6,0 s på mobil** mot Googles gränsvärde 2,5 s. Fyra av fem testade sidor
ligger i "dåligt"-spannet.

Orsaken syns i `lcp-breakdown-insight`. LCP-elementet är **text**, inte hjältebilden, och
den mesta tiden är *element render delay*:

| Sida | TTFB | Render delay | LCP-element |
|---|---:|---:|---|
| `/service/` | 60 ms | **2 097 ms** | "We stay with you after install." |
| `/contact/` | 131 ms | **1 612 ms** | "Get help with permanent LED installations…" |
| `/` | 53 ms | 650 ms | cookie-bannerns text (`div.fixed > p`) |
| `/projects/the-curve/` | 58 ms | 242 ms | "The Curve" |
| `/sv/servicevillkor/` | 53 ms | 170 ms | "Allmänna servicevillkor." |

**Mönstret är entydigt:** ju mer scroll-reveal-animation en sida har, desto senare målas
dess största textblock. `Reveal` och `StaggerReveal` startar på `opacity: 0`
(`src/components/effects/Reveal.tsx`) och animerar in efter hydrering. Innehåll ovanför
vikningen är alltså osynligt tills JavaScript har körts — och det är precis vad LCP mäter.

Sidan med minst animation (`/sv/servicevillkor/`, ren text) får 95 och LCP 2,9 s. Sidan med
mest (`/service/`) får 73 och 5,1 s.

**Jag har inte ändrat detta.** Att låta innehåll ovanför vikningen måla direkt är den enskilt
största prestandavinsten som finns att hämta, men det ändrar sajtens synliga rörelsedesign,
som `PROJECT.md` behandlar som ett medvetet val. Det hör hemma hos dig, inte i en SEO-PR.
Rekommendationen ligger som P1 i handlingsplanen.

Sekundärt: `unused-javascript` uppskattar 281 KiB / ~1 350 ms, varav **gtag.js är 175 KB** —
den största enskilda resursen på startsidan. Consent Mode v2 laddar skriptet även innan
samtycke (med nekad lagring), vilket är korrekt implementerat men inte gratis.

### Lokal build från denna branch (mobil)

| Sida | Perf | A11y | BP | SEO | Agentic |
|---|---:|---:|---:|---:|---:|
| `/` | 82 | 100 | 100 | 100 | **100** |
| `/contact/` | 80 | 100 | 100 | 100 | **100** |
| `/service/` | 90 | 100 | 100 | 100 | **100** |
| `/projects/the-curve/` | 90 | 100 | 100 | 100 | **100** |
| `/sv/servicevillkor/` | 92 | 100 | 100 | 100 | **100** |

**Agentic Browsing är nu 100 överallt** — llms.txt-regressionen är åtgärdad (se nedan).

⚠️ Prestandasiffrorna för lokal build är **inte** jämförbara med produktion: localhost har
ingen nätverkslatens. De visar bara att branchen inte försämrar något.

### llms.txt — regressionen är åtgärdad

`main` genererade nakna URL:er medan produktion serverade markdown-länkar; ändringen fanns
bara oincheckad i klonen `~/Desktop/KimiV2`. Den är nu inlyft i branchen och
`GET /llms.txt` från den lokala byggen är **byte-identisk med produktion** (verifierat med
`diff`). Utan detta hade en deploy från `main` sänkt Agentic Browsing från 100 till 67.

## 12. Crawlresultat före och efter

**Före (produktion, 54 sidor):** 100 % 200. Noll redirects, noll trasiga länkar,
noll canonical-avvikelser, noll hreflang-brott, noll saknade alt-texter.
27 EN / 27 SV med korrekt `lang`. Strukturerad data på samtliga sidor:
Organization ×60, LocalBusiness ×108, WebSite ×54, BreadcrumbList ×52,
CreativeWork ×34, Service ×6, FAQPage ×2, ContactPoint ×2.

**Efter (lokal build, 55 sidor):** 100 % 200. Samma nollresultat, plus
`/sv/servicevillkor/` nu nådd via både footer och sitemap, och noll indexerbara
sidor utanför sitemap.

**Klickdjup:** allt ligger på nivå 0–1 från startsidan. Ingen sida är begravd.

---

## 13. Search Console-fynd

Åtkomst löstes 2026-07-30 genom att avsluta en låst automationswebbläsare som höll
Chromium-profilen; profilen (med Google-sessionen) återanvändes intakt. Inga irreversibla
åtgärder utfördes: inga removals, ingen sitemap inskickad, inga behörighets- eller
ägarskapsändringar, ingen massindexering.

### 13.1 Trafiken är nästan helt varumärkesdriven

28 dagar, per fråga:

| Fråga | Klick | Expo | CTR | Position |
|---|---:|---:|---:|---:|
| imvision | 37 | 120 | 30,8 % | 22,1 |
| im vision | 36 | 111 | 32,4 % | 2,3 |
| im vision group ab | 6 | 18 | 33,3 % | 1,1 |
| imvision login | 1 | 92 | 1,1 % | 2,4 |
| södertull malmö | 0 | 52 | 0 % | 12,2 |
| vision | 0 | 44 | 0 % | 6,4 |
| södertull stockholm | 0 | 12 | 0 % | 7,5 |
| digital signage solutions | 0 | 4 | 0 % | 13,8 |
| led skärm installation stockholm | 0 | 2 | 0 % | 25,0 |
| led display uthyrning event | 0 | 1 | 0 % | 11,0 |

**80 av 105 klick (76 %) är varumärke** — inklusive felstavningar (`imbision`, `imvison`,
`immvision`, `imd vision`). Icke-varumärke står för 25 klick och 507 exponeringar.

Men den avgörande siffran är denna: **kommersiell icke-varumärkesefterfrågan är i praktiken
noll.** Summerar man de frågor som faktiskt uttrycker köpintention — "digital signage
solutions" (4), "led skärm installation stockholm" (2), "signage solutions" (2), "digital
signage installation" (1), "digital display solutions" (1), "led display uthyrning event" (1),
"digital signage companies" (1) — blir det **12 exponeringar på 28 dagar**. Resten av
icke-varumärkestrafiken är brus (`vision`, `images`, `ja`, `nummer`) eller inloggningsintention.

Det bekräftar §14: problemet är inte teknik, det är att det inte finns tillräckligt med
innehåll för att ranka på kommersiella sökningar.

### 13.2 Det största fyndet: gamla URL:er som 404:ar

Sidrapporten visar att den enskilt största förlustkällan är den förra webbplatsens URL:er.
3 månader, sidnivå:

| Gammal URL | Klick | Expo | Position | Status idag |
|---|---:|---:|---:|---|
| `/contact-us` | 21 | 594 | 6,3 | ✅ omdirigerad → `/contact/` |
| `/service-and-support` | 11 | 326 | 7,5 | ✅ → `/support/` |
| `www/felanmalan` | 9 | 196 | 3,1 | ✅ → `/sv/support/` |
| `www/installation` | 5 | 298 | 4,5 | ✅ → `/service/` |
| `www/login` | 3 | 487 | 10,4 | ⛔ medvetet kvar (13.3) |
| `www/inspiration` | 2 | 366 | 6,3 | ✅ → `/projects/` |
| `/our-projects` | 0 | 166 | 7,4 | ✅ → `/projects/` |
| `www/rentals` | 0 | 27 | 3,1 | ✅ → `/rental/` |
| `www/register` | 0 | 14 | 4,6 | ⛔ medvetet kvar |
| `/file/rental-agreement.pdf` | 0 | 13 | 11,3 | ✅ → `/rental/` |
| `/cookies` | 0 | 5 | 3,4 | ✅ → `/privacy/` |
| + `/work-with-us`, `www/term`, `www/rental-conditions`, `www/services`, `www/forgot-password` | 0 | 8 | — | ✅ utom forgot-password |

**48 klick och ~1 950 exponeringar över tre månader landade på 404** — på en sajt som fick
416 klick totalt. Åtgärdat i commit `9b532d7`.

⚠️ Sidnivåexponeringar summerar inte till totalen (2 880) eftersom GSC deduplicerar över
dimensioner. Andelsberäkningar mot totalen vore därför missvisande och görs inte här.

De **svenska** legacy-URL:erna (`/kontakt/`, `/om/`, `/kop`, `/hyr-led-skarmar/`, `/kundcase/`,
`/stc-habo/`, `/goteborgs-opera/`, `/MQ5`, `/produkt-kategori/…`) står kvar i GSC:s 404-lista
men **fungerar redan** (verifierat 200). Deras genomsökningsdatum är feb–apr 2026, alltså före
att redirectarna driftsattes. De försvinner vid nästa recrawl.

### 13.3 `imvision login` — 487 exponeringar mot en portal som inte finns

Den mest exponerade enskilda avsikten efter varumärket. `www.imvision.se/login` fick 3 klick
och 487 exponeringar på tre månader i genomsnittsposition 10,4; frågan "imvision login" 92
exponeringar på 28 dagar i position 2,4 med **1,1 % CTR**.

Detta är **ingen metadatabrist**. Sidan rankar högt; användarna hittar bara inte det de söker,
eftersom marknadssajten inte har någon kundportal. Att omdirigera till en marknadsföringssida
vore en soft 404 och sämre än nuvarande 404. Subdomänerna `admin.imvision.se` (157 expo) och
`new-admin.imvision.se` (18 expo) finns och rankar — men jag kan inte anta att de är rätt
destination för kunder. **Affärsbeslut, se handlingsplanen.**

### 13.4 Indexering

| Status | Sidor |
|---|---:|
| **Indexerat** | **65** |
| Ej indexerat | 42 |

| Orsak | Sidor | Bedömning |
|---|---:|---|
| Hittades inte (404) | 19 | ⚠️ Validering **misslyckades**. Adresseras av `9b532d7` |
| Utesluten av taggen noindex | 9 | ✅ Avsiktligt (8 utkastprojekt + 404-sidan) |
| Alternativ sida med korrekt kanonisk tagg | 6 | ✅ Normalt för EN/SV-paren |
| Sida med omdirigering | 4 | ✅ Förväntat |
| Upptäckt – inte indexerad | 3 | Bevaka |
| Genomsökt – inte indexerad | 1 | Bevaka |
| Server-fel (5xx) | 0 | ✅ |
| Dubblett utan användarvald kanonisk | 0 | ✅ |

### 13.5 URL-inspektion (3 representativa URL:er)

| | `/sv/servicevillkor/` | `/terms/` | `/sv/projects/sodertull-city/` |
|---|---|---|---|
| Finns på Google | ❌ **Nej** | ✅ Ja | ✅ Ja |
| Indexeringsstatus | *Webbadressen är okänd för Google* | Indexerad | Indexerad |
| Hänvisande sitemap | **Inga upptäckta** | — | — |
| Hänvisande sida | **Inga identifierades** | — | — |
| Senaste genomsökning | **Saknas** | — | — |
| Användardeklarerad canonical | Saknas | — | — |
| Google-vald canonical | Saknas | — | — |
| HTTPS | — | ✅ | ✅ |
| Menysökvägar | — | ✅ 1 giltigt objekt | ✅ 1 giltigt objekt |

**Detta är exakt bevis för orphan-diagnosen i §5/H1.** Google har bokstavligen aldrig sett
`/sv/servicevillkor/` — ingen sitemap pekar dit, ingen sida länkar dit, den har aldrig
genomsökts. Commit `3080395` + `28f471d` adresserar båda upptäcktsvägarna.

**Nyansering av §5/M2:** `/terms/` visade sig vara **indexerad** trots att den saknades i
sitemap — footer-länken räckte för upptäckt. Sitemap-tillägget är fortfarande rätt, men
den bristen var mindre allvarlig än jag först skrev.

### 13.6 Sitemap, Core Web Vitals, HTTPS och förbättringar

**Sitemap**

| | |
|---|---|
| URL | `https://imvision.se/sitemap.xml` |
| Inskickad | 2026-07-17 |
| Senast läst | **2026-07-29** |
| Status | Lyckades |
| Upptäckta sidor | **42** |
| Fel / varningar | Inga |

Den uppdaterade versionen med 47 URL:er är ännu inte driftsatt, så Google läser fortfarande 42.

**Core Web Vitals — det finns ingen fältdata**

> *"Det finns inte tillräckligt med data om användning från de senaste 90 dagarna för denna
> enhetstyp."* — för **både mobil och desktop**. Källa: Rapport om användarupplevelse i Chrome
> (CrUX), uppdaterad 2026-07-28.

Detta ersätter den tidigare noteringen om att CrUX skulle kräva API-nyckel: nyckeln hade inte
hjälpt, **datan existerar inte**. Sajten har för lite trafik för att komma över CrUX tröskel.
Praktisk följd: CWV kan inte mätas i fält förrän trafiken ökar väsentligt, och alla
prestandapåståenden måste tills vidare märkas som labbdata.

**HTTPS och strukturerad data** — URL-inspektionen rapporterar HTTPS ✅ och menysökvägar
✅ (1 giltigt objekt per kontrollerad sida). Inga fel i förbättringsrapporterna.

### 13.7 Länder och enheter (28 dagar)

| Land | Klick | Expo | CTR | Position |
|---|---:|---:|---:|---:|
| Sverige | 86 | 428 | 20,1 % | 6,4 |
| Danmark | 6 | 13 | 46,2 % | 3,2 |
| Storbritannien | 3 | 16 | 18,8 % | 14,1 |
| Kina | 3 | 9 | 33,3 % | 1,6 |
| Kanada | 1 | 104 | 1,0 % | 3,1 |
| USA | 1 | 73 | 1,4 % | 20,4 |

**82 % av klicken kommer från Sverige.** Kanada och USA har hög exponering men noll
substantiella klick — det är de generiska `vision`/`login`-frågorna, inte verklig efterfrågan.
Trots att sajten positionerar sig mot hela Europa finns ingen mätbar europeisk efterfrågan
utanför Norden ännu.

| Enhet | Klick | Expo | CTR | Position |
|---|---:|---:|---:|---:|
| Desktop | 64 | 485 | 13,2 % | 13,3 |
| Mobil | 40 | 355 | 11,3 % | **5,0** |
| Surfplatta | 1 | 25 | 4,0 % | 5,8 |

Mobil rankar **markant bättre** (position 5,0 mot desktops 13,3) men ger färre klick.
Desktop dominerar volymen — rimligt för B2B-inköp.

**Visningssätt i sökresultaten:** tabellen är tom — inga specialvisningar (rich results,
sitelinks-rapportering) registrerade för perioden.

### 13.8 Kannibalisering

Ingen kannibalisering mellan EN- och SV-sidor: hreflang är komplett och ömsesidig, och
GSC visar att paren rankar på skilda frågor i skilda länder.

Däremot fanns **gammal-mot-ny-kannibalisering**, där förra sajtens URL:er konkurrerade med
de nya om samma avsikt:

| Avsikt | Ny sida | Gammal sida | Åtgärd |
|---|---|---|---|
| Kontakt | `/contact/` (8 expo, pos 1,1) | `/contact-us` (129 expo, pos 7,8) | Löst av `9b532d7` |
| Support | `/support/` (18 expo, pos 4,0) | `/service-and-support` (58 expo, pos 8,3) | Löst av `9b532d7` |
| Projekt | `/projects/` (11 expo, pos 4,3) | `/our-projects` (36 expo) + `/inspiration` (59 expo) | Löst av `9b532d7` |

Detta är den korrekta lösningen: 301/308 konsoliderar signalerna till en URL. Ingen
innehållssammanslagning eller canonical-ändring behövdes, och ingen gjordes.

## 14. Innehållsmöjligheter

Rangordnat efter förhållandet mellan nytta och arbetsinsats. Inget av detta kan
jag skriva åt dig utan att hitta på fakta.

1. **Fördjupa 18 projektsidor** från 65–102 ord till 250–400. Behöver:
   skärmstorlek, pixelavstånd, installationsår, uppdragsgivare, teknisk utmaning.
   Det är den enskilt största organiska hävstången — projektsidorna är hälften
   av sajtens URL:er men bidrar minst.
2. **Kvantifierade förtroendesignaler.** Konkurrenter använder tal
   ("500+ uthyrningar sedan 2014"). Antal installationer, driftade m², antal år.
3. **Egen sida för driftavtal/operations.** Tjänsten finns i portföljen men har
   ingen egen landningssida.
4. **Lokala sidor** för Jönköping och Stockholm — schemat finns redan, sidorna inte.
5. **Prisspann eller prisintervall** — även "från X kr/m²" fångar
   jämförelsesökningar som idag går till Displayteknik.

---

## 15. GEO- och AI Search-rekommendationer

**Redan starkt.** Detta är bättre rustat än de flesta sajter jag granskar:

- `/llms.txt` finns och svarar 200.
- `robots.txt` blockerar inga AI-crawlers (endast `/api/`).
- Fullständig entitetsgraf: `Organization` + två `LocalBusiness` + `WebSite`,
  ihopkopplade med `@id`-referenser.
- `sameAs` ifylld (Facebook, Instagram, LinkedIn).
- `knowsAbout` deklarerar åtta ämnesområden.
- Organisationsnummer, VAT-ID och `identifier` — starka entitetssignaler.
- `FAQPage` på `/support/`, `Service` på lösningssidorna, `CreativeWork` +
  `citation` på projektsidor.

**Kvarstående luckor:**

1. **Ingen `Person`- eller författarinformation.** Ingen namngiven expert på sajten.
   Det är den tydligaste E-E-A-T-luckan och den som AI-tjänster oftast använder
   för att bedöma expertis.
2. **Inga publicerings- eller uppdateringsdatum.** Projektsidor saknar `datePublished`.
   AI-svar prioriterar färskhetssignaler.
3. **Låg faktatäthet.** Citerbarhet kräver konkreta, extraherbara påståenden
   (mått, år, teknik). Hänger direkt ihop med §14.1.

**Lägg inte till** `Review`, `Rating` eller `AggregateRating` förrän det finns
verkliga, synliga omdömen på sidan — annars bryter det mot Googles riktlinjer.

---

## 16. Kvarvarande risker

| Risk | Allvarlighet | Kommentar |
|---|---|---|
| **LCP 4,4–6,0 s på mobil** | **Hög** | Sajtens största tekniska problem (§11). Orsakas av reveal-animationer, inte av servern. Ej åtgärdat — kräver designbeslut |
| Dubblett av `llms.txt`-ändringen i KimiV2 | Låg | Fixen ligger nu i branchen; samma ändring är fortfarande oincheckad i den andra klonen och bör kastas där efter merge |
| Ingen fältdata för Core Web Vitals | Medel | CrUX har otillräcklig data (§13.6). Prestanda kan inte mätas i fält förrän trafiken ökar. |
| Ingen prestandapoäng alls | Medel | Lighthouse-verktyget exkluderar Performance; PSI kräver API-nyckel |
| Motstridiga uppgifter om deploy | **Hög** | `PROJECT.md` §7 säger manuell deploy (`npx vercel --prod`); tidigare sessionsanteckningar säger att Vercel↔GitHub-integrationen återkopplades 2026-07-18 och att push till `main` auto-deployar. Bekräfta vilket som gäller **innan** merge — annars riskerar en merge att gå live oavsiktligt. |
| `PROJECT.md` är delvis inaktuell | Låg | §7 påstår att domänen inte är kopplad; §10–11 att GA4/social saknas. Produktion motsäger båda. |
| Befintlig lint-varning | Låg | `ServicePageContent.tsx:10` — orörd |
| 320px-overflow | Låg | Befintlig, designberoende |

---

## 17. 30-, 60- och 90-dagarsplan

Se [`SEO-ACTION-PLAN.md`](./SEO-ACTION-PLAN.md) för radnivå. Sammanfattat:

**30 dagar** — Lös GSC-åtkomsten och skicka in den nya sitemapen. Fördjupa de
fem mest trafikvärda projektsidorna. Sätt titlar på återstående 18 projektsidor.

**60 dagar** — Landningssida för driftavtal. Kvantifierade trust-signaler.
Författar-/expertprofil för E-E-A-T. Publiceringsdatum på projektsidor.

**90 dagar** — Lokala sidor (Jönköping, Stockholm). Topical authority kring
permanenta installationer. Digital PR mot arkitektur- och retailpress.

**Förväntad riktning, inte löfte:** åtgärderna i denna branch påverkar
*indexeringstäckning* och *CTR*, inte ranking direkt. Sitemap- och
orphan-fixarna ger effekt inom 1–4 veckor efter recrawl. Titeländringarna syns
i CTR inom 2–6 veckor. Innehållsarbetet (§14) är det som faktiskt flyttar
positioner, och det tar 2–4 månader. Evidensstyrkan för sitemap/orphan-fixarna
är hög (mekanisk orsak-verkan); för titlarna medel; för innehållsarbetet
medel och beroende av utförandekvalitet.

---

## 18. Mätplan med KPI:er

| KPI | Källa | Baslinje | Kontrollintervall |
|---|---|---|---|
| Indexerade sidor | GSC → Sidor | **65** (2026-07-30) | Varje vecka första månaden |
| Ej indexerade, orsak "Hittades inte (404)" | GSC → Sidor | **19** | Varje vecka tills 0 |
| Sitemap-upptäckta URL:er | GSC → Sitemaps | **42** → mål 47 | Efter varje deploy |
| Klick / exponeringar, 28 d | GSC → Resultat | **105 / 865** | Månadsvis |
| Genomsnittlig CTR / position, 28 d | GSC → Resultat | **12,1 % / 9,7** | Månadsvis |
| Klick från gamla 404-URL:er | GSC → Resultat, sidor | **48 klick / 3 mån → mål 0** | Månadsvis |
| Andel varumärkestrafik | GSC → Resultat, frågor | **76 %** → mål sjunkande | Kvartalsvis |
| Kommersiella icke-varumärkesexponeringar | GSC → Resultat, frågor | **12 / 28 d** | Månadsvis |
| LCP / INP / CLS mobil | CrUX via GSC | **Ingen data** (otillräcklig trafik) | Kvartalsvis tills data finns |
| Lighthouse Agentic Browsing | Lokal Lighthouse 13.4.0 | prod **100**, `main` **67** | Vid varje release |
| Trasiga länkar | Egen crawl | 0 | Vid varje release |
| Sidor utanför sitemap | Egen crawl | 0 | Vid varje release |

Crawl- och analysskripten finns kvar i sessionens scratchpad och kan köras om
mot valfri URL för att reproducera tabellerna i §10 och §12.

---

## 19. Lista över alla commits

```
051208d  docs: record lighthouse performance findings
fe09e30  seo: improve metadata using search console evidence
c83711c  seo: restore llms.txt markdown links (regression in main vs production)
4fc0d2f  docs: add search console findings to seo audit
9b532d7  seo: redirect English legacy URLs that Search Console shows still 404
6a332bc  docs: flag the conflicting deploy-path information
019f5a8  docs: add seo audit and roadmap
88f1603  seo: stop the language switcher linking to a non-existent English page
ad38d2a  fix: wrap footer legal row (regression from the servicevillkor link)
ea6c4a2  seo: give hub pages keyword-bearing titles
28f471d  seo: strengthen internal linking to sv servicevillkor
3080395  seo: add legal pages and sv-only servicevillkor to sitemap
```

Plus denna dokumentation. Notera att `019f5a8` och `6a332bc` skrevs före
Search Console-data fanns; §4, §11, §13, §16 och §18 är uppdaterade i efterhand.

---

## 19b. Driftsättning — genomförd 2026-07-30

Branchen mergades och gick live. Vercels Git-integration är aktiv, så merge till `main`
byggde och promoverade automatiskt (bekräftat via commit-status `Vercel: success`).

| Steg | Utfall |
|---|---|
| PR #1 mergad | `9835240`, 2026-07-30 08:29 UTC |
| Deploy | Automatisk via Vercel, status `success` |
| Efterföljande fix | `b3060ad` — redirect för `/support@imvision.se`, deployad separat |

### Verifierat i produktion efter deploy

| Kontroll | Före | Efter |
|---|---|---|
| Sitemap-URL:er | 42 | **47** |
| Sidor crawlade / statuskoder | 54 / 100 % 200 | **55 / 100 % 200** |
| Duplicerade EN/SV-titlar | 9 par | **0** |
| Indexerbara utanför sitemap | 12 | **8** (samtliga avsedda noindex) |
| Trasiga interna länkar | 0 | **0** |
| Legacy-URL:er som 404:ar | 13 | **0** |
| URL:er i GSC:s 404-grupp som löser sig | 0 / 19 | **19 / 19** |

Alla tolv legacy-redirects landar på rätt destination. `/login`, `/register` och
`/forgot-password` returnerar fortfarande 404 — avsiktligt, se §13.3.

### Lighthouse i produktion efter deploy (mobil, Lighthouse 13.4.1)

| Sida | Perf | A11y | BP | SEO | Agentic | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 69 | 100 | 100 | 100 | **100** | 6,1 s | 0 |
| `/contact/` | 82 | 100 | 100 | 100 | **100** | 5,0 s | 0 |
| `/service/` | 94 | 100 | 100 | 100 | **100** | 3,0 s | 0 |
| `/projects/the-curve/` | 72 | 100 | 100 | 100 | **100** | 5,1 s | 0 |
| `/sv/servicevillkor/` | 95 | 100 | 100 | 100 | **100** | 2,9 s | 0 |

Agentic Browsing är 100 på samtliga — llms.txt-regressionen nådde alltså aldrig produktion.

⚠️ **Läs inte in en prestandatrend i detta.** Enskilda körningar med simulerad strypning mot
en live-sajt varierar kraftigt: `/service/` gick 73 → 94 och `/projects/the-curve/` 85 → 72
mellan två körningar samma dag. Ändringarna i denna release rörde metadata, redirects och
sitemap — inget som påverkar renderingsprestanda. LCP-problemet i §11 kvarstår oförändrat.

### Search Console-åtgärder efter deploy

| Åtgärd | Utfall |
|---|---|
| Sitemap inskickad på nytt | ✅ *"Webbplatskartan har skickats"*, daterad 2026-07-30 |
| Indexering begärd för `/sv/servicevillkor/` | ✅ *"Webbadressen har lagts till i en prioriterad genomsökningskö"* |
| Validering av 404-gruppen | ✅ *"Verifieringen startat"* — den tidigare startade 2026-07-17 och misslyckades 07-25 |

**Sidan som var osynlig är nu upptäckt.** URL-inspektionen av `/sv/servicevillkor/` gick
direkt från *"Webbadressen är okänd för Google"* till *"Upptäckt – inte indexerad för
närvarande"*, med `https://imvision.se/sitemap.xml` listad som upptäcktskälla. Det är exakt
den förflyttning fixen syftade till; indexering återstår och ligger hos Google.

Inga irreversibla åtgärder utfördes: inga removals, ingen property borttagen, inga
behörighets- eller ägarskapsändringar, ingen massbegäran om indexering.

---

## 19c. Fas 2 — lokalt arbete 2026-07-30

Branch `seo/phase-2-lcp-content-local`, bas `a191f20`. **Inget pushat, mergat eller
driftsatt.** All mätning gjord mot lokal production build; produktionsdomänen orörd.

### Production verification pending — Vercel Security Checkpoint

`imvision.se` returnerar `403` med `x-vercel-mitigated: challenge` till alla automatiserade
klienter. Fullständig uppdelning av vad som är verifierat var finns i
[`SEO-MEASUREMENT-BASELINE.md`](./SEO-MEASUREMENT-BASELINE.md) §4, tillsammans med ett
minimalt testprotokoll att köra när checkpointen är löst.

Kort: allt nedan är **lokalt verifierat**. Delar av det bekräftades på deployment-URL:en
tidigare samma dag. **Ingenting är verifierat på produktionsdomänen efter fas 2.**

### Arbetsström A — LCP

Hypotesen om `Reveal`/`StaggerReveal` är **motbevisad**. Ingen kodändring gjord. Full
A/B-redovisning i [`LCP-OPTIMIZATION-RESULTS.md`](./LCP-OPTIMIZATION-RESULTS.md).

### Arbetsström B — projektsidor

Två defekter åtgärdade med enbart befintlig data:

- `specs.type` fanns på alla 13 projekt och låg redan i JSON-LD som `additionalProperty`, men
  renderades aldrig. Strukturerad data beskrev något användaren inte kunde se. Nu synlig.
- På fyra projekt var `longDescription` ordagrant identisk med ingressen, så samma mening
  trycktes två gånger. Renderas nu bara när den skiljer sig.

Frågelista per sida i [`CONTENT-INPUT-REQUIRED.md`](./CONTENT-INPUT-REQUIRED.md).

### Arbetsström C — E-E-A-T

De tre påståendena på `/about/` finns på **ett ställe**: `AboutPageContent.tsx`, fyra
förekomster. **Ingen dokumenterad metod för "98% Client satisfaction"** och **inget
grundningsår** finns någonstans i repot. Exakt ersättningstext föreslagen — inte genomförd,
eftersom det är ett centralt marknadspåstående. Datamall för expertprofil skapad; ingen
platshållaridentitet publicerad.

### Arbetsström D — lokal SEO

[`LOCAL-SEO-DECISION-PACK.md`](./LOCAL-SEO-DECISION-PACK.md). Ingenting utfört i Google
Business Profile. Koordinater inte gissade.

### Arbetsström E — pilotkluster

SERP-kontroll körd på nytt i båda språken. Verdikt: bygg — men **briefen är blockerad** på
teknisk granskning. Se [`CONTENT-BRIEF-digital-signage-vs-led.md`](./CONTENT-BRIEF-digital-signage-vs-led.md).
**Noll nya sidor publicerade.**

### Arbetsström F — schema och GEO

Grafen validerad mot synligt innehåll på lokal build. **Inga avvikelser:**

| Kontroll | Resultat |
|---|---|
| JSON-LD parsar | ✅ noll fel på samtliga kontrollerade sidor |
| `@id`-integritet | ✅ alla referenser upplösta (`#logo` definieras inline i `Organization.logo`) |
| FAQPage på `/support/` | ✅ 5 frågor, samtliga synliga på sidan |
| `CreativeWork.additionalProperty` | ✅ samtliga värden nu synliga — den enda avvikelsen var `specs.type`, åtgärdad |
| Service på `/sales/`, `/rental/`, `/service/` | ✅ finns, serviceType matchar sidans faktiska tjänst |
| BreadcrumbList | ✅ följer verklig navigationsväg; `/sv/servicevillkor/` använder korrekt `/sv/` som hem |

Inget `aggregateRating`, `review`, `Person`, `geo` eller `openingHours` tillagt — samtliga
blockerade på uppgifter från er.

### Verifiering efter fas 2

| Kontroll | Resultat |
|---|---|
| `tsc --noEmit` | Ren |
| `eslint` | 1 varning — befintlig sedan tidigare, orörd |
| `npm run build` | Ren |
| Crawl av lokal build | 47 sidor, samtliga 200 |
| Duplicerade titlar | 0 |
| Föräldralösa sidor | 0 |
| Indexerbara utanför sitemap | 0 |
| Trasiga interna länkar | 0 |
| Mobil 320px / 390px | Ingen overflow |

⚠️ Crawlen rapporterar canonical-avvikelse på samtliga sidor. Det är förväntat: canonical
pekar korrekt på `https://imvision.se/...` medan crawlen körs mot `localhost`. Sökvägarna
matchar exakt — bara värdnamnet skiljer.

---

## 20. Exakta steg för granskning och sammanslagning

```bash
# 1. Hämta branchen
cd ~/Desktop/imvision-website
git checkout seo/full-audit-and-optimization
git log --oneline main..HEAD

# 2. Läs diffen — den är liten och avsiktligt läsbar
git diff main...HEAD

# 3. Verifiera lokalt
npm install
npx tsc --noEmit          # ska vara ren
npx eslint .              # ska ge exakt 1 varning (befintlig, ServicePageContent.tsx:10)
npm run build             # ska ge 62 routes

# 4. Kontrollera sitemapen
npx next start -p 3111 &
curl -s localhost:3111/sitemap.xml | grep -c "<loc>"     # ska vara 47
curl -s localhost:3111/sitemap.xml | grep servicevillkor # ska ge 1 träff

# 5. Kontrollera att footer-länken bara finns på svenska
curl -s localhost:3111/sv/ | grep -c servicevillkor      # 1
curl -s localhost:3111/    | grep -c servicevillkor      # 0

# 6. Kontrollera mobil-overflow (regressionen som åtgärdades)
#    Öppna /sv/ i DevTools @390px — ingen horisontell scroll

# 7. Verifiera att llms.txt matchar produktion (regressionen är åtgärdad i branchen)
curl -s localhost:3111/llms.txt > /tmp/a && curl -s https://imvision.se/llms.txt > /tmp/b
diff /tmp/a /tmp/b && echo "identiska"
#    OBS: samma ändring ligger fortfarande oincheckad i ~/Desktop/KimiV2.
#    Efter merge kan den kastas där (git checkout -- src/app/llms.txt/route.ts),
#    annars dyker den upp som en till synes orelaterad diff nästa gång.

# 8. Merge
git checkout main
git merge --no-ff seo/full-audit-and-optimization

# 9. ⚠️ Kontrollera deploy-vägen
#    Uppgifterna går isär: PROJECT.md §7 säger manuell deploy, medan
#    Vercel↔GitHub-integrationen enligt tidigare anteckningar återkopplades
#    2026-07-18 så att push till main auto-deployar.
#    Om auto-deploy är aktiv går en merge till main LIVE direkt.
#    Verifiera i Vercel → Project → Settings → Git innan du mergar.
npx vercel --prod   # om manuell deploy gäller
```

> **Två lokala kloner finns.** `~/Desktop/KimiV2` är din befintliga arbetsklon
> (står på samma commit `aaa6493`, med en oincheckad ändring i
> `src/app/llms.txt/route.ts` som jag medvetet inte rört). Denna branch ligger i
> en separat klon, `~/Desktop/imvision-website`, just för att inte störa det
> pågående arbetet. Kör `git push -u origin seo/full-audit-and-optimization`
> för att göra branchen tillgänglig från båda — observera att en branch-push
> kan trigga en **preview**-deploy, inte produktion.

**Efter deploy — i denna ordning:**

1. Skicka in `https://imvision.se/sitemap.xml` på nytt (42 → 47 URL:er).
2. Begär indexering av `https://imvision.se/sv/servicevillkor/` (Google har aldrig sett den).
3. Gå till Sidor → *Hittades inte (404)* och klicka **Validera korrigering** — de 19 URL:erna
   är nu antingen omdirigerade eller redan fungerande. Den förra valideringen misslyckades
   just för att redirectarna saknades.
4. Kontrollera efter ~2 veckor att `/contact-us`, `/service-and-support` och `/installation`
   inte längre får exponeringar som egna URL:er, utan att trafiken flyttats till målsidorna.
