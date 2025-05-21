import ProductDetailSection from '~/components/product-detail-section';

export default function Details({ slug }: { slug: string }) {
  return (
    <section>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 just xl:grid-cols-3 gap-2">
        <ProductDetailSection slug={slug} />
      </div>
    </section>
  );
}
