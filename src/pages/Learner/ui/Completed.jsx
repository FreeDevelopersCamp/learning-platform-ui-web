import styled from 'styled-components';
import CourseCard from '../../../features/courses/CourseCard';

const CompletedContainer = styled.div`
  margin: 2rem 18rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Exactly 3 cards per row */
  gap: 5rem; /* Increased gap between cards */
  padding: 1rem 0;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 2 cards per row for smaller screens */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(
      1,
      1fr
    ); /* 1 card per row for mobile screens */
  }
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--color-primary);
`;

function Completed({ courses = [], projects = [] }) {
  if (!courses.length && !projects.length)
    return <p>No completed courses or projects.</p>;

  return (
    <CompletedContainer>
      <Title>Completed</Title>
      <Grid>
        {courses.map((item, index) => (
          <CourseCard key={index} courseId={item} filter={'All'} />
        ))}
      </Grid>
    </CompletedContainer>
  );
}

export default Completed;
