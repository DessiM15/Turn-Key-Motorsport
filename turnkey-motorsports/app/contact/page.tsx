import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import ContactForm from '@/components/contact/ContactForm';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Turnkey Motorsports. Call, email, or visit our shop.',
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Get In Touch</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Have a question about a build, a part, or a service? We are here to help.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-wide text-white">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Info Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                Contact Info
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 text-text-secondary">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href={`tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white">{CONTACT_INFO.phone}</a>
                </div>
                <div className="flex items-start gap-3 text-text-secondary">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">{CONTACT_INFO.email}</a>
                </div>
                <div className="flex items-start gap-3 text-text-secondary">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{CONTACT_INFO.address}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                <Clock className="mr-2 inline h-4 w-4 text-accent" />
                Business Hours
              </h3>
              <div className="space-y-1 text-sm text-text-secondary">
                {CONTACT_INFO.hours.map((h) => (
                  <p key={h}>{h}</p>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wider text-white">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent"
                    aria-label={link.platform}
                  >
                    <span className="text-xs font-bold">{link.platform.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
