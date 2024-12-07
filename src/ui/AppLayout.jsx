import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/auth/AuthContext';

import Header from './Dashboard/Header';
import Sidebar from './Dashboard/Sidebar';
import styled from 'styled-components';
import Spinner from './Spinner';

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f7fc;
`;

const Main = styled.main`
  padding-top: var(--header-height);
  position: relative;
  display: flex;
  flex-grow: 1;
  background-color: #f7f7fc;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 30px auto;
`;

function AppLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

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
      <Header toggleSidebar={toggleSidebar} />
      <Main>
        <Sidebar
          isOpen={isSidebarOpen}
          activeMenu={activeMenu}
          role={auth.role}
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
