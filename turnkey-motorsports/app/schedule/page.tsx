import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import ScheduleWizard from '@/components/schedule/ScheduleWizard';
import StatusChecker from '@/components/schedule/StatusChecker';
import { CONTACT_INFO } from '@/lib/constants';
import { Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Schedule Appointment',
  description:
    'Book your appointment at Turn-Key Motorsport. Choose a date and time for your consultation, engine build, or service.',
};

export default function SchedulePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,191,255,0.08),transparent_60%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Book Your Visit</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Schedule an Appointment
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Pick a service, choose your date, and we will confirm within 1 business day.
            </p>
          </div>
        </Container>
      </section>

      {/* Status Checker */}
      <Container className="py-8">
        <StatusChecker />
      </Container>

      {/* Wizard */}
      <Container className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 sm:p-10">
          <ScheduleWizard />
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 text-center">
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
      </Container>
    </>
  );
}
