import styled from 'styled-components';
import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';

import CourseCard from './CourseCard';
import CoursesFilter from './CoursesFilter';

const CoursesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  gap: 40px;
  padding: 20px 20px 0 20px;
  height: 80vh;
  overflow-y: auto;
  margin: 0 auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid transparent;
  }
`;

function InstructorCourses() {
  const { instructorData } = useInstructorData();

  const { coursesIds = [] } = instructorData || {};

  if (!instructorData) return <Spinner />;

  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Courses</Heading>
        <CoursesFilter />
      </Row>
      <CoursesContainer>
        {coursesIds.map((courseId) => (
          <CourseCard key={courseId} courseId={courseId} />
        ))}
      </CoursesContainer>
    </>
  );
}

export default InstructorCourses;