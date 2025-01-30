import { useGetInstructor } from '../../apis/core/Instructor/hooks/useGetInstructor';
import { useListRoadmap } from '../../apis/learn/Roadmap/hooks/useListRoadmap';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser';
import { useAuth } from '../../contexts/auth/AuthContext';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import RoadmapTable from '../../ui/RoadmapsTable/RoadmapTable';

function RoadmapsTable() {
  const { session, isLoading } = useAuth();
  const { user, userLoading } = useGetUser(session?.username);
  const { instructor, instructorLoading } = useGetInstructor(user?._id);
  const {
    roadmaps,
    isLoading: roadmapLoading,
    count,
  } = useListRoadmap(instructor?._id);

  if (isLoading || userLoading || instructorLoading || roadmapLoading)
    return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Roadmaps</Heading>
      </Row>
      <RoadmapTable roadmaps={roadmaps} count={count} />
    </>
  );
}

export default RoadmapsTable;
