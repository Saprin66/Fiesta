import Link from 'next/link';
import { Inbox, MessageSquareQuote, Package, ShoppingCart } from 'lucide-react';
import { prisma } from '@/lib/db';
import { formatPrice } from '@/lib/format';
import { StatusBadge } from './orders/StatusBadge';

export default async function AdminHome() {
  const [products, orders, leads, reviews, recent] = await Promise.all([
    prisma.product.count(),
    prisma.order.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { handled: false } }),
    prisma.review.count({ where: { approved: false } }),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);
  const cards = [
    { href: '/admin/products', label: 'Товаров в каталоге', value: products, icon: Package },
    { href: '/admin/orders', label: 'Новых заказов', value: orders, icon: ShoppingCart },
    { href: '/admin/leads', label: 'Необработанных заявок', value: leads, icon: Inbox },
    { href: '/admin/reviews', label: 'Отзывов на модерации', value: reviews, icon: MessageSquareQuote },
  ];
  return (
    <div>
      <h1 className="mb-8 text-3xl">Обзор</h1>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ href, label, value, icon: Icon }) => (
          <Link key={href} href={href} className="rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
            <Icon size={24} className="mb-4 text-primary" />
            <p className="text-3xl font-extrabold">{value}</p>
            <p className="text-sm text-muted">{label}</p>
          </Link>
        ))}
      </div>
      <h2 className="mb-4 text-xl">Последние заказы</h2>
      {recent.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-muted shadow-card">Заказов пока нет</p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-card">
          {recent.map((o) => (
            <Link key={o.id} href={`/admin/orders#order-${o.number}`} className="flex items-center gap-4 border-b border-line px-6 py-4 last:border-0 hover:bg-gray-50">
              <span className="font-semibold">№{o.number}</span>
              <span className="flex-1 truncate text-muted">{o.customerName}, {o.phone}</span>
              <span className="font-semibold">{formatPrice(o.total)}</span>
              <StatusBadge status={o.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
