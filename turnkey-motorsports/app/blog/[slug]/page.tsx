import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/data/blog';
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const GRADIENT_MAP: Record<string, string> = {
  'tech-tips': 'from-sky-700/50 via-sky-950 to-neutral-900',
  'build-spotlights': 'from-violet-700/50 via-violet-950 to-neutral-900',
  'product-announcements': 'from-amber-700/50 via-amber-950 to-neutral-900',
  'shop-news': 'from-emerald-700/50 via-emerald-950 to-neutral-900',
  'how-to-guides': 'from-rose-700/50 via-rose-950 to-neutral-900',
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post.relatedPostIds);

  return (
    <>
      {/* Hero */}
      <section className={cn('relative overflow-hidden bg-gradient-to-br py-20 lg:py-28', GRADIENT_MAP[post.category] ?? 'from-neutral-600/40 via-neutral-800 to-neutral-900')}>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <Badge variant="accent" size="md">{post.category.replace('-', ' ')}</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">By {post.author}</p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <Container className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <article className="prose-invert prose prose-sm max-w-none">
            {post.content.split('\n\n').map((block, i) => {
              if (block.startsWith('**') && block.endsWith('**')) {
                const heading = block.replace(/\*\*/g, '');
                return <h2 key={i} className="mb-4 mt-8 font-display text-xl font-bold uppercase tracking-wide text-white">{heading}</h2>;
              }
              if (block.startsWith('- ')) {
                const items = block.split('\n').filter((l) => l.startsWith('- '));
                return (
                  <ul key={i} className="mb-4 list-disc space-y-1 pl-6 text-sm leading-relaxed text-text-secondary">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace(/^- /, '').replace(/\*\*/g, '')}</li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(block)) {
                const items = block.split('\n').filter((l) => /^\d+\./.test(l));
                return (
                  <ol key={i} className="mb-4 list-decimal space-y-1 pl-6 text-sm leading-relaxed text-text-secondary">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '')}</li>
                    ))}
                  </ol>
                );
              }
              // Paragraph — render bold markers as <strong>
              const parts = block.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={i} className="mb-4 text-sm leading-relaxed text-text-secondary">
                  {parts.map((part, j) =>
                    part.startsWith('**') && part.endsWith('**')
                      ? <strong key={j} className="font-semibold text-white">{part.replace(/\*\*/g, '')}</strong>
                      : <span key={j}>{part}</span>
                  )}
                </p>
              );
            })}
          </article>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-text-tertiary" />
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="border-t border-border bg-surface-light py-16">
          <Container>
            <h2 className="mb-8 text-center font-display text-2xl font-bold uppercase tracking-wide text-white">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-border-light hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className={cn('relative aspect-[16/9] bg-gradient-to-br', GRADIENT_MAP[r.category] ?? 'from-neutral-600/40 via-neutral-800 to-neutral-900')}>
                    <div className="absolute left-3 top-3">
                      <Badge variant="accent">{r.category.replace('-', ' ')}</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-3 text-xs text-text-tertiary">
                      <span>{r.publishedAt}</span>
                      <span>{r.readTime}</span>
                    </div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white transition-colors group-hover:text-accent">
                      {r.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                      Read More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
