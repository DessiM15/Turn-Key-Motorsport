# Turnkey Motorsports — PROJECT SPEC

## Gate 0: Vision

### Problem
Turnkey Motorsports is a physical performance shop that builds engines, sells parts, and does installations across all makes and models. Without a web presence, they're invisible to the vast majority of their potential market while competitors (Calvo, FRP, Underground, Fathouse) dominate online.

### Users
1. **Street/Daily Enthusiasts** (primary, high volume) — impulse buyers wanting bolt-ons, cold air intakes, cam packages, Stage 1-2 builds. Browse Instagram, watch YouTube pulls, buy parts at midnight.
2. **Serious Build Customers** (secondary, high ticket) — commissioning full engine builds, turbo kits, 700-1000+ HP packages. Research for weeks, compare shops, read every detail.
3. **Local/Regional Service Clients** — people bringing cars to the physical shop for builds, tuning, installation, diagnostics.

### Success Metrics
- Professional online presence that matches or exceeds Calvo, FRP, Underground, Fathouse
- E-commerce flow that enables national parts sales
- Service consultation pipeline that generates local leads
- Authority content (gallery, blog, FAQ, testimonials) that builds trust

---

## Gate 1: Architecture

### Stack
- **Framework:** Next.js 14+ (App Router) with TypeScript (strict)
- **Styling:** Tailwind CSS — dark, aggressive, premium design system
- **E-Commerce:** Mock data with clean interfaces for later Shopify/Snipcart integration
- **Auth:** UI scaffolded, no real auth — ready for NextAuth/Supabase/platform auth
- **Forms:** Zod validation, API routes with mock handling, clean integration points
- **Content:** Static mock data in centralized JSON files — CMS-ready (Contentful/Sanity swap)
- **Deployment:** Vercel (.vercel.app subdomain initially)
- **Patterns:** CODEBAKERS.md (one component per file, default export, typed props, loading/error/empty states, Zod validation on all API routes)

### System Diagram
```mermaid
graph TB
    subgraph "Frontend — Next.js App Router"
        LAYOUT[Root Layout<br/>Header + Mega Menu + Footer]
        HOME[Homepage]
        SHOP[Shop / Parts Catalog]
        PACKAGES[Engine Packages]
        SERVICES[Services]
        GALLERY[Builds Gallery]
        TESTIMONIALS[Testimonials]
        ABOUT[About]
        BLOG[Blog]
        FAQ[FAQ]
        CONTACT[Contact]
        ACCOUNT[Account Dashboard]
        CART[Cart Drawer + Checkout]
    end

    subgraph "Data Layer — Mock / Integration Points"
        PRODUCTS[Products JSON<br/>15-20 mock products]
        BUILDS[Builds JSON<br/>8-10 mock builds]
        PACKAGES_DATA[Packages JSON<br/>3-4 HP tiers]
        SERVICES_DATA[Services JSON<br/>10 services]
        BLOG_DATA[Blog Posts JSON<br/>3-4 mock posts]
        FAQ_DATA[FAQ JSON<br/>18-24 Q&As]
        TESTIMONIALS_DATA[Testimonials JSON<br/>8-10 reviews]
    end

    subgraph "API Routes — Mock Backend"
        API_CONTACT[/api/contact<br/>→ log + TODO: email service]
        API_BOOKING[/api/booking<br/>→ log + TODO: email/CRM]
        API_NEWSLETTER[/api/newsletter<br/>→ log + TODO: Mailchimp/ConvertKit]
        API_REVIEW[/api/review<br/>→ log + TODO: moderation]
        API_CART[/api/cart<br/>→ local state + TODO: Shopify]
    end

    LAYOUT --> HOME & SHOP & PACKAGES & SERVICES & GALLERY & TESTIMONIALS & ABOUT & BLOG & FAQ & CONTACT & ACCOUNT & CART
    SHOP --> PRODUCTS
    GALLERY --> BUILDS
    PACKAGES --> PACKAGES_DATA
    SERVICES --> SERVICES_DATA
    BLOG --> BLOG_DATA
    FAQ --> FAQ_DATA
    TESTIMONIALS --> TESTIMONIALS_DATA
    CONTACT --> API_CONTACT
    SERVICES --> API_BOOKING
    HOME --> API_NEWSLETTER
    TESTIMONIALS --> API_REVIEW
    CART --> API_CART
```

### Data Model (TypeScript Interfaces)

