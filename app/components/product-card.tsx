'use client';

import { Link } from 'react-router';
import type { IProduct } from '~/interfaces/product-interface';

export default function ProductCard({
  product,
  isLoading = false,
}: {
  product?: IProduct;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <ProductCardLoader />;
  }

  const { name, slug, description, price, image } = product!;

  return (
    <div className="group relative bg-white overflow-hidden group rounded-xl font-mono">
      <div className="aspect-[4/4] p-20 overflow-hidden group-hover:opacity-75 duration-300 transition-all">
        <img
          alt={name}
          src={image}
          className="object-cover object-center group-hover:scale-125 transition-all duration-300"
        />
      </div>
      <div className="p-4 text-sm text-neutral-500">
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-neutral-800">
            <Link to={`products/${slug}`} title={name} aria-label={name}>
              <span aria-hidden="true" className="absolute inset-0 " />
              {name}
            </Link>
          </h3>
          <p className="absolute top-4 right-4">${price / 100}</p>
          <p className="mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ProductCardLoader() {
  return (
    <div
      data-testid="product-card-loader"
      className="group relative bg-white overflow-hidden group rounded-xl font-mono animate-pulse"
    >
      <div className="aspect-[4/4] p-20 overflow-hidden bg-gray-200 relative">
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
      </div>
      <div className="p-4 text-sm text-neutral-500">
        <div className="flex flex-col items-start justify-between">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 absolute top-4 right-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
        </div>
      </div>
    </div>
  );
}
