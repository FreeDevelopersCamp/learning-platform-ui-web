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

const WorkItem = styled.div`
  margin-top: 2rem;
  padding: 3rem 2rem;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.1rem;
  width: 50rem;
  height: 20rem;

  text-align: left;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

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
    font-size: 1.4rem;
    color: var(--color-blue-500);
    font-weight: 500;
    margin-bottom: 0;
    transition: color 0.3s ease;
    background-color: var(--color-cyan-500);
  }
`;

function ProfileWork({ work }) {
  return (
    <StyledContainer>
      <Title>My Work</Title>
      <p>{work.subtitle}</p>
      {work.works.map((item) => (
        <WorkItem key={`${item.name}-${item.description}`}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <div className="flex flex-row gap-4 items-center justify-start">
            {item.skills.map((skill) => (
              <span key={`${item.name}-${skill}`}>{skill}</span>
            ))}
          </div>
        </WorkItem>
      ))}
    </StyledContainer>
  );
}

export default ProfileWork;
