# Turnkey Motorsports — Website Build Prompt for Claude Code

> **Copy and paste everything below this line into Claude Code.**

---

## Project Overview

Build a complete, production-ready e-commerce website for **Turnkey Motorsports**, an automotive performance shop that specializes in full engine builds, engine packages, and performance parts sales & installation. They work on **all makes and models** (not brand-specific). They have a physical shop location and want to sell parts online.

This site needs to feel like the best version of the top motorsports performance shops online. I studied four competitor/reference sites and want you to merge the strongest elements of each into one cohesive, elevated website. Here's what to pull from each:

### Reference Site DNA (merge these strengths):

**From Calvo Motorsports (calvo-motorsports.com):**
- Dark, premium aesthetic with a luxury/high-end feel
- Hero carousel with dramatic car photography
- "Shop by Category" section with large image tiles
- Trending/featured products section on the homepage
- Branded merch/apparel shop integrated naturally
- Clean, confidence-inspiring layout that says "we're the best"

**From FRP Tuning (frptuning.com):**
- Content-rich mega-menu navigation organized by vehicle AND by service type
- Promotional announcement banners at the top of the page
- Strong service scheduling and consultation booking integration
- Parts organized by vehicle generation/platform with deep subcategories
- "Build Your Own" custom kit configurator concept
- Guides and resource pages that build trust and authority

**From Underground Tuning (undergroundtuning.com):**
- Bold, punchy hero section with a strong tagline and clear CTA
- "Shop by Engine" quick-filter section
- Customer testimonials carousel with photos and vehicle info
- Financing callout (Affirm/Klarna integration mention)
- Product bundles / "Power Pack" strategy (bundled packages at different tiers)
- Clean product-focused layout with minimal clutter
- Social media integration (Facebook, Instagram, YouTube)

**From Fathouse Performance (fathouseperformance.com):**
- Vehicle performance packages organized by tiered horsepower levels (e.g., 800R, 1000R, 1200R)
- Parts deeply organized by vehicle platform with subcategories (engine dress up, fuel system, cooling, safety, drivetrain, etc.)
- Professional, build-oriented presentation that communicates serious engineering credibility
- Vehicle Packages as a dedicated section (not just buried in the shop)
- Clear part compatibility info organized by car model

---

## Tech Stack

Recommend and use the best modern tech stack for this project. Suggested starting point:
- **Next.js 14+ (App Router)** with TypeScript
- **Tailwind CSS** for styling
- **Headless e-commerce**: Scaffold with mock data, structured so the client can later connect Shopify, Snipcart, or similar
- If you have a better recommendation for this type of site, explain why and use it

---

## Design Direction

**Theme:** Dark, aggressive, premium. Think matte black with sharp accent colors. The site should feel fast, powerful, and professional — like walking into a high-end performance shop.

**Design principles to follow:**
- Dark background (near-black or very dark charcoal) with high-contrast elements
- One bold accent color (e.g., electric red, neon green, or bright orange — pick what works best) used sparingly for CTAs, highlights, and hover states
- Large, dramatic hero imagery with overlay text
- Bold, masculine typography — use a strong display font for headings (NOT generic fonts like Inter, Arial, or Roboto) paired with a clean sans-serif for body text
- Subtle animations: smooth scroll reveals, hover effects on product cards, parallax on hero sections
- Card-based product layouts with clean hover states
- Generous spacing — let the content breathe
- Mobile-first responsive design

---

## Site Structure & Pages

