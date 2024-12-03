import React from 'react';
import Header from '../../ui/Header/Header';
import AuthForm from './ui/AuthForm';
import './auth.css';

const AuthPage = () => {
  return (
    <>
      <div style={{ boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)' }}>
        <Header isAuth={true} />
      </div>
      <AuthForm />
    </>
  );
};

export default AuthPage;
