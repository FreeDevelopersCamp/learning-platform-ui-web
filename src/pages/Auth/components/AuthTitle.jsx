import React from "react";

const AuthTitle = ({ isSignUp }) => {
  return (
    <>
      <h1>{isSignUp ? "Create your account." : "Sign in to your account."}</h1>
      <p className="auth-subtitle" style={{ margin: "0 70px" }}>
        Build skills for today, tomorrow, and beyond. Education to future-proof
        your career.
      </p>
    </>
  );
};

export default AuthTitle;
