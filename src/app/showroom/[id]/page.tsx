import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { showroomProducts } from '../../../data/products';
import type { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const product = showroomProducts.find(p => p.id === Number(id));
  
  if (!product) {
    return { title: 'Витринный товар не найден | Fiesta Store' };
  }

  const discount = Math.round((1 - product.showroomPrice / product.originalPrice) * 100);

  return {
    title: `${product.name} — витринный экземпляр со скидкой ${discount}% | Fiesta Store`,
    description: product.description,
  };
}

export default async function ShowroomProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = showroomProducts.find(p => p.id === Number(id));

  if (!product) {
    notFound();
  }

  const discount = Math.round((1 - product.showroomPrice / product.originalPrice) * 100);
  const savings = product.originalPrice - product.showroomPrice;

  // Цвета для состояния
  const conditionColors = {
    'Новое': 'bg-green-100 text-green-800 border-green-200',
    'Следы использования': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Мелкие царапины': 'bg-orange-100 text-orange-800 border-orange-200',
    'Без упаковки': 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Хлебные крошки */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-amber-600">Главная</Link>
        <span className="mx-2">/</span>
        <Link href="/showroom" className="hover:text-amber-600">Витринные экземпляры</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Основной блок */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
        
        {/* Изображение */}
        <div>
          <div className="relative h-96 md:h-[500px] w-full rounded-2xl overflow-hidden bg-gray-100">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Бейдж скидки */}
            <span className="absolute top-4 left-4 bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-md">
              -{discount}%
            </span>

            {/* Бейдж "Последний" */}
            {product.isLast && (
              <span className="absolute top-4 right-4 bg-amber-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md animate-pulse">
                🔥 Последний экземпляр!
              </span>
            )}

            {/* Бейдж "Витринный" */}
            <span className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-lg">
              🏷️ Витринный экземпляр
            </span>
          </div>
        </div>

        {/* Информация */}
        <div>
          <p className="text-sm text-amber-600 font-semibold mb-2">
            {product.category}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          {/* Цена */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-red-600">
                {product.showroomPrice.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-xl text-gray-400 line-through">
                {product.originalPrice.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <p className="text-lg text-green-600 font-bold">
              💰 Вы экономите {savings.toLocaleString('ru-RU')} ₽
            </p>
          </div>

          {/* Состояние */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Состояние:</h3>
            <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-lg border ${conditionColors[product.condition]}`}>
              {product.condition}
            </span>
          </div>

          {/* Причина скидки */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="text-sm font-semibold text-amber-900 mb-1">💡 Причина скидки:</h3>
            <p className="text-amber-800">{product.discountReason}</p>
          </div>

          {/* Описание */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Описание:</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="flex-1 px-6 py-4 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors">
              🛒 Забронировать
            </button>
            <a 
              href="tel:+74951234567"
              className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-amber-600 hover:text-amber-600 transition-colors text-center"
            >
              📞 Позвонить
            </a>
          </div>

          {/* Преимущества */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xl">🚚</span>
              <span>Доставка 1-3 дня</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xl">🔧</span>
              <span>Сборка в подарок</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xl">💳</span>
              <span>Рассрочка 0%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xl">🛡️</span>
              <span>Гарантия 1 год</span>
            </div>
          </div>
        </div>
      </div>

      {/* Важная информация */}
      <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8 mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          ℹ️ Важная информация о витринных экземплярах
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>На все витринные экземпляры распространяется гарантия производителя</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Вы можете приехать в шоу-рум и осмотреть товар перед покупкой</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Бронь действует 3 дня, в течение которых нужно оформить заказ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Возврат возможен в течение 14 дней при сохранении товарного вида</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Доставка и сборка — как для обычных товаров</span>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Остались вопросы?
        </h2>
        <p className="text-gray-600 mb-6">
          Наши менеджеры расскажут все подробности и помогут с оформлением
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contacts" 
            className="px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
          >
            Связаться с нами
          </Link>
          <Link 
            href="/showroom" 
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-amber-600 hover:text-amber-600 transition-colors"
          >
            Все витринные товары
          </Link>
        </div>
      </section>
    </main>
  );
}