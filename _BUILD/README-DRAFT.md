# Turnkey Motorsports

High-performance automotive e-commerce and service website built with Next.js 14+, TypeScript, and Tailwind CSS.

## About

Turnkey Motorsports is an automotive performance shop specializing in full engine builds, engine packages, and performance parts sales & installation across all makes and models. This website serves as their digital storefront — combining national e-commerce parts sales, service lead generation, and authority-building content.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Validation:** Zod
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Build
```bash
npm run build
```

### Environment Variables
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

## Project Structure
```
turnkey-motorsports/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (header + footer)
│   ├── page.tsx            # Homepage
│   ├── shop/               # Parts catalog & product pages
│   ├── packages/           # Engine build packages (HP tiers)
│   ├── services/           # Service listings & booking
│   ├── gallery/            # Past builds gallery
│   ├── about/              # About the shop
│   ├── blog/               # Blog / news
│   ├── testimonials/       # Customer reviews
│   ├── faq/                # FAQ page
│   ├── contact/            # Contact page
│   ├── account/            # User account (scaffolded)
│   ├── checkout/           # Checkout flow (scaffolded)
│   └── api/                # API routes
├── components/
│   ├── layout/             # Header, Footer, Nav, MegaMenu
│   ├── home/               # Homepage sections
│   ├── shop/               # Product cards, filters, cart
│   ├── packages/           # Package cards, tier displays
│   ├── services/           # Service cards, booking form
│   ├── gallery/            # Build cards, lightbox
│   ├── blog/               # Post cards, post layout
│   └── ui/                 # Buttons, inputs, modals, accordion
├── lib/
│   ├── data/               # Mock data files (products, builds, etc.)
│   ├── types.ts            # TypeScript interfaces
│   ├── constants.ts        # Site-wide constants
│   ├── utils.ts            # Utility functions
│   └── cart-context.tsx    # Cart state management
├── public/                 # Static assets, placeholder images
└── tailwind.config.ts      # Tailwind design tokens
```

## Integration Points

This site is scaffolded with mock data and clean integration points for:
- **E-Commerce:** Shopify Storefront API or Snipcart
- **CMS:** Contentful or Sanity (for blog, builds, testimonials)
- **Auth:** NextAuth or Supabase Auth
- **Email:** Mailchimp or ConvertKit (newsletter)
- **Notifications:** Email service or webhook (contact/booking forms)

All integration points are marked with `// TODO:` comments in the codebase.

## License

Private — Turnkey Motorsports.
