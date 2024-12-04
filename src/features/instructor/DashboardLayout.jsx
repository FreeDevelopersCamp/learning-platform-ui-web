import styled from 'styled-components';
import { useUser } from '../../hooks/users/useUser';

import Stats from './Stats';
import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100%;
  gap: 2.4rem;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.5rem;
  padding: 20px;
`;

function DashboardLayout({ session }) {
  const {
    user,
    isLoading: userLoading,
    error: userError,
  } = useUser(session.username);

  if (userLoading) return <Spinner>Loading...</Spinner>;

  const userId = user?._id;
  if (!userId) {
    return <Spinner>Loading User Data...</Spinner>;
  }

  return (
    <StyledContainer>
      <StyledDashboardLayout>
        <Stats userId={userId} />
      </StyledDashboardLayout>
    </StyledContainer>
  );
}

export default DashboardLayout;
