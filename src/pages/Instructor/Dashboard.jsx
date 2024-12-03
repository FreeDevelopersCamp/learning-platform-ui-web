// Instructor Dashboard
import DashboardLayout from '../../features/instructor/DashboardLayout';
import DashboardFilter from '../../features/instructor/DashboardFilter';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        {/* <DashboardFilter /> */}
      </Row>
      {/* <DashboardLayout /> */}
    </>
  );
}

export default Dashboard;
