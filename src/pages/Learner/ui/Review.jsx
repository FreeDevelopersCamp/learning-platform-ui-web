import React from 'react';
import styled from 'styled-components';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

// Wrapper for the Section
const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distribute space between cards */
  border-top: 1px solid #e5e7eb;
  background-color: transparent;
  width: 100%;
  height: 10rem;
`;

// Individual Card Style
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 100%;
  height: 100%;
  padding-left: 3rem;

  gap: 1rem;

  border-radius: var(--border-radius-md);
  background-color: #fff;
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease;
  flex: 1; // Equal space for each card

  &:hover {
    background-color: #e3e4ed; /* Hover background color */
  }
`;

// Badge Style (For "3" or similar indicator)
const Badge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #000;
  background-color: #ff931e; /* Orange */
  border-radius: 10%;
  /* border: 1px solid black; */
`;

// Title and Description Wrapper
const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: left;
  gap: 0.3rem;
`;

// Small Label
const Label = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  padding: 2px;
  border-radius: 5px;
`;

// Description
const Description = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #111827;
`;

// Vertical Divider Style
const Divider = styled.div`
  width: 2px;
  height: 80%;
  color: #e5e7eb;
  font-weight: bold;
  font-size: 1.5rem;
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

function Review() {
  return (
    <SectionWrapper>
      <Card>
        <NameSection>
          <Label>Review</Label>
          <div className="flex flex-col">
            <FitnessCenterIcon />
          </div>
        </NameSection>
        <CardContent>
          <Badge>3</Badge>
          <Description>Lessons to review</Description>
        </CardContent>
      </Card>

      <Divider />

      <Card>
        <NameSection className="flex flex-row gap-3 items-center">
          <Label>Practice</Label>
          <FitnessCenterIcon />
        </NameSection>
        <CardContent>
          <Description>Introduction to Statistics In Python</Description>
        </CardContent>
      </Card>

      <Divider />

      <Card>
        <NameSection className="flex flex-row gap-4 items-center">
          <Label>Apply</Label>
          <AccountTreeIcon />
        </NameSection>
        <CardContent>
          <Description>Investigating Netflix Movies</Description>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}

export default Review;
