import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../../../hooks/auth/useLogin';

import AuthTabs from './AuthTabs';
import AuthButtonGroup from './AuthButtonGroup';
import AuthInput from './AuthInput';
import AuthTermsText from './AuthTermsText';
import AuthPrimaryButton from './AuthPrimaryButton';
import AuthLinks from './AuthLinks';
import AuthTitle from './AuthTitle';
import SeparatorLine from './SeparatorLine';
import ValidationErrorMessage from './ValidationErrorMessage';
import AuthRoleSelector from './AuthRoleSelector';

import Spinner from '../../../ui/Spinner';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignUp, setIsSignUp] = useState(
    location.pathname.includes('signup'),
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('0');
  const [error, setError] = useState('');

  const { loginFunc, loginLoading } = useLogin();

  useEffect(() => {
    setIsSignUp(location.pathname.includes('signup'));
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Must specify a username and password');
      return;
    }

    loginFunc({ username, password, role });
  };

  if (loginLoading) return <Spinner />;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '25px',
          cursor: 'pointer',
        }}
      >
        <span onClick={() => navigate('/home')}>&larr; Back</span>
      </div>

      <div className="auth-container">
        <AuthTabs
          isSignUp={isSignUp}
          toggleForm={(mode) => setIsSignUp(mode === 'signup')}
        />
        <form className="auth-card" onSubmit={handleSubmit}>
          <AuthTitle isSignUp={isSignUp} />
          <AuthButtonGroup isSignUp={isSignUp} />
          <SeparatorLine text={'or'} />

          <AuthInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <AuthInput
            type="password"
            placeholder="Password"
            isPassword={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AuthRoleSelector
            type="text"
            placeholder="Your Role"
            selectedRole={role}
            setSelectedRole={setRole}
          />

          <ValidationErrorMessage error={error} />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AuthTermsText isSignUp={isSignUp} />
            <AuthPrimaryButton isSignUp={isSignUp} />
          </div>

          {!isSignUp && <AuthLinks />}
        </form>
      </div>
    </>
  );
};

export default AuthForm;
