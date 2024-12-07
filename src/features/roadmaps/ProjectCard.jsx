import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useProject } from '../../hooks/projects/useProject';
import Spinner from '../../ui/Spinner';

const Card = styled.div`
  width: 300px;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 7px;
  padding: 30px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Header = styled.div`
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const Subtitle = styled.h4`
  font-size: 14px;
  color: #6c757d;
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }

  &:focus {
    outline: 2px solid #218838;
    outline-offset: 2px;
  }
`;

function ProjectCard({ projectId }) {
  const navigate = useNavigate();
  const { projectLoading, projectError, project } = useProject(projectId);

  const [localProject, setLocalProject] = useState(null);

  useEffect(() => {
    if (project) {
      setLocalProject(project);
    }
  }, [project]);

  if (projectLoading || !localProject || projectError) return;

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
  } = localProject;

  const handleViewDetails = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <Card>
      <Content>
        <Header>
          <Subtitle>project</Subtitle>
          <Title>{title}</Title>
          <Category>{topic}</Category>
        </Header>
        <Description>{description}</Description>
        <Prerequisites>
          <strong>Prerequisites:</strong> {prerequisites?.join(', ') || 'None'}
        </Prerequisites>
        <Participants>
          <strong>Participants:</strong> {participants || 0}
        </Participants>
      </Content>
      <Details>
        <XP>
          <strong>XP:</strong> {xp}
        </XP>
        <Button onClick={() => handleViewDetails(projectId)}>
          View Details
        </Button>
      </Details>
    </Card>
  );
}

export default ProjectCard;
