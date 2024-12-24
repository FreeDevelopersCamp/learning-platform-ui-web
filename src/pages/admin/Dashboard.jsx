import DashboardFilter from '../../ui/Dashboard/DashboardFilter.jsx';
import DashboardLayout from '../../ui/Dashboard/DashboardLayout.jsx';

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
