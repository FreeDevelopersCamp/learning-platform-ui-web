import React from 'react';

const AuthPrimaryButton = ({ isSignUp, onClick }) => (
  <button className="auth-button primary" onClick={onClick}>
    {isSignUp ? 'Sign up' : 'Sign in'}{' '}
    <span
      className="arrow"
      style={{
        marginLeft: '10px',
      }}
    >
      {' '}
      →
    </span>
  </button>
);

export default AuthPrimaryButton;
