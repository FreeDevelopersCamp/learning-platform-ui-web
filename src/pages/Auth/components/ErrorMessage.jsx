import React from 'react';

const ErrorMessage = ({ error }) => {
  return error ? <div className="auth-error">{error}</div> : null;
};

export default ErrorMessage;
