import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/cart/CheckoutForm';
import { Breadcrumbs } from '@/components/ui/Section';

export const metadata: Metadata = { title: 'Оформление заказа', robots: { index: false } };

export default function CheckoutPage() {
  return (
    <main className="container-page py-8 md:py-12">
      <Breadcrumbs items={[{ href: '/', label: 'Главная' }, { href: '/cart', label: 'Корзина' }, { label: 'Оформление' }]} />
      <h1 className="mb-8 text-3xl md:text-h1">Оформление заказа</h1>
      <CheckoutForm />
    </main>
  );
}
