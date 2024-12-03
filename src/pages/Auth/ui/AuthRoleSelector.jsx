import React from 'react';
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
  color: #555;
`;

const RoleDropdown = styled.select`
  width: 100%;
  padding: 15px;
  margin: 15px 0 0 5.5px;
  font-size: 1.4rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #555;
  -webkit-appearance: none; /* Remove default browser styling */
  -moz-appearance: none;
  appearance: none;
  position: relative;

  /* Add custom spacing for the arrow icon */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 13px) center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: #0000ff;
  }
`;

const RoleOption = styled.option`
  font-size: 1.4rem;
  color: #555;
`;

// Component Definition
const AuthRoleSelector = ({ selectedRole, setSelectedRole }) => {
  return (
    <RoleSelectorContainer>
      <RoleLabel htmlFor="role-selector">Select Role</RoleLabel>
      <RoleDropdown
        id="role-selector"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <RoleOption defaultValue value="0">
          Admin
        </RoleOption>
        <RoleOption value="1">Owner</RoleOption>
        <RoleOption value="2">Manager</RoleOption>
        <RoleOption value="3">Account Manager</RoleOption>
        <RoleOption value="4">Content Manager</RoleOption>
        <RoleOption value="5">Instructor</RoleOption>
        <RoleOption value="6">Learner</RoleOption>
      </RoleDropdown>
    </RoleSelectorContainer>
  );
};

export default AuthRoleSelector;
