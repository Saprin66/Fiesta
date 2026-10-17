'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { cartTotals, useCart } from '@/lib/cart-store';
import { canOptimize, formatPrice, pluralize } from '@/lib/format';
import { useMounted } from '@/lib/use-mounted';
import { QtyControl } from './QtyControl';

export function CartView() {
  const mounted = useMounted();
  const { items, remove, setQty, clear } = useCart();
  const { count, total } = cartTotals(items);

  if (!mounted) {
    return (
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="skeleton h-64 rounded-3xl lg:col-span-2" />
        <div className="skeleton h-64 rounded-3xl" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-white px-6 py-20 text-center shadow-card animate-fade-in">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft text-primary">
          <ShoppingBag size={36} />
        </div>
        <p className="mb-2 text-2xl font-bold">Корзина пуста</p>
        <p className="mb-8 text-muted">Добавьте товары из каталога, и они сохранятся здесь даже после закрытия вкладки</p>
        <ButtonLink href="/catalog">Перейти в каталог</ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-3">
      <div className="rounded-3xl bg-white p-2 shadow-card sm:p-4 lg:col-span-2">
        <ul className="divide-y divide-line">
          {items.map((item) => {
            const href = `/${item.isShowroom ? 'showroom' : 'catalog'}/${item.slug}`;
            return (
              <li key={item.productId} className="flex gap-4 p-4 animate-fade-in">
                <Link href={href} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-28 sm:w-28">
                  {item.image && <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" unoptimized={!canOptimize(item.image)} />}
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <Link href={href} className="font-semibold transition-colors hover:text-primary">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      {formatPrice(item.price)} за шт.{item.isShowroom && ' · витринный образец'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <QtyControl value={item.qty} max={item.isShowroom ? 1 : 99} onChange={(q) => setQty(item.productId, q)} />
                    <span className="w-28 text-right text-lg font-bold">{formatPrice(item.price * item.qty)}</span>
                    <button
                      onClick={() => remove(item.productId)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-error"
                      aria-label={`Удалить ${item.name}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="px-4 pb-2 pt-4">
          <button onClick={clear} className="text-sm font-medium text-muted transition-colors hover:text-error">
            Очистить корзину
          </button>
        </div>
      </div>

      <aside className="rounded-3xl bg-white p-6 shadow-card lg:sticky lg:top-28">
        <h2 className="mb-6 text-xl">Ваш заказ</h2>
        <div className="space-y-3 border-b border-line pb-6 text-muted">
          <div className="flex justify-between">
            <span>
              {count} {pluralize(count, ['товар', 'товара', 'товаров'])}
            </span>
            <span className="text-ink">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between">
            <span>Сборка</span>
            <span className="text-success">бесплатно</span>
          </div>
          <div className="flex justify-between">
            <span>Доставка</span>
            <span className="text-ink">{total >= 50000 ? <span className="text-success">бесплатно</span> : 'рассчитает менеджер'}</span>
          </div>
        </div>
        <div className="my-6 flex items-baseline justify-between">
          <span className="text-lg font-semibold">Итого</span>
          <span className="text-3xl font-extrabold">{formatPrice(total)}</span>
        </div>
        <ButtonLink href="/checkout" size="lg" className="w-full">
          Оформить заказ
        </ButtonLink>
        <p className="mt-4 text-center text-sm text-muted">Оплата после подтверждения заказа менеджером</p>
      </aside>
    </div>
  );
}
