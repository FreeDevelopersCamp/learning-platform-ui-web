import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import Filterbar from './ui/Filterbar.jsx';
import Bookmarks from './ui/Bookmarks.jsx';
import InProgress from './ui/InProgress.jsx';
import Completed from './ui/Completed.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 2rem;
`;

function Library() {
  const [filter, setFilter] = useState('all');

  const { userProgress } = useOutletContext();

  const bookmarksIds = userProgress?.BookmarksIds || [];
  const currentRoadmapsIds = userProgress?.currentRoadmapsIds || [];
  const currentCoursesIds = userProgress?.currentCoursesIds || [];
  const currentProjectsIds = userProgress?.currentProjectsIds || [];

  const completedCoursesIds = userProgress?.completedCoursesIds || [];
  const completedProjectsIds = userProgress?.completedProjectsIds || [];

  // Separate roadmaps, courses and projects from bookmarksIds
  const bookmarkedRoadmaps = bookmarksIds.filter(
    (item) => item.type === 'roadmap',
  );
  const bookmarkedCourses = bookmarksIds.filter(
    (item) => item.type === 'course',
  );
  const bookmarkedProjects = bookmarksIds.filter(
    (item) => item.type === 'project',
  );

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Bookmarks', value: 'bookmarks' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ];

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <Container>
      <Filterbar
        filterOptions={filterOptions}
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />
      {(filter === 'all' || filter === 'bookmarks') && (
        <Bookmarks
          roadmaps={bookmarkedRoadmaps}
          courses={bookmarkedCourses}
          projects={bookmarkedProjects}
          userProgress={userProgress}
        />
      )}
      {(filter === 'all' || filter === 'in-progress') && (
        <InProgress
          roadmaps={currentRoadmapsIds}
          courses={currentCoursesIds}
          projects={currentProjectsIds}
          userProgress={userProgress}
        />
      )}
      {(filter === 'all' || filter === 'completed') && (
        <Completed
          courses={completedCoursesIds}
          projects={completedProjectsIds}
          userProgress={userProgress}
        />
      )}
    </Container>
  );
}

export default Library;
