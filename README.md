# IMvision Website

A premium, multi-page Next.js website for IMvision — a European LED display solutions company.

## Overview

This is a complete redesign focused on communicating engineering excellence, Scandinavian design precision, and large-scale capability. The site is built as a fast, accessible, animation-rich experience that positions IMvision as a premium brand.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (`motion`), GSAP-ready architecture
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

## Pages

- `/` — Home with hero, story timeline, services, technology, portfolio, stats, contact CTA
- `/projects/` — Project portfolio index
- `/projects/[slug]/` — Case-study detail pages
- `/sales/` — Permanent LED sales
- `/rental/` — Event LED rental
- `/service/` — Service & support
- `/about/` — Company story and values
- `/contact/` — Contact form and details
- `/support/` — Support center and FAQ

## Design System

- **Primary accent:** `#00E5FF` (electric cyan)
- **Background:** `#030308` (deep void)
- **Elevated surfaces:** `#0A0A10`, `#12121C`
- **Typography:** Geist Sans + Geist Mono

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static files are exported to the `dist/` directory, ready for Vercel or any static host.

## Legacy Site

The previous static HTML/CSS/JS site is preserved in `/legacy/` for reference.
