import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../auth-context';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  token: 'test-token',
};

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

const TestComponent = () => {
  const { user, login, logout } = useAuth();
  return (
    <div>
      {user ? (
        <>
          <div data-testid="user-name">{user.name}</div>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <button onClick={() => login('test@example.com', 'password')}>
          Login
        </button>
      )}
    </div>
  );
};

describe('AuthContext', () => {
  it('provides authentication context to children', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  // Add more tests for login, logout, and error handling
});
