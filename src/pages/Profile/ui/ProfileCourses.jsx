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

function ProfileCourses() {
  return (
    <StyledContainer>
      <Title>FreeDevelopersCamp Course Completion</Title>
      <p>
        Take a look at all the courses I’ve completed on FreeDevelopersCamp.
      </p>
    </StyledContainer>
  );
}

export default ProfileCourses;
