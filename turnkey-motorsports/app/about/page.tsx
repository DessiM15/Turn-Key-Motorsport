import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { CONTACT_INFO } from '@/lib/constants';
import { Wrench, Users, Award, Gauge, MapPin, ArrowRight, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Turnkey Motorsports — our story, our team, and our commitment to building serious power.',
};

const STATS = [
  { icon: Wrench, value: '500+', label: 'Builds Completed' },
  { icon: Users, value: '1,200+', label: 'Happy Customers' },
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: Gauge, value: '750K+', label: 'Horsepower Delivered' },
];

const TEAM = [
  { name: 'Shop Owner', role: 'Founder & Lead Builder', bio: 'Over 15 years of engine building experience across all domestic V8 platforms.' },
  { name: 'Lead Technician', role: 'Senior Engine Builder', bio: 'Specializes in forced induction builds and custom fabrication.' },
  { name: 'Tuning Specialist', role: 'Dyno & Calibration', bio: 'HP Tuners and EFI Live certified. Thousands of tunes across every platform.' },
  { name: 'Service Advisor', role: 'Customer Relations', bio: 'Your point of contact from consultation to completion.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Our Story</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              About Turnkey Motorsports
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              We build engines. We sell parts. We live and breathe horsepower. What started as a passion project in a two-car garage is now a full-service performance shop trusted by builders across the country.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <Container className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Built by Enthusiasts, for Enthusiasts
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-secondary">
            <p>
              Turnkey Motorsports was founded on a simple idea: build engines the right way and treat every customer&apos;s car like it&apos;s our own. We have been in the performance business for over 15 years, and in that time we have completed more than 500 engine builds ranging from mild street cars to four-digit drag machines.
            </p>
            <p>
              Our shop is equipped with a chassis dyno, full machine shop capabilities, and a team of experienced builders who know these platforms inside and out. Whether you need a simple bolt-on install or a complete forged bottom-end build with forced induction, we have the tools and expertise to get it done right.
            </p>
            <p>
              We are not a volume shop. We take a limited number of builds at a time so we can give each one the attention it deserves. Every build is documented, every torque spec is verified, and every car gets dyno-tuned before it leaves our shop. No shortcuts. No excuses.
            </p>
          </div>
        </div>
      </Container>

      {/* Stats */}
      <section className="bg-surface-light py-16">
        <Container>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-accent" />
                <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <Container className="py-16 lg:py-24">
        <h2 className="mb-8 text-center font-display text-2xl font-bold uppercase tracking-wide text-white">
          Our Team
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-xl border border-border bg-surface p-6 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-surface-light">
                <Eye className="h-8 w-8 text-white/20" />
              </div>
              <h3 className="font-display text-base font-bold uppercase text-white">{member.name}</h3>
              <p className="text-xs font-medium text-accent">{member.role}</p>
              <p className="mt-2 text-xs text-text-secondary">{member.bio}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Map + Location */}
      <section className="bg-surface-light py-16 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                Visit Our Shop
              </h2>
              <div className="mt-6 space-y-4 text-sm text-text-secondary">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{CONTACT_INFO.address}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Hours</p>
                  {CONTACT_INFO.hours.map((h) => (
                    <p key={h}>{h}</p>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {/* Map Placeholder */}
            <div className="flex items-center justify-center rounded-xl border border-border bg-surface p-12">
              <div className="text-center">
                <MapPin className="mx-auto mb-3 h-12 w-12 text-text-tertiary" />
                <p className="text-sm text-text-tertiary">Google Maps embed placeholder</p>
                <p className="mt-1 text-xs text-text-tertiary">Connect Google Maps API to enable</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
