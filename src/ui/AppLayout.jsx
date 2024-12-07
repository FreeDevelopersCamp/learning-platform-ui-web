import { useState, useEffect } from 'react';
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
  display: flex;
  flex-grow: 1;
  background-color: var(--color-grey-300);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 30px auto;
`;

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('');

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

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    setActiveMenu(path || 'dashboard');
  }, [location]);

  if (isLoading || userLoading || sessionLoading || sessionError)
    return <Spinner />;

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
          <Outlet context={session} />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
