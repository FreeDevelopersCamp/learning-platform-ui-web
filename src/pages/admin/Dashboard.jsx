import DashboardFilter from '../../features/dashboard/DashboardFilter.jsx';
import DashboardLayout from '../../features/dashboard/DashboardLayout.jsx';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout role="admin" />
    </>
  );
}

export default Dashboard;
