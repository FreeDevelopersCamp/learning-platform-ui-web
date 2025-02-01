import styled from 'styled-components';

import RoadmapFetcher from './RoadmapFetcher';
import CourseFetcher from './CourseFetcher';
import ProjectFetcher from './ProjectFetcher';

const InProgressContainer = styled.div`
  margin: 2rem 18rem;
`;

const Section = styled.div`
  margin-bottom: 3rem; /* Space between sections */
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

function InProgress({
  roadmaps = [],
  courses = [],
  projects = [],
  userProgress,
}) {
  const isEmpty = !roadmaps.length && !courses.length && !projects.length;
  if (isEmpty) return <p>No current roadmaps, courses, or projects.</p>;

  return (
    <InProgressContainer>
      {roadmaps.length > 0 && (
        <Section>
          <SectionTitle>📌 Roadmaps in Progress</SectionTitle>
          <Grid>
            {roadmaps.map((roadmap) => (
              <RoadmapFetcher
                key={roadmap.itemId}
                id={roadmap.itemId}
                userProgress={userProgress}
              />
            ))}
          </Grid>
        </Section>
      )}

      {courses.length > 0 && (
        <>
          <div style={{ height: '30px' }}></div> {/* Space between sections */}
          <Section>
            <SectionTitle>📚 Courses in Progress</SectionTitle>
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
        </>
      )}

      {projects.length > 0 && (
        <>
          <div style={{ height: '30px' }}></div> {/* Space between sections */}
          <Section>
            <SectionTitle>🚀 Projects in Progress</SectionTitle>
            <Grid>
              {projects.map((project) => (
                <ProjectFetcher
                  key={project.id}
                  id={project.id}
                  userProgress={userProgress}
                />
              ))}
            </Grid>
          </Section>
        </>
      )}
    </InProgressContainer>
  );
}

export default InProgress;
