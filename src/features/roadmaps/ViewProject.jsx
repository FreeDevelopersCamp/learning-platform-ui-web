import styled from 'styled-components';

// import { useFetchCourseById } from '../../hooks/courses/useCourse';

import Resources from './Resources';
import Exercises from './Exercises';
import Spinner from '../../ui/Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1rem;
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

function ViewProject({ order }) {
  // const {
  //   data: course,
  //   isLoading: isCourseLoading,
  //   courseError,
  // } = useFetchCourseById(order.id);

  // if (isCourseLoading || !course || courseError) return <Spinner />;

  // const { name, description, resources = [], status, exercises } = course;

  // const typeLabels = {
  //   0: 'Article',
  //   1: 'Video',
  //   2: 'Course',
  //   3: 'Feed',
  //   4: 'Roadmap',
  //   5: 'Official',
  //   6: 'OpenSource',
  // };

  // const groupedResources = resources.reduce((acc, resource) => {
  //   const type = typeLabels[resource.type] || 'Unknown';
  //   if (!acc[type]) acc[type] = [];
  //   acc[type].push(resource);
  //   return acc;
  // }, {});

  // console.log('order: ', order);
  return (
    <Container>
      <Title>ViewProject</Title>
    </Container>
  );
}

export default ViewProject;
