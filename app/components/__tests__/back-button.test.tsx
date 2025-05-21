import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import BackButton from '../back-button';

describe('BackButton', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Go home')).toBeInTheDocument();
    expect(screen.getByTitle('Go home')).toHaveAttribute('href', '/');
  });
});
