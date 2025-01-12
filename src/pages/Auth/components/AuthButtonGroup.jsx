import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

import GoogleIcon from '@/assets/icons/google.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';

const AuthButtonGroup = ({ isSignUp, onBackendLogin }) => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Google User Email:', user.email);

      // Call backend login API with the email and predefined password
      onBackendLogin({
        email: user.email,
        password: 'Admin@123', // Replace with your predefined password
      });
    } catch (error) {
      console.error('Google Login Error:', error.message);
    }
  };

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('GitHub User Email:', user.email);

      // Call backend login API with the email and predefined password
      onBackendLogin({
        email: user.email,
        password: 'Admin@123', // Replace with your predefined password
      });
    } catch (error) {
      console.error('GitHub Login Error:', error.message);
    }
  };

  return (
    <div className="auth-button-group">
      <button className="auth-button google gap-4" onClick={handleGoogleLogin}>
        <img src={GoogleIcon} alt="Google icon" className="w-10 h-10" />
        {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
      </button>

      <button
        className="auth-button facebook gap-4"
        onClick={handleGitHubLogin}
      >
        <img src={FacebookIcon} alt="Facebook icon" className="w-10 h-10" />
        {isSignUp ? 'Sign up with Facebook' : 'Sign in with Facebook'}
      </button>
    </div>
  );
};

export default AuthButtonGroup;
