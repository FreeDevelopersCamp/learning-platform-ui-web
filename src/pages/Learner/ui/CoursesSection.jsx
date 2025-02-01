import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CourseCard from './CourseCard';

const SectionWrapper = styled.div`
  width: 100%;
  margin: 5rem auto;
  margin-bottom: 2rem;
  gap: 3rem;
`;

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
        <button onClick={() => navigate('/learner/library')}>
          See All In My Library
        </button>
      </Header>

      {userProgress.currentCoursesIds.map((course, index) => (
        <CourseCard
          key={index}
          courseId={course.itemId}
          progress={course.progress || 57}
        />
      ))}
    </SectionWrapper>
  );
}

export default CoursesSection;
