'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';

function uniqueValues(products, key) {
  const values = new Set();
  products.forEach((p) => {
    if (p[key]) values.add(p[key]);
    (p.attributes || []).forEach((a) => {
      if (a.label === key && a.value) values.add(a.value);
    });
  });
  return Array.from(values).sort();
}

function attrValue(product, label) {
  const found = (product.attributes || []).find((a) => a.label === label);
  return found ? found.value : null;
}

export default function ProductBrowser({ products, categories, lockedCategory }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(lockedCategory || 'all');
  const [availability, setAvailability] = useState('all');
  const [brand, setBrand] = useState('all');

  const brands = useMemo(
    () => uniqueValues(products.filter((p) => !lockedCategory || p.category === lockedCategory), 'brand'),
    [products, lockedCategory]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (availability !== 'all' && (p.availability || 'available') !== availability) return false;
      if (brand !== 'all' && p.brand !== brand) return false;
      if (!q) return true;
      const haystack = [
        p.name, p.category, p.subcategory, p.brand, p.sku,
        attrValue(p, 'Capacity'), attrValue(p, 'Type'), attrValue(p, 'Material'), attrValue(p, 'Profile'),
        ...(p.attributes || []).map((a) => a.value),
      ].filter(Boolean).join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [products, query, category, availability, brand]);

  return (
    <div>
      <div className="grid gap-3 rounded-lg border border-ink-800/10 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-bold text-ink-950">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 5000L tank, mabati, angle bar"
            className="rounded-md border border-steel-300 px-3 py-2 focus:border-rust-500 focus:outline-none"
            aria-label="Search products"
          />
        </label>

        {!lockedCategory && (
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-bold text-ink-950">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border border-steel-300 px-3 py-2 focus:border-rust-500 focus:outline-none"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </label>
        )}

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-bold text-ink-950">Availability</span>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="rounded-md border border-steel-300 px-3 py-2 focus:border-rust-500 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="sold">Sold</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-bold text-ink-950">Brand</span>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="rounded-md border border-steel-300 px-3 py-2 focus:border-rust-500 focus:outline-none"
          >
            <option value="all">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-steel-500">
        {filtered.length} product{filtered.length === 1 ? '' : 's'} found
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-steel-300 p-10 text-center text-steel-500">
          No products match your search. Try a different term or clear the filters, or ask us on WhatsApp.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
