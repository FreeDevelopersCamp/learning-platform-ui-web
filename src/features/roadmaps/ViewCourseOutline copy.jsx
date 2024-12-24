import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import RecursiveCourses from './RecursiveCourses';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 2rem;
  margin-top: 10rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-300);
`;

const Previous = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  color: var(--color-blue-600);
  border: 2px solid var(--color-blue-600);
  border-radius: 3px;
  padding: 0.8rem 1rem;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-700);
    color: var(--color-blue-100);
  }

  &:disabled {
    background-color: var(--color-blue-200);
    color: var(--color-blue-600);
    cursor: not-allowed;
  }
`;

const Next = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--color-blue-600);
  color: var(--color-grey-0);
  border: 2px solid var(--color-blue-600);
  border-radius: 3px;
  padding: 0.8rem 1rem;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-800);
    color: var(--color-grey-100);
  }

  &:disabled {
    background-color: var(--color-blue-200);
    color: var(--color-blue-600);
    cursor: not-allowed;
  }
`;

function ViewCourseOutline() {
  const navigate = useNavigate();
  const { roadmap, courseStructure, setCourseStructure } = useOutletContext();
  const [flatStructure, setFlatStructure] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log('currentCourse: ', roadmap);

  const flattenStructure = (structure) => {
    if (!Array.isArray(structure)) return [];
    const result = [];
    structure.forEach((course) => {
      if (course) {
        result.push(course);
        if (Array.isArray(course.subCourses) && course.subCourses.length > 0) {
          result.push(...flattenStructure(course.subCourses));
        }
      }
    });
    return result;
  };

  useEffect(() => {
    if (courseStructure && courseStructure.length > 0) {
      const flattened = flattenStructure(courseStructure);
      setFlatStructure(flattened);
    } else {
      setFlatStructure([]);
    }
  }, [courseStructure]);

  const handleNext = () => {
    if (currentIndex < flatStructure.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentCourse = flatStructure[currentIndex];

  const isNextDisabled =
    flatStructure.length === 0 || currentIndex >= flatStructure.length - 1;
  const isPreviousDisabled = flatStructure.length === 0 || currentIndex === 0;
  console.log('currentCourse: ', currentCourse);

  return (
    <Container>
      {currentCourse ? (
        <RecursiveCourses
          course={currentCourse}
          setCourseStructure={setCourseStructure}
        />
      ) : (
        <p>No courses available</p>
      )}

      <Buttons>
        <Previous onClick={handlePrevious} disabled={isPreviousDisabled}>
          <FaArrowLeftLong />
          Previous
        </Previous>
        <Next onClick={handleNext} disabled={isNextDisabled}>
          Next
          <FaArrowRightLong />
        </Next>
      </Buttons>
    </Container>
  );
}

export default ViewCourseOutline;
