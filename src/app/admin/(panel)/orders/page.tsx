import { prisma } from '@/lib/db';
import { formatPrice } from '@/lib/format';
import { OrderStatusSelect } from './OrderStatusSelect';
import { orderStatuses } from './StatusBadge';

export default async function AdminOrders({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const valid = status && status in orderStatuses ? (status as keyof typeof orderStatuses) : undefined;
  const orders = await prisma.order.findMany({
    where: valid ? { status: valid } : undefined,
    include: { items: true },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl">Заказы</h1>
      <div className="mb-6 flex flex-wrap gap-2">
        <a href="/admin/orders" className={`rounded-full px-4 py-2 text-sm font-medium ${!valid ? 'bg-ink text-white' : 'bg-white shadow-card'}`}>
          Все
        </a>
        {Object.entries(orderStatuses).map(([key, s]) => (
          <a key={key} href={`/admin/orders?status=${key}`} className={`rounded-full px-4 py-2 text-sm font-medium ${valid === key ? 'bg-ink text-white' : 'bg-white shadow-card'}`}>
            {s.label}
          </a>
        ))}
      </div>
      {orders.length === 0 && <p className="rounded-2xl bg-white p-6 text-muted shadow-card">Заказов нет</p>}
      <div className="space-y-4">
        {orders.map((o) => (
          <article key={o.id} id={`order-${o.number}`} className="scroll-mt-6 rounded-2xl bg-white p-6 shadow-card">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-lg font-bold">Заказ №{o.number}</p>
                <p className="text-sm text-muted">{o.createdAt.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</p>
              </div>
              <OrderStatusSelect id={o.id} status={o.status} />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <dl className="space-y-1 text-sm">
                <div><dt className="inline text-muted">Клиент: </dt><dd className="inline font-medium">{o.customerName}</dd></div>
                <div><dt className="inline text-muted">Телефон: </dt><dd className="inline"><a href={`tel:${o.phone}`} className="font-medium text-primary">{o.phone}</a></dd></div>
                {o.email && <div><dt className="inline text-muted">Email: </dt><dd className="inline">{o.email}</dd></div>}
                <div><dt className="inline text-muted">Получение: </dt><dd className="inline">{o.delivery === 'pickup' ? 'Самовывоз' : `Доставка: ${o.address ?? ''}`}</dd></div>
                {o.comment && <div><dt className="inline text-muted">Комментарий: </dt><dd className="inline">{o.comment}</dd></div>}
              </dl>
              <div>
                <ul className="space-y-1 text-sm">
                  {o.items.map((i) => (
                    <li key={i.id} className="flex justify-between gap-4">
                      <span>{i.name} × {i.qty}</span>
                      <span className="font-medium">{formatPrice(i.price * i.qty)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex justify-between border-t border-line pt-3 font-bold">
                  <span>Итого</span>
                  <span>{formatPrice(o.total)}</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
