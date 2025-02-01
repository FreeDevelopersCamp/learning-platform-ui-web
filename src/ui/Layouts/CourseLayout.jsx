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

import { FaListUl } from 'react-icons/fa';

const StyledCoursesLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  padding-top: var(--header-height);
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  height: calc(100vh - var(--header-height));
  background-color: var(--color-grey-0);
  transition:
    margin-left 0.3s ease-in-out,
    width 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: ${(props) =>
    props.isSidebarOpen ? '3.5rem 0 3.5rem 14%' : '3.5rem auto'};
  width: ${(props) => (props.isSidebarOpen ? '70%' : '90%')};
  height: calc(100vh - var(--header-height));
  padding: 3rem 1rem;
  transition:
    margin 0.3s ease-in-out,
    width 0.3s ease-in-out;
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
  const { name, courseId } = useParams();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [persentage, setPersentage] = useState(true);

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
    !course
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
          setPersentage={setPersentage}
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
