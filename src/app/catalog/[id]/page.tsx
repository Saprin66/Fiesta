import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '../../../components/ProductCard';
import { products } from '../../../data/products';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return { title: 'Товар не найден | Fiesta Store' };
  }

  return {
    title: `${product.name} — купить за ${product.price.toLocaleString('ru-RU')} ₽ | Fiesta Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    notFound();
  }

  const discount = product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100) 
    : 0;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-amber-600">Главная</Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="hover:text-amber-600">Каталог</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
        <div>
          <div className="relative h-96 md:h-[500px] w-full rounded-2xl overflow-hidden bg-gray-100 mb-4">
            <Image 
              src={product.images[0]} 
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                -{discount}%
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                Новинка
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <div 
                  key={index}
                  className={`relative h-20 md:h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    index === 0 ? 'border-amber-600' : 'border-transparent hover:border-amber-600'
                  } bg-gray-100`}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} - фото ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-amber-600 font-semibold mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

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

          <div className="mb-6">
            {product.inStock ? (
              <p className="flex items-center gap-2 text-green-600 font-semibold">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                В наличии
              </p>
            ) : (
              <p className="flex items-center gap-2 text-red-600 font-semibold">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Под заказ
              </p>
            )}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="flex-1 px-6 py-4 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors">
              🛒 В корзину
            </button>
            <button className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-amber-600 hover:text-amber-600 transition-colors">
              ♡ В избранное
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm"><span>🚚</span><span>Доставка 1-3 дня</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🔧</span><span>Сборка в подарок</span></div>
            <div className="flex items-center gap-2 text-sm"><span>💳</span><span>Рассрочка 0%</span></div>
            <div className="flex items-center gap-2 text-sm"><span>🛡️</span><span>Гарантия {product.characteristics.warranty || '3 года'}</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.fullDescription}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Характеристики</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-3">
            {product.characteristics.width && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Ширина</span>
                <span className="font-semibold">{product.characteristics.width}</span>
              </div>
            )}
            {product.characteristics.height && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Высота</span>
                <span className="font-semibold">{product.characteristics.height}</span>
              </div>
            )}
            {product.characteristics.depth && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Глубина</span>
                <span className="font-semibold">{product.characteristics.depth}</span>
              </div>
            )}
            {product.characteristics.material && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Материал</span>
                <span className="font-semibold">{product.characteristics.material}</span>
              </div>
            )}
            {product.characteristics.country && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Страна</span>
                <span className="font-semibold">{product.characteristics.country}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Похожие товары</h2>
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