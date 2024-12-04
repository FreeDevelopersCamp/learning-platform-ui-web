import { useSession } from '../../hooks/auth/useSession';

import DashboardLayout from '../../features/instructor/DashboardLayout';
import DashboardFilter from '../../features/instructor/DashboardFilter';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';

function Dashboard() {
  const {
    isLoading: sessionLoading,
    session,
    error: sessionError,
  } = useSession();

  if (sessionLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout session={session} />
    </>
  );
}

export default Dashboard;
