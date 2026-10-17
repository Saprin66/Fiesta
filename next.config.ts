import type { NextConfig } from 'next';

// Старые адреса товаров с числовыми id (до перехода на базу данных) ведут на новые
const legacyCatalog: Record<number, string> = {
  1: 'divan-skandi',
  2: 'divan-uglovoy-monako',
  3: 'kreslo-loft',
  4: 'stol-obedennyy-dub',
  5: 'krovat-sonata',
  6: 'kuhnya-modern',
  7: 'prihozhaya-kompakt',
  8: 'garderobnaya-sistema-lyuks',
  9: 'shkaf-kupe-zerkalnyy',
  10: 'detskaya-krovat-printsessa',
  11: 'ofisnyy-stol-direktor',
  12: 'kreslo-ofisnoe-ergonomik',
};
const legacyShowroom: Record<number, string> = {
  101: 'divan-skandi-vitrina',
  102: 'krovat-sonata-vitrina',
  103: 'kuhnya-modern-vitrina',
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  serverExternalPackages: ['sharp'],
  async redirects() {
    return [
      ...Object.entries(legacyCatalog).map(([id, slug]) => ({
        source: `/catalog/${id}`,
        destination: `/catalog/${slug}`,
        permanent: true,
      })),
      ...Object.entries(legacyShowroom).map(([id, slug]) => ({
        source: `/showroom/${id}`,
        destination: `/showroom/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
