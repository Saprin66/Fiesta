import Image from 'next/image';
import Link from 'next/link';

export default function ShowroomPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Заголовок */}
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
          Наши шоу-румы
        </h1>
        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
          Приезжайте, чтобы увидеть мебель вживую, потрогать материалы и получить 
          бесплатную консультацию дизайнера
        </p>
      </section>

      {/* Преимущества посещения шоу-рума */}
      <section className="mb-12 md:mb-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          Почему стоит посетить шоу-рум
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👀</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Увидеть вживую</h3>
            <p className="text-gray-600 text-sm">
              Оцените качество материалов, цветов и фактур своими глазами
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🛋️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Протестировать</h3>
            <p className="text-gray-600 text-sm">
              Присядьте на диван, откройте шкаф — убедитесь в удобстве
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💡</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Получить совет</h3>
            <p className="text-gray-600 text-sm">
              Наши дизайнеры помогут подобрать идеальную мебель для вашего интерьера
            </p>
          </div>
        </div>
      </section>

      {/* Шоу-румы */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
          Адреса наших шоу-румов
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Шоу-рум 1 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">🏬</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Шоу-рум на Парковой
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-900">Адрес:</p>
                    <p className="text-gray-600">г. Москва, ул. Мебельная, д. 15</p>
                    <p className="text-sm text-gray-500">Метро Парк Культуры (5 мин. пешком)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🕐</span>
                  <div>
                    <p className="font-semibold text-gray-900">Режим работы:</p>
                    <p className="text-gray-600">Пн-Вс: 10:00 — 21:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="font-semibold text-gray-900">Телефон:</p>
                    <a href="tel:+74951234567" className="text-amber-600 hover:text-amber-700 font-semibold">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </div>
              </div>
              <Link 
                href="https://yandex.ru/maps/-/CXA15S5u" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-amber-600 text-white text-center rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Построить маршрут
              </Link>
            </div>
          </div>

          {/* Шоу-рум 2 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">🏢</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Шоу-рум на Ленинском
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-900">Адрес:</p>
                    <p className="text-gray-600">г. Москва, Ленинский проспект, д. 42</p>
                    <p className="text-sm text-gray-500">Метро Ленинский проспект (3 мин. пешком)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🕐</span>
                  <div>
                    <p className="font-semibold text-gray-900">Режим работы:</p>
                    <p className="text-gray-600">Пн-Вс: 10:00 — 21:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl"></span>
                  <div>
                    <p className="font-semibold text-gray-900">Телефон:</p>
                    <a href="tel:+74951234568" className="text-amber-600 hover:text-amber-700 font-semibold">
                      +7 (495) 123-45-68
                    </a>
                  </div>
                </div>
              </div>
              <Link 
                href="https://yandex.ru/maps" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-amber-600 text-white text-center rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Построить маршрут
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Что представлено в шоу-руме */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
          Что вы увидите в шоу-руме
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: 'Диваны и кресла', count: '50+ моделей', icon: '🛋️' },
            { name: 'Кровати', count: '30+ моделей', icon: '🛏️' },
            { name: 'Кухни', count: '15 готовых решений', icon: '🍳' },
            { name: 'Шкафы и гардеробные', count: '40+ вариантов', icon: '🚪' },
            { name: 'Столы и стулья', count: '60+ моделей', icon: '🪑' },
            { name: 'Прихожие', count: '20+ комплектов', icon: '🏠' },
            { name: 'Детская мебель', count: '35+ моделей', icon: '🧸' },
            { name: 'Офисная мебель', count: '25+ позиций', icon: '💼' },
          ].map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-gray-100">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                {item.name}
              </h3>
              <p className="text-amber-600 font-bold text-sm">{item.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Запись на посещение */}
      <section className="mb-12 md:mb-16 bg-gray-900 text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Запишитесь на посещение шоу-рума
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Оставьте заявку, и наш менеджер свяжется с вами для подтверждения времени визита. 
            Это поможет нам уделить вам максимум внимания.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contacts" 
              className="px-8 py-4 bg-amber-600 text-white rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors"
            >
              Записаться онлайн
            </Link>
            <a 
              href="tel:+74951234567" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-colors text-center"
            >
              Позвонить нам
            </a>
          </div>
        </div>
      </section>

      {/* Часто задаваемые вопросы */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
          Частые вопросы
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              Нужна ли предварительная запись?
            </h3>
            <p className="text-gray-600">
              Нет, вы можете прийти в любое время работы шоу-рума. Но если запишетесь заранее, 
              мы сможем подготовить для вас персональную консультацию и показать именно те модели, 
              которые вас интересуют.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              Можно ли сделать заказ в шоу-руме?
            </h3>
            <p className="text-gray-600">
              Да, конечно! Наши консультанты помогут оформить заказ, расскажут о текущих акциях 
              и помогут с выбором доставки и сборки.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              Есть ли парковка у шоу-рума?
            </h3>
            <p className="text-gray-600">
              Да, рядом с обоими шоу-румами есть бесплатная парковка для клиентов.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              Можно ли прийти с детьми?
            </h3>
            <p className="text-gray-600">
              Конечно! У нас есть детский уголок с игрушками и раскрасками, чтобы дети не 
              заскучали, пока вы выбираете мебель.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}