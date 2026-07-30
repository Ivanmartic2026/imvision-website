# Mätbaslinje och driftövervakning

**Datum:** 2026-07-30 · **Branch:** `seo/phase-2-lcp-content-local` · **Bas:** `a191f20`

---

## 1. Search Console-baslinje

**Property:** `sc-domain:imvision.se` — domänproperty (verifierad domän, inte URL-prefix).
**Konto:** ivan@imvision.se · **Söktyp:** Webb · **Inga filter** utöver de som anges.
**Senaste kompletta datadag vid avläsning:** 2026-07-27.

| Period | Datum | Klick | Exponeringar | CTR | Position |
|---|---|---:|---:|---:|---:|
| 24 timmar | 2026-07-28 – 07-29 | 2 | 44 | 4,5 % | 4,3 |
| **28 dagar** | **2026-06-30 – 07-27** | **105** | **865** | **12,1 %** | **9,7** |
| **3 månader** | **2026-04-28 – 07-27** | **416** | **2 880** | **14,4 %** | **7,9** |

⚠️ **12-månadersfönster finns inte.** Propertyn skickades in 2026-07-17 och exponerar ingen
djupare historik än tre månader.

⚠️ **Ingen ny GSC-avläsning gjordes i denna fas.** Siffrorna ovan är oförändrade från
2026-07-30 förmiddag. Search Console-åtgärder är pausade på din instruktion tills du
kontrollerat Vercel-checkpointen.

### Dimensioner vid baslinjen (28 dagar)

**Enheter** — Desktop 64 klick / 485 expo / CTR 13,2 % / pos 13,3 · Mobil 40 / 355 / 11,3 % /
**pos 5,0** · Surfplatta 1 / 25 / 4,0 % / 5,8. Mobil rankar markant bättre men ger färre klick.

**Länder** — Sverige 86 klick / 428 expo (82 % av klicken) · Danmark 6 / 13 · Storbritannien
3 / 16 · Kina 3 / 9 · Kanada 1 / **104** · USA 1 / **73**. Kanada och USA är brus från
generiska `vision`/`login`-frågor, inte efterfrågan.

**Visningssätt i sökresultaten** — tom tabell. Inga rich results eller sitelinks registrerade.

**Indexering** — 65 indexerade, 42 ej indexerade (19 "Hittades inte (404)" med misslyckad
validering, 9 avsedda noindex, 6 alternativ sida med canonical, 4 omdirigering, 3 upptäckt–ej
indexerad, 1 genomsökt–ej indexerad, 0 serverfel, 0 dubbletter utan canonical).

**Sitemap** — inskickad 2026-07-17, senast läst 2026-07-29, status Lyckades, 42 upptäckta
URL:er. Den uppdaterade 47-URL-versionen var inskickad men ännu inte omläst.

**Core Web Vitals** — *"Det finns inte tillräckligt med data om användning från de senaste 90
dagarna"* för både mobil och desktop. Källa CrUX, uppdaterad 2026-07-28. **Fältdata existerar
inte** för den här sajten; trafiken ligger under CrUX tröskel.

---

## 2. Bevakningsgrupper

Skapa dessa som sparade filter i Search Console. De är utformade för att kunna följas var för
sig, eftersom de rör sig av olika skäl.

| Grupp | Frågefilter | Baslinje 28 d | Varför |
|---|---|---|---|
| **Digital signage** | innehåller `digital signage`, `signage` | ~9 expo, 0 klick | Vokabulärbryggan (`168e496`) riktar `/sales/` och `/service/` hit. **Primär effektmätare för Våg 0** |
| **LED display (EN)** | innehåller `led display`, `led screen` | låg | Befintlig vokabulär — ska inte falla när den nya införs |
| **LED-skärm (SV)** | innehåller `led skärm`, `led-skärm` | ~2 expo | Svensk motsvarighet. Följ separat — den svenska SERP:en har egna aktörer |
| **Installation** | innehåller `installation`, `installera` | ~4 expo | `digital signage installation` rankar redan pos 2,0 |
| **Service & underhåll** | innehåller `service`, `maintenance`, `underhåll`, `drift` | låg | `/service/` står på pos 25,6 — störst rörelseutrymme |
| **Uthyrning** | innehåller `rental`, `uthyrning`, `hyra` | ~1 expo | `led display uthyrning event` pos 11,0 |
| **Lokalt** | innehåller ortsnamn: `stockholm`, `malmö`, `göteborg`, `jönköping`, `täby`, `solna` | ~68 expo | Domineras av `södertull malmö` (52 expo, 0 klick, pos 12,2) |
| **Varumärke** | innehåller `imvision`, `im vision`, `imvison`, `imbision`, `immvision`, `improd` | 80 klick / 358 expo | **76 % av alla klick.** Målet är att andelen sjunker — inte att den växer |
| **Login** | innehåller `login`, `logga in`, `inloggning` | 92 expo, 1 klick | Latent produktefterfrågan. Följ volymen som beslutsunderlag för kundportal |

**Om målsättning:** inga utlovade siffror. Det som ska följas är *riktning* — andelen
varumärkestrafik nedåt, kommersiella icke-varumärkesexponeringar uppåt, 404-gruppen mot noll.
Med ~4 klick/dag krävs flera månader innan en förändring är statistiskt meningsfull.

---

## 3. Driftbaslinje

**Fil:** [`drift-baseline.json`](./drift-baseline.json) — versionshanterad i repot.

