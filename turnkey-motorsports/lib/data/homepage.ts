// Homepage-specific mock data
// Full product catalog created in Feature 3

export interface HomepageCategory {
  id: string;
  name: string;
  description: string;
  href: string;
  gradient: string;
}

export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  badge?: string;
  href: string;
}

export interface PackageShowcase {
  id: string;
  name: string;
  hpTarget: number;
  price: number;
  shortDescription: string;
  specs: string[];
  href: string;
  featured?: boolean;
}

export interface HomepageStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface HomepageTestimonial {
  id: string;
  customerName: string;
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  rating: number;
  text: string;
}

// --- Shop by Category ---

export const HOMEPAGE_CATEGORIES: HomepageCategory[] = [
  {
    id: 'engine-parts',
    name: 'Engine Parts',
    description: 'Cams, heads, rotating assemblies for LS, Coyote, and HEMI',
    href: '/shop?category=engine-parts',
    gradient: 'from-red-950/80 to-neutral-950',
  },
  {
    id: 'intake-exhaust',
    name: 'Intake & Exhaust',
    description: 'Cold air intakes, long tube headers, and cat-back systems',
    href: '/shop?category=intake',
    gradient: 'from-orange-950/80 to-neutral-950',
  },
  {
    id: 'fuel-system',
    name: 'Fuel Systems',
    description: 'Injectors, fuel pumps, and E85 kits for boosted builds',
    href: '/shop?category=fuel-system',
    gradient: 'from-amber-950/80 to-neutral-950',
  },
  {
    id: 'forced-induction',
    name: 'Forced Induction',
    description: 'Supercharger kits, turbo kits, and boost components',
    href: '/shop?category=forced-induction',
    gradient: 'from-rose-950/80 to-neutral-950',
  },
  {
    id: 'drivetrain',
    name: 'Drivetrain',
    description: 'Clutch kits, driveshafts, differentials, and axles',
    href: '/shop?category=drivetrain',
    gradient: 'from-zinc-800/80 to-neutral-950',
  },
  {
    id: 'apparel',
    name: 'Apparel & Merch',
    description: 'Hats, shirts, hoodies — rep the brand',
    href: '/shop?category=apparel',
    gradient: 'from-neutral-800/80 to-neutral-950',
  },
];

// --- Featured Products ---

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 'fp-1',
    name: 'Stage 2 Cam Package — LS3/L99',
    price: 2499,
    compareAtPrice: 2899,
    category: 'Engine Parts',
    badge: 'SALE',
    href: '/shop/stage-2-cam-package-ls3',
  },
  {
    id: 'fp-2',
    name: 'Cold Air Intake Kit — 5.7L HEMI',
    price: 389,
    category: 'Intake',
    badge: 'NEW',
    href: '/shop/cold-air-intake-57-hemi',
  },
  {
    id: 'fp-3',
    name: 'Long Tube Headers — Coyote 5.0',
    price: 1149,
    category: 'Exhaust',
    href: '/shop/long-tube-headers-coyote',
  },
  {
    id: 'fp-4',
    name: '1000cc Fuel Injectors — Set of 8',
    price: 649,
    compareAtPrice: 749,
    category: 'Fuel System',
    badge: 'POPULAR',
    href: '/shop/1000cc-fuel-injectors-set-8',
  },
];

// --- Engine Package Showcase ---

