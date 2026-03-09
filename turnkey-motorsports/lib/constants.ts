import type {
  NavItem,
  FooterGroup,
  AnnouncementMessage,
  ContactInfo,
  SocialLink,
  MegaMenuColumn,
} from './types';

// --- Site Info ---

export const SITE_NAME = 'Turn-Key Motorsport';
export const SITE_DESCRIPTION =
  'Custom fabrication, EFI calibrations, and full engine builds for American muscle — LS, Coyote, and HEMI platforms. Turn-Key Motorsport delivers power you can trust.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://turn-key-motorsport.vercel.app';

// --- Contact Info ---

export const CONTACT_INFO: ContactInfo = {
  address: process.env.NEXT_PUBLIC_SHOP_ADDRESS ?? '18011 Cypress Rosehill Rd, Cypress, TX 77429',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '(555) 123-4567',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@turnkeymotorsport.com',
  hours: [
    'Mon – Fri: 9:00 AM – 6:00 PM',
    'Sat – Sun: Closed',
  ],
};

// --- Announcement Bar Messages ---

export const ANNOUNCEMENT_MESSAGES: AnnouncementMessage[] = [
  {
    id: 'shipping',
    text: 'Free shipping on orders over $299 —',
    highlightText: 'Shop Now',
    link: '/shop',
  },
  {
    id: 'financing',
    text: 'Financing available through Affirm —',
    highlightText: 'Learn More',
    link: '/faq',
  },
  {
    id: 'phone',
    text: 'Questions? Call us at',
    highlightText: '(555) 123-4567',
    link: 'tel:+15551234567',
  },
];

// --- Main Navigation ---

export const MAIN_NAV: NavItem[] = [
  {
    label: 'Shop',
    href: '/shop',
    hasMegaMenu: true,
  },
  {
    label: 'Packages',
    href: '/packages',
    children: [
      { label: '500HP Package', href: '/packages/500hp' },
      { label: '700HP Package', href: '/packages/700hp' },
      { label: '1000HP+ Package', href: '/packages/1000hp' },
      { label: 'View All Packages', href: '/packages' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Engine Builds', href: '/services#engine-builds' },
      { label: 'Dyno Tuning', href: '/services#dyno-tuning' },
      { label: 'Installation', href: '/services#installation' },
      { label: 'Book a Consultation', href: '/services#booking' },
    ],
  },
  {
    label: 'Gallery',
    href: '/gallery',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
];

// --- Mega Menu Columns (for Shop) ---

export const MEGA_MENU_CATEGORIES: MegaMenuColumn = {
  title: 'Shop by Category',
  items: [
    { label: 'Engine Parts', href: '/shop?category=engine-parts' },
    { label: 'Intake Systems', href: '/shop?category=intake' },
    { label: 'Exhaust Systems', href: '/shop?category=exhaust' },
    { label: 'Fuel Systems', href: '/shop?category=fuel-system' },
    { label: 'Cooling', href: '/shop?category=cooling' },
    { label: 'Drivetrain', href: '/shop?category=drivetrain' },
    { label: 'Forced Induction', href: '/shop?category=forced-induction' },
    { label: 'Apparel & Merch', href: '/shop?category=apparel' },
  ],
};

export const MEGA_MENU_VEHICLES: MegaMenuColumn = {
  title: 'Shop by Platform',
  items: [
    { label: 'GM / LS / LT', href: '/shop?make=gm' },
    { label: 'Ford / Coyote / Modular', href: '/shop?make=ford' },
    { label: 'Dodge / HEMI / Mopar', href: '/shop?make=dodge' },
    { label: 'All Makes & Models', href: '/shop' },
  ],
};

// --- Footer Navigation ---

export const FOOTER_NAV: FooterGroup[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: 'All Parts', href: '/shop' },
      { label: 'Engine Packages', href: '/packages' },
      { label: 'Apparel & Merch', href: '/shop?category=apparel' },
      { label: 'New Arrivals', href: '/shop?sort=newest' },
      { label: 'Sale', href: '/shop?sale=true' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Delivery', href: '/faq#shipping' },
      { label: 'Returns & Warranty', href: '/faq#warranty' },
      { label: 'Financing', href: '/faq#payment' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

// --- Social Media ---

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Instagram', url: 'https://instagram.com/turnkeymotorsport', icon: 'instagram' },
  { platform: 'Facebook', url: 'https://m.facebook.com/61572503307370/', icon: 'facebook' },
  { platform: 'YouTube', url: 'https://youtube.com/@turnkeymotorsport', icon: 'youtube' },
  { platform: 'TikTok', url: 'https://tiktok.com/@turnkeymotorsport', icon: 'tiktok' },
];

// --- Shop Categories (for filters) ---

export const SHOP_CATEGORIES = [
  { value: 'engine-parts', label: 'Engine Parts' },
  { value: 'intake', label: 'Intake Systems' },
  { value: 'exhaust', label: 'Exhaust Systems' },
  { value: 'fuel-system', label: 'Fuel Systems' },
  { value: 'cooling', label: 'Cooling' },
  { value: 'drivetrain', label: 'Drivetrain' },
  { value: 'forced-induction', label: 'Forced Induction' },
  { value: 'suspension', label: 'Suspension' },
  { value: 'apparel', label: 'Apparel & Merch' },
  { value: 'accessories', label: 'Accessories' },
] as const;

// --- Vehicle Makes (for filters) ---

export const VEHICLE_MAKES = [
  'Dodge', 'Chrysler', 'Jeep', 'Ram',
  'Ford', 'Lincoln', 'Chevrolet', 'GMC',
  'Cadillac', 'Pontiac', 'Buick',
] as const;

// --- Service Names ---

export const SERVICE_NAMES = [
  'Custom Fabrication',
  'Custom EFI Calibrations & Tuning',
  'Full Engine Builds',
  'Engine Installation',
  'Performance Parts Installation',
  'Diagnostics & Troubleshooting',
  'Supercharger / Turbo Kit Installation',
  'Suspension & Drivetrain Upgrades',
  'Pre-Purchase Inspections',
  'Maintenance for Modified Vehicles',
] as const;

// --- Build Categories ---

export const BUILD_CATEGORIES = [
  { value: 'street', label: 'Street' },
  { value: 'drag', label: 'Drag' },
  { value: 'track', label: 'Track' },
  { value: 'daily-driver', label: 'Daily Driver' },
  { value: 'full-build', label: 'Full Build' },
] as const;

// --- Payment Methods ---

export const PAYMENT_METHODS = [
  'Visa',
  'Mastercard',
  'American Express',
  'Discover',
  'PayPal',
] as const;
