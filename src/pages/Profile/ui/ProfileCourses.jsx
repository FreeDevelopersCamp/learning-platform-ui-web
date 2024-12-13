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

function ProfileCourses({ completedContent }) {
  return (
    <StyledContainer>
      <Title>FreeDevelopersCamp Course Completion</Title>
      <p>
        {completedContent.subtitle || 'You have not completed any content yet.'}
      </p>
    </StyledContainer>
  );
}

export default ProfileCourses;
