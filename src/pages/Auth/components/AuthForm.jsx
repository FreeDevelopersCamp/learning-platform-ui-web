import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth/AuthContext';

import AuthTabs from './AuthTabs';
import AuthButtonGroup from './AuthButtonGroup';
import AuthInput from './AuthInput';
import AuthTermsText from './AuthTermsText';
import AuthPrimaryButton from './AuthPrimaryButton';
import AuthLinks from './AuthLinks';
import AuthTitle from './AuthTitle';
import SeparatorLine from './SeparatorLine';
import ValidationErrorMessage from './ValidationErrorMessage';
import AuthRoleSelector from './AuthRoleSelector';
import Spinner from '../../../ui/Spinner';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(''); // Updated for gender selection
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login, signup, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !username ||
      !password ||
      (isSignUp && (!email || !firstName || !lastName || gender === ''))
    ) {
      setError('All fields are required for sign-up.');
      return;
    }

    try {
      if (isSignUp) {
        await signup({
          username,
          password,
          email,
          roles,
          firstName,
          lastName,
          gender: parseInt(gender), // Convert gender to 0 or 1
        });
      } else {
        await login({ username, password, role: roles[0] });
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('Authentication failed', err);
    }
  };

  const toggleForm = (mode) => {
    setIsSignUp(mode === 'signup');
    setError('');
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '25px',
          cursor: 'pointer',
        }}
      >
        <span onClick={() => navigate(-1)}>&larr; Back</span>
      </div>

      <div className="auth-container">
        <AuthTabs isSignUp={isSignUp} toggleForm={toggleForm} />

        <form className="auth-card" onSubmit={handleSubmit}>
          <AuthTitle isSignUp={isSignUp} />
          <AuthButtonGroup isSignUp={isSignUp} onBackendLogin={handleSubmit} />

          <SeparatorLine text={'or'} />

          {/* Username Input */}
          <AuthInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password Input */}
          <AuthInput
            type="password"
            placeholder="Password"
            isPassword={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Additional Fields for Sign-Up */}
          {isSignUp && (
            <>
              <AuthInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <AuthInput
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <AuthInput
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              {/* Gender Selector */}
              <div style={{ marginBottom: '15px' }}>
                <label
                  htmlFor="gender"
                  style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '1.2rem',
                    marginTop: '8px',
                    border: '1px solid var(--color-grey-50)',
                    borderRadius: '5px',
                    backgroundColor: 'var(--color-grey-0)',
                  }}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
              </div>
            </>
          )}

          {/* Role Selector */}
          <AuthRoleSelector
            isSignUp={isSignUp}
            selectedRoles={roles}
            setSelectedRoles={setRoles}
          />

          <ValidationErrorMessage error={error} />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AuthTermsText isSignUp={isSignUp} />
            <AuthPrimaryButton isSignUp={isSignUp} />
          </div>

          {!isSignUp && <AuthLinks />}
        </form>
      </div>
    </>
  );
};

export default AuthForm;
