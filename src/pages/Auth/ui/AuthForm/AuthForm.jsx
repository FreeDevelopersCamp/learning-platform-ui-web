import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
<<<<<<< HEAD
// import { login as apiLogin } from "../../../../services/api/authService";
=======
import { login as apiLogin } from "../../../../services/apiAuth";
>>>>>>> 73391dddb0510a3dab148ccefb303a433135be8c
import AuthButtonGroup from "./AuthButtonGroup";
import AuthInput from "./AuthInput";
import AuthTermsText from "./AuthTermsText";
import AuthPrimaryButton from "./AuthPrimaryButton";
import AuthLinks from "./AuthLinks";
import AuthTitle from "./AuthTitle";
import ErrorMessage from "./ErrorMessage";
import ValidationErrorMessage from "./ValidationErrorMessage";
import SeparatorLine from "../../../../common/Header/components/SeparatorLine";

const AuthForm = ({ isSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Must specify a username or email and password");
      return;
    }

    // try {
    //   const token = await apiLogin(username, password);
    //   if (token) {
    //     login(token); // Save token to context and localStorage
    //     navigate("/www.freeDevloperCamp.com?isLogin=true");
    //   }
    // } catch (error) {
    //   setError("Login failed. Please check your credentials.");
    //   console.error("Login error:", error);
    // }
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <AuthTitle isSignUp={isSignUp} />
      <ErrorMessage isSignUp={isSignUp} error={error} />
      <AuthButtonGroup isSignUp={isSignUp} />
      <SeparatorLine text={"or"} />
      <AuthInput
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {!isSignUp && (
        <AuthInput
          type="password"
          placeholder="Password"
          isPassword={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      {isSignUp && <ValidationErrorMessage isSignUp={isSignUp} error={error} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AuthTermsText isSignUp={isSignUp} />
        <AuthPrimaryButton isSignUp={isSignUp} onClick={handleSubmit} />
      </div>
      {!isSignUp && <AuthLinks />}
    </form>
  );
};

export default AuthForm;
