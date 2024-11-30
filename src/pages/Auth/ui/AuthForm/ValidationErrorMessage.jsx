import React from "react";
import { FiAlertTriangle } from "react-icons/fi"; // Import alert icon

const ValidationErrorMessage = ({ isSignUp, error }) => {
  return isSignUp && error ? (
    <div className="auth-validation-error">
      <FiAlertTriangle className="error-icon" /> {error}
    </div>
  ) : null;
};

export default ValidationErrorMessage;
