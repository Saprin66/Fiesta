import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Пользовательское соглашение | Fiesta Store',
  description: 'Условия покупки мебели в интернет-магазине Fiesta Store. Правила оформления заказа, доставки и возврата.',
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Хлебные крошки */}
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Пользовательское соглашение</span>
      </nav>

      {/* Заголовок */}
      <header className="mb-10 pb-8 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Пользовательское соглашение
        </h1>
        <p className="text-gray-600">
          Настоящее соглашение регулирует отношения между интернет-магазином
          «Fiesta Store» и Пользователем при покупке мебели и других товаров.
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
          1.1. Настоящее Пользовательское соглашение (далее — «Соглашение»)
          является публичной офертой интернет-магазина «Fiesta Store» (далее —
          «Магазин») и регулирует условия продажи товаров через сайт
          fiesta-store.ru.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          1.2. В соответствии со статьёй 437 Гражданского кодекса Российской
          Федерации данное предложение является публичной офертой, и акцепт
          (принятие) оферты равносилен заключению договора купли-продажи.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          1.3. Размещая заказ на сайте Магазина, Пользователь подтверждает, что
          ознакомился с условиями настоящего Соглашения, Политикой
          конфиденциальности и полностью принимает их.
        </p>
        <p className="text-gray-700 leading-relaxed">
          1.4. Администрация Магазина вправе в одностороннем порядке изменять
          условия настоящего Соглашения. Изменения вступают в силу с момента
          публикации новой редакции на сайте.
        </p>
      </section>

      {/* 2. Предмет соглашения */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          2. Предмет соглашения
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          2.1. Магазин обязуется передать Пользователю в собственность товары
          (мебель и сопутствующие изделия), а Пользователь обязуется принять и
          оплатить товары на условиях настоящего Соглашения.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          2.2. Наименование, количество, ассортимент, комплектность,
          артикул и цена товара определяются Пользователем при оформлении
          заказа на сайте или в общении с менеджером Магазина.
        </p>
        <p className="text-gray-700 leading-relaxed">
          2.3. Все текстовые и графические изображения, размещённые на сайте,
          носят ознакомительный характер и могут отличаться от реального вида
          товара. Цвет товара может зависеть от настроек монитора Пользователя.
        </p>
      </section>

      {/* 3. Оформление заказа */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          3. Порядок оформления заказа
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          3.1. Пользователь может оформить заказ следующими способами:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li>Через корзину на сайте fiesta-store.ru</li>
          <li>По телефону, указанному на сайте</li>
          <li>Через электронную почту</li>
          <li>При личном посещении шоу-рума</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-4">
          3.2. При оформлении заказа Пользователь предоставляет следующие
          данные: фамилия, имя, контактный телефон, адрес электронной почты,
          адрес доставки.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          3.3. После оформления заказа с Пользователем связывается менеджер
          Магазина для подтверждения заказа, уточнения деталей и согласования
          времени доставки.
        </p>
        <p className="text-gray-700 leading-relaxed">
          3.4. Магазин вправе отказать в заключении договора, если
          предоставленные Пользователем данные недостоверны или неполны.
        </p>
      </section>

      {/* 4. Цены и оплата */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          4. Цены и порядок оплаты
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          4.1. Цены на товары устанавливаются Магазином в одностороннем
          порядке и указываются в российских рублях.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          4.2. Стоимость доставки рассчитывается отдельно и зависит от адреса,
          габаритов товара и выбранного способа доставки.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          4.3. Оплата товаров возможна следующими способами:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li>Наличными при доставке</li>
          <li>Банковской картой при доставке</li>
          <li>Банковским переводом по счёту</li>
          <li>Онлайн-оплата на сайте (ЮKassa, Тинькофф)</li>
          <li>В рассрочку или кредит (по условиям банков-партнёров)</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          4.4. Товар считается оплаченным с момента поступления денежных
          средств на расчётный счёт Магазина.
        </p>
      </section>

      {/* 5. Доставка */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          5. Доставка товара
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          5.1. Доставка товаров осуществляется по адресам, указанным
          Пользователем при оформлении заказа.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          5.2. Сроки доставки согласовываются с Пользователем при
          подтверждении заказа и составляют от 1 до 14 рабочих дней в
          зависимости от наличия товара на складе.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          5.3. Доставка крупногабаритной мебели осуществляется с обязательной
          сборкой (если иное не оговорено отдельно).
        </p>
        <p className="text-gray-700 leading-relaxed">
          5.4. При получении товара Пользователь обязан проверить внешний вид,
          комплектацию и комплектность товара в присутствии курьера.
        </p>
      </section>

      {/* 6. Возврат и обмен */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          6. Возврат и обмен товара
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          6.1. Возврат и обмен товаров осуществляется в соответствии с
          Законом Российской Федерации «О защите прав потребителей».
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          6.2. Пользователь вправе отказаться от товара в любое время до его
          передачи, а после передачи — в течение 7 дней.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          6.3. Возврат товара надлежащего качества возможен при условии:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li>Сохранения товарного вида и потребительских свойств</li>
          <li>Наличия документа, подтверждающего покупку</li>
          <li>Отсутствия следов эксплуатации</li>
          <li>Сохранения заводской упаковки</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-4">
          6.4. Товары, изготовленные на заказ по индивидуальным размерам
          Пользователя, возврату и обмену не подлежат (согласно перечню
          Постановления Правительства РФ № 55).
        </p>
        <p className="text-gray-700 leading-relaxed">
          6.5. Возврат денежных средств осуществляется в течение 10 рабочих
          дней с момента получения письменного заявления от Пользователя.
        </p>
      </section>

      {/* 7. Гарантия */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          7. Гарантийные обязательства
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          7.1. На все товары, представленные в Магазине, действует гарантия
          производителя. Срок гарантии указывается в карточке товара и в
          сопроводительных документах.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          7.2. Гарантийные обязательства не распространяются на дефекты,
          возникшие в результате:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li>Неправильной эксплуатации товара</li>
          <li>Механических повреждений</li>
          <li>Действий третьих лиц</li>
          <li>Непреодолимой силы (форс-мажор)</li>
          <li>Естественного износа</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          7.3. Для обращения по гарантии необходимо сохранить товарный и
          кассовый чеки, а также гарантийный талон.
        </p>
      </section>

      {/* 8. Ответственность сторон */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          8. Ответственность сторон
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          8.1. Магазин не несёт ответственности за убытки, возникшие в
          результате неправомерного использования товаров, размещённых на
          сайте.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          8.2. Магазин вправе передавать свои права и обязанности по
          исполнению договора третьим лицам (курьерским службам,
          производителям).
        </p>
        <p className="text-gray-700 leading-relaxed">
          8.3. Пользователь несёт ответственность за достоверность
          предоставленных при оформлении заказа данных.
        </p>
      </section>

      {/* 9. Интеллектуальная собственность */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          9. Интеллектуальная собственность
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          9.1. Все объекты, размещённые на сайте fiesta-store.ru, в том числе
          элементы дизайна, изображения, тексты, являются объектами
          интеллектуальной собственности Магазина.
        </p>
        <p className="text-gray-700 leading-relaxed">
          9.2. Использование материалов сайта без согласия правообладателя не
          допускается.
        </p>
      </section>

      {/* 10. Форс-мажор */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          10. Форс-мажорные обстоятельства
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          10.1. Стороны освобождаются от ответственности за частичное или
          полное неисполнение обязательств, если это вызвано обстоятельствами
          непреодолимой силы: пожара, наводнения, землетрясения, военных
          действий, эпидемий, актов государственных органов.
        </p>
        <p className="text-gray-700 leading-relaxed">
          10.2. В случае наступления форс-мажорных обстоятельств срок
          исполнения обязательств продлевается на период действия этих
          обстоятельств.
        </p>
      </section>

      {/* 11. Разрешение споров */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          11. Разрешение споров
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          11.1. Все споры, возникающие из настоящего Соглашения, подлежат
          разрешению путём переговоров.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          11.2. В случае невозможности урегулирования спора путём переговоров,
          он подлежит рассмотрению в суде по месту нахождения Магазина в
          соответствии с действующим законодательством РФ.
        </p>
        <p className="text-gray-700 leading-relaxed">
          11.3. Пользователь вправе обратиться с жалобой в Роспотребнадзор или
          в суд по месту своего жительства (альтернативная подсудность для
          потребителей).
        </p>
      </section>

      {/* 12. Контакты */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          12. Контактная информация
        </h2>
        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
          <p className="text-gray-700">
            <strong className="text-gray-900">Наименование:</strong> ООО «Fiesta Store»
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">ИНН:</strong> 7700000000
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">ОГРН:</strong> 1234567890123
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Юридический адрес:</strong> г. Москва, ул. Мебельная, д. 15
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Email:</strong>{' '}
            <a href="mailto:info@fiesta-store.ru" className="text-amber-600 hover:text-amber-700">
              info@fiesta-store.ru
            </a>
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Телефон:</strong>{' '}
            <a href="tel:+74951234567" className="text-amber-600 hover:text-amber-700">
              +7 (495) 123-45-67
            </a>
          </p>
        </div>
      </section>

      {/* Согласие */}
      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Принятие условий
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Оформляя заказ на сайте fiesta-store.ru, вы подтверждаете, что
          ознакомились с условиями настоящего Соглашения и полностью их
          принимаете.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/catalog"
            className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors text-center"
          >
            Перейти в каталог
          </Link>
          <Link
            href="/privacy"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-amber-600 hover:text-amber-600 transition-colors text-center"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </section>
    </main>
  );
}