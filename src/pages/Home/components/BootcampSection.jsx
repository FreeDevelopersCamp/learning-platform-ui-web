import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const BootcampSectionWrapper = styled.section`
  position: relative;
  background-color: var(--color-mutedblue-900);
  color: var(--color-grey-0);
  text-align: center;
  padding: 40px 20px;
  overflow: hidden;
`;

const BootcampTitle = styled.h1`
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #d1d5db;

`;

const Highlight = styled.span`
  color: var(--color-yellow-green-500);
`;

const SectionTitle = styled.p`
  font-size: 18px;
  color: #d1d5db;
  position: absolute;
  display: inline-block;
  padding: 0 20px;
  margin: -35px;
  width: 320px;
  background-color: var(--color-mutedblue-900);
`;

const JobCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  position: relative;
  padding: 20px 0;
  margin: 40px 15%;
  border: 0.5px solid var(--color-grey-50);
  border-radius: 5px;
`;

const JobCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  border-radius: 5px;
  padding: 10px;
  width: 150px;
  height: 140px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
  border: 2px solid transparent;

  &:hover,
  &.active {
    border-color: var(--color-midnightblue-100);
    transform: translateY(-3px);
    border: 2px solid var(--color-midnightblue-100);
  }
`;

const JobIcon = styled.div`
  font-size: 36px;
  margin-bottom: 10px;
`;

const JobTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

// Component
const BootcampSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const jobCards = [
    { title: 'Data Science', icon: '🔍' },
    { title: 'Programming & Development', icon: '💻' },
    { title: 'Artificial Intelligence', icon: '🤖' },
    { title: 'Business', icon: '📈' },
    { title: 'Autonomous Systems', icon: '🚗' },
    { title: 'Product Management', icon: '📋' },
    { title: 'Cloud Computing', icon: '☁️' },
  ];

  return (
    <BootcampSectionWrapper>
      <BootcampTitle>
        Bootcamp level quality, <Highlight>at a free of the cost.</Highlight>
      </BootcampTitle>
      <JobCardsContainer>
        {jobCards.map((job, index) => (
          <JobCard
            key={index}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            <JobIcon>{job.icon}</JobIcon>
            <JobTitle>{job.title}</JobTitle>
          </JobCard>
        ))}
        <SectionTitle>Explore courses by job function</SectionTitle>
      </JobCardsContainer>
    </BootcampSectionWrapper>
  );
};

export default BootcampSection;