```typescript
// Product
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  subcategory: string;
  images: string[];
  specs: Record<string, string>;
  fitment: VehicleFitment[];
  reviews: Review[];
  relatedProductIds: string[];
  inStock: boolean;
  featured: boolean;
}

// Vehicle Fitment
interface VehicleFitment {
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
}

// Engine Package
interface EnginePackage {
  id: string;
  name: string;
  slug: string;
  hpTarget: number;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  partsIncluded: string[];
  specs: Record<string, string>;
  vehiclePlatforms: string[];
  featured: boolean;
}

// Build (Gallery)
interface Build {
  id: string;
  slug: string;
  title: string;
  vehicle: { year: number; make: string; model: string };
  category: BuildCategory; // 'street' | 'drag' | 'track' | 'daily-driver' | 'full-build'
  modsPerformed: string[];
  hpBefore: number;
  hpAfter: number;
  torqueBefore: number;
  torqueAfter: number;
  images: string[];
  writeup: string;
  costRange?: string;
  status: 'published' | 'submitted'; // future-proofed for customer submissions
}

// Service
interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  timelineRange: string;
  priceRange: string | null; // null = "Contact for Quote"
}

// Blog Post
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown/rich text
  coverImage: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  relatedPostIds: string[];
}

// Testimonial / Review
interface Testimonial {
  id: string;
  customerName: string;
  vehicle: { year: number; make: string; model: string };
  rating: number; // 1-5
  text: string;
  image?: string;
  date: string;
}

// FAQ
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

// Booking Request
interface BookingRequest {
  name: string;
  phone: string;
  email: string;
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  servicesInterested: string[];
  description: string;
  preferredContact: 'call' | 'email';
  photos?: File[];
}

// User Account (scaffolded)
interface UserAccount {
  id: string;
  name: string;
  email: string;
  savedVehicles: SavedVehicle[];
  addresses: Address[];
  wishlistProductIds: string[];
  orderHistory: Order[];
}
```

### Auth
- No real authentication. UI fully scaffolded (sign up, log in, dashboard).
- Data model supports plugging in NextAuth, Supabase Auth, or platform auth.
- Account dashboard: order history, saved vehicles, saved addresses, wishlist, profile.
- All mock data.

---

## Gate 2: Features

### P0 — Must Have (Core Experience)
- Global layout: sticky header, mega-menu navigation (vehicle + service organized), mobile hamburger, announcement bar, full footer
- Design system: dark charcoal base, electric red accent, bold display font, Tailwind tokens
- Homepage: hero, shop-by-category tiles, featured products, HP-tier packages showcase, why-choose-us stats, testimonials carousel, Instagram placeholder, newsletter signup
- Shop/Parts: category landing, dual filtering (vehicle make/model/year + category), product listing (grid/list toggle), product detail pages, slide-out cart drawer, checkout scaffold
- Engine Packages: HP-tier pages (500HP / 700HP / 1000HP+), individual detail pages with full breakdowns
- Services: 10 service listings with CTAs, consultation booking form
- Builds Gallery: filterable grid, 8-10 mock builds, category + make filtering, lightbox
- Responsive: mobile-first, tested at 375px / 768px / 1440px+

### P1 — Should Have (Trust & Content)
- Testimonials page: dedicated page, star ratings, review submission form
- Blog: listing with hero post, individual post pages, category filtering, social share, related posts
- FAQ: accordion by category, 18-24 realistic Q&As
- About: shop story, team, stats, Google Map placeholder
- Contact: form, info, hours, map, social links
- Account: sign up, log in, dashboard (order history, saved vehicles, addresses, wishlist, profile)
- Search with autocomplete suggestions

### P2 — Nice to Have (Polish)
- Scroll-triggered animations (fade-in, slide-up reveals)
- Parallax on hero sections
- Financing callout (Affirm/Klarna badge)
- Social media integration (Instagram feed placeholder)
- SEO: structured data (JSON-LD for local business + products), Open Graph, sitemap
- Performance: lazy loading, font optimization, code splitting, image optimization
- Accessibility audit: ARIA labels, keyboard nav, focus states, contrast

---

## Gate 3: Implementation Plan

### Feature Build Order (7 Phases)

