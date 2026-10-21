export function formatKes(amount) {
  if (amount === null || amount === undefined) return null;
  return `KSh ${Number(amount).toLocaleString('en-KE')}`;
}

export function toInternationalPhone(localNumber) {
  if (!localNumber) return '';
  const digits = String(localNumber).replace(/\D/g, '');
  if (digits.startsWith('254')) return `+${digits}`;
  if (digits.startsWith('0')) return `+254${digits.slice(1)}`;
  return `+254${digits}`;
}

export function buildWhatsAppLink(whatsappNumber, message) {
  const intl = toInternationalPhone(whatsappNumber).replace('+', '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${intl}?text=${text}`;
}

export function productWhatsAppMessage(product, siteUrl) {
  const base = `Hello Jumbo Sales, I am interested in the ${product.name} listed on your website. Please confirm the current price, availability and delivery options.`;
  return siteUrl ? `${base} ${siteUrl}/products/${product.slug}/` : base;
}
