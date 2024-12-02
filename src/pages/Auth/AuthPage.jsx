import React, { useState } from 'react';
import Header from '../../ui/Header/Header';
import AuthTabs from './ui/AuthTabs';
import AuthForm from './ui/AuthForm';
import './auth.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Default to 'Sign In'

  const toggleForm = (mode) => {
    setIsSignUp(mode === 'signup');
  };

  return (
    <>
      <div style={{ boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)' }}>
        <Header isAuth={true} />
      </div>
      <div className="auth-container">
        <AuthTabs isSignUp={isSignUp} toggleForm={toggleForm} />
        <AuthForm isSignUp={isSignUp} />
      </div>
    </>
  );
};

export default AuthPage;
