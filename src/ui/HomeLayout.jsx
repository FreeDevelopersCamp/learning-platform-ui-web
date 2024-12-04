import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Spinner from './Spinner';

import { useAuth } from '../contexts/auth/AuthContext';
import { useUser } from '../hooks/users/useUser';
import { useSession } from '../hooks/auth/useSession';

const StyledAppLayout = styled.div`
  flex: 1;
  display: grid;
  padding: 0 1rem;
`;

const Main = styled.main`
  width: 100%; /* Equivalent to w-full */
  margin: 0 auto; /* Equivalent to mx-auto */
  background-color: var(--color-grey-100);
`;

function HomeLayout() {
  const {
    auth: { isAuthenticated: isAuth, username, role },
    isLoading,
  } = useAuth();

  const {
    isLoading: sessionLoading,
    session,
    error: sessionError,
  } = useSession();

  // Fetch user data only after session is available
  const {
    user,
    isLoading: userLoading,
    error: userError,
  } = useUser(
    session?.username, // Pass the username if available
    {
      enabled: !!session?.username, // Ensure the query runs only if session.username exists
    },
  );

  // Show errors or loading spinner
  if (sessionLoading || userLoading)
    return <Spinner>Loading session...</Spinner>;
  if (sessionError || userError)
    return (
      <div>
        Error loading data: {sessionError?.message || userError?.message}
      </div>
    );

  // Construct the user's name
  const name = user
    ? `${user?.personalInformation?.name?.first || ''} ${
        user?.personalInformation?.name?.last || ''
      }`
    : '';

  return (
    <StyledAppLayout>
      <Header isAuth={isAuth} username={session.username} name={name} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default HomeLayout;
