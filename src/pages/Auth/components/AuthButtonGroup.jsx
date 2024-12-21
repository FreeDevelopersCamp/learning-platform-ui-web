import './authButtonGroup.css';
import GoogleIcon from '../../../assets/icons/google.svg';
import FacebookIcon from '../../../assets/icons/facebook.svg';

const AuthButtonGroup = ({ isSignUp }) => {
  return (
    <div className="auth-button-group">
      <button className="auth-button google">
        <img src={GoogleIcon} alt="Google icon" />
        {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
      </button>

      <button className="auth-button facebook">
        <img src={FacebookIcon} alt="Facebook icon" />
        {isSignUp ? 'Sign up with Facebook' : 'Sign in with Facebook'}
      </button>
    </div>
  );
};

export default AuthButtonGroup;
