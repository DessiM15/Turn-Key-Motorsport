import type { FAQItem, FAQCategory } from '@/lib/types';

const FAQ_DATA: FAQItem[] = [
  // --- Engine Builds ---
  { id: 'faq-01', question: 'How long does a full engine build take?', answer: 'Most builds take 2–4 weeks depending on complexity and parts availability. A bolt-on package like the 500HP is typically 2–3 days. We provide a timeline estimate during your consultation.', category: 'engine-builds' },
  { id: 'faq-02', question: 'Do you build engines for all makes and models?', answer: 'Yes. While we specialize in domestic V8 platforms (GM LS/LT, Ford Coyote, Dodge HEMI), we work on imports and custom applications as well. Contact us to discuss your specific platform.', category: 'engine-builds' },
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
  'engine-builds': 'Engine Builds',
  'parts-ordering': 'Parts & Ordering',
  'shipping': 'Shipping & Delivery',
  'installation': 'Installation',
  'warranty': 'Warranty & Returns',
  'payment': 'Payment & Financing',
};
