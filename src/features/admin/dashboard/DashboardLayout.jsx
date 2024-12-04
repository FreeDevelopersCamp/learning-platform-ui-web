import styled from 'styled-components';

import { useUsers } from '../../hooks/users/useUsers';

import TodayActivity from '../check-in-out/TodayActivity';
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

  gap: 1rem;
  padding: 20px;
`;

const StyledHeading = styled.h5`
  font-weight: 500;
  font-size: 2.5rem;
`;

function DashboardLayout() {
  const { totalUsers, isLoading: isLoading4, count } = useUsers();

  if (isLoading4) return <Spinner />;

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
        <Stats users={totalUsers} count={count} />

        {/* <RolesList /> */}

      </StyledDashboardLayout>
      {/* <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} /> */}
    </StyledContainer>
  );
}

export default DashboardLayout;
