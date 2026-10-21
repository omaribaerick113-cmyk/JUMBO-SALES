'use client';

import { useCart } from './CartContext';
import { formatKes, toInternationalPhone } from '@/lib/format';

export default function CartDrawer({ whatsapp, siteUrl }) {
  const { items, removeItem, updateQty, clearCart, totalPrice, open, setOpen } = useCart();

  if (!open) return null;

  const buildOrderMessage = () => {
    const lines = items.map((i) => {
      const priceText = i.price ? `${formatKes(i.price)} x ${i.qty}` : `Qty ${i.qty} (contact for price)`;
      return `- ${i.name} — ${priceText}`;
    });
    const total = totalPrice ? `\n\nEstimated total: ${formatKes(totalPrice)}` : '';
    return `Hello Jumbo Sales, I would like to order the following:\n\n${lines.join('\n')}${total}\n\nPlease confirm availability, final pricing and delivery.`;
  };

  const whatsappLink = `https://wa.me/${toInternationalPhone(whatsapp).replace('+', '')}?text=${encodeURIComponent(
    buildOrderMessage()
  )}`;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-steel-100 p-4">
          <h2 className="font-display text-lg text-ink-950">Your Order ({items.length})</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md p-2 text-steel-500 hover:bg-steel-100"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-steel-500">Your cart is empty. Add products to build a WhatsApp order.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.slug} className="flex gap-3 border-b border-steel-100 pb-4">
                  <img src={i.image} alt={i.name} className="h-16 w-16 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-ink-950">{i.name}</p>
                    <p className="text-sm text-steel-500">
                      {i.price ? `${formatKes(i.price)} ${i.priceUnit || ''}` : 'Contact for price'}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(i.slug, i.qty - 1)}
                        className="h-7 w-7 rounded border border-steel-300 text-ink-950 hover:border-rust-500"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{i.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(i.slug, i.qty + 1)}
                        className="h-7 w-7 rounded border border-steel-300 text-ink-950 hover:border-rust-500"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(i.slug)}
                        className="ml-auto text-xs font-bold uppercase text-rust-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-steel-100 p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-steel-500">Estimated total</span>
              <span className="font-bold text-ink-950">{formatKes(totalPrice)}</span>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              Order via WhatsApp
            </a>
            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full text-center text-xs font-bold uppercase text-steel-500 hover:text-rust-600"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
