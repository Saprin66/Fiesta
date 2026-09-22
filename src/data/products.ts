export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  // Диваны
  {
    id: 1,
    name: "Диван «Сканди»",
    category: "Диваны",
    price: 45990,
    oldPrice: 52000,
    image: "/images/products/kitchen.jpg",
    description: "Уютный трехместный диван в скандинавском стиле. Антивандальный велюр.",
  },
  {
    id: 2,
    name: "Диван угловой «Монако»",
    category: "Диваны",
    price: 67500,
    image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&q=80",
    description: "Просторный угловой диван с механизмом трансформации. Идеален для большой гостиной.",
  },

  // Кресла
  {
    id: 3,
    name: "Кресло «Лофт»",
    category: "Кресла",
    price: 18500,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    description: "Стильное кресло с металлическим каркасом. Идеально для чтения.",
  },

  // Столы
  {
    id: 4,
    name: "Стол обеденный «Дуб»",
    category: "Столы",
    price: 32000,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&q=80",
    description: "Массив дуба, покрытие маслом. Вмещает до 6 человек.",
  },

  // Кровати
  {
    id: 5,
    name: "Кровать «Соната»",
    category: "Кровати",
    price: 67000,
    oldPrice: 75000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    description: "Двуспальная кровать с мягким изголовьем. Ортопедическое основание в комплекте.",
  },

  // Кухни
  {
    id: 6,
    name: "Кухня «Модерн»",
    category: "Кухни",
    price: 125000,
    oldPrice: 145000,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    description: "Современная кухня с фасадами из МДФ. Встроенная техника в комплекте.",
  },
  {
    id: 7,
    name: "Кухня «Классика»",
    category: "Кухни",
    price: 98000,
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
    description: "Кухня в классическом стиле с деревянными фасадами. Изготовлена на заказ.",
  },

  // Прихожие
  {
    id: 8,
    name: "Прихожая «Компакт»",
    category: "Прихожие",
    price: 28500,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    description: "Компактная прихожая с зеркалом, вешалкой и обувницей. Идеальна для маленьких коридоров.",
  },

  // Гардероб
  {
    id: 9,
    name: "Гардеробная система «Люкс»",
    category: "Гардероб",
    price: 85000,
    oldPrice: 95000,
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80",
    description: "Модульная гардеробная система с полками, штангами и выдвижными ящиками.",
  },

  // Шкафы-купе
  {
    id: 10,
    name: "Шкаф-купе «Зеркальный»",
    category: "Шкафы-купе",
    price: 54000,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    description: "Вместительный шкаф-купе с зеркальными дверцами. Внутреннее наполнение по вашему выбору.",
  },

  // Детские и подростковые
  {
    id: 11,
    name: "Детская кровать «Принцесса»",
    category: "Детские и подростковые",
    price: 32000,
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80",
    description: "Красивая детская кровать с бортиками и ящиком для белья. Экологичные материалы.",
  },
  {
    id: 12,
    name: "Подростковая комната «Тинейджер»",
    category: "Детские и подростковые",
    price: 78000,
    oldPrice: 89000,
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80",
    description: "Комплект мебели для подростка: кровать, стол, шкаф и полки. Современный дизайн.",
  },

  // Мебель для бизнеса
  {
    id: 13,
    name: "Офисный стол «Директор»",
    category: "Мебель для бизнеса",
    price: 45000,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
    description: "Премиальный офисный стол из массива дерева. Кабель-менеджмент в комплекте.",
  },
  {
    id: 14,
    name: "Кресло офисное «Эргономик»",
    category: "Мебель для бизнеса",
    price: 28000,
    oldPrice: 32000,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80",
    description: "Эргономичное офисное кресло с поддержкой поясницы. Регулируемые подлокотники и высота.",
  },
];

// Получаем все уникальные категории из товаров
export const categories = Array.from(new Set(products.map(p => p.category)));