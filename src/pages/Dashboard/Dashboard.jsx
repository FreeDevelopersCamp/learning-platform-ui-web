import DashboardLayout from '../../features/admin/dashboard/DashboardLayout';
import DashboardFilter from '../../features/admin/dashboard/DashboardFilter';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
