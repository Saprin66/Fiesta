import ProductDetails from '@/components/ProductDetails';
import { getRelatedProducts } from '@/lib/catalog';
import { loadProduct, productMetadata } from '@/lib/product-page';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  return productMetadata((await params).slug, false);
}

export default async function ProductPage({ params }: { params: Params }) {
  const { product } = await loadProduct((await params).slug, false);
  const related = await getRelatedProducts(product);
  return <ProductDetails product={product} related={related} />;
}
