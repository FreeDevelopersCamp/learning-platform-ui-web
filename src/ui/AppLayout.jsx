import { useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useSession } from '../hooks/auth/useSession';
import { useAuth } from '../contexts/auth/AuthContext';

import Header from './Dashboard/Header.jsx';
import Sidebar from './Dashboard/Sidebar';

import Spinner from './Spinner';

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-0);
  padding-top: var(--header-height);

  position: relative;
  display: flex;
  flex-grow: 1;
  height: 100vh var(--header-height);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  margin: 30px auto;
  height: 100vh - var(--header-height);
`;

function AppLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const { isLoading: sessionLoading, session } = useSession();

  const { auth, isLoading } = useAuth();

  const mainRef = useRef(null);

  if (isLoading || !auth.isAuthenticated || sessionLoading) return <Spinner />;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);
    if (menu === 'logout') return navigate('/home');

    if (auth.role === '0') navigate(`/admin/${menu}`);
    if (auth.role === '1') navigate(`/owner/${menu}`);
    if (auth.role === '2') navigate(`/manager/${menu}`);
    if (auth.role === '3') navigate(`/accountManager/${menu}`);
    if (auth.role === '4') navigate(`/contentManager/${menu}`);
    if (auth.role === '5') navigate(`/instructor/${menu}`);
    if (auth.role === '6') navigate(`/learner/${menu}`);
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
