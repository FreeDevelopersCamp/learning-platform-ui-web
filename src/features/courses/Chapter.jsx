import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IoPlayOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  cursor: pointer;
  user-select: none;
  padding: 1rem 0.5rem;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Order = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
  color: white;
  background-color: #001b38;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-700);
  transform: translateY(2px);
`;

const XP = styled.span`
  font-size: 1.5rem;
  color: #6c757d;
`;

function Chapter({ parentCourse, course, index = 0, role = '' }) {
  const navigate = useNavigate();

  // Extract properties with fallback values
  const { _id: courseId, name, xp = 0 } = course;
  const { name: parentName, _id: parentId } = parentCourse;

  // Guard against missing data
  if (!courseId) {
    return null; // Skip rendering if `courseId` is missing
  }

  const handleViewCourse = (e) => {
    e.stopPropagation();
    // Format parent course name to URL-friendly format
    const formattedName = parentName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/course/${formattedName}/${parentId}`);
  };

  return (
    <Card onClick={role === '6' ? handleViewCourse : null}>
      <Container>
        <Order>{index}</Order>
        <Title>{name}</Title>
      </Container>

      <Container>
        <FaCheck
          style={{
            color: '#0fd15d',
            transform: 'translateY(-1px)',
            fontSize: '1.6rem',
          }}
        />
        <XP>
          {xp} <strong>XP</strong>
        </XP>
      </Container>
    </Card>
  );
}

export default Chapter;
