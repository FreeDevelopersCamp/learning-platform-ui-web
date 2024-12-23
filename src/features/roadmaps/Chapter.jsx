import { useState } from 'react';
import styled from 'styled-components';

import { useFetchCourseById } from '../../hooks/courses/useCourse';

import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const Container = styled.div`
  width: 100%;
  padding: 1.5rem 1.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 3px;
  color: var(--color-grey-800);
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Title = styled.h3`
  font-size: 1.6rem;
  margin: 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: var(--color-grey-800);
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: auto;
`;

const List = styled.ul`
  margin-top: 1rem;
  list-style: none;
  padding: 0;
`;

const SubCourseItem = styled.li`
  padding: 0.5rem;
  color: var(--color-grey-900);
  border-radius: 3px;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

function Chapter({ index, courseId, isActive }) {
  const {
    data: course,
    isLoading: isCourseLoading,
    error,
  } = useFetchCourseById(courseId);

  const [isListOpen, setIsListOpen] = useState(false);

  if (isCourseLoading || !course || error) return null;

  const toggleList = () => {
    setIsListOpen((prev) => !prev);
  };

  return (
    <Container onClick={toggleList}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <FaCheck style={{ marginRight: '1rem' }} /> */}
        <span style={{ fontSize: '1.6rem', marginRight: '10px' }}>
          {index}{' '}
        </span>
        <Title>{course.name || 'Course Title'}</Title>
        <Button>{isListOpen ? <IoChevronUp /> : <IoChevronDown />}</Button>
      </div>
      {isListOpen && (
        <List>
          {course.subCourses?.length > 0 ? (
            course.subCourses.map((subCourse, index1) => (
              <SubCourseItem key={index1}>
                <span style={{ marginRight: '5px' }}>
                  {index} . {index1 + 1}
                </span>
                {subCourse.name}
              </SubCourseItem>
            ))
          ) : (
            <p>No subcourses available.</p>
          )}
        </List>
      )}
    </Container>
  );
}

export default Chapter;
