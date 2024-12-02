import React, { useState } from 'react';
import { useLogin } from '../../../hooks/auth/useLogin';

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

const AuthForm = ({ isSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('0');
  const [error, setError] = useState('');

  const { loginFunc, loginLoading } = useLogin();

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
  );
};

export default AuthForm;
