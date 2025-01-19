import styled from 'styled-components';

// Styled Components
const RoleSelectorContainer = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RoleLabel = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 6px;
  color: var(--color-grey-800);
  margin-bottom: 8px;
`;

const RoleDropdown = styled.select`
  width: 100%;
  padding: 15px;
  margin: 15px 0 0 5.5px;
  font-size: 1.4rem;
  border: 2px solid var(--color-grey-50);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);

  &:focus {
    outline: none;
    border-color: var(--color-mutedblue-300);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  padding-left: 20px;
  flex-direction: column;
  gap: 8px;
`;

const RoleCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    transform: scale(1.2);
  }

  label {
    font-size: 1.2rem;
    color: var(--color-grey-800);
  }
`;

// Component Definition
const AuthRoleSelector = ({ isSignUp, selectedRoles, setSelectedRoles }) => {
  const rolesOptions = [
    { value: '0', label: 'Admin' },
    { value: '1', label: 'Owner' },
    { value: '2', label: 'Manager' },
    { value: '3', label: 'Account Manager' },
    { value: '4', label: 'Content Manager' },
    { value: '5', label: 'Instructor' },
    { value: '6', label: 'Learner' },
  ];

  const handleCheckboxChange = (value) => {
    if (selectedRoles.includes(value)) {
      setSelectedRoles(selectedRoles.filter((role) => role !== value));
    } else {
      setSelectedRoles([...selectedRoles, value]);
    }
  };

  return (
    <RoleSelectorContainer>
      <RoleLabel>{isSignUp ? 'Select Roles' : 'Select Role'}</RoleLabel>
      {isSignUp ? (
        <CheckboxContainer>
          {rolesOptions.map((role) => (
            <RoleCheckbox key={role.value}>
              <input
                type="checkbox"
                id={`role-${role.value}`}
                value={role.value}
                checked={selectedRoles.includes(role.value)}
                onChange={() => handleCheckboxChange(role.value)}
              />
              <label htmlFor={`role-${role.value}`}>{role.label}</label>
            </RoleCheckbox>
          ))}
        </CheckboxContainer>
      ) : (
        <RoleDropdown
          value={selectedRoles[0] || ''}
          onChange={(e) => setSelectedRoles([e.target.value])}
        >
          <option value="" disabled>
            Select a role
          </option>
          {rolesOptions.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </RoleDropdown>
      )}
    </RoleSelectorContainer>
  );
};

export default AuthRoleSelector;
