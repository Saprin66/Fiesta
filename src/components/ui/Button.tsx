import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'dark' | 'white';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/30 hover:shadow-md hover:shadow-primary/30',
  secondary: 'border-2 border-primary text-primary hover:bg-primary/10',
  accent: 'bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/30',
  ghost: 'text-ink hover:bg-black/5',
  dark: 'bg-ink text-white hover:bg-black',
  white: 'bg-white text-ink hover:bg-white/90 shadow-sm',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function buttonClass({ variant = 'primary', size = 'md', className }: Omit<BaseProps, 'children'>) {
  return cn(
    'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap select-none',
    'transition-all duration-300 ease-out active:scale-[0.98]',
    'disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({ variant, size, className, children, ...props }: BaseProps & ComponentProps<'button'>) {
  return (
    <button className={buttonClass({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
