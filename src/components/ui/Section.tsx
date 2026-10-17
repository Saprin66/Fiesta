import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
      )}
    >
      <div className={cn(align === 'center' && 'max-w-2xl')}>
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
        )}
        <h2 className="text-3xl md:text-h2">{title}</h2>
        {description && <p className="mt-3 text-lg text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ href?: string; label: string }> }) {
  return (
    <nav aria-label="Хлебные крошки" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-gray-300">/</span>}
          {item.href ? (
            <a href={item.href} className="transition-colors hover:text-primary">
              {item.label}
            </a>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
