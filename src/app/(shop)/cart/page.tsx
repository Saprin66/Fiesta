import type { Metadata } from 'next';
import { CartView } from '@/components/cart/CartView';
import { Breadcrumbs } from '@/components/ui/Section';

export const metadata: Metadata = { title: 'Корзина', robots: { index: false } };

export default function CartPage() {
  return (
    <main className="container-page py-8 md:py-12">
      <Breadcrumbs items={[{ href: '/', label: 'Главная' }, { label: 'Корзина' }]} />
      <h1 className="mb-8 text-3xl md:text-h1">Корзина</h1>
      <CartView />
    </main>
  );
}
