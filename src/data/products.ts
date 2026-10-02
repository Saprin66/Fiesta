export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  description: string;
  fullDescription: string;
  characteristics: {
    width?: string;
    height?: string;
    depth?: string;
    material?: string;
    upholstery?: string;
    mechanism?: string;
    weight?: string;
    country?: string;
    warranty?: string;
  };
  inStock: boolean;
  isNew?: boolean;
  isHit?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Диван «Сканди»",
    category: "Диваны",
    price: 45990,
    oldPrice: 52000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&q=80",
    ],
    description: "Уютный трехместный диван в скандинавском стиле. Антивандальный велюр.",
    fullDescription: "Диван «Сканди» — идеальное сочетание стиля и комфорта. Созданный в лучших традициях скандинавского дизайна, он станет центром вашей гостиной.",
    characteristics: { width: "220 см", height: "85 см", depth: "95 см", material: "Массив берёзы", upholstery: "Антивандальный велюр", mechanism: "Еврокнижка", weight: "68 кг", country: "Россия", warranty: "3 года" },
    inStock: true, isNew: true, isHit: true,
  },
  {
    id: 2,
    name: "Диван угловой «Монако»",
    category: "Диваны",
    price: 67500,
    image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&q=80"],
    description: "Просторный угловой диван с механизмом трансформации.",
    fullDescription: "Угловой диван «Монако» — роскошное решение для просторной гостиной.",
    characteristics: { width: "290 см", height: "88 см", depth: "170 см", material: "Массив бука", upholstery: "Шенилл", mechanism: "Дельфин", weight: "95 кг", country: "Россия", warranty: "3 года" },
    inStock: true, isHit: true,
  },
  {
    id: 3,
    name: "Кресло «Лофт»",
    category: "Кресла",
    price: 18500,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80"],
    description: "Стильное кресло с металлическим каркасом.",
    fullDescription: "Кресло «Лофт» сочетает индустриальный шарм и уют.",
    characteristics: { width: "75 см", height: "82 см", depth: "80 см", material: "Металл, массив дуба", upholstery: "Рогожка", weight: "18 кг", country: "Россия", warranty: "2 года" },
    inStock: true,
  },
  {
    id: 4,
    name: "Стол обеденный «Дуб»",
    category: "Столы",
    price: 32000,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&q=80"],
    description: "Массив дуба, покрытие маслом. Вмещает до 6 человек.",
    fullDescription: "Обеденный стол «Дуб» — воплощение природной красоты и долговечности.",
    characteristics: { width: "160 см", height: "75 см", depth: "90 см", material: "Массив дуба", weight: "45 кг", country: "Россия", warranty: "5 лет" },
    inStock: true,
  },
  {
    id: 5,
    name: "Кровать «Соната»",
    category: "Кровати",
    price: 67000,
    oldPrice: 75000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"],
    description: "Двуспальная кровать с мягким изголовьем.",
    fullDescription: "Кровать «Соната» — воплощение спокойствия и комфорта.",
    characteristics: { width: "190 см", height: "110 см", depth: "215 см", material: "Массив берёзы", upholstery: "Экокожа, велюр", weight: "75 кг", country: "Россия", warranty: "5 лет" },
    inStock: true, isHit: true,
  },
  {
    id: 6,
    name: "Кухня «Модерн»",
    category: "Кухни",
    price: 125000,
    oldPrice: 145000,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
    description: "Современная кухня с фасадами из МДФ.",
    fullDescription: "Кухня «Модерн» — воплощение современной функциональности.",
    characteristics: { width: "280 см", height: "220 см", depth: "60 см", material: "МДФ, ЛДСП Egger", country: "Россия", warranty: "5 лет" },
    inStock: true, isHit: true,
  },
  {
    id: 7,
    name: "Прихожая «Компакт»",
    category: "Прихожие",
    price: 28500,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80"],
    description: "Компактная прихожая с зеркалом и обувницей.",
    fullDescription: "Прихожая «Компакт» — всё необходимое в одном комплекте.",
    characteristics: { width: "120 см", height: "200 см", depth: "40 см", material: "ЛДСП Egger", country: "Россия", warranty: "2 года" },
    inStock: true,
  },
  {
    id: 8,
    name: "Гардеробная система «Люкс»",
    category: "Гардероб",
    price: 85000,
    oldPrice: 95000,
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80"],
    description: "Модульная гардеробная система.",
    fullDescription: "Гардеробная «Люкс» — мечта любой хозяйки.",
    characteristics: { width: "300 см", height: "240 см", depth: "60 см", material: "ЛДСП Egger, металл", country: "Россия", warranty: "5 лет" },
    inStock: true,
  },
  {
    id: 9,
    name: "Шкаф-купе «Зеркальный»",
    category: "Шкафы-купе",
    price: 54000,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80"],
    description: "Вместительный шкаф-купе с зеркальными дверцами.",
    fullDescription: "Шкаф-купе «Зеркальный» — классика для спальни.",
    characteristics: { width: "240 см", height: "240 см", depth: "60 см", material: "ЛДСП Egger, зеркало", country: "Россия", warranty: "5 лет" },
    inStock: true,
  },
  {
    id: 10,
    name: "Детская кровать «Принцесса»",
    category: "Детские и подростковые",
    price: 32000,
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80"],
    description: "Красивая детская кровать с бортиками.",
    fullDescription: "Кровать «Принцесса» — мечта каждой девочки.",
    characteristics: { width: "90 см", height: "75 см", depth: "200 см", material: "Массив сосны", weight: "38 кг", country: "Россия", warranty: "5 лет" },
    inStock: true,
  },
  {
    id: 11,
    name: "Офисный стол «Директор»",
    category: "Мебель для бизнеса",
    price: 45000,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80"],
    description: "Премиальный офисный стол из массива дерева.",
    fullDescription: "Стол «Директор» — статусная мебель для руководителя.",
    characteristics: { width: "180 см", height: "75 см", depth: "90 см", material: "Массив дуба, металл", weight: "55 кг", country: "Россия", warranty: "5 лет" },
    inStock: true,
  },
  {
    id: 12,
    name: "Кресло офисное «Эргономик»",
    category: "Мебель для бизнеса",
    price: 28000,
    oldPrice: 32000,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80"],
    description: "Эргономичное офисное кресло с поддержкой поясницы.",
    fullDescription: "Кресло «Эргономик» создано для тех, кто проводит за компьютером много часов.",
    characteristics: { width: "68 см", height: "110-125 см", depth: "65 см", material: "Сетка, пластик, металл", weight: "18 кг", country: "Россия", warranty: "3 года" },
    inStock: true, isHit: true,
  },
];

