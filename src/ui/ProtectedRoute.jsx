import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ role, tab, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'none') navigate('/home');

    const token = localStorage.getItem('token');
    const roles = localStorage.getItem('roles');

    if (!token) {
      navigate('/auth');
      return;
    }

    if (role === 'all') navigate('/profile');

    if (!roles || !roles.includes(role)) {
      navigate('/not-authorized');
      return;
    }

    switch (role) {
      case '0':
        navigate(`/admin/${tab}`);
        break;
      case '5':
        navigate(`/instructor/${tab}`);
        break;
      default:
        navigate('/not-authorized');
        break;
    }
  }, [navigate, role, tab]);

  return children; // Return children elements if all checks pass
};

export default ProtectedRoute;