### 1. Homepage
- **Announcement bar** at the very top (for promos, shipping info, financing callout)
- **Navigation**: Sticky header with logo, mega-menu nav, search bar, cart icon, account icon
- **Hero section**: Full-width with dramatic car imagery, bold headline, subtext, and primary CTA button. Use placeholder images for now.
- **Shop by Category**: Grid of large image tiles (Engine Builds, Performance Parts, Apparel, etc.)
- **Featured/Trending Products**: Horizontal scrollable product cards
- **Vehicle Packages Showcase**: Tiered build packages displayed like Fathouse's approach (e.g., "500HP Package", "700HP Package", "1000HP Package") with pricing and key specs
- **Why Choose Us / About Preview**: Brief section highlighting experience, certifications, quality — with stats/counters (e.g., "500+ Builds Completed", "15+ Years Experience")
- **Testimonials Carousel**: Customer reviews with photos and vehicle details
- **Instagram Feed / Social Proof section**: Placeholder grid
- **Newsletter signup**
- **Footer**: Full footer with nav links, contact info, shop hours, social media icons, payment method icons

### 2. Shop / Parts (E-Commerce)
- Category landing page with filters (by vehicle make/model/year, by part type, by price)
- Product listing page with grid/list view toggle
- Individual product pages with:
  - Multiple product images with gallery/lightbox
  - Price, description, specs
  - Vehicle fitment/compatibility info
  - "Add to Cart" and "Buy Now" buttons
  - Related products section
  - Customer reviews on each product
- Shopping cart with slide-out drawer
- Checkout flow (scaffold the UI, mock the payment)

### 3. Vehicle Packages / Builds
- Dedicated page showcasing tiered engine build packages
- Each package displayed as a card with: package name, HP target, what's included, price, and CTA
- Organized by vehicle platform or by HP tier
- Individual package detail pages with full breakdown

### 4. Services
- Overview of all services offered (engine builds, installation, diagnostics, dyno tuning, etc.)
- Service detail pages or expandable sections
- "Book an Appointment" CTA integrated throughout
- Service booking form or calendar integration placeholder

### 5. Gallery / Past Builds
- Filterable image gallery showcasing completed builds
- Each build entry can include: vehicle info, work performed, before/after photos, HP numbers
- Masonry or grid layout with lightbox

### 6. About Us
- Shop story, mission, team
- Photos of the shop and team
- Years of experience, certifications, specialty areas
- Location info with embedded Google Map placeholder

### 7. Blog / News
- Blog listing page with featured post at top
- Individual blog post pages with rich content layout
- Categories/tags for filtering
- Social share buttons

### 8. Testimonials / Reviews
- Dedicated testimonials page (in addition to the homepage carousel)
- Customer reviews with photos, vehicle info, star ratings
- Option to submit a review (form)

### 9. FAQ
- Accordion-style FAQ page
- Organized by category (Ordering, Shipping, Services, Returns, etc.)

### 10. Contact
- Contact form
- Phone number, email, physical address
- Business hours
- Embedded Google Map placeholder
- Social media links

---

## Key Features & Functionality

- **Fully responsive** — mobile, tablet, desktop
- **Mega-menu navigation** with subcategories and optional images (like FRP Tuning)
- **Search** with autocomplete/suggestions
- **Shopping cart** with slide-out drawer
- **Product filtering & sorting** (by vehicle, category, price, popularity)
- **Announcement/promo bar** (dismissible, rotates messages)
- **Financing callout** — "Financing available through Affirm" badge/banner
- **Smooth scroll animations** — fade-in on scroll, parallax hero, hover effects
- **Social media integration** — link icons + optional Instagram feed section
- **SEO-optimized** — proper meta tags, semantic HTML, structured data, Open Graph tags
- **Performance-optimized** — lazy loading images, optimized fonts, code splitting
- **Accessibility** — proper ARIA labels, keyboard navigation, color contrast

---

## Placeholder Content

Since the client will provide branding and content later:
- Use **"Turnkey Motorsports"** as the business name throughout
- Use a **placeholder logo** (text-based or simple SVG)
- Use **placeholder images** from Unsplash or generate SVG placeholders for cars, engines, shop photos
- Write **realistic placeholder copy** that sounds like a real performance shop (not generic lorem ipsum). Make it sound confident, knowledgeable, and enthusiast-focused.
- Create **mock products** with realistic names, descriptions, and prices (e.g., "Stage 2 Cam Package - $2,499", "Cold Air Intake Kit - $389", etc.)
- Create **mock vehicle packages** at 3-4 HP tiers with realistic specs and pricing

