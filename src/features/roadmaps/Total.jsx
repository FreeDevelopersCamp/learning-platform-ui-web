import styled from 'styled-components';

const TotalStyle = styled.div`
  padding: 0 0 50px;
`;

function Total({ filter, count }) {
  const capitalizedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);

  return (
    <TotalStyle>
      {count || '0'} {filter === 'all' ? 'Items' : capitalizedFilter}
    </TotalStyle>
  );
}

export default Total;
