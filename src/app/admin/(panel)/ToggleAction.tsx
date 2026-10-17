'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { useTransition } from 'react';
import { deleteReview, setLeadHandled, setReviewApproved } from '../actions';
import { cn } from '@/lib/cn';

export function ToggleAction({
  kind,
  id,
  value,
  onLabel,
  offLabel,
}: {
  kind: 'lead' | 'review' | 'review-delete';
  id: string;
  value: boolean;
  onLabel: string;
  offLabel: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const run = () =>
    start(async () => {
      if (kind === 'lead') await setLeadHandled(id, !value);
      if (kind === 'review') await setReviewApproved(id, !value);
      if (kind === 'review-delete') {
        if (!confirm('Удалить отзыв?')) return;
        await deleteReview(id);
      }
      router.refresh();
    });

  return (
    <button
      onClick={run}
      disabled={pending}
      className={cn(
        'flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50',
        kind === 'review-delete'
          ? 'text-error hover:bg-error/10'
          : value
            ? 'bg-success/10 text-success hover:bg-success/20'
            : 'bg-primary text-white hover:bg-primary-hover',
      )}
    >
      {value && kind !== 'review-delete' && <Check size={16} />}
      {value ? onLabel : offLabel}
    </button>
  );
}
