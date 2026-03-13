// ============================================================
// Turn-Key Motorsport — Chat Knowledge Base
// Server-side only. Injected into Claude's system prompt.
// ============================================================

export interface KnowledgeBase {
  business: {
    name: string;
    tagline: string;
    address: string;
    phone: string;
    email: string;
    hours: { days: string; time: string }[];
    platforms: string[];
  };
  services: {
    name: string;
    description: string;
    timeline: string;
    priceRange: string;
  }[];
  faq: {
    question: string;
    answer: string;
    category: string;
  }[];
  policies: {
    shipping: string;
    returns: string;
    warranty: string;
    payment: string;
    deposits: string;
  };
  commonResponses: {
    greeting: string;
    afterHoursGreeting: string;
    fallbackReply: string;
    leadCapturePrompt: string;
    handoffMessage: string;
  };
}

export const KNOWLEDGE_BASE: KnowledgeBase = {
  business: {
    name: 'Turn-Key Motorsport',
    tagline: 'Custom fabrication, EFI calibrations, and full engine builds for American muscle.',
    address: '18011 Cypress Rosehill Rd, Cypress, TX 77429',
    phone: '(555) 123-4567',
    email: 'info@turnkeymotorsport.com',
    hours: [
      { days: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
      { days: 'Saturday – Sunday', time: 'Closed' },
    ],
    platforms: ['GM LS/LT', 'Ford Coyote/Modular', 'Dodge HEMI/Mopar'],
  },

  services: [
    {
      name: 'Custom Fabrication',
      description: 'Chassis modifications, roll cages (NHRA certified), custom 2-door chassis conversions, intercooler piping, turbo manifolds, exhaust systems, brackets, and one-off parts. TIG welding in stainless steel, mild steel, chromoly, and aluminum.',
      timeline: '1–4 weeks',
      priceRange: 'Varies by project — contact for quote',
    },
    {
      name: 'Custom EFI Calibrations & Tuning',
      description: 'Custom EFI calibration and chassis dyno tuning for naturally aspirated and forced induction applications. Pump gas, E85, race gas, and flex-fuel. Platforms: HP Tuners, SCT, Holley, FuelTech, and more. Before/after dyno pulls included. Remote tuning available.',
      timeline: '4–8 hours',
      priceRange: '$500 – $1,500',
    },
    {
      name: 'Full Engine Builds',
      description: 'Complete engine builds from the crank up — tear down, inspect, machine, and reassemble. Mild street builds to full race engines. Blueprinted, balanced, and torque specs documented throughout.',
      timeline: '2–4 weeks',
      priceRange: '$4,999 – $30,000+',
    },
    {
      name: 'Engine Installation',
      description: 'Professional engine installation for new builds, crate engines, and engine swaps. LS swaps, Coyote swaps, and HEMI swaps are our specialty. Includes startup, break-in procedure, and post-install inspection.',
      timeline: '3–5 days',
      priceRange: '$1,500 – $5,000+',
    },
    {
      name: 'Performance Parts Installation',
      description: 'Expert installation of aftermarket performance parts — intakes, exhausts, cams, superchargers, turbo kits, fuel systems, and more. Customer-supplied parts welcome. Post-install inspection and road test included.',
      timeline: '1–3 days',
      priceRange: '$200 – $3,000+',
    },
    {
      name: 'Diagnostics & Troubleshooting',
      description: 'Advanced diagnostics for modified vehicles using factory-level scan tools and wideband data logging. Misfires, boost leaks, fueling problems, wiring gremlins.',
      timeline: '2–4 hours',
      priceRange: '$150 – $500',
    },
    {
      name: 'Supercharger / Turbo Kit Installation',
      description: 'Full forced induction installation — supercharger kits, turbo kits, and custom turbo builds. Plumbing, intercooler routing, fuel system upgrades, oil lines, and tuning. Dyno verification included.',
      timeline: '3–7 days',
      priceRange: '$2,000 – $8,000+',
    },
    {
      name: 'Suspension & Drivetrain Upgrades',
      description: 'Lowering springs, coilovers, sway bars, control arms, clutch kits, driveshafts, differentials, and axle upgrades. Setup matched to your build style. Alignment included.',
      timeline: '1–3 days',
      priceRange: '$500 – $4,000+',
    },
    {
      name: 'Pre-Purchase Inspections',
      description: 'Modified vehicle inspections before you buy — compression test, leak-down, boost integrity, fluid condition, electrical systems, and overall build quality. Written report provided.',
      timeline: '2–4 hours',
      priceRange: '$200 – $400',
    },
    {
      name: 'Maintenance for Modified Vehicles',
      description: 'Oil changes, fluid flushes, belt replacements, and scheduled maintenance tailored for modified vehicles. Correct oils, coolants, and filters for your specific build.',
      timeline: '1–4 hours',
      priceRange: '$75 – $300',
    },
  ],

  faq: [
    { question: 'What kind of fabrication work do you do?', answer: 'Chassis modifications, roll cages (NHRA certified), custom 2-door chassis conversions, subframe connectors, tubular K-members, custom intercooler piping, turbo manifolds, exhaust systems, brackets, and one-off parts.', category: 'Custom Fabrication' },
    { question: 'What materials do you weld?', answer: 'TIG welding in stainless steel, mild steel, chromoly, and aluminum. Roll cages and chassis work are done in chromoly unless otherwise specified.', category: 'Custom Fabrication' },
    { question: 'What tuning platforms do you support?', answer: 'HP Tuners, SCT, Holley Terminator and Dominator, FuelTech, and most standalone ECU platforms.', category: 'Tuning & EFI' },
    { question: 'Do you offer remote tuning?', answer: 'Yes, for supported platforms. We provide a remote tune file and work with you via data logs. For best results we recommend an in-person dyno tune.', category: 'Tuning & EFI' },
    { question: 'Can you tune for E85 or flex fuel?', answer: 'Absolutely. E85 and flex-fuel tunes are a specialty. We calibrate for pump gas, E85, race gas, and flex-fuel setups with real-time ethanol content sensing.', category: 'Tuning & EFI' },
    { question: 'How long does a full engine build take?', answer: 'Most builds take 2–4 weeks depending on complexity and parts availability. Bolt-on packages are typically 2–3 days.', category: 'Engine Builds' },
    { question: 'What platforms do you specialize in?', answer: 'American muscle — GM LS/LT, Ford Coyote/Modular, and Dodge HEMI platforms. Camaros, Mustangs, Challengers, and more.', category: 'Engine Builds' },
    { question: 'Can I supply my own parts?', answer: 'Yes. We install customer-supplied parts regularly. Our warranty only covers parts sourced through us.', category: 'Engine Builds' },
    { question: 'Do your builds come with a warranty?', answer: '500HP and 700HP packages include 12-month / 12,000-mile powertrain warranty. 1000HP+ includes 6-month / 6,000-mile warranty. Custom builds vary.', category: 'Engine Builds' },
    { question: 'How much does shipping cost?', answer: 'Orders over $299 ship free to the continental US. Under $299 is $14.99 flat rate. Alaska, Hawaii, and international are quoted at checkout.', category: 'Shipping' },
    { question: 'How long does shipping take?', answer: 'Most in-stock orders ship within 1–2 business days. Standard delivery is 3–7 business days.', category: 'Shipping' },
    { question: 'What is your return policy?', answer: 'Unused, unopened parts can be returned within 30 days for a full refund. Electrical parts, custom-order items, and installed parts are non-returnable.', category: 'Warranty & Returns' },
    { question: 'What payment methods do you accept?', answer: 'Visa, Mastercard, American Express, Discover, PayPal, and bank transfers. Cashier\'s checks for builds over $5,000.', category: 'Payment' },
    { question: 'Do you offer financing?', answer: 'Yes, through Affirm for qualifying purchases. Most approvals are instant with 0% APR options on select terms.', category: 'Payment' },
    { question: 'Do you require a deposit for builds?', answer: 'Engine builds and packages require a 50% deposit. Remaining balance due upon completion before vehicle pickup.', category: 'Payment' },
  ],

  policies: {
    shipping: 'Free shipping on orders over $299 to the continental US. Under $299 is $14.99 flat rate. Most in-stock orders ship within 1–2 business days with 3–7 day delivery.',
    returns: '30-day return policy on unused, unopened parts in original packaging. Electrical parts, custom-order items, and installed parts are non-returnable. Return shipping is buyer\'s responsibility.',
    warranty: '500HP and 700HP packages: 12-month / 12,000-mile powertrain warranty. 1000HP+: 6-month / 6,000-mile warranty. Custom builds: warranty terms specified in quote. Warranty does not cover abuse, racing damage, or unauthorized modifications.',
    payment: 'Visa, Mastercard, American Express, Discover, PayPal, bank transfers, and cashier\'s checks (for builds over $5,000). Financing available through Affirm with 0% APR options.',
    deposits: '50% deposit required on engine builds and packages over $5,000. Remaining balance due upon completion before vehicle pickup. Payment plans available on a case-by-case basis for builds over $10,000.',
  },

  commonResponses: {
    greeting: 'Hey! Welcome to Turn-Key Motorsport. How can I help you today?',
    afterHoursGreeting: 'Hey! The shop is closed right now, but I\'m the Turn-Key AI assistant and I can answer most questions about our services, parts, and builds. What can I help you with?',
    fallbackReply: 'That\'s a great question — I\'d recommend calling us at (555) 123-4567 or stopping by the shop so we can give you the best answer.',
    leadCapturePrompt: 'I\'d love to help you further. If you want, drop your name and the best way to reach you and we\'ll follow up.',
    handoffMessage: 'Let me connect you with one of our team members. Hang tight!',
  },
};
