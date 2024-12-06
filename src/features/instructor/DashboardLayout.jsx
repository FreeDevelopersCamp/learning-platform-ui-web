import styled from 'styled-components';
import { useUser } from '../../hooks/users/useUser';

import Stats from './Stats';
import Spinner from '../../ui/Spinner';
import { useState } from 'react';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  height: 100%;
  gap: 3rem;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.5rem;
`;

function DashboardLayout({ session, filter, onFilterCount }) {
  const [filterCount, setFilterCount] = useState(0);
  const { user, isLoading: userLoading } = useUser(session?.username);

  if (userLoading || !user?._id) return <Spinner />;

  function handleFilterCount(value) {
    setFilterCount(value);
    onFilterCount(value);
  }

  return (
    <StyledContainer>
      <StyledDashboardLayout>
        <Stats
          userId={user._id}
          filter={filter}
          onFilterCount={handleFilterCount}
        />
      </StyledDashboardLayout>
    </StyledContainer>
  );
}

export default DashboardLayout;
