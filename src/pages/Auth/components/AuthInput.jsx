import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const AuthInput = ({
  type,
  placeholder,
  isPassword = false,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-container">
      <input
        type={isPassword && showPassword ? 'text' : type} // Toggle between text and password for password field
        placeholder={placeholder}
        className="auth-input"
        value={value} // Pass value prop if provided
        onChange={onChange} // Pass onChange prop if provided
      />
      {isPassword && (
        <button
          className="show-password"
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        >
          {showPassword ? (
            <FiEyeOff style={{ fontSize: '20px', marginRight: '15px', color: 'var(--color-grey-300)' }} />
          ) : (
            <FiEye style={{ fontSize: '20px', marginRight: '15px', color: 'var(--color-grey-300)' }} />
          )}
        </button>
      )}
    </div>
  );
};

export default AuthInput;
