import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, role }) => {
  const { auth, isLoading } = useAuth();

  if (isLoading || !auth) return <Spinner />;

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'all') return children;

  if (role && auth.role !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
