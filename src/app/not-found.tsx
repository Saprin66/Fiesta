import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Страница не найдена
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Возможно, товар был удалён или вы перешли по неверной ссылке.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/catalog" 
          className="px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
        >
          Перейти в каталог
        </Link>
        <Link 
          href="/" 
          className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-amber-600 hover:text-amber-600 transition-colors"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}