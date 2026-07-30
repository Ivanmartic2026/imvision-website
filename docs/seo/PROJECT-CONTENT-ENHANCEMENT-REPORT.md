# Projektsidor — innehållsförbättring

**Datum:** 2026-07-30 · **Branch:** `seo/phase-2-lcp-content-local` · **Bas:** `a191f20`
**Roll i detta arbete:** Content Director och redaktör, inte teknisk auditor.

> Allt arbete är lokalt. Inget pushat, mergat eller driftsatt. Inga anrop till
> `imvision.se` — Vercels Security Checkpoint är fortfarande obekräftad.

---

## 1. Executive summary

Den viktigaste bristen på samtliga tretton case-sidor var inte längd. Det var att
**ingen sida sa vad IM Vision faktiskt hade gjort.**

Fyra projekt sa det redan — i sin egen publicerade text, men begravt i brödtext där varken
läsare eller Google kunde hitta det. Det är nu ett strukturerat, synligt fält.

Det avgörande beslutet i hela arbetet var vad jag **inte** skrev. Sex av tretton projekt är
Ocean Outdoors OOH-ytor, krediterade till Ocean Outdoor och länkade till deras egna
listningar. Ingenting publicerat säger vem som konstruerat eller installerat dem. Att ligga i
portföljen är inget bevis för att ha byggt något — därför saknar de rollfältet helt i stället
för att fyllas med en gissning.

Ordräkningen ändrades marginellt (±10 ord). Det är avsiktligt: arbetet handlade om att göra
befintliga fakta synliga och strukturerade, inte om att skriva mer text runt samma innehåll.

---

## 2. Valda projekt

Sex projekt med bäst verifierbart underlag:

| # | Projekt | Varför |
|---|---|---|
| 1 | **nordstan-facade** | Rikast tekniskt underlag *och* explicit roll: mått, 224 gjutna kabinett, 12 m radie, egen stålstomme, egen konstruktion, egna montörer |
| 2 | **sas-nordic-lounges** | Explicit roll ("har levererat och installerat") + namngiven kund + anpassningskriterier |
| 3 | **ocean-outdoor-operations** | Explicit roll + namngivna anläggningar + egen produkt (IM Monitoring) |
| 4 | **kappahl** | Mest kvantifierat: ~160 platser, 220 kontaktpunkter, sex namngivna marknader, år 2025, extern källa |
| 5 | **the-icon** | Störst mått (525 m², 41 × 13 m) + extern källa |
| 6 | **sodertull-city** | Precisa mått och plats + den enda sidan med bevisad outnyttjad efterfrågan (`södertull malmö`: 52 exponeringar, noll klick, pos 12,2) |

---

## 3. Bedömningstabell — alla tretton

| Projekt | Befintliga verifierbara fakta | Saknas | Risk för ogrundat påstående | Beslut |
|---|---|---|---|---|
| nordstan-facade | Mått, 224 kabinett, 12 m radie, gata, **roll** | År, pixelavstånd, uppdragsgivare, bild | Låg | **Skrev om** |
| sas-nordic-lounges | Kund (SAS), region, **roll**, anpassningskriterier | Flygplatser, antal lounger, antal skärmar, år | Låg | **Skrev om** |
| ocean-outdoor-operations | Anläggningar, IM Monitoring, **roll** | Antal skärmar, avtalsstart, SLA | Låg | **Skrev om** |
| kappahl | 160 platser, 220 kontaktpunkter, 6 marknader, 2025, källa | Skärmtyp per format, **roll** | Låg | **Skrev om** |
| the-icon | 525 m², 41 × 13 m, dubbelsidig, källa | År, pixelavstånd, **roll** | **Medel** — frestande att anta roll | **Skrev om, utan roll** |
| sodertull-city | 7,37 m², 936 × 832, 5 s, exakt plats | År, **roll**, **källa till 162 010 kontakter/dag** | **Hög** — ostödd siffra publicerad | **Skrev om, siffran flaggad** |
| the-curve | 40 m², böjd DOOH, källa | Mått på krökning, år, roll | Medel | Endast strukturförbättring |
| the-node | 3 skärmar, 6 m breda, källa | Total yta, år, roll | Medel | Endast strukturförbättring |
| the-halo | 2 ringar, 3 kuber, 360°, källa | **Alla mått**, år, roll | Medel | Blockerad för fördjupning |
| the-geminis | 4 skärmar, 13 M besökare/år, källa | Mått, år, roll | Medel | Blockerad för fördjupning |
| e4-tradet-nord | Vägkantsmedia, plats, källa | **Alla mått**, år, roll | Medel | Blockerad för fördjupning |
| taby-centrum | Retail-LED, **roll** | Allt kvantitativt, år | Låg | Blockerad för fördjupning |
| parksign | Egen produkt, **roll (design)** | Var installerad, antal, mått, år | **Hög** — oklart om produkt eller installation | Blockerad för fördjupning |

