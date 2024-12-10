import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  color: #374151;
  font-family: 'Poppins', sans-serif;
`;

function ProfileWorkExperience() {
  return (
    <StyledContainer>
      <Title>My Work Experience</Title>
      <p>Where I've interned and worked during my career.</p>
    </StyledContainer>
  );
}

export default ProfileWorkExperience;
