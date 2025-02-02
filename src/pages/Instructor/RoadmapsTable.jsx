import { useGetInstructor } from '../../apis/core/Instructor/hooks/useGetInstructor';
import { useListRoadmap } from '../../apis/learn/Roadmap/hooks/useListRoadmap';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser';
import { useAuth } from '../../contexts/auth/AuthContext';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import RoadmapTable from '../../ui/RoadmapsTable/RoadmapTable';
import CreateRoadmapForm from '../../ui/RoadmapsTable/CreateRoadmapForm';
import UpdateRoadmapForm from '../../ui/RoadmapsTable/UpdateRoadmapForm';
import { useState } from 'react';
import Button from '../../ui/Buttons/Button';

function RoadmapsTable() {
  const { session, isLoading } = useAuth();
  const { user, userLoading } = useGetUser(session?.username);
  const { instructor, instructorLoading } = useGetInstructor(user?._id);
  const {
    roadmaps,
    isLoading: roadmapLoading,
    count,
  } = useListRoadmap(instructor?._id);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editRoadmap, setEditRoadmap] = useState(null);

  if (isLoading || userLoading || instructorLoading || roadmapLoading)
    return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Roadmaps</Heading>
        <Button
          variation="primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Hide Create Form' : 'Add New Roadmap'}
        </Button>
      </Row>

      <RoadmapTable
        roadmaps={roadmaps}
        count={count}
        onEdit={(roadmap) => setEditRoadmap(roadmap)}
      />

      {showCreateForm && <CreateRoadmapForm instructorId={instructor._id} />}
      {editRoadmap && <UpdateRoadmapForm roadmap={editRoadmap} />}
    </>
  );
}

export default RoadmapsTable;
