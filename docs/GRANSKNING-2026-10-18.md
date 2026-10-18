# Granskning 2026-10-18 — fullständig genomgång

Genomförd mot produktionsbygget (`next start`, port 3200), 56 rutter (47 i sitemap +
4 noindex-konceptprojekt + en avsiktlig 404), 49 unika interna länkar.

Verktyg: `tools/review.mjs` (rubriker, metadata, schema, terminologi, axe, overflow,
länkmål), `tools/deep-check.mjs` (JSON-LD-krav, hreflang-paritet, bilder, redirects,
formulärfel), `tools/parity.mjs` (siffror SV↔EN), `tools/quote-test.mjs`,
`tools/acceptance.mjs`, Lighthouse 13.5.

## Resultat

| Kontroll | Utfall |
|---|---|
| HTTP-status på alla 47 sitemap-URL:er | **alla 200** |
| Interna länkar (49 unika mål) | **alla 200**, inga 404 |
| Rubrikhierarki (56 sidor) | **inga nivåhopp** |
| En `<h1>` per sida + textinnehåll utan sammansatta ord | **56/56** |
| axe (WCAG 2.1/2.2 A+AA + best practice) | **0 anmärkningar** |
| Horisontell overflow 320/390/1440 | **0 px på alla sidor** |
| Tryckytor < 44×44 px | 0 (undantag: honeypot-fältet som är off-screen och `tabindex="-1"`, samt länkar inuti löptext som WCAG 2.5.8 undantar) |
| Canonical per sida | korrekt på alla, inkl. noindex-projekt |
| hreflang en/sv/x-default + ömsesidighet | **alla par pekar rätt**; `/sv/servicevillkor/` deklarerar bara sv + x-default (svensk-only dokument) |
| `og:image` per sida | egen bild + rätt mått på alla |
| JSON-LD | Organization, LocalBusiness **×2** (Jönköping + Saltsjö-Boo), WebSite, FAQPage (start + support), BreadcrumbList, CreativeWork (projekt), ContactPage (kontakt), Service (köp/hyr/service) |
| JSON-LD-parsning | alla block giltig JSON |
| `img` utan alt | 0 (27 bild-URL:er kontrollerade, alla 200) |
| Terminologi ("digital signage/skyltning") i synlig text, meta, alt, schema | **0 träffar** |
| Påståenden (15+, 500+, 98 %, 24/7, "garanterade") | **0 träffar** |
| Svarstid | endast "Svar inom 24 timmar" / "We reply within 24 hours" (34 förekomster, alla samma löfte) |
| Tilltal svenska sidor | ni/er i all marknadsföringstext; **undantag: integritetspolicy och användarvillkor** som följer svensk juridisk konvention med "du" |
| Siffror SV ↔ EN i projektdata | **identiska** för alla 13 verifierade projekt |
| Redirects från gamla WordPress-URL:er | fungerar (`/kontakt` → 308 → `/kontakt/` → `/sv/contact/`); samma beteende som live |
| Formulär: tom body → 400, honeypot → tyst ok, snabbförfrågan 13/13, acceptans 5/5 | **grönt** |
| Konsolfel i webbläsaren | **inga** |

## Det som faktiskt var fel — och rättades i den här rundan

1. **Du-tilltal på sju ställen** (FAQ-svar, service, kontaktformulär, kvittens, "nästa
   steg", support-CTA, cookiebanner, kontaktsidans ingress) → ni/er.
2. **Svarstidslöftet läckte**: kontaktsidans hero sa fortfarande "samma arbetsdag" (sv)
   och "the same business day" (en), och "nästa steg" hade en engelsk variant kvar.
3. **"Digital signage" fanns kvar** som tagg på köpsidan, i `knowsAbout` i schemat och i
   två konceptprojekt → ersatt ("In-store LED" / "LED i butik").
4. **"Nordens största" låg kvar** i EN-projekttexten för The Icon medan SV-beskrivningen
   sa "en av Europas största" → båda säger nu samma sak.
5. **Engelska platsetiketter på svenska startsidan**: projektkortens platsbadge visade
   "Solna, Sweden", "Six European markets", "Nordic region" eftersom bara titel,
   kategori och beskrivning lokaliserades → nu lokaliseras även plats och specs.
6. **WCAG 2.5.3 (Label in Name)**: språkväxlarens `aria-label="English"` med synlig text
   "EN" → `aria-label="EN — English"` / `"SV — Svenska"`.
7. **WCAG 1.4.1 (länk i textblock)**: mejllänkarna i integritetspolicy och villkor
   markerades bara med färg → alltid understrukna.
8. **Horisontell overflow 11–14 px på två projektsidor** (`/sv/projects/the-halo/`,
   `/sv/projects/the-curve/`): ett långt svenskt sammansatt ord i resultatrubriken
   sprängde 320 px → `break-words` + lägre clamp-min samt global `overflow-wrap` för
   rubriker.
9. **"24/7" i ett konceptprojekt** → "continuous operation".
10. **Svenska "&"-etiketter** ("Service & support") → "Service och support".
11. **Meta-längder**: startsidans titel 78 → 44 tecken, två långa beskrivningar trimmade.

## Kvarstående varningar (avsiktliga)

- `/sales/` titel 72 tecken och `/sv/sales/` 75 tecken — exakt de titlar som ägaren
  bestämde i masterprompten. De får plats i Google men kan trunkeras i vissa SERP-lägen.
- `/projects/nordstan-facade/` beskrivning 174 tecken — under Googles visningsgräns.

## Öppna frågor (samma som i slutrapporten)

1. Avtalade servicenivåer och "IM Monitoring" som namngiven tjänst?
2. Vart ska förfrågningarna gå (e-post + Flow idag)?
3. Vilka projektfoton får publiceras (Ocean Outdoor, Grassfish)?
4. Får uthyrningsflottan (~4 000 m²) och egen tillverkning lyftas?
5. Vilka personer får visas under Om oss?
6. Källa + år för "13 mn besökare/år" och "162 010 kontakter/dag"?
7. Ska integritetspolicy och villkor också skrivas i ni-form, eller behålla "du" som är
   svensk juridisk konvention?
