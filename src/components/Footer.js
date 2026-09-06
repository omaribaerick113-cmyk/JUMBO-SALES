import Link from 'next/link';

export default function Footer({ settings, categories }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-steel-300">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/images/branding/logo.png" alt="Jumbo Sales logo" className="mb-4 h-20 w-auto" />
          <p className="text-sm">{settings.businessDescription}</p>
          <p className="mt-2 text-sm">Quality hardware and construction materials.</p>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-wide text-rust-400">Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-rust-400">Home</Link></li>
            <li><Link href="/products/" className="hover:text-rust-400">Products</Link></li>
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/category/${c.slug}/`} className="hover:text-rust-400">{c.name}</Link></li>
            ))}
            <li><Link href="/about/" className="hover:text-rust-400">About</Link></li>
            <li><Link href="/delivery/" className="hover:text-rust-400">Delivery</Link></li>
            <li><Link href="/contact/" className="hover:text-rust-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-wide text-rust-400">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/privacy-policy/" className="hover:text-rust-400">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:text-rust-400">Terms &amp; Conditions</Link></li>
            <li><Link href="/delivery-policy/" className="hover:text-rust-400">Delivery Policy</Link></li>
            <li><Link href="/returns-policy/" className="hover:text-rust-400">Returns &amp; Refunds</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-wide text-rust-400">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Phone: <a href={`tel:${settings.phone}`} className="hover:text-rust-400">{settings.phone}</a></li>
            <li>WhatsApp: <a href={`tel:${settings.whatsapp}`} className="hover:text-rust-400">{settings.whatsapp}</a></li>
            {settings.email ? <li>Email: {settings.email}</li> : null}
            {settings.location ? <li>{settings.location}</li> : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800 py-6 text-center text-xs text-steel-500">
        &copy; {year} Jumbo Sales. All rights reserved.
      </div>
    </footer>
  );
}
