import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './Dashboard/Header';
import Sidebar from './Dashboard/Sidebar';
import styled from 'styled-components';
import Spinner from './Spinner';

import { useAuth } from '../contexts/auth/AuthContext';
import { useUser } from '../hooks/users/useUser';

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  background-color: var(--color-grey-300);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 2.6rem 3rem;
  gap: 3.2rem;
  width: 80%;
`;
// admin = '0', owner = '1', manager = '2', accountManager = '3', contentManager = '4', instructor = '5', learner = '6',

function AppLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const {
    auth: { isAuthenticated: isAuth, username, role },
    isLoading,
  } = useAuth();

  const { user, isLoading: userLoading } = useUser(username);

  if (isLoading || userLoading) return <Spinner>Loading session...</Spinner>;

  const name = `${user?.personalInformation?.name?.first} ${user?.personalInformation?.name?.last}`;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);
    if (menu === 'logout') return navigate('/home');

    if (role === '0') navigate(`/admin/${menu}`);
    if (role === '5') navigate(`/instructor/${menu}`);
  };

  return (
    <StyledAppLayout>
      <Header username={username} name={name} toggleSidebar={toggleSidebar} />
      <Main>
        <Sidebar
          isOpen={isSidebarOpen}
          activeMenu={activeMenu}
          role={role}
          onMenuSelect={handleMenuSelect}
        />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
