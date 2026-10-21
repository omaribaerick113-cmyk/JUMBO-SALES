'use client';

import { useCart } from './CartContext';

export default function CartIcon({ className = '' }) {
  const { totalCount, setOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open cart"
      className={`relative flex h-10 w-10 items-center justify-center rounded-md border border-steel-100/30 text-steel-100 hover:border-rust-400 hover:text-rust-400 ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {totalCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rust-500 text-[10px] font-bold text-ink-950">
          {totalCount}
        </span>
      )}
    </button>
  );
}
