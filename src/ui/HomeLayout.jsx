import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Dashboard/Header';
import Footer from './Footer/Footer';

const StyledAppLayout = styled.div`
  flex: 1;
  display: grid;
`;

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  padding-top: var(--header-height);
  background-color: var(--color-grey-100);
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
