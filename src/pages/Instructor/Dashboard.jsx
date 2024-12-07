import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import DashboardLayout from '../../features/instructor/DashboardLayout';
import DashboardFilter from '../../features/instructor/DashboardFilter';

import Heading from '../../features/roadmaps/Heading';
import Total from '../../features/roadmaps/Total';

import Spinner from '../../ui/Spinner';

const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  margin: auto;
`;

function Dashboard() {
  const session = useOutletContext();
  const [filter, setFilter] = useState('all');
  const [filterCount, setFilterCount] = useState(0);

  if (!session) return <Spinner />;

  const title = 'Dashboard';
  const description =
    'It offers quick access to detailed sections and displays relevant statistics, enabling efficient navigation and data management.';

  return (
    <Row>
      <Heading title={title} description={description} />
      <DashboardFilter onFilterChange={setFilter} />
      <Total filter={filter} count={filterCount} />
      <DashboardLayout
        session={session}
        filter={filter}
        onFilterCount={setFilterCount}
      />
    </Row>
  );
}

export default Dashboard;
