import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getAllServices } from '@/lib/data/services';
import { CONTACT_INFO } from '@/lib/constants';
import {
  Wrench,
  Cog,
  Package,
  Gauge,
  Search,
  Flame,
  Zap,
  ArrowDownUp,
  ClipboardCheck,
  Settings,
  Clock,
  DollarSign,
  Phone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Custom fabrication, EFI calibrations, engine builds, and full-service performance work. Book a consultation today.',
};

const ICON_MAP: Record<string, LucideIcon> = {
  Wrench,
  Cog,
  Package,
  Gauge,
  Search,
  Flame,
  Zap,
  ArrowDownUp,
  ClipboardCheck,
  Settings,
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,191,255,0.08),transparent_60%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Full-Service Performance Shop</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Custom fabrication, EFI calibrations, engine builds, and everything in between — we handle every aspect of your build under one roof.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Container className="py-16 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Wrench;

            return (
              <div
                key={service.id}
                className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:border-border-light hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>

                <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
                  {service.name}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {service.shortDescription}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
                    <Clock className="h-3.5 w-3.5" />
                    {service.timelineRange}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
                    <DollarSign className="h-3.5 w-3.5" />
                    {service.priceRange ?? 'Contact for Quote'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Booking Section */}
      <section id="booking" className="scroll-mt-24 bg-surface-light py-16 lg:py-24">
        <Container>
          <SectionHeading
            title="Ready to Start Your Build?"
            subtitle="Schedule an appointment and we will get back to you within 1 business day to confirm."
          />

          <div className="mx-auto flex max-w-md flex-col items-center gap-4">
            <Link href="/schedule">
              <Button variant="primary" size="lg">
                Schedule Your Appointment
              </Button>
            </Link>

            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-sm text-text-tertiary">
                Prefer to talk? Call us directly:
              </p>
              <Link
                href={`tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, '')}`}
                className="flex items-center gap-2 font-display text-lg font-bold text-accent transition-colors hover:text-accent-hover"
              >
                <Phone className="h-5 w-5" />
                {CONTACT_INFO.phone}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
