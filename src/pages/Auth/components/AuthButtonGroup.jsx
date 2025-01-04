import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const AuthButtonGroup = ({ isSignUp }) => {
  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("GitHub user:", user);

      // You can handle token or user data here
      const token = await user.getIdToken();
      console.log("Firebase Token:", token);
    } catch (error) {
      console.error("GitHub Login Error:", error.message);
    }
  };

  return (
    <div className="auth-button-group">
      <button className="auth-button google" onClick={handleGitHubLogin}>
        <img src="/path/to/github-icon.svg" alt="GitHub icon" />
        {isSignUp ? "Sign up with GitHub" : "Sign in with GitHub"}
      </button>
    </div>
  );
};

export default AuthButtonGroup;
