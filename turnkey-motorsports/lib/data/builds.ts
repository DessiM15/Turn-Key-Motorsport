import type { Build, BuildCategory } from '@/lib/types';

// ============================================================
// Turn-Key Motorsport — Builds Gallery Data
// 10 mock builds
// ============================================================

const BUILDS: Build[] = [
  {
    id: 'build-001',
    slug: 'marcus-hellcat-950whp',
    title: 'Marcus\'s 950WHP Hellcat',
    vehicle: { year: 2019, make: 'Dodge', model: 'Challenger Hellcat' },
    category: 'street',
    modsPerformed: [
      '2.85" supercharger pulley upgrade',
      '1000cc fuel injectors',
      'Dual fuel pump kit (340LPH)',
      'Catted mid-pipes',
      'Full exhaust with active valve delete',
      'Custom E85 flex-fuel tune',
      'ZL1 intercooler brick upgrade',
    ],
    hpBefore: 717,
    hpAfter: 950,
    torqueBefore: 656,
    torqueAfter: 880,
    images: ['gradient-red-dark', 'gradient-red-mid', 'gradient-red-light', 'gradient-red-accent'],
    writeup:
      'Marcus brought his 2019 Hellcat in wanting more power without sacrificing the factory supercharger. We went with a smaller pulley, supporting fuel mods, and a full E85 tune. The result is 950 WHP on E85 with the factory blower — a true street monster that still drives to work every day. The idle chop is aggressive but perfectly smooth, and the power delivery is violent from 3,000 RPM on.',
    costRange: '$8,000 – $10,000',
    status: 'published',
    featured: true,
  },
  {
    id: 'build-002',
    slug: 'jake-zl1-700whp',
    title: 'Jake\'s 700WHP ZL1 Track Build',
    vehicle: { year: 2021, make: 'Chevrolet', model: 'Camaro ZL1' },
    category: 'track',
    modsPerformed: [
      'CNC ported LT4 supercharger',
      'Forged connecting rods (H-beam)',
      'Upgraded fuel injectors (1300cc)',
      '3-piece race pulley kit',
      'Long tube headers + full exhaust',
      'Carbon fiber driveshaft',
      'Custom road course tune with traction control calibration',
    ],
    hpBefore: 650,
    hpAfter: 700,
    torqueBefore: 640,
    torqueAfter: 690,
    images: ['gradient-orange-dark', 'gradient-orange-mid', 'gradient-orange-light'],
    writeup:
      'Jake\'s ZL1 was already fast from the factory, but he wanted to squeeze every last bit of power while keeping it reliable for track days. We went with a ported blower, forged rods for peace of mind at high boost, and a custom road course tune. The result is 700 WHP that he runs all day at the track without looking at the temp gauge twice.',
    costRange: '$12,000 – $15,000',
    status: 'published',
  },
  {
    id: 'build-003',
    slug: 'tony-mustang-gt-cammed',
    title: 'Tony\'s Cammed Mustang GT',
    vehicle: { year: 2018, make: 'Ford', model: 'Mustang GT' },
    category: 'street',
    modsPerformed: [
      'Performance camshaft package (custom grind)',
      'Ported intake manifold',
      'Long tube headers (1-7/8")',
      'Cat-back exhaust system',
      'Cold air intake',
      'Custom dyno tune (93 octane)',
    ],
    hpBefore: 420,
    hpAfter: 520,
    torqueBefore: 390,
    torqueAfter: 445,
    images: ['gradient-sky-dark', 'gradient-sky-mid', 'gradient-sky-light'],
    writeup:
      'Tony wanted the classic cam sound and bolt-on power without opening the bottom end. We went with a custom cam grind designed for the Coyote with ported manifold and full exhaust. The Coyote sounds incredible with the cam lope and makes 520 WHP on pump gas — all without touching the internals. Perfect streetable daily with attitude.',
    costRange: '$5,000 – $7,000',
    status: 'published',
    featured: true,
  },
  {
    id: 'build-004',
    slug: 'chris-camaro-roll-cage-fabrication',
    title: 'Chris\'s Camaro — Full Cage & Chassis Fab',
    vehicle: { year: 2015, make: 'Chevrolet', model: 'Camaro SS' },
    category: 'full-build',
    modsPerformed: [
      'NHRA-certified 8.50 roll cage (chromoly)',
      'Custom subframe connectors',
      'Tubular K-member',
      'Custom 4-link rear suspension',
      'Chassis stiffening and seam welding',
      'Custom driveshaft loop and tunnel clearance',
      'Parachute mount and line-lock plumbing',
    ],
    hpBefore: 426,
    hpAfter: 426,
    torqueBefore: 420,
    torqueAfter: 420,
    images: ['gradient-emerald-dark', 'gradient-emerald-mid', 'gradient-emerald-light'],
    writeup:
      'Chris brought his Camaro SS in for a full chassis build before going forced induction. We fabricated and installed a chromoly 8.50 roll cage, tubular K-member, custom 4-link, and full subframe connectors with seam welding throughout. The car is NHRA certified and ready for the power. This is the kind of fabrication work we live for — every weld TIG\'d, every tube notched and fitted by hand in-house.',
    costRange: '$12,000 – $18,000',
    status: 'published',
  },
  {
    id: 'build-005',
    slug: 'devon-mustang-gt-supercharged',
    title: 'Devon\'s Supercharged Mustang GT',
    vehicle: { year: 2020, make: 'Ford', model: 'Mustang GT' },
    category: 'street',
    modsPerformed: [
      'Positive displacement supercharger kit (TVS)',
      'Forged connecting rods',
      'Upgraded fuel injectors (1000cc)',
      'Dual fuel pump kit',
      'Long tube headers (1-7/8")',
      'Cat-back exhaust system',
      'Custom E85 flex-fuel tune',
    ],
    hpBefore: 460,
    hpAfter: 750,
    torqueBefore: 420,
    torqueAfter: 630,
    images: ['gradient-amber-dark', 'gradient-amber-mid', 'gradient-amber-light'],
    writeup:
      'Devon wanted big power from his Gen 3 Coyote without going turbo. We went with a TVS supercharger, forged rods for insurance, and a full fuel system with E85. The result is 750 WHP on flex fuel — the Coyote screams to 7,500 RPM with the blower whine layered on top. Still daily driven to work and back with the A/C blowing cold.',
    costRange: '$12,000 – $16,000',
    status: 'published',
  },
  {
    id: 'build-006',
    slug: 'sarah-scat-pack-build',
    title: 'Sarah\'s Scat Pack — Full Build',
    vehicle: { year: 2022, make: 'Dodge', model: 'Charger Scat Pack' },
    category: 'full-build',
    modsPerformed: [
      'Forged rotating assembly (6.4L 392)',
      'CNC ported cylinder heads',
      'Performance camshaft package',
      'Long tube headers',
      'Full 3" exhaust with X-pipe',
      '1000cc fuel injectors',
      'Dual fuel pump upgrade',
      'Custom E85 flex-fuel tune',
    ],
    hpBefore: 485,
    hpAfter: 640,
    torqueBefore: 475,
    torqueAfter: 610,
    images: ['gradient-violet-dark', 'gradient-violet-mid', 'gradient-violet-light'],
    writeup:
      'Sarah came to us wanting maximum naturally aspirated power from her 392 Scat Pack. We built the bottom end with forged internals, ported the heads, installed an aggressive cam, and built a complete exhaust system. On E85 the 392 makes 640 WHP naturally aspirated — numbers most people don\'t believe until they see the dyno sheet. Sarah\'s next step is a supercharger — that bottom end is ready for it.',
    costRange: '$14,000 – $18,000',
    status: 'published',
    featured: true,
  },
  {
    id: 'build-007',
    slug: 'anthony-camaro-drag-build',
    title: 'Anthony\'s 9-Second Camaro',
    vehicle: { year: 2013, make: 'Chevrolet', model: 'Camaro SS' },
    category: 'drag',
    modsPerformed: [
      'Complete forged LS3 build (416 stroker)',
      'CNC ported heads (race spec)',
      'Twin turbo kit (T3/T4)',
      'Front-mount intercooler',
      'Complete fuel system (1600cc injectors, triple pump)',
      'Twin disc clutch + lightweight flywheel',
      'Carbon fiber driveshaft',
      'Drag radials + skinnies',
      'Roll cage (NHRA certified)',
      'Custom race tune with boost-by-gear',
    ],
    hpBefore: 426,
    hpAfter: 1100,
    torqueBefore: 420,
    torqueAfter: 950,
    images: ['gradient-purple-dark', 'gradient-purple-mid', 'gradient-purple-light'],
    writeup:
      'Anthony wanted a 9-second street car — period. We started with a 416 cubic inch stroker bottom end, ported race heads, and a twin turbo kit. On 22 PSI the car makes 1,100 WHP and runs consistent 9.4 passes at 148 MPH. The car is still street-driven to shows and meets. It is violent, loud, and terrifyingly fast.',
    costRange: '$35,000 – $45,000',
    status: 'published',
  },
  {
    id: 'build-008',
    slug: 'kevin-ls-swap-69-camaro',
    title: 'Kevin\'s LS-Swapped \'69 Camaro',
    vehicle: { year: 1969, make: 'Chevrolet', model: 'Camaro' },
    category: 'full-build',
    modsPerformed: [
      'LS3 engine swap (complete)',
      'T56 Magnum transmission',
      'Custom wiring harness',
      'Aluminum radiator + electric fan setup',
      'Performance camshaft package',
      'Long tube headers + side exit exhaust',
      'Holley Terminator X ECU',
      'Coilover suspension conversion',
      'Wilwood disc brake upgrade (all 4)',
    ],
    hpBefore: 0,
    hpAfter: 530,
    torqueBefore: 0,
    torqueAfter: 490,
    images: ['gradient-slate-dark', 'gradient-slate-mid', 'gradient-slate-light'],
    writeup:
      'Kevin\'s 1969 Camaro sat in a garage for 15 years before he brought it to us. We did a complete LS3 swap with a T56 Magnum, modern suspension, and big brakes. The car makes 530 WHP on pump gas and handles like a modern car. It turns heads at every show and runs 11s at the track. This is what a pro-touring build looks like when it is done right.',
    costRange: '$25,000 – $35,000',
    status: 'published',
  },
  {
    id: 'build-009',
    slug: 'tyler-silverado-twin-turbo',
    title: 'Tyler\'s Twin Turbo Silverado',
    vehicle: { year: 2016, make: 'Chevrolet', model: 'Silverado 1500' },
    category: 'street',
    modsPerformed: [
      'Twin turbo kit (T3/T4 journal bearing)',
      'Upgraded fuel injectors (850cc)',
      'Dual fuel pump kit',
      'Front-mount intercooler',
      'Custom downpipes + mid-pipes',
      'Stainless exhaust (single exit)',
      'Custom E85 tune',
    ],
    hpBefore: 355,
    hpAfter: 650,
    torqueBefore: 383,
    torqueAfter: 700,
    images: ['gradient-teal-dark', 'gradient-teal-mid', 'gradient-teal-light'],
    writeup:
      'Tyler loves his truck and wanted it to be fast — really fast. We installed a twin turbo kit on the 5.3L with supporting mods and tuned on E85. At 650 WHP and 700 lb-ft this Silverado is faster than most sports cars in a straight line while still being a fully functional work truck. The turbo spool on the 5.3L is absolutely instantaneous.',
    costRange: '$10,000 – $14,000',
    status: 'published',
  },
  {
    id: 'build-010',
    slug: 'lisa-daily-driver-challenger',
    title: 'Lisa\'s Daily Driver Challenger — Bolt-On Build',
    vehicle: { year: 2020, make: 'Dodge', model: 'Challenger R/T' },
    category: 'daily-driver',
    modsPerformed: [
      'Cold air intake',
      'Mid-muffler delete (resonator retained)',
      'Performance spark plugs',
      'Throttle body spacer',
      'Custom 93 octane tune',
    ],
    hpBefore: 375,
    hpAfter: 410,
    torqueBefore: 410,
    torqueAfter: 440,
    images: ['gradient-crimson-dark', 'gradient-crimson-mid', 'gradient-crimson-light'],
    writeup:
      'Lisa wanted a little more punch from her daily driver without going crazy. We did simple bolt-ons and a tune — the car picked up 35 WHP and 30 lb-ft while sounding significantly better. Sometimes the simple builds are the most satisfying. Reliable, daily-driveable, and noticeably faster than stock.',
    costRange: '$1,500 – $2,500',
    status: 'published',
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getAllBuilds(): Build[] {
  return BUILDS.filter((b) => b.status === 'published');
}

export function getBuildBySlug(slug: string): Build | undefined {
  return BUILDS.find((b) => b.slug === slug);
}

export function getBuildsByCategory(category: BuildCategory): Build[] {
  return BUILDS.filter((b) => b.status === 'published' && b.category === category);
}

export function getFeaturedBuilds(): Build[] {
  return BUILDS.filter((b) => b.featured);
}

export function getAllBuildMakes(): string[] {
  const makes = new Set<string>();
  for (const build of BUILDS) {
    makes.add(build.vehicle.make);
  }
  return Array.from(makes).sort();
}
