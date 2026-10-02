import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '../data/products';
import ReviewCard from '../components/ReviewCard';
import { reviews } from '../data/reviews';

// Берем только первые 4 товара для главной страницы
const featuredProducts = products.slice(0, 4);

export default function Page() {
  return (
    <main>
      {/* 1. HERO СЕКЦИЯ (Главный баннер) */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80" 
            alt="Стильный интерьер гостиной"
            fill
            className="object-cover opacity-40"
            priority // Загружаем это изображение в первую очередь для скорости
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-40 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Создайте уют <br className="hidden md:block" />
            <span className="text-amber-500">своей мечты</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            Премиальная мебель от лучших производителей с доставкой и сборкой. 
            Преобразите свой дом уже сегодня.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/catalog" 
              className="px-8 py-4 bg-amber-600 text-white rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors text-center"
            >
              Перейти в каталог
            </Link>
            <Link 
              href="/contacts" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-colors text-center"
            >
              Заказать консультацию
            </Link>
          </div>
        </div>
      </section>

      {/* 2. КАТЕГОРИИ */}
    {/* ПОПУЛЯРНЫЕ КАТЕГОРИИ */}
<section className="py-16 md:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Популярные категории
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Выберите мебель для любой комнаты — от уютной гостиной до функционального офиса
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[
        { 
          name: 'Диваны', 
          image: '/images/categories/divan-scandi.webp',
          count: '50+ моделей',
          href: '/catalog'
        },
        { 
          name: 'Кровати', 
          image: '/images/categories/krovati.webp',
          count: '30+ моделей',
          href: '/catalog'
        },
        { 
          name: 'Кухни', 
          image: '/images/categories/kitchen.jpg',
          count: '15 решений',
          href: '/catalog'
        },
        { 
          name: 'Шкафы-купе', 
          image: '/images/categories/kupe.jpg',
          count: '40+ вариантов',
          href: '/catalog'
        },
        { 
          name: 'Прихожие', 
          image: '/images/categories/prihoshie.jpg',
          count: '20+ комплектов',
          href: '/catalog'
        },
        { 
          name: 'Гардероб', 
          image: '/images/categories/garderob.jpg',
          count: '25+ систем',
          href: '/catalog'
        },
        { 
          name: 'Детские', 
          image: '/images/categories/kids.webp',
          count: '35+ моделей',
          href: '/catalog'
        },
        { 
          name: 'Для бизнеса', 
          image: '/images/categories/business.webp',
          count: '25+ позиций',
          href: '/catalog'
        },
      ].map((category) => (
        <Link 
          key={category.name}
          href={category.href}
          className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100"
        >
          {/* Фоновая картинка */}
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Градиентный оверлей */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Контент */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-white/90 font-medium">
              {category.count}
            </p>
          </div>

          {/* Hover-эффект: стрелка */}
      
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* 3. ХИТЫ ПРОДАЖ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Хиты продаж
              </h2>
              <p className="text-gray-600">
                Модели, которые выбрали уже тысячи наших клиентов
              </p>
            </div>
            <Link 
              href="/catalog" 
              className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1 group"
            >
              Смотреть все товары 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Сетка товаров (используем наш готовый компонент!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    {/* ПОЧЕМУ ВЫБИРАЮТ НАС */}
<section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
  <div className="max-w-7xl mx-auto px-4">
    {/* Заголовок секции */}
    <div className="text-center mb-14">
      <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
        <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
        Наши преимущества
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
        Почему выбирают <span className="text-amber-600">Fiesta Store</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        10 лет мы помогаем создавать уютные пространства. 
        Вот 6 причин, почему клиенты возвращаются к нам снова
      </p>
    </div>

    {/* Сетка преимуществ */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Карточка 1: Качество */}
      <div className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
        {/* Градиентный фон при наведении */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Содержимое */}
        <div className="relative z-10">
          {/* Иконка */}
          <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500">
            <svg className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          {/* Заголовок */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-500">
            Гарантия качества
          </h3>

          {/* Описание */}
          <p className="text-gray-600 group-hover:text-white/90 leading-relaxed mb-4 transition-colors duration-500">
            Работаем только с проверенными производителями. 
            Каждый товар проходит контроль качества перед отправкой.
          </p>

          {/* Цифра */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-amber-600 group-hover:text-white transition-colors duration-500">
              5
            </span>
            <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500">
              лет гарантии на всю мебель
            </span>
          </div>
        </div>

        {/* Декоративный круг */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-amber-100 group-hover:bg-white/10 rounded-full opacity-50 group-hover:opacity-20 transition-all duration-500"></div>
      </div>

      {/* Карточка 2: Доставка */}
      <div className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500">
            <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-500">
            Быстрая доставка
          </h3>

          <p className="text-gray-600 group-hover:text-white/90 leading-relaxed mb-4 transition-colors duration-500">
            Доставляем по Москве за 1-3 дня. По России — от 5 дней. 
            Бесплатная доставка при заказе от 50 000 ₽.
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600 group-hover:text-white transition-colors duration-500">
              1-3
            </span>
            <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500">
              дня доставка по Москве
            </span>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-blue-100 group-hover:bg-white/10 rounded-full opacity-50 group-hover:opacity-20 transition-all duration-500"></div>
      </div>

      {/* Карточка 3: Сборка */}
      <div className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500">
            <svg className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-500">
            Сборка в подарок
          </h3>

          <p className="text-gray-600 group-hover:text-white/90 leading-relaxed mb-4 transition-colors duration-500">
            Профессиональная сборка мебели входит в стоимость. 
            Наши мастера работают аккуратно и чисто.
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-emerald-600 group-hover:text-white transition-colors duration-500">
              0 ₽
            </span>
            <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500">
              стоимость сборки
            </span>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-100 group-hover:bg-white/10 rounded-full opacity-50 group-hover:opacity-20 transition-all duration-500"></div>
      </div>

      {/* Карточка 4: Рассрочка */}
      <div className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500">
            <svg className="w-8 h-8 text-violet-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-500">
            Рассрочка 0%
          </h3>

          <p className="text-gray-600 group-hover:text-white/90 leading-relaxed mb-4 transition-colors duration-500">
            Покупайте сейчас — платите постепенно. 
            Рассрочка без переплат до 24 месяцев.
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-violet-600 group-hover:text-white transition-colors duration-500">
              0%
            </span>
            <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500">
              переплата до 24 месяцев
            </span>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-violet-100 group-hover:bg-white/10 rounded-full opacity-50 group-hover:opacity-20 transition-all duration-500"></div>
      </div>

      {/* Карточка 5: Шоу-рум */}
      <div className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500">
            <svg className="w-8 h-8 text-rose-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-500">
            Большой шоу-рум
          </h3>

          <p className="text-gray-600 group-hover:text-white/90 leading-relaxed mb-4 transition-colors duration-500">
            Приезжайте, потрогайте, посидите. 
            2000 м² мебели вживую в центре Москвы.
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-rose-600 group-hover:text-white transition-colors duration-500">
              2000
            </span>
            <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500">
              м² площадь шоу-рума
            </span>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-rose-100 group-hover:bg-white/10 rounded-full opacity-50 group-hover:opacity-20 transition-all duration-500"></div>
      </div>

      {/* Карточка 6: Отзывы */}
      <div className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500">
            <svg className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors duration-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-500">
            10 000+ отзывов
          </h3>

          <p className="text-gray-600 group-hover:text-white/90 leading-relaxed mb-4 transition-colors duration-500">
            Нас рекомендуют друзьям и возвращаются сами. 
            Средняя оценка 4.9 из 5 на Яндекс.Картах.
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-yellow-600 group-hover:text-white transition-colors duration-500">
              4.9
            </span>
            <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500">
              из 5 средняя оценка
            </span>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-yellow-100 group-hover:bg-white/10 rounded-full opacity-50 group-hover:opacity-20 transition-all duration-500"></div>
      </div>

    </div>

    {/* CTA под карточками */}
    <div className="text-center mt-12">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-amber-600 transition-colors duration-300 group"
      >
        Выбрать мебель
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  </div>
</section>

      {/* ОТЗЫВЫ КЛИЕНТОВ */}
<section className="py-16 md:py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    {/* Заголовок секции */}
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        4.9 из 5
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Что говорят наши клиенты
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Более 10 000 семей уже обставили свои дома мебелью из Fiesta Store
      </p>
    </div>

    {/* Статистика */}
    <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12 max-w-3xl mx-auto">
      <div className="text-center p-4 bg-white rounded-xl">
        <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">
          10 000+
        </p>
        <p className="text-sm text-gray-600">Довольных клиентов</p>
      </div>
      <div className="text-center p-4 bg-white rounded-xl">
        <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">
          4.9
        </p>
        <p className="text-sm text-gray-600">Средняя оценка</p>
      </div>
      <div className="text-center p-4 bg-white rounded-xl">
        <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">
          98%
        </p>
        <p className="text-sm text-gray-600">Рекомендуют нас</p>
      </div>
    </div>

    {/* Сетка отзывов */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.slice(0, 6).map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>

    {/* Кнопка "Все отзывы" */}
    <div className="text-center mt-10">
      <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-amber-600 hover:text-amber-600 transition-colors">
        Читать все отзывы
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</section>

      {/* 5. ФИНАЛЬНЫЙ ПРИЗЫВ К ДЕЙСТВИЮ (CTA) */}
      <section className="py-16 md:py-24 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Не можете определиться с выбором?
          </h2>
          <p className="text-lg md:text-xl text-amber-100 mb-8">
            Наши дизайнеры бесплатно помогут подобрать мебель, которая идеально впишется в ваш интерьер и бюджет.
          </p>
          <Link 
            href="/contacts" 
            className="inline-block px-10 py-4 bg-white text-amber-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Получить бесплатную консультацию
          </Link>
        </div>
      </section>
    </main>
  );
}