'use client';

import { Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';
import ScrollReveal from './ScrollReveal';

const instagramLink = SOCIAL_LINKS.find((s) => s.platform === 'Instagram')?.url ?? '#';

const PLACEHOLDER_TILES = [
  { id: 'ig-1', gradient: 'from-red-950 to-neutral-900' },
  { id: 'ig-2', gradient: 'from-neutral-800 to-neutral-950' },
  { id: 'ig-3', gradient: 'from-orange-950 to-neutral-900' },
  { id: 'ig-4', gradient: 'from-neutral-900 to-neutral-950' },
  { id: 'ig-5', gradient: 'from-rose-950 to-neutral-900' },
  { id: 'ig-6', gradient: 'from-zinc-800 to-neutral-950' },
];

export default function SocialProof() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Follow Us"
            subtitle="@turnkeymotorsports — builds, parts, and shop life."
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
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                  <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