⚠️ **Detta är en baslinje för den lokala production-buildens innehåll, inte för
produktionsdomänen.** Pluginens `drift baseline` avvisar `localhost` av SSRF-skäl, och
`imvision.se` får inte anropas. Baslinjen är därför tagen med projektets egen crawler mot
`next start`.

Innehåll per sida: statuskod, title, beskrivningslängd, canonical, robots-meta, `lang`,
antal H1, hreflang-uppsättning, schematyper, antal utgående interna länkar, ordräkning.
Plus sitemap-URL-antal med hash, och robots.txt med hash.

**Nuläge:** 47 sidor, samtliga 200, noll noindex bland de crawlade, sitemap 47 URL:er.

### Så kontrollerar du efter en framtida release

Kör om crawlen mot en lokal build och jämför mot `drift-baseline.json`:

| Vad | Vad som ska larma |
|---|---|
| Indexerbara URL:er | Antalet ändras utan att någon lagt till eller tagit bort en sida |
| Statuskoder | Något annat än 200 bland de crawlade |
| Canonical | Avviker från sidans egen URL |
| Hreflang | Uppsättningen ändras, eller ömsesidigheten bryts |
| Titles | Längd utanför 25–60 tecken, eller dubbletter mellan EN och SV |
| Sitemap | URL-antal ändras, eller hash ändras utan avsedd ändring |
| Robots | Hash ändras överhuvudtaget |
| Schema | Schematyper försvinner från en sidtyp |
| Interna länkar | En sida får noll inkommande länkar (föräldralös) |
| LCP (labb) | Median över 3 körningar försämras mer än ~10 % |
| Prioriterade frågegrupper | Se tabellen i avsnitt 2 |

---

## 4. Production verification pending — Vercel Security Checkpoint

Produktionsdomänen returnerar `HTTP 403` med `x-vercel-mitigated: challenge` till alla
automatiserade klienter. Följande tabell skiljer på vad som faktiskt är verifierat och var.

| Kontroll | Lokalt verifierat | Verifierat på deployment-URL | Produktionsdomän |
|---|---|---|---|
| Build, TypeScript, lint | ✅ | — | — |
| 47 sidor, samtliga 200 | ✅ | — | ⏸️ |
| Sitemap 47 URL:er | ✅ | ✅ (tidigare idag) | ⏸️ |
| robots.txt | ✅ | ✅ (tidigare idag) | ⏸️ |
| llms.txt markdown-länkar | ✅ | ✅ (tidigare idag) | ⏸️ |
| Canonical och hreflang | ✅ | — | ⏸️ |
| JSON-LD parsar, typer intakta | ✅ | — | ⏸️ |
| Mobil 320px och 390px | ✅ | — | ⏸️ |
| Lighthouse A11y/BP/SEO/Agentic | ✅ (labb) | — | ⏸️ |
| **LCP med verklig nätverkslatens** | ❌ ej meningsfullt lokalt | ❌ | ⏸️ **blockerad** |
| **Fullständig crawl av produktion** | — | — | ⏸️ **blockerad** |
| **Lighthouse mot produktion** | — | — | ⏸️ **blockerad** |
| **Search Console live-test** | — | — | ⏸️ **blockerad** |
| **Slutlig driftjämförelse** | — | — | ⏸️ **blockerad** |

**Deployment-URL:ens siffror används aldrig som produktionens nätverksvärden** — den har annan
cache och routing. Den har enbart använts för att bekräfta att deployat innehåll är korrekt.

---

## 5. Minimalt testprotokoll när checkpointen är löst

Kör i denna ordning. Stanna vid första avvikelsen.

```bash
# 1. Bekräfta att domänen svarar normalt igen
curl -sSI https://imvision.se/ | grep -iE "^HTTP|x-vercel-mitigated"
#    Förväntat: HTTP/2 200 och ingen mitigated-rad

# 2. SEO-kritiska filer
for u in /robots.txt /sitemap.xml /llms.txt; do
  echo -n "$u "; curl -sS -o /dev/null -w "%{http_code}\n" "https://imvision.se$u"
done
#    Förväntat: 200 200 200. Sitemap ska innehålla 47 <loc>

# 3. Stickprov på de omdirigerade legacy-URL:erna
for p in /contact-us /service-and-support /our-projects /felanmalan; do
  curl -sSL -o /dev/null -w "$p -> %{http_code} %{url_effective}\n" "https://imvision.se$p"
done
#    Förväntat: samtliga 200 på rätt målsida

# 4. LCP-uppdelning — den mätning hela Arbetsström A väntar på
npx lighthouse https://imvision.se/service/ --form-factor=mobile \
  --throttling-method=simulate --output=json --output-path=/tmp/prod-service.json
#    Läs lcp-breakdown-insight. Reproduceras render delay ~2 097 ms?
#    Om NEJ: LCP-frågan är stängd, ingen designändring behövs.
#    Om JA: isolera typsnittsswap vs hydrering vs consent-banner innan något ändras.
```

**Kör högst en Lighthouse-körning per sida i första omgången** och kontrollera att
checkpointen inte återkommer innan volymen ökas. Det var upprepade crawls och ~15
Lighthouse-körningar som utlöste mitigeringen från början.

**Först därefter** återupptas Search Console-åtgärder: kontrollera om sitemapen lästs om
(42 → 47) och om 404-valideringen gått igenom.
