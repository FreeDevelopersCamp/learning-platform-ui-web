import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import Header from './Dashboard/Header';
import Sidebar from './Dashboard/Sidebar';
import styled from 'styled-components';

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
`;

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);
    // navigate(`/${role}/${menu}`);
    if (menu === 'logout') return navigate('/home');

    navigate(`/admin/${menu}`);
  };

  return (
    <StyledAppLayout>
      <Header toggleSidebar={toggleSidebar} />
      <Main>
        <Sidebar
          isOpen={isSidebarOpen}
          activeMenu={activeMenu}
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
