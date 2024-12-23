import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import ViewOrder from './ViewOrder';
import Spinner from '../../ui/Spinner';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 5rem;
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

function ViewCourseOutline() {
  const navigate = useNavigate();
  const { roadmap } = useOutletContext();
  const [flatStructure, setFlatStructure] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { topic, _id: roadmapId, order = [] } = roadmap;

  const flattenStructure = (items, parentType = null) => {
    const flat = [];
    items.forEach((item) => {
      if (!item || !item._id) return;

      // Determine the type based on the ID
      let itemType = parentType || 'course';
      if (roadmap.projectsIds.includes(item._id)) {
        itemType = 'project';
      } else if (roadmap.practicesIds.includes(item._id)) {
        itemType = 'practice';
      }

      flat.push({
        id: item._id,
        type: itemType,
        name: item.name,
        description: item.description,
        duration: item.duration,
        xp: item.xp,
        subCourses: item.subCourses || [],
      });

      // Recursively handle subCourses
      if (item.subCourses && item.subCourses.length > 0) {
        flat.push(...flattenStructure(item.subCourses, 'subcourse'));
      }
    });
    return flat;
  };

  useEffect(() => {
    if (order && order.length > 0) {
      const flattened = flattenStructure(order);
      setFlatStructure(flattened);
    }
  }, [order]);

  const updatePath = (item) => {
    if (!item) return;
    const roadmapTopic = topic.toLowerCase().replace(/\s+/g, '-');
    const courseTitle = item.name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters
      .replace(/\s+/g, '-') // Replace spaces with a single dash
      .replace(/-+/g, '-'); // Replace multiple dashes with a single dash;
    const path = `/courses/${roadmapTopic}/${roadmapId}/${courseTitle}/${item.id}`;
    navigate(path);
  };

  const handleNext = () => {
    if (currentIndex < flatStructure.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      updatePath(flatStructure[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      updatePath(flatStructure[prevIndex]);
    }
  };

  const currentItem = flatStructure[currentIndex];

  if (flatStructure.length === 0) return <Spinner />;

  return (
    <Container>
      {currentItem && <ViewOrder order={currentItem} />}

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

export default ViewCourseOutline;
