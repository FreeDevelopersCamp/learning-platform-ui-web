import styled from 'styled-components';

import CourseFetcher from './CourseFetcher';
import ProjectFetcher from './ProjectFetcher';

const BookmarksContainer = styled.div`
  margin: 2rem 18rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-grey-900);
  margin-bottom: 1rem;
  border-left: 5px solid var(--color-blue-600);
  padding-left: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem 0;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function Bookmarks({ courses = [], projects = [], userProgress }) {
  const isEmpty = !courses.length && !projects.length;
  if (isEmpty) return <p>No Bookmarks Available</p>;

  return (
    <BookmarksContainer>
      {courses.length > 0 && (
        <Section>
          <SectionTitle>📚 Bookmarked Courses</SectionTitle>
          <Grid>
            {courses.map((course) => (
              <CourseFetcher
                key={course.itemId}
                id={course.itemId}
                userProgress={userProgress}
              />
            ))}
          </Grid>
        </Section>
      )}
      {projects.length > 0 && <div style={{ height: '30px' }}></div>}{' '}
      {/* Space between sections */}
      {projects.length > 0 && (
        <Section>
          <SectionTitle>🚀 Bookmarked Projects</SectionTitle>
          <Grid>
            {projects.map((project) => (
              <ProjectFetcher
                key={project.itemId}
                id={project.itemId}
                userProgress={userProgress}
              />
            ))}
          </Grid>
        </Section>
      )}
    </BookmarksContainer>
  );
}

export default Bookmarks;
