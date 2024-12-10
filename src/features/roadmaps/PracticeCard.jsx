import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { usePractice } from '../../hooks/practices/usePractice';
import { useCount } from '../../contexts/practices/PracticesContext';

import Spinner from '../../ui/Spinner';

const Card = styled.div`
  width: 350px;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  padding: 30px 20px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #003366;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #002244;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #41464b;
`;

const SubTitle = styled.h4`
  font-size: 1.2rem;
  color: #8c9297;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Topic = styled.h3`
  margin-top: 5px;
  font-size: 1.9rem;
  font-weight: bold;
  color: #000;
  padding-bottom: 1rem;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding-top: 16px;
  border-top: 1px solid #eaeaea;

  > div {
    display: flex;
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #001b38;
  background-color: #f9f9f9;
  border: none;
  cursor: pointer;
  border: 2px solid #003366;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const TopicButton = styled.button`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 6px 12px;
  color: #3131ff;
  border-radius: 3px;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

function PracticeCard({ practiceId, filter }) {
  const navigate = useNavigate();
  const { practice, practiceLoading, practiceError } = usePractice(practiceId);
  const { incrementCount, decrementCount } = useCount();
  const [isModalOpen, setModalOpen] = useState(false);
  filter = filter + ' Course';

  useEffect(() => {
    if (
      practice &&
      (filter === 'Practices Course' ||
        practice?.name?.toLowerCase()?.replace(/\s+/g, '-') ===
          filter?.toLowerCase()?.replace(/\s+/g, '-'))
    ) {
      incrementCount();
    }
    return () => {
      if (
        practice &&
        (filter === 'Practices Course' ||
          practice?.name?.toLowerCase()?.replace(/\s+/g, '-') ===
            filter?.toLowerCase()?.replace(/\s+/g, '-'))
      ) {
        decrementCount();
      }
    };
  }, [practice, filter, incrementCount, decrementCount]);

  if (!practice || practiceLoading || practiceError) return <Spinner />;

  const { name, topic, description } = practice;

  const handleViewDetails = (practiceId) => {
    navigate(`/practice/${practiceId}`);
  };

  const handleViewTopics = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    (filter === 'Practices Course' ||
      practice?.name?.toLowerCase().replace(/\s+/g, '-') ===
        filter?.toLowerCase()?.replace(/\s+/g, '-')) && (
      <>
        <Card>
          <SubTitle>PRACTICE</SubTitle>
          <Topic>{topic}</Topic>
          <Details>
            <Title>{name}</Title>
            <div>
              {/* <TopicButton onClick={handleViewTopics}>Topics</TopicButton> */}
              <Button onClick={() => handleViewDetails(practiceId)}>
                Details
              </Button>
            </div>
          </Details>
        </Card>

        {isModalOpen && (
          <Overlay>
            <Modal>
              <h2>{name}</h2>
              <p>{description || 'No description available.'}</p>
              <ModalButton onClick={closeModal}>Close</ModalButton>
            </Modal>
          </Overlay>
        )}
      </>
    )
  );
}

export default PracticeCard;
