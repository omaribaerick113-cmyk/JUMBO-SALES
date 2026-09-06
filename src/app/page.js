import Link from 'next/link';
import { getVisibleCategories, getFeaturedProducts, getSiteSettings } from '@/lib/content';
import { toInternationalPhone } from '@/lib/format';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const settings = getSiteSettings();
  const categories = getVisibleCategories();
  const featured = getFeaturedProducts().slice(0, 6);
  const tel = (settings.phone || '').replace(/\s/g, '');
  const whatsapp = `https://wa.me/${toInternationalPhone(settings.whatsapp).replace('+', '')}?text=${encodeURIComponent(
    'Hello Jumbo Sales, I would like to enquire about your products.'
  )}`;

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #e08a1f 0px, #e08a1f 2px, transparent 2px, transparent 26px)',
        }} />
        <div className="container-x relative flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:py-28">
          <div className="max-w-xl">
            <img src="/images/branding/logo.png" alt="Jumbo Sales logo" className="mb-8 h-28 sm:h-36 w-auto" />
            <h1 className="font-display text-4xl uppercase leading-tight text-white sm:text-5xl">
              Quality Hardware &amp; Construction Materials
            </h1>
            <p className="mt-5 text-lg text-steel-300">
              Quality Mabati, Water Tanks, Steel and other construction materials for your building projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products/" className="btn-primary">Shop Products</Link>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Order on WhatsApp</a>
              <a href={`tel:${tel}`} className="btn-outline">Call Now</a>
            </div>
          </div>
          <div className="w-full max-w-md lg:ml-auto">
            <img
              src="/images/branding/hero-mabati-warehouse.jpg"
              alt="Jumbo Sales warehouse — mabati and iron sheets in stock"
              className="w-full rounded-xl border border-ink-800 object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink-950 sm:text-3xl">Shop by Category</h2>
          <Link href="/products/" className="text-sm font-bold text-rust-600 hover:underline">View all products &rarr;</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (<CategoryCard key={c.slug} category={c} />))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-steel-100/40 py-16">
          <div className="container-x">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-2xl text-ink-950 sm:text-3xl">Featured Products</h2>
              <Link href="/products/" className="text-sm font-bold text-rust-600 hover:underline">View all &rarr;</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (<ProductCard key={p.slug} product={p} />))}
            </div>
          </div>
        </section>
      )}

      <section className="container-x py-16">
        <div className="rounded-xl bg-ink-950 px-8 py-12 text-center text-white">
          <h2 className="font-display text-2xl sm:text-3xl">Need materials for your next project?</h2>
          <p className="mx-auto mt-3 max-w-xl text-steel-300">
            Chat with us on WhatsApp for current prices, availability and delivery options.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Order on WhatsApp</a>
            <a href={`tel:${tel}`} className="btn-outline">Call Now</a>
          </div>
        </div>
      </section>
    </>
  );
}
