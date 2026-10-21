import { getSiteSettings } from '@/lib/content';
import { toInternationalPhone } from '@/lib/format';

export const metadata = {
  title: 'Contact Us',
  description: 'Contact Jumbo Sales by phone or WhatsApp for hardware and construction material enquiries.',
};

export default function ContactPage() {
  const settings = getSiteSettings();
  const tel = (settings.phone || '').replace(/\s/g, '');
  const whatsappLink = `https://wa.me/${toInternationalPhone(settings.whatsapp).replace('+', '')}?text=${encodeURIComponent(
    'Hello Jumbo Sales, I would like to make an enquiry.'
  )}`;

  return (
    <div className="container-x max-w-2xl py-12">
      <h1 className="font-display text-3xl text-ink-950">Contact Us</h1>
      <p className="mt-2 text-steel-500">{settings.businessDescription}</p>

      <dl className="mt-8 space-y-5 rounded-lg border border-ink-800/10 bg-steel-100/40 p-6">
        <div><dt className="text-xs font-bold uppercase tracking-wide text-steel-500">Business</dt><dd className="text-ink-950">{settings.businessName}</dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-wide text-steel-500">Phone</dt><dd><a href={`tel:${tel}`} className="text-rust-600 hover:underline">{settings.phone}</a></dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-wide text-steel-500">WhatsApp</dt><dd><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-rust-600 hover:underline">{settings.whatsapp}</a></dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-wide text-steel-500">Email</dt><dd className="text-steel-700">{settings.email}</dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-wide text-steel-500">Location</dt><dd className="text-steel-700">{settings.location}</dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-wide text-steel-500">Opening Hours</dt><dd className="text-steel-700">{settings.openingHours}</dd></div>
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">Message on WhatsApp</a>
        <a href={`tel:${tel}`} className="btn-primary">Call Now</a>
      </div>

      <p className="mt-8 text-sm text-steel-500">
        Prefer email or a different way to reach us? The fields above are managed by Jumbo Sales in the
        website admin and will update automatically once filled in.
      </p>
    </div>
  );
}
