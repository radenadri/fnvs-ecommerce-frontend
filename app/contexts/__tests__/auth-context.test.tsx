import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from '../auth-context';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  token: 'test-token',
};

// Mock axios
vi.mock('axios', () => ({
  post: vi.fn(),
  get: vi.fn(),
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
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('provides authentication context to children', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles login successfully', async () => {
    const mockAxiosPost = vi.mocked(require('axios').post);
    mockAxiosPost.mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          token: 'test-token',
          user: mockUser,
        },
      },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
    });
  });

  it('handles logout successfully', async () => {
    // Setup initial logged in state
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockUser.token);

    const mockAxiosPost = vi.mocked(require('axios').post);
    mockAxiosPost.mockResolvedValueOnce({});

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for the user to be loaded from localStorage
    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    // Mock the confirm dialog
    window.confirm = vi.fn(() => true);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
  });
});
