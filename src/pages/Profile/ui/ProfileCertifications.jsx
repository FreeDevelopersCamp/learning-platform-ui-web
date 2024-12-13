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
  color: var(--color-grey-700);
`;

function ProfileCertifications({ certifications }) {
  return (
    <StyledContainer>
      <Title>My Certifications</Title>
      <p>
        {certifications.subtitle || 'You have not added certifications yet.'}
      </p>
    </StyledContainer>
  );
}

export default ProfileCertifications;
