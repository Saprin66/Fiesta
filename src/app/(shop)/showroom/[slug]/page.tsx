import ProductDetails from '@/components/ProductDetails';
import { getProducts } from '@/lib/catalog';
import { loadProduct, productMetadata } from '@/lib/product-page';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  return productMetadata((await params).slug, true);
}

export default async function ShowroomProductPage({ params }: { params: Params }) {
  const { product } = await loadProduct((await params).slug, true);
  const others = (await getProducts({ showroom: true })).filter((p) => p.id !== product.id).slice(0, 4);
  return <ProductDetails product={product} related={others} />;
}
