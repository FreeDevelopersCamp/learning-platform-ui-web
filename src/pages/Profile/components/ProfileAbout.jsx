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

const Paragraph = styled.p`
  font-size: 1.8rem;
`;

function ProfileAbout({ about }) {
  return (
    <StyledContainer>
      <Title>About Me</Title>
      <Paragraph>{about || 'You have not added about section yet.'}</Paragraph>
    </StyledContainer>
  );
}

export default ProfileAbout;
