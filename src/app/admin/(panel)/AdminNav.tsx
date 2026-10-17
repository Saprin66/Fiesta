'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, FolderTree, Inbox, LayoutDashboard, LogOut, MessageSquareQuote, Package, ShoppingCart } from 'lucide-react';
import { logoutAction } from '../actions';
import { cn } from '@/lib/cn';

export function AdminNav({ email, counters }: { email: string; counters: { orders: number; leads: number; reviews: number } }) {
  const pathname = usePathname();
  const items = [
    { href: '/admin', label: 'Обзор', icon: LayoutDashboard, exact: true },
    { href: '/admin/products', label: 'Товары', icon: Package },
    { href: '/admin/categories', label: 'Категории', icon: FolderTree },
    { href: '/admin/orders', label: 'Заказы', icon: ShoppingCart, count: counters.orders },
    { href: '/admin/leads', label: 'Заявки', icon: Inbox, count: counters.leads },
    { href: '/admin/reviews', label: 'Отзывы', icon: MessageSquareQuote, count: counters.reviews },
  ];

  return (
    <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-4 py-4 lg:px-6 lg:py-6">
        <Link href="/admin" className="text-lg font-extrabold">
          Fiesta<span className="text-primary">Admin</span>
        </Link>
        <Link href="/" target="_blank" className="flex items-center gap-1 text-sm text-muted hover:text-primary">
          Сайт <ExternalLink size={14} />
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-2 pb-3 lg:flex-1 lg:flex-col lg:px-3 lg:pb-0">
        {items.map(({ href, label, icon: Icon, count, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'bg-primary-soft text-primary' : 'text-gray-700 hover:bg-gray-50',
              )}
            >
              <Icon size={18} />
              {label}
              {!!count && <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">{count}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="hidden border-t border-line p-4 lg:block">
        <p className="mb-3 truncate text-sm text-muted">{email}</p>
        <form action={logoutAction}>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-error">
            <LogOut size={16} /> Выйти
          </button>
        </form>
      </div>
    </aside>
  );
}
