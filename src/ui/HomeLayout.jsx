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
  const { auth, isLoading } = useAuth();

  const {
    isLoading: sessionLoading,
    session,
    error: sessionError,
  } = useSession();

  const {
    user,
    isLoading: userLoading,
    error: userError,
  } = useUser(session?.username, {
    enabled: !!session?.username,
  });

  if (isLoading || sessionLoading || userLoading) return <Spinner />;

  if (sessionError || userError)
    return (
      <div>
        Error loading data: {sessionError?.message || userError?.message}
      </div>
    );

  const name = user
    ? `${user?.personalInformation?.name?.first || ''} ${
        user?.personalInformation?.name?.last || ''
      }`
    : '';

  return (
    <StyledAppLayout>
      <Header username={session?.username} name={name} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default HomeLayout;
