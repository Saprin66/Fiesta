import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        {/* Основная сетка подвала */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Колонка 1: О бренде */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Fiesta Store</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Создаем уют в вашем доме с 2015 года. Качественная мебель от проверенных производителей с доставкой по всей России.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Навигация</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Главная</Link></li>
              <li><Link href="/catalog" className="hover:text-amber-500 transition-colors">Каталог</Link></li>
              <li><Link href="/about" className="hover:text-amber-500 transition-colors">О нас</Link></li>
              <li><Link href="/contacts" className="hover:text-amber-500 transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Колонка 3: Контакты */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>г. Москва, ул. Мебельная, д. 15</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+74951234567" className="hover:text-amber-500 transition-colors">+7 (495) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:info@fiesta-store.ru" className="hover:text-amber-500 transition-colors">info@fiesta-store.ru</a>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Соцсети */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Мы в соцсетях</h4>
            <div className="flex gap-4">
              <a href="https://t.me/fiestastore" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-amber-600 transition-colors">
                <span className="text-xl">✈️</span>
              </a>
              <a href="https://vk.com/fiestastore" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-amber-600 transition-colors">
                <span className="text-xl">💬</span>
              </a>
              <a href="https://instagram.com/fiestastore" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-amber-600 transition-colors">
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя полоса (Copyright и ссылки) */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} Fiesta Store. Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Пользовательское соглашение</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}