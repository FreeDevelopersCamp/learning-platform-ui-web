import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../contexts/auth/AuthContext.jsx';

import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

import Spinner from '../Spinner.jsx';

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

  // Retrieve the active menu from local storage or set to default
  const [activeMenu, setActiveMenu] = useState(
    () => localStorage.getItem('activeMenu') || 'dashboard',
  );

  const { auth, session, isLoading } = useAuth();

  const mainRef = useRef(null);

  useEffect(() => {
    // Save active menu to local storage on change
    localStorage.setItem('activeMenu', activeMenu);
  }, [activeMenu]);

  if (isLoading || !auth || !session) return <Spinner />;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);

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
