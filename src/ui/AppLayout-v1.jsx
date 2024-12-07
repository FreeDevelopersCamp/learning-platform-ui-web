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
  overflow: hidden; /* Prevent page scroll */
`;

const Main = styled.main`
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
  background-color: var(--color-grey-300);
  margin-left: ${(props) => (props.sidebarOpen ? '12%' : '0')};
  transition: margin-left 0.3s;
  overflow-y: auto;
  padding-top: 6rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  margin: 30px auto;
  padding-top: 2rem;
`;

const FixedSidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => (props.isOpen ? '12%' : '0')};
  background-color: #000820;
  color: white;
  padding: ${(props) => (props.isOpen ? '8px 8px 0 0' : '0px')};
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: left;

  &:hover,
  &:active,
  &.active {
    border-right: 3px solid var(--color-brand-100);
    transition: all 0.1s;
  }
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
      <Main sidebarOpen={isSidebarOpen}>
        <FixedSidebar isOpen={isSidebarOpen}>
          <Sidebar
            isOpen={isSidebarOpen}
            activeMenu={activeMenu}
            role={role}
            onMenuSelect={handleMenuSelect}
          />
        </FixedSidebar>
        <Container>
          <Outlet context={session} />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
