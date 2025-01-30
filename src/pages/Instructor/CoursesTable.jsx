import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import CourseTable from '../../ui/CoursesTable/CourseTable';

import { useAuth } from '../../contexts/auth/AuthContext';
import { useGetUser } from '../../apis/core/User/hooks/useGetUser';
import { useGetInstructor } from '../../apis/core/Instructor/hooks/useGetInstructor';
import { useListCourse } from '../../apis/learn/Course/hooks/useListCourse';

function CoursesTable() {
  const { session, isLoading } = useAuth();
  const { user, userLoading } = useGetUser(session?.username);
  const { instructor, instructorLoading } = useGetInstructor(user?._id);
  const {
    instructorCourses,
    isLoading: coursesLoading,
    count,
  } = useListCourse(instructor?._id);

  if (isLoading || userLoading || instructorLoading || coursesLoading)
    return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Courses</Heading>
        {/* <UserTableOperations /> */}
      </Row>
      <CourseTable courses={instructorCourses} count={count} />
    </>
  );
}

export default CoursesTable;
