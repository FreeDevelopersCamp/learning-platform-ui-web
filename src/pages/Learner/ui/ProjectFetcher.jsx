import { useFetchProjectById } from '../../../hooks/projects/useProject';

import ProjectCard from '../../../features/projects/ProjectCard';
import Spinner from '../../../ui/Spinner';

function ProjectFetcher({ id, userProgress }) {
  const { data: project, isLoading, error } = useFetchProjectById(id);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading project.</p>;
  if (!project) return null;

  return (
    <ProjectCard project={project} role={'6'} userProgress={userProgress} />
  );
}

export default ProjectFetcher;
