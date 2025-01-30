import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useOutletContext } from 'react-router-dom';
import { useFetchCourseList } from '../../hooks/courses/useCourse';

import Row from '../instructor/roadmaps/Row';
import Heading from '../instructor/roadmaps/Heading';
import Filterbar from './Filterbar';
import DashboardLayout from '../instructor/DashboardLayout';

import CourseCard from './CourseCard';
import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  overflow: auto;
  flex-grow: 1;
  padding: 0.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const NoCoursesMessage = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  padding: 4rem 0;
`;

function Courses() {
  const { session, userProgress } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const {
    data: courses,
    isLoading: isCoursesLoading,
    error,
  } = useFetchCourseList();

  useEffect(() => {
    if (!courses?.items) return;

    const filtered = courses.items.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  if (isCoursesLoading) return <Spinner />;
  if (error) return <p>Error fetching courses. Please try again.</p>;
  if (!courses?.items || courses.items.length === 0)
    return <NoCoursesMessage>No courses available.</NoCoursesMessage>;

  const title = 'Courses';
  const description =
    'It’s time to roll up your sleeves—we learn best by doing. All of our courses are interactive, combining short videos with hands-on exercises.';

  const computeProgressStatus = (courseId) => {
    if (userProgress?.completedCoursesIds?.includes(courseId)) {
      return 'completed';
    }
    if (
      userProgress?.currentCoursesIds?.some(
        (entry) => entry.itemId === courseId,
      )
    ) {
      return 'inProgress';
    }
    return 'notStarted';
  };

  return (
    <Row>
      <Heading title={title} description={description} />
      <Filterbar onSearchChange={setSearchQuery} />

      <DashboardLayout>
        <StyledDashboardLayout>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const progressStatus = computeProgressStatus(course._id);
              return (
                <CourseCard
                  key={course._id}
                  courseId={course._id}
                  role={session.role}
                  progressStatus={progressStatus}
                />
              );
            })
          ) : (
            <NoCoursesMessage>No courses found.</NoCoursesMessage>
          )}
        </StyledDashboardLayout>
      </DashboardLayout>
    </Row>
  );
}

export default Courses;
