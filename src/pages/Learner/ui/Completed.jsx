import styled from 'styled-components';
import CourseCard from '../../../features/courses/CourseCard';

const CompletedContainer = styled.div`
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr 1fr 1fr);
  gap: 1.5rem;
  padding: 1rem;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--color-primary);
`;

function Completed({ items }) {
  if (!items || items.length === 0) return <p>No completed courses.</p>;

  return (
    <CompletedContainer>
      <Title>Completed</Title>
      <Grid>
        {items.map((item, index) => (
          <CourseCard key={index} courseId={item} filter={'All'} />
        ))}
      </Grid>
    </CompletedContainer>
  );
}

export default Completed;
