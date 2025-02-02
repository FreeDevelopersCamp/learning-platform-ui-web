import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  height: 45px;
  border: 2px solid var(--color-grey-400);
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  background-color: var(--color-grey-100);
  transition: all 0.1s ease-in-out;
  margin: 1.5rem 0;

  &:hover {
    border-color: var(--color-grey-500);
  }

  &:focus-within {
    border-color: var(--color-brand-500);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none !important;
  outline: none !important;
  background: transparent;
  font-size: 1.4rem;
  padding-left: 0.8rem;
  width: 100%;

  &::placeholder {
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }

  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  font-size: 1.8rem !important;
  color: var(--color-grey-600);
  flex-shrink: 0;
`;

function Filter({ onSearchChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    onSearchChange(query); // ✅ Update search in real-time
  };

  return (
    <SearchContainer>
      <StyledSearchIcon />
      <SearchInput
        type="text"
        placeholder="Search Projects..."
        value={searchQuery}
        onChange={handleChange}
      />
    </SearchContainer>
  );
}

export default Filter;