export const PACKAGE_SHOWCASE: PackageShowcase[] = [
  {
    id: 'pkg-500',
    name: 'Street Performer',
    hpTarget: 500,
    price: 4999,
    shortDescription: 'The perfect bolt-on package for daily drivers who want real power without sacrificing reliability.',
    specs: [
      'Cold Air Intake System',
      'Performance Cam Package',
      'Cat-Back Exhaust',
      'Custom Dyno Tune',
    ],
    href: '/packages/500hp',
  },
  {
    id: 'pkg-700',
    name: 'Track Weapon',
    hpTarget: 700,
    price: 12999,
    shortDescription: 'Serious power for the track or the strip. Forged internals, ported heads, and a tune that means business.',
    specs: [
      'Forged Rotating Assembly',
      'CNC Ported Heads',
      'Performance Camshaft',
      'Headers + Full Exhaust',
      'Fuel System Upgrade',
      'Custom Dyno Tune',
    ],
    href: '/packages/700hp',
    featured: true,
  },
  {
    id: 'pkg-1000',
    name: 'Flagship Build',
    hpTarget: 1000,
    price: 29999,
    shortDescription: 'The ultimate build. Fully forged, forced induction, and race-ready. Four-digit horsepower, zero compromises.',
    specs: [
      'Forged Short Block Build',
      'CNC Ported & Polished Heads',
      'Supercharger or Turbo Kit',
      'Complete Fuel System',
      'Drivetrain Upgrades',
      'Custom Dyno Tune + Data',
    ],
    href: '/packages/1000hp',
  },
];

// --- Stats ---

export const HOMEPAGE_STATS: HomepageStat[] = [
  { id: 'stat-builds', value: 500, suffix: '+', label: 'Builds Completed' },
  { id: 'stat-years', value: 15, suffix: '+', label: 'Years Experience' },
  { id: 'stat-hp', value: 750000, suffix: '+', label: 'Horsepower Delivered' },
  { id: 'stat-customers', value: 1200, suffix: '+', label: 'Happy Customers' },
];

// --- Testimonials ---

export const HOMEPAGE_TESTIMONIALS: HomepageTestimonial[] = [
  {
    id: 'test-1',
    customerName: 'Marcus D.',
    vehicleYear: 2019,
    vehicleMake: 'Dodge',
    vehicleModel: 'Challenger Hellcat',
    rating: 5,
    text: 'Turn-Key took my Hellcat from 717 to 950 wheel. The build quality is insane — every bolt torqued, every line routed clean. These guys don\'t cut corners.',
  },
  {
    id: 'test-2',
    customerName: 'Jake R.',
    vehicleYear: 2021,
    vehicleMake: 'Chevrolet',
    vehicleModel: 'Camaro ZL1',
    rating: 5,
    text: 'Got the 700HP package for my ZL1. Dropped it off on Monday, picked it up Friday with dyno sheets in hand. Professional from start to finish.',
  },
  {
    id: 'test-3',
    customerName: 'Tony M.',
    vehicleYear: 2018,
    vehicleMake: 'Ford',
    vehicleModel: 'Mustang GT',
    rating: 5,
    text: 'Best cam install I\'ve ever seen. They tuned it perfectly — idles smooth, pulls hard, and sounds absolutely wicked. Worth every dollar.',
  },
  {
    id: 'test-4',
    customerName: 'Sarah K.',
    vehicleYear: 2022,
    vehicleMake: 'Dodge',
    vehicleModel: 'Charger Scat Pack',
    rating: 5,
    text: 'I was nervous trusting my car to a new shop, but Turn-Key blew me away. They kept me updated through the whole build and the results speak for themselves.',
  },
  {
    id: 'test-5',
    customerName: 'Chris L.',
    vehicleYear: 2015,
    vehicleMake: 'Chevrolet',
    vehicleModel: 'Camaro SS',
    rating: 5,
    text: 'Had them fab a full roll cage and chassis work before going turbo. Every weld is a work of art — the NHRA tech inspector said it was one of the cleanest cages he has ever seen. These guys are real fabricators.',
  },
  {
    id: 'test-6',
    customerName: 'Devon P.',
    vehicleYear: 2020,
    vehicleMake: 'Ford',
    vehicleModel: 'Mustang GT',
    rating: 5,
    text: 'Supercharged my Coyote and they tuned it on E85. 750 to the wheels and it still drives like a factory car. The blower whine is addicting. Best shop in Texas, hands down.',
  },
];
