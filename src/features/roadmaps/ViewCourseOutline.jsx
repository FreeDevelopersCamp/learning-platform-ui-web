import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { capitalizeWords } from '../../utils/helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 30px 50px;
`;

const Title = styled.div`
  font-size: 2.8rem;
  font-weight: bold;
`;

const Contant = styled.div`
  background-color: red;
`;

function ViewCourseOutline() {
  const { title, roadmapId } = useParams();
  const [searchParams] = useSearchParams();
  const ex = searchParams.get('ex');

  return (
    <Container>
      <Title>{capitalizeWords(title)}</Title>
      <Title>roadmapId: {roadmapId}</Title>
      <Contant>contant</Contant>
      {ex}
    </Container>
  );
}

export default ViewCourseOutline;
