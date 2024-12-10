import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useSession } from '../hooks/auth/useSession';
import { useAuth } from '../contexts/auth/AuthContext';
import { useUser } from '../hooks/users/useUser';

import Header from './Dashboard/Header';
import Sidebar from './Dashboard/Sidebar';

import Spinner from './Spinner';

const StyledAppLayout = styled.div`
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
  width: 75%;
  margin: 30px auto;
  height: 100vh - var(--header-height);
`;

function AppLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const {
    isLoading: sessionLoading,
    session,
    error: sessionError,
  } = useSession();

  const {
    auth: { isAuthenticated: isAuth, username, role },
    isLoading,
  } = useAuth();

  const { user, isLoading: userLoading } = useUser(username);

  const mainRef = useRef(null);

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    setActiveMenu(path || 'dashboard');
  }, [location]);

  if (isLoading || !auth || userLoading || sessionLoading) return <Spinner />;

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
      <Header toggleSidebar={toggleSidebar} />
      <Main>
        <Sidebar
          isOpen={isSidebarOpen}
          activeMenu={activeMenu}
          role={auth.role}
          onMenuSelect={handleMenuSelect}
        />
        <Container>
          <Outlet context={{ session, mainRef }} />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
