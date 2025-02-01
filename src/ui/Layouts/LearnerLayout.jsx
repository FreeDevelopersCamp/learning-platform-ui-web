import { Outlet } from 'react-router-dom';

import { useGetUser } from '../../apis/core/User/hooks/useGetUser';
import { useFetchProgressByUserId } from '../../apis/learn/Progress/hooks/useProgress';

import Spinner from '../Spinner';
import { useAuth } from '../../contexts/auth/AuthContext';

function LearnerLayout() {
  const { isLoading: isSessionLoading, session } = useAuth();
  const { user, isLoading: userLoading } = useGetUser(session?.username);
  const { data: userProgress, isLoading: userProgressLoading } =
    useFetchProgressByUserId(user?._id);

  const isLoading = userLoading || isSessionLoading || userProgressLoading;
  if (isLoading || !user?._id) {
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
