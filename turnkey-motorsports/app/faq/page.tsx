import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import Accordion from '@/components/ui/Accordion';
import { getAllFAQs, FAQ_CATEGORY_LABELS } from '@/lib/data/faq';
import type { FAQCategory } from '@/lib/types';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about engine builds, parts ordering, shipping, installation, warranty, and payment.',
};

const CATEGORY_ORDER: FAQCategory[] = [
  'engine-builds',
  'parts-ordering',
  'shipping',
  'installation',
  'warranty',
  'payment',
];

export default function FAQPage() {
  const allFAQs = getAllFAQs();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Support</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Everything you need to know about our builds, parts, and services.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {CATEGORY_ORDER.map((category) => {
            const faqs = allFAQs.filter((f) => f.category === category);
            if (faqs.length === 0) return null;

            return (
              <section key={category} id={category}>
                <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-white">
                  {FAQ_CATEGORY_LABELS[category]}
                </h2>
                <div className="rounded-xl border border-border bg-surface px-6">
                  <Accordion
                    items={faqs.map((faq) => ({
                      id: faq.id,
                      title: faq.question,
                      content: <p className="text-sm leading-relaxed">{faq.answer}</p>,
                    }))}
                    allowMultiple
                  />
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
