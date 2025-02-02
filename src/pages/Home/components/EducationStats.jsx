import React from 'react';
import styled from 'styled-components';

import CapIcon from '../../../assets/Icons/cap.svg';
import BookIcon from '../../../assets/Icons/book.svg';
import BuildIcon from '../../../assets/Icons/build.svg';

// Styled Components with increased card sizes
const EducationStatsContainer = styled.div`
  text-align: left;
  max-width: 1100px; /* Increased width */
  margin: 0 auto;
  padding: 3rem; /* Increased padding */
  font-family: Arial, sans-serif;
`;

const Heading = styled.h2`
  font-size: 2.5rem; /* Increased font size */
  font-weight: 500;
  color: var(--color-grey-700);
  margin-bottom: 3rem; /* Increased margin */
  line-height: 1.4;
  text-align: left;

  strong {
    font-weight: 700;
  }
`;

const StatsCards = styled.div`
  display: flex;
  gap: 2rem; /* Increased gap between cards */
  justify-content: space-around;
  margin-top: 2rem; /* Increased margin */
`;

const Card = styled.div`
  background-color: #f3f5f9;
  border-radius: 15px; /* Slightly larger border radius */
  padding: 2.5rem; /* Increased padding */
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* Increased shadow */
  border: none;
  min-width: 250px; /* Set a minimum width for the cards */
`;

const Icon = styled.div`
  margin-bottom: 1.5rem; /* Increased margin */
  color: #333333;
  width: 60px; /* Increased icon size */
  height: 60px; /* Increased icon size */
`;

const CardHeading = styled.h3`
  font-size: 1.5rem; /* Increased font size */
  font-weight: 600;
  margin-bottom: 1rem; /* Increased margin */
  color: #333333;
`;

const CardParagraph = styled.p`
  font-size: 1.4rem; /* Increased font size */
  color: #6b7280;
  margin: 0;
`;

const EducationStats = () => {
  return (
    <EducationStatsContainer id="about">
      <Heading>
        More than a platform. <strong>Free Developers Camp</strong> is a
        commitment to bringing tech and open source collaboration to students
        and educators across the globe.
      </Heading>
      <StatsCards>
        <Card>
          <Icon>
            <img src={CapIcon} alt="Cap Icon" width="60" height="60" />
          </Icon>
          <CardHeading>24 learners</CardHeading>
          <CardParagraph>
            Connect with millions of peers who've expanded their skills through
            GitHub Education.
          </CardParagraph>
        </Card>
        <Card>
          <Icon>
            <img src={BookIcon} alt="Book Icon" width="60" height="60" />
          </Icon>
          <CardHeading>9 instructors</CardHeading>
          <CardParagraph>
            Collaborate with educators around the world who enhance their lesson
            plans and workstreams with GitHub tools.
          </CardParagraph>
        </Card>
        <Card>
          <Icon>
            <img src={BuildIcon} alt="Build Icon" width="60" height="60" />
          </Icon>
          <CardHeading>+2K educational institutions</CardHeading>
          <CardParagraph>
            Join thousands of schools globally that incorporate GitHub into
            their tech curriculum.
          </CardParagraph>
        </Card>
      </StatsCards>
    </EducationStatsContainer>
  );
};

export default EducationStats;
