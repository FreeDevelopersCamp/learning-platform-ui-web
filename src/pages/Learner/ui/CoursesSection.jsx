import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import Progress from './Progress';
import Spinner from '../../../ui/Spinner';

// Wrapper for the entire section
const SectionWrapper = styled.div`
  width: 100%;
  margin: 5rem auto;
`;

// Header
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.9rem;
    font-weight: 500;
    color: #111827;
  }

  button {
    font-size: 1.5rem;
    color: #2563eb; /* Blue link */
    text-decoration: none;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Individual Course Item
const CourseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;
  background-color: #fff;
  border-radius: var(--border-radius-md);
  border-bottom: 1px solid #e5e7eb;
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease;
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
  width: 40px;
  height: 40px;
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
    color: #6b7280; /* Gray text */
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

function CoursesSection({ userProgress }) {
  const navigate = useNavigate();

  // Ensure userProgress is valid
  if (
    !userProgress?.currentCoursesIds ||
    userProgress.currentCoursesIds.length === 0
  ) {
    return;
  }

  return (
    <SectionWrapper>
      <Header>
        <div className="flex flex-row items-center gap-2">
          <RocketLaunchIcon />
          <h2>Pick up where you left off</h2>
        </div>
        {/* ✅ Updated: Use navigate() instead of href */}
        <button onClick={() => navigate('/learner/library')}>
          See All In My Library
        </button>
      </Header>

      {userProgress.currentCoursesIds.map((course, index) => (
        <CourseItem
          key={index}
          onClick={() => navigate(`/courses/${course.itemId}`)}
        >
          <CourseInfo>
            <Icon>
              <TipsAndUpdatesIcon />
            </Icon>

            <CourseDetails>
              <span>Course</span>
              <p>{course.title}</p>
              <Progress
                progress={course.progress || 0}
                bgColor="#E0E1E9"
                fillColor="#03EF62"
                labelColor="#000"
                width="20rem"
              />
            </CourseDetails>
          </CourseInfo>

          {/* ✅ Updated: Prevent duplicate navigation */}
          <ContinueButton
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering CourseItem's onClick
              navigate(`/courses/${course.itemId}`);
            }}
          >
            Continue
          </ContinueButton>
        </CourseItem>
      ))}
    </SectionWrapper>
  );
}

export default CoursesSection;
