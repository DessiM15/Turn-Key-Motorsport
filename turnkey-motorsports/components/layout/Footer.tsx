import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_NAV, SOCIAL_LINKS, CONTACT_INFO, PAYMENT_METHODS, SITE_NAME } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface" role="contentinfo">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/turnkey-logo-no-bg.png"
                alt="Turn-Key Motorsport"
                width={200}
                height={80}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              Custom fabrication, EFI calibrations, and full engine builds for
              American muscle. LS, Coyote, and HEMI — built right, every time.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <p className="text-sm text-text-secondary">
                <span className="font-medium text-white">Address:</span>{' '}
                {CONTACT_INFO.address}
              </p>
              <p className="text-sm text-text-secondary">
                <span className="font-medium text-white">Phone:</span>{' '}
                <a href={`tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-accent">
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p className="text-sm text-text-secondary">
                <span className="font-medium text-white">Email:</span>{' '}
                <a href={`mailto:${CONTACT_INFO.email}`} className="transition-colors hover:text-accent">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>

            {/* Hours */}
            <div className="mt-4">
              <p className="text-sm font-medium text-white">Hours:</p>
              {CONTACT_INFO.hours.map((line) => (
                <p key={line} className="text-sm text-text-secondary">
                  {line}
                </p>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border p-2.5 text-text-secondary transition-all hover:border-accent hover:text-accent"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {social.platform.slice(0, 2)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {FOOTER_NAV.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Financing Callout */}
        <div className="mt-12 rounded-xl border border-border bg-surface-light p-4 text-center sm:p-6">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-white">Financing Available</span>{' '}
            — Buy now, pay later with Affirm. Split your purchase into easy monthly payments.
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-text-tertiary">
            <span className="font-semibold text-text-secondary">Disclaimer:</span> Turn-Key
            Motorsport provides performance modifications, custom fabrication, and tuning services
            for off-road and competition use only. Modifications may affect vehicle emissions
            compliance, manufacturer warranties, and street legality. Turn-Key Motorsport is not
            responsible for any traffic citations, failed inspections, voided warranties, or legal
            consequences resulting from modifications performed. By purchasing parts or services, the
            customer acknowledges that modified vehicles may not comply with local, state, or federal
            regulations and assumes all risk and liability associated with the use of modified
            vehicles on public roads. All sales are final unless otherwise stated. A formal warranty
            and liability policy is coming soon.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-text-tertiary">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-tertiary">We accept:</span>
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="rounded border border-border px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-text-secondary"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
