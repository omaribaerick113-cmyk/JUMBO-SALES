import Link from 'next/link';

export default function Footer({ settings, categories }) {
  const year = new Date().getFullYear();
  const hours = settings.businessHours || {};

  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-steel-300">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/images/branding/logo.png"
            alt="Jumbo Sales logo"
            className="mb-4 h-16 w-auto rounded-md bg-steel-100 p-1.5"
          />
          <p className="text-sm">{settings.businessDescription}</p>
          <p className="mt-2 text-sm">Quality hardware and construction materials.</p>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-wide text-rust-400">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-rust-400">Home</Link></li>
            <li><Link href="/products/" className="hover:text-rust-400">Products</Link></li>
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/category/${c.slug}/`} className="hover:text-rust-400">{c.name}</Link></li>
            ))}
            <li><Link href="/about/" className="hover:text-rust-400">About Us</Link></li>
            <li><Link href="/delivery/" className="hover:text-rust-400">Delivery</Link></li>
            <li><Link href="/contact/" className="hover:text-rust-400">Contact</Link></li>
            <li><Link href="/privacy-policy/" className="hover:text-rust-400">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:text-rust-400">Terms &amp; Conditions</Link></li>
            <li><Link href="/delivery-policy/" className="hover:text-rust-400">Delivery Policy</Link></li>
            <li><Link href="/returns-policy/" className="hover:text-rust-400">Returns &amp; Refunds</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-wide text-rust-400">Contact Info</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Phone: <a href={`tel:${settings.phone}`} className="hover:text-rust-400">{settings.phone}</a></li>
            <li>WhatsApp: <a href={`tel:${settings.whatsapp}`} className="hover:text-rust-400">{settings.whatsapp}</a></li>
            {settings.email ? (
              <li>
                Email: <a href={`mailto:${settings.email}`} className="hover:text-rust-400">{settings.email}</a>
              </li>
            ) : null}
            {settings.location ? <li>{settings.location}</li> : null}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-wide text-rust-400">Business Hours</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {hours.weekdays ? <li>{hours.weekdays}</li> : null}
            {hours.saturday ? <li>{hours.saturday}</li> : null}
            {hours.sunday ? <li>{hours.sunday}</li> : null}
            {!hours.weekdays && settings.openingHours ? <li>{settings.openingHours}</li> : null}
          </ul>
          {(settings.social?.facebook || settings.social?.instagram || settings.social?.tiktok || settings.social?.youtube) && (
            <div className="mt-4 flex gap-3">
              {settings.social?.facebook ? (
                <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-rust-400" aria-label="Facebook">Facebook</a>
              ) : null}
              {settings.social?.instagram ? (
                <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-rust-400" aria-label="Instagram">Instagram</a>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-ink-800 py-6 text-center text-xs text-steel-500">
        &copy; {year} Jumbo Sales. All rights reserved.
      </div>
    </footer>
  );
}
