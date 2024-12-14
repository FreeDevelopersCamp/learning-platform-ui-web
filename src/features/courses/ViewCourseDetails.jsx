import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCourse } from '../../hooks/courses/useCourse';

import Row from '../instructor/roadmaps/Row';
import DetailsHeading from './DetailsHeading';
import OrderCard from './OrderCard';
import InstructorsSet from '../roadmaps/InstructorsSet';

import { LuGraduationCap } from 'react-icons/lu';
import { FaCheckCircle } from 'react-icons/fa';
// import { HiMenuAlt1 } from 'react-icons/hi';

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

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 1.7rem;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
`;

const AboutCourse = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 600px;
  overflow: hidden;
  border: none;
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

// const Resourses = styled(Section)`
//   font-weight: bold;
// `;

const InstructorsSetContainer = styled(Section)`
  overflow: hidden;
`;

function ViewRoadmapDetails() {
  const { id } = useParams();
  const { course, courseLoading, courseError } = useCourse(id);

  if (courseLoading || !course || courseError) return <Spinner />;

  const { description, subCourses = [], instructor } = course;

  return (
    <Row>
      <DetailsHeading course={course} />
      <Container>
        <OrderCardsContainer>
          <Title>Description</Title>
          <Description>{description}</Description>
          {subCourses.map((course1, index) => (
            <OrderCard
              key={index}
              index={index + 1}
              course={course1}
              title={course.name}
            />
          ))}
        </OrderCardsContainer>

        <AboutCourse>
          <Prerequisites>
            <span style={{ display: 'flex', gap: '7px' }}>
              <LuGraduationCap style={{ fontSize: '2.2rem' }} /> Prerequisites
            </span>
            <span style={{ display: 'flex', gap: '7px' }}>
              <FaCheckCircle
                style={{
                  fontSize: '2rem',
                  marginLeft: '2px',
                  color: ' #03ef62',
                }}
              />
              <p style={{ fontWeight: '400', fontSize: '1.3rem' }}>
                There are no prerequisites
              </p>
            </span>
          </Prerequisites>
          {/* <Resourses>
            <span style={{ display: 'flex', gap: '7px' }}>
              <HiMenuAlt1 style={{ fontSize: '2.2rem' }} /> Resources
            </span>
          </Resourses> */}
          <InstructorsSetContainer>
            <InstructorsSet instructor={instructor} />
          </InstructorsSetContainer>
        </AboutCourse>
      </Container>
    </Row>
  );
}

export default ViewRoadmapDetails;
