'use server';

import { prisma } from '@/lib/db';
import { fieldErrors, leadSchema, orderSchema, reviewSchema, type FieldErrors } from '@/lib/validation';

export type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; errors: FieldErrors; message?: string };

export async function createLead(input: unknown): Promise<ActionResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  await prisma.lead.create({ data: parsed.data });
  return { ok: true };
}

export async function createOrder(input: unknown): Promise<ActionResult<{ number: number }>> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const { items, ...customer } = parsed.data;
  if (customer.delivery === 'delivery' && !customer.address) {
    return { ok: false, errors: { address: 'Укажите адрес доставки' } };
  }

  // Цены и наличие берём из базы, а не из корзины в браузере
  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) }, published: true },
    select: { id: true, name: true, price: true, isShowroom: true },
  });
  const byId = new Map(products.map((p) => [p.id, p]));
  const missing = items.filter((i) => !byId.has(i.productId));
  if (missing.length > 0) {
    return {
      ok: false,
      errors: { items: 'Некоторые товары больше недоступны. Обновите корзину.' },
      message: 'unavailable:' + missing.map((m) => m.productId).join(','),
    };
  }

  const lines = items.map((i) => {
    const p = byId.get(i.productId)!;
    return { productId: p.id, name: p.name, price: p.price, qty: p.isShowroom ? 1 : i.qty };
  });
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

  const order = await prisma.order.create({
    data: { ...customer, total, items: { create: lines } },
    select: { number: true },
  });
  return { ok: true, data: { number: order.number } };
}

export async function createReview(input: unknown): Promise<ActionResult> {
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  // Отзыв появится на сайте после проверки в админке
  await prisma.review.create({ data: { ...parsed.data, approved: false } });
  return { ok: true };
}
