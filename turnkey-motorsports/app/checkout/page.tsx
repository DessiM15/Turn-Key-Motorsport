import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import CheckoutForm from '@/components/shop/CheckoutForm';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase at Turnkey Motorsports.',
};

export default function CheckoutPage() {
  return (
    <Container className="py-16 lg:py-24">
      <SectionHeading
        title="Checkout"
        subtitle="Review your order and complete your purchase."
      />
      <CheckoutForm />
    </Container>
  );
}
