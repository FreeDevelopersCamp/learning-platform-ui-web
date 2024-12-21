import { useEffect, useState, useRef, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import RecursiveCourses from './RecursiveCourses';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 5rem;
`;

function ViewCourseOutline() {
  const { roadmap, setCourseStructure } = useOutletContext();
  const [tempStructure, setTempStructure] = useState([]);
  const isFinalizedRef = useRef(false); // Prevent redundant updates

  // Reset tempStructure and finalization flag on roadmap change
  useEffect(() => {
    setTempStructure([]); // Reset structure
    isFinalizedRef.current = false; // Allow updates again
  }, [roadmap]);

  // Update final structure once all courses are processed
  useEffect(() => {
    if (
      !isFinalizedRef.current &&
      tempStructure.length === roadmap.coursesIds.length
    ) {
      setCourseStructure(tempStructure); // Set final structure
      isFinalizedRef.current = true; // Block further updates
    }
  }, [tempStructure, roadmap.coursesIds.length, setCourseStructure]);

  const addToTempStructure = useCallback((courseStructure, index) => {
    setTempStructure((prev) => {
      const updated = [...prev];
      updated[index] = courseStructure;
      return updated;
    });
  }, []);

  return (
    <Container>
      {roadmap.coursesIds.map((courseId, index) => (
        <RecursiveCourses
          key={courseId}
          courseId={courseId}
          addToTempStructure={addToTempStructure}
          index={index}
          parentEx={`${index + 1}`}
          level={1}
        />
      ))}
    </Container>
  );
}

export default ViewCourseOutline;
