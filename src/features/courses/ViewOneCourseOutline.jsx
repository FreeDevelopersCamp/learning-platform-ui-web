import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

import { useUpdateProgress } from '../../apis/learn/Progress/hooks/useProgress';

import Resources from './Resources';
import Exercises from './Exercises';
import Spinner from '../../ui/Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 3rem;
  overflow-y: auto;
  box-sizing: border-box;
  margin-top: 0 !important;
`;

/* ✅ Styled Title */
const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--color-grey-900);
  margin-bottom: 1rem;
  border-left: 5px solid var(--color-blue-600);
  padding-left: 1rem;
  text-transform: capitalize;
`;

/* ✅ Styled Description */
const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 2rem;
  margin-top: 2.5rem;
  padding: 2.5rem 0 3rem;
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
  padding: 1rem 1.2rem;
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
  padding: 1rem 1.2rem;
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

function ViewOneCourseOutline() {
  const { subCourseId, courseId } = useParams();
  const { course, userProgress } = useOutletContext();

  console.log('course:', course);
  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  const [flatStructure, setFlatStructure] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!course || course.length === 0) return;

    // Flatten the course and sub-course structure
    const structuredCourses = course.subCourses.reduce((acc, course) => {
      acc.push({ ...course, isSubCourse: false });

      if (course.subCourses && course.subCourses.length > 0) {
        acc.push(
          ...course.subCourses.map((sub) => ({
            ...sub,
            parentCourse: course,
            isSubCourse: true,
          })),
        );
      }
      return acc;
    }, []);

    setFlatStructure(structuredCourses);

    // Find the index of the current subCourseId or courseId
    let selectedIndex = structuredCourses.findIndex(
      (item) => item._id === subCourseId || item._id === courseId,
    );

    setCurrentIndex(selectedIndex !== -1 ? selectedIndex : 0);
  }, [course, subCourseId, courseId]);

  const saveProgress = (item) => {
    if (!item || !userProgress?._id || !item._id) return;

    if (!userProgress.completedCoursesIds.includes(item._id)) {
      const updatedProgress = {
        _id: userProgress._id,
        userId: userProgress.user?._id,
        completedCoursesIds: [
          ...new Set([...userProgress.completedCoursesIds, item._id]),
        ],
        spentTime: (userProgress.spentTime || 0) + (item.duration || 0),
        xp: (userProgress.xp || 0) + (item.xp || 0),
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
  };

  const handleNext = () => {
    if (currentIndex < flatStructure.length - 1) {
      saveProgress(flatStructure[currentIndex]);
      let nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    } else {
      alert('You have completed all courses!');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      let previousIndex = currentIndex - 1;
      setCurrentIndex(previousIndex);
    } else {
      alert('You are at the first course.');
    }
  };

  if (updatingProgress) return <Spinner />;
  if (!flatStructure.length) return <p>No courses available.</p>;

  const currentItem = flatStructure[currentIndex];

  const groupedResources =
    currentItem.resources?.reduce((acc, resource) => {
      const type = resource.type || 'Unknown';
      if (!acc[type]) acc[type] = [];
      acc[type].push(resource);
      return acc;
    }, {}) || {};

  return (
    <Container>
      <Title>{currentItem.name}</Title>
      <Description>{currentItem.description}</Description>

      {Object.entries(groupedResources).map(([type, resources]) => (
        <div key={type}>
          {resources.map((resource, idx) => (
            <Resources key={idx} resource={resource} />
          ))}
        </div>
      ))}

      {currentItem.exercises?.length > 0 && (
        <Exercises exercises={currentItem.exercises} />
      )}

      <Buttons>
        <Previous onClick={handlePrevious} disabled={currentIndex === 0}>
          <FaArrowLeftLong />
          Previous
        </Previous>
        <Next
          onClick={handleNext}
          disabled={currentIndex >= flatStructure.length - 1}
        >
          Next
          <FaArrowRightLong />
        </Next>
      </Buttons>
    </Container>
  );
}

export default ViewOneCourseOutline;
