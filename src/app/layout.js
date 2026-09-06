import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWhatsApp from '@/components/StickyWhatsApp';
import { getSiteSettings, getVisibleCategories } from '@/lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jumbo Sales Hardware & Construction | Mabati, Water Tanks & Steel',
    template: '%s | Jumbo Sales',
  },
  description:
    'Jumbo Sales supplies quality mabati, water tanks, steel and other construction materials in Kenya. Order on WhatsApp or call for prices and delivery.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon-180.png',
  },
  openGraph: {
    title: 'Jumbo Sales Hardware & Construction',
    description: 'Quality mabati, water tanks, steel and other construction materials in Kenya.',
    images: ['/favicon-512.png'],
  },
};

export default function RootLayout({ children }) {
  const settings = getSiteSettings();
  const categories = getVisibleCategories();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-body">
        <Header settings={settings} categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} categories={categories} />
        <StickyWhatsApp settings={settings} />
      </body>
    </html>
  );
}
