import { useUpdateProgress } from '../../../apis/learn/Progress/hooks/useProgress';

import CourseCard from '../../../features/courses/CourseCard';
import Spinner from '../../../ui/Spinner';

function CourseFetcher({ id, userProgress }) {
  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  if (updatingProgress) return <Spinner />;

  let progressStatus = 'start';

  if (userProgress?.currentCoursesIds?.some((item) => item.itemId === id)) {
    progressStatus = 'inProgress';
  }
  if (userProgress?.completedCoursesIds?.includes(id)) {
    progressStatus = 'completed';
  }

  return (
    <CourseCard
      courseId={id}
      role={'6'}
      progressStatus={progressStatus}
      userProgress={userProgress}
      updateProgress={updateProgress}
    />
  );
}

export default CourseFetcher;
