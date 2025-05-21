import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { API_VERSION, BASE_URL } from '~/config';

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');

      if (!token || token === 'undefined') {
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/api/${API_VERSION}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { success, data } = response.data;

        if (!success) {
          setUser(null);
          return;
        }

        setUser({
          ...data,
          id: data.id,
          name: data.name,
          email: data.email,
        });
      } catch (err) {
        console.error('Failed to check authentication :', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/${API_VERSION}/auth/login`,
        { email, password }
      );

      const { success, data } = response.data;

      if (!success) {
        throw new Error('Login failed');
      }

      const token = data.token;
      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        token: token,
      };

      setUser(user);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `${BASE_URL}/api/${API_VERSION}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(null);

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
