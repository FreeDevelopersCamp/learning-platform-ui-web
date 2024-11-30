import React from "react";
import { Link } from "react-router-dom";

const AuthPrimaryButton = ({ isSignUp, onClick }) => (
  <Link to="/www.freeDevloperCamp.com">
    <button className="auth-button primary" onClick={onClick}>
      {isSignUp ? "Sign up" : "Sign in"}{" "}
      <span
        className="arrow"
        style={{
          marginLeft: "10px",
        }}
      >
        {" "}
        →
      </span>
    </button>
  </Link>
);

export default AuthPrimaryButton;
