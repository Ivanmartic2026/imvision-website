# IM Vision Design System — Photon Material

> Version 1.0 · 15 July 2026  
> Strategic rationale: [DESIGN_INTELLIGENCE.md](./DESIGN_INTELLIGENCE.md)

This file is the implementation authority for the IM Vision website. Page-specific specifications may refine composition, but they may not invent new colour, typography, spacing, geometry, icon, or motion rules.

## 1. Design promise

**Architectural light, visibly engineered.**

Every page must combine:

- **Impact:** large-scale authentic installed environments.
- **Precision:** measured specifications, exact grids, calm type, clear processes.
- **Materiality:** metal, glass, concrete, darkness, human craft, controlled light.
- **Trust:** verified facts, named projects, real people, service and support evidence.
- **Ease:** plain language, predictable navigation, short conversion paths.

The system is not “dark tech.” Dark and light chapters are both first-class and must be deliberately sequenced.

## 2. Signature identity

### The Light Gate

Primary media, cards, dialogs, and feature panels use a recognizable corner construction:

```css
border-radius: 24px 6px 24px 24px;
```

- Compact: `12px 4px 12px 12px`
- Default: `20px 6px 20px 20px`
- Hero/media: `28px 8px 28px 28px`
- Pills are reserved for tags, filters, compact status, and small CTAs—not every container.

### The Photon Seam

Use only for selected active boundaries, hero-media edges, progress, and focus moments:

```css
linear-gradient(90deg, #74CDBB 0%, #B7E4D8 46%, #F0B27A 100%)
```

Default thickness is 1 px; maximum is 2 px. Never use it as a large text fill or full-page background.

### Calibration marks

Technical context may use compact labels such as `IM / 01`, `P2.6`, `5,500 NIT`, baseline ticks, or a four-corner reticle. Use no more than one calibration device per component and never around ordinary marketing copy.

## 3. Colour system

### Core brand colours

| Token | Hex | Role |
|---|---:|---|
| `photon-mint` | `#74CDBB` | Primary interactive light; calibrated technology |
| `photon-mint-soft` | `#B7E4D8` | Light-mode active surfaces and diagrams |
| `lens-amber` | `#F0B27A` | Warm secondary accent; craftsmanship and human light |
| `optic-deep` | `#173C36` | Premium deep green; light-mode primary button |
| `signal-red` | `#B33A3A` | Error and critical status only |

Mint is not decoration. On a typical page it should occupy less than 8% of visible area; amber less than 3%.

### Dark mode

| Token | Hex | Usage |
|---|---:|---|
| `dark-canvas` | `#080A0B` | Primary cinematic background |
| `dark-surface-1` | `#101416` | Section and card surface |
| `dark-surface-2` | `#171D20` | Raised/interactive surface |
| `dark-surface-3` | `#20282C` | Hover/selected neutral surface |
| `dark-text-1` | `#F2F0E9` | Primary warm-white text |
| `dark-text-2` | `#A9B0AD` | Secondary text |
| `dark-text-3` | `#747D7A` | Captions only; minimum 14 px |
| `dark-border` | `#2A3235` | Standard boundary |
| `dark-border-soft` | `rgba(242,240,233,.10)` | Media/section hairline |

### Light mode

| Token | Hex | Usage |
|---|---:|---|
| `light-canvas` | `#F2F0E9` | Warm architectural background |
| `light-surface-1` | `#FAF9F5` | Main surface |
| `light-surface-2` | `#FFFFFF` | Raised content |
| `light-surface-3` | `#E5E7E1` | Hover/selected neutral surface |
| `light-text-1` | `#111516` | Primary text |
| `light-text-2` | `#58615F` | Secondary text |
| `light-text-3` | `#737B78` | Captions only; minimum 14 px |
| `light-border` | `#CDD1CC` | Standard boundary |

### Semantic states

