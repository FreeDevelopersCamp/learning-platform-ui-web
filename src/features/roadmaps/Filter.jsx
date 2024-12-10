import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1.4rem 0;
  gap: 0.8rem;
  width: 100%;
  border: none;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-100);
  border: none;
  border-radius: 3px;
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.8rem 1rem;
  transition: all 0.1s;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
       background-color: var(--color-mutedblue-900);
       color: white;
    `}

  &:disabled {
    background-color: var(--color-mutedblue-900);
    cursor: not-allowed;
  }
`;

function Filter({ options = [], filterField, onFilterChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter =
    searchParams?.get(filterField) ||
    (options?.length > 0 ? options[0]?.value : '');

  const handleClick = (value) => {
    if (value !== currentFilter) {
      searchParams?.set(filterField, value);
      setSearchParams(searchParams);

      onFilterChange(value);
    }
  };

  return (
    <StyledFilter>
      {options?.length > 0 ? (
        options?.map((option) => (
          <FilterButton
            key={option?.value}
            onClick={() => handleClick(option?.value)}
            active={option?.value === currentFilter}
            disabled={option?.value === currentFilter}
            aria-pressed={option?.value === currentFilter}
          >
            {option?.label}
          </FilterButton>
        ))
      ) : (
        <span>No options available</span>
      )}
    </StyledFilter>
  );
}

export default Filter;
