import DashboardFilter from '@/ui/Dashboard/DashboardFilter';
import DashboardLayout from '@/ui/Dashboard/DashboardLayout';

import Heading from '@/ui/Heading';
import Row from '@/ui/Row';

function AccountManagerDashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout role="accountManager" />
    </>
  );
}

export default AccountManagerDashboard;
