# IMvision Landing Page

A redesigned, single-page landing site for IMvision — inspired by the original site's geometric diamond identity, but rebuilt with clearer hierarchy, stronger visual impact, and modern UX.

## Structure

1. **Hero** — Brand statement, value proposition, primary and secondary CTAs.
2. **Trust / Social Proof** — Client logo row to build credibility.
3. **Services** — Sales, Rental, Service as three clear columns with icons.
4. **Stats** — Key credibility numbers (experience, projects, satisfaction, support).
5. **Portfolio** — Four focused case cards: Fashion, Grocery, Automotive, Outdoor Advertising.
6. **Contact / CTA** — Contact form, details, and a trust statement.

## Design System

Generated with UI/UX Pro Max:

- **Style:** Social proof-focused, OLED dark mode
- **Colors:** Deep black (`#000000`), dark elevated (`#0a0a0b`), cyan accent (`#00d4ff`)
- **Typography:** Poppins (headings) + Inter (body)
- **Pattern:** Enterprise Gateway with prominent trust signals

## Tech Stack

- Static HTML5
- CSS3 (custom properties, Flexbox, CSS Grid)
- Vanilla JavaScript
- No build step required

## Accessibility

- WCAG AA contrast ratios
- Visible `:focus-visible` states
- Semantic HTML + ARIA labels
- `prefers-reduced-motion` respected
- All interactive elements have `cursor: pointer`
- Form labels associated with inputs

## Deployment

This is a static site ready to deploy on Vercel, Netlify, GitHub Pages, or any static host.

### Deploy to Vercel

```bash
vercel --prod
```

Or drag the project folder into [vercel.com/new](https://vercel.com/new).

## Local Preview

Open `index.html` directly in a browser, or run a local server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.
