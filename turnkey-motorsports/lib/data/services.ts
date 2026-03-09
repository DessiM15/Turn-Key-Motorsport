import type { Service } from '@/lib/types';

// ============================================================
// Turn-Key Motorsport — Services Data
// 10 services matching SERVICE_NAMES in constants.ts
// ============================================================

const SERVICES: Service[] = [
  {
    id: 'svc-001',
    name: 'Full Engine Builds',
    slug: 'full-engine-builds',
    description:
      'Complete engine builds from the crank up. We tear down, inspect, machine, and reassemble with the parts and specs you choose — from mild street builds to full race engines. Every build is blueprinted, balanced, and assembled with torque specs documented throughout.',
    shortDescription: 'Complete engine builds from mild street to full race — blueprinted and balanced.',
    image: 'gradient-red-dark',
    icon: 'Wrench',
    timelineRange: '2–4 weeks',
    priceRange: '$4,999 – $30,000+',
  },
  {
    id: 'svc-002',
    name: 'Engine Installation',
    slug: 'engine-installation',
    description:
      'Professional engine installation for new builds, crate engines, and engine swaps. We handle all wiring, plumbing, and fitment. LS swaps, Coyote swaps, and HEMI swaps are our specialty. Includes startup, break-in procedure, and post-install inspection.',
    shortDescription: 'Professional installation for new builds, crate engines, and engine swaps.',
    image: 'gradient-orange-dark',
    icon: 'Cog',
    timelineRange: '3–5 days',
    priceRange: '$1,500 – $5,000+',
  },
  {
    id: 'svc-003',
    name: 'Performance Parts Installation',
    slug: 'performance-parts-installation',
    description:
      'Expert installation of aftermarket performance parts — intakes, exhausts, cams, superchargers, turbo kits, fuel systems, and more. We install parts purchased from us or brought in by the customer. Every install includes a post-install inspection and road test.',
    shortDescription: 'Expert installation of intakes, exhausts, cams, superchargers, turbos, and more.',
    image: 'gradient-amber-dark',
    icon: 'Package',
    timelineRange: '1–3 days',
    priceRange: '$200 – $3,000+',
  },
  {
    id: 'svc-004',
    name: 'Dyno Tuning',
    slug: 'dyno-tuning',
    description:
      'In-house chassis dyno tuning for naturally aspirated and forced induction applications. We tune for pump gas, E85, race gas, and flex-fuel. Every tune includes before/after dyno pulls with printed data sheets. Remote tuning available for supported platforms.',
    shortDescription: 'Chassis dyno tuning for NA and FI applications — pump gas, E85, and flex-fuel.',
    image: 'gradient-rose-dark',
    icon: 'Gauge',
    timelineRange: '4–8 hours',
    priceRange: '$500 – $1,500',
  },
  {
    id: 'svc-005',
    name: 'Diagnostics & Troubleshooting',
    slug: 'diagnostics-troubleshooting',
    description:
      'Advanced diagnostics for modified vehicles. We use factory-level scan tools, wideband data logging, and years of experience to track down issues that other shops cannot. Misfires, boost leaks, fueling problems, wiring gremlins — we have seen it all.',
    shortDescription: 'Advanced diagnostics for modified vehicles — misfires, boost leaks, wiring issues.',
    image: 'gradient-sky-dark',
    icon: 'Search',
    timelineRange: '2–4 hours',
    priceRange: '$150 – $500',
  },
  {
    id: 'svc-006',
    name: 'Custom Fabrication',
    slug: 'custom-fabrication',
    description:
      'In-house TIG welding and fabrication for custom intercooler piping, turbo manifolds, exhaust systems, brackets, and one-off parts. Stainless steel, mild steel, and aluminum. We fabricate what the catalogs do not sell.',
    shortDescription: 'TIG welding and custom fabrication — intercooler piping, manifolds, exhaust, brackets.',
    image: 'gradient-violet-dark',
    icon: 'Flame',
    timelineRange: '1–5 days',
    priceRange: null,
  },
  {
    id: 'svc-007',
    name: 'Supercharger / Turbo Kit Installation',
    slug: 'supercharger-turbo-installation',
    description:
      'Full forced induction installation including supercharger kits, turbo kits, and custom turbo builds. We handle all plumbing, intercooler routing, fuel system upgrades, oil feed/drain lines, and tuning. Warranty-backed installations with dyno verification.',
    shortDescription: 'Complete forced induction installations — superchargers, turbos, and custom builds.',
    image: 'gradient-purple-dark',
    icon: 'Zap',
    timelineRange: '3–7 days',
    priceRange: '$2,000 – $8,000+',
  },
  {
    id: 'svc-008',
    name: 'Suspension & Drivetrain Upgrades',
    slug: 'suspension-drivetrain-upgrades',
    description:
      'Lowering springs, coilovers, sway bars, control arms, clutch kits, driveshafts, differentials, and axle upgrades. We set up your suspension to match your build — whether it is a daily, track car, or drag setup. Alignment included with all suspension work.',
    shortDescription: 'Coilovers, clutches, driveshafts, diffs — set up for your build style.',
    image: 'gradient-teal-dark',
    icon: 'ArrowDownUp',
    timelineRange: '1–3 days',
    priceRange: '$500 – $4,000+',
  },
  {
    id: 'svc-009',
    name: 'Pre-Purchase Inspections',
    slug: 'pre-purchase-inspections',
    description:
      'Thinking about buying a modified vehicle? We inspect it before you buy. We check compression, leak-down, boost integrity, fluid condition, electrical systems, and overall build quality. Written report provided with our honest assessment and estimated repair costs if applicable.',
    shortDescription: 'Modified vehicle inspections — compression test, leak-down, and full build assessment.',
    image: 'gradient-emerald-dark',
    icon: 'ClipboardCheck',
    timelineRange: '2–4 hours',
    priceRange: '$200 – $400',
  },
  {
    id: 'svc-010',
    name: 'Maintenance for Modified Vehicles',
    slug: 'modified-vehicle-maintenance',
    description:
      'Oil changes, fluid flushes, belt replacements, and scheduled maintenance for modified vehicles. We understand that modified cars need different service intervals and fluids than stock vehicles. We use the correct oils, coolants, and filters for your specific build.',
    shortDescription: 'Oil changes, fluid flushes, and scheduled maintenance for modified builds.',
    image: 'gradient-slate-dark',
    icon: 'Settings',
    timelineRange: '1–4 hours',
    priceRange: '$75 – $300',
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getAllServices(): Service[] {
  return SERVICES;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
