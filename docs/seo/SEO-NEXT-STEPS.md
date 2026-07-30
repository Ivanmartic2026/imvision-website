# SEO — nästa steg efter driftsättningen 2026-07-30

**Underlag:** [`SEO-AUDIT-AND-IMPLEMENTATION.md`](./SEO-AUDIT-AND-IMPLEMENTATION.md) · [`SEO-ACTION-PLAN.md`](./SEO-ACTION-PLAN.md) · [`cluster-plan.json`](./cluster-plan.json)
**Framtaget av:** fyra specialiserade analyser (SXO, innehåll/E-E-A-T, lokal SEO, ämneskluster), samtliga fynd verifierade mot produktion innan de tagits in här.

---

## 1. Läget nu

Den tekniska skulden är betald. Efter driftsättningen: 47 sidor, 100 % 200, noll trasiga länkar, noll canonical-avvikelser, noll dubblettitlar, noll föräldralösa sidor, alla 19 gamla 404-URL:er omdirigerade, Lighthouse 100 på tillgänglighet, best practices, SEO och AI-sökbarhet.

Det som återstår är inte buggar. Det är **efterfrågan** — och en sak som visade sig vara ett vokabulärproblem.

---

## 2. Fyndet som ändrar prioriteringen

Klusteranalysen körde ~24 riktiga SERP-sökningar och fann följande:

> **Varje engelsk fråga som använder "digital signage" ger en helt annan uppsättning rankande domäner än frågor som använder "LED display". Noll delade domäner.**

Det är inte synonymer för Google — det är två skilda ämnesrum. CDW, OptiSigns, Yodeck och ScreenCloud äger "digital signage"; InfiLED och tillverkarsajter äger "LED display".

Sajten säger **uteslutande "LED display"**. Search Console visar samtidigt att den efterfrågan som faktiskt dyker upp använder det andra ordet:

| Fråga | Exponeringar | Position |
|---|---:|---:|
| digital signage solutions | 4 | 13,8 |
| signage solutions | 2 | 6,0 |
| digital signage installation | 1 | **2,0** |
| digital display solutions | 1 | **2,0** |
| digital signage companies | 1 | 22,0 |

Volymerna är små, men positionerna 2,0 på två av dem visar att Google redan anser sidan relevant — den talar bara fel språk. **Detta är den billigaste förbättringen som finns: noll nya URL:er.**

⚠️ Byt inte ut "LED" mot "digital signage" överallt. Den svenska marknaden beter sig annorlunda — där återkommer `displayteknik.se`, `avexpert.se` och `trefyr.se` tvärs över fasad-, köpcentrum- och butiksfrågor. Svenskan behöver båda begreppen, engelskan behöver bron.

---

## 3. Planen i vågor

### Våg 0 — Vokabulärbryggan (ingen ny URL, störst utväxling)

| Åtgärd | Sida | Bevis | Blockerad? |
|---|---|---|---|
| Omrikta titel, H1 och meta mot "digital signage" | `/sales/` | Två frågor rankar redan pos 2,0 | Nej |
| Samma | `/service/` | Rankar pos 25,6 trots kärntjänst | Nej |
| Samma, "LED display support & SLA response times" | `/support/` | — | Nej |

Förväntad riktning: fler exponeringar på icke-varumärkesfrågor inom 4–8 veckor. **Medel evidens** — SERP-samplingen är gjord med WebSearch, inte DataForSEO, så domänöverlappen är kalibrerade uppskattningar, inte exakta topp-10-snitt.

### Våg 1 — Lås upp det som blockerar allt annat

Dessa kräver dig. Ingenting i våg 2–3 når sin fulla effekt utan dem.

