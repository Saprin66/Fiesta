import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Fiesta Store',
  description: 'Политика обработки персональных данных интернет-магазина мебели Fiesta Store.',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Хлебные крошки */}
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Политика конфиденциальности</span>
      </nav>

      {/* Заголовок */}
      <header className="mb-10 pb-8 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Политика конфиденциальности
        </h1>
        <p className="text-gray-600">
          Настоящая Политика конфиденциальности регулирует обработку персональных
          данных пользователей интернет-магазина мебели Fiesta Store.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Дата публикации: 2 октября 2026 г.
        </p>
      </header>

      {/* 1. Общие положения */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          1. Общие положения
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          1.1. Настоящая Политика конфиденциальности действует в отношении всей
          информации, которую интернет-магазин «Fiesta Store» может получить о
          Пользователе во время использования сайта.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          1.2. Использование сайта означает безоговорочное согласие Пользователя
          с настоящей Политикой и указанными в ней условиями обработки его
          персональной информации.
        </p>
        <p className="text-gray-700 leading-relaxed">
          1.3. Администрация сайта вправе в любое время изменять условия
          настоящей Политики. Изменения вступают в силу с момента размещения
          обновлённой версии на сайте.
        </p>
      </section>

      {/* 2. Какие данные мы собираем */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          2. Какие персональные данные мы собираем
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          2.1. Магазин может собирать следующие персональные данные Пользователя:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li>Фамилия, имя, отчество</li>
          <li>Контактный телефон</li>
          <li>Адрес электронной почты (e-mail)</li>
          <li>Адрес доставки товара</li>
          <li>Данные о заказах и покупках</li>
          <li>IP-адрес и данные о cookie-файлах</li>
          <li>Информация о браузере и устройстве</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          2.2. Отключение cookie-файлов может привести к невозможности
          использования некоторых функций сайта.
        </p>
      </section>

      {/* 3. Цели сбора данных */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          3. Цели сбора персональных данных
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          3.1. Персональные данные используются для следующих целей:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Оформление и доставка заказов</li>
          <li>Связь с клиентом по вопросам заказа</li>
          <li>Улучшение качества сервиса</li>
          <li>Отправка новостей и акций (с согласия Пользователя)</li>
          <li>Защита от мошенничества</li>
        </ul>
      </section>

      {/* 4. Правовые основания */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          4. Правовые основания обработки
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          4.1. Правовыми основаниями обработки персональных данных являются:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Федеральный закон № 152-ФЗ «О персональных данных»</li>
          <li>Федеральный закон № 149-ФЗ «Об информации»</li>
          <li>Гражданский кодекс Российской Федерации</li>
          <li>Согласие Пользователя на обработку персональных данных</li>
        </ul>
      </section>

      {/* 5. Хранение и защита */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          5. Хранение и защита персональных данных
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          5.1. Администрация принимает необходимые организационные и технические
          меры для защиты персональной информации Пользователя от неправомерного
          доступа, уничтожения, изменения, блокирования и распространения.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          5.2. Сайт использует протоколы безопасности SSL/TLS для защиты
          передаваемых данных.
        </p>
        <p className="text-gray-700 leading-relaxed">
          5.3. Персональные данные могут быть переданы третьим лицам (курьерским
          службам) исключительно в целях выполнения заказа Пользователя.
        </p>
      </section>

      {/* 6. Cookie-файлы */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          6. Использование cookie-файлов
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          6.1. Сайт использует cookie-файлы для сохранения товаров в корзине,
          запоминания настроек и анализа посещаемости.
        </p>
        <p className="text-gray-700 leading-relaxed">
          6.2. Пользователь может отключить cookie-файлы в настройках браузера.
          Это может повлиять на функциональность сайта.
        </p>
      </section>

      {/* 7. Права пользователя */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          7. Права пользователя
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          7.1. Пользователь имеет право:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li>Получать информацию о своих персональных данных</li>
          <li>Требовать уточнения, блокирования или уничтожения данных</li>
          <li>Отозвать согласие на обработку персональных данных</li>
          <li>Обжаловать действия Оператора в Роскомнадзор или в суде</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          7.2. Для реализации своих прав направьте заявление на электронную
          почту, указанную в разделе «Контакты».
        </p>
      </section>

      {/* 8. Контакты */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          8. Контактная информация
        </h2>
        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
          <p className="text-gray-700">
            <strong className="text-gray-900">Наименование:</strong> ООО «Fiesta Store»
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Email:</strong>{' '}
            <a href="mailto:privacy@fiesta-store.ru" className="text-amber-600 hover:text-amber-700">
              privacy@fiesta-store.ru
            </a>
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Телефон:</strong>{' '}
            <a href="tel:+74951234567" className="text-amber-600 hover:text-amber-700">
              +7 (495) 123-45-67
            </a>
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Адрес:</strong> г. Москва, ул. Мебельная, д. 15
          </p>
        </div>
      </section>

      {/* Согласие */}
      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Согласие с политикой
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Продолжая использовать сайт, вы подтверждаете своё согласие с настоящей
          Политикой конфиденциальности и условиями обработки ваших персональных
          данных.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/catalog"
            className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors text-center"
          >
            Перейти в каталог
          </Link>
          <Link
            href="/contacts"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-amber-600 hover:text-amber-600 transition-colors text-center"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </main>
  );
}