import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

// Styled components
const InstructorSectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 40px;
`;

const ImageContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InstructorImage = styled.img`
  width: 400px;
  height: auto;
  object-fit: cover;
`;

const Content = styled.div`
  margin-left: 20px;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const CtaButton = styled.button`
  padding: 12px 20px;
  font-size: 1.5rem;
  background-color: var(--color-mutedblue-800);
  color: var(--color-grey-50);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-mutedblue-600);
  }
`;

const InstructorSection = () => {
  const navigate = useNavigate();

  return (
    <InstructorSectionContainer id="instructor">
      <ImageContainer>
        <InstructorImage
          src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"
          alt="Instructor"
        />
      </ImageContainer>
      <Content>
        <Title>Become an instructor</Title>
        <Description>
          Instructors from around the world teach millions of learners on FDC.
          We provide the tools and skills to teach what you love.
        </Description>
        <CtaButton onClick={() => navigate('/signup')}>
          Start teaching today
        </CtaButton>
      </Content>
    </InstructorSectionContainer>
  );
};

export default InstructorSection;
