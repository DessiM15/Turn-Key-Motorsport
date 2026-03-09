import type { FAQItem, FAQCategory } from '@/lib/types';

const FAQ_DATA: FAQItem[] = [
  // --- Custom Fabrication ---
  { id: 'faq-21', question: 'What kind of fabrication work do you do?', answer: 'We handle chassis modifications, roll cages (NHRA certified), custom 2-door chassis conversions, subframe connectors, tubular K-members, custom intercooler piping, turbo manifolds, exhaust systems, brackets, and one-off parts. If the catalogs do not sell it, we build it.', category: 'custom-fabrication' },
  { id: 'faq-22', question: 'What materials do you weld?', answer: 'We TIG weld stainless steel, mild steel, chromoly, and aluminum. All roll cages and chassis work are done in chromoly unless otherwise specified.', category: 'custom-fabrication' },
  { id: 'faq-23', question: 'Can you build a roll cage for my car?', answer: 'Yes. We fabricate NHRA-certified roll cages for most American muscle platforms — Camaros, Mustangs, Challengers, and more. Cage style and certification level depend on your ET goals. Book a consultation and we will spec it out.', category: 'custom-fabrication' },
  { id: 'faq-24', question: 'How long does a custom fabrication project take?', answer: 'Timelines range from 1–4 weeks depending on scope. A roll cage typically takes 1–2 weeks. Full chassis builds or 2-door conversions take longer. We provide a timeline estimate during your consultation.', category: 'custom-fabrication' },

  // --- Tuning & EFI ---
  { id: 'faq-25', question: 'What tuning platforms do you support?', answer: 'We tune on HP Tuners, SCT, Holley Terminator and Dominator, FuelTech, and most standalone ECU platforms. If you have a specific platform, contact us to confirm support.', category: 'tuning-efi' },
  { id: 'faq-26', question: 'Do you offer remote tuning?', answer: 'Yes, for supported platforms. We provide a remote tune file and work with you via data logs to dial it in. For best results, we always recommend an in-person dyno tune at our Cypress, TX shop.', category: 'tuning-efi' },
  { id: 'faq-27', question: 'Can you tune for E85 or flex fuel?', answer: 'Absolutely. E85 and flex-fuel tunes are one of our specialties. We calibrate for pump gas, E85, race gas, and flex-fuel setups with real-time ethanol content sensing.', category: 'tuning-efi' },
  { id: 'faq-28', question: 'Do I get dyno sheets with my tune?', answer: 'Yes. Every in-person tune includes before/after dyno pulls with printed data sheets showing HP, torque, and air-fuel ratio across the full RPM range.', category: 'tuning-efi' },

  // --- Engine Builds ---
  { id: 'faq-01', question: 'How long does a full engine build take?', answer: 'Most builds take 2–4 weeks depending on complexity and parts availability. A bolt-on package like the 500HP is typically 2–3 days. We provide a timeline estimate during your consultation.', category: 'engine-builds' },
  { id: 'faq-02', question: 'What platforms do you specialize in?', answer: 'We specialize in American muscle — GM LS/LT, Ford Coyote/Modular, and Dodge HEMI platforms. From Camaros to Mustangs to Challengers, these are the engines we know inside and out.', category: 'engine-builds' },
  { id: 'faq-03', question: 'Can I supply my own parts?', answer: 'Absolutely. We install customer-supplied parts regularly. However, our warranty only covers parts sourced through us. We are happy to recommend and source parts at competitive prices.', category: 'engine-builds' },
  { id: 'faq-04', question: 'Do your builds come with a warranty?', answer: 'Yes. Our 500HP and 700HP packages include a 12-month / 12,000-mile powertrain warranty. The 1000HP+ Flagship Build includes a 6-month / 6,000-mile warranty. Custom builds vary — warranty terms are specified in your quote.', category: 'engine-builds' },

  // --- Parts Ordering ---
  { id: 'faq-05', question: 'Can I order parts online and have them shipped?', answer: 'Yes! All parts in our shop are available for nationwide shipping. Orders over $299 ship free to the continental US.', category: 'parts-ordering' },
  { id: 'faq-06', question: 'Do you price match?', answer: 'We do our best to be competitive. If you find an identical part at a lower price from an authorized dealer, contact us and we will do our best to match or beat it.', category: 'parts-ordering' },
  { id: 'faq-07', question: 'Can I pick up my order locally?', answer: 'Yes. Local pickup is available at our shop during business hours. Select "Local Pickup" at checkout and we will have your order ready.', category: 'parts-ordering' },

  // --- Shipping ---
  { id: 'faq-08', question: 'How much does shipping cost?', answer: 'Orders over $299 ship free to the continental US. Orders under $299 have a flat rate of $14.99. Alaska, Hawaii, and international orders are quoted at checkout.', category: 'shipping' },
  { id: 'faq-09', question: 'How long does shipping take?', answer: 'Most in-stock orders ship within 1–2 business days. Standard delivery is 3–7 business days depending on location. Expedited shipping options are available at checkout.', category: 'shipping' },
  { id: 'faq-10', question: 'Do you ship internationally?', answer: 'Currently we ship to the continental US, Alaska, and Hawaii. International shipping is available on a case-by-case basis — contact us for a quote.', category: 'shipping' },

  // --- Installation ---
  { id: 'faq-11', question: 'Do you install parts I did not buy from you?', answer: 'Yes. We install customer-supplied parts at our standard labor rates. We inspect all parts before installation to ensure quality and compatibility.', category: 'installation' },
  { id: 'faq-12', question: 'Do I need an appointment for installation?', answer: 'Yes. We recommend booking a consultation first so we can schedule your install, confirm parts availability, and give you an accurate timeline and quote.', category: 'installation' },
  { id: 'faq-13', question: 'Can I wait while my car is being worked on?', answer: 'For short jobs (under 4 hours), you are welcome to wait in our customer lounge. For longer builds, we recommend drop-off. We provide regular photo and text updates throughout the process.', category: 'installation' },

  // --- Warranty ---
  { id: 'faq-14', question: 'What does the warranty cover?', answer: 'Our powertrain warranty covers defects in parts and labor on components we installed. It does not cover abuse, racing damage, or modifications made after our build without our approval.', category: 'warranty' },
  { id: 'faq-15', question: 'What is your return policy?', answer: 'Unused, unopened parts can be returned within 30 days for a full refund. Electrical parts, custom-order items, and installed parts are non-returnable. Return shipping is the buyer\'s responsibility.', category: 'warranty' },
  { id: 'faq-16', question: 'What if something goes wrong after the build?', answer: 'Contact us immediately. If the issue is covered under warranty, we will fix it at no charge. For non-warranty issues, we offer priority scheduling and discounted labor rates for previous customers.', category: 'warranty' },

  // --- Payment ---
  { id: 'faq-17', question: 'What payment methods do you accept?', answer: 'We accept Visa, Mastercard, American Express, Discover, PayPal, and bank transfers. For builds over $5,000, we also accept cashier\'s checks.', category: 'payment' },
  { id: 'faq-18', question: 'Do you offer financing?', answer: 'Yes. We offer financing through Affirm for qualifying purchases. Apply at checkout — most approvals are instant with 0% APR options available on select terms.', category: 'payment' },
  { id: 'faq-19', question: 'Do you require a deposit for builds?', answer: 'Yes. Engine builds and packages require a 50% deposit to begin work. The remaining balance is due upon completion, before vehicle pickup.', category: 'payment' },
  { id: 'faq-20', question: 'Can I pay in installments for a build?', answer: 'For builds over $10,000, we can work out a payment plan on a case-by-case basis. Contact us to discuss options during your consultation.', category: 'payment' },
];

export function getAllFAQs(): FAQItem[] {
  return FAQ_DATA;
}

export function getFAQsByCategory(category: FAQCategory): FAQItem[] {
  return FAQ_DATA.filter((f) => f.category === category);
}

export const FAQ_CATEGORY_LABELS: Record<FAQCategory, string> = {
  'custom-fabrication': 'Custom Fabrication',
  'tuning-efi': 'Tuning & EFI',
  'engine-builds': 'Engine Builds',
  'parts-ordering': 'Parts & Ordering',
  'shipping': 'Shipping & Delivery',
  'installation': 'Installation',
  'warranty': 'Warranty & Returns',
  'payment': 'Payment & Financing',
};
