import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1100px;
  min-height: 110px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--color-mutedblue-900);
  color: white;

  padding: 0 25px;
  margin-top: ${(props) => (props.isFilterbarFixed ? '5rem' : '0')};
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
  margin-top: 8px;
`;

function Heading({ title, description, isFilterbarFixed }) {
  return (
    <Container isFilterbarFixed={isFilterbarFixed}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
}

export default Heading;
