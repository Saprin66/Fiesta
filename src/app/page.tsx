import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '../data/products';

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

      {/* 4. ПРЕИМУЩЕСТВА */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Почему выбирают Fiesta Store
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Быстрая доставка</h3>
              <p className="text-gray-600">
                Доставим и соберем мебель в удобное для вас время. Бережно и аккуратно.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Гарантия 24 месяца</h3>
              <p className="text-gray-600">
                Мы уверены в качестве нашей мебели и даем расширенную гарантию на все товары.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Рассрочка 0%</h3>
              <p className="text-gray-600">
                Покупайте сейчас, платите потом. Оформите рассрочку без переплат за 5 минут.
              </p>
            </div>

               <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">бесплатная разработка дизайн-проекта</h3>
              <p className="text-gray-600">
                Мы бесплатно разработаем индивидуальный дизайн-проект и рассчитаем точную стоимость. Выберите любой удобный способ коммуникации.
              </p>
            </div>

                <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏭</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">собственное автоматизированное производство</h3>
              <p className="text-gray-600">
                Мы не зависим от посредников и полностью контролируем каждый этап создания вашего продукта.
              </p>
            </div>


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