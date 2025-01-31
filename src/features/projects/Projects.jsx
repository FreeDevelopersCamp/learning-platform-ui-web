import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';

import { useInstructorData } from '../../contexts/instructor/InstructorContext';
import { useFetchProjectById } from '../../hooks/projects/useProject';

import Row from './Row';
import Heading from './Heading';
import Filterbar from './Filterbar';
import DashboardLayout from './DashboardLayout';
import ProjectCard from './ProjectCard';

import Spinner from '../../ui/Spinner';

const FetchProjectsLayout = styled.div`
  display: flex; /* ✅ Use flexbox */
  flex-wrap: wrap; /* ✅ Allow projects to wrap naturally */
  justify-content: flex-start; /* ✅ Align cards from left to right */
  align-items: flex-start; /* ✅ Align projects to start from top */
  gap: 2rem;
  height: 0;
  width: 0;
`;

// ✅ Styled Components
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); /* ✅ Auto-fit columns */
  gap: 5rem 10rem; /* ✅ 2rem gap between rows, 3rem gap between columns */
  overflow: auto;
  flex-grow: 1;
  padding: 0.5rem 0;
  min-height: 700px;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    ); /* ✅ Adjust for smaller screens */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* ✅ Full width for very small screens */
  }
`;

const NoProjectsMessage = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  padding: 2rem 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function FetchProjects({ projectId, setProjects }) {
  const { data: project, isLoading } = useFetchProjectById(projectId);

  useEffect(() => {
    if (project && !isLoading) {
      setProjects((prevProjects) => {
        const isAlreadyAdded = prevProjects.some((p) => p._id === project._id);
        if (!isAlreadyAdded) {
          return [...prevProjects, project];
        }
        return prevProjects;
      });
    }
  }, [project, isLoading, setProjects]);

  if (isLoading) return <Spinner />;
  return null;
}

function Projects() {
  const { session, userProgress } = useOutletContext();
  const { instructorData } = useInstructorData();
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const { projectsIds = [] } = instructorData || {};

  useEffect(() => {
    setIsFetched(false); // ✅ Reset isFetched
  }, []);

  // ✅ Fetch projects separately
  useEffect(() => {
    setFilteredProjects(projects); // Initially show all projects
  }, [projects]);

  // ✅ Filter projects dynamically based on name, title, or topic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
    } else {
      const lowerSearch = searchQuery.toLowerCase();
      const filtered = projects.filter((project) =>
        [project.name, project.title, project.topic]
          .map((field) => field?.toLowerCase() || '')
          .some((field) => field.includes(lowerSearch)),
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  console.log('userProgress: ', userProgress);

  if (!projectsIds) return <Spinner />;

  return (
    <Row>
      <Heading
        title="Projects"
        description="Transform your knowledge into real-world solutions by working on hands-on projects that challenge and inspire you!"
      />
      <Filterbar onSearchChange={setSearchQuery} />

      {/* ✅ Fetch projects here */}
      {!isFetched && projectsIds.length > 0 && (
        <FetchProjectsLayout>
          {projects.length >= projectsIds.length ? setIsFetched(true) : null}
          {projectsIds.map((projectId) => (
            <FetchProjects
              key={projectId}
              projectId={projectId}
              setProjects={setProjects}
              setIsFetched={setIsFetched}
              size={projectsIds.length}
            />
          ))}
        </FetchProjectsLayout>
      )}

      {isFetched && (
        <DashboardLayout>
          <StyledDashboardLayout>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  role={session.role}
                  userProgress={userProgress}
                />
              ))
            ) : (
              <NoProjectsMessage>No matching projects found.</NoProjectsMessage>
            )}
          </StyledDashboardLayout>
        </DashboardLayout>
      )}
    </Row>
  );
}

export default Projects;
