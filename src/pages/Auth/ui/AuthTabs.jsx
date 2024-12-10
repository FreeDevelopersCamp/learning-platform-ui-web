import { useNavigate } from 'react-router-dom';

const AuthTabs = ({ isSignUp, toggleForm }) => {
  const navigate = useNavigate();

  const handleNavigation = (mode) => {
    toggleForm(mode);
    navigate(`/${mode}`);
  };

  return (
    <div className="auth-tabs">
      <button
        className={`auth-tab ${isSignUp ? 'active' : ''}`}
        onClick={() => handleNavigation('signup')}
      >
        Sign Up
      </button>
      <button
        className={`auth-tab ${!isSignUp ? 'active' : ''}`}
        onClick={() => handleNavigation('login')}
      >
        Sign In
      </button>
    </div>
  );
};

export default AuthTabs;
