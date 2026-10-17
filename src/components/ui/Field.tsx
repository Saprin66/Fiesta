import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export const inputClass =
  'w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-ink placeholder:text-gray-400 ' +
  'transition-colors duration-200 focus:border-primary focus:outline-none';

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, required, error, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-sm text-error">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(inputClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(inputClass, 'resize-none', className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<'select'>) {
  return <select className={cn(inputClass, 'cursor-pointer appearance-none pr-10', className)} {...props} />;
}
