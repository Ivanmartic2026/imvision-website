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

**Två faser kunde inte genomföras:** Search Console (§13) och Lighthouse-poäng
(§11) är blockerade av åtkomstskäl som kräver dig.

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
| Google Search Console | — | ❌ Blockerad (§13) |
| PageSpeed Insights API | — | ❌ 429, kräver API-nyckel |
| CrUX fältdata | — | ❌ Kräver API-nyckel |

---

## 4. Search Console-perioder och filter

**Inga.** Ingen GSC-data kunde hämtas. Se §13 för orsak och åtgärd.

Detta innebär att följande delar av uppdraget **inte** kunde besvaras med data:
queries med hög impression/låg CTR, sidor i position 4–20, kannibalisering,
mobil-vs-desktop, land-för-land, indexeringsorsaker, faktisk CWV-fältdata.
Rekommendationerna nedan bygger därför på crawl och SERP, inte på din trafik.

---

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
 src/app/(en)/contact/page.tsx     |  2 +-
 src/app/(en)/projects/page.tsx    |  2 +-
 src/app/(en)/support/page.tsx     |  2 +-
 src/app/(sv)/sv/contact/page.tsx  |  2 +-
 src/app/(sv)/sv/projects/page.tsx |  2 +-
 src/app/(sv)/sv/support/page.tsx  |  5 +++--
 src/app/sitemap.ts                | 26 ++++++++++++++++++++++++--
 src/components/layout/Footer.tsx  | 16 +++++++++++++++-
 src/lib/i18n.ts                   | 10 ++++++++++
 9 files changed, 57 insertions(+), 10 deletions(-)
```

Ingen affärslogik, prissättning, betalning eller autentisering berörd.
Inget synligt innehåll ändrat — H1:or verifierat oförändrade.

---

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

❌ **Kunde inte köras.**

- PageSpeed Insights API returnerade `429 Too Many Requests` utan API-nyckel.
- Jag lade inte till en API-nyckel eftersom du kräver godkännande för det.
- Chrome DevTools MCP:s `lighthouse_audit` var blockerad av en upptagen
  automationsprofil (samma orsak som §13).

**Vad jag mätte istället** — verkliga Chromium-mätvärden mot lokal produktionsbuild:

| Sida | Enhet | LCP | CLS |
|---|---|---|---|
| `/` | mobil | 488 ms | **0.0000** |
| `/` | desktop | 60 ms | 0.0000 |
| `/sales/` | mobil | 52 ms | 0.0000 |
| `/projects/` | mobil | 128 ms | 0.0000 |
| `/contact/` | mobil | 1112 ms | 0.0000 |
| `/sv/support/` | mobil | 44 ms | 0.0000 |
| `/sv/servicevillkor/` | mobil | 44 ms | 0.0000 |

⚠️ Dessa siffror är från **localhost utan nätverksstrypning** och säger inget om
verklig mobilprestanda. De visar att CLS är strukturellt noll och att inget
renderingsblockerande fel finns — inget mer. Riktiga siffror kräver PSI/CrUX.

---

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

❌ **Ingen åtkomst — uppdraget kunde inte genomföras.**

**Orsak, i tur och ordning:**
1. Chrome DevTools MCP kunde inte starta: `The browser is already running for
   ~/.cache/chrome-devtools-mcp/chrome-profile`. En annan process håller profilen.
2. Även med åtkomst är den profilen en ren automationsprofil utan Google-inloggning.
   GSC kräver din inloggade session.
3. Alternativvägen — pluginens `gsc_query.py` via OAuth — kräver att Google
   OAuth-uppgifter läggs upp, vilket är en API-nyckelåtgärd du måste godkänna.

Ingen av dessa kan jag lösa själv: alla tre kräver antingen din Google-inloggning
(inkl. eventuell tvåfaktor) eller ditt godkännande att lägga till autentiseringsuppgifter.

**Inga Search Console-åtgärder har utförts.** Inga removals, ingen sitemap
inskickad, inga behörighets- eller ägarskapsändringar.

**När du löser åtkomsten, gör detta först:** skicka in den uppdaterade sitemapen
(47 URL:er mot tidigare 42) och begär indexering av `/sv/servicevillkor/`.

---

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
| Ingen GSC-verifiering av effekten | Medel | Ändringarna är låg risk men omätbara tills §13 löses |
| Deploy sker manuellt (`npx vercel --prod`) | Medel | Git-push deployar **inte**. Merge räcker inte för att nå produktion. |
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
| Indexerade sidor | GSC → Sidor | Okänd (blockerad) | Varje vecka första månaden |
| Sitemap-upptäckta URL:er | GSC → Sitemaps | 42 → **47** | Efter varje deploy |
| CTR på `/projects/`, `/support/`, `/contact/` | GSC → Resultat | Okänd | 28 dagar efter deploy |
| Genomsnittsposition, icke-varumärke | GSC | Okänd | Månadsvis |
| LCP / INP / CLS mobil | CrUX | CLS strukturellt 0 | Månadsvis |
| Trasiga länkar | Egen crawl | 0 | Vid varje release |
| Sidor utanför sitemap | Egen crawl | 0 | Vid varje release |

Crawl- och analysskripten finns kvar i sessionens scratchpad och kan köras om
mot valfri URL för att reproducera tabellerna i §10 och §12.

---

## 19. Lista över alla commits

```
88f1603  seo: stop the language switcher linking to a non-existent English page
ad38d2a  fix: wrap footer legal row (regression from the servicevillkor link)
ea6c4a2  seo: give hub pages keyword-bearing titles
28f471d  seo: strengthen internal linking to sv servicevillkor
3080395  seo: add legal pages and sv-only servicevillkor to sitemap
```

Plus denna dokumentation.

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

# 7. Merge
git checkout main
git merge --no-ff seo/full-audit-and-optimization

# 8. ⚠️ Deploy sker INTE via git push
npx vercel --prod
```

**Efter deploy:** skicka in `https://imvision.se/sitemap.xml` på nytt i Search
Console och begär indexering av `https://imvision.se/sv/servicevillkor/`.
