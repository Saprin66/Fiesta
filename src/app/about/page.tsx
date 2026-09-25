import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Заголовок */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          О нас
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fiesta Store — это больше, чем мебельный магазин. 
          Мы создаем пространство, где рождается уют вашего дома.
        </p>
      </section>

      {/* Наша история */}
      <section className="mb-16">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">
    Наша история
  </h2>
  <div className="grid md:grid-cols-2 gap-8 items-center">
    <div>
      <p className="text-lg text-gray-700 mb-4">
        Fiesta Store начался с простой идеи: каждый человек заслуживает 
        жить в красивом и комфортном пространстве. В 2015 году мы открыли 
        свой первый шоурум, и с тех пор помогли более чем 10 000 семьям 
        обставить свои дома.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Мы работаем напрямую с лучшими производителями мебели из России, 
        Италии и Скандинавии. Это позволяет нам предлагать уникальные 
        модели по честным ценам.
      </p>
      <p className="text-lg text-gray-700">
        Наша команда — это дизайнеры интерьера, технологи и просто люди, 
        которые любят красивую мебель. Мы знаем о каждом диване, каждом 
        столе и каждом стуле всё.
      </p>
    </div>

    {/* Картинка по центру */}
    <div className="flex justify-center items-center">
      <div className="relative w-[260px] h-[400px] rounded-2xl overflow-hidden bg-gray-100">
        <Image 
          src="/yandexMesto.png" 
          alt="Лучшее место по мнению Яндекс"
          fill
          className="object-cover"
        />
      </div>
    </div>
  </div>
</section>

      {/* Наши ценности */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Наши ценности
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Качество
            </h3>
            <p className="text-gray-600">
              Мы тщательно отбираем каждого поставщика и проверяем каждую 
              единицу мебели перед отправкой клиенту.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">💚</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Экологичность
            </h3>
            <p className="text-gray-600">
              Используем только безопасные материалы и поддерживаем 
              производителей, которые заботятся об окружающей среде.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Сервис
            </h3>
            <p className="text-gray-600">
              Помогаем с выбором, доставляем в срок и всегда на связи. 
              Ваша satisfaction — наш приоритет.
            </p>
          </div>
        </div>
      </section>

      {/* Цифры */}
      <section className="mb-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Fiesta Store в цифрах
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-amber-600 mb-2">10+</div>
            <div className="text-gray-600">лет на рынке</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-amber-600 mb-2">10 000+</div>
            <div className="text-gray-600">довольных клиентов</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
            <div className="text-gray-600">моделей мебели</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
            <div className="text-gray-600">городов доставки</div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Готовы создать уют?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Приезжайте в наш шоурум или закажите бесплатную консультацию дизайнера
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a 
            href="/catalog" 
            className="px-8 py-4 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
          >
            Смотреть каталог
          </a>
          <a 
            href="/contacts" 
            className="px-8 py-4 border-2 border-amber-600 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
          >
            Связаться с нами
          </a>
        </div>
      </section>
    </main>
  );
}