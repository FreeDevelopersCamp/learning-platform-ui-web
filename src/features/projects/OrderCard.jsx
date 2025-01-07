import { useState } from 'react';
import styled from 'styled-components';
import Task from './Task'; // Task component for displaying individual tasks
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 2rem 3rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  &:focus {
    box-shadow: 0px 1px 5px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  user-select: none;
`;

const IconContainer = styled.div`
  padding-left: 0.5rem;
  transform: translateY(-0.6rem);
`;

const Order = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 50%;
  color: white;
  background-color: #001b38;
`;

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  color: var(--color-grey-700);
`;

const Description = styled.p`
  font-size: 1.4rem;
  margin-top: 1.8rem;
  color: var(--color-grey-700);
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 25px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
  color: var(--color-grey-500);
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  color: #3131ff;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const XPContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const GreenCheck = styled(FaCheck)`
  color: #0fd15d;
  font-size: 1.6rem;
`;

const Start = styled.button`
  display: flex;
  color: var(--color-mutedblue-800);
  background-color: var(--color-light-green-500);
  padding: 0.6rem 1.8rem;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-light-green-600);
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const Details = styled.div`
  padding-top: 0.5rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

function OrderCard({ index, task, role, userProgress }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { _id, title, description, tasks = [], xp } = task;

  // Determine project/task status
  const isCompleted =
    userProgress?.completedProjectsIds &&
    userProgress.completedProjectsIds.includes(_id);

  const isCurrent =
    userProgress?.currentProjectsIds &&
    userProgress.currentProjectsIds.includes(_id);

  const toggleCard = () => setIsOpen(!isOpen);

  const handleStartClick = (e) => {
    e.stopPropagation();
    navigate(
      `/project/${title.toLowerCase()}/${title
        .toLowerCase()
        .replace(/\s+/g, '-')}/?task=1`,
    );
  };

  const renderButton = () => {
    if (isCompleted) {
      return <Start disabled>Completed</Start>;
    } else if (isCurrent) {
      return <Start onClick={handleStartClick}>Continue</Start>;
    } else {
      return <Start onClick={handleStartClick}>Start</Start>;
    }
  };

  return (
    <Card>
      <Container>
        <Order>{index}</Order>
        <Title>{title}</Title>
      </Container>
      <Description>{description}</Description>
      <ActionsContainer>
        <Button onClick={toggleCard}>
          View Task Details
          <IconContainer style={{ marginTop: '12px' }}>
            {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </IconContainer>
        </Button>
        <XPContainer>
          <GreenCheck />
          {xp} XP
        </XPContainer>
      </ActionsContainer>

      {isOpen && (
        <Details>
          {tasks.map((subTask, taskIndex) => (
            <Task
              key={taskIndex}
              index={taskIndex + 1}
              task={subTask}
              title={title}
              role={role}
            />
          ))}
        </Details>
      )}
    </Card>
  );
}

export default OrderCard;
