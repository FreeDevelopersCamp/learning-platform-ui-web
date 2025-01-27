import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCount } from '../../contexts/projects/ProjectsContext';
import { useFetchProjectById } from '../../hooks/projects/useProject';

import { FaCheck } from 'react-icons/fa';
import Spinner from '../../ui/Spinner';

const Card = styled.div`
  width: 300px;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  padding: 30px 20px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;

  &:hover {
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Header = styled.div`
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin-top: 5px;
  font-size: 2rem;
  font-weight: bold;
  color: #000;
`;

const Subtitle = styled.h4`
  font-size: 1.3rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Category = styled.h4`
  margin-top: 5px;
  font-size: 14px;
  color: #6c757d;
`;

const Description = styled.p`
  margin-top: 5px;
  font-family: 'Gill Sans', sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding-top: 16px;
  border-top: 1px solid #eaeaea;
`;

const Prerequisites = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #6c757d;
`;

const Status = styled.span`
  font-size: 12px;
  color: ${(props) => (props.status === '0' ? 'red' : 'green')};
  font-weight: bold;
`;

const XP = styled.span`
  font-size: 12px;
  color: #6c757d;
`;

const Participants = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: #001b38;
  background-color: #f9f9f9;
  border: 2px solid #003366;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function ProjectCard({ projectId, filter }) {
  const navigate = useNavigate();
  const { project, projectLoading, projectError } =
    useFetchProjectById(projectId);
  const { incrementCount, decrementCount } = useCount();

  useEffect(() => {
    if (
      project &&
      (filter === 'all' ||
        project?.topic?.toLowerCase()?.replace(/\s+/g, '-') ===
          filter?.toLowerCase())
    ) {
      incrementCount();
    }
    return () => {
      if (
        project &&
        (filter === 'all' ||
          project?.topic?.toLowerCase()?.replace(/\s+/g, '-') ===
            filter?.toLowerCase())
      ) {
        decrementCount();
      }
    };
  }, [project, filter, incrementCount, decrementCount]);

  if (projectLoading || !project || projectError) return <Spinner />;

  const {
    name,
    title,
    description,
    prerequisites,
    status,
    category,
    topic,
    xp,
    participants,
  } = project;

  const handleViewDetails = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    (filter === 'all' ||
      project?.topic?.toLowerCase().replace(/\s+/g, '-') ===
        filter?.toLowerCase()) && (
      <Card>
        <Content>
          <Header>
            <Subtitle>Project</Subtitle>
            <Title>{name}</Title>
            <Category>{topic}</Category>
          </Header>
          <Description>{description}</Description>
          <Prerequisites>
            <strong>Prerequisites:</strong>{' '}
            {prerequisites?.join(', ') || 'None'}
          </Prerequisites>
          <Participants>
            <strong>Participants:</strong> {participants || 0}
          </Participants>
        </Content>
        <Details>
          <div style={{ display: 'flex' }}>
            <XP>
              <strong>XP:</strong> {xp}
            </XP>
            <FaCheck
              style={{
                color: '#0fd15d',
                marginLeft: '5px',
              }}
            />
          </div>
          <Button onClick={() => handleViewDetails(projectId)}>
            View Details
          </Button>
        </Details>
      </Card>
    )
  );
}

export default ProjectCard;
