import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'primary' | 'accent' | 'success' | 'dark' | 'soft' | 'neutral';

const tones: Record<Tone, string> = {
  primary: 'bg-primary text-white',
  accent: 'bg-accent text-white',
  success: 'bg-success text-white',
  dark: 'bg-ink/85 text-white backdrop-blur-sm',
  soft: 'bg-primary-soft text-primary-hover',
  neutral: 'bg-gray-100 text-gray-700',
};

export function Badge({ tone = 'primary', className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold', tones[tone], className)}>
      {children}
    </span>
  );
}
