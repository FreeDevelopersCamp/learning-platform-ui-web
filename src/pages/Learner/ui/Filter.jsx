import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-100);
  border: none;
  border-radius: 3px;
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.8rem 1rem;
  cursor: pointer;
  outline: none; /* Removes the focus outline */
  transition: all 0.1s;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-mutedblue-900);
      color: white;
    `}

  &:disabled {
    background-color: var(--color-grey-300);
    cursor: not-allowed;
  }

  &:focus {
    outline: none; /* Removes the border when clicked or focused */
  }
`;

function Filter({ options, activeFilter, onFilterChange }) {
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={option.value === activeFilter}
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
