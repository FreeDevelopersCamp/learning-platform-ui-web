import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

const StyledAppLayout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  flex: 1; /* Takes all remaining space between header and footer */
  padding-top: var(--header-height);
`;

function HomeLayout() {
  return (
    <StyledAppLayout>
      <Header atHome={true} toggleSidebar={false} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default HomeLayout;
