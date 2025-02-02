import { useFetchRoadmapById } from '../../../hooks/roadmaps/useRoadmap';

import RoadmapCard from '../../../features/roadmaps/RoadmapCard';
import Spinner from '../../../ui/Spinner';

function RoadmapFetcher({ id, userProgress }) {
  const { data: roadmap, isLoading, error } = useFetchRoadmapById(id);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading roadmap.</p>;
  if (!roadmap) return null;

  return <RoadmapCard roadmap={roadmap} userProgress={userProgress} />;
}

export default RoadmapFetcher;
