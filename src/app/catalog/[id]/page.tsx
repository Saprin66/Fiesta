import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '../../../components/ProductCard';
import ProductGallery from '../../../components/ProductGallery';
import { products } from '../../../data/products';
import type { Metadata } from 'next';

// SEO мета-теги для страницы товара
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return { title: 'Товар не найден | Fiesta Store' };
  }

  return {
    title: `${product.name} — купить за ${product.price.toLocaleString('ru-RU')} ₽ | Fiesta Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    notFound();
  }

  // Расчёт скидки
  const discount = product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100) 
    : 0;

  // Похожие товары из той же категории (кроме текущего)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Хлебные крошки */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-amber-600">Главная</Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="hover:text-amber-600">Каталог</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Основной блок товара */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
        
        {/* ЛЕВАЯ ЧАСТЬ: ИНТЕРАКТИВНАЯ ГАЛЕРЕЯ */}
        <ProductGallery 
          images={product.images} 
          productName={product.name}
          discount={discount}
          isNew={product.isNew}
        />

        {/* ПРАВАЯ ЧАСТЬ: ИНФОРМАЦИЯ О ТОВАРЕ */}
        <div>
          {/* Категория */}
          <p className="text-sm text-amber-600 font-semibold mb-2">
            {product.category}
          </p>

          {/* Название */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          {/* Рейтинг (заглушка) */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-amber-500">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className="text-sm text-gray-500">4.8 (124 отзыва)</span>
          </div>

          {/* Цена */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
            {product.oldPrice && (
              <p className="text-sm text-green-600 font-semibold">
                Вы экономите {(product.oldPrice - product.price).toLocaleString('ru-RU')} ₽
              </p>
            )}
          </div>

          {/* Наличие */}
          <div className="mb-6">
            {product.inStock ? (
              <p className="flex items-center gap-2 text-green-600 font-semibold">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                В наличии
              </p>
            ) : (
              <p className="flex items-center gap-2 text-red-600 font-semibold">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Под заказ (7-14 дней)
              </p>
            )}
          </div>

          {/* Краткое описание */}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="flex-1 px-6 py-4 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors">
              🛒 В корзину
            </button>
            <button className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-amber-600 hover:text-amber-600 transition-colors">
              ♡ В избранное
            </button>
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
              <span>Гарантия {product.characteristics.warranty || '3 года'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Описание и характеристики */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Полное описание */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Описание
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.fullDescription}
          </p>
        </div>

        {/* Характеристики */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Характеристики
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-3">
            {product.characteristics.width && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Ширина</span>
                <span className="font-semibold text-gray-900">{product.characteristics.width}</span>
              </div>
            )}
            {product.characteristics.height && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Высота</span>
                <span className="font-semibold text-gray-900">{product.characteristics.height}</span>
              </div>
            )}
            {product.characteristics.depth && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Глубина</span>
                <span className="font-semibold text-gray-900">{product.characteristics.depth}</span>
              </div>
            )}
            {product.characteristics.material && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Материал</span>
                <span className="font-semibold text-gray-900">{product.characteristics.material}</span>
              </div>
            )}
            {product.characteristics.upholstery && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Обивка</span>
                <span className="font-semibold text-gray-900">{product.characteristics.upholstery}</span>
              </div>
            )}
            {product.characteristics.mechanism && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Механизм</span>
                <span className="font-semibold text-gray-900">{product.characteristics.mechanism}</span>
              </div>
            )}
            {product.characteristics.weight && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Вес</span>
                <span className="font-semibold text-gray-900">{product.characteristics.weight}</span>
              </div>
            )}
            {product.characteristics.country && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Страна</span>
                <span className="font-semibold text-gray-900">{product.characteristics.country}</span>
              </div>
            )}
            {product.characteristics.warranty && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Гарантия</span>
                <span className="font-semibold text-gray-900">{product.characteristics.warranty}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Похожие товары */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Похожие товары
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}