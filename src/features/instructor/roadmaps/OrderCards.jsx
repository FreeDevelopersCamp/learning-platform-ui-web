import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { LuClock3 } from 'react-icons/lu';
import { FaCheck } from 'react-icons/fa';

import { formatDuration } from '../../../utils/helpers';

const Card = styled.div`
  width: 100%;
  background-color: white;
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
  color: white;
  background-color: #001b38;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 50%;
  color: #001b38;
  background-color: #03ef62;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: black;
`;

const Details = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
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
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

function OrderCards({ index, orderId, type, name, description, duration, xp }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => setIsOpen(!isOpen);

  const handleButtonClick = () => {
    navigate(`/${type}/${orderId}`);
  };

  return (
    <Card>
      <Type onClick={toggleCard}>{type}</Type>
      <Container onClick={toggleCard}>
        <Order>{index}</Order>
        {/* <Status>
          <FaCheck />
        </Status> */}
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
                  color: '#001b38',
                  transform: 'translateY(3px)',
                  marginRight: '5px',
                }}
              />
              <Duration>{formatDuration(duration)}zzzzz</Duration>
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
          <Button onClick={handleButtonClick}>
            View {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          </Button>
        </Details>
      )}
    </Card>
  );
}

export default OrderCards;
