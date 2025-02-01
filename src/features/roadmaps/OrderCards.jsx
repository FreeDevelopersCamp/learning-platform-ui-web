import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { LuClock3 } from 'react-icons/lu';
import { FaCheck } from 'react-icons/fa';

import { formatDurationCard } from '../../utils/helpers';

const Card = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  padding: 2rem 3rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 1px 3px 0 var(--color-grey-300);
    transform: translateY(-1px);
  }

  &:focus {
    box-shadow: 0px 1px 5px 0 var(--color-grey-300);
  }
`;

const Type = styled.p`
  color: var(--color-grey-500);
  font-size: 1.1rem;
  text-transform: uppercase;
  padding-bottom: 0.3rem;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  user-select: none;
`;

const IconContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: var(--color-grey-500);
  transform: translateY(-0.2rem);
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
  color: var(--color-grey-100);
  background-color: var(--color-mutedblue-800);
  padding-right: 1px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-grey-800);
`;

const Details = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-grey-300);
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const Duration = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Start = styled.button`
  margin: 1.6rem 0 0;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--color-mutedblue-900);
  background-color: var(--color-light-green-500);
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-light-green-600);
  }
`;
const Button = styled.button`
  color: #3131ff;
  margin: 1.6rem 0 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    text-decoration: underline;
    text-shadow: 0px 2px 4px var(--color-grey-300);
  }

  &:focus {
    outline: none;
    text-shadow: 0px 2px 4px var(--color-grey-300);
  }
`;

function OrderCards({
  index,
  orderId,
  type,
  name,
  description,
  duration,
  xp,
  role,
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => setIsOpen(!isOpen);

  const handleViewClick = () => {
    navigate(`/${type}/${orderId}`);
  };

  const handleStartClick = () => {
    // navigate to Course outline page
    // navigate(`/${type}/${orderId}`);
  };

  return (
    <Card>
      <Type onClick={toggleCard}>{type}</Type>
      <Container onClick={toggleCard}>
        <Order>{index}</Order>
        <Title>{name}</Title>
        <IconContainer>
          {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </IconContainer>
      </Container>
      {isOpen && (
        <Details>
          <Description>{description}</Description>
          <Duration>
            <div style={{ display: 'flex' }}>
              <LuClock3
                style={{
                  color: 'var(--color-grey-800)',
                  transform: 'translateY(3px)',
                  marginRight: '5px',
                }}
              />
              <p>{duration && formatDurationCard(duration)}</p>
            </div>
            <div style={{ display: 'flex' }}>
              <FaCheck
                style={{
                  color: '#0fd15d',
                  transform: 'translateY(3px)',
                  marginRight: '5px',
                }}
              />
              <p>{xp} XP</p>
            </div>
          </Duration>
          <ButtonsContainer>
            <Button onClick={handleViewClick}>
              View {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
            </Button>
            {role === '6' && <Start onClick={handleViewClick}>Start</Start>}
          </ButtonsContainer>
        </Details>
      )}
    </Card>
  );
}

export default OrderCards;
