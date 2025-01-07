import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IoPlayOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  cursor: pointer;
  user-select: none;
  padding: 1rem 0.5rem;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Order = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
  color: white;
  background-color: #001b38;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-700);
  transform: translateY(2px);
`;

const XP = styled.span`
  font-size: 1.5rem;
  color: #6c757d;
`;

function Task({ task, projectTitle, index, role }) {
  const navigate = useNavigate();

  const { _id, name, xp } = task;

  const handleButtonClick = () => {
    navigate(
      `/project/${projectTitle.toLowerCase()}/${name
        .toLowerCase()
        .replace(/\s+/g, '-')}/?task=${index}`,
    );
  };

  return (
    <Card onClick={role === '6' ? handleButtonClick : null}>
      <Container>
        <Order>
          <IoPlayOutline />
        </Order>
        <Title>{name}</Title>
      </Container>

      <Container>
        <FaCheck
          style={{
            color: '#0fd15d',
            transform: 'translateY(-1px)',
            fontSize: '1.6rem',
          }}
        />
        <XP>
          {xp} <strong>XP</strong>
        </XP>
      </Container>
    </Card>
  );
}

export default Task;
