# Lokal SEO — beslutsunderlag

**Datum:** 2026-07-30 · **Branch:** `seo/phase-2-lcp-content-local`

Syftet med det här dokumentet är att du ska kunna fatta besluten **utan att göra ny research**.
Allt som går att verifiera är verifierat. Allt som kräver din kunskap om verksamheten är
markerat med ⬜.

**Ingenting har utförts i Google Business Profile.** Inga profiler skapade, inga kategorier
satta, ingen verifiering initierad, inga inlägg. Detta är underlag, inte utfört arbete.

---

## 1. Utgångsläge — verifierat

| | Jönköping | Saltsjö-Boo |
|---|---|---|
| Adress | Herkulesvägen 56, 553 02 Jönköping | Svarvarvägen 20, 132 38 Saltsjö-Boo |
| Roll enligt schemat | `IM Vision — Jönköping (HQ)` | `IM Vision — Stockholm` |
| `LocalBusiness`-nod | ✅ finns | ✅ finns |
| `geo` (koordinater) | ❌ saknas | ❌ saknas |
| `openingHoursSpecification` | ❌ saknas | ❌ saknas |
| `LocalBusiness.url` | pekar på startsidan | pekar på startsidan |
| Egen platssida | ❌ finns inte | ❌ finns inte |
| Google Business Profile | ⬜ tros oclaimad | ⬜ tros oclaimad |

**NAP som publiceras idag** (konsekvent i schema, footer och kontaktsida — kontrollerat):

```
IM Vision  ·  IM Vision Group AB
info@imvision.se  ·  010 330 46 36  (+46103304636)
org.nr 556924-1200  ·  VAT SE556924120001
```

`sameAs`: facebook.com/imvision.se · instagram.com/imvision.se · linkedin.com/company/improd-ab

⚠️ LinkedIn-slugen är `improd-ab`, inte `imvision`. Kontrollera att sidan visar nuvarande
varumärke och inte gammalt namn — annars är det en varumärkeskonflikt, oavsett SEO-värde.

**Efterfrågesignal från Search Console** (28 dagar t.o.m. 2026-07-27): 82 % av klicken kommer
från Sverige. Ortsrelaterade frågor som redan syns: `södertull malmö` (52 exponeringar,
pos 12,2), `södertull stockholm` (12), `led skärm installation stockholm` (2, pos 25),
`herkulesvägen 56` (1, pos 9) — någon söker alltså direkt på HQ-adressen.

---

## 2. Beslut 1 — Google Business Profile-kategori

Detta är det viktigaste beslutet i hela dokumentet. Primärkategorin är den tyngst vägande
lokala rankingfaktorn, och **fel kategori är samtidigt den mest skadliga** — därför ska den
inte gissas.

Google har ingen kategori som heter "LED-displayintegratör". Ingen av kandidaterna nedan är
en perfekt träff.

### Fråga som avgör allt

⬜ **Kan en kund besöka platsen, och vad möter hen då?**

| | Jönköping | Saltsjö-Boo |
|---|---|---|
| Kan kund komma på besök? | ⬜ | ⬜ |
| Vad finns på plats? | ⬜ showroom / kontor / verkstad | ⬜ lager / kontor / staging |
| Bemannad under kontorstid? | ⬜ | ⬜ |
| Bokat besök eller drop-in? | ⬜ | ⬜ |

Sajten använder bilden `hero-experience-centre.jpg`, vilket antyder att Jönköping har ett
experience centre. Det är en indikation, inte ett belägg — bekräfta.

### Kandidatkategorier

| Kategori | Passar när | Passar inte när | Risk |
|---|---|---|---|
| **Audiovisual equipment supplier** | Ni levererar och installerar AV-/LED-utrustning till företag | Om platsen bara är lager utan kundkontakt | Låg. Bredast och närmast er faktiska verksamhet |
| **Audiovisual equipment repair service** | Service och underhåll är en huvudintäkt på platsen | Om platsen inte utför reparationer | Medel. Snävar in mot service och kan dölja försäljningssidan |
| **Electronics engineer** | Ni projekterar och konstruerar | Om ingen ingenjörsverksamhet sker på adressen | Medel. Läses ofta som konsult, inte leverantör |
| **Showroom** *(om Google erbjuder den)* | Jönköping har en demomiljö kunder besöker | Om det inte finns något att visa | Låg för HQ, fel för lager |
| ~~Warehouse~~ | — | Publiken kan inte besöka ett lager | **Hög — använd inte.** Beskriver internt bruk, inte kundmötet |

**Min rekommendation, att bekräfta av dig:**

- **Jönköping:** primärt `Audiovisual equipment supplier`, sekundärt service- och
  installationskategorier. Om Google erbjuder en showroom-kategori och demomiljön är verklig
  och besökbar, väg den som primär.
- **Saltsjö-Boo:** ⬜ **beror helt på svaret ovan.** Är det ett bemannat kontor som möter
  Stockholmskunder → samma primärkategori som HQ. Är det enbart lager utan kundbesök →
  **skapa ingen profil alls.** En profil på en adress utan kundmötande verksamhet strider mot
  Googles riktlinjer och riskerar båda profilerna.

### Verksamhetsnamn

Rekommendation: **"IM Vision"** för båda, utan ortssuffix. Platserna skiljs åt av adress och
öppettider. Googles riktlinjer tillåter inte ortsnamn i profilnamnet om det inte är det
faktiska firmanamnet på skylten.

