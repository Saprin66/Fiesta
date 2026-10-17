'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cartTotals, useCart } from '@/lib/cart-store';
import { useMounted } from '@/lib/use-mounted';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mounted = useMounted();
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const { count } = cartTotals(items);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/85 shadow-sm backdrop-blur-md' : 'bg-white',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="flex items-center gap-2" aria-label="Fiesta Store — на главную">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-lg font-black text-white">
            F
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Fiesta<span className="text-primary">Store</span>
          </span>
        </Link>

        <nav className="hidden md:block" aria-label="Основное меню">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative rounded-lg px-4 py-2 font-medium transition-colors duration-200',
                    isActive(item.href) ? 'text-primary' : 'text-gray-700 hover:text-primary',
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phones[0].href}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-primary lg:flex"
          >
            <Phone size={18} />
            {site.phones[0].label}
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              openCart();
            }}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-gray-100"
            aria-label={`Корзина, товаров: ${mounted ? count : 0}`}
          >
            <ShoppingBag size={22} />
            {mounted && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white animate-scale-in">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 md:hidden"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden border-t border-line bg-white transition-all duration-300 md:hidden',
          menuOpen ? 'max-h-[28rem]' : 'max-h-0 border-transparent',
        )}
      >
        <nav className="container-page py-4" aria-label="Мобильное меню">
          <ul className="space-y-1">
            {[{ href: '/', label: 'Главная' }, ...site.nav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'block rounded-xl px-4 py-3 font-medium transition-colors',
                    (item.href === '/' ? pathname === '/' : isActive(item.href))
                      ? 'bg-primary-soft text-primary'
                      : 'text-gray-700 hover:bg-gray-50',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.phones[0].href} className="mt-3 flex items-center gap-2 px-4 py-3 font-semibold text-ink">
            <Phone size={18} className="text-primary" />
            {site.phones[0].label}
          </a>
        </nav>
      </div>
    </header>
  );
}
