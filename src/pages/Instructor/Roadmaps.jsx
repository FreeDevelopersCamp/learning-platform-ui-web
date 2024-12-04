import styled from 'styled-components';
import { LuClock3 } from 'react-icons/lu';
import { FaBolt } from 'react-icons/fa';
import { PiTarget } from 'react-icons/pi';
import { CiViewList } from 'react-icons/ci';
import { RiTeamLine } from 'react-icons/ri';

import { useInstructorData } from '../../contexts/instructor/InstructorContext';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

const RoadmapContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
  gap: 35px;
  padding: 20px;
  height: 80vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid transparent;
  }
`;

const RoadmapCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* font-family: 'Times New Roman', Times, serif; */
  font-family: Arial, Helvetica, sans-serif;
  background-color: #001b38;
  color: #ffffff;
  padding: 40px 40px;
  gap: 15px;
  border-radius: 5px;
  width: 80%;
  max-width: 1200px;
  height: 250px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Topic = styled.div`
  color: var(--color-grey-0);
  font-size: 2.5rem;
  font-weight: bold;
`;

const Button = styled.button`
  width: 135px;
  height: 40px;
  padding: 8px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  color: #001b38;
  background-color: #03ef62;
  /* props.isActive ? 'var(--color-brand-600)' : 'var(--color-grey-400)'};/ */
  /* background-color: var(--color-grey-300); */

  &:hover {
    background-color: #22bd60;
  }
`;

const Stats = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  color: var(--color-grey-200);
  font-size: 1.5rem;
  gap: 30px;
  padding: 2.5rem 2px;
`;

const Span = styled.span`
  display: flex;
  gap: 7px;
`;

function Roadmaps() {
  const { instructorData } = useInstructorData();

  console.log('instructorData', instructorData);

  const {
    coursesIds = [],
    practicesIds = [],
    projectsIds = [],
    roadmapsIds = [],
  } = instructorData || {};

  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Roadmaps</Heading>
        <RoadmapContainer>
          <RoadmapCard>
            <Topic>Associate Data Scientist in Python</Topic>
            <Button>View Details</Button>
            <Stats>
              <Span>Sub Title</Span>
              <Span>
                <LuClock3 style={{ marginTop: '2px', fontSize: '1.8rem' }} />
                hours
              </Span>
              <Span>
                <FaBolt style={{ marginTop: '2px', fontSize: '1.7rem' }} />
                <span>{coursesIds.length || 0}</span>
                courses
              </Span>
              <Span>
                <PiTarget
                  style={{
                    marginTop: '2px',
                    fontSize: '1.8rem',
                    transform: 'rotate(-45deg)',
                  }}
                />
                <span>{0}</span>
                assessments
              </Span>
              <Span>
                <CiViewList style={{ marginTop: '2px', fontSize: '1.8rem' }} />
                <span>{projectsIds.length || 0}</span>
                projects
              </Span>
              <Span>
                <RiTeamLine style={{ marginTop: '2px', fontSize: '1.8rem' }} />
                <span>{practicesIds.length || 0}</span>
                participants
              </Span>
            </Stats>
          </RoadmapCard>
        </RoadmapContainer>
      </Row>
    </>
  );
}

export default Roadmaps;
