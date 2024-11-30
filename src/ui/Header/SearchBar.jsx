import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${({ isActive }) => (isActive ? "#0000ff" : "#f5f7fa")};
  border-radius: 25px;
  padding: 15px 15px;
  background-color: #f5f7fa;
  width: 100%;
  max-width: 310px;
  margin: 15px 15px 15px 0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #0000ff;
  }

  &:focus-within {
    border-color: #0000ff; /* Highlights parent border when child input is focused */
  }
`;

const SearchIcon = styled.span`
  margin-right: 10px;
  font-size: 20px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  width: 100%;
  background-color: transparent;

  &::placeholder {
    color: #333;
  }

  &:focus {
    outline: none; /* Removes the browser's default focus outline */
    border: none; /* Ensures no border appears on focus */
  }
`;

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <SearchBarContainer isActive={searchText.length > 0}>
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
