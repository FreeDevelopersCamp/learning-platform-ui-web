import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import { useFetchCourseById } from '../../../hooks/courses/useCourse';

import Spinner from '../../../ui/Spinner';
import Progress from './Progress';

// Styled component for course item
const CourseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  border-bottom: 1px solid #e5e7eb;
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease;
  margin-bottom: 2rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f7;
  }
`;

// Course Info
const CourseInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Icon Placeholder
const Icon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
`;

// Course Details
const CourseDetails = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
  }

  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: #111827;
    margin: 0;
  }
`;

// Continue Button
const ContinueButton = styled.button`
  border: 2px solid transparent;
  border-radius: 4px;
  font-size: 1.4rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
  background-color: var(--wf-brand--main, #03ef62);
  color: var(--wf-brand--text-on-color, #05192d);
  height: 36px;
  min-width: 36px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #08e669;
    border-color: var(--color-grey-400);
  }
`;

function CourseCard({ courseId, progress }) {
  const navigate = useNavigate();
  const { data: course, isLoading } = useFetchCourseById(courseId);

  if (isLoading) return <Spinner />;

  const handleContinue = () => {
    navigate(`/course/${course.name}/${course._id}`);
  };

  return (
    <CourseItem onClick={handleContinue}>
      <CourseInfo>
        <Icon>
          <TipsAndUpdatesIcon />
        </Icon>

        <CourseDetails>
          <span>Course</span>
          <p>{course.name}</p>
          <Progress
            progress={progress || 0}
            bgColor="#E0E1E9"
            fillColor="#03EF62"
            labelColor="#000"
            width="20rem"
          />
        </CourseDetails>
      </CourseInfo>

      <ContinueButton
        onClick={(e) => {
          e.stopPropagation();
          handleContinue();
        }}
      >
        Continue
      </ContinueButton>
    </CourseItem>
  );
}

export default CourseCard;
