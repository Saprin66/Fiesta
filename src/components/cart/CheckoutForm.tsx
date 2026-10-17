'use client';

import Image from 'next/image';
import { CheckCircle2, Loader2, Store, Truck } from 'lucide-react';
import { useState, useTransition } from 'react';
import { createOrder } from '@/app/actions';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Field, Input, Textarea } from '@/components/ui/Field';
import { cartTotals, useCart } from '@/lib/cart-store';
import { cn } from '@/lib/cn';
import { canOptimize, formatPrice } from '@/lib/format';
import { site } from '@/lib/site';
import { useMounted } from '@/lib/use-mounted';
import type { FieldErrors } from '@/lib/validation';

export function CheckoutForm() {
  const mounted = useMounted();
  const { items, clear, remove } = useCart();
  const { total } = cartTotals(items);
  const [delivery, setDelivery] = useState<'delivery' | 'pickup'>('delivery');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [pending, startTransition] = useTransition();

  if (!mounted) return <div className="skeleton h-96 rounded-3xl" />;

  if (orderNumber) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl bg-white px-6 py-16 text-center shadow-card animate-scale-in">
        <CheckCircle2 size={64} className="mb-6 text-success" />
        <h2 className="mb-3 text-h3">Заказ №{orderNumber} принят</h2>
        <p className="mb-8 text-muted">
          Менеджер позвонит вам в рабочее время ({site.hours.toLowerCase()}), чтобы подтвердить заказ, доставку и оплату.
        </p>
        <ButtonLink href="/catalog">Продолжить покупки</ButtonLink>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-white px-6 py-16 text-center shadow-card">
        <p className="mb-6 text-xl font-semibold">В корзине нет товаров</p>
        <ButtonLink href="/catalog">Перейти в каталог</ButtonLink>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      const result = await createOrder({
        ...data,
        delivery,
        items: items.map((i) => ({ productId: i.productId, qty: i.qty })),
      });
      if (result.ok) {
        setOrderNumber(result.data!.number);
        clear();
      } else {
        setErrors(result.errors);
        if (result.message?.startsWith('unavailable:')) {
          result.message.slice('unavailable:'.length).split(',').forEach(remove);
        }
      }
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid items-start gap-8 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <section className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
          <h2 className="mb-6 text-xl">Контактные данные</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Имя" htmlFor="customerName" required error={errors.customerName}>
              <Input id="customerName" name="customerName" autoComplete="name" placeholder="Иван Иванов" />
            </Field>
            <Field label="Телефон" htmlFor="phone" required error={errors.phone}>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+7 900 123-45-67" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email" htmlFor="email" error={errors.email} hint="Пришлём копию заказа, если укажете">
                <Input id="email" name="email" type="email" autoComplete="email" placeholder="example@mail.ru" />
              </Field>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
          <h2 className="mb-6 text-xl">Получение</h2>
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {[
              { value: 'delivery' as const, icon: Truck, title: 'Доставка и сборка', text: 'Бесплатно от 50 000 ₽' },
              { value: 'pickup' as const, icon: Store, title: 'Самовывоз', text: `${site.address}, ${site.addressNote}` },
            ].map((o) => (
              <button
                type="button"
                key={o.value}
                onClick={() => setDelivery(o.value)}
                className={cn(
                  'flex gap-4 rounded-2xl border-2 p-4 text-left transition-colors',
                  delivery === o.value ? 'border-primary bg-primary-soft' : 'border-gray-200 hover:border-gray-300',
                )}
                aria-pressed={delivery === o.value}
              >
                <o.icon size={24} className={delivery === o.value ? 'text-primary' : 'text-gray-400'} />
                <span>
                  <span className="block font-semibold">{o.title}</span>
                  <span className="text-sm text-muted">{o.text}</span>
                </span>
              </button>
            ))}
          </div>
          {delivery === 'delivery' && (
            <div className="mb-5">
              <Field label="Адрес доставки" htmlFor="address" required error={errors.address}>
                <Input id="address" name="address" autoComplete="street-address" placeholder="Город, улица, дом, квартира" />
              </Field>
            </div>
          )}
          <Field label="Комментарий" htmlFor="comment" error={errors.comment}>
            <Textarea id="comment" name="comment" rows={3} placeholder="Этаж, наличие лифта, удобное время звонка" />
          </Field>
        </section>
      </div>

      <aside className="rounded-3xl bg-white p-6 shadow-card lg:sticky lg:top-28">
        <h2 className="mb-6 text-xl">Ваш заказ</h2>
        <ul className="mb-6 space-y-4">
          {items.map((i) => (
            <li key={i.productId} className="flex gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                {i.image && <Image src={i.image} alt="" fill sizes="56px" className="object-cover" unoptimized={!canOptimize(i.image)} />}
              </div>
              <div className="min-w-0 flex-1 text-sm">
                <p className="line-clamp-2 font-medium">{i.name}</p>
                <p className="text-muted">{i.qty} шт.</p>
              </div>
              <span className="text-sm font-semibold">{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mb-6 flex items-baseline justify-between border-t border-line pt-6">
          <span className="text-lg font-semibold">Итого</span>
          <span className="text-3xl font-extrabold">{formatPrice(total)}</span>
        </div>
        {errors.items && <p className="mb-4 rounded-xl bg-error/10 p-3 text-sm text-error">{errors.items}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending && <Loader2 size={20} className="animate-spin" />}
          Подтвердить заказ
        </Button>
        <p className="mt-4 text-center text-xs text-muted">
          Оплата после звонка менеджера. Нажимая кнопку, вы соглашаетесь с{' '}
          <a href="/privacy" className="text-primary hover:underline">
            политикой конфиденциальности
          </a>
          .
        </p>
      </aside>
    </form>
  );
}
