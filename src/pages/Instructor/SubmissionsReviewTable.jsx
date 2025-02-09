import { useListProgress } from '../../apis/learn/Progress/hooks/useListProgress';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import ReviewTable from '../../ui/ReviewsTable/ProjectTable';

function SubmissionsReviewTable() {
  const { isLoading: progressLoading, progressList } = useListProgress();

  if (progressLoading) return <Spinner />;

  const currentProgresses = progressList?.map((element) => {
    return element.currentProjectsIds;
  });

  const currentProjects = currentProgresses?.flat();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Submitted Projects</Heading>
      </Row>
      <ReviewTable
        submissions={currentProjects}
        progresses={currentProgresses}
      />
    </>
  );
}

export default SubmissionsReviewTable;
