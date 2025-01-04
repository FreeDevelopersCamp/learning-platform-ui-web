import styled from 'styled-components';

const TotalStyle = styled.div`
  padding-top: 3px;
`;

function Total({ filter, count }) {
  return (
    <TotalStyle>
      {count || '0'} {filter === 'all' ? 'Items' : filter}
    </TotalStyle>
  );
}

export default Total;
