import { getSiteSettings } from '@/lib/content';
import { toInternationalPhone } from '@/lib/format';

export const metadata = {
  title: 'Delivery',
  description: 'Delivery information for Jumbo Sales hardware and construction materials.',
};

export default function DeliveryPage() {
  const settings = getSiteSettings();
  const whatsappLink = `https://wa.me/${toInternationalPhone(settings.whatsapp).replace('+', '')}?text=${encodeURIComponent(
    'Hello Jumbo Sales, I would like a delivery quote. My location is: '
  )}`;

  return (
    <div className="container-x max-w-2xl py-12">
      <h1 className="font-display text-3xl text-ink-950">Delivery</h1>
      <p className="mt-4 text-steel-700">{settings.deliveryInfo}</p>
      <p className="mt-4 text-steel-700">
        Delivery may depend on the product, quantity, your location, distance and overall order size.
        Contact us with your location and the products you need for an accurate delivery quote.
      </p>
      {settings.serviceAreas ? (
        <p className="mt-4 text-steel-700"><span className="font-bold text-ink-950">Service areas: </span>{settings.serviceAreas}</p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Request Delivery Quote</a>
      </div>
    </div>
  );
}