---

## 4. Inventerade faktakällor

Genomsökta: `src/lib/projects.ts`, `src/lib/projects-sv.ts`, `ProjectDetailPage.tsx`,
`ProjectVisual.tsx`, `seo.ts` (`projectLd`), bildmappen, alt-texter, `imageCredit`,
`sourceUrl`/`sourceLabel`, JSON-LD-utdata, samt båda språkversionerna av varje sida.

**Externa källor som redan är publicerade på sajten:** Ocean Outdoor (sex projekt, med URL),
Grassfish (Kappahl, med URL).

**Publika kundnamn som redan förekommer:** Ocean Outdoor, Grassfish, Kappahl, Newbie, SAS,
Westfield Mall of Scandinavia, Westfield Täby Centrum, Nordstan.

**Fakta som fanns men aldrig visades:** `specs.type` på alla tretton (låg redan i JSON-LD),
224 kabinett och 12 m radie på Nordstan (låg i brödtext).

Varje rollpåstående har fått ett `roleSource`-fält med den exakta mening det bygger på, så en
granskare kan kontrollera det utan att leta.

---

## 5. Genomförda textförbättringar

**Rollen synliggjord** — nytt typat fält `ProjectRole`, satt endast där texten säger det:

| Projekt | Roll | Källa |
|---|---|---|
| nordstan-facade | Konstruerat · Installerat | *"custom steel structure, in-house engineering, and our own installation team"* |
| sas-nordic-lounges | Levererat · Installerat | *"IM Vision has delivered and installed…"* |
| ocean-outdoor-operations | Driftat · Övervakat | *"Operations agreements… connection to IM Monitoring"* |
| taby-centrum | Installerat · Servat | *"Installed to be seen — serviced to keep performing."* |
| parksign | Formgivet | kategori *"In-house product"* |
| **sex Ocean Outdoor-ytor** | **ingen** | **inget publicerat säger det** |

**Dubbleringen borttagen** — två mönster fanns: brödtext identisk med ingressen (fyra
engelska poster) och brödtext som *inleds* med ingressen ordagrant och fortsätter (svenska
Nordstan). Båda hanteras nu; ingen sida i något språk upprepar ett stycke.

**Nordstans specifikation** — 224 gjutna kabinett och 12 m radie flyttade från brödtext till
faktarutan.

---

## 6. Metadataändringar

**Inga.** Titlar och beskrivningar på projektsidorna sattes i fas 1 via `projectTitle()`
(`Södertull City — LED-skärm, Malmö`) och är fortfarande bättre än vad en omskrivning skulle
ge. Kriteriet var att bara ändra när den nya versionen tydligt är bättre — den var den inte.

---

## 7. Internlänkning

Relaterade projekt valdes tidigare med `.slice(0, 2)`, vilket innebar att **varje projektsida
visade The Icon och The Halo** oavsett ämne. Nu poängsatt på delade taggar, samma anläggning,
samma ort och samma displaytyp:

| Sida | Före | Efter |
|---|---|---|
| The Curve | The Icon, The Halo | **The Geminis** (samma köpcentrum), **En fasad som svänger** (båda böjda) |
| The Icon | The Halo, The Geminis | **The Halo** (samma anläggning), **The Icon @ The Node** |
| SAS | The Icon, The Halo | **Kappahl** (båda digital signage-utrullningar), ParkSign |
| Drift | The Icon, The Halo | **Retail i rörelse** (båda service), ParkSign |

---

## 8. Schemaförändringar

JSON-LD följer nu det synliga innehållet per språk. `contentLocation` och
`additionalProperty` var tidigare engelska även på svenska sidor:

| | EN | SV |
|---|---|---|
| `contentLocation` | Gothenburg, Sweden | **Göteborg, Sverige** |
| `additionalProperty` | 26.88 × 7.68 m | **26,88 × 7,68 m** |

Inget `Person`, `Review` eller `aggregateRating` tillagt.

---

## 9. Svenska och engelska — konstaterade skillnader

