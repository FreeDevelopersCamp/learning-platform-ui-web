import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';
import styled from 'styled-components';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Spinner from './Spinner';

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
  const { isLoading } = useAuth();

  if (isLoading) return <Spinner>Loading session...</Spinner>;

  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default HomeLayout;
