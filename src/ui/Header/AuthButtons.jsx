import React from 'react';
import { Link } from 'react-router-dom';
import './authButtons.css';

const AuthButtons = () => (
  <div className="auth-buttons">
    <Link to="auth">
      <button className="login-button-homePage">Log In</button>
    </Link>
    <Link to="auth">
      <button className="signup-button-homePage">Sign up</button>
    </Link>
  </div>
);

export default AuthButtons;
