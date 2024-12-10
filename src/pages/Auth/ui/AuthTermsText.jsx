const AuthTermsText = ({ isSignUp }) => (
  <p className="auth-terms-text">
    By clicking "{isSignUp ? 'Sign up' : 'Sign in'}," you agree to our{' '}
    <a href="/terms">Terms of Use</a> and our{' '}
    <a href="/privacy">Privacy Policy</a>.
  </p>
);

export default AuthTermsText;