⬜ Bekräfta vad som står på skylten vid respektive adress.

---

## 3. Beslut 2 — uppgifter som måste bekräftas innan något publiceras

| Uppgift | Jönköping | Saltsjö-Boo |
|---|---|---|
| Öppettider | ⬜ | ⬜ |
| Koordinater (5 decimaler) | ⬜ behöver mätas på plats eller hämtas från er kartleverantör | ⬜ |
| Tjänsteområden | ⬜ | ⬜ |
| Foton: exteriör/skylt | ⬜ | ⬜ |
| Foton: interiör/showroom | ⬜ | ⬜ |
| Foton: team | ⬜ | ⬜ |
| Foton: installerade projekt | ⬜ + kundens tillstånd | ⬜ |

**Om koordinater:** jag har medvetet inte gissat dem. Felaktiga koordinater i schemat är värre
än inga, eftersom de motsäger GBP-pinnen.

**Tjänsteområden:** markera Malmö, Göteborg, Täby, Solna och Upplands Väsby som *areas served*
— aldrig som ytterligare platser. Ni har inga kontor där.

### Verifieringsmetod

Postkort till respektive adress är normalfallet i Sverige (2–5 veckor). Video- eller
telefonverifiering kan erbjudas men styrs av Google. **Varje adress kräver en egen
verifieringscykel** — räkna med två separata väntetider, inte en.

⬜ Vem tar emot posten på respektive adress?

---

## 4. Beslut 3 — ska platssidor byggas?

**Rekommendation: ja, men exakt två.** Jönköping och Stockholm/Saltsjö-Boo — och bara om
platsens publika funktion bekräftas i avsnitt 2.

**Inga sidor för Malmö, Göteborg, Täby, Solna eller Upplands Väsby.** Ni har ingen verksamhet
där. En sida som antyder lokal närvaro är en doorway-sida och en felaktig framställning av
verksamheten. Efterfrågan därifrån hanteras med `areaServed` och omnämnanden i brödtext.

### Vad varje platssida måste innehålla för att inte vara tunn

1. Vad som faktiskt sker på adressen — så specifikt att de två sidorna inte kan förväxlas
2. Namngivna projekt som levererats eller servas från platsen ⬜
3. Team, kapacitet eller utrustning knuten till platsen ⬜
4. Fullständig NAP + karta, identisk med `LocalBusiness`-noden
5. Lokal kontaktväg som når rätt team ⬜
6. Riktiga foton från adressen ⬜
7. Länkad från navigation eller footer — inte bara från sitemap
8. Ärlig formulering om tjänsteområde ("betjänar Stockholmsregionen från vår bas i
   Saltsjö-Boo")
9. Fullvärdig svensk version — inte maskinöversatt stubbe

När sidorna finns ska `LocalBusiness.url` peka på dem i stället för startsidan. Det är en
enrads ändring i `src/lib/seo.ts` som jag gör så snart sidorna existerar.

---

## 5. Beslut 4 — recensioner

Var realistisk om förutsättningarna. Detta är B2B med långa säljcykler och få, stora kunder.
En konsumentmodell där varje kund tillfrågas ger inte volym, och att jaga volym med något
annat än äkta, efterfrågade omdömen vore direkt skadligt för ett företag vars köpare granskar
noga.

**Vad som fungerar för er modell:**

- Koppla frågan till **projektavslut**, inte till köp. Naturliga tillfället är när kunden sett
  den färdiga installationen fungera.
- Fråga **den namngivna beslutsfattaren eller platsansvarige**, inte en funktionsbrevlåda.
- **Låg volym är normalt** — en handfull per år är realistiskt. Det relevanta målet är inte
  antal utan att inte ha långa luckor helt utan nya omdömen.
- **Svaret väger tyngre än betyget** när omdömena är få. Varje omdöme ska besvaras personligt.
- **Lägg inte `aggregateRating` i schemat** förrän riktiga omdömen finns. Det är korrekt
  frånvarande idag.

⬜ Vilka avslutade projekt skulle realistiskt ge ett starkt, specifikt omdöme? Det arbetet kan
påbörjas innan GBP är verifierad.

---

## 6. Vad jag kan implementera så snart svaren finns

| Åtgärd | Kräver | Insats |
|---|---|---|
| `geo` i båda `LocalBusiness`-noderna | Koordinater | 15 min |
| `openingHoursSpecification` | Öppettider | 15 min |
| `LocalBusiness.url` → platssidor | Att sidorna byggts | 5 min |
| Två platssidor, EN + SV | Avsnitt 4-underlaget | 8 h |
| `areaServed` utökad med de faktiska projektorterna | Inget — kan göras nu ⬜ säg till | 20 min |

---

## 7. Vad jag inte har gjort, och varför

- **Inte skapat eller ändrat någon Google Business Profile.** Kräver ditt uttryckliga
  godkännande enligt uppdraget.
- **Inte gissat koordinater.** Felaktiga koordinater är värre än inga.
- **Inte satt öppettider.** Jag har inga.
- **Inte byggt platssidor.** Deras publika funktion är obekräftad, och en platssida utan
  verifierad verksamhet är en doorway-sida.
- **Inte kontrollerat befintliga katalogförekomster.** Det kräver `site:`-sökningar och
  citeringsverktyg jag inte kan köra härifrån utan att belasta produktion. Gör en manuell
  genomgång innan ni skickar in något nytt, så att ni inte skapar dubbletter under en
  avvikande NAP-variant.
