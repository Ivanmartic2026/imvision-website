# Knapp- och chipsystemet

Allt interaktivt som ser ut som en knapp går genom `src/components/ui/Button.tsx`
eller `src/components/ui/Chip.tsx`. Ingen komponent ska handrulla knappstilar.

## Former

| Element | Radie | Varför |
|---|---|---|
| Knappar, chips | `12px 4px 12px 12px` | Skäret hörn är varumärkets signatur i liten skala |
| Kort, paneler, bilder | `24px 8px 24px 24px` | Samma skärning i stor skala → formen signalerar storlek |
| Ikonknappar | cirkel (`rounded-full`) | Skiljer en ikonkontroll från en textknapp |

## Varianter

| Variant | Utseende | Används till |
|---|---|---|
| `primary` | Fylld salvia `#91a9a1`, mörk text, 600 vikt | **Endast en per vy.** "Få offert" |
| `secondary` | Genomskinlig med synlig 1,5 px ram (`--btn-border`), 600 vikt | "Ring", "Se hur vi arbetar", "Ring support" |
| `ghost` | Ingen ram, tonar vid hover | Stäng-kryss, tertiära val |
| `link` | Understruken textlänk, 44 px träffyta | "Se projekt", "Lägg till detaljer" |
| `Chip` | Pill, vald = accentram + bock + 600 vikt | Filter, ärendetyp (Köpa/Hyra/Service) |

## Storlekar

`sm` 44 px · `md` 48 px · `lg` 52 px. Aldrig under 44 px (WCAG 2.2 AA 2.5.8).
Äldre namn (`small`/`default`/`large`) mappas automatiskt, så gamla anrop fortsätter fungera.

## Färgregler som inte får brytas

- Primär knapp: ljus salvia på mörkt, **alltid** mörk text (`#070807`). Bakgrunden är
  pinnad till literal `#91a9a1` (inte `--accent`) eftersom `--accent` blir mörkare i
  `.theme-light` där den används som textfärg.
- Sekundär knapp: ramen hämtas från `--btn-border` (`rgba(255,255,255,.30)` mörkt,
  `#9aa39d` ljust) — avsiktligt starkare än `--border-strong`, så en outline läses som
  en kontroll och inte som en hårfin kortkant.
- Fokus: `ring-2 ring-accent` med offset mot bakgrunden på alla varianter.
- Ingen ny färg. Accent används som fyllning, ram eller ring — aldrig som text på ljust.

## Rubriknivåer

Tre, definierade i `globals.css`: `.h2-display` (största sektionsrubriken),
`.heading-section` (standard) och `.h2-sub` (sekundär rubrik i band).
Använd dem i stället för egna `text-[clamp(...)]`-strängar.

## Mätning

`~/Desktop/imvision-website/tools/buttons.mjs` inventerar alla knappliknande element
och grupperar dem på visuell signatur. Före omgången: **19 distinkta stilar**.
Efter: **7**, och de sju är avsiktliga roller (primär, sekundär, chip vald/oval,
ikonlänk, samt ljus-tema-varianterna av primär och sekundär).
