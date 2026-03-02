# Master Build Plan

## Features (dependency order):

1. ✅ **Foundation & Layout Shell** — Project scaffolding, design system (dark charcoal + electric red), Tailwind config, global layout with sticky header, mega-menu nav, mobile hamburger, announcement bar, footer, reusable UI components (buttons, cards, accordion, modal, section headings). All nav links wired to empty pages so skeleton is navigable. (`tailwind.config.ts`, `app/layout.tsx`, `components/layout/*`, `components/ui/*`, `lib/types.ts`, `lib/constants.ts`)

2. ✅ **Homepage (The Showstopper)** — Hero section with dramatic imagery + CTA, shop-by-category tile grid, featured/trending products carousel, HP-tier packages showcase, why-choose-us stats/counters, testimonials carousel, Instagram feed placeholder, newsletter signup, scroll-triggered animations. (`app/page.tsx`, `components/home/*`)

3. ✅ **E-Commerce / Shop Pages** — 15-20 mock products, shop landing with dual filtering (vehicle make/model/year + category), product listing (grid/list toggle, sorting, pagination), product detail pages (image gallery, specs, fitment, reviews, related products), slide-out cart drawer, checkout flow scaffold, apparel/merch category. (`app/shop/*`, `app/checkout/*`, `components/shop/*`, `lib/data/products.ts`, `lib/cart-context.tsx`)

4. ✅ **Vehicle Packages & Services** — 3-4 HP-tier engine packages (500HP/700HP/1000HP+) with detail pages, 10 services with descriptions/timelines/pricing, consultation booking form (name, phone, email, vehicle, services multi-select, description, preferred contact, file upload). (`app/packages/*`, `app/services/*`, `components/packages/*`, `components/services/*`, `lib/data/packages.ts`, `lib/data/services.ts`, `app/api/booking/route.ts`)

5. ✅ **Gallery & Social Proof** — Builds gallery with 8-10 mock builds, filterable by category (Street/Drag/Track/Daily/Full Build) + vehicle make, lightbox viewing, each build with HP/torque numbers + writeup. Testimonials page with star ratings + review submission form. (`app/gallery/*`, `app/testimonials/*`, `components/gallery/*`, `components/testimonials/*`, `lib/data/builds.ts`, `lib/data/testimonials.ts`, `app/api/review/route.ts`)

6. ✅ **Content & Info Pages** — About (story, team, stats, map placeholder), Blog (listing with hero post, post pages, categories, social share, related posts, 3-4 mock posts), FAQ (accordion by 6 categories, 18-24 Q&As), Contact (form, info, hours, map, social), Account (sign up, log in, dashboard with order history, saved vehicles, addresses, wishlist, profile). (`app/about/*`, `app/blog/*`, `app/faq/*`, `app/contact/*`, `app/account/*`, `lib/data/blog.ts`, `lib/data/faq.ts`, `app/api/contact/route.ts`, `app/api/newsletter/route.ts`)

7. ✅ **Polish, Performance & Final QA** — Scroll animations audit, responsive QA (375/768/1440+), performance optimization (lazy loading, fonts, code splitting), SEO (meta tags, Open Graph, JSON-LD, sitemap), accessibility (ARIA, keyboard nav, focus states, contrast), cross-browser check, final design consistency pass, 404 page, README finalization.

## Shared Dependencies

### Install Commands
```bash
npx create-next-app@latest turnkey-motorsports --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd turnkey-motorsports
npm install zod lucide-react framer-motion
npm install -D @types/node
```

### Key Libraries
- **zod** — form/API validation
- **lucide-react** — icon library (consistent, tree-shakeable)
- **framer-motion** — scroll animations, page transitions, hover effects

### Fonts (loaded via next/font)
- **Display:** Bebas Neue, Oswald, or Rajdhani (bold, aggressive — will evaluate during Phase 1)
- **Body:** Inter alternative or system sans-serif optimized for dark backgrounds

## Infrastructure First (pre-Feature-1 setup)
- Next.js project scaffold with App Router
- TypeScript strict mode configured
- Tailwind config with custom design tokens (colors, fonts, spacing)
- Folder structure per project spec
- Type definitions in `lib/types.ts`
- Constants in `lib/constants.ts`
- `.env.example` in project root
- `.gitignore` configured
