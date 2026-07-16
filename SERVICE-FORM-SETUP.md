# Serviceformulär — setup-guide

Komponenten `ServiceForm` är byggd och klar att användas. För att formuläret ska kunna skicka ärenden, bilagor och bekräftelsemail behöver ni koppla det till en form-backend-tjänst. Det går inte att skicka mail direkt från en statisk webbplats utan ett backend eller en tredjepartstjänst.

## Rekommenderad lösning: Formspree

Formspree hanterar filuppladdning, notifiering till `service@imvision.se` och automatiska bekräftelsemail till kunden. Det finns en gratis nivå att börja med.

### Steg 1: Skapa konto och formulär

1. Gå till [formspree.io](https://formspree.io) och skapa ett konto.
2. Skapa ett nytt formulär.
3. Kopiera formulärets endpoint-URL (t.ex. `https://formspree.io/f/xnqkvnzy`).

### Steg 2: Lägg till endpoint i projektet

Skapa eller uppdatera `.env.local` i projektets root:

```env
NEXT_PUBLIC_SERVICE_FORM_ENDPOINT=https://formspree.io/f/DITT_FORMULAR_ID
```

Ersätt `DITT_FORMULAR_ID` med det faktiska ID:t.

### Steg 3: Konfigurera notifieringar

I Formspree-panelen:

1. Lägg till `service@imvision.se` som mottagare av notifieringar.
2. Aktivera **Auto-response** och ställ in ämne/text för bekräftelsemailet till kunden.
3. Aktivera **reCAPTCHA** i Formspree om ni vill ha extra skydd mot spam.

### Steg 4: Bilagor

Formuläret skickar filer som `attachment-0`, `attachment-1`, osv. Formspree accepterar dessa automatiskt om filuppladdning är aktiverat för formuläret. Kontrollera att bilagor ingår i ert abonnemang.

## Vad som händer om endpoint saknas

Om `NEXT_PUBLIC_SERVICE_FORM_ENDPOINT` inte är satt:

- Formuläret validerar fortfarande alla fält.
- Vid submit öppnas användarens standardmailklient med ett förifyllt mail till `service@imvision.se`.
- Bilagor skickas **inte** med via mailto-länken.
- Inget automatiskt bekräftelsemail skickas.

Detta är en nödfallback — inte en långsiktig lösning.

## Ärendenummer och tidsstämplar

- Ett unikt ärendenummer genereras i webbläsaren, t.ex. `IM-2026-000123`.
- Datum och tid fångas vid inskick.
- Webbläsare och operativsystem skickas med som extra fält.

## Fält som skickas till backend

| Fält | Beskrivning |
|---|---|
| `_ticketNumber` | Unikt ärendenummer |
| `_submittedAt` | ISO-tidsstämpel |
| `company` | Företag |
| `name` | Kontaktperson |
| `phone` | Telefon |
| `email` | E-post |
| `project` | Projekt / installation |
| `address` | Adress |
| `issueType` | Typ av ärende |
| `priority` | Prioritet |
| `description` | Felbeskrivning |
| `contactMethods` | Önskad kontakt (kommaseparerad) |
| `termsAccepted` | `Ja / Yes` |
| `browser` | User agent |
| `os` | Plattform |
| `attachment-0` … `attachment-N` | Uppladdade filer |

## Spam-skydd

Utöver Formsprees inbyggda skydd innehåller formuläret:

- Ett dolt **honeypot**-fält (`honeypot`). Om det fylls i av en bot avvisas ärendet.
- Validering av obligatoriska fält och e-post.

## Anpassa texten

Alla texter finns i `src/components/sections/ServiceForm.tsx` i objektet `t`. Uppdatera svenska eller engelska strängar där efter behov.

## Testa formuläret

1. Starta utvecklingsservern: `npm run dev`
2. Gå till `/service/` eller `/sv/service/`.
3. Fyll i alla obligatoriska fält, acceptera villkoren och skicka.
4. Kontrollera att `service@imvision.se` får mailet och att kunden får bekräftelse.
