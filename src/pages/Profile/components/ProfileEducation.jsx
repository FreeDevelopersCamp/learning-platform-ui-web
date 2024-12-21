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

const EducationCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const WorkItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  width: 80rem;
  height: 14rem;
  padding: 3rem 2rem;

  text-align: left;
  background-color: var(--color-coolgray-100);
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);

  h1 {
    font-size: 2rem;
    color: var(--color-grey-700);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.6rem;
    color: var(--color-grey-600);
    font-weight: 500;
    margin-bottom: 1rem;
  }

  span {
    border-radius: 15%;
    padding: 0.5rem;
    font-size: 1.4rem;
    color: var(--color-grey-50);
    font-weight: 500;
    margin-bottom: 0;
    transition: color 0.3s ease;
    background-color: var(--color-skyblue-600);
  }
`;

function ProfileEducation({ education }) {
  let subtitle = '';

  return (
    <StyledContainer>
      <Title>My Education</Title>
      <p>{education.subtitle || 'You have not added education yet.'}</p>
      <EducationCards>
        {education?.educations?.map((item) => {
          if (item?.school && item?.startDate && item?.endDate)
            subtitle = `${item.school} | ${item.startDate} - ${item.endDate}`;
          return (
            <WorkItem key={`${item.name}-${item.school}`}>
              <h1>{item.name}</h1>
              <h2>{subtitle}</h2>
            </WorkItem>
          );
        })}
      </EducationCards>
    </StyledContainer>
  );
}

export default ProfileEducation;