| State | Strong | Soft surface | Foreground |
|---|---:|---:|---:|
| Success | `#287A5B` | `#DCEDE5` | `#133E2F` |
| Warning | `#E9C46A` | `#F7EDD0` | `#3A2B08` |
| Error | `#B33A3A` | `#F4DDDB` | `#5C1717` |
| Info | `#477A8F` | `#DCE9EE` | `#183B49` |

### Interaction states

- Dark primary default: `photon-mint` surface with `dark-canvas` text.
- Dark primary hover: `#8ED9C9`; pressed: `#5DB4A4`; disabled: `#263431` with `#73807C` text.
- Light primary default: `optic-deep` with `#F2F0E9` text.
- Light primary hover: `#1F4D46`; pressed: `#102E29`; disabled: `#D2D5D0` with `#7C827F` text.
- Focus ring: 2 px `photon-mint`, 3 px canvas-colour separation.
- Links: underline offset 0.18 em. Hover changes underline thickness, not layout.

### Verified contrast pairs

| Pair | Ratio |
|---|---:|
| `#F2F0E9` on `#080A0B` | 17.40:1 |
| `#A9B0AD` on `#080A0B` | 8.97:1 |
| `#74CDBB` on `#080A0B` | 10.57:1 |
| `#111516` on `#F2F0E9` | 16.12:1 |
| `#58615F` on `#F2F0E9` | 5.60:1 |
| `#F2F0E9` on `#173C36` | 10.61:1 |
| White on error `#B33A3A` | 5.86:1 |

All normal text must meet WCAG AA (4.5:1); essential controls and body copy should target AAA (7:1) where possible. Do not place text directly over ungraded photography.

### Charts

Use the sequence `#74CDBB`, `#F0B27A`, `#8C93C8`, `#D56B69`, `#6E9DB2`, `#B4C36A`. Never rely on colour alone: add direct labels, line styles, or shapes. Gridlines use the current theme border at 50% opacity.

## 4. Typography

### Families

- **Primary/display/body:** Manrope Variable, fallback `Inter, "Helvetica Neue", Arial, sans-serif`.
- **Technical/data:** IBM Plex Mono, fallback `"SFMono-Regular", Consolas, monospace`.
- Use at most these two families. No decorative serif, outlined type, or gradient-filled headline.

Manrope supplies technical geometry without feeling like developer tooling; its open forms remain readable in Swedish and English. IBM Plex Mono is restricted to measurements, figure labels, timelines, and compact status—not paragraphs.

### Scale

| Token | Size | Line height | Tracking | Weight | Use |
|---|---|---:|---:|---:|---|
| `display-xl` | `clamp(4rem, 9vw, 9rem)` | .88 | -.055em | 520 | Homepage statement only |
| `display-lg` | `clamp(3.5rem, 7vw, 6.5rem)` | .92 | -.05em | 520 | Page hero |
| `h1` | `clamp(3rem, 5vw, 5rem)` | .96 | -.045em | 560 | Major title |
| `h2` | `clamp(2.5rem, 4vw, 4rem)` | 1.00 | -.038em | 560 | Section title |
| `h3` | `clamp(1.75rem, 2.5vw, 2.5rem)` | 1.08 | -.028em | 580 | Feature/card lead |
| `h4` | `1.375rem` | 1.18 | -.018em | 600 | Component title |
| `lead` | `clamp(1.25rem, 1.6vw, 1.5rem)` | 1.42 | -.012em | 430 | Hero/section intro |
| `body-lg` | `1.125rem` | 1.55 | -.008em | 420 | Editorial copy |
| `body` | `1rem` | 1.60 | 0 | 420 | Default copy |
| `small` | `.875rem` | 1.50 | 0 | 480 | Supporting UI |
| `micro` | `.6875rem` | 1.35 | .14em | 600 | Uppercase technical label |
| `data` | `clamp(2rem, 4vw, 4.5rem)` | .95 | -.05em | 500 mono | Statistics |

### Rules

- Display measure: 8–12 words; maximum 14.
- Body measure: 48–68 characters; never full-width prose.
- Sentence case by default. Uppercase only `micro` labels.
- Use manual line breaks only when composition has been verified across breakpoints.
- Use tabular numerals for prices, specifications, and counters.
- Button labels are 14–16 px, weight 600, sentence case.
- Never use low weight over photography.

