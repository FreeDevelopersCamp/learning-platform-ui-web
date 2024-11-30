import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { account } from "../../../../lib/appwrite";
// import { login } from "../../../../services/api/authService";
import './authButtonGroup.css';
import GoogleIcon from '../../../../assets/icons/google.svg';
import FacebookIcon from '../../../../assets/icons/facebook.svg';

const AuthButtonGroup = ({ isSignUp, onGoogleLogin }) => {
  const [isFailParams] = useSearchParams();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [isFail, setIsFail] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const failStatus = isFailParams.get('isFail');
    setIsFail(failStatus);
    console.log('isFail: ', isFail);
  }, []);

  // async function login() {
  //   try {
  //     setIsLoading(true);

  //   } catch (error) {
  //     console.error('OAuth2 Login Failed: ', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="auth-button-group">
      <button className="auth-button google">
        <img src={GoogleIcon} alt="Google icon" />
        {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
      </button>

      <button className="auth-button facebook" onClick={onGoogleLogin}>
        <img src={FacebookIcon} alt="Facebook icon" />
        {isSignUp ? 'Sign up with Facebook' : 'Sign in with Facebook'}
      </button>
    </div>
  );
};

export default AuthButtonGroup;
