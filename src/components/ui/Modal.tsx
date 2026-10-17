'use client';

import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl animate-scale-in sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-h3">{title}</h2>
          <button
            onClick={onClose}
            className="-m-2 rounded-full p-2 text-muted transition-colors hover:bg-gray-100 hover:text-ink"
            aria-label="Закрыть"
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
