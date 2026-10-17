'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { setOrderStatus } from '../../actions';
import { cn } from '@/lib/cn';
import { orderStatuses } from './StatusBadge';

export function OrderStatusSelect({ id, status }: { id: string; status: keyof typeof orderStatuses }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) =>
        start(async () => {
          await setOrderStatus(id, e.target.value);
          router.refresh();
        })
      }
      className={cn('cursor-pointer rounded-xl border-0 px-3 py-2 text-sm font-bold', orderStatuses[status].className)}
      aria-label="Статус заказа"
    >
      {Object.entries(orderStatuses).map(([key, s]) => (
        <option key={key} value={key}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