## 5. Spacing

Base unit is 4 px. Every inset, gap, margin, and control dimension must use this scale:

| Token | px | Typical use |
|---|---:|---|
| `1` | 4 | Micro gap |
| `2` | 8 | Icon gap |
| `3` | 12 | Compact control |
| `4` | 16 | Mobile inset |
| `6` | 24 | Standard component gap |
| `8` | 32 | Card inset |
| `12` | 48 | Content group |
| `16` | 64 | Major group |
| `24` | 96 | Section compact |
| `32` | 128 | Section standard |
| `48` | 192 | Section cinematic |

Rules:

- Related elements use 8–24 px.
- Component groups use 32–64 px.
- Sections use 96–192 px depending on density and viewport.
- Mobile sections use 72–112 px (still aligned to 4 px).
- If an unlisted value is required for optical correction, document it at the component level; do not silently invent a token.

## 6. Responsive grid

| Range | Columns | Outer margin | Gutter | Content max |
|---|---:|---:|---:|---:|
| 320–599 | 4 | 16 px | 16 px | fluid |
| 600–899 | 8 | 32 px | 20 px | fluid |
| 900–1199 | 12 | 48 px | 24 px | fluid |
| 1200–1599 | 12 | 64 px | 24 px | 1440 px |
| 1600–1919 | 12 | 80 px | 32 px | 1600 px |
| 1920+ | 12 | max(96 px, centered) | 32 px | 1680 px |

- Full-bleed media may escape the content grid but its captions and controls align to grid lines.
- Text spans 4–7 columns on desktop; rarely more.
- Cards may span 3, 4, 6, 8, or 12 columns.
- On ultra-wide displays, content stops growing; image crop and negative space absorb width.
- On large LED presentation screens, type may scale one step but line length stays capped.
- Mobile horizontal carousels must show 10–15% of the next item and provide non-drag controls.

## 7. Motion

### Core physical idea

Motion behaves like a calibrated lens and light source: focus, reveal, track, settle. No bounce, random spring, liquid cursor, or unrelated movement vocabulary.

### Timing

| Token | Duration | Use |
|---|---:|---|
| `instant` | 120 ms | Press, toggle, icon state |
| `quick` | 220 ms | Hover, focus, small menus |
| `standard` | 360 ms | Card/image transition |
| `chapter` | 600 ms | Section reveal, navigation panel |
| `cinematic` | 900 ms | Hero media and page entrance |

- Standard entrance curve: `cubic-bezier(.22, 1, .36, 1)`.
- Exit curve: `cubic-bezier(.4, 0, 1, 1)`.
- Continuous linear motion is allowed only for progress, calibrated scanning, or marquees users can pause.

### Patterns

- **Scroll reveal:** opacity 0→1, translateY 16 px→0, 600 ms; child stagger 60 ms, maximum 5 children.
- **Image reveal:** clip/mask along a grid axis; scale 1.025→1.0. Never combine with large translation.
- **Card hover:** border/surface change and media scale to 1.015; no vertical jump.
- **Button hover:** background state plus icon translateX 3 px. Press scale may reach .985 for 120 ms.
- **Navigation:** panel reveals in 360–600 ms; focus moves predictably; escape closes.
- **Page transition:** 360 ms exit, 600 ms entrance. Content must never wait for animation to become usable.
- **Counter:** 600–900 ms, once when visible; show final value immediately for reduced motion and assistive technology.
- **Loading:** skeleton or still poster. No branded intro loader.
- **Video:** muted by default, explicit play/pause, captions where speech exists, poster fallback, adaptive bitrate.
- `prefers-reduced-motion` removes transforms, parallax, autoplay, count-up, and smooth scrolling while preserving state feedback.

## 8. Photography and film

### Required subject mix

1. 30% completed environments at human scale.
2. 20% close-up panel, module, cabling, finish, and pixel detail.
3. 15% engineers installing, calibrating, and testing.
4. 15% warehouse, logistics, and construction process.
5. 10% client/visitor response in real spaces.
6. 10% architecture at night, reflections, motion blur, and ambient city context.

