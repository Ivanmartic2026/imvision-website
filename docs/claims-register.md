# Påståenderegister — imvision.se

Regel: **inget påstående visas som fakta förrän ägaren bekräftat det och angett källa.**
Status per 2026-10-18 (efter granskning och publiceringsförberedelse). Uppdatera den här filen när något bekräftas eller tas bort.

Statusar: `bekräftat` (finns källa i repo eller av ägaren) · `ej belagt` (visas inte) · `borttaget` (fanns, är borta) · `neutraliserat` (omformulerat utan siffra).

## 1. Borttagna eller neutraliserade påståenden

| Påstående | Plats innan | Åtgärd | Status |
|---|---|---|---|
| 15+ års erfarenhet | startsidan (`ProofSection`), `/about` | borttaget | borttaget |
| 500+ projekt levererade | startsidan (`ProofSection`), `/about` | borttaget (arkivet visar ~13 verifierade projekt) | borttaget |
| 98 % kundnöjdhet | startsidan, `/about` | borttaget — ingen mätning finns | borttaget |
| 24/7 support / "dygnet runt" | startsidan, `/about`, `/service` (sv+en), `/support` (sv+en) | borttaget, ersatt av "Svar inom 24 timmar" | borttaget |
| "Guaranteed response times… uptime commitments" | `/service` (en), `/support` (en+sv FAQ) | borttaget — inga avtalade nivåer finns dokumenterade | borttaget |
| "hela Europa" / "across Europe" | hero, `/about`, `/projects`, `/sales`, `/rental`, `/support`, root-metadata, manifest, llms.txt | ersatt av "Norden och Europa" / "the Nordics and Europe" | neutraliserat |
| "håller i 10 år, inte 10 månader" | startsidans hero-kort (Köpa LED) | ersatt av "byggd för långsiktig drift" | neutraliserat |
| "Nordens största" (The Icon) | `/projects` (sv) | ersatt av "en av Europas största DOOH-skärmar" (samma formulering som i projektbeskrivningen) | neutraliserat |
| ~13 mn besökare/år, 90 min besökstid, "längsta i Sverige" (The Geminis) | projektmall (sv+en) | borttaget — ingen källa; kvar står "ett av Sveriges mest besökta köpcentrum" | borttaget |
| 162 010 kontakter/dag (Södertull City) | projektmall (sv+en) | borttaget — ingen källa; kvar står trafikslaget (buss, bil, fotgängare) och formatet | borttaget |
| "IM Monitoring" (namngiven tjänst) | `ocean-outdoor-operations` (sv+en) | neutraliserat till "vår fjärrövervakning" / "our remote monitoring service" — skrivs tillbaka om ägaren bekräftar namnet | neutraliserat |
| Svarstid "samma arbetsdag" / "en arbetsdag" / "så snart som möjligt" | `/contact` (sv+en), `/sales` mid-CTA, formulär, kvittens, nästa steg | ersatt av ägarbeslutat **"Svar inom 24 timmar" / "We reply within 24 hours"** | borttaget |

## 2. Bekräftat (får visas)

| Påstående | Källa |
|---|---|
| IM Vision Group AB, org.nr 556924-1200, VAT SE556924120001 | `src/lib/seo.ts` (används i integritetspolicy och servicevillkor) |
| Huvudkontor Herkulesvägen 56, 553 02 Jönköping | `src/lib/seo.ts` (`CONTACT`) |
| Lager och kontor Svarvarvägen 20, 132 38 Saltsjö-Boo | `src/lib/seo.ts` (`STOCKHOLM_LOCATION`) |
| Telefon 010 330 46 36, info@imvision.se | `src/lib/seo.ts` |
| The Icon: 525 m², 41 × 13 m, Solna | projektdata `the-icon` |
| The Curve: 40 m² böjd skärm, Westfield Täby Centrum | projektdata `the-curve` |
| Kappahl: ca 160 platser och 220 kontaktpunkter i sex länder | projektdata `kappahl` |
| Södertull City: 7,37 m², Malmö | projektdata `sodertull-city` |
| The Icon @ The Node: 3 skärmar, 6 m breda | projektdata `the-node` |
| Nordstan: 26,88 × 7,68 m fasad | projektdata `nordstan-facade` |
| Boland City: 14,0 m², 2 × 4,0 × 1,75 m | projektdata `boland-city` |
| "Svar inom 24 timmar" | ägarbeslut i MASTERPROMPT §3 |

## 3. Bilder och rättigheter

| Bild | Typ | Kredit | Status |
|---|---|---|---|
| `public/images/photon-material/*` (hero, sektionsbilder) | konceptvisualisering (AI-render) | — | märks synligt "Konceptvisualisering" / "Concept visualisation" |
| `the-icon.jpg`, `the-halo.jpg`, `the-geminis.jpg`, `the-curve.jpg`, `sodertull-city.jpg` | projektfoto | © Ocean Outdoor | kräver publiceringstillstånd — **fråga ägaren** |
| `kappahl.jpg` | projektfoto | © Grassfish | kräver publiceringstillstånd — **fråga ägaren** |
| Unsplash-bilder på `concept-*`-projekt | tredjepartsfoto | Unsplash-licens | endast i noindex-konceptprojekt |

## 4. Öppna frågor till ägaren

1. Avtalade servicenivåer (svarstid, drifttid) — finns dokumenterade nivåer att publicera?
2. Finns "IM Monitoring" som namngiven tjänst?
3. Vart ska formulärförfrågningar gå (e-post i dag: `sales@imvision.se` via Resend — CRM?).
4. Vilka projekt-/eventfoton får publiceras (Ocean Outdoor, Grassfish)?
5. Får uthyrningsflottan (~4 000 m²) och egen tillverkning (fiberlaser, bockmaskin) lyftas?
6. Vilka personer får visas under Om oss?
7. Källa och år för "13 miljoner besökare/år" och "162 010 kontakter/dag" — annars tas siffrorna bort.
