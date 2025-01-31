import styled from 'styled-components';
import Filter from './Filter';

const StyledFilterbar = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px; /* ✅ Match input size */
  z-index: 999;
  padding: 0;
  border: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
`;

function Filterbar({ onSearchChange }) {
  return (
    <StyledFilterbar>
      <Filter onSearchChange={onSearchChange} /> {/* ✅ Pass the handler */}
    </StyledFilterbar>
  );
}

export default Filterbar;
