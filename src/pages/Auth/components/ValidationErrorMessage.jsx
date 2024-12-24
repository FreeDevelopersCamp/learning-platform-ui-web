import { FiAlertTriangle } from 'react-icons/fi'; // Import alert icon

const ValidationErrorMessage = ({ error }) => {
  return error ? (
    <div className="auth-validation-error">
      <FiAlertTriangle className="error-icon" /> {error}
    </div>
  ) : null;
};

export default ValidationErrorMessage;
