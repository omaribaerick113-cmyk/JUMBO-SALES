import fs from 'fs';
import path from 'path';

export { formatKes, toInternationalPhone, buildWhatsAppLink, productWhatsAppMessage } from './format';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PRODUCTS_DIR = path.join(CONTENT_DIR, 'products');
const CATEGORIES_DIR = path.join(CONTENT_DIR, 'categories');
const SETTINGS_FILE = path.join(CONTENT_DIR, 'settings', 'site.json');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');

function readJsonFilesInDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error(`Failed to parse content file ${f}:`, e.message);
        return null;
      }
    })
    .filter(Boolean);
}

export function getAllProducts() {
  return readJsonFilesInDir(PRODUCTS_DIR);
}

export function getPublicProducts() {
  return getAllProducts().filter((p) => !p.hidden);
}

export function getProductBySlug(slug) {
  return getAllProducts().find((p) => p.slug === slug) || null;
}

export function getProductsByCategory(categorySlug) {
  return getPublicProducts().filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts() {
  return getPublicProducts().filter((p) => p.featured);
}

export function getAllCategories() {
  return readJsonFilesInDir(CATEGORIES_DIR).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getVisibleCategories() {
  return getAllCategories().filter((c) => c.visible !== false);
}

export function getCategoryBySlug(slug) {
  return getAllCategories().find((c) => c.slug === slug) || null;
}

export function getSiteSettings() {
  if (!fs.existsSync(SETTINGS_FILE)) {
    return {
      businessName: 'Jumbo Sales', businessDescription: 'Hardware & Construction',
      phone: '', whatsapp: '', email: '', location: '', openingHours: '',
      serviceAreas: '', deliveryInfo: '', social: {},
    };
  }
  return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
}

export function getPageContent(name) {
  const file = path.join(PAGES_DIR, `${name}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function getRelatedProducts(product, limit = 4) {
  return getPublicProducts()
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
