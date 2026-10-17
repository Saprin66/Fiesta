import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CartDrawer } from '@/components/cart/CartDrawer';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grow">{children}</div>
      <Footer />
      <CartDrawer />
    </div>
  );
}
