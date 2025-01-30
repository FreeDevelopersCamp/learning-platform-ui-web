import { useEffect } from 'react';
import styled from 'styled-components';

import { useFetchCourseById } from '../../hooks/courses/useCourse';
import { useUpdateProgress } from '../../hooks/learner/useProgress';

import Resources from './Resources';
import Exercises from './Exercises';
import Spinner from '../../ui/Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem 0;
  margin-top: 0;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  line-height: 1.5;
  padding: 1rem 0;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2.4rem;
  color: var(--color-grey-800);
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  color: var(--color-grey-800);
  margin-bottom: 1rem;
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResourceItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1.4rem;

  a {
    color: var(--color-blue-600);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function ViewCourse({ order, userProgress }) {
  const { data: course, isLoading: isCourseLoading } = useFetchCourseById(
    order.id,
  );
  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  useEffect(() => {
    if (!course || !userProgress || !userProgress._id || !course._id) return;

    if (!userProgress.completedCoursesIds.includes(course._id)) {
      const updatedProgress = {
        _id: userProgress._id,
        userId: userProgress.user?._id,
        completedCoursesIds: [
          ...new Set([...userProgress.completedCoursesIds, course._id]),
        ],
        spentTime: (userProgress.spentTime || 0) + (course.duration || 0),
        xp: (userProgress.xp || 0) + (course.xp || 0),
      };

      updateProgress(updatedProgress, {
        onError: (error) => {
          console.error(
            '❌ Failed to update progress:',
            error.response?.data || error,
          );
        },
      });
    }
  }, [course, userProgress, updateProgress]);

  if (isCourseLoading || updatingProgress) return <Spinner />;

  const { name, description, resources = [], status, exercises } = course;

  const typeLabels = {
    0: 'Article',
    1: 'Video',
    2: 'Course',
    3: 'Feed',
    4: 'Roadmap',
    5: 'Official',
    6: 'OpenSource',
  };

  const groupedResources = resources.reduce((acc, resource) => {
    const type = typeLabels[resource.type] || 'Unknown';
    if (!acc[type]) acc[type] = [];
    acc[type].push(resource);
    return acc;
  }, {});

  return (
    <Container>
      <Title>{name}</Title>
      {status === '0' && (
        <>
          <Description>{description}</Description>
        </>
      )}

      {Object.entries(groupedResources).map(([type, resources]) => (
        <div key={type}>
          <ResourceList>
            {resources.map((resource, idx) => (
              <ResourceItem key={idx}>
                {status === '0' ? (
                  <div>
                    <SectionTitle>{type}</SectionTitle>
                    <h4>{resource.name}</h4>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Resource
                    </a>
                  </div>
                ) : (
                  <>
                    <Resources resource={resource} typeLabels={typeLabels} />
                  </>
                )}
              </ResourceItem>
            ))}
          </ResourceList>
        </div>
      ))}
      {status === '1' && (
        <>
          <Description>{description}</Description>
        </>
      )}
      <Exercises exercises={exercises} />
    </Container>
  );
}

export default ViewCourse;
