import type { Product, ProductCategory } from '@/lib/types';

// ============================================================
// Turn-Key Motorsport — Mock Product Catalog
// 18 products across all categories
// ============================================================

const PRODUCTS: Product[] = [
  // --- Engine Parts (3) ---
  {
    id: 'prod-001',
    name: 'Stage 2 Cam Package — LS3/L99',
    slug: 'stage-2-cam-package-ls3',
    description:
      'Complete cam package for LS3 and L99 engines. Includes a custom-ground camshaft, hardened pushrods, dual valve springs, titanium retainers, and all necessary gaskets. Dyno-proven to add 80-100 RWHP on a bolt-on car with supporting mods. Designed for streetable idle with aggressive power delivery from 3,500-6,800 RPM.',
    shortDescription: 'Complete Stage 2 cam kit with springs, pushrods, and gaskets for LS3/L99.',
    price: 2499,
    compareAtPrice: 2899,
    category: 'engine-parts',
    subcategory: 'Cam Packages',
    images: ['gradient-red-dark', 'gradient-red-mid', 'gradient-red-light'],
    specs: {
      'Cam Duration (Int/Exh)': '228/232 @ .050"',
      'Cam Lift (Int/Exh)': '.595" / .610"',
      'Spring Pressure (Seat/Open)': '130 lbs / 320 lbs',
      'RPM Range': '3,500 – 6,800 RPM',
      'Fitment': 'LS3 / L99 (2008-2015 Camaro, Corvette)',
    },
    fitment: [
      { make: 'Chevrolet', model: 'Camaro SS', yearStart: 2010, yearEnd: 2015 },
      { make: 'Chevrolet', model: 'Corvette', yearStart: 2008, yearEnd: 2013 },
    ],
    reviews: [
      {
        id: 'rev-001',
        customerName: 'Mike T.',
        rating: 5,
        text: 'Gained 92 RWHP on the dyno. Idles like a monster and pulls insanely hard through the mid-range. Best mod I have done to my Camaro.',
        date: '2025-11-15',
        verified: true,
      },
      {
        id: 'rev-002',
        customerName: 'Jason R.',
        rating: 5,
        text: 'Quality parts all around. The springs and retainers are top-notch. Install was straightforward with the included instructions.',
        date: '2025-09-22',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-004', 'prod-006', 'prod-007'],
    inStock: true,
    featured: true,
    onSale: true,
  },
  {
    id: 'prod-002',
    name: 'Forged Rotating Assembly — 6.2L LS',
    slug: 'forged-rotating-assembly-62-ls',
    description:
      'Complete forged bottom end kit for 6.2L LS engines (LS3, L99, L76). Includes forged 4340 steel crankshaft, H-beam connecting rods, forged pistons with rings, and main/rod bearings. Built to handle 800+ HP with forced induction. Precision balanced and ready to drop in.',
    shortDescription: 'Forged crank, rods, and pistons for 6.2L LS — built for 800+ HP.',
    price: 3899,
    category: 'engine-parts',
    subcategory: 'Rotating Assemblies',
    images: ['gradient-slate-dark', 'gradient-slate-mid', 'gradient-slate-light'],
    specs: {
      'Crankshaft': '4340 Forged Steel, 4.000" Stroke',
      'Connecting Rods': '4340 H-Beam, ARP 2000 bolts',
      'Pistons': 'Forged Aluminum, -14cc dish',
      'Compression Ratio': '9.5:1 (boost-friendly)',
      'HP Rating': '800+ HP capable',
    },
    fitment: [
      { make: 'Chevrolet', model: 'Camaro SS', yearStart: 2010, yearEnd: 2015 },
      { make: 'Chevrolet', model: 'Corvette', yearStart: 2008, yearEnd: 2013 },
      { make: 'Chevrolet', model: 'Silverado', yearStart: 2014, yearEnd: 2018 },
    ],
    reviews: [
      {
        id: 'rev-003',
        customerName: 'Carlos V.',
        rating: 5,
        text: 'Built my LS3 to 750 RWHP with a supercharger on this rotating assembly. Over 200 passes at the track with zero issues.',
        date: '2025-08-10',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-001', 'prod-003', 'prod-009'],
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-003',
    name: 'CNC Ported Cylinder Heads — LS3',
    slug: 'cnc-ported-cylinder-heads-ls3',
    description:
      'CNC ported and polished LS3 cylinder heads with upgraded valve springs and titanium retainers. Flow-tested to 340 CFM intake / 240 CFM exhaust. Complete with valves, springs, retainers, and seals — ready to bolt on. Sold as a pair.',
    shortDescription: 'CNC ported LS3 heads — 340 CFM intake flow, sold as a pair.',
    price: 4299,
    category: 'engine-parts',
    subcategory: 'Cylinder Heads',
    images: ['gradient-zinc-dark', 'gradient-zinc-mid', 'gradient-zinc-light'],
    specs: {
      'Intake Flow': '340 CFM @ 28" H₂O',
      'Exhaust Flow': '240 CFM @ 28" H₂O',
      'Chamber Volume': '64cc',
      'Valve Size (Int/Exh)': '2.165" / 1.590"',
      'Sold As': 'Pair (2 heads)',
    },
    fitment: [
      { make: 'Chevrolet', model: 'Camaro SS', yearStart: 2010, yearEnd: 2015 },
      { make: 'Chevrolet', model: 'Corvette', yearStart: 2008, yearEnd: 2013 },
    ],
    reviews: [
      {
        id: 'rev-004',
        customerName: 'Brian K.',
        rating: 5,
        text: 'The flow numbers are legit. Combined with a cam swap, I picked up 130 HP. Finish quality on the ports is beautiful.',
        date: '2025-10-05',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-001', 'prod-002', 'prod-006'],
    inStock: true,
    featured: false,
    isNew: true,
  },

  // --- Intake (2) ---
  {
    id: 'prod-004',
    name: 'Cold Air Intake Kit — 5.7L HEMI',
    slug: 'cold-air-intake-57-hemi',
    description:
      'High-flow cold air intake system designed for 5.7L HEMI engines. Features a CNC-machined aluminum MAF housing, heat-shielded airbox, and high-flow oiled cotton filter. Adds 15-22 RWHP with an aggressive induction sound. No tune required — direct bolt-on replacement.',
    shortDescription: 'Bolt-on cold air intake for 5.7L HEMI — adds 15-22 RWHP, no tune needed.',
    price: 389,
    category: 'intake',
    subcategory: 'Cold Air Intakes',
    images: ['gradient-orange-dark', 'gradient-orange-mid', 'gradient-orange-light'],
    specs: {
      'Filter Type': 'High-Flow Oiled Cotton',
      'Material': 'CNC Aluminum MAF Housing + Molded Tube',
      'HP Gain': '15-22 RWHP',
      'Tune Required': 'No',
      'Fitment': '2009-2023 5.7L HEMI (Challenger, Charger, 300)',
    },
    fitment: [
      { make: 'Dodge', model: 'Challenger', yearStart: 2009, yearEnd: 2023 },
      { make: 'Dodge', model: 'Charger', yearStart: 2009, yearEnd: 2023 },
      { make: 'Chrysler', model: '300', yearStart: 2009, yearEnd: 2023 },
    ],
    reviews: [
      {
        id: 'rev-005',
        customerName: 'Derek M.',
        rating: 5,
        text: 'The intake sound alone is worth it. Noticeable throttle response improvement and the build quality is great. Easy 30-minute install.',
        date: '2025-12-01',
        verified: true,
      },
      {
        id: 'rev-006',
        customerName: 'Amanda S.',
        rating: 4,
        text: 'Good product and easy install. Wish it came with a different filter color option but performance-wise, no complaints.',
        date: '2025-10-18',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-005', 'prod-006', 'prod-010'],
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: 'prod-005',
    name: 'Performance Intake Manifold — Coyote 5.0',
    slug: 'performance-intake-manifold-coyote',
    description:
      'Ported and polished intake manifold for Ford Coyote 5.0L engines. CNC-machined runners optimize airflow for higher RPM power delivery. Compatible with stock throttle body and fuel rails. Gains 25-40 RWHP depending on supporting modifications.',
    shortDescription: 'Ported Coyote 5.0 intake manifold — 25-40 RWHP gain.',
    price: 1299,
    category: 'intake',
    subcategory: 'Intake Manifolds',
    images: ['gradient-amber-dark', 'gradient-amber-mid', 'gradient-amber-light'],
    specs: {
      'Material': 'Cast Aluminum, CNC Ported',
      'Runner Length': 'Optimized for 4,000-7,500 RPM',
      'HP Gain': '25-40 RWHP',
      'Throttle Body': 'Uses stock 80mm TB',
      'Fitment': '2011-2023 Ford Coyote 5.0L',
    },
    fitment: [
      { make: 'Ford', model: 'Mustang GT', yearStart: 2011, yearEnd: 2023 },
      { make: 'Ford', model: 'F-150', yearStart: 2011, yearEnd: 2023 },
    ],
    reviews: [
      {
        id: 'rev-007',
        customerName: 'Steve W.',
        rating: 5,
        text: 'Put this on my 2018 GT with long tubes and a tune. Picked up 35 RWHP over the stock manifold. Top-end pull is incredible.',
        date: '2025-07-20',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-004', 'prod-006', 'prod-007'],
    inStock: true,
    featured: false,
  },

  // --- Exhaust (2) ---
  {
    id: 'prod-006',
    name: 'Long Tube Headers — Coyote 5.0',
    slug: 'long-tube-headers-coyote',
    description:
      'Stainless steel 1-7/8" primary long tube headers for Ford Coyote 5.0L. Mandrel-bent tubes with merge collectors for maximum flow. Includes gaskets, hardware, and O2 sensor extensions. Adds 30-50 RWHP with a proper tune. Requires professional tune for check engine light elimination.',
    shortDescription: '1-7/8" stainless long tube headers for Coyote 5.0 — 30-50 RWHP.',
    price: 1149,
    category: 'exhaust',
    subcategory: 'Headers',
    images: ['gradient-rose-dark', 'gradient-rose-mid', 'gradient-rose-light'],
    specs: {
      'Primary Tube Size': '1-7/8" Stainless Steel',
      'Collector Size': '3" Merge Collector',
      'Material': '304 Stainless Steel',
      'HP Gain': '30-50 RWHP (with tune)',
      'Includes': 'Gaskets, hardware, O2 extensions',
    },
    fitment: [
      { make: 'Ford', model: 'Mustang GT', yearStart: 2015, yearEnd: 2023 },
    ],
    reviews: [
      {
        id: 'rev-008',
        customerName: 'Ryan C.',
        rating: 5,
        text: 'Fitment was perfect. Sound with the active exhaust is incredible. Gained 45 RWHP on the dyno with a E85 tune. Highly recommend.',
        date: '2025-11-08',
        verified: true,
      },
      {
        id: 'rev-009',
        customerName: 'Nick P.',
        rating: 4,
        text: 'Great product but installation is tight around the steering shaft. Budget for a professional install. Power gains are real though.',
        date: '2025-09-14',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-005', 'prod-007', 'prod-004'],
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-007',
    name: 'Cat-Back Exhaust System — 6.4L HEMI',
    slug: 'cat-back-exhaust-64-hemi',
    description:
      'Full 3" stainless steel cat-back exhaust system for 6.4L 392 HEMI engines. Mandrel-bent throughout with X-pipe crossover, straight-through mufflers, and quad 4" tips. Aggressive tone at WOT with a refined cruise note. Direct bolt-on replacement for the factory system.',
    shortDescription: '3" stainless cat-back with X-pipe for 6.4L HEMI — aggressive tone.',
    price: 1649,
    compareAtPrice: 1899,
    category: 'exhaust',
    subcategory: 'Cat-Back Systems',
    images: ['gradient-stone-dark', 'gradient-stone-mid', 'gradient-stone-light'],
    specs: {
      'Pipe Diameter': '3" Mandrel-Bent',
      'Material': '304 Stainless Steel',
      'Muffler Type': 'Straight-Through (Chambered)',
      'Tips': 'Quad 4" Polished',
      'Sound Level': 'Aggressive (no drone at cruise)',
    },
    fitment: [
      { make: 'Dodge', model: 'Challenger Scat Pack', yearStart: 2015, yearEnd: 2023 },
      { make: 'Dodge', model: 'Charger Scat Pack', yearStart: 2015, yearEnd: 2023 },
    ],
    reviews: [
      {
        id: 'rev-010',
        customerName: 'Travis B.',
        rating: 5,
        text: 'Sounds absolutely incredible. No drone on the highway, screams when you get into it. Fit and finish is flawless. Best exhaust for the 392.',
        date: '2025-10-30',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-004', 'prod-006', 'prod-010'],
    inStock: true,
    featured: false,
    onSale: true,
  },

  // --- Fuel System (2) ---
  {
    id: 'prod-008',
    name: '1000cc Fuel Injectors — Set of 8',
    slug: '1000cc-fuel-injectors-set-8',
    description:
      'High-impedance 1000cc fuel injectors, sold as a set of 8. Compatible with E85, gasoline, and flex-fuel setups. Drop-in fitment for LS-based engines with EV6/USCAR connectors. Flow-matched to within 1% for consistent fueling across all cylinders.',
    shortDescription: '1000cc high-impedance injectors, set of 8 — E85 compatible, LS fitment.',
    price: 649,
    compareAtPrice: 749,
    category: 'fuel-system',
    subcategory: 'Fuel Injectors',
    images: ['gradient-emerald-dark', 'gradient-emerald-mid', 'gradient-emerald-light'],
    specs: {
      'Flow Rate': '1000cc / 95 lb/hr @ 43.5 PSI',
      'Impedance': 'High (12 ohms)',
      'Connector': 'EV6 / USCAR',
      'Fuel Compatibility': 'Gasoline, E85, Flex-Fuel',
      'Quantity': 'Set of 8 (flow-matched)',
    },
    fitment: [
      { make: 'Chevrolet', model: 'Camaro SS', yearStart: 2010, yearEnd: 2015 },
      { make: 'Chevrolet', model: 'Corvette', yearStart: 2008, yearEnd: 2013 },
      { make: 'Chevrolet', model: 'Silverado', yearStart: 2014, yearEnd: 2018 },
    ],
    reviews: [
      {
        id: 'rev-011',
        customerName: 'Kevin D.',
        rating: 5,
        text: 'Running these on E85 with a turbo LS. No dead spots, no leaks, and the flow matching is spot on. Idle is smooth for 1000cc injectors.',
        date: '2025-08-25',
        verified: true,
      },
      {
        id: 'rev-012',
        customerName: 'Paul R.',
        rating: 5,
        text: 'Great injectors at a fair price. My tuner was impressed with the consistency across all 8. Easy swap from the factory injectors.',
        date: '2025-07-12',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-009', 'prod-001', 'prod-002'],
    inStock: true,
    featured: true,
    onSale: true,
  },
  {
    id: 'prod-009',
    name: 'Dual Fuel Pump Kit — 340LPH',
    slug: 'dual-fuel-pump-kit-340lph',
    description:
      'Dual in-tank 340LPH fuel pump kit with billet aluminum fuel hat, wiring harness, and mounting hardware. Supports up to 1,200 RWHP on E85. Plug-and-play for common Dodge, Ford, and GM platforms. Quiet operation with zero cavitation under load.',
    shortDescription: 'Dual 340LPH in-tank fuel pump kit — supports 1,200+ RWHP on E85.',
    price: 899,
    category: 'fuel-system',
    subcategory: 'Fuel Pumps',
    images: ['gradient-teal-dark', 'gradient-teal-mid', 'gradient-teal-light'],
    specs: {
      'Flow Rate': '680 LPH combined (2x 340 LPH)',
      'Fuel Compatibility': 'Gasoline, E85, Methanol',
      'HP Support': '1,200+ RWHP on E85',
      'Installation': 'In-tank, plug-and-play harness',
      'Includes': 'Billet fuel hat, pumps, wiring, hardware',
    },
    fitment: [
      { make: 'Dodge', model: 'Challenger', yearStart: 2008, yearEnd: 2023 },
      { make: 'Dodge', model: 'Charger', yearStart: 2008, yearEnd: 2023 },
      { make: 'Chevrolet', model: 'Camaro', yearStart: 2010, yearEnd: 2023 },
    ],
    reviews: [
      {
        id: 'rev-013',
        customerName: 'Eddie F.',
        rating: 5,
        text: 'Running a Hellcat on E85 with a pulley and this pump kit. 850 RWHP and fuel pressure stays rock solid. Worth every penny.',
        date: '2025-09-05',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-008', 'prod-010', 'prod-002'],
    inStock: true,
    featured: false,
  },

  // --- Forced Induction (2) ---
  {
    id: 'prod-010',
    name: 'Stage 1 Supercharger Kit — 5.7L HEMI',
    slug: 'stage-1-supercharger-kit-57-hemi',
    description:
      'Complete positive displacement supercharger kit for 5.7L HEMI. Includes blower, intake manifold, intercooler, idler/tensioner bracket, all tubing, gaskets, hardware, and a pre-loaded PCM tune. Adds 150-180 RWHP on pump gas with no other modifications required. Full bolt-on — no cutting or fabrication.',
    shortDescription: 'Complete bolt-on supercharger kit for 5.7L HEMI — 150-180 RWHP gain.',
    price: 6999,
    category: 'forced-induction',
    subcategory: 'Supercharger Kits',
    images: ['gradient-violet-dark', 'gradient-violet-mid', 'gradient-violet-light'],
    specs: {
      'Blower Type': 'Positive Displacement (TVS)',
      'Boost': '6-8 PSI',
      'HP Gain': '150-180 RWHP (pump gas)',
      'Intercooled': 'Yes — air-to-water',
      'Tune Included': 'Yes — pre-loaded PCM calibration',
    },
    fitment: [
      { make: 'Dodge', model: 'Challenger', yearStart: 2009, yearEnd: 2023 },
      { make: 'Dodge', model: 'Charger', yearStart: 2009, yearEnd: 2023 },
    ],
    reviews: [
      {
        id: 'rev-014',
        customerName: 'Marcus D.',
        rating: 5,
        text: 'Turned my R/T into a Hellcat killer. 530 RWHP on pump gas with just this kit. Install took a weekend in the garage. Best money I ever spent.',
        date: '2025-11-20',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-004', 'prod-009', 'prod-008'],
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-011',
    name: 'Twin Turbo Kit — GM LS (Truck/SUV)',
    slug: 'twin-turbo-kit-gm-ls-truck',
    description:
      'Complete twin turbo system for GM LS-based trucks and SUVs (Silverado, Sierra, Tahoe, Yukon, Escalade). T3/T4 journal bearing turbos, stainless manifolds, intercooler, wastegates, BOVs, all piping, and oil feed/drain lines. Capable of 600-800+ RWHP with supporting mods. Custom tune required (not included).',
    shortDescription: 'Twin turbo kit for LS trucks/SUVs — 600-800+ RWHP capable.',
    price: 5499,
    category: 'forced-induction',
    subcategory: 'Turbo Kits',
    images: ['gradient-purple-dark', 'gradient-purple-mid', 'gradient-purple-light'],
    specs: {
      'Turbo Type': 'T3/T4 Journal Bearing (x2)',
      'Manifolds': '304 Stainless Steel, Log Style',
      'Intercooler': 'Front-mount, bar & plate',
      'HP Capability': '600-800+ RWHP',
      'Tune Required': 'Yes — custom tune not included',
    },
    fitment: [
      { make: 'Chevrolet', model: 'Silverado', yearStart: 2014, yearEnd: 2018 },
      { make: 'GMC', model: 'Sierra', yearStart: 2014, yearEnd: 2018 },
      { make: 'Chevrolet', model: 'Tahoe', yearStart: 2015, yearEnd: 2020 },
    ],
    reviews: [
      {
        id: 'rev-015',
        customerName: 'Tyler G.',
        rating: 4,
        text: 'Great kit for the price. Made 650 RWHP on my Silverado. Fitment is good but plan on some fabrication for the downpipes. Insanely fun truck now.',
        date: '2025-08-15',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-009', 'prod-008', 'prod-002'],
    inStock: true,
    featured: false,
    isNew: true,
  },

  // --- Cooling (1) ---
  {
    id: 'prod-012',
    name: 'Aluminum Radiator — Universal LS Swap',
    slug: 'aluminum-radiator-universal-ls-swap',
    description:
      'High-capacity dual-pass aluminum radiator for LS engine swaps. 31" x 19" core with 2-row design rated for 800+ HP. Includes mounting brackets, trans cooler fittings, and drain petcock. TIG-welded tanks and polished end caps.',
    shortDescription: 'Dual-pass aluminum radiator for LS swaps — rated for 800+ HP.',
    price: 449,
    category: 'cooling',
    subcategory: 'Radiators',
    images: ['gradient-sky-dark', 'gradient-sky-mid', 'gradient-sky-light'],
    specs: {
      'Core Size': '31" x 19" x 2.5"',
      'Design': 'Dual-Pass, 2-Row',
      'Material': '6061 Aluminum, TIG-Welded',
      'HP Rating': '800+ HP',
      'Inlet/Outlet': '1.5" upper, 1.75" lower',
    },
    fitment: [
      { make: 'Chevrolet', model: 'Camaro', yearStart: 1967, yearEnd: 2002 },
      { make: 'Chevrolet', model: 'Nova', yearStart: 1968, yearEnd: 1974 },
      { make: 'Ford', model: 'Mustang', yearStart: 1979, yearEnd: 2004 },
    ],
    reviews: [
      {
        id: 'rev-016',
        customerName: 'Dave L.',
        rating: 5,
        text: 'Running an LS3 in my 69 Camaro. Dropped coolant temps by 30 degrees over the stock-style radiator. Weld quality is excellent.',
        date: '2025-06-18',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-002', 'prod-001', 'prod-013'],
    inStock: true,
    featured: false,
  },

  // --- Drivetrain (2) ---
  {
    id: 'prod-013',
    name: 'Twin Disc Clutch Kit — T56 / TR6060',
    slug: 'twin-disc-clutch-kit-t56',
    description:
      'High-torque twin disc clutch kit for T56 and TR6060 transmissions. Rated for 1,000 lb-ft of torque. Organic/cerametallic disc combination provides smooth daily engagement with aggressive holding power under load. Includes pressure plate, discs, flywheel, and alignment tool.',
    shortDescription: 'Twin disc clutch for T56/TR6060 — rated to 1,000 lb-ft.',
    price: 1899,
    category: 'drivetrain',
    subcategory: 'Clutch Kits',
    images: ['gradient-neutral-dark', 'gradient-neutral-mid', 'gradient-neutral-light'],
    specs: {
      'Disc Type': 'Organic + Cerametallic',
      'Torque Rating': '1,000 lb-ft',
      'Flywheel': 'Billet Steel, SFI Approved',
      'Transmission Fitment': 'T56 / TR6060',
      'Includes': 'Pressure plate, discs, flywheel, alignment tool',
    },
    fitment: [
      { make: 'Chevrolet', model: 'Camaro SS', yearStart: 2010, yearEnd: 2015 },
      { make: 'Chevrolet', model: 'Corvette Z06', yearStart: 2006, yearEnd: 2013 },
      { make: 'Dodge', model: 'Viper', yearStart: 2003, yearEnd: 2017 },
    ],
    reviews: [
      {
        id: 'rev-017',
        customerName: 'Anthony M.',
        rating: 5,
        text: 'Holds my 780 lb-ft LS7 with zero slip. Pedal effort is firm but perfectly livable for daily driving. Way better than a single disc at this power level.',
        date: '2025-10-22',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-014', 'prod-002', 'prod-001'],
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-014',
    name: 'Carbon Fiber Driveshaft — Camaro 5th Gen',
    slug: 'carbon-fiber-driveshaft-camaro-5th-gen',
    description:
      'One-piece carbon fiber driveshaft for 5th Gen Camaro SS (LS3/L99). 40% lighter than the factory aluminum shaft. Reduces rotating mass and parasitic loss for quicker acceleration and smoother high-RPM operation. SFI-certified and dyno-balanced.',
    shortDescription: 'Carbon fiber driveshaft for 5th Gen Camaro — 40% lighter, SFI-cert.',
    price: 849,
    category: 'drivetrain',
    subcategory: 'Driveshafts',
    images: ['gradient-gray-dark', 'gradient-gray-mid', 'gradient-gray-light'],
    specs: {
      'Material': 'Carbon Fiber Composite',
      'Weight Savings': '40% lighter than stock',
      'RPM Rating': '9,000+ RPM',
      'Certification': 'SFI 43.1',
      'Balance': 'Dyno-balanced to 0.1 oz-in',
    },
    fitment: [
      { make: 'Chevrolet', model: 'Camaro SS', yearStart: 2010, yearEnd: 2015 },
    ],
    reviews: [
      {
        id: 'rev-018',
        customerName: 'Jimmy L.',
        rating: 5,
        text: 'Noticeably quicker launches since swapping this in. The car feels lighter on the hit. Quality is fantastic — worth every dollar over an aluminum shaft.',
        date: '2025-09-30',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-013', 'prod-002', 'prod-001'],
    inStock: true,
    featured: false,
  },

  // --- Apparel (3) ---
  {
    id: 'prod-015',
    name: 'Turn-Key Motorsport Logo Tee — Black',
    slug: 'turn-key-logo-tee-black',
    description:
      'Premium cotton tee with the Turn-Key Motorsport logo on the front chest and a large back print. Ringspun 100% cotton, pre-shrunk. Screen-printed graphics. Available in S–3XL.',
    shortDescription: 'Black logo tee — front chest logo + large back print.',
    price: 34,
    category: 'apparel',
    subcategory: 'T-Shirts',
    images: ['gradient-black-dark', 'gradient-black-mid', 'gradient-black-light'],
    specs: {
      'Material': '100% Ringspun Cotton',
      'Weight': '6.1 oz (heavy)',
      'Print': 'Screen-printed',
      'Sizes': 'S, M, L, XL, 2XL, 3XL',
      'Color': 'Black',
    },
    fitment: [],
    reviews: [
      {
        id: 'rev-019',
        customerName: 'Lisa T.',
        rating: 5,
        text: 'Thick, quality shirt. Not thin and see-through like most car merch. I ordered two more.',
        date: '2025-11-05',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-016', 'prod-017'],
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-016',
    name: 'Turn-Key Motorsport Snapback Hat',
    slug: 'turn-key-snapback-hat',
    description:
      'Structured snapback hat with embroidered Turn-Key Motorsport logo. One-size-fits-most with adjustable snap closure. Flat brim. Black with red embroidery.',
    shortDescription: 'Black snapback with red embroidered logo — one size fits most.',
    price: 29,
    category: 'apparel',
    subcategory: 'Hats',
    images: ['gradient-crimson-dark', 'gradient-crimson-mid', 'gradient-crimson-light'],
    specs: {
      'Material': 'Acrylic/Wool Blend',
      'Closure': 'Adjustable Snapback',
      'Brim': 'Flat Brim',
      'Embroidery': 'Front Logo + Side Flag',
      'Color': 'Black / Red',
    },
    fitment: [],
    reviews: [
      {
        id: 'rev-020',
        customerName: 'Matt G.',
        rating: 5,
        text: 'Clean looking hat. Embroidery is high quality and the fit is perfect. Gets compliments at every car meet.',
        date: '2025-10-10',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-015', 'prod-017'],
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-017',
    name: 'Turn-Key Motorsport Hoodie — Charcoal',
    slug: 'turn-key-hoodie-charcoal',
    description:
      'Heavyweight pullover hoodie in charcoal with screen-printed Turn-Key Motorsport graphics on front and back. 10 oz fleece, double-lined hood, rib knit cuffs and waistband. Kangaroo pocket. Available S–3XL.',
    shortDescription: 'Charcoal heavyweight hoodie — screen-printed front & back.',
    price: 64,
    category: 'apparel',
    subcategory: 'Hoodies',
    images: ['gradient-charcoal-dark', 'gradient-charcoal-mid', 'gradient-charcoal-light'],
    specs: {
      'Material': '80/20 Cotton/Polyester Fleece',
      'Weight': '10 oz Heavyweight',
      'Print': 'Screen-printed',
      'Sizes': 'S, M, L, XL, 2XL, 3XL',
      'Color': 'Charcoal',
    },
    fitment: [],
    reviews: [
      {
        id: 'rev-021',
        customerName: 'Nate J.',
        rating: 5,
        text: 'Super warm and well-made. The charcoal color looks great and the print quality is on point. Already my favorite shop hoodie.',
        date: '2025-12-08',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-015', 'prod-016'],
    inStock: true,
    featured: false,
    isNew: true,
  },

  // --- Accessories (1) ---
  {
    id: 'prod-018',
    name: 'Performance Spark Plug Set — LS (Set of 8)',
    slug: 'performance-spark-plugs-ls-set-8',
    description:
      'Iridium-tipped performance spark plugs for LS-based engines. Pre-gapped to .040" for modified applications. Designed for high boost and nitrous applications with a colder heat range than stock. Set of 8.',
    shortDescription: 'Iridium spark plugs for LS engines — colder heat range, set of 8.',
    price: 79,
    category: 'accessories',
    subcategory: 'Spark Plugs',
    images: ['gradient-cyan-dark', 'gradient-cyan-mid', 'gradient-cyan-light'],
    specs: {
      'Tip Material': 'Iridium',
      'Heat Range': 'Colder (1 step)',
      'Gap': '.040" (pre-gapped)',
      'Quantity': 'Set of 8',
      'Application': 'Boosted / Nitrous / Cammed LS',
    },
    fitment: [
      { make: 'Chevrolet', model: 'Camaro SS', yearStart: 2010, yearEnd: 2015 },
      { make: 'Chevrolet', model: 'Corvette', yearStart: 2008, yearEnd: 2013 },
      { make: 'Chevrolet', model: 'Silverado', yearStart: 2014, yearEnd: 2018 },
    ],
    reviews: [
      {
        id: 'rev-022',
        customerName: 'Chris H.',
        rating: 5,
        text: 'Running these with a cam and headers. No misfires, clean burn, and the colder heat range is exactly what a modded LS needs.',
        date: '2025-07-28',
        verified: true,
      },
    ],
    relatedProductIds: ['prod-001', 'prod-008', 'prod-002'],
    inStock: true,
    featured: false,
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelatedProducts(ids: string[]): Product[] {
  return PRODUCTS.filter((p) => ids.includes(p.id));
}

export function getNewProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}

export function getSaleProducts(): Product[] {
  return PRODUCTS.filter((p) => p.onSale);
}

export function getAllMakes(): string[] {
  const makes = new Set<string>();
  for (const product of PRODUCTS) {
    for (const f of product.fitment) {
      makes.add(f.make);
    }
  }
  return Array.from(makes).sort();
}

export function getModelsForMake(make: string): string[] {
  const models = new Set<string>();
  for (const product of PRODUCTS) {
    for (const f of product.fitment) {
      if (f.make === make) {
        models.add(f.model);
      }
    }
  }
  return Array.from(models).sort();
}
