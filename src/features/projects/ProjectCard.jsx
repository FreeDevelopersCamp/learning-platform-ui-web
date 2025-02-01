import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { FaCheck } from 'react-icons/fa';

import Spinner from '../../ui/Spinner';

// ✅ Styled Components
const Card = styled.div`
  width: 300px;
  height: 360px;
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
  color: ${(props) => props.color || '#001b38'};
  background-color: ${(props) => props.bgColor || '#f9f9f9'};
  border: 2px solid ${(props) => props.borderColor || '#003366'};

  &:hover {
    background-color: var(--color-grey-300);
  }

  &:disabled {
    background-color: #eaeaea;
    color: #aaa;
    cursor: not-allowed;
  }
`;

// ✅ Passed and Submitted Button Styles
const PassedButton = styled(Button)`
  background-color: #1b5e20; /* Dark Green */
  color: white;
  border-color: #1b5e20;

  &:hover {
    background-color: #144d17; /* Darker Green */
  }
`;

const SubmittedButton = styled(Button)`
  background-color: #4caf50; /* Light Green */
  color: white;
  border-color: #4caf50;

  &:hover {
    background-color: #45a049; /* Slightly Darker Green */
  }
`;

// ✅ Updated ProjectCard Component
function ProjectCard({ project, role, userProgress }) {
  const navigate = useNavigate();

  // ✅ Ensure project exists before rendering
  if (!project) return <Spinner />;

  const { _id, name, description, prerequisites, topic, xp, participants } =
    project;

  // ✅ Get project status from userProgress
  const currentProject = userProgress?.currentProjectsIds?.find(
    (p) => p.id === _id,
  );
  const projectStatus = currentProject?.status ?? null;

  const handleStartClick = (e) => {
    e.stopPropagation();
    if (!name || !_id) return;
    navigate(`/project/${name.toLowerCase().replace(/\s+/g, '-')}/${_id}`);
  };

  const handleViewDetails = () => {
    navigate(`/project/${_id}`);
  };

  // ✅ Render Button Logic Based on Status
  const renderButton = () => {
    if (role === '5') {
      return <Button onClick={handleViewDetails}>View Details</Button>;
    }

    if (role === '6') {
      if (projectStatus === '2') {
        return <PassedButton disabled>Passed</PassedButton>;
      }

      if (projectStatus === '0' || projectStatus === '1') {
        return <SubmittedButton>Submitted</SubmittedButton>;
      }

      return (
        <Button
          onClick={handleStartClick}
          bgColor="#cce5ff"
          color="#0056b3"
          borderColor="#0056b3"
        >
          Start
        </Button>
      );
    }

    return null;
  };

  return (
    <Card onClick={handleViewDetails}>
      <Content>
        <Header>
          <Subtitle>Project</Subtitle>
          <Title>{name}</Title>
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
        <div style={{ display: 'flex' }}>
          <XP>
            <strong>XP:</strong> {xp}
          </XP>
          <FaCheck style={{ color: '#0fd15d', marginLeft: '5px' }} />
        </div>
        {renderButton()}
      </Details>
    </Card>
  );
}

export default ProjectCard;
