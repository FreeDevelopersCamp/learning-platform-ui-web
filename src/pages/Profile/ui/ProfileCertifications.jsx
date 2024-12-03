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

function ProfileCertifications() {
  return (
    <StyledContainer>
      <Title>My Certifications</Title>
      <p>These are the industry credentials that I’ve earned.</p>
    </StyledContainer>
  );
}

export default ProfileCertifications;
