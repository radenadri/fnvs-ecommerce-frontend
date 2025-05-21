import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProducts } from '../use-products';
import { fetcher } from '~/utils/fetcher';

// Mock the fetcher utility
vi.mock('~/utils/fetcher', () => ({
  fetcher: vi.fn(),
}));

// Mock the config values
vi.mock('~/config', () => ({
  BASE_URL: 'http://localhost:3000',
  API_VERSION: 'v1',
}));

// Mock SWR
vi.mock('swr', () => ({
  default: (key: string, fetchFn: Function) => {
    if (!key) return { data: undefined, error: undefined, isLoading: false };

    // Call the fetcher function directly for testing
    const data = fetchFn(key);
    return {
      data,
      error: undefined,
      isLoading: false,
    };
  },
}));

describe('useProducts', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches products without slug', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    vi.mocked(fetcher).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/products/',
        undefined
      );
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBeUndefined();
    });
  });

  it('fetches a specific product with slug', async () => {
    const mockProduct = { id: 1, name: 'Product 1' };
    vi.mocked(fetcher).mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useProducts('product-1'));

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/products/product-1',
        undefined
      );
      expect(result.current.products).toEqual(mockProduct);
    });
  });

  it('passes token when provided', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    vi.mocked(fetcher).mockResolvedValue(mockProducts);
    const token = 'test-token';

    const { result } = renderHook(() => useProducts(undefined, token));

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/products/',
        token
      );
    });
  });
});
