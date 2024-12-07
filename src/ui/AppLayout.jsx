import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';
import styled from 'styled-components';

import Header from './Dashboard/Header';
import Sidebar from './Dashboard/Sidebar';
import Filterbar from '../features/instructor/Filterbar';

import Spinner from './Spinner';

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #f7f7fc;
`;

const Main = styled.main`
  padding-top: var(--header-height);
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
  margin-left: ${(props) => (props.sidebarOpen ? '12%' : '0')};
  transition: margin-left 0.3s;
  overflow-y: auto;
  height: 100%;
  padding-top: 6rem;
  background-color: #f7f7fc;
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
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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


  const { auth, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);
    if (menu === 'logout') return navigate('/home');

    if (auth.role === '0') navigate(`/admin/${menu}`);
    if (auth.role === '5') navigate(`/instructor/${menu}`);
    if (auth.role === '6') navigate(`/learner/${menu}`);
  };

  return (
    <StyledAppLayout>
      <Header username={username} name={name} toggleSidebar={toggleSidebar} />
      <Main ref={mainRef} sidebarOpen={isSidebarOpen}>
        <FixedSidebar isOpen={isSidebarOpen}>
          <Sidebar
            isOpen={isSidebarOpen}
            activeMenu={activeMenu}
            role={role}
            onMenuSelect={handleMenuSelect}
          />
        </FixedSidebar>
        <Container>
          <Outlet context={{ session, mainRef }} />

        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
