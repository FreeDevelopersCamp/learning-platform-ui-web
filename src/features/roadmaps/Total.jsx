import styled from 'styled-components';

const TotalStyle = styled.div`
  padding: 10px 0 20px 0;
`;

function Total({ filter, count }) {
  const capitalizedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);

  return (
    <TotalStyle>
      {count} {filter === 'all' ? 'Items' : capitalizedFilter}
    </TotalStyle>
  );
}

export default Total;
