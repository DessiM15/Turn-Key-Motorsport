import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PackagesShowcase from '@/components/home/PackagesShowcase';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import SocialProof from '@/components/home/SocialProof';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, CONTACT_INFO } from '@/lib/constants';

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address,
    },
    sameAs: [],
    priceRange: '$$-$$$$',
    openingHours: CONTACT_INFO.hours.map((h) => h),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <PackagesShowcase />
      <StatsSection />
      <TestimonialsCarousel />
      <SocialProof />
      <NewsletterSignup />
    </>
  );
}
