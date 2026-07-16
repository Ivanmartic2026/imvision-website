# Premium-typsnitt för IMvision — köp- och implementationsguide

> Koden är redan förberedd för ett typsnittsbyte. När ni har köpt licenserna räcker det med att lägga filerna på rätt plats och uppdatera **en** fil (`src/app/fonts/index.ts`). Resten av sajten följer automatiskt med via CSS-variablerna `--font-heading` och `--font-body`.

---

## 1. Varför byta från Manrope?

Manrope är ett bra och mångsidigt typsnitt, men det är gratis och väldigt vanligt i SaaS-produkter. För ett premium LED-varumärke som IMvision kan ett licensierat typsnitt ge:

- **Mer exklusiv karaktär** – färre konkurrenter använder samma snitt.
- **Tätare, mer redaktionell känsla** – särskilt i stora rubriker.
- **Bättre optimering** – professionella snitt är ofta finjusterade för skärm.
- **Skalbarhet** – lättare att bygga en egen designprofil runt ett distinkt snitt.

---

## 2. Rekommenderade typsnitt

Nedan är fyra alternativ som passar en mörk, teknisk, arkitektonisk estetik. Priserna är ungefärliga och baserade på offentliga listpriser; faktisk kostnad beror på företagsstorlek, trafik och vilka vikter ni väljer.