export const categories = Array.from(new Set(products.map(p => p.category)));

// Витринные экземпляры
export interface ShowroomProduct {
  id: number;
  name: string;
  category: string;
  originalPrice: number;
  showroomPrice: number;
  image: string;
  description: string;
  condition: 'Новое' | 'Следы использования' | 'Мелкие царапины' | 'Без упаковки';
  discountReason: string;
  isLast: boolean;
}

export const showroomProducts: ShowroomProduct[] = [
  {
    id: 101,
    name: "Диван «Сканди»",
    category: "Диваны",
    originalPrice: 52000,
    showroomPrice: 31200,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    description: "Трехместный диван в скандинавском стиле. Стоял в шоу-руме 3 месяца.",
    condition: "Следы использования",
    discountReason: "Экспонат шоу-рума",
    isLast: true,
  },
  {
    id: 102,
    name: "Кровать «Соната»",
    category: "Кровати",
    originalPrice: 75000,
    showroomPrice: 45000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    description: "Двуспальная кровать с мягким изголовьем. Модель снята с производства.",
    condition: "Новое",
    discountReason: "Снято с производства",
    isLast: true,
  },
  {
    id: 103,
    name: "Кухня «Модерн»",
    category: "Кухни",
    originalPrice: 145000,
    showroomPrice: 87000,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    description: "Современная кухня. Демонстрационный образец.",
    condition: "Мелкие царапины",
    discountReason: "Демонстрационный образец",
    isLast: false,
  },
];