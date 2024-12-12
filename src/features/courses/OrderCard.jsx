import { useState } from 'react';
import styled from 'styled-components';

import Chapter from './Chapter';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

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

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  color: var(--color-grey-700);
`;

const Details = styled.div`
  padding-top: 0.5rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const Description = styled.p`
  font-size: 1.4rem;
  margin-top: 1.8rem;
  color: var(--color-grey-700);
`;

const Button = styled.button`
  display: flex;
  color: #3131ff;
  padding: 2rem 0 4px;
  background: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

function OrderCard({ index, course }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    _id,
    name,
    description,
    category,
    topic,
    status,
    duration,
    instructorId,
    resources = [],
    tips = [],
    subCourses = [],
    xp,
    created,
    updated,
    raters = [],
    rating,
  } = course;

  const toggleCard = () => setIsOpen(!isOpen);

  return (
    <Card>
      <Container>
        <Order>{index}</Order>
        <Title>{name}</Title>
      </Container>
      <Description>{description}</Description>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '25px',
          borderTop: '1px solid #ddd',
          paddingTop: '20px',
          color: 'var(--color-grey-500)',
        }}
      >
        <Button onClick={toggleCard}>
          View Chapter Details{' '}
          <IconContainer>
            {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </IconContainer>
        </Button>

        <div>Start</div>
      </div>
      {isOpen && (
        <Details>
          {subCourses.map((course, index) => (
            <Chapter key={index} course={course} />
          ))}
        </Details>
      )}
    </Card>
  );
}

export default OrderCard;