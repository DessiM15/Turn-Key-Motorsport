import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ProductDetail from '@/components/shop/ProductDetail';
import { getAllProducts, getProductBySlug, getRelatedProducts } from '@/lib/data/products';
import { SITE_NAME } from '@/lib/constants';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | ${SITE_NAME}`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.relatedProductIds);

  return (
    <Container className="py-16 lg:py-24">
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </Container>
  );
}
