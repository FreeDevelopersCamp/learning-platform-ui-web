import { useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { LuGraduationCap } from 'react-icons/lu';
import { FaCheckCircle } from 'react-icons/fa';

import { useFetchCourseById } from '../../hooks/courses/useCourse';
import { useUpdateProgress } from '../../apis/learn/Progress/hooks/useProgress';

import Row from '../instructor/roadmaps/Row';
import DetailsHeading from './DetailsHeading';
import OrderCard from './OrderCard';
import InstructorsSet from '../roadmaps/InstructorsSet';

import Spinner from '../../ui/Spinner';

const Container = styled.div`
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  grid-template-rows: auto 1fr;
  width: 100%;
  padding: 20px 0;
  gap: 2rem;
`;

const OrderCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: var(--color-grey-700);
  margin-bottom: 1.5rem;
`;

const AboutCourse = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 600px;
  overflow: hidden;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: 3px;
`;

const Prerequisites = styled(Section)`
  gap: 15px;
  font-weight: bold;
  padding-bottom: 15px;
`;

const InstructorsSetContainer = styled(Section)`
  overflow: hidden;
`;

function ViewCourseDetails() {
  const { id } = useParams(); // Get the course ID from the URL
  const { session, userProgress } = useOutletContext(); // Get session and progress data

  const {
    data: course,
    isLoading: isCourseLoading,
    error: courseError,
  } = useFetchCourseById(id); // Fetch course details

  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  // Show a loading spinner if the data is being fetched
  if (isCourseLoading || updatingProgress) return <Spinner />;
  // Show an error message if there is an issue fetching the course
  if (courseError || !course)
    return <p>Error loading course details. Please try again later.</p>;

  const { name, description, subCourses = [], instructor } = course;

  return (
    <Row>
      {/* Header Section with Course Title and Progress */}
      <DetailsHeading
        course={course}
        title={name}
        role={session.role}
        userProgress={userProgress}
        updateProgress={updateProgress}
      />

      <Container>
        {/* Left Section: Course Description and Subcourses */}
        <OrderCardsContainer>
          <Title>Description</Title>
          <Description>
            {description || 'No description available.'}
          </Description>

          {/* Render Subcourses */}
          {subCourses.length > 0 ? (
            subCourses.map((subCourse, index) => (
              <OrderCard
                key={subCourse._id || index}
                index={index + 1}
                parentCourse={course}
                course={subCourse}
                title={name}
                role={session.role}
                userProgress={userProgress}
              />
            ))
          ) : (
            <p>No sub-courses available for this course.</p>
          )}
        </OrderCardsContainer>

        {/* Right Section: Additional Course Information */}
        <AboutCourse>
          {/* Prerequisites Section */}
          <Prerequisites>
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <LuGraduationCap style={{ fontSize: '2.2rem' }} />
              Prerequisites
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <FaCheckCircle
                style={{
                  fontSize: '2rem',
                  marginLeft: '2px',
                  color: 'var(--color-light-green-500)',
                }}
              />
              <p style={{ fontWeight: '400', fontSize: '1.3rem' }}>
                There are no prerequisites.
              </p>
            </span>
          </Prerequisites>

          {/* Instructors Section */}
          <InstructorsSetContainer>
            <InstructorsSet instructor={instructor} />
          </InstructorsSetContainer>
        </AboutCourse>
      </Container>
    </Row>
  );
}

export default ViewCourseDetails;
