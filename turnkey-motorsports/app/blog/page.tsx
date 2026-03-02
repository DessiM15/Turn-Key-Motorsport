import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { getAllBlogPosts } from '@/lib/data/blog';
import { Eye, ArrowRight, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Build spotlights, tech tips, product announcements, and shop news from Turnkey Motorsports.',
};

const GRADIENT_MAP: Record<string, string> = {
  'tech-tips': 'from-sky-700/50 via-sky-950 to-neutral-900',
  'build-spotlights': 'from-violet-700/50 via-violet-950 to-neutral-900',
  'product-announcements': 'from-amber-700/50 via-amber-950 to-neutral-900',
  'shop-news': 'from-emerald-700/50 via-emerald-950 to-neutral-900',
  'how-to-guides': 'from-rose-700/50 via-rose-950 to-neutral-900',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const heroPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-background to-background py-20 lg:py-28">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" size="md">Blog</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Latest from the Shop
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Build spotlights, tech tips, and industry insights.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        {/* Hero Post */}
        {heroPost && (
          <Link
            href={`/blog/${heroPost.slug}`}
            className="group mb-12 grid overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-border-light hover:shadow-lg hover:shadow-accent/5 lg:grid-cols-2"
          >
            <div className={cn('relative aspect-[16/9] bg-gradient-to-br lg:aspect-auto', GRADIENT_MAP[heroPost.category] ?? 'from-neutral-600/40 via-neutral-800 to-neutral-900')}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="h-16 w-16 text-white/15" />
              </div>
              <div className="absolute left-4 top-4">
                <Badge variant="accent">{heroPost.category.replace('-', ' ')}</Badge>
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 lg:p-10">
              <div className="mb-3 flex items-center gap-4 text-xs text-text-tertiary">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{heroPost.publishedAt}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{heroPost.readTime}</span>
              </div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white transition-colors group-hover:text-accent sm:text-2xl">
                {heroPost.title}
              </h2>
              <p className="mt-3 text-sm text-text-secondary">{heroPost.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Read More <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        )}

        {/* Other Posts */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-border-light hover:shadow-lg hover:shadow-accent/5"
            >
              <div className={cn('relative aspect-[16/9] bg-gradient-to-br', GRADIENT_MAP[post.category] ?? 'from-neutral-600/40 via-neutral-800 to-neutral-900')}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white/15" />
                </div>
                <div className="absolute left-3 top-3">
                  <Badge variant="accent">{post.category.replace('-', ' ')}</Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center gap-3 text-xs text-text-tertiary">
                  <span>{post.publishedAt}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-text-secondary">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
