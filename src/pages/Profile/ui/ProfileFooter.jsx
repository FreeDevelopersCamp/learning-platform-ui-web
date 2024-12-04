import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 5rem;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 600;
`;

function ProfileFooter() {
  return (
    <StyledContainer>
      <p>Powered by</p>
      <Title>FreeDevelopersCamp</Title>
    </StyledContainer>
  );
}

export default ProfileFooter;
