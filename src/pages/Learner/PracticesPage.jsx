import { useListAll } from '../../apis/learn/Practice/hooks/useListAll';

import Heading from '../../ui/Heading';
import PracticeTable from '../../ui/PracticesTable/PracticeTable';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';

function PracticesPage() {
  const { practices, isLoading: practiceLoading, count } = useListAll();

  if (practiceLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Practices</Heading>
      </Row>
      <PracticeTable practices={practices} count={count} role="learner" />
    </>
  );
}

export default PracticesPage;
