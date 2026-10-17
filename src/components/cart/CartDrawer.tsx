'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, X } from 'lucide-react';
import { useEffect } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { cartTotals, useCart } from '@/lib/cart-store';
import { canOptimize, formatPrice } from '@/lib/format';
import { useMounted } from '@/lib/use-mounted';
import { QtyControl } from './QtyControl';

export function CartDrawer() {
  const mounted = useMounted();
  const { items, isOpen, close, remove, setQty } = useCart();
  const pathname = usePathname();
  const { count, total } = cartTotals(items);

  useEffect(() => close(), [pathname, close]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Корзина">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={close} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-xl">Корзина {count > 0 && <span className="text-muted">({count})</span>}</h2>
          <button onClick={close} className="-m-2 rounded-full p-2 text-muted hover:bg-gray-100 hover:text-ink" aria-label="Закрыть корзину">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft text-primary">
              <ShoppingBag size={36} />
            </div>
            <p className="text-lg font-semibold">В корзине пока пусто</p>
            <p className="text-muted">Загляните в каталог, там много интересного</p>
            <ButtonLink href="/catalog" className="mt-2">
              Перейти в каталог
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-5">
                  <Link
                    href={`/${item.isShowroom ? 'showroom' : 'catalog'}/${item.slug}`}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100"
                  >
                    {item.image && <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" unoptimized={!canOptimize(item.image)} />}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 font-semibold leading-snug">{item.name}</p>
                      <button
                        onClick={() => remove(item.productId)}
                        className="-mr-1 shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-error"
                        aria-label={`Удалить ${item.name}`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QtyControl
                        value={item.qty}
                        max={item.isShowroom ? 1 : 99}
                        onChange={(qty) => setQty(item.productId, qty)}
                        size="sm"
                      />
                      <span className="font-bold">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-line px-6 py-6">
              <div className="flex items-center justify-between text-lg">
                <span className="text-muted">Итого</span>
                <span className="text-2xl font-extrabold">{formatPrice(total)}</span>
              </div>
              <ButtonLink href="/checkout" size="lg" className="w-full">
                Оформить заказ
              </ButtonLink>
              <ButtonLink href="/cart" variant="ghost" className="w-full">
                Перейти в корзину
              </ButtonLink>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