**Faktafördelningen skilde sig.** På fyra projekt hade engelskan lagt hela texten i
`description` (som också är meta description) medan svenskan fördelat den mellan ingress och
brödtext. Samma fakta, olika placering — engelskans meta description blev därmed onödigt lång.

**Faktarutan var engelsk på svenska sidor.** `location`, `specs.type` och `specs.size`
renderades på engelska. Åtgärdat med lokaliserade fält.

**Decimaltecken var inkonsekvent inom samma sida.** Svensk brödtext skrev `7,37 m²` medan
faktarutan visade `7.37 m²`. Åtgärdat.

Inga faktamotsägelser mellan språken hittades — bara placering och formulering.

---

## 10. Fakta som inte kunde verifieras

| Påstående | Var | Problem |
|---|---|---|
| **~162 010 kontakter per dag** | sodertull-city, båda språken | Ingen `sourceUrl`, ingen `imageCredit`, ingen metod. Publicerad som faktum utan källa |
| 13 miljoner besökare/år, >90 min snittbesök | the-geminis | Har `sourceUrl` till Ocean Outdoor — rimligt underbyggd, men värd att bekräfta |
| "En av Europas största" / "Nordens största kommersiella skärm" | the-icon | Superlativ utan angiven mätning eller datum |

Ingen av dessa har ändrats. De kräver ert besked.

---

## 11. Projekt som fortfarande är blockerade

Sju: **the-halo, the-geminis, e4-tradet-nord, taby-centrum, parksign** samt fördjupning av
**the-curve** och **the-node**. Samtliga saknar mått, år eller roll. Formulär per sida i
[`CONTENT-INPUT-REQUIRED.md`](./CONTENT-INPUT-REQUIRED.md).

**ParkSign är oklarast:** det går inte att utläsa om det är en produkt ni säljer eller en
installation hos kund. Den frågan måste besvaras innan sidan kan skrivas alls.

---

## 12. Trovärdighetspåståenden som kräver beslut

`500+ Projects delivered`, `15+ Years of experience`, `98% Client satisfaction` — samtliga i
`AboutPageContent.tsx`, fyra förekomster. **Oförändrade.** Detaljerat underlag med exakt
formulering per språk, krävt bevis, risk och neutral ersättningstext i
[`CONTENT-INPUT-REQUIRED.md`](./CONTENT-INPUT-REQUIRED.md) §C.

---

## 13. Pilotklustrets status

**Blockerad.** Brief klar, noll sidor publicerade. Se
[`CONTENT-BRIEF-digital-signage-vs-led.md`](./CONTENT-BRIEF-digital-signage-vs-led.md).

---

## 14. Testresultat *(lokala labbresultat)*

| Kontroll | Resultat |
|---|---|
| `tsc --noEmit` | Ren |
| `eslint` | 1 varning — befintlig sedan tidigare, orörd |
| `npm run build` | Ren |
| Crawl av lokal build | 47 sidor, samtliga 200 |
| Dubblettitlar | 0 |
| Föräldralösa sidor | 0 |
| Indexerbara utanför sitemap | 0 |
| Duplicerade stycken | 0 i båda språken |
| Mobil 320px / 390px | Ingen overflow, 1 H1 per sida |
| JSON-LD | Parsar, matchar synligt innehåll per språk |

### Ordräkning före → efter

| Projekt | EN | SV |
|---|---|---|
| nordstan-facade | 90 → **100** | 90 → 90 |
| the-icon | 117 → 119 | 106 → 108 |
| kappahl | 123 → 117 | 113 → 108 |
| sas-nordic-lounges | 140 → 137 | 124 → 117 |
| ocean-outdoor-operations | 79 → 79 | 82 → **74** |
| parksign | 67 → 69 | 65 → **62** |

Nedgångarna är borttagen dubblering. Sidorna säger lika mycket med färre ord — men de är
fortfarande för tunna, och det löses bara med fakta från er.

---

## 15. Ändrade filer

```
src/lib/projects.ts                                  ProjectRole, role, roleSource, Nordstan-specs
src/lib/projects-sv.ts                               specsType, location, specsSize
src/components/sections/projects/ProjectDetailPage.tsx  rollrad, lokaliserad faktaruta,
                                                     relevansstyrda relaterade projekt,
                                                     dubbleringsfilter, lokaliserad JSON-LD
docs/seo/PROJECT-CONTENT-ENHANCEMENT-REPORT.md       (ny)
```

---

## 16. Commits i denna omgång

```
b9eb80d  content: state IM Vision's verified role on the projects that document it
7575267  content: give the Swedish fact block Swedish wording
(+ dubbleringsfix)
```

