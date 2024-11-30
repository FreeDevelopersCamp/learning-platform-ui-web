import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    const roles = localStorage.getItem('roles');
    console.log('Roles:', roles);

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
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/not-authorized');
        break;
    }
  }, [navigate, role]);

  return children; // Return children elements if all checks pass
};

export default ProtectedRoute;
