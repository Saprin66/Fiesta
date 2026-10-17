import { cn } from '@/lib/cn';

export const orderStatuses = {
  NEW: { label: 'Новый', className: 'bg-accent/10 text-accent' },
  CONFIRMED: { label: 'Подтверждён', className: 'bg-sky-100 text-sky-700' },
  DELIVERING: { label: 'Доставка', className: 'bg-secondary/15 text-secondary' },
  DONE: { label: 'Выполнен', className: 'bg-success/10 text-success' },
  CANCELLED: { label: 'Отменён', className: 'bg-gray-100 text-gray-500' },
} as const;

export function StatusBadge({ status }: { status: keyof typeof orderStatuses }) {
  const s = orderStatuses[status];
  return <span className={cn('rounded-lg px-2.5 py-1 text-xs font-bold', s.className)}>{s.label}</span>;
}
