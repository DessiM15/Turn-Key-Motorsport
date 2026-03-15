# Master Build Plan

## Features (dependency order):

1. ✅ **Foundation & Layout Shell** — Project scaffolding, design system (dark charcoal + electric red), Tailwind config, global layout with sticky header, mega-menu nav, mobile hamburger, announcement bar, footer, reusable UI components (buttons, cards, accordion, modal, section headings). All nav links wired to empty pages so skeleton is navigable. (`tailwind.config.ts`, `app/layout.tsx`, `components/layout/*`, `components/ui/*`, `lib/types.ts`, `lib/constants.ts`)

2. ✅ **Homepage (The Showstopper)** — Hero section with dramatic imagery + CTA, shop-by-category tile grid, featured/trending products carousel, HP-tier packages showcase, why-choose-us stats/counters, testimonials carousel, Instagram feed placeholder, newsletter signup, scroll-triggered animations. (`app/page.tsx`, `components/home/*`)

3. ✅ **E-Commerce / Shop Pages** — 15-20 mock products, shop landing with dual filtering (vehicle make/model/year + category), product listing (grid/list toggle, sorting, pagination), product detail pages (image gallery, specs, fitment, reviews, related products), slide-out cart drawer, checkout flow scaffold, apparel/merch category. (`app/shop/*`, `app/checkout/*`, `components/shop/*`, `lib/data/products.ts`, `lib/cart-context.tsx`)

4. ✅ **Vehicle Packages & Services** — 3-4 HP-tier engine packages (500HP/700HP/1000HP+) with detail pages, 10 services with descriptions/timelines/pricing, consultation booking form (name, phone, email, vehicle, services multi-select, description, preferred contact, file upload). (`app/packages/*`, `app/services/*`, `components/packages/*`, `components/services/*`, `lib/data/packages.ts`, `lib/data/services.ts`, `app/api/booking/route.ts`)

5. ✅ **Gallery & Social Proof** — Builds gallery with 8-10 mock builds, filterable by category (Street/Drag/Track/Daily/Full Build) + vehicle make, lightbox viewing, each build with HP/torque numbers + writeup. Testimonials page with star ratings + review submission form. (`app/gallery/*`, `app/testimonials/*`, `components/gallery/*`, `components/testimonials/*`, `lib/data/builds.ts`, `lib/data/testimonials.ts`, `app/api/review/route.ts`)

6. ✅ **Content & Info Pages** — About (story, team, stats, map placeholder), Blog (listing with hero post, post pages, categories, social share, related posts, 3-4 mock posts), FAQ (accordion by 6 categories, 18-24 Q&As), Contact (form, info, hours, map, social), Account (sign up, log in, dashboard with order history, saved vehicles, addresses, wishlist, profile). (`app/about/*`, `app/blog/*`, `app/faq/*`, `app/contact/*`, `app/account/*`, `lib/data/blog.ts`, `lib/data/faq.ts`, `app/api/contact/route.ts`, `app/api/newsletter/route.ts`)

7. ✅ **Polish, Performance & Final QA** — Scroll animations audit, responsive QA (375/768/1440+), performance optimization (lazy loading, fonts, code splitting), SEO (meta tags, Open Graph, JSON-LD, sitemap), accessibility (ARIA, keyboard nav, focus states, contrast), cross-browser check, final design consistency pass, 404 page, README finalization.

8. ✅ **Full Scheduling Page** — Date/time selection, confirmation workflow (14 files).

9. ✅ **Admin Appointments Panel** — Password-protected admin panel for appointment management (16 files).

10. ✅ **Square Web Payments Integration** — Real payment processing via Square SDK. Card form (iframe, PCI-safe), server-side payment API with Zod validation, error mapping, sandbox/production env var switch. (7 files: lib/square.ts, components/shop/SquareCardForm.tsx, app/api/checkout/route.ts, .env.example, CheckoutForm.tsx, layout.tsx, next.config.ts)

11. ✅ **Hybrid Chat Widget** — AI-powered chat widget using Claude Sonnet 4.6. Knowledge base from services/FAQ data, business hours mode switching (live vs AI), lead capture, sessionStorage persistence. Floating bubble on all pages, full-screen on mobile, 360x500 window on desktop. (11 files: lib/data/chat-knowledge-base.ts, lib/types.ts, lib/chat-utils.ts, app/api/chat/route.ts, lib/chat-context.tsx, components/chat/ChatBubble.tsx, components/chat/ChatMessage.tsx, components/chat/ChatWindow.tsx, components/chat/ChatWidget.tsx, app/layout.tsx, .env.example)

12. ✅ **Shop-Side Live Chat Admin UI** — Admin panel for live customer chat management (12 files).

13. ✅ **Vehicle Garage & Fitment Tool** — Year/Make/Model/Engine selector, fitment badges, GarageBar, localStorage persistence (16 files).

14. ⬜ **Soft Account System & Dashboard** — Soft account creation prompts + full account dashboard. 5 sub-features:
    - 14a. ✅ **Auth Foundation** — AuthProvider, data service layer (localStorage demo / Supabase-ready), login/signup forms, AuthModal, standalone pages, layout + header integration (10 files)
    - 14b. ✅ **Wishlist System** — WishlistProvider, heart button on product cards + detail pages, localStorage persistence (5 files)
    - 14c. ✅ **Soft Account Prompts** — Toast after vehicle save, inline banners on checkout + appointment confirmation, modal on wishlist when logged out, prompt dismissal tracking (7 files)
    - 14d. ✅ **Account Dashboard** — Full rewrite with auth gate, sidebar, 6 tabs: Profile, Orders, Vehicles, Wishlist, Addresses, Settings (8 files)
    - 14e. ✅ **Integration & Polish** — Mobile nav auth links, garage-to-account sync, address save from checkout, localStorage merge on login (4 files)

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
