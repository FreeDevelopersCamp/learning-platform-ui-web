import React, { useState } from 'react';
import { useLogin } from '../../../hooks/auth/useLogin';

import AuthButtonGroup from './AuthButtonGroup';
import AuthInput from './AuthInput';
import AuthTermsText from './AuthTermsText';
import AuthPrimaryButton from './AuthPrimaryButton';
import AuthLinks from './AuthLinks';
import AuthTitle from './AuthTitle';
import SeparatorLine from './SeparatorLine';
import ErrorMessage from './ErrorMessage';
import AuthRoleSelector from './AuthRoleSelector';
import Spinner from '../../../ui/Spinner';

const AuthForm = ({ isSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('user'); // Role state
  const [error, setError] = useState('');

  const { loginFunc, loginLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Must specify a username and password');
      return;
    }
    console.log({ username, password, role: selectedRole });

    loginFunc({ username, password, role: selectedRole });
  };

  if (loginLoading) return <Spinner />;

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <AuthTitle isSignUp={isSignUp} />
      <ErrorMessage error={error} />
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
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

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
