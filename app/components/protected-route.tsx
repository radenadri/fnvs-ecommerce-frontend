import { Navigate } from 'react-router';
import { useAuth } from '~/contexts/auth-context';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