| # | Vad | Varför det är först | Vad som behövs från dig |
|---|---|---|---|
| 1 | **Google Business Profile för båda adresserna** | Primärkategori är den enskilt tyngst vägande lokala rankingfaktorn, och den står på noll idag. Fel kategori är samtidigt den värsta negativa faktorn — därför ett beslut, inte en gissning | Google-konto, samt fysisk närvaro för verifieringskort (2–5 v per adress) |
| 2 | **Beslut om kategori per plats** | Jönköping är HQ med experience centre (showroom). Saltsjö-Boo är lager/kontor — har det publikt besök? | Hur besökare faktiskt möter respektive adress |
| 3 | **Projektfakta** | 13 projektsidor är 48–102 ord. Sex har redan hårda fakta; sju saknar allt | Mått, skärmantal, år, uppdragsgivare, samt **IM Visions roll** (såld / hyrd / installerad / servad) per projekt |
| 4 | **En namngiven expert** | Noll `Person`-schema, noll byline, noll teamsida. Expertis-signalen är en hård nolla | Namn, titel, en mening bakgrund, samtycke att namnges |
| 5 | **Källa till "98% Client satisfaction"** | Se §4 | Underlag — eller beslut att ta bort påståendet |

### Våg 2 — Innehållsdjup på det som redan finns

Sex av 13 projektsidor kan skrivas om **utan ny data** — de hårda fakta som behövs står redan på sidan, men upprepas ordagrant som både ingress och brödtext i stället för att utvecklas. The Icon (525 m², 41×13 m), Nordstan (26,88×7,68 m, 224 gjutna kabinett), Södertull City (936×832 px), Kappahl (~160 platser, 220 touchpoints).

Mall för en stark case-sida: H1 + sammanfattning → faktablock (plats, format, mått, uppdragsgivare, **IM Visions roll**) → utmaningen → lösningen utvecklad i 2–3 stycken → drift-/serviceavtal om sådant finns → foto i verklig miljö → byline → datum → relaterade projekt.

**Sluta duplicera ingressen som brödtext.** Mönstret finns på ParkSign, Nordstan, Täby Centrum och Ocean Outdoor Operations och läses som utfyllnad av både besökare och kvalitetsgranskare.

### Våg 3 — Bygg ut klustren

Tre parallella nav, inte ett. `/sales/`, `/rental/` och `/service/` har **noll SERP-överlapp** sinsemellan — att tvinga in dem under en pelare vore att missförstå hur marknaden segmenterar. Full struktur i [`cluster-plan.json`](./cluster-plan.json): 3 pelare + 18 spokes, varav 17 nya URL:er, per språk.

Bygg i denna ordning:
1. Förklararen "digital signage vs LED display" — den blir sajtens interna länkryggrad
2. Köpcentrum-spoke (4 befintliga case bakom sig), fasad-spoke (3 case), butiks-spoke
3. Prisguide (största luckan idag), pixel pitch-guide, DOOH för fastighetsägare, hur man väljer partner
4. Hyr-vs-köp-bryggan, event-uthyrning, installationsguide
5. Serviceavtal, fjärrövervakning, drifttid

Inga programmatiska sidor. Inga ortsdubbletter.

### Parallellt — LCP

Sajtens största tekniska brist, oförändrad: **4,4–6,1 s på mobil** mot gränsvärdet 2,5 s. CLS är 0, TTFB 53–131 ms — det är enbart `Reveal`/`StaggerReveal` som håller innehåll ovanför vikningen på `opacity: 0` tills JavaScript kört. Sidan utan animation får 95, sidan med mest 73.

Åtgärden är att låta innehåll ovanför vikningen målas direkt och behålla animationen under vikningen. **Det ändrar sajtens synliga rörelsedesign och är ditt beslut.**

---

## 4. Trovärdighetsproblemet som måste hanteras

`/about/` säger **"500+ Projects delivered"**, **"15+ Years of experience"** och **"98% Client satisfaction"**. Portföljen visar 13 case, varav sju saknar hårda fakta.

Glappet mellan påstådd skala och synligt bevis läses som ett trovärdighetsproblem, inte som en styrka. Tre saker:

- **"98% Client satisfaction"** — ingen metod, inget urval, ingen källa. Antingen belägg det eller ta bort det. Det är den enda siffran på sajten som inte går att verifiera på något sätt.
- **"500+ projects"** — backa den synligt. En kundlogotypsrad med redan publika namn (Ocean Outdoor, Kappahl, SAS) räcker långt och kräver ingen ny data.
- **"sedan [år]"** saknas helt. Konkurrenter använder det ("500+ uthyrningar sedan 2014"). Kräver ert verkliga startår — härled det inte ur organisationsnumret.

