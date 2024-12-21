import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../contexts/auth/AuthContext';
import { useSession } from '../hooks/auth/useSession';
import { useUser } from '../hooks/users/useUser';
import { useFetchProgressByUserId } from '../hooks/learner/useProgress';
import { useFetchRoadmapById } from '../hooks/roadmaps/useRoadmap';

import Header from './Dashboard/Header';
import CoursesSidebar from '../ui/CoursesSidebar';
import Spinner from './Spinner';

import { FaListUl } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';

const StyledCoursesLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  padding-top: var(--header-height);
  position: relative;
  display: flex;
  flex-grow: 1;
  height: 100vh - var(--header-height);
  background-color: var(--color-grey-0);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  margin: 3.5rem auto;
  height: 100vh - var(--header-height);
`;

const Button = styled.div`
  position: absolute;
  top: 8rem;
  left: 0;
  border: 2px solid var(--color-grey-700);
  border-radius: 5px;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 2rem;
  margin: 10rem 0 0 5rem;
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

function CoursesLayout() {
  const navigate = useNavigate();
  const { roadmapId } = useParams();
  const [searchParams] = useSearchParams();
  const ex = searchParams.get('ex') || '1';

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [courseStructure, setCourseStructure] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(parseInt(ex, 10) - 1);

  const { auth, isLoading } = useAuth();

  const { isLoading: sessionLoading, session } = useSession();

  const { user, isLoading: userLoading } = useUser(session?.username);

  const { data: userProgress, isLoading: userProgressLoading } =
    useFetchProgressByUserId(user?._id);

  const { data: roadmap, isLoading: isLoadingRoadmap } =
    useFetchRoadmapById(roadmapId);

  if (
    isLoading ||
    sessionLoading ||
    userLoading ||
    userProgressLoading ||
    isLoadingRoadmap ||
    !auth.isAuthenticated ||
    !user ||
    !userProgress ||
    !roadmap
  )
    return <Spinner />;

  function handleNext() {
    const nextIndex = currentIndex + 1;

    // // Check if nextIndex is within bounds
    // if (nextIndex >= flattenedStructure.length) {
    //   console.log('Reached the end of the current course structure.');

    //   // Handle transition to the next top-level course if applicable
    //   const currentTopLevelIndex = parseInt(
    //     flattenedStructure[currentIndex]?.ex.split('.')[0],
    //     10,
    //   );

    //   if (currentTopLevelIndex < roadmap.coursesIds.length) {
    //     console.log(
    //       `Transitioning to next top-level course: ${currentTopLevelIndex + 1}`,
    //     );

    //     navigate(
    //       `/courses/${roadmap.topic.toLowerCase().replace(/\s+/g, '-')}/${roadmapId}/?ex=${currentTopLevelIndex + 1}`,
    //     );
    //   } else {
    //     console.log('No more courses available.');
    //   }
    //   return;
    // }

    // const nextEx = flattenedStructure[nextIndex]?.ex;

    // if (!nextEx) {
    //   console.error(
    //     'NextEx is undefined, something went wrong with the flattenedStructure.',
    //   );
    //   return;
    // }

    // const currentTopLevelIndex = parseInt(
    //   flattenedStructure[currentIndex]?.ex.split('.')[0],
    //   10,
    // );
    // const nextTopLevelIndex = parseInt(nextEx.split('.')[0], 10);

    // // Log transition between top-level courses
    // if (nextTopLevelIndex !== currentTopLevelIndex) {
    //   console.log(`Transitioning to Chapter: ${nextTopLevelIndex}`);
    // }

    // // Update state and navigate
    // setCurrentIndex(nextIndex);
    // navigate(
    //   `/courses/${roadmap.topic.toLowerCase().replace(/\s+/g, '-')}/${roadmapId}/?ex=${nextEx}`,
    // );
  }

  function handlePrevious() {
    // const prevIndex = currentIndex - 1;
    // // Check if prevIndex is within bounds
    // if (prevIndex < 0) {
    //   console.log('Reached the beginning of the current course structure.');
    //   return;
    // }
    // const prevEx = flattenedStructure[prevIndex]?.ex;
    // if (!prevEx) {
    //   console.error(
    //     'PrevEx is undefined, something went wrong with the flattenedStructure.',
    //   );
    //   return;
    // }
    // const currentTopLevelIndex = parseInt(
    //   flattenedStructure[currentIndex]?.ex.split('.')[0],
    //   10,
    // );
    // const prevTopLevelIndex = parseInt(prevEx.split('.')[0], 10);
    // // Log transition between top-level courses
    // if (prevTopLevelIndex !== currentTopLevelIndex) {
    //   console.log(`Returning to Chapter: ${prevTopLevelIndex}`);
    // }
    // // Update state and navigate
    // setCurrentIndex(prevIndex);
    // navigate(
    //   `/courses/${roadmap.topic.toLowerCase().replace(/\s+/g, '-')}/${roadmapId}/?ex=${prevEx}`,
    // );
  }

  console.log('Final CourseStructure: ', courseStructure);

  return (
    <StyledCoursesLayout>
      <Header page={'courses'} />
      <Main>
        {!isSidebarOpen && (
          <Button onClick={() => setSidebarOpen((prev) => !prev)}>
            <FaListUl
              style={{ fontSize: '2rem', color: 'var(--color-grey-700)' }}
            />
          </Button>
        )}
        <CoursesSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          roadmap={roadmap}
        />
        <Container>
          <Outlet
            context={{
              roadmap,
              courseStructure,
              setCourseStructure,
            }}
          />

          <Buttons>
            <Previous onClick={handlePrevious} disabled={currentIndex === 0}>
              <FaArrowLeftLong />
              Previous
            </Previous>
            <Next
              onClick={handleNext}
              // disabled={currentIndex >= flattenedStructure.length - 1}
            >
              Next
              <FaArrowRightLong />
            </Next>
          </Buttons>
        </Container>
      </Main>
    </StyledCoursesLayout>
  );
}

export default CoursesLayout;
