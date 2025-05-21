import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ProductCard from '../product-card';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    slug: 'test-product',
    description: 'Test Description',
    price: 1000,
    image: 'test.jpg',
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  };

  it('renders loading state correctly', () => {
    render(<ProductCard isLoading={true} />);
    expect(screen.getByTestId('product-card-loader')).toBeInTheDocument();
  });

  it('renders product details correctly', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toHaveAttribute(
      'src',
      mockProduct.image
    );
  });
});