### A. Söhne — Klim Type Foundry (vårt förstaval)
- **Stil:** Neo-grotesk med släktskap till Akzidenz-Grotesk / Helvetica, men varmare och mer analog.
- **Passar IMvision för att:** det känns modernt och exklusivt samtidigt som det är extremt läsbart. Stripe använder det, vilket säger något om dess premiumstatus.
- **Vikter att köpa:** Buch (400), Halbfett (600), gärna auch Fett (700) för display.
- **Ungefärlig kostnad:** ca 350–700 USD för webb + desktop beroende på vikter och trafik.
- **Inköp:** [klim.co.nz/collections/soehne](https://klim.co.nz/collections/soehne)

### B. Suisse International — Swiss Typefaces
- **Stil:** Ren schweizisk grotesk; närmast en modern Helvetica men med bättre detaljarbete.
- **Passar IMvision för att:** det är det typiska valet för arkitektur-, mode- och teknikvarumärken som vill signalera precision.
- **Vikter att köpa:** Regular, Medium, Bold. Komplett familj är dyrare men ger full flexibilitet.
- **Ungefärlig kostnad:** ca 500–1 500 CHF (ca 5 500–16 500 SEK) för företagslicens beroende på antal anställda. Swiss Typefaces har en livstidslicens utan sidvisningsbegränsning.
- **Inköp:** [swisstypefaces.com/fonts/suisse](https://www.swisstypefaces.com/fonts/suisse)

### C. Neue Haas Grotesk — Font Bureau / Monotype
- **Stil:** Den digitala återskapningen av ursprungs-Helvetica; klassisk, neutral, tidlös.
- **Passar IMvision för att:** det är det säkraste valet om ni vill ha en “osynlig” typografisk bas som låter bilderna och LED-arbetet ta plats.
- **Vikter att köpa:** 55 Roman, 65 Medium, 75 Bold.
- **Ungefärlig kostnad:** ca 300–900 USD beroende på vikter och webbtrafik.
- **Inköp:** [fonts.com/font/font-bureau/neue-haas-grotesk](https://www.fonts.com/font/font-bureau/neue-haas-grotesk)

### D. PP Neue Montreal — Pangram Pangram (budgetvänligt premium)
- **Stil:** Grotesk inspirerad av Helvetica men med något skarpare, mer samtida detaljer.
- **Passar IMvision för att:** det är ett prisvärt alternativ som fortfarande känns betydligt mer exklusivt än Manrope.
- **Vikter att köpa:** Regular, Medium, Bold.
- **Ungefärlig kostnad:** ca 30–50 CAD per stil för webb; komplett familj ca 200–400 CAD.
- **Inköp:** [pangrampangram.com/products/neue-montreal](https://pangrampangram.com/products/neue-montreal)

### Snabbjämförelse

| Typsnitt | Premiumkänsla | Kostnad | Lämplighet för IMvision |
|---|---|---|---|
| Söhne | Mycket hög | Medel–hög | ⭐⭐⭐⭐⭐ |
| Suisse International | Mycket hög | Hög | ⭐⭐⭐⭐⭐ |
| Neue Haas Grotesk | Hög | Medel–hög | ⭐⭐⭐⭐ |
| PP Neue Montreal | Hög | Låg–medel | ⭐⭐⭐⭐ |

---

## 3. Inköpsplan

1. **Bestäm budget:** räkna med 3 000–15 000 SEK för ett seriöst val.
2. **Bestäm vikter:** ni behöver sannolikt bara 3–4 vikter (Regular, Medium, Semibold, Bold).
3. **Kontrollera licensvillkor:**
   - Ska licensen täcka både webb och desktop?
   - Hur många sidvisningar per månad ingår?
   - Får typsnittet användas i logotyp/tryck?
4. **Begär offert** om ni är ett AB/aktiebolag — flera foundries ger företagsrabatt.
5. **Köp och ladda ner WOFF2-filer** (det är det format vi använder för webben).

---

## 4. Implementationsplan i koden

Koden är redan förberedd. Här är exakt steg-för-steg.

### Steg 1: Lägg typsnittsfilerna i projektet

Skapa mappen `src/app/fonts/` och lägg WOFF2-filerna där, till exempel:

```
src/app/fonts/
├── index.ts
├── Soehne-Buch.woff2
├── Soehne-Halbfett.woff2
└── Soehne-Fett.woff2
```

### Steg 2: Uppdatera `src/app/fonts/index.ts`

Öppna filen och följ instruktionerna i den kommenterade exempelkoden. Kortfattat:

1. Kommentera bort eller ta bort `Manrope`-importerna.
2. Aktivera `localFont`-importen.
3. Ersätt `headingFont` och `bodyFont` med ert nya snitt.

Exempel för Söhne:

```ts
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";

const soehne = localFont({
  variable: "--font-heading",
  src: [
    { path: "./Soehne-Buch.woff2", weight: "400", style: "normal" },
    { path: "./Soehne-Halbfett.woff2", weight: "600", style: "normal" },
    { path: "./Soehne-Fett.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const headingFont = soehne;
export const bodyFont = soehne;

export const monoFont = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
```

> **Observera:** Next.js `localFont` löser sökvägar relativt den fil där funktionen anropas — alltså `src/app/fonts/index.ts`. Därför fungerar `./Soehne-Buch.woff2` direkt.

### Steg 3: Justera vikter om nödvändigt

Om det nya typsnittet har andra vikter än 400/600/700, uppdatera:

- `src/app/globals.css` — klasserna `.display-xl`, `.display-lg`, `.heading-section` samt `.eyebrow`.
- `src/components/sections/Hero.tsx` — H1 använder `font-semibold` (motsvarar 600). Ändra till `font-bold` (700) om ni vill ha ännu tyngre rubriker.

### Steg 4: Bygg och testa

Kör:

```bash
npm run build
```

Öppna sedan `dist/index.html` i en webbläsare och kontrollera:

- Rubriker har rätt typsnitt.
- Ingen layout shift vid laddning.
- Fetstil visas korrekt.

---

## 5. Vad som redan är gjort i koden

- `:root` definierar `--font-sans`, `--font-mono`, och använder `--font-heading` / `--font-body`.
- `body` använder `var(--font-body)`.
- Alla display-klasser använder `var(--font-heading)`.
- `src/app/fonts/index.ts` är den enda filen som behöver ändras vid byte.

---

## 6. Viktiga licensnoteringar

- Ladda aldrig upp WOFF2-filerna till ett offentligt repo om licensen inte tillåter det.
- Använd endast WOFF2-filer från foundryn — omvandling av OTF/TTF själv kan bryta mot licensen.
- Spara kvitto/licensbevis på ett säkert ställe.

---

## 7. Rekommendation

För IMvision rekommenderar vi **Söhne** från Klim Type Foundry som förstaval. Det ger störst skillnad mot Manrope samtidigt som det behåller en teknisk, nordisk elegans. Om budgeten är begränsad är **PP Neue Montreal** ett utmärkt andrahandsval.
