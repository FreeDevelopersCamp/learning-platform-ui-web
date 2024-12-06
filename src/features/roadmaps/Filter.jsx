import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  display: flex;
  padding: 1.4rem 0;
  gap: 0.8rem;
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ options, filterField, onFilterChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);

    onFilterChange(value);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          aria-pressed={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
