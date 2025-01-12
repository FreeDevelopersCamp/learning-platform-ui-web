import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useFetchProjectById } from '../../hooks/projects/useProject';

import ViewProject from '../roadmaps/ViewProject';
import Spinner from '../../ui/Spinner';

// Styled Components
const OutlineContainer = styled.div`
  padding: 2rem;
`;

function ViewProjectOutline() {
  const { name, projectId } = useParams();
  const { data: project, isLoading, error } = useFetchProjectById(projectId);

  if (!project || isLoading || error) return <Spinner />;

  return (
    <OutlineContainer>
      <ViewProject order={{ id: projectId }} />
    </OutlineContainer>
  );
}

export default ViewProjectOutline;
