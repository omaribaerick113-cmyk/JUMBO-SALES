import { toInternationalPhone } from '@/lib/format';

export default function StickyWhatsApp({ settings }) {
  if (!settings.whatsapp) return null;
  const link = `https://wa.me/${toInternationalPhone(settings.whatsapp).replace('+', '')}?text=${encodeURIComponent(
    'Hello Jumbo Sales, I would like to enquire about your products.'
  )}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Jumbo Sales on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.34a9.9 9.9 0 0 0 4.62 1.14h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.75 1.24 1.61 2.01 1.11 1 2.05 1.31 2.34 1.46.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.34.07.12.07.7-.17 1.38Z"/>
      </svg>
    </a>
  );
}
