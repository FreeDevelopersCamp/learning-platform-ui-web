import React from "react";
import { Link, useParams } from "react-router-dom";

const AuthTabs = () => {
  const { mode } = useParams();
  const isSignUp = mode === "signup";

  return (
    <div className="auth-tabs">
      <Link to="/www.freeDevloperCamp.com/auth/signup">
        <button className={`auth-tab ${isSignUp ? "active" : ""}`}>
          Sign Up
        </button>
      </Link>
      <Link to="/www.freeDevloperCamp.com/auth/login">
        <button className={`auth-tab ${!isSignUp ? "active" : ""}`}>
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default AuthTabs;
