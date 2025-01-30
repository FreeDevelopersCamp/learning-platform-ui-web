import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaListUl } from 'react-icons/fa';

import { useAuth } from '../../contexts/auth/AuthContext';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser.ts';
import { useFetchCourseById } from '../../hooks/courses/useCourse';
import { useFetchProgressByUserId } from '../../hooks/learner/useProgress';

import Header from '../Header/Header';
import CourseSidebar from '../../ui/Sidebar/CourseSidebar';
import Spinner from '../Spinner';

const StyledCoursesLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff !important;
  z-index: 999;
  overflow: hidden; /* No outer scrollbar */
`;

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  position: relative;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: calc(100vh - var(--header-height));
  background-color: #fff !important;
  overflow: hidden;
  padding-top: 0 !important; /* Ensures no space between header and content */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding: 2rem 3rem 3rem; /* Reduced top padding */
  overflow-y: auto; /* Inner scroll */
  overflow-x: hidden;
  margin-top: 0 !important; /* Removes extra space */
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
  transition: all 1s;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function CourseLayout() {
  const { courseId } = useParams();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const { auth, session, isLoading } = useAuth();
  const { user, isLoading: userLoading } = useGetUser(session?.username, {
    enabled: !!session?.username,
  });

  const {
    data: course,
    isLoading: isCourseLoading,
    error,
  } = useFetchCourseById(courseId);

  const { data: userProgress, isLoading: userProgressLoading } =
    useFetchProgressByUserId(user?._id);

  if (
    isLoading ||
    userLoading ||
    userProgressLoading ||
    isCourseLoading ||
    !auth.isAuthenticated ||
    !user ||
    !userProgress ||
    !course ||
    error
  )
    return <Spinner />;

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
        <CourseSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          course={course}
          userProgress={userProgress}
          key={userProgress.completedCoursesIds.length}
        />
        <Container isSidebarOpen={isSidebarOpen}>
          <Outlet
            context={{
              course,
              userProgress,
            }}
          />
        </Container>
      </Main>
    </StyledCoursesLayout>
  );
}

export default CourseLayout;
