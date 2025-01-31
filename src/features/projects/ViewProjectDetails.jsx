import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { LuGraduationCap } from 'react-icons/lu';
import { FaCheckCircle } from 'react-icons/fa';

import { useFetchProjectById } from '../../hooks/projects/useProject';
import { useUpdateProgress } from '../../hooks/learner/useProgress';

import Row from '../instructor/roadmaps/Row';
import DetailsHeading from './DetailsHeading';
import OrderCard from './OrderCard';
import InstructorsSet from '../roadmaps/InstructorsSet';

import Spinner from '../../ui/Spinner';

// Styled Components
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

const AboutProject = styled.div`
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

const InstructorsSetContainer = styled(Section)`
  overflow: hidden;
`;

function ViewProjectDetails() {
  const { id } = useParams();
  const { session, userProgress } = useOutletContext();

  const {
    data: project,
    isLoading: isProjectLoading,
    projectError,
  } = useFetchProjectById(id);

  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  if (isProjectLoading || !project || projectError || updatingProgress)
    return <Spinner />;

  const { description, tasks = [], prerequisites = [], instructor } = project;

  return (
    <Row>
      <DetailsHeading
        project={project}
        title={project.name}
        role={session.role}
        userProgress={userProgress}
        updateProgress={updateProgress}
      />
      <Container>
        <OrderCardsContainer>
          <Title>Description</Title>
          <Description>{description}</Description>
          {tasks.map((task, index) => (
            <OrderCard
              key={index}
              index={index + 1}
              project={project}
              task={task}
              role={session.role}
              userProgress={userProgress}
            />
          ))}
        </OrderCardsContainer>

        <AboutProject>
          <Prerequisites>
            <span style={{ display: 'flex', gap: '7px' }}>
              <LuGraduationCap style={{ fontSize: '2.2rem' }} /> Prerequisites
            </span>
            {prerequisites.length > 0 ? (
              prerequisites.map((prerequisite, i) => (
                <span
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '7px',
                    fontWeight: '400',
                    fontSize: '1.3rem',
                  }}
                >
                  <FaCheckCircle
                    style={{
                      fontSize: '2rem',
                      marginLeft: '2px',
                      color: 'var(--color-light-green-500)',
                    }}
                  />
                  {prerequisite}
                </span>
              ))
            ) : (
              <span style={{ fontWeight: '400', fontSize: '1.3rem' }}>
                There are no prerequisites
              </span>
            )}
          </Prerequisites>

          <InstructorsSetContainer>
            <InstructorsSet instructor={instructor} />
          </InstructorsSetContainer>
        </AboutProject>
      </Container>
    </Row>
  );
}

export default ViewProjectDetails;
