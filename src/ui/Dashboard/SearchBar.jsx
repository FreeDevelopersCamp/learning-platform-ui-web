import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #f5f7fa;
  width: 100%;
  max-width: 300px;
  transition: box-shadow 0.2s, border-color 0.3s ease;

  &:hover {
    border-color: var(--color-brand-600);
  }

  &:focus-within {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-color: var(--color-brand-600);
  }
`;

const SearchIcon = styled.span`
  margin-right: 10px;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  width: 100%;
  background-color: transparent;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none; /* Removes the browser's default focus outline */
  }
`;

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <SearchBarContainer>
      <SearchIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="What do you want to learn?"
        value={searchText}
        onChange={handleInputChange}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
