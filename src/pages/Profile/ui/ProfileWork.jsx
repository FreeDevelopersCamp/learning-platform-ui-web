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

const WorkCards = styled.div`
  display: ${(props) =>
    props.itemsNumber && props.itemsNumber < 2 ? 'flex' : 'grid'};
  grid-template-columns: ${(props) =>
    props.itemsNumber && props.itemsNumber >= 2 ? '1fr 1fr' : 'none'};
  gap: 4rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const WorkItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.1rem;
  width: 50rem;
  height: 20rem;
  padding: 3rem 2rem;

  text-align: left;
  background-color: var(--color-coolgray-100);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);

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

function ProfileWork({ work }) {
  return (
    <StyledContainer>
      <Title>My Work</Title>
      <p>{work.subtitle || 'You have not added works yet.'}</p>
      <WorkCards itemsNumber={work?.works?.length}>
        {work?.works?.map((item) => (
          <WorkItem key={`${item.name}-${item.description}`}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <div className="flex flex-row gap-4 items-center justify-start">
              {item?.skills?.map((skill) => (
                <span key={`${item.name}-${skill}`}>{skill}</span>
              ))}
            </div>
          </WorkItem>
        ))}
      </WorkCards>
    </StyledContainer>
  );
}

export default ProfileWork;