Redan åtgärdat: fyra utkastsidor per språk med texten *"Editorial draft · verification required"* låg publikt länkade från portföljen. De är nu filtrerade ut (`d109d69`) men finns kvar på direkt-URL.

---

## 5. Vad som inte är värt att jaga

Ärlighet om detta sparar mer tid än någon optimering:

| Fråga | Varför inte |
|---|---|
| `digital signage solutions` som **produktfråga** | SERP:en ägs av CMS-mjukvaruleverantörer. Ni säljer hårdvara, installation och drift. Att ranka där skulle kräva påståenden ni inte kan stå för. *(Att däremot använda ordet i er egen tjänstekontext — våg 0 — är rätt)* |
| `imvision login` (487 expo/3 mån) | Ovinnbar utan kundportal. Google rankar redan pos 2,4 men kan inte tillfredsställa avsikten. **De 92 nästan-träffarna i månaden är däremot en affärssignal värd att ta på allvar** — det finns latent efterfrågan på självservice |
| `södertull malmö`, platsnamnsdelen | Går inte att slå Maps och lokalinfo för ett ortnamn. Endast annonsörsdelen är åtkomlig, via en spec-/bokningssida |
| Ortssidor för Malmö, Göteborg, Täby, Solna | Inget kontor där. En sida som antyder lokal närvaro är en doorway-sida och en felaktig framställning. Använd `areaServed` från Stockholmssidan i stället |

Platssidor är däremot motiverade för **Jönköping** och **Stockholm/Saltsjö-Boo** — där finns riktiga adresser, egna `LocalBusiness`-noder och ett mätbart Stockholmssignal.

---

## 6. Schemaluckor (verifierade)

| Lucka | Status |
|---|---|
| `geo` saknas i båda `LocalBusiness` | Blockerad — kräver korrekta koordinater |
| `openingHoursSpecification` saknas | Blockerad — kräver era faktiska öppettider |
| `LocalBusiness.url` pekar på startsidan för båda | Blockerad — kräver att platssidorna finns |
| `aggregateRating` saknas | **Korrekt** — lägg inte till förrän riktiga omdömen finns |

---

## 7. Mätpunkter

| KPI | Baslinje 2026-07-30 | Kontroll |
|---|---|---|
| Klick / exponeringar, 28 d | 105 / 865 | Månadsvis |
| Andel varumärkestrafik | 76 % → mål sjunkande | Kvartalsvis |
| Kommersiella icke-varumärkesexponeringar | 12 / 28 d | Månadsvis |
| Ej indexerat, orsak "Hittades inte (404)" | 19 → mål 0 | Varje vecka tills 0 |
| Sitemap-upptäckta URL:er | 42 → mål 47 | Efter varje deploy |
| Indexerade sidor | 65 | Månadsvis |
| LCP mobil (lab) | 4,4–6,1 s | Vid varje release |

⚠️ CrUX har **ingen fältdata** för sajten — trafiken är under tröskeln. Core Web Vitals kan inte mätas i fält förrän volymen ökar väsentligt. Och enskilda Lighthouse-körningar svänger kraftigt (`/service/` 73→94 samma dag); läs aldrig in en trend i en enskild körning.

---

## 8. Om analysernas evidensstyrka

| Analys | Metod | Styrka |
|---|---|---|
| Innehåll / E-E-A-T | Direkt inspektion av live-sidor | **Hög** — korrigerade dessutom en felaktig premiss jag själv gav den |
| Lokal SEO | Hämtade och läste JSON-LD-grafen | **Hög** för schemafynden; flaggade själv sin osäkerhet om citeringar |
| Ämneskluster | ~24 live WebSearch-sökningar, domänöverlapp | **Medel-hög** — riktiga SERP:ar, men uppskattade överlapp, inte exakta topp-10-snitt |
| SXO | Sidinspektion + etablerade sidtypsmönster | **Medel** — ingen live-SERP-hämtning gjordes; slutsatserna om sidtyp är riktningsangivelser |

Inga siffror om sökvolym anges någonstans i denna plan. Där en uppskattning används är den märkt som sådan.
