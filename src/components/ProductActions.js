import { buildWhatsAppLink, productWhatsAppMessage } from '@/lib/format';

export default function ProductActions({ product, settings, siteUrl }) {
  const message = productWhatsAppMessage(product, siteUrl);
  const whatsappLink = buildWhatsAppLink(settings.whatsapp, message);
  const tel = (settings.phone || '').replace(/\s/g, '');

  const quoteMessage = `Hello Jumbo Sales, I would like a quotation for the ${product.name}${
    siteUrl ? ` (${siteUrl}/products/${product.slug}/)` : ''
  }. Please include quantity options and delivery cost.`;
  const quoteLink = buildWhatsAppLink(settings.whatsapp, quoteMessage);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1">
        Order on WhatsApp
      </a>
      <a href={`tel:${tel}`} className="btn-outline flex-1 !border-ink-800/30 !text-ink-950 hover:!border-rust-500 hover:!text-rust-600">
        Call Now
      </a>
      <a href={quoteLink} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
        Request Quote
      </a>
    </div>
  );
}
