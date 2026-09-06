'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toInternationalPhone } from '@/lib/format';

export default function Header({ settings, categories }) {
  const [open, setOpen] = useState(false);
  const tel = (settings.phone || '').replace(/\s/g, '');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products/', label: 'Products' },
    ...categories.map((c) => ({ href: `/category/${c.slug}/`, label: c.name })),
    { href: '/about/', label: 'About Us' },
    { href: '/contact/', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950">
      <div className="container-x flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Jumbo Sales home">
          <img src="/images/branding/logo.png" alt="Jumbo Sales logo" className="h-16 sm:h-20 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-wide text-steel-100 transition-colors hover:text-rust-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${tel}`} className="btn-outline !px-4 !py-2 text-xs">Call Now</a>
          <a
            href={`https://wa.me/${toInternationalPhone(settings.whatsapp).replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !px-4 !py-2 text-xs"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-steel-100/30 text-steel-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-ink-800 bg-ink-950 lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm font-bold uppercase tracking-wide text-steel-100 hover:bg-ink-800 hover:text-rust-400"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3">
              <a href={`tel:${tel}`} className="btn-outline flex-1 !px-4 !py-2 text-xs">Call Now</a>
              <a
                href={`https://wa.me/${toInternationalPhone(settings.whatsapp).replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1 !px-4 !py-2 text-xs"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
