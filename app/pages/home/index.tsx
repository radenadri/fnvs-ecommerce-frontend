import ProductCard from '~/components/product-card';
import { useProducts } from '~/hooks/use-products';

import type { IProduct } from '~/interfaces/product-interface';

export default function Home() {
  return (
    <main className="grow">
      <section id="section-product-lists">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
          <section>
            <div className="flex flex-col h-full">
              <h1 className="text-lg text-neutral-600 font-mono tracking-tight uppercase text-balance">
                Finvise, the web-based product landing page
              </h1>
              <p className="text-sm text-pretty text-neutral-500 mt-2">
                This is a web-based product landing page for Finvise. For the
                take-home assignment purpose.
              </p>
            </div>
          </section>
          <ProductLists />
        </div>
      </section>
    </main>
  );
}

function ProductLists() {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) {
    // 5 is the number of product cards to be shown by default to fill the screen
    return Array.from({ length: 5 }).map((_, index) => (
      <ProductCard key={index} isLoading={true} />
    ));
  }

  if (isError) throw new Error('Failed to fetch products');

  return products.data.map((product: IProduct) => (
    <ProductCard key={product.id} product={product} />
  ));
}
