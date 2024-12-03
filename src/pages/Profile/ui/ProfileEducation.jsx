import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 600;
`;

function ProfileEducation() {
  return (
    <StyledContainer>
      <Title>My Education</Title>
      <p>Take a look at my formal education</p>
    </StyledContainer>
  );
}

export default ProfileEducation;
