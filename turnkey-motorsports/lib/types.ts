// ============================================================
// Turn-Key Motorsport — TypeScript Type Definitions
// ============================================================

// --- Enums & Union Types ---

export type ProductCategory =
  | 'engine-parts'
  | 'intake'
  | 'exhaust'
  | 'fuel-system'
  | 'cooling'
  | 'drivetrain'
  | 'forced-induction'
  | 'suspension'
  | 'apparel'
  | 'accessories';

export type BuildCategory =
  | 'street'
  | 'drag'
  | 'track'
  | 'daily-driver'
  | 'full-build';

export type BlogCategory =
  | 'build-spotlights'
  | 'tech-tips'
  | 'product-announcements'
  | 'shop-news'
  | 'how-to-guides';

export type FAQCategory =
  | 'custom-fabrication'
  | 'tuning-efi'
  | 'engine-builds'
  | 'parts-ordering'
  | 'shipping'
  | 'installation'
  | 'warranty'
  | 'payment';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

// --- Product ---

export interface VehicleFitment {
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  engine?: string;
}

export interface GarageVehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  engine: string;
  nickname: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
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
  isNew?: boolean;
  onSale?: boolean;
}

// --- Engine Package ---

export interface EnginePackage {
  id: string;
  name: string;
  slug: string;
  hpTarget: number;
  torqueTarget: number;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  partsIncluded: string[];
  specs: Record<string, string>;
  vehiclePlatforms: string[];
  featured: boolean;
  highlights: string[];
}

// --- Build (Gallery) ---

export interface Build {
  id: string;
  slug: string;
  title: string;
  vehicle: {
    year: number;
    make: string;
    model: string;
  };
  category: BuildCategory;
  modsPerformed: string[];
  hpBefore: number;
  hpAfter: number;
  torqueBefore: number;
  torqueAfter: number;
  images: string[];
  writeup: string;
  costRange?: string;
  status: 'published' | 'submitted';
  featured?: boolean;
}

// --- Service ---

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  icon: string;
  timelineRange: string;
  priceRange: string | null;
}

// --- Blog Post ---

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  authorImage?: string;
  publishedAt: string;
  readTime: string;
  relatedPostIds: string[];
  featured?: boolean;
}

// --- Testimonial ---

export interface Testimonial {
  id: string;
  customerName: string;
  vehicle: {
    year: number;
    make: string;
    model: string;
  };
  rating: number;
  text: string;
  image?: string;
  date: string;
  serviceType?: string;
}

// --- FAQ ---

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

// --- Booking Request ---

export interface BookingRequest {
  name: string;
  phone: string;
  email: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  servicesInterested: string[];
  description: string;
  preferredContact: 'call' | 'email';
}

// --- Appointment Scheduling ---

export type AppointmentStatus =
  | 'submitted'
  | 'pending'
  | 'confirmed'
  | 'rescheduled'
  | 'cancelled';

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AppointmentRequest {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'call' | 'email' | 'text';
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  servicesRequested: string[];
  projectDescription: string;
  appointmentDate: string;
  appointmentTime: string;
  referenceNumber: string;
  status: AppointmentStatus;
  submittedAt: string;
}

// --- User Account (scaffolded) ---

export interface SavedVehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  nickname?: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  trackingNumber?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  savedVehicles: SavedVehicle[];
  addresses: Address[];
  wishlistProductIds: string[];
  orderHistory: Order[];
}

// --- Cart ---

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

// --- Navigation ---

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
  hasMegaMenu?: boolean;
}

export interface MegaMenuColumn {
  title: string;
  items: NavSubItem[];
}

export interface FooterGroup {
  title: string;
  links: NavSubItem[];
}

// --- Announcement ---

export interface AnnouncementMessage {
  id: string;
  text: string;
  highlightText?: string;
  link?: string;
}

// --- Contact Info ---

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string[];
}

// --- Social Link ---

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// --- Chat ---

export type ChatMode = 'live' | 'ai' | 'handoff';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface LeadInfo {
  name: string;
  phone: string;
  email: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  serviceInterest: string;
}

export interface ChatSession {
  id: string;
  mode: ChatMode;
  messages: ChatMessage[];
  lead: Partial<LeadInfo>;
  startedAt: number;
  lastShopReplyAt: number | null;
  isOpen: boolean;
}

export interface AdminChatSession {
  id: string;
  messages: ChatMessage[];
  lead: Partial<LeadInfo>;
  mode: ChatMode;
  startedAt: number;
  lastCustomerMessageAt: number;
  lastShopReplyAt: number | null;
  isActive: boolean;
  aiTakenOver: boolean;
}
