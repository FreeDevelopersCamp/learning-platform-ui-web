import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  margin: auto;
`;

function Row({ children }) {
  return <Container>{children}</Container>;
}

export default Row;
