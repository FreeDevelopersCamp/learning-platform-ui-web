import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../contexts/auth/AuthContext';
import { useSession } from '../hooks/auth/useSession';
import { useUser } from '../hooks/users/useUser';
import { useFetchProgressByUserId } from '../hooks/learner/useProgress';

import Header from './Dashboard/Header';
import CoursesSidebar from '../ui/CoursesSidebar';

import Spinner from './Spinner';

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
  height: 100vh -var(--header-height);
  background-color: var(--color-grey-0);
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 75%;
  margin: 30px auto;
  height: 100vh - var(--header-height);
`;

function CoursesLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const { auth, isLoading } = useAuth();

  const {
    isLoading: sessionLoading,
    session,
    error: sessionError,
  } = useSession();

  const { user, isLoading: userLoading } = useUser(session?.username);

  const {
    data: userProgress,
    isLoading: userProgressLoading,
    error: userProgressError,
  } = useFetchProgressByUserId(user?._id);

  if (
    isLoading ||
    userLoading ||
    userProgressLoading ||
    !auth.isAuthenticated ||
    !user ||
    !userProgress ||
    sessionLoading
  )
    return <Spinner />;

  //   console.log('auth: ', auth);
  //   console.log('session: ', session);
  //   console.log('user: ', user);
  //   console.log('userProgress: ', userProgress);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <StyledCoursesLayout>
      <Header page={'courses'} />
      <Main>
        <CoursesSidebar toggleSidebar={toggleSidebar} />
        <Container>
          <Outlet
            context={{
              session,
              user,
              userProgress,
            }}
          />
        </Container>
      </Main>
    </StyledCoursesLayout>
  );
}

export default CoursesLayout;