---

## 16b. Tillägg efter rapporten skrevs

Tre ytterligare förbättringar, samtliga byggda på `role`-fältet och därmed på redan
publicerade fakta.

**Relaterade tjänster på projektsidorna.** Projektsidorna länkade till `/sales/`,
`/rental/` och `/service/` **enbart via nav och footer** — noll tjänstelänkar i `<main>`.
Länkarna härleds nu ur den verifierade rollen:

| Roll | Länkar till |
|---|---|
| formgivet / konstruerat / levererat / installerat | `/sales/` |
| servat / driftat / övervakat | `/service/` |

Nordstan → permanenta installationer. Driftprojektet → service. Täby Centrum → båda.
**De sex Ocean Outdoor-ytorna får inget block alls** — samma disciplin som för rollraden,
i stället för att antyda ett tjänsteförhållande som kanske inte finns.

**Rollen i JSON-LD.** Nu när den är synlig på sidan anges den även som `additionalProperty`,
lokaliserad: `IM Vision's role = Engineered · Installed` respektive
`IM Visions roll = Konstruerat · Installerat`. Projekt utan roll får ingen egenskap.

**llms.txt vände på urvalet.** Filen tog `.slice(0, 6)` av råa listan, vilket returnerade
exakt de sex Ocean Outdoor-ytorna — de där ingenting publicerat säger vad IM Vision gjort —
och utelämnade varenda projekt som *gör* det. För en språkmodell som ska avgöra vad den kan
tillskriva bolaget var det bakvänt. Nu sorteras dokumenterade roller först, med rollen
utskriven.

Formuleringen är medvetet neutral (*"IM Vision's role: engineered, installed"*) i stället för
*"installed this installation"* — posterna är inte alla installationer: ParkSign är en egen
produkt och driftposten är ett avtal som omfattar flera skärmar.

---

## 17. Rekommenderade nästa steg

1. **Bekräfta rollen på de sex Ocean Outdoor-ytorna.** Driftavtalet nämner Mall of Scandinavia
   och Täby Centrum — det är samma anläggningar som The Icon, The Halo, The Geminis och
   The Curve står i. Omfattas de skärmarna? Om ja är det fem sidor som direkt kan säga vad
   IM Vision gör för dem.
2. **Källa eller ta bort 162 010-siffran.**
3. **Installationsår på alla tretton** — låser upp `datePublished`.
4. **Södertull City först** av fördjupningarna. Enda projektet med bevisad efterfrågan.
5. **Klargör ParkSign** — produkt eller installation?

---

## 18. Final branch review

**Datum:** 2026-07-30 · **Granskningsläge:** senior kodgranskare, ingen ny utveckling.

| | |
|---|---|
| Branch | `seo/phase-2-lcp-content-local` |
| Bascommit | `a191f20` |
| HEAD | `fc1be41` |
| Commits sedan bas | **17** (16 + en rättning från denna granskning) |
| Arbetsträd | Rent, noll otrackade filer |

### Ett fel hittades och rättades

`fc1be41` — commit `82f3fe8` dolde brödtexten på de fyra engelska projekt vars
`longDescription` är byte-identisk med ingressen, men **lät rubriken stå kvar**. Resultatet
var ett tomt `<h2>About the project</h2>` på `nordstan-facade`, `taby-centrum`,
`ocean-outdoor-operations` och `parksign`.

Villkoret omfattar även källänken, så projekt med citat men utan egen brödtext behåller
sektionen — The Icon och Kappahl påverkas inte. Svenska sidor var aldrig drabbade.

Efter fixen: **noll tomma rubriker** på samtliga 26 projektsidor.

### Tjänstelänkslogiken

Härledd ur den verifierade rollen, aldrig ur att projektet existerar:

| Roll | Tjänst |
|---|---|
| `designed`, `engineered`, `delivered`, `installed` | `/sales/` |
| `serviced`, `operated`, `monitored` | `/service/` |

Verifierat på 13 projekt × 2 språk: rätt tjänst per roll, inga dubbletter, korrekt
`/sv/`-prefix, naturliga länktexter i båda språken, **inget block på de åtta projekt utan
dokumenterad roll**.

⚠️ **Observation för framtiden:** `ProjectRole` saknar värden för uthyrning och support, så
`/rental/` och `/support/` kan i dag aldrig länkas. Inget projekt har sådan roll, så det är
korrekt nu — men typen behöver utökas när ett uthyrningsprojekt läggs till.

### Roller i JSON-LD

