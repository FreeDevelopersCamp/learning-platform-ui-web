import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1100px;
  height: 225px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #01162e;
  color: #ffffff;

  padding: 30px 25px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

function Heading({ title, description }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
}

export default Heading;
