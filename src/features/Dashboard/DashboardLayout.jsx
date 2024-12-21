import styled from 'styled-components';

import { useListUser } from '@/apis/core/User/hooks/useListUser.js';

import Stats from './Stats.jsx';

import Spinner from '../../ui/Spinner.jsx';

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

  gap: 1rem;
  padding: 20px;
`;

const StyledHeading = styled.h5`
  font-weight: 500;
  font-size: 2.5rem;
`;

function DashboardLayout({ role }) {
  const { totalUsers, isLoading, count } = useListUser();

  if (isLoading || !totalUsers) return <Spinner />;

  return (
    <StyledContainer>
      <div>
        <StyledHeading>Roles List</StyledHeading>
        <p className="text-gray-600 mb-8">
          A role provides access to predefined functionality and features so
          that depending on assigned role an admin can have access to what he
          needs.
        </p>
      </div>
      <StyledDashboardLayout>
        <Stats users={totalUsers} count={count} role={role} />
      </StyledDashboardLayout>
    </StyledContainer>
  );
}

export default DashboardLayout;