| # | Feature | Complexity | Key Files |
|---|---------|-----------|-----------|
| 1 | **Foundation & Layout Shell** | L | `tailwind.config.ts`, `app/layout.tsx`, `components/layout/*`, `lib/types.ts`, `lib/constants.ts` |
| 2 | **Homepage** | L | `app/page.tsx`, `components/home/*` |
| 3 | **E-Commerce / Shop** | XL | `app/shop/*`, `app/cart/*`, `app/checkout/*`, `components/shop/*`, `lib/data/products.ts`, `lib/cart-context.tsx` |
| 4 | **Vehicle Packages & Services** | L | `app/packages/*`, `app/services/*`, `components/packages/*`, `components/services/*`, `lib/data/packages.ts`, `lib/data/services.ts`, `app/api/booking/route.ts` |
| 5 | **Gallery & Testimonials** | M | `app/gallery/*`, `app/testimonials/*`, `components/gallery/*`, `components/testimonials/*`, `lib/data/builds.ts`, `lib/data/testimonials.ts`, `app/api/review/route.ts` |
| 6 | **Content Pages** | M | `app/about/*`, `app/blog/*`, `app/faq/*`, `app/contact/*`, `app/account/*`, `lib/data/blog.ts`, `lib/data/faq.ts`, `app/api/contact/route.ts`, `app/api/newsletter/route.ts` |
| 7 | **Polish, Performance & QA** | M | All files — animations, responsive QA, SEO, accessibility, performance optimization |

---

## Gate 4: Infrastructure

### Environment Variables
```env
# .env.example
NEXT_PUBLIC_SITE_URL=https://turnkey-motorsports.vercel.app
NEXT_PUBLIC_SITE_NAME=Turnkey Motorsports
NEXT_PUBLIC_CONTACT_EMAIL=info@turnkeymotorsports.com
NEXT_PUBLIC_CONTACT_PHONE=(555) 123-4567
NEXT_PUBLIC_SHOP_ADDRESS=123 Performance Drive, Anytown, USA
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
# TODO: Add when connecting e-commerce platform
# SHOPIFY_STOREFRONT_ACCESS_TOKEN=
# SHOPIFY_STORE_DOMAIN=
# TODO: Add when connecting email service
# MAILCHIMP_API_KEY=
# MAILCHIMP_LIST_ID=
# TODO: Add when connecting auth
# NEXTAUTH_SECRET=
# NEXTAUTH_URL=
```

### Services
- **Hosting:** Vercel (free tier to start, Pro when needed)
- **E-Commerce:** Mock → Shopify Storefront API or Snipcart (client decides)
- **CMS:** Mock JSON → Contentful or Sanity (client decides)
- **Auth:** Mock → NextAuth or Supabase Auth (client decides)
- **Email:** Mock → Mailchimp/ConvertKit (client decides)
- **Maps:** Google Maps embed placeholder
- **Analytics:** TODO: Google Analytics / Vercel Analytics

### Deployment
- Vercel auto-deploy from main branch
- Environment variables via Vercel dashboard
- `next build` must pass clean with zero errors
- Default .vercel.app subdomain, custom domain later

---

## Gate 5: Launch Checklist

### Security
- [ ] No secrets in client-side code
- [ ] All forms have input validation (Zod)
- [ ] API routes validate and sanitize inputs
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] `.env.example` has placeholder values only
- [ ] Rate limiting comments/TODOs on public API routes

### Performance
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] All images use `next/image` with proper sizing
- [ ] Lazy loading on below-fold images and heavy components
- [ ] Font optimization (display: swap, subset)
- [ ] Code splitting / dynamic imports for heavy components

### Accessibility (WCAG AA)
- [ ] Proper heading hierarchy (h1 → h6)
- [ ] All images have alt text
- [ ] Form inputs have labels and aria-describedby for errors
- [ ] Keyboard navigation works on all interactive elements
- [ ] Focus states visible on all focusable elements
- [ ] Color contrast ratio meets AA (4.5:1 for text)
- [ ] Skip-to-content link

### SEO
- [ ] Unique title and meta description per page
- [ ] Open Graph tags on all pages
- [ ] JSON-LD structured data (LocalBusiness, Product, FAQPage, Article)
- [ ] Semantic HTML (nav, main, article, section, aside)
- [ ] Sitemap generated
- [ ] robots.txt configured

### UX
- [ ] All pages responsive at 375px, 768px, 1440px+
- [ ] Mobile navigation works smoothly
- [ ] Cart drawer functions correctly
- [ ] All forms show loading, success, and error states
- [ ] Empty states for search results, filters with no matches
- [ ] 404 page styled and helpful
- [ ] Scroll-to-top behavior on navigation
