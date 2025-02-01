import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../contexts/auth/AuthContext.jsx';

import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

import Spinner from '../Spinner.jsx';

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff !important;
`;

const Main = styled.main`
  background-color: #fff !important;
  padding-top: var(--header-height);
  position: relative;
  display: flex;
  flex-grow: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  margin: 30px auto;
`;

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Dynamically determine the active menu based on the current path
  const [activeMenu, setActiveMenu] = useState(() => {
    const path = location.pathname.split('/')[2] || 'dashboard';
    return path;
  });

  const { auth, session, isLoading } = useAuth();

  const mainRef = useRef(null);

  useEffect(() => {
    // Save active menu to local storage on change
    localStorage.setItem('activeMenu', activeMenu);
  }, [activeMenu]);

  useEffect(() => {
    // Dynamically update the active menu when the path changes
    const path = location.pathname.split('/')[2] || 'dashboard';
    setActiveMenu(path);
  }, [location]);

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
