import Link from 'next/link';
import { getVisibleCategories, getPublicProducts, getSiteSettings, getPageContent } from '@/lib/content';
import { toInternationalPhone } from '@/lib/format';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const settings = getSiteSettings();
  const categories = getVisibleCategories();
  const products = getPublicProducts();
  const about = getPageContent('about') || {};
  const tel = (settings.phone || '').replace(/\s/g, '');
  const whatsapp = `https://wa.me/${toInternationalPhone(settings.whatsapp).replace('+', '')}?text=${encodeURIComponent(
    'Hello Jumbo Sales, I would like to enquire about your products.'
  )}`;

  const heroImages = {
    mabati: '/images/branding/hero-mabati-warehouse.jpg',
    'water-tanks': '/images/products/water-tanks/jumbo-tank-20000l.jpg',
    steel: '/images/products/steel/angle-bars-oxidized-1.jpg',
  };

  return (
    <>
      {/* Stacked hero banners — one per flagship category */}
      {categories.slice(0, 3).map((cat, i) => (
        <section key={cat.slug} className="relative overflow-hidden bg-ink-950 text-white">
          <img
            src={heroImages[cat.slug] || cat.image}
            alt={cat.name}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent" />
          <div className="container-x relative flex min-h-[360px] flex-col justify-center gap-4 py-16">
            {i === 0 && (
              <img
                src="/images/branding/logo.png"
                alt="Jumbo Sales logo"
                className="mb-2 h-20 w-auto rounded-lg bg-steel-100 p-2"
              />
            )}
            <h1 className="font-display text-3xl uppercase leading-tight sm:text-4xl">
              {i === 0 ? 'Quality Hardware & Construction Materials' : cat.name}
            </h1>
            <p className="max-w-xl text-lg text-steel-300">
              {i === 0
                ? 'Building Kenya\u2019s projects with strength and reliability — mabati, water tanks, steel, cement, paint, gypsum, tiles and more.'
                : cat.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href={`/category/${cat.slug}/`} className="btn-primary">
                {i === 0 ? 'Shop Products' : `View ${cat.name}`}
              </Link>
              {i === 0 && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  Order on WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Shop by category */}
      <section className="container-x pt-16">
        <h2 className="font-display text-2xl text-ink-950 sm:text-3xl">Shop by Category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}/`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-ink-950"
            >
              <img src={cat.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 transition group-hover:opacity-80" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 to-transparent p-3 text-sm font-bold uppercase tracking-wide text-white">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Full catalog grid, same as Rai Cement's single-page product listing */}
      <section id="products" className="container-x py-16">
        <div className="mb-8">
          <h2 className="font-display text-2xl text-ink-950 sm:text-3xl">Our Construction Materials</h2>
          <p className="mt-2 max-w-2xl text-steel-500">
            Browse everything we stock — add items to your cart to build a WhatsApp order, or order a single
            product directly.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/products/" className="text-sm font-bold text-rust-600 hover:underline">
            See full product specifications &rarr;
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="bg-steel-100/40 py-16">
        <div className="container-x max-w-3xl text-center">
          <h2 className="font-display text-2xl text-ink-950 sm:text-3xl">About {settings.businessName}</h2>
          <p className="mt-4 text-steel-700">
            {about.whoWeAre || settings.businessDescription}
          </p>
          <p className="mt-3 text-steel-700">{about.whatWeSupply}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-wide">
            <span className="rounded-full border border-rust-500 px-4 py-2 text-rust-600">Countrywide Delivery</span>
            <span className="rounded-full border border-rust-500 px-4 py-2 text-rust-600">Order via WhatsApp</span>
            <span className="rounded-full border border-rust-500 px-4 py-2 text-rust-600">Trusted Local Supplier</span>
          </div>
          <Link href="/about/" className="mt-6 inline-block text-sm font-bold text-rust-600 hover:underline">
            Learn more about us &rarr;
          </Link>
        </div>
      </section>

      {/* CTA strip */}
      <section className="container-x py-16">
        <div className="rounded-xl bg-ink-950 px-8 py-12 text-center text-white">
          <h2 className="font-display text-2xl sm:text-3xl">Need materials for your next project?</h2>
          <p className="mx-auto mt-3 max-w-xl text-steel-300">
            Chat with us on WhatsApp for current prices, availability and delivery options.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              Order on WhatsApp
            </a>
            <a href={`tel:${tel}`} className="btn-outline">Call Now</a>
          </div>
        </div>
      </section>
    </>
  );
}