### Art direction

- Authentic projects only; never stock.
- Shoot wide/medium/macro for every project.
- Preserve highlight detail on LED panels; do not let screens clip to white.
- Grade toward neutral graphite, concrete, warm skin, and accurate emitted colour.
- Use fog, flare, and motion blur only when naturally present.
- Prefer observed moments over staged pointing-at-screen poses.
- Drone footage establishes scale, then cuts to engineering detail.
- Default aspect ratios: hero 16:9 or 21:9; case study 3:2; card 4:3; portrait 4:5; mobile hero 4:5.
- Every image requires useful alt text or empty alt when decorative.

## 9. Iconography

- One custom-compatible outline family based on a 24 px grid.
- Stroke: 1.5 px default; 2 px at 16 px size.
- Line caps/joins: round.
- Optical corner radius: 2 px.
- Icons use simple architectural geometry; maximum two interior detail levels.
- Default sizes: 16, 20, 24, 32.
- Filled icons are restricted to status and media controls.
- Never mix icon libraries on one screen. Lucide may be used provisionally only when normalized to these rules.
- No icon without a label when meaning is not universally understood.

## 10. Components

### Buttons

- Heights: 40 compact, 48 standard, 56 hero.
- Horizontal inset: 16, 20, 24 respectively.
- Light Gate shape; only small utility buttons may be pill-shaped.
- Variants: primary, secondary outline, quiet text, destructive.
- One primary action per visual group.
- Arrow icon appears only when navigation is directional; do not decorate every action.

### Navigation

- Desktop: 72 px on light pages, transparent-to-solid over media.
- Mobile: 64 px with a full-height menu using the same grid.
- Primary taxonomy: Solutions, Projects, Technology, Service, Company.
- Persistent action: “Discuss a project.”
- Header changes theme based on section contrast without flashing.
- Active page state uses a Photon Seam underline and `aria-current`.

### Cards

- Default Light Gate, 1 px border, no shadow on flat canvas.
- Raised shadow: `0 18px 60px rgba(0,0,0,.16)` only for overlays or media floating above a surface.
- Card hierarchy: media → category/label → outcome/title → evidence/action.
- Avoid equal-height filler copy. Entire card may be clickable only with valid nested semantics.

### Case studies

- Index card: authentic image, client/industry, project title, location/year, one measurable descriptor.
- Detail order: outcome hero → context → challenge → solution → engineering → installation → results → related work → CTA.
- Specs use a scannable mono data rail.
- Results must be sourced or described qualitatively.

### Statistics

- One large mono value, short unit, plain-language explanation, optional source/date.
- Never animate unsupported values.
- Maximum four per row; mobile stacks two or one depending on label length.

### Testimonials

- Quote under 45 words, named person, title, company, permission, optional portrait.
- Do not use anonymous praise or decorative five-star ratings for enterprise projects.

### Video sections

- Poster-first, obvious play/pause, runtime and caption status.
- Ambient loops are 6–15 seconds, muted, and must pause offscreen.
- Long video opens in an accessible dialog or dedicated story chapter.

### Forms

- Labels always visible above inputs; placeholders are examples only.
- Standard height 52 px; textarea minimum 144 px.
- Group project type, timeline, location, and contact details progressively.
- Inline validation after blur/submit; error summary on submit.
- Primary lead form should take under two minutes. Optional fields are marked optional.
- Confirmation states explain response time and next step.

### Project gallery

- Default editorial grid, not masonry chaos.
- Filter by application, environment, and service; preserve filters in URL.
- Hover reveals only secondary data; all essential content exists without hover.

### Industry and feature blocks

- Industry cards lead with environment photography and problem/outcome language.
- Feature blocks pair one claim with one proof object: spec, process visual, drawing, or image.
- Avoid generic benefit icons where photography or a diagram can prove the point.

### Pricing and quotes

