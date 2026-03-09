'use client';

import { Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';
import ScrollReveal from './ScrollReveal';

const instagramLink = SOCIAL_LINKS.find((s) => s.platform === 'Instagram')?.url ?? '#';

const PLACEHOLDER_TILES = [
  { id: 'ig-1', gradient: 'from-red-950 to-neutral-900', label: 'Hellcat engine bay' },
  { id: 'ig-2', gradient: 'from-neutral-800 to-neutral-950', label: 'TIG welding roll cage' },
  { id: 'ig-3', gradient: 'from-orange-950 to-neutral-900', label: 'Coyote on the dyno' },
  { id: 'ig-4', gradient: 'from-neutral-900 to-neutral-950', label: 'Camaro chassis fab' },
  { id: 'ig-5', gradient: 'from-rose-950 to-neutral-900', label: 'LS3 rotating assembly' },
  { id: 'ig-6', gradient: 'from-zinc-800 to-neutral-950', label: 'Mustang GT leaving the shop' },
];

export default function SocialProof() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Follow Us"
            subtitle="@turnkeymotorsports — engine bays, fabrication, dyno pulls, and builds rolling out."
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PLACEHOLDER_TILES.map((tile, index) => (
            <ScrollReveal key={tile.id} delay={index * 0.08}>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg"
                aria-label={tile.label}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                  <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="mt-2 px-2 text-center text-xs font-medium uppercase tracking-wider text-white opacity-0 transition-opacity duration-300 group-hover:opacity-80">
                    {tile.label}
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
