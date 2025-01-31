import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { useUpdateProgress } from '../../hooks/learner/useProgress';

import Resources from './Resources';
import Exercises from './Exercises';
import Spinner from '../../ui/Spinner';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start; /* Ensure content starts from the top */
  width: 100%;
  gap: 1.5rem;
`;

const Description = styled.div`
  line-height: 1.6;
  font-size: 1.4rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Topic = styled.h2`
  font-size: 1.6rem;
  color: var(--color-grey-700);
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  border-top: 1px solid var(--color-grey-300);
  width: 100%;
  margin-top: 2rem;
  padding-top: 2rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.4rem;
  font-size: 1.35rem;
  font-weight: bold;
  border: 2px solid var(--color-blue-600);
  border-radius: 3px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  background-color: ${(props) =>
    props.type === 'previous'
      ? 'var(--color-grey-0)' // Light background for "Previous"
      : props.disabled
        ? 'var(--color-blue-200)' // Disabled "Next" background
        : 'var(--color-blue-600)'}; // Default "Next" background

  color: ${(props) =>
    props.type === 'previous'
      ? 'var(--color-blue-600)' // Blue text for "Previous"
      : props.disabled
        ? 'var(--color-blue-600)' // Disabled "Next" text
        : 'var(--color-grey-0)'}; // Default "Next" text

  &:hover {
    background-color: ${(props) =>
      props.type === 'previous'
        ? 'var(--color-blue-100)' // Hover effect for "Previous"
        : props.disabled
          ? 'var(--color-blue-200)' // No hover effect for disabled "Next"
          : 'var(--color-blue-800)'}; // Hover effect for "Next"
  }
`;

function ViewOneCourseOutline() {
  const navigate = useNavigate();
  const { courseId, subCourseId } = useParams();
  const { course, userProgress } = useOutletContext();

  const [flatStructure, setFlatStructure] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  // ✅ UseRef to prevent duplicate updates
  const updatedCoursesRef = useRef(new Set());

  useEffect(() => {
    if (course?.subCourses) {
      const flattenStructure = (items) => {
        const flat = [];
        items.forEach((item) => {
          flat.push(item);
          if (item.subCourses && item.subCourses.length > 0) {
            flat.push(...flattenStructure(item.subCourses));
          }
        });
        return flat;
      };

      const flattened = flattenStructure(course.subCourses);
      setFlatStructure(flattened);

      const selectedIndex = flattened.findIndex(
        (item) => item._id === subCourseId,
      );
      if (selectedIndex !== -1) {
        setCurrentIndex(selectedIndex);
      } else {
        setCurrentIndex(0);
      }
    }
  }, [course, subCourseId]);

  const updatePath = (item) => {
    if (!item) return;

    const formattedParentName = course.name.toLowerCase().replace(/\s+/g, '-');
    const formattedName = item.name.toLowerCase().replace(/\s+/g, '-');

    navigate(
      `/course/${formattedParentName}/${course._id}/${formattedName}/${item._id}`,
    );
  };

  const saveProgress = (course) => {
    if (!course || !userProgress || !userProgress._id || !course._id) return;

    // ✅ Prevent duplicate updates
    if (updatedCoursesRef.current.has(course._id)) return;
    updatedCoursesRef.current.add(course._id);

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
  };

  // ✅ Save progress once when component renders
  useEffect(() => {
    if (flatStructure.length > 0) {
      saveProgress(flatStructure[currentIndex]);
    }
  }, [flatStructure]); // Removed `currentIndex` dependency to prevent multiple calls

  const handleNext = () => {
    if (currentIndex < flatStructure.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      updatePath(flatStructure[nextIndex]);
    } else {
      alert('You have completed all sub-courses!');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      setCurrentIndex(previousIndex);
      updatePath(flatStructure[previousIndex]);
    }
  };

  if (!flatStructure.length || updatingProgress) return <Spinner />;

  const currentItem = flatStructure[currentIndex] || {};
  const groupedResources =
    currentItem.resources?.reduce((acc, resource) => {
      const type = resource.type || 'Unknown';
      if (!acc[type]) acc[type] = [];
      acc[type].push(resource);
      return acc;
    }, {}) || {};

  return (
    <Container>
      <Title>{currentItem.name || course?.name}</Title>
      <Topic>Video: {currentItem.name || course?.name}</Topic>
      <Description>
        {currentItem.description || course?.description}
      </Description>
      {Object.entries(groupedResources).length > 0 &&
        Object.entries(groupedResources).map(([type, resources]) => (
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
        <Button
          type="previous"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <FaArrowLeftLong />
          Previous
        </Button>
        <Button
          type="next"
          onClick={handleNext}
          disabled={currentIndex === flatStructure.length - 1}
        >
          Next
          <FaArrowRightLong />
        </Button>
      </Buttons>
    </Container>
  );
}

export default ViewOneCourseOutline;
