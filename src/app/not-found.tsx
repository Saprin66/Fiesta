import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CartDrawer } from '@/components/cart/CartDrawer';
import NotFoundContent from './(shop)/not-found';

// Глобальная 404 для адресов вне разделов магазина
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grow">
        <NotFoundContent />
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
}
