import { useProducts } from '~/hooks/use-products';
import BackButton from './back-button';
import { useAuth } from '~/contexts/auth-context';

export default function ProductDetailSection({ slug }: { slug?: string }) {
  const { user } = useAuth();

  const { products, isLoading, isError } = useProducts(slug, user?.token);

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col gap-2 h-full justify-between col-span-2 lg:col-auto animate-pulse">
          <div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mt-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
          </div>
        </div>
        <div className="col-span-2 md:my-12 flex flex-col gap-2">
          <div className="bg-gray-200 rounded-xl h-120 w-full"></div>
        </div>
      </>
    );
  }

  if (isError) {
    const err = new Error('You must be logged in to view this page');
    throw err;
  }

  const { data: product } = products;

  return (
    <>
      <div className="flex flex-col gap-2 h-full justify-between col-span-2 lg:col-auto">
        <div>
          <h1 className="text-lg text-neutral-600 font-mono tracking-tight text-balance">
            {product.name}
          </h1>
          <h2 className="text-2xl font-mono mt-3">${product.price / 100}</h2>
          <p className="text-neutral-500 mt-2 text-sm">{product.description}</p>
        </div>
        <div className="gap-2 mt-4 flex flex-col h-full">
          <BackButton />
        </div>
      </div>
      <div className="col-span-2 md:my-12 flex flex-col gap-2">
        <img
          src={product.image}
          alt={product.name}
          className="object-center object-contain rounded-xl h-120 w-full scale-125"
        />
      </div>
    </>
  );
}