---

## File Structure

Organize the project cleanly:
```
turnkey-motorsports/
├── app/                    # Next.js app router pages
│   ├── layout.tsx
│   ├── page.tsx            # Homepage
│   ├── shop/
│   ├── packages/
│   ├── services/
│   ├── gallery/
│   ├── about/
│   ├── blog/
│   ├── testimonials/
│   ├── faq/
│   └── contact/
├── components/
│   ├── layout/             # Header, Footer, Nav, MegaMenu
│   ├── home/               # Hero, Categories, Testimonials, etc.
│   ├── shop/               # ProductCard, Filters, Cart
│   ├── packages/           # PackageCard, PackageTier
│   └── ui/                 # Buttons, Inputs, Modals, Accordion
├── lib/                    # Utils, mock data, types
├── public/                 # Static assets, placeholder images
├── styles/                 # Global styles, Tailwind config
└── tailwind.config.ts
```

---

## Quality Standards

- **No generic AI aesthetics** — this needs to look like a real, professionally designed motorsports website, not a template
- **Production-grade code** — clean, typed, well-organized components
- **Every page should be fully built out**, not just the homepage
- **Consistent design system** — reusable components, consistent spacing, colors, and typography throughout
- **The homepage should be a showstopper** — it needs to immediately communicate power, credibility, and professionalism
- **Test on mobile viewport** — the mobile experience should be just as impressive as desktop

---

## IMPORTANT: Phased Build Approach

**We are building this site in phases.** Do NOT try to build the entire site at once. Each phase should be fully completed, reviewed, and polished before moving to the next. This produces much higher quality results than rushing through everything in one pass.

Wait for my approval and "move to Phase X" instruction before starting each new phase.

---

### Phase 1 — Foundation & Layout Shell
**Goal:** Establish the project, design system, and global layout components.
- Project scaffolding (Next.js, Tailwind config, folder structure, TypeScript types)
- **Design system:** Define color palette, typography scale, spacing, component tokens in Tailwind config
- **Global layout:** Sticky header with logo, mega-menu navigation with subcategories and mobile hamburger menu
- **Announcement bar** (dismissible, rotates promo messages)
- **Footer** with full nav links, contact info, hours, social icons, payment icons
- **Reusable UI components:** Buttons, cards, section headings, containers, accordion, modal
- Make sure the nav links exist (even if pages are empty) so the site skeleton is navigable
- **Deliverable:** A fully styled, responsive header/footer/layout that looks production-ready on mobile and desktop. All future pages will slot into this shell.

---

### Phase 2 — Homepage (The Showstopper)
**Goal:** Build out every section of the homepage to a polished, impressive standard.
- **Hero section:** Full-width with dramatic placeholder imagery, bold headline, subtext, and CTA button. Subtle parallax or animation.
- **Shop by Category:** Grid of large image tiles linking to shop categories
- **Featured/Trending Products:** Horizontal scrollable product cards with hover effects
- **Vehicle Packages Showcase:** Tiered build packages (e.g., 500HP / 700HP / 1000HP) with pricing and key specs
- **Why Choose Us:** Stats/counters section (builds completed, years experience, etc.)
- **Testimonials Carousel:** Customer reviews with photos, names, and vehicle details
- **Social Proof / Instagram Feed:** Placeholder grid section
- **Newsletter Signup:** Email capture section
- Smooth scroll-triggered animations throughout (fade-in, slide-up reveals)
- **Deliverable:** A homepage that immediately communicates power, credibility, and professionalism. Should look like a real, professionally designed site — not a template.

---