- Permanent installations should explain cost drivers, not publish false precision.
- Rental may show “from” ranges only when operationally valid.
- Quote CTA explains inputs required and turnaround expectation.

### FAQ

- Native button-controlled accordion with one optional open item.
- Group by Planning, Technology, Installation, Service, and Commercial.
- Answers link to deeper technical/service content when appropriate.

### Footer

- One clear project CTA, then navigation, contact, operating region, social/legal.
- Include verified company address and response channels.
- Status/certification links only when real and maintained.

## 11. Page hierarchy and conversion

Homepage sequence:

1. A precise promise over signature project film.
2. Immediate trust rail: verified clients, regions, or operating capability.
3. Three solution paths: permanent, rental, service/support.
4. Flagship case study with outcome and engineering data.
5. “How we deliver” process from survey to support.
6. Technology/proof chapter: modules, control, calibration, reliability.
7. Selected projects by environment.
8. Human/company proof: team, warehouse, footprint.
9. FAQ for commercial objections.
10. “Discuss a project” conversion with expectations.

Primary conversion: qualified project conversation. Secondary conversions: explore case studies, download technical information, request service/support. Do not present three equally loud CTAs at once.

## 12. Depth, glass, and lighting

- Depth hierarchy: canvas → surface → raised surface → overlay. Four levels only.
- Glass is allowed for navigation/media controls over moving imagery, at `blur(16px)` maximum and with a solid fallback.
- Ordinary content cards are opaque.
- Glow is emitted by depicted LED content or the Photon Seam; interface elements do not receive generic cyan halos.
- Gradient backgrounds are localized lighting fields, never rainbow wallpaper.
- Shadows use broad low-opacity values; no stacked neon shadows.

## 13. Accessibility and performance

- WCAG 2.2 AA minimum; aim AAA for core reading pairs.
- Visible focus on every interactive element.
- 44×44 px minimum touch target.
- Keyboard access for menus, dialogs, galleries, filters, and media.
- Logical DOM order must match visual order.
- Never encode status by colour alone.
- Text zoom to 200% without loss; layout reflow at 320 CSS px.
- Hero poster should render before video. Do not make video the LCP if a performant image can establish the scene.
- Reserve aspect ratio for all media; avoid layout shift.
- Use responsive images and modern codecs; lazy-load below the first viewport.
- Custom cursor, scroll hijacking, and mandatory smooth scroll are prohibited.

## 14. Content voice

- Calm, specific, and technically literate.
- Lead with what changes for the client, then explain how it works.
- Prefer “5,500 nit outdoor display engineered for direct sun” over “unparalleled visual excellence.”
- Use short headlines and complete-sentence body copy.
- Avoid “revolutionary,” “world-class,” “cutting-edge,” and “best in Europe” unless independently supportable.
- Swedish and English versions must be written for each language, not mechanically line-matched.

## 15. Non-negotiable anti-patterns

- No stock photography.
- No unverified statistics, logos, testimonials, or project claims.
- No electric cyan brand system.
- No glass card grids.
- No gradient text headings.
- No card lift that changes layout.
- No autoplay video with sound.
- No body copy below 16 px.
- No hidden navigation or contact route for the sake of minimalism.
- No animation without a defined duration, curve, trigger, and reduced-motion behaviour.
- No component-specific spacing outside the token system without documentation.

## 16. Approval test

Every page must pass all eight questions:

1. **Premium:** Is value communicated through material, restraint, and art direction rather than effects?
2. **Engineered:** Can the visitor see process, specifications, and operating competence?
3. **Timeless:** Would the composition survive without today’s fashionable effects?
4. **Luxurious:** Is there confidence, space, tactile imagery, and editorial control?
5. **Trustworthy:** Is every important claim supported and every action predictable?
6. **Effortless:** Can a first-time visitor understand the offer and next step within seconds?
7. **Distinctive:** Are the Light Gate, Photon Seam, calibration detail, and dark/daylight rhythm recognizably IM Vision?
8. **Effective:** Does the experience preserve fast access to projects, specifications, service, and contact?

If any answer is no, the page is not approved.
