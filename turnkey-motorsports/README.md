# Turnkey Motorsports

High-performance automotive e-commerce and service website built with Next.js, TypeScript, and Tailwind CSS.

## About

Turnkey Motorsports is an automotive performance shop specializing in full engine builds, engine packages, and performance parts sales and installation. This website serves as their digital storefront — combining national e-commerce parts sales, service lead generation, and authority-building content.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Validation:** Zod
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
cd turnkey-motorsports
npm install
```

### Environment Variables
```bash
cp .env.example .env.local
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Production Build
```bash
npm run build
npm start
```

## Pages (57 static pages)

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, categories, featured products, packages, stats, testimonials, newsletter |
| `/shop` | Parts catalog with dual filtering (category + vehicle), sorting, grid/list toggle, pagination |
| `/shop/[slug]` | Product detail — specs, fitment, reviews, related products (18 products) |
| `/packages` | Engine build packages — 500HP / 700HP / 1000HP+ / Custom tiers |
| `/packages/[slug]` | Package detail — parts list, specs, vehicle platforms |
| `/services` | Service listings with booking form |
| `/gallery` | Past builds gallery with category + make filtering |
| `/gallery/[slug]` | Build detail — HP/torque stats, mods, writeup (10 builds) |
| `/blog` | Blog listing with hero post + grid |
| `/blog/[slug]` | Blog post detail with content, tags, related posts (4 posts) |
| `/testimonials` | Customer reviews with star ratings + review submission |
| `/about` | Shop story, stats, team, location |
| `/contact` | Contact form + business info sidebar |
| `/faq` | FAQ accordion organized by 6 categories (20 Q&As) |
| `/account` | Account dashboard scaffold (profile, orders, vehicles, wishlist) |
| `/checkout` | Checkout flow scaffold |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/cart` | POST | Order submission with Zod validation |
| `/api/contact` | POST | Contact form submission |
| `/api/booking` | POST | Service booking request |
| `/api/review` | POST | Customer review submission |

## Project Structure
```
turnkey-motorsports/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (header, footer, cart provider)
│   ├── page.tsx            # Homepage with JSON-LD
│   ├── not-found.tsx       # Custom 404
│   ├── error.tsx           # Global error boundary
│   ├── loading.tsx         # Global loading skeleton
│   ├── sitemap.ts          # Dynamic sitemap (57 URLs)
│   ├── robots.ts           # Robots directives
│   ├── shop/               # Parts catalog & product pages
│   ├── packages/           # Engine build packages (HP tiers)
│   ├── services/           # Service listings & booking
│   ├── gallery/            # Past builds gallery
│   ├── blog/               # Blog listing & posts
│   ├── testimonials/       # Customer reviews
│   ├── about/              # About the shop
│   ├── contact/            # Contact page
│   ├── faq/                # FAQ page
│   ├── account/            # Account dashboard (scaffolded)
│   ├── checkout/           # Checkout flow (scaffolded)
│   └── api/                # API routes (cart, contact, booking, review)
├── components/
│   ├── layout/             # Header, Footer, AnnouncementBar, MobileMenu
│   ├── home/               # Homepage sections (Hero, Categories, etc.)
│   ├── shop/               # ProductCard, Filters, CartDrawer, CheckoutForm
│   ├── services/           # BookingForm
│   ├── gallery/            # GalleryContent
│   ├── contact/            # ContactForm
│   ├── testimonials/       # ReviewForm
│   └── ui/                 # Button, Card, Badge, Accordion, Container, etc.
├── lib/
│   ├── data/               # Mock data (products, packages, builds, blog, etc.)
│   ├── types.ts            # TypeScript interfaces
│   ├── constants.ts        # Site-wide constants
│   ├── utils.ts            # Utility functions (cn, formatPrice, slugify)
│   └── cart-context.tsx    # Cart state with React Context + localStorage
└── public/                 # Static assets
```

## Design System

- **Background:** Dark charcoal `#0A0A0A`
- **Accent:** Electric red `#E63946`
- **Display Font:** Oswald (bold, uppercase headings)
- **Body Font:** Barlow (clean readability)
- **Approach:** Mobile-first, WCAG AA accessible, semantic HTML

## SEO & Infrastructure

- Dynamic sitemap covering all 57 pages
- Robots.txt with protected routes (/api, /account, /checkout)
- JSON-LD structured data (AutoRepair schema) on homepage
- OpenGraph and Twitter Card metadata on all pages
- Custom 404 and error pages
- Skip-to-content link and focus-visible styles

## Integration Points

This site is built with mock data and clean integration points for:

- **E-Commerce:** Shopify Storefront API or Snipcart (replace mock product data)
- **CMS:** Contentful or Sanity (blog posts, builds, testimonials)
- **Auth:** NextAuth or Supabase Auth (account page ready)
- **Email:** SendGrid or Resend (contact/booking form notifications)
- **Newsletter:** Mailchimp or ConvertKit
- **Payment:** Stripe (checkout flow scaffolded)
- **Maps:** Google Maps API (placeholder on about/contact pages)

All integration points are marked with `// TODO:` comments.

## License

Private — Turnkey Motorsports.
