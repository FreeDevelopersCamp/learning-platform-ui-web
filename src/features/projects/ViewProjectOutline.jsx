import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { useFetchProjectById } from '../../hooks/projects/useProject';

import ViewProject from '../roadmaps/ViewProject';
import Spinner from '../../ui/Spinner';

const OutlineContainer = styled.div`
  padding: 2rem;
`;

function ViewProjectOutline() {
  const { projectId } = useParams();
  const { userProgress } = useOutletContext();

  const { data: project, isLoading, error } = useFetchProjectById(projectId);

  if (!project || isLoading || error) return <Spinner />;

  const transformedProject = {
    ...project,
    id: project._id,
  };

  return (
    <OutlineContainer>
      <ViewProject order={transformedProject} userProgress={userProgress} />
    </OutlineContainer>
  );
}

export default ViewProjectOutline;
