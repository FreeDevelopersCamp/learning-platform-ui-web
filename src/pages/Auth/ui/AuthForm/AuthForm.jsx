import React, { useState } from 'react';
import { useLogin } from '../../../../hooks/auth/useLogin';

import AuthButtonGroup from './AuthButtonGroup';
import AuthInput from './AuthInput';
import AuthTermsText from './AuthTermsText';
import AuthPrimaryButton from './AuthPrimaryButton';
import AuthLinks from './AuthLinks';
import AuthTitle from './AuthTitle';
import ErrorMessage from './ErrorMessage';
import ValidationErrorMessage from './ValidationErrorMessage';
import Spinner from './../../../../ui/Spinner';

const AuthForm = ({ isSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginFunc, loginLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Must specify a username and password');
      return;
    }
    console.log(username, password);
    // Call the login function from the hook
    loginFunc({ username, password });
  };

  if (loginLoading) return <Spinner />;

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <AuthTitle isSignUp={isSignUp} />
      <ErrorMessage isSignUp={isSignUp} error={error} />
      <AuthButtonGroup isSignUp={isSignUp} />
      <AuthInput
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {!isSignUp && (
        <AuthInput
          type="password"
          placeholder="Password"
          isPassword={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      {isSignUp && <ValidationErrorMessage isSignUp={isSignUp} error={error} />}
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
  );
};

export default AuthForm;
