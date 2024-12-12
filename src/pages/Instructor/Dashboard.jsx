import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../../hooks/users/useUser';

import DashboardLayout from '../../features/instructor/DashboardLayout';
import Filterbar from '../../features/instructor/Filterbar';
import Total from '../../features/roadmaps/Total';
import Stats from '../../features/instructor/Stats';

import Row from '../../features/roadmaps/Row';
import Heading from '../../features/roadmaps/Heading';

import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fit, minmax(250, 1fr));
  height: 100%;
  gap: 3rem;
`;

function Dashboard() {
  const { session } = useOutletContext();
  const [filter, setFilter] = useState('all');
  const [filterCount, setFilterCount] = useState(0);

  const { user, isLoading: userLoading } = useUser(session?.username);

  if (userLoading || !user?._id) return <Spinner />;

  function handleFilterCount(value) {
    setFilterCount(value);
  }

  const title = 'Dashboard';
  const description =
    'It offers quick access to detailed sections and displays relevant statistics, enabling efficient navigation and data management.';

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'roadmaps', label: 'Roadmaps' },
    { value: 'courses', label: 'Courses' },
    { value: 'projects', label: 'Projects' },
    { value: 'practices', label: 'Practices' },
  ];  


  return (
    <Row>
      <Heading title={title} description={description} />
      <Filterbar filterOptions={filterOptions} onFilterChange={setFilter}>
        <Total filter={filter} count={filterCount} />
      </Filterbar>
      <DashboardLayout>
        <StyledDashboardLayout>
          <Stats
            userId={user._id}
            filter={filter}
            onFilterCount={handleFilterCount}
          />
        </StyledDashboardLayout>
      </DashboardLayout>
    </Row>
  );
}

export default Dashboard;
