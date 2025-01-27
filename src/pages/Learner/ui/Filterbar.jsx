import styled from 'styled-components';

import Filter from './Filter';

const StyledFilterbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

function Filterbar({ filterOptions, activeFilter, onFilterChange }) {
  return (
    <StyledFilterbar>
      <Filter
        options={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />
    </StyledFilterbar>
  );
}

export default Filterbar;
