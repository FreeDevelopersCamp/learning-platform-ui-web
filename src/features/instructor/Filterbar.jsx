import styled from 'styled-components';

import Filter from './Filter';

const StyledFilterbar = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  z-index: 999;
  padding: 0;
  border: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow: hidden;
  margin-bottom: 5rem;
`;

function Filterbar({ onSearchChange }) {
  return (
    <StyledFilterbar>
      <Filter onSearchChange={onSearchChange} />
    </StyledFilterbar>
  );
}

export default Filterbar;
