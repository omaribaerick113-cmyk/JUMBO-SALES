import { getPublicProducts, getVisibleCategories } from '@/lib/content';
import ProductBrowser from '@/components/ProductBrowser';

export const metadata = {
  title: 'All Products',
  description: 'Browse mabati, water tanks, steel and other hardware and construction materials from Jumbo Sales in Kenya.',
};

export default function ProductsPage() {
  const products = getPublicProducts();
  const categories = getVisibleCategories();

  return (
    <div className="container-x py-12">
      <h1 className="font-display text-3xl text-ink-950">All Products</h1>
      <p className="mt-2 max-w-2xl text-steel-500">
        Search or filter by category, availability and brand to find what you need.
      </p>
      <div className="mt-8">
        <ProductBrowser products={products} categories={categories} />
      </div>
    </div>
  );
}
