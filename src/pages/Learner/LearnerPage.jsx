import styled from 'styled-components';

import { useAuth } from '../../contexts/auth/AuthContext';
import { useUser } from '../../hooks/users/useUser';
import MainSection from './ui/MainSection';
import ProgressSection from './ui/ProgressSection';
import RoadmapAnnouncement from './ui/RoadmapAnnouncement';
import Stats from './ui/Stats';
import Welcome from './ui/Welcome';
import Spinner from '../../ui/Spinner';

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr;
  gap: 5rem;
  height: auto;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 5rem;
  margin-bottom: 5rem;
`;

function LearnerPage() {
  const { auth, isLoading } = useAuth();

  const { user, isLoading: userLoading } = useUser(auth?.username, {
    enabled: !!auth?.username && !isLoading, // Trigger only when username is available and auth is not loading
  });

  if (isLoading || userLoading) return <Spinner />;

  return (
    <Container>
      <div>
        <Welcome user={user} />
        <StatsContainer>
          <Stats />
        </StatsContainer>
        <MainSection />
      </div>
      <div className="flex flex-col gap-4">
        <ProgressSection user={user} />
        <RoadmapAnnouncement />
      </div>
    </Container>
  );
}

export default LearnerPage;
