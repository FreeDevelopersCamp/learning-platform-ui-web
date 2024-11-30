import React from "react";

const ErrorMessage = ({ isSignUp, error }) => {
  return !isSignUp && error ? <div className="auth-error">{error}</div> : null;
};

export default ErrorMessage;
