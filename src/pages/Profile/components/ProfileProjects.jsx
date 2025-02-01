import { useNavigate } from 'react-router-dom';
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

const CertificationCards = styled.div`
  display: ${(props) =>
    props.itemsNumber && props.itemsNumber < 2 ? 'flex' : 'grid'};
  grid-template-columns: ${(props) =>
    props.itemsNumber && props.itemsNumber >= 2 ? '1fr 1fr' : 'none'};
  gap: 4rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const CertificationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.1rem;
  width: 50rem;
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

  a {
    font-size: 1.4rem;
    color: var(--color-skyblue-600);
    text-decoration: underline;
    margin-bottom: 1rem;

    &:hover {
      color: var(--color-skyblue-700);
    }
  }

  span {
    font-size: 1.4rem;
    color: var(--color-grey-500);
  }
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  color: var(--color-skyblue-600);
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: var(--color-skyblue-700);
  }
`;

function ProfileProjects({ progress }) {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <Title>Projects Completion</Title>

      {progress.completedProjects?.length === 0 && (
        // Projects
        <CertificationCards itemsNumber={progress.completedProjects?.length}>
          {progress.completedProjects?.length > 0 ? (
            progress.completedProjects.map((project) => (
              <CertificationItem key={`${project._id}`}>
                <h1>{project.name}</h1>
                <p>
                  {project.category} | {project.topic}
                </p>
                <StyledButton
                  onClick={() => navigate(`/project/${project._id}`)}
                >
                  See details
                </StyledButton>
              </CertificationItem>
            ))
          ) : (
            <h2>You haven't finished any projects yet.</h2>
          )}
        </CertificationCards>
      )}
    </StyledContainer>
  );
}

export default ProfileProjects;
