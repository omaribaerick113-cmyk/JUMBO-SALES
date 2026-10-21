'use client';

import { CartProvider } from './CartContext';
import CartDrawer from './CartDrawer';

export default function AppProviders({ children, whatsapp, siteUrl }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer whatsapp={whatsapp} siteUrl={siteUrl} />
    </CartProvider>
  );
}
