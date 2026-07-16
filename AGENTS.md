<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:imvision-typography-rules -->
# Typography & font architecture

The site distinguishes between two font roles:

- `--font-heading` — display headlines and large section titles.
- `--font-body` — body copy and UI text.

Both are currently served by Manrope, configured in `src/app/fonts/index.ts` via `next/font/google`. To swap in a licensed premium font, use `next/font/local` in the same file and place WOFF2 files next to `src/app/fonts/index.ts`. Do not invent or redistribute commercial font files.

See `PREMIUM-FONTS.md` for purchase options, licensing notes, and the exact implementation steps.
<!-- END:imvision-typography-rules -->
