import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('0');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { loginFunc, loginLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Must specify a username and password');
      return;
    }

    loginFunc({ username, password, role });
  };

  const toggleForm = (mode) => {
    setIsSignUp(mode === 'signup');
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
        <span onClick={() => navigate(-1)}>&larr; Back</span>
      </div>

      <div className="auth-container">
        <AuthTabs isSignUp={isSignUp} toggleForm={toggleForm} />
        <form className="auth-card" onSubmit={handleSubmit}>
          <AuthTitle isSignUp={isSignUp} />
          {/* <ErrorMessage error={error} /> */}
          <AuthButtonGroup isSignUp={isSignUp} />
          <SeparatorLine text={'or'} />

          {/* Username Input */}
          <AuthInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password Input */}
          <AuthInput
            type="password"
            placeholder="Password"
            isPassword={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Role Dropdown */}
          <AuthRoleSelector
            type="text"
            placeholder="Your Role"
            selectedRole={role}
            setSelectedRole={setRole}
          />

          <ValidationErrorMessage error={error} />

          {/* Additional Elements */}
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

          {/* Sign-In Links */}
          {!isSignUp && <AuthLinks />}
        </form>
      </div>
    </>
  );
};

export default AuthForm;