### Phase 3 — E-Commerce / Shop Pages
**Goal:** Build the full shopping experience with mock data.
- **Mock product data:** Create 15-20 realistic products across multiple categories with names, descriptions, prices, images, specs, and vehicle fitment info
- **Shop landing page:** Category grid with filters (by vehicle make/model/year, part type, price range)
- **Product listing page:** Grid/list view toggle, sorting options, pagination
- **Product detail page:** Image gallery/lightbox, price, description, specs, fitment, "Add to Cart" / "Buy Now", related products, reviews section
- **Cart:** Slide-out cart drawer with quantity controls, subtotal, and checkout CTA
- **Checkout page:** Scaffold the UI (shipping info, payment placeholder, order summary) — doesn't need real payment processing
- **Deliverable:** A complete, navigable e-commerce flow from browsing → product → cart → checkout.

---

### Phase 4 — Vehicle Packages & Services
**Goal:** Build out the two core service-oriented sections.
- **Vehicle Packages page:**
  - 3-4 tiered engine build packages displayed as premium cards
  - Each package: name, HP target, what's included (parts list), price, CTA
  - Individual package detail pages with full breakdowns
  - Organized by HP tier or vehicle platform
- **Services page:**
  - Overview of all services (engine builds, installation, diagnostics, dyno tuning, custom fabrication, etc.)
  - Service detail sections or expandable cards
  - "Book an Appointment" CTA integrated throughout
  - Appointment booking form placeholder (name, vehicle info, service needed, preferred date)
- **Deliverable:** Both pages fully built, styled consistently with the rest of the site, and mobile-responsive.

---

### Phase 5 — Gallery & Social Proof Pages
**Goal:** Build the visual credibility and trust pages.
- **Gallery / Past Builds page:**
  - Filterable masonry or grid layout
  - 8-12 mock build entries with: vehicle info, work performed, before/after placeholder images, HP numbers
  - Lightbox for full-size image viewing
  - Filter by vehicle make or build type
- **Testimonials / Reviews page:**
  - Dedicated page with customer reviews (beyond just the homepage carousel)
  - Star ratings, customer photos, vehicle info
  - "Submit a Review" form
- **Deliverable:** Both pages fully built and visually impressive. The gallery especially should make people want to bring their car in.

---

### Phase 6 — Content & Info Pages
**Goal:** Build out the remaining content pages.
- **About Us:** Shop story, mission, team bios with placeholder photos, years of experience, certifications, Google Map embed placeholder
- **Blog / News:** Blog listing page with featured post, individual blog post template with rich content layout, categories/tags, social share buttons. Create 2-3 mock blog posts with realistic content.
- **FAQ:** Accordion-style, organized by category (Ordering, Shipping, Services, Returns, Warranties, etc.) with 15-20 realistic Q&As
- **Contact:** Contact form, phone/email/address, business hours, Google Map placeholder, social links
- **Deliverable:** All content pages complete, consistent with the design system, and mobile-responsive.

---

### Phase 7 — Polish, Performance & Final QA
**Goal:** Elevate everything from good to great.
- **Animations & transitions:** Audit all pages for smooth scroll reveals, hover states, page transitions, loading states
- **Responsive QA:** Test and fix every page at mobile (375px), tablet (768px), and desktop (1440px+) breakpoints
- **Performance optimization:** Lazy loading images, font optimization, code splitting, proper image sizing
- **SEO:** Meta tags, Open Graph tags, semantic HTML, structured data (JSON-LD for local business + products), sitemap
- **Accessibility:** ARIA labels, keyboard navigation, focus states, color contrast check
- **Cross-browser:** Ensure consistent rendering
- **Final consistency pass:** Make sure typography, spacing, colors, and component styles are 100% consistent across all pages
- **Deliverable:** A polished, production-ready website that could be handed to a client.

---

### How to communicate between phases:
- After completing each phase, give me a summary of what was built and flag any decisions you made or questions you have.
- I'll review, request any changes, and then tell you to proceed to the next phase.
- If a phase is large, feel free to break it into sub-steps, but don't move to the next phase without my go-ahead.
