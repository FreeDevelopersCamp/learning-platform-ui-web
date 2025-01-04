import styled from 'styled-components';

const InProgressContainer = styled.div`
  margin-bottom: 2rem;
`;

const ProgressCard = styled.div`
  background-color: var(--color-grey-50);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

function InProgress({ items }) {
  if (items.length === 0) return <p>No courses in progress.</p>;

  return (
    <InProgressContainer>
      <h2>In Progress</h2>
      {items.map((item) => (
        <ProgressCard key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </ProgressCard>
      ))}
    </InProgressContainer>
  );
}

export default InProgress;
