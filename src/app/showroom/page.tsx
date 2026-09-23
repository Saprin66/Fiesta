import Link from 'next/link';
import ShowroomProductCard from '../../components/ShowroomProductCard';
import { showroomProducts } from '../../data/products';

export default function ShowroomPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Hero-секция */}
      <section className="text-center mb-12 md:mb-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12">
        <div className="text-5xl mb-4">🏷️</div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
          Витринные экземпляры
        </h1>
        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Качественная мебель со скидкой до 50%. Экспонаты шоу-рума, товары без упаковки 
          и модели, снятые с производства.
        </p>
        <p className="text-sm text-amber-700 font-semibold">
          🔥 Товары ограничены — успейте забрать лучшие предложения!
        </p>
      </section>

      {/* Преимущества */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          Почему стоит купить витринный экземпляр?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Скидки до 50%</h3>
            <p className="text-sm text-gray-600">
              Экономьте значительные суммы на качественной мебели
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Гарантия качества</h3>
            <p className="text-sm text-gray-600">
              Полная гарантия производителя, как на новый товар
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👀</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Честное состояние</h3>
            <p className="text-sm text-gray-600">
              Подробно описываем все нюансы каждого экземпляра
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Быстрая доставка</h3>
            <p className="text-sm text-gray-600">
              Товары в наличии — доставим в течение 1-3 дней
            </p>
          </div>
        </div>
      </section>

      {/* Сетка товаров */}
      <section className="mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Актуальные предложения
            </h2>
            <p className="text-gray-600">
              Найдено {showroomProducts.length} витринных экземпляров
            </p>
          </div>
          <p className="text-sm text-amber-700 font-semibold bg-amber-50 px-4 py-2 rounded-lg">
            ⚡ Обновляется ежедневно
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {showroomProducts.map((product) => (
            <ShowroomProductCard key={product.id} product={product} />
          ))}
        </div>

        {showroomProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-2">Пока нет витринных экземпляров</p>
            <p className="text-sm">Загляните позже — предложения появляются регулярно</p>
          </div>
        )}
      </section>

      {/* Как купить */}
      <section className="mb-12 md:mb-16 bg-gray-900 text-white rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Как купить витринный экземпляр?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="font-bold text-lg mb-2">Выберите товар</h3>
            <p className="text-gray-300 text-sm">
              Изучите описание, состояние и фото. Обратите внимание на причину скидки.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="font-bold text-lg mb-2">Забронируйте</h3>
            <p className="text-gray-300 text-sm">
              Нажмите "Забронировать" или свяжитесь с нами по телефону. Бронь действует 3 дня.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="font-bold text-lg mb-2">Оформите заказ</h3>
            <p className="text-gray-300 text-sm">
              Оплатите удобным способом и получите доставку с сборкой в удобное время.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
          Частые вопросы
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              Даётся ли гарантия на витринные экземпляры?
            </h3>
            <p className="text-gray-600">
              Да, на все витринные экземпляры распространяется полная гарантия производителя — 
              от 1 до 3 лет в зависимости от категории товара.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              Можно ли посмотреть товар перед покупкой?
            </h3>
            <p className="text-gray-600">
              Конечно! Приезжайте в наш шоу-рум, чтобы увидеть мебель вживую. 
              Мы подробно покажем все нюансы состояния.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              Как долго действует бронь?
            </h3>
            <p className="text-gray-600">
              Бронь действует 3 дня. В течение этого времени вы можете оплатить товар 
              или продлить бронь, связавшись с менеджером.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              Можно ли вернуть товар?
            </h3>
            <p className="text-gray-600">
              Да, возврат возможен в течение 14 дней, если товар не был в использовании 
              и сохранён товарный вид. Подробности в разделе условий возврата.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Не нашли подходящий вариант?
        </h2>
        <p className="text-lg mb-6 text-amber-50">
          Подпишитесь на уведомления — мы сообщим, когда появятся новые витринные экземпляры со скидкой
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacts"
            className="px-8 py-3 bg-white text-amber-700 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Связаться с менеджером
          </Link>
          <Link
            href="/catalog"
            className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg font-bold hover:bg-white/20 transition-colors"
          >
            Посмотреть новый каталог
          </Link>
        </div>
      </section>
    </main>
  );
}