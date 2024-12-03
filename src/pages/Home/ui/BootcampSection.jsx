import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const BootcampSectionWrapper = styled.section`
  position: relative;
  background-color: #0c1a3d;
  color: #fff;
  text-align: center;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  overflow: hidden;
`;

const BootcampTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Highlight = styled.span`
  color: #baff0f;
`;

const SectionTitle = styled.p`
  font-size: 20px;
  color: #eeeeee;
  position: absolute;
  display: inline-block;
  padding: 0 20px;
  margin: -35px;
  width: 320px;
  background-color: #152244;
`;

const JobCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  position: relative;
  padding: 20px 0;
  margin: 40px 15%;
  border: 0.5px solid #696969;
  border-radius: 5px;
`;

const JobCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #333;
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
    border-color: #0000ff;
    transform: translateY(-3px);
    border: 2px solid #0000ff;
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
