import { getPublicProducts, getVisibleCategories } from '@/lib/content';

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const staticRoutes = ['', 'products', 'about', 'contact', 'delivery', 'privacy-policy', 'terms', 'delivery-policy', 'returns-policy'].map((route) => ({
    url: `${siteUrl}/${route}${route ? '/' : ''}`,
    lastModified: new Date(),
  }));
  const categoryRoutes = getVisibleCategories().map((c) => ({ url: `${siteUrl}/category/${c.slug}/`, lastModified: new Date() }));
  const productRoutes = getPublicProducts().map((p) => ({ url: `${siteUrl}/products/${p.slug}/`, lastModified: new Date() }));
  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
