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

const Paragraph = styled.p`
  font-size: 1.8rem;
`;

function ProfileAbout() {
  return (
    <StyledContainer>
      <Title>About Me</Title>
      <Paragraph>
        Junior Computer Engineering with an enthusiasm for technology and
        expertise in backend, AI, ML, and data analysis. Engaged in technical
        communities and projects, eager for new opportunities.
      </Paragraph>
    </StyledContainer>
  );
}

export default ProfileAbout;
