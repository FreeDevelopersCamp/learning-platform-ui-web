import React from 'react';
import Header from '../../ui/Header/Header';
import AuthTabs from './ui/AuthTabs/AuthTabs';
import AuthForm from './ui/AuthForm/AuthForm';
import { useParams } from 'react-router-dom';
import './auth.css';

const AuthPage = () => {
  const { mode } = useParams();
  const isSignUp = mode === 'signup';

  return (
    <>
      <div style={{ boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)' }}>
        {' '}
        <Header isAuth={true} />
      </div>
      <div className="auth-container">
        <AuthTabs />
        <AuthForm isSignUp={isSignUp} />
      </div>
    </>
  );
};

export default AuthPage;
