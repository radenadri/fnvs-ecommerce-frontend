import useSWR from 'swr';
import { API_VERSION, BASE_URL } from '~/config';
import { fetcher } from '~/utils/fetcher';

export function useProducts(slug?: string, token?: string) {
  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/api/${API_VERSION}/products/${slug ?? ''}`,
    async (url: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetcher(url, token);
    }
  );

  return {
    products: data,
    isLoading,
    isError: error,
  };
}
