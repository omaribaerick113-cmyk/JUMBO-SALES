import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllProducts, getProductBySlug, getRelatedProducts, getSiteSettings, getCategoryBySlug,
} from '@/lib/content';
import { formatKes } from '@/lib/format';
import AvailabilityBadge from '@/components/AvailabilityBadge';
import DiscountBadge from '@/components/DiscountBadge';
import ProductActions from '@/components/ProductActions';
import ProductCard from '@/components/ProductCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.seoTitle || `${product.name} | Jumbo Sales`,
    description: product.seoDescription || product.description?.slice(0, 155),
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product || product.hidden) notFound();

  const settings = getSiteSettings();
  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product);

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [product.mainImage, ...(product.images || [])].filter(Boolean),
    sku: product.sku || undefined,
    brand: product.brand && product.brand !== 'PLACEHOLDER' ? { '@type': 'Brand', name: product.brand } : undefined,
    offers: product.price
      ? {
          '@type': 'Offer',
          priceCurrency: product.currency || 'KES',
          price: product.price,
          availability:
            product.availability === 'available' ? 'https://schema.org/InStock'
            : product.availability === 'sold' ? 'https://schema.org/SoldOut'
            : 'https://schema.org/OutOfStock',
          url: SITE_URL ? `${SITE_URL}/products/${product.slug}/` : undefined,
        }
      : undefined,
  };

  return (
    <div className="container-x py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-steel-500">
        <Link href="/" className="hover:text-rust-600">Home</Link>
        {' / '}
        <Link href="/products/" className="hover:text-rust-600">Products</Link>
        {category ? (<>{' / '}<Link href={`/category/${category.slug}/`} className="hover:text-rust-600">{category.name}</Link></>) : null}
        {' / '}
        <span className="text-ink-950">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-ink-900">
            <img src={product.mainImage} alt={product.imageAlt || product.name} className="h-full w-full object-cover" />
          </div>
          {product.images && product.images.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-md bg-ink-900">
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <AvailabilityBadge availability={product.availability} />
            <DiscountBadge price={product.price} previousPrice={product.previousPrice} />
            {product.featured ? <span className="badge bg-rust-500 text-ink-950">Featured</span> : null}
            {product.demo ? <span className="badge bg-steel-100 text-ink-950">Demo Product</span> : null}
          </div>
          <h1 className="font-display text-3xl text-ink-950">{product.name}</h1>
          {product.sku ? <p className="mt-1 text-sm text-steel-500">SKU: {product.sku}</p> : null}

          <div className="mt-4 flex items-baseline gap-3">
            {product.price ? (
              <>
                <span className="text-3xl font-bold text-rust-600">{formatKes(product.price)}</span>
                {product.previousPrice ? <span className="text-lg text-steel-500 line-through">{formatKes(product.previousPrice)}</span> : null}
                {product.priceUnit ? <span className="text-sm text-steel-500">{product.priceUnit}</span> : null}
              </>
            ) : (
              <span className="text-xl font-bold text-steel-500">Contact for price</span>
            )}
          </div>

          <p className="mt-5 text-steel-700">{product.description}</p>

          {product.attributes && product.attributes.length > 0 ? (
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border border-ink-800/10 bg-steel-100/40 p-4 text-sm">
              {product.attributes.map((a) => (
                <div key={a.label} className="contents">
                  <dt className="font-bold text-ink-950">{a.label}</dt>
                  <dd className="text-steel-700">{a.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {product.deliveryAvailable ? (
            <p className="mt-4 text-sm text-steel-500">
              Delivery available — ask us for a delivery quote based on your location and order size.
            </p>
          ) : null}

          <div className="mt-8">
            <ProductActions product={product} settings={settings} siteUrl={SITE_URL} />
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-ink-950">Related Products</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (<ProductCard key={p.slug} product={p} />))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
