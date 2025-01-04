import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../contexts/auth/AuthContext';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser.ts';

import Spinner from '../../ui/Spinner';
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
  const { auth, isLoading: authLoading } = useAuth();

  const { user, isLoading: userLoading } = useGetUser(auth?.username, {
    enabled: !!auth?.username && !authLoading,
  });

  const { userProgress } = useOutletContext();

  if (authLoading || userLoading || !auth || !user) return <Spinner />;

  const bookmarksIds = userProgress?.BookmarksIds || [];
  const currentCoursesIds = userProgress?.currentCoursesIds || [];
  const completedCoursesIds = userProgress?.completedCoursesIds || [];

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
        <Bookmarks items={bookmarksIds} />
      )}
      {(filter === 'all' || filter === 'in-progress') && (
        <InProgress items={currentCoursesIds} />
      )}
      {(filter === 'all' || filter === 'completed') && (
        <Completed items={completedCoursesIds} />
      )}
    </Container>
  );
}

export default Library;