| Projekt | Roll | Synlig i HTML | I JSON-LD | Språk |
|---|---|---|---|---|
| sas-nordic-lounges | Delivered · Installed / Levererat · Installerat | ✅ | ✅ | ✅ |
| nordstan-facade | Engineered · Installed / Konstruerat · Installerat | ✅ | ✅ | ✅ |
| taby-centrum | Installed · Serviced / Installerat · Servat | ✅ | ✅ | ✅ |
| ocean-outdoor-operations | Operated · Monitored / Driftat · Övervakat | ✅ | ✅ | ✅ |
| parksign | Designed / Formgivet | ✅ | ✅ | ✅ |

**Utan roll, utan egenskap:** the-icon, the-halo, the-geminis, the-curve, the-node,
e4-tradet-nord, sodertull-city, kappahl.

`roleSource` förekommer **noll gånger** i renderad HTML på samtliga 26 sidor — fältet läses
aldrig av någon komponent och serialiseras därför inte. Inga dubbletter i
`additionalProperty`.

### Urvalsprincip i llms.txt

```
verified = projects.filter(verified === true)
sortera: projekt med role[] först        (stabil sort → oförändrad inbördes ordning)
ta de 6 första
rolltext: " IM Vision's role: <roller kommaseparerade>."  — endast om role finns
```

Faktisk ordning, verifierad mot den **genererade** filen och identisk över tre hämtningar:

1. SAS — Lounges & Express Check-in · delivered, installed
2. A façade that turns · engineered, installed
3. Retail in motion · installed, serviced
4. Screens never left alone · operated, monitored
5. ParkSign · designed
6. The Icon · *(ingen roll, ingen tillskrivning)*

Formuleringen är neutral — inte *"installed this installation"* — eftersom ParkSign är en egen
produkt och driftposten ett avtal över flera skärmar. 22 markdown-länkar, samtliga
`https://imvision.se`, noll lokala eller trasiga, samtliga löser till 200 lokalt.

### Slutliga tester *(lokala labbresultat)*

| Kontroll | Resultat |
|---|---|
| `tsc --noEmit` | Ren |
| `eslint` | 1 varning — befintlig före basen, orörd |
| `npm run build` | Ren |
| Crawl | **47/47 sidor 200** |
| Trasiga länkmål · föräldralösa · utanför sitemap | 0 · 0 · 0 |
| Dubblettitlar · hreflang-brott · H1-avvikelser | 0 · 0 · 0 |
| Tomma rubriker (26 projektsidor) | **0** efter `fc1be41` |
| Duplicerade stycken · självrelaterade · dubbla tjänstelänkar | 0 · 0 · 0 |
| Overflow @320px och @390px | 0 sidor |
| JSON-LD parsar · matchar synligt innehåll | ✅ · ✅ |
| robots.txt · sitemap.xml (47) · llms.txt | 200 · 200 · 200 |
| Produktionsanrop | **inga** |

### Diffgranskning mot basen

Fem källfiler ändrade. **Ingen** konfigurationsfil rörd — inte `next.config.ts`,
`vercel.json`, `package.json`, `robots.ts` eller `sitemap.ts`. Inga nya externa nätverksanrop,
inga nya hårdkodade URL:er, inget `Person`/`Review`/`aggregateRating`.

### Blockerade affärsbeslut — samtliga oförändrade

`162 010 kontakter/dag` (byte-identisk före och efter, båda språken) · `500+ Projects
delivered` · `15+ Years of experience` · `98% Client satisfaction` (`AboutPageContent.tsx`
förekommer inte i diffen) · GBP-kategorier · namngiven expertprofil · tekniska
rekommendationer i jämförelseartikeln · rollerna för The Icon, The Halo, The Geminis och
The Curve.

**Inget drift- eller serviceförhållande har härletts ur att projekt ligger på samma
anläggning.** Att driftavtalet nämner Mall of Scandinavia och Täby Centrum har uteslutande
använts som en öppen fråga i [`CONTENT-INPUT-REQUIRED.md`](./CONTENT-INPUT-REQUIRED.md) §C3 —
aldrig som ett publicerat påstående.

### Rekommendation

**Redo att pushas: ja.** **Redo för PR: ja.**

Grinden är grön, det enda funna felet är rättat och verifierat, och inget i diffen rör
produktion, konfiguration eller blockerade påståenden.

⚠️ **Men merga inte förrän Vercel-checkpointen är löst.** En merge till `main` går live
omedelbart via auto-deploy, och ingenting i denna branch är verifierat mot produktionsdomänen.
