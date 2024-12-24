import DashboardFilter from '@/ui/Dashboard/DashboardFilter';
import DashboardLayout from '@/ui/Dashboard/DashboardLayout';

import Heading from '@/ui/Heading';
import Row from '@/ui/Row';

function OwnerDashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout role="owner" />
    </>
  );
}

export default OwnerDashboard;
