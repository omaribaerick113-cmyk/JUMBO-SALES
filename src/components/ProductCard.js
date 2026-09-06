import Link from 'next/link';
import { formatKes } from '@/lib/format';
import AvailabilityBadge from './AvailabilityBadge';
import DiscountBadge from './DiscountBadge';

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}/`}
      className="group flex flex-col overflow-hidden rounded-lg border border-ink-800/10 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
        <img
          src={product.mainImage}
          alt={product.imageAlt || product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          <AvailabilityBadge availability={product.availability} />
          <DiscountBadge price={product.price} previousPrice={product.previousPrice} />
          {product.featured ? <span className="badge bg-rust-500 text-ink-950">Featured</span> : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-steel-500">{product.subcategory || product.category}</p>
        <h3 className="mt-1 font-display text-base leading-snug text-ink-950">{product.name}</h3>
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          {product.price ? (
            <>
              <span className="text-lg font-bold text-rust-600">{formatKes(product.price)}</span>
              {product.previousPrice ? (
                <span className="text-sm text-steel-500 line-through">{formatKes(product.previousPrice)}</span>
              ) : null}
              {product.priceUnit ? <span className="text-xs text-steel-500">{product.priceUnit}</span> : null}
            </>
          ) : (
            <span className="text-sm font-bold text-steel-500">Contact for price</span>
          )}
        </div>
      </div>
    </Link>
  );
}
