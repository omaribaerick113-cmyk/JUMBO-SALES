'use client';

import { buildWhatsAppLink, productWhatsAppMessage } from '@/lib/format';
import { useCart } from './CartContext';

function trackClick(eventName, productName) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'enquiry',
      event_label: productName,
    });
  }
}

export default function ProductActions({ product, settings, siteUrl }) {
  const { addItem } = useCart();
  const message = productWhatsAppMessage(product, siteUrl);
  const whatsappLink = buildWhatsAppLink(settings.whatsapp, message);
  const tel = (settings.phone || '').replace(/\s/g, '');
  const soldOrOos = product.availability === 'sold' || product.availability === 'out_of_stock';

  const quoteMessage = `Hello Jumbo Sales, I would like a quotation for the ${product.name}${
    siteUrl ? ` (${siteUrl}/products/${product.slug}/)` : ''
  }. Please include quantity options and delivery cost.`;
  const quoteLink = buildWhatsAppLink(settings.whatsapp, quoteMessage);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={soldOrOos}
          onClick={() => {
            addItem(product, 1);
            trackClick('add_to_cart', product.name);
          }}
          className="btn-outline flex-1 !border-ink-800/30 !text-ink-950 hover:!border-rust-500 hover:!text-rust-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {soldOrOos ? 'Currently Unavailable' : 'Add to Cart'}
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1"
          onClick={() => trackClick('whatsapp_click', product.name)}
        >
          Order on WhatsApp
        </a>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={`tel:${tel}`}
          className="btn-outline flex-1 !border-ink-800/30 !text-ink-950 hover:!border-rust-500 hover:!text-rust-600"
          onClick={() => trackClick('call_click', product.name)}
        >
          Call Now
        </a>
        <a
          href={quoteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1"
          onClick={() => trackClick('quote_click', product.name)}
        >
          Request Quote
        </a>
      </div>
    </div>
  );
}
