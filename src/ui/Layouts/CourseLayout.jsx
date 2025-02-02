import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../contexts/auth/AuthContext';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser.ts';
import { useFetchCourseById } from '../../hooks/courses/useCourse';
import { useFetchProgressByUserId } from '../../apis/learn/Progress/hooks/useProgress';

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
  width: 100%;
  height: calc(100vh - var(--header-height));
  background-color: #fff !important;
  overflow: hidden;
  padding-top: 0 !important;
`;

const SidebarWrapper = styled.div`
  width: ${(props) =>
    props.isOpen ? '14%' : '0px'}; /* ✅ Sidebar has fixed width */
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  background-color: #fff;
  height: 100%;
  border-right: 1px solid var(--color-grey-300);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* ✅ Centers content horizontally */
  justify-content: flex-start; /* ✅ Keeps content at the top */
  width: 100%;
  max-width: 1300px; /* ✅ Ensures content does not stretch too wide */
  margin: 0 auto; /* ✅ Centers the container itself */
  padding: 2rem 3rem 3rem;
  overflow-y: auto; /* ✅ Enables scrolling */
  margin-top: 9vh;
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
        <SidebarWrapper isOpen={isSidebarOpen}>
          <CourseSidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setSidebarOpen((prev) => !prev)}
            course={course}
            userProgress={userProgress}
            key={userProgress.completedCoursesIds.length}
          />
        </SidebarWrapper>

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
