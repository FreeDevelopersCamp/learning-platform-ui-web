import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const role = '0';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roles = localStorage.getItem('roles');

    if (!token) {
      navigate('/auth');
      return;
    }

    if (!roles || !roles.includes(role)) {
      navigate('/not-authorized');
      return;
    }

    switch (role) {
      case '0':
        navigate('/admin/permissions');
        break;
      case '5':
        navigate('/instructor/dashboard');
        break;
      default:
        navigate('/not-authorized');
        break;
    }
  }, [navigate, role]);

  return children; // Return children elements if all checks pass
};

export default ProtectedRoute;
