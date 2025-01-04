import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../contexts/auth/AuthContext';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser.ts';

import MainSection from './ui/MainSection';
import ProgressSection from './ui/ProgressSection';
import RoadmapAnnouncement from './ui/RoadmapAnnouncement';
import Stats from './ui/Stats';
import Welcome from './ui/Welcome';
import CoursesSection from './ui/CoursesSection';

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

const MainContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
`;

function LearnerPage() {
  const { auth, isLoading } = useAuth();

  const { user, isLoading: userLoading } = useGetUser(auth?.username, {
    enabled: !!auth?.username && !isLoading, // Trigger only when username is available and auth is not loading
  });

  const { userProgress } = useOutletContext();

  if (isLoading || userLoading || !auth || !user) return <Spinner />;

  return (
    <Container>
      <MainContainer>
        <Welcome user={user} />
        <StatsContainer>
          <Stats userProgress={userProgress} />
        </StatsContainer>
        <MainSection userProgress={userProgress} />
        <CoursesSection userProgress={userProgress} />
      </MainContainer>
      <div className="flex flex-col gap-4">
        <ProgressSection user={user} />
        <RoadmapAnnouncement />
      </div>
    </Container>
  );
}

export default LearnerPage;
