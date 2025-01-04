import styled from 'styled-components';

const TotalStyle = styled.div`
  padding: 0 0 15px;
  font-size: 1.5rem;
`;

function Total({ filter, count }) {
  const displayFilter = filter === 'all' ? 'Items' : filter;

  return (
    <TotalStyle>
      {count || 0} {displayFilter}
    </TotalStyle>
  );
}

export default Total;
