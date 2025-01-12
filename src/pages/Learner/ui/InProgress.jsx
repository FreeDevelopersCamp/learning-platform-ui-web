import styled from 'styled-components';

const InProgressContainer = styled.div`
  margin: 2rem 18rem;
`;

const ProgressCard = styled.div`
  background-color: var(--color-grey-50);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

function InProgress({ courses }) {
  if (courses.length === 0) return;

  return (
    <InProgressContainer>
      <h2>In Progress</h2>
      {courses.map((item) => (
        <ProgressCard key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </ProgressCard>
      ))}
    </InProgressContainer>
  );
}

export default InProgress;
