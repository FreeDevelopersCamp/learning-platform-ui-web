import DashboardLayout from '../../features/Admin/dashboard/DashboardLayout';
import DashboardFilter from '../../features/Admin/dashboard/DashboardFilter';
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
