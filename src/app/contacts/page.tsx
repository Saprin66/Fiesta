import Image from 'next/image';
import Script from 'next/script';

export default function ContactsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Заголовок */}
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
          Контакты
        </h1>
        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
          Мы всегда на связи! Приезжайте в наш магазин или свяжитесь любым удобным способом.
        </p>
      </section>

      {/* Контактная информация */}
      <section className="mb-12 md:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Телефон */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📞</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Телефон</h3>
            <a 
              href="tel:+79529513841" 
              className="text-amber-600 hover:text-amber-700 font-semibold text-lg"
            >
              +7 (952) 951-38-41<br/>
            </a>
            <a href="tel:+74732220841" 
            className="text-amber-600 hover:text-amber-700 font-semibold text-lg">
              
              +7 (473) 222-08-41
            </a>
            <p className="text-sm text-gray-500 mt-2">Ежедневно с 10:00 до 17:00</p>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">✉️</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Email</h3>
            <a 
              href="mailto:mebel-fiesta36@mail.ru" 
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              mebel-fiesta36@mail.ru
            </a>
            <p className="text-sm text-gray-500 mt-2">Ответим в течение часа</p>
          </div>

          {/* Адрес */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Адрес</h3>
            <p className="text-gray-700">
              г. Воронеж,<br />
              ул. Донбасская, д. 23
            
            </p>
            <p className="text-sm text-gray-500 mt-2">ТВЦ Ярмарка, 1 эт</p>
          </div>

          {/* Режим работы */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🕐</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Режим работы</h3>
            <p className="text-gray-700">
              Вт-Вс: 10:00 — 17:00<br/>
            </p>
            <p className="text-sm text-gray-500 mt-2">Понедельник выходной</p>
          </div>
        </div>
      </section>

      {/* Карта */}
            {/* Карта */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900">
          Как нас найти
        </h2>
        
        {/* Оборачиваем весь блок в ссылку <a> */}
        <a 
          href="https://yandex.ru/maps/-/CXA15S5u" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden shadow-md h-80 md:h-[400px] relative bg-gray-100 group cursor-pointer"
          title="Открыть в Яндекс.Картах"
        >
          <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aded4096b57ca202420c4d3eec0e3ba27e9a434aaad97a2340cb0a2b8eda65f05&source=constructor" 
            className="w-full h-full border-0 pointer-events-none" 
            // 👆 pointer-events-none — это МАГИЯ. Она пропускает клик сквозь iframe к ссылке <a>
            title="Яндекс Карта"
          />
          
          {/* Всплывающая подсказка при наведении (для красоты и UX) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none">
            <span className="bg-white px-5 py-2.5 rounded-full shadow-lg font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
              Открыть в Яндекс.Картах 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </span>
          </div>
        </a>
        
        <p className="text-center text-sm text-gray-500 mt-3">
          Нажмите на карту, чтобы построить маршрут в Яндекс.Картах
        </p>
      </section>

      {/* Форма обратной связи */}
      <section className="mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Левая часть - текст */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Напишите нам
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Есть вопросы о мебели, доставке или хотите получить консультацию дизайнера? 
              Заполните форму, и мы свяжемся с вами в ближайшее время.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p className="text-gray-700">
                  <strong>Бесплатная консультация</strong> дизайнера интерьера
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p className="text-gray-700">
                  <strong>Расчёт стоимости</strong> мебели на заказ
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p className="text-gray-700">
                  <strong>Подбор мебели</strong> под ваш интерьер
                </p>
              </div>
            </div>
          </div>

          {/* Правая часть - форма */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Телефон *
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  placeholder="example@mail.ru"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Сообщение
                </label>
                <textarea 
                  rows={4}
                  placeholder="Расскажите, чем мы можем помочь..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full px-8 py-4 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Отправить сообщение
              </button>

              <p className="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="/privacy" className="text-amber-600 hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Социальные сети */}
      <section className="mb-12 md:mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
          Мы в социальных сетях
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Подписывайтесь, чтобы первыми узнавать о новинках, акциях и получать вдохновение для интерьера
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="https://t.me/fiestastore" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">✈️</span>
            Telegram
          </a>
          <a 
            href="https://vk.com/fiestastore" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">💬</span>
            ВКонтакте
          </a>
          <a 
            href="https://instagram.com/fiestastore" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-orange-600 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">📷</span>
            Instagram
          </a>
          <a 
            href="https://youtube.com/fiestastore" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">▶️</span>
            YouTube
          </a>
        </div>
      </section>

     
      
    </main>
  );
}