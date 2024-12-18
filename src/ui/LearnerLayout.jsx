import { Outlet } from 'react-router-dom';

import { useSession } from '../hooks/auth/useSession';
import { useUser } from '../hooks/users/useUser';
import { useFetchProgressByUserId } from '../hooks/learner/useProgress';

import Spinner from './Spinner';

function LearnerLayout() {
  const {
    isLoading: isSessionLoading,
    session,
    error: sessionError,
  } = useSession();

  const { user, isLoading: userLoading } = useUser(session?.username);

  const {
    data: userProgress,
    isLoading: userProgressLoading,
    error: userProgressError,
  } = useFetchProgressByUserId(user?._id);

  const isLoading = userLoading || isSessionLoading || userProgressLoading;

  const error = sessionError || userProgressError;

  if (isLoading || !user?._id || error) {
    return <Spinner />;
  }

  return (
    <Outlet
      context={{
        session,
        user,
        userProgress,
      }}
    />
  );
}

export default LearnerLayout;
