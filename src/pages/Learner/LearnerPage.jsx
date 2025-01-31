import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../contexts/auth/AuthContext';
import { useFetchRoadmapById } from '../../hooks/roadmaps/useRoadmap';

import MainSection from './ui/MainSection';
import ProgressSection from './ui/ProgressSection';
import RoadmapAnnouncement from './ui/RoadmapAnnouncement';
import Stats from './ui/Stats';
import Welcome from './ui/Welcome';
import CoursesSection from './ui/CoursesSection';

import Spinner from '../../ui/Spinner';

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 5rem;
  height: auto;
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  margin: 0 20px;
  flex-wrap: wrap;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function LearnerPage() {
  const { isLoading } = useAuth();
  const { user, userProgress } = useOutletContext();

  const roadmapId = userProgress.currentRoadmapsIds[0].itemId;

  // ✅ Fetch roadmap data only when roadmapId is available
  const { data: roadmap, isLoading: isLoadingRoadmap } =
    useFetchRoadmapById(roadmapId);

  if (isLoading || isLoadingRoadmap) return <Spinner />;

  console.log('roadmap: ', roadmap);

  return (
    <Container>
      <MainContainer>
        <Welcome user={user} />

        <StatsWrapper>
          <StatsContainer>
            <Stats userProgress={userProgress} />
          </StatsContainer>
          <MainSection roadmap={roadmap} userProgress={userProgress} />
        </StatsWrapper>

        <CoursesSection userProgress={userProgress} />
      </MainContainer>

      <div className="flex flex-col gap-4">
        <ProgressSection user={user} userProgress={userProgress} />
        <RoadmapAnnouncement userProgress={userProgress} />
      </div>
    </Container>
  );
}

export default LearnerPage;
