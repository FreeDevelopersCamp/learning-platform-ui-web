import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  background-color: ${(props) =>
    props.active ? 'var(--color-blue-500)' : 'var(--color-grey-100)'};
  color: ${(props) => (props.active ? 'white' : 'var(--color-grey-800)')};
  border: none;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-600);
    color: white;
  }
`;

function Filterbar({ activeFilter, onFilterChange }) {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Bookmarks', value: 'bookmarks' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <FilterContainer>
      {filters.map((filter) => (
        <FilterButton
          key={filter.value}
          active={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
}

export default Filterbar;
