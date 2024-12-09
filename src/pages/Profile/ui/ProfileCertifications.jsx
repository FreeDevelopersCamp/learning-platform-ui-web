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

function ProfileCertifications({ certifications }) {
  return (
    <StyledContainer>
      <Title>My Certifications</Title>
      <p>{certifications.subtitle}</p>
    </StyledContainer>
  );
}

export default ProfileCertifications;
