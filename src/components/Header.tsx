'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Логотип */}
        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition-colors">
          Fiesta Store
        </Link>

        {/* Десктопное меню (скрыто на мобильных) */}
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <li>
              <Link 
                href="/" 
                onClick={closeMobileMenu}
                className={`font-medium transition-colors ${
                  pathname === '/' 
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link 
                href="/catalog" 
                onClick={closeMobileMenu}
                className={`font-medium transition-colors ${
                  pathname === '/catalog' 
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Каталог
              </Link>
            </li>
            <li>
              <Link 
                href="/showroom" 
                onClick={closeMobileMenu}
                className={`font-medium transition-colors ${
                  pathname === '/showroom' 
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Шоу-рум
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                onClick={closeMobileMenu}
                className={`font-medium transition-colors ${
                  pathname === '/about' 
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                О нас
              </Link>
            </li>
            <li>
              <Link 
                href="/contacts" 
                onClick={closeMobileMenu}
                className={`font-medium transition-colors ${
                  pathname === '/contacts' 
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Контакты
              </Link>
            </li>
          </ul>
        </nav>

        {/* Корзина (видна всегда) */}
        <Link 
          href="/cart" 
          className={`hidden md:flex items-center gap-2 font-medium transition-colors ${
            pathname === '/cart' 
              ? 'text-amber-600' 
              : 'text-gray-700 hover:text-amber-600'
          }`}
        >
          <span className="text-xl">🛒</span>
          <span>Корзина</span>
        </Link>

        {/* Бургер-кнопка (видна только на мобильных) */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Открыть меню"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}></span>
        </button>
      </div>

      {/* Мобильное меню (выезжает сверху) */}
      <div className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <nav className="px-4 py-4">
          <ul className="space-y-3">
            <li>
              <Link 
                href="/" 
                onClick={closeMobileMenu}
                className={`block py-2 font-medium transition-colors ${
                  pathname === '/' 
                    ? 'text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link 
                href="/catalog" 
                onClick={closeMobileMenu}
                className={`block py-2 font-medium transition-colors ${
                  pathname === '/catalog' 
                    ? 'text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Каталог
              </Link>
            </li>
            <li>
              <Link 
                href="/showroom" 
                onClick={closeMobileMenu}
                className={`block py-2 font-medium transition-colors ${
                  pathname === '/showroom' 
                    ? 'text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Шоу-рум
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                onClick={closeMobileMenu}
                className={`block py-2 font-medium transition-colors ${
                  pathname === '/about' 
                    ? 'text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                О нас
              </Link>
            </li>
            <li>
              <Link 
                href="/contacts" 
                onClick={closeMobileMenu}
                className={`block py-2 font-medium transition-colors ${
                  pathname === '/contacts' 
                    ? 'text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Контакты
              </Link>
            </li>
            <li className="pt-3 border-t border-gray-200">
              <Link 
                href="/cart" 
                onClick={closeMobileMenu}
                className={`flex items-center gap-2 py-2 font-medium transition-colors ${
                  pathname === '/cart' 
                    ? 'text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                <span className="text-xl">🛒</span>
                <span>Корзина</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}