import type { Testimonial } from '@/lib/types';

// ============================================================
// Turnkey Motorsports — Testimonials Data
// 10 customer testimonials
// ============================================================

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-001',
    customerName: 'Marcus D.',
    vehicle: { year: 2019, make: 'Dodge', model: 'Challenger Hellcat' },
    rating: 5,
    text: 'Turnkey took my Hellcat from 717 to 950 wheel. The build quality is insane — every bolt torqued, every line routed clean. These guys don\'t cut corners. I daily drive this car and it has been flawless for 8,000 miles since the build.',
    date: '2025-11-15',
    serviceType: 'Engine Build',
  },
  {
    id: 'test-002',
    customerName: 'Jake R.',
    vehicle: { year: 2021, make: 'Chevrolet', model: 'Camaro ZL1' },
    rating: 5,
    text: 'Got the 700HP package for my ZL1. Dropped it off on Monday, picked it up Friday with dyno sheets in hand. Professional from start to finish. Communication was excellent — they texted photos throughout the build.',
    date: '2025-10-22',
    serviceType: 'Engine Package',
  },
  {
    id: 'test-003',
    customerName: 'Tony M.',
    vehicle: { year: 2018, make: 'Ford', model: 'Mustang GT' },
    rating: 5,
    text: 'Best cam install I\'ve ever seen. They tuned it perfectly — idles smooth, pulls hard, and sounds absolutely wicked. Worth every dollar. I have been to three other shops before and none of them compare to the quality here.',
    date: '2025-09-18',
    serviceType: 'Installation & Tune',
  },
  {
    id: 'test-004',
    customerName: 'Sarah K.',
    vehicle: { year: 2022, make: 'Dodge', model: 'Charger Scat Pack' },
    rating: 5,
    text: 'I was nervous trusting my car to a new shop, but Turnkey blew me away. They kept me updated through the whole build with photos and videos. The results speak for themselves — 640 WHP naturally aspirated on a 392. These guys are the real deal.',
    date: '2025-08-30',
    serviceType: 'Full Build',
  },
  {
    id: 'test-005',
    customerName: 'Chris L.',
    vehicle: { year: 2020, make: 'Chevrolet', model: 'Corvette C8' },
    rating: 5,
    text: 'The intake and exhaust combo they recommended completely transformed the car. 60 extra wheel HP and the sound is addicting. They also tuned the exhaust valve mapping so it is quiet at cruise and loud at WOT. Exactly what I wanted.',
    date: '2025-07-25',
    serviceType: 'Parts & Tune',
  },
  {
    id: 'test-006',
    customerName: 'Devon P.',
    vehicle: { year: 2017, make: 'Ford', model: 'F-150 EcoBoost' },
    rating: 5,
    text: 'Brought my truck in for a turbo upgrade and tune. They got it making 480 to the wheels — on a truck! The dyno numbers don\'t lie. Still tow my boat every weekend without issues. Turnkey understood what I wanted and delivered.',
    date: '2025-06-12',
    serviceType: 'Turbo Upgrade',
  },
  {
    id: 'test-007',
    customerName: 'Anthony M.',
    vehicle: { year: 2013, make: 'Chevrolet', model: 'Camaro SS' },
    rating: 5,
    text: 'Turnkey built my 9-second street car from the ground up. 1,100 WHP on a twin turbo LS and it still drives to shows. The build quality is race-shop level. I have run over 200 passes on this engine and it just keeps going.',
    date: '2025-05-08',
    serviceType: 'Drag Build',
  },
  {
    id: 'test-008',
    customerName: 'Kevin H.',
    vehicle: { year: 1969, make: 'Chevrolet', model: 'Camaro' },
    rating: 5,
    text: 'These guys brought my \'69 Camaro back to life with a full LS3 swap. Modern power, modern handling, classic looks. They handled the wiring, suspension, brakes — everything. The car runs like a brand new machine.',
    date: '2025-04-20',
    serviceType: 'LS Swap',
  },
  {
    id: 'test-009',
    customerName: 'Lisa T.',
    vehicle: { year: 2020, make: 'Dodge', model: 'Challenger R/T' },
    rating: 4,
    text: 'Did basic bolt-ons and a tune on my R/T. Nothing crazy but the car feels completely different — more responsive, more power, way better sound. Would have given 5 stars but the wait was a bit longer than expected due to parts backorder. Quality of work is perfect though.',
    date: '2025-03-15',
    serviceType: 'Bolt-Ons & Tune',
  },
  {
    id: 'test-010',
    customerName: 'Tyler G.',
    vehicle: { year: 2016, make: 'Chevrolet', model: 'Silverado 1500' },
    rating: 4,
    text: 'Twin turbo 5.3L — 650 WHP. The truck is an absolute rocket. Turnkey sourced the kit, did the install, and tuned it all in-house. The only reason for 4 stars is that the downpipe fitment needed some minor fab work. But the end result is absolutely incredible.',
    date: '2025-02-28',
    serviceType: 'Twin Turbo Install',
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getAllTestimonials(): Testimonial[] {
  return TESTIMONIALS;
}
