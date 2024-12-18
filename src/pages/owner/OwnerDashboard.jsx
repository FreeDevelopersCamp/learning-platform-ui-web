import DashboardFilter from '@/features/dashboard/DashboardFilter';
import DashboardLayout from '@/features/dashboard/DashboardLayout';

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
