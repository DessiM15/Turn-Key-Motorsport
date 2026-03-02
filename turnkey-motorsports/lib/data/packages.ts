import type { EnginePackage } from '@/lib/types';

// ============================================================
// Turnkey Motorsports — Engine Package Data
// 4 HP-tier packages
// ============================================================

const PACKAGES: EnginePackage[] = [
  {
    id: 'pkg-500',
    name: 'Street Performer',
    slug: '500hp',
    hpTarget: 500,
    torqueTarget: 470,
    description:
      'The perfect bolt-on package for daily drivers who want real power without sacrificing reliability. This package includes a carefully selected combination of intake, exhaust, cam, and tuning modifications that work together to extract maximum power from your factory engine. Every part is dyno-tested and proven on our in-house builds. The result is a streetable, reliable 500HP package that idles smooth, sounds aggressive, and pulls hard from 2,000 RPM to redline. Includes professional installation and a custom dyno tune tailored to your specific vehicle.',
    shortDescription:
      'The perfect bolt-on package for daily drivers who want real power without sacrificing reliability.',
    price: 4999,
    images: ['gradient-red-dark', 'gradient-red-mid', 'gradient-red-light'],
    partsIncluded: [
      'High-Flow Cold Air Intake System',
      'Performance Camshaft Package (cam, springs, pushrods, retainers)',
      'Long Tube Headers with Gaskets & Hardware',
      'Cat-Back Exhaust System (stainless steel)',
      'High-Flow Fuel Injectors',
      'Custom Dyno Tune (3 pulls minimum)',
      'All Gaskets, Seals & Hardware',
      'Professional Installation Labor',
    ],
    specs: {
      'Target Horsepower': '480–520 RWHP',
      'Target Torque': '450–490 lb-ft',
      'Power Band': '2,000 – 6,500 RPM',
      'Reliability': 'Factory-level — daily driveable',
      'Fuel Requirement': '91+ Octane (93 recommended)',
      'Installation Time': '2–3 business days',
      'Warranty': '12-month / 12,000-mile powertrain warranty',
      'Dyno Tune Included': 'Yes — custom calibration with dyno sheets',
    },
    vehiclePlatforms: [
      '2010–2015 Chevrolet Camaro SS (LS3/L99)',
      '2015–2023 Ford Mustang GT (Coyote 5.0)',
      '2009–2023 Dodge Challenger R/T (5.7L HEMI)',
      '2009–2023 Dodge Charger R/T (5.7L HEMI)',
      'Other V8 platforms — contact us',
    ],
    featured: false,
    highlights: [
      'Daily driveable — smooth idle, factory reliability',
      'Bolt-on — no internal engine modifications',
      'Full dyno tune with printed sheets',
      '12-month warranty included',
    ],
  },
  {
    id: 'pkg-700',
    name: 'Track Weapon',
    slug: '700hp',
    hpTarget: 700,
    torqueTarget: 650,
    description:
      'Serious power for the track or the strip. The Track Weapon package goes beyond bolt-ons with forged internals, CNC-ported heads, and a complete fuel system upgrade. This is our most popular package for customers who want a car that dominates at the track while still being street-legal. Every build gets a full teardown, precision assembly with ARP hardware throughout, and extensive dyno tuning. The result is a reliable 700HP powerplant backed by our confidence and warranty.',
    shortDescription:
      'Serious power for the track or the strip. Forged internals, ported heads, and a tune that means business.',
    price: 12999,
    images: ['gradient-orange-dark', 'gradient-orange-mid', 'gradient-orange-light'],
    partsIncluded: [
      'Forged Rotating Assembly (crank, rods, pistons, bearings)',
      'CNC Ported & Polished Cylinder Heads',
      'Performance Camshaft Package (aggressive profile)',
      'Long Tube Headers (1-7/8" primaries)',
      'Full 3" Exhaust System',
      'High-Flow Fuel Injectors (1000cc)',
      'Fuel Pump Upgrade (340LPH)',
      'Upgraded Valve Springs & Titanium Retainers',
      'ARP Head Studs & Main Studs',
      'Complete Gasket Kit (MLS head gaskets)',
      'Custom Dyno Tune (5 pulls minimum)',
      'All Assembly Hardware & Fluids',
      'Professional Assembly & Installation Labor',
    ],
    specs: {
      'Target Horsepower': '680–720 RWHP',
      'Target Torque': '630–670 lb-ft',
      'Power Band': '3,000 – 7,000 RPM',
      'Compression Ratio': '10.5:1 (NA) or 9.0:1 (boost-ready)',
      'Fuel Requirement': '93 Octane or E85',
      'Installation Time': '5–7 business days',
      'Warranty': '12-month / 12,000-mile powertrain warranty',
      'Dyno Tune Included': 'Yes — full custom calibration with data logging',
    },
    vehiclePlatforms: [
      '2010–2015 Chevrolet Camaro SS (LS3/L99)',
      '2016–2023 Chevrolet Camaro SS (LT1)',
      '2015–2023 Ford Mustang GT (Coyote 5.0)',
      '2015–2023 Dodge Challenger / Charger Scat Pack (6.4L HEMI)',
      'C5/C6 Chevrolet Corvette (LS1/LS2/LS3)',
      'Other V8 platforms — contact us',
    ],
    featured: true,
    highlights: [
      'Forged bottom end — built for abuse',
      'CNC ported heads — maximum airflow',
      'Complete fuel system upgrade',
      'Track-proven reliability at 700+ HP',
    ],
  },
  {
    id: 'pkg-1000',
    name: 'Flagship Build',
    slug: '1000hp',
    hpTarget: 1000,
    torqueTarget: 900,
    description:
      'The ultimate build. Four-digit horsepower, zero compromises. The Flagship Build is a complete engine overhaul with forged internals, fully ported heads, and forced induction — supercharger or turbo system, your choice. Every component is hand-selected and assembled by our senior engine builder. This package includes complete drivetrain upgrades to handle the power, extensive data-logged dyno sessions, and our premium warranty. This is the build that makes jaws drop and records fall.',
    shortDescription:
      'The ultimate build. Fully forged, forced induction, and race-ready. Four-digit horsepower, zero compromises.',
    price: 29999,
    images: ['gradient-violet-dark', 'gradient-violet-mid', 'gradient-violet-light'],
    partsIncluded: [
      'Complete Forged Short Block Assembly',
      'CNC Ported & Polished Cylinder Heads (race-spec)',
      'Aggressive Performance Camshaft',
      'Supercharger OR Turbo Kit (customer choice)',
      'Air-to-Water Intercooler System',
      'Complete Fuel System (injectors, pumps, lines, rails)',
      'Long Tube Headers + Full Exhaust',
      'ARP Hardware Throughout (head studs, main studs, rod bolts)',
      'Upgraded Oil Pump & Pickup',
      'Drivetrain Package (clutch or torque converter, driveshaft)',
      'Custom Dyno Tune (10+ pulls, full data logging)',
      'All Gaskets, Seals, Fluids & Assembly Hardware',
      'Professional Assembly & Installation Labor',
      'Break-In Service & Post-Break-In Retune',
    ],
    specs: {
      'Target Horsepower': '1,000–1,200+ RWHP',
      'Target Torque': '850–950+ lb-ft',
      'Power Band': '3,500 – 7,500 RPM',
      'Boost': '12–18 PSI (application dependent)',
      'Fuel Requirement': 'E85 or Race Gas (93 octane street tune available)',
      'Installation Time': '10–15 business days',
      'Warranty': '6-month / 6,000-mile powertrain warranty',
      'Dyno Tune Included': 'Yes — full calibration with data logging, street & race tunes',
    },
    vehiclePlatforms: [
      '2010–2015 Chevrolet Camaro SS (LS3/L99)',
      '2016–2023 Chevrolet Camaro SS/ZL1 (LT1/LT4)',
      '2015–2023 Dodge Challenger / Charger Hellcat (6.2L SC HEMI)',
      '2015–2023 Ford Mustang GT / GT350 (Coyote / Voodoo)',
      'C5/C6/C7 Chevrolet Corvette',
      'Custom applications — contact us',
    ],
    featured: false,
    highlights: [
      'Forced induction — supercharger or turbo, your call',
      'Complete drivetrain upgrades included',
      'Built by our senior engine builder',
      '10+ dyno pulls with full data logging',
    ],
  },
  {
    id: 'pkg-custom',
    name: 'Custom Build',
    slug: 'custom',
    hpTarget: 0,
    torqueTarget: 0,
    description:
      'Have something specific in mind? We build to your exact specifications. Whether it is a unique platform, a specific power target, a budget-conscious build, or a no-holds-barred race engine — we will work with you to design and execute the perfect package. Every custom build starts with a free consultation where we discuss your goals, budget, and timeline. From there, we provide a detailed quote with parts list, labor estimate, and projected power numbers.',
    shortDescription:
      'Have something specific in mind? We build to your exact specifications. Free consultation to start.',
    price: 0,
    images: ['gradient-neutral-dark', 'gradient-neutral-mid', 'gradient-neutral-light'],
    partsIncluded: [
      'Free Initial Consultation',
      'Custom Parts Selection Based on Your Goals',
      'Detailed Written Quote with Power Projections',
      'Professional Assembly & Installation',
      'Custom Dyno Tune',
      'Warranty (varies by build)',
    ],
    specs: {
      'Target Horsepower': 'Your call — we build to your number',
      'Platforms': 'All makes and models',
      'Fuel Options': 'Pump gas, E85, race gas, flex-fuel',
      'Timeline': 'Varies — quoted per build',
      'Consultation': 'Free — book online or call',
    },
    vehiclePlatforms: [
      'All domestic V8 platforms (GM, Ford, Dodge/Mopar)',
      'Import performance (BMW, Nissan, Toyota, Subaru)',
      'Trucks & SUVs',
      'Classic & pro-touring builds',
      'Race-only & drag builds',
    ],
    featured: false,
    highlights: [
      'Free consultation — no commitment',
      'Built to your exact specs and budget',
      'All makes and models welcome',
      'Written quote before any work begins',
    ],
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getAllPackages(): EnginePackage[] {
  return PACKAGES;
}

export function getPackageBySlug(slug: string): EnginePackage | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function getFeaturedPackage(): EnginePackage | undefined {
  return PACKAGES.find((p) => p.featured);
}

export function getOtherPackages(currentSlug: string): EnginePackage[] {
  return PACKAGES.filter((p) => p.slug !== currentSlug && p.slug !== 'custom');
}
