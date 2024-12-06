import React from 'react';
import styled from 'styled-components';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import Progress from './Progress';

// Wrapper for the entire section
const SectionWrapper = styled.div`
  width: 100%;
  margin: 5rem auto;
`;

// Header
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.9rem;
    font-weight: 500;
    color: #111827;
  }

  a {
    font-size: 1.5rem;
    color: #2563eb; /* Blue link */
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Individual Course Item
const CourseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;
  background-color: #fff;
  border-radius: var(--border-radius-md);
  border-bottom: 1px solid #e5e7eb;
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f7;
  }
`;

// Course Info
const CourseInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Icon Placeholder (Replace with actual icons if available)
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
`;

// Course Details
const CourseDetails = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #6b7280; /* Gray text */
    text-transform: uppercase;
  }

  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: #111827;
    margin: 0;
  }
`;

// Progress Bar Wrapper
const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

// Progress Bar
const ProgressBar = styled.div`
  height: 8px;
  border-radius: 4px;
  background-color: #e5e7eb;
  overflow: hidden;
  margin-top: 0.5rem;

  div {
    height: 100%;
    width: ${(props) => props.percentage || 0}%;
    background-color: #03ef62; /* Green color */
  }
`;

// Continue Button
const ContinueButton = styled.button`
  border: 2px solid transparent;
  border-radius: 4px;

  content: '';
  display: block;
  inset: 0px;
  font-size: 1.4rem;
  font-weight: 500;

  display: inline-flex;
  flex-direction: column;
  flex-shrink: 0;
  font-family: Studio-Feixen-Sans, Arial, sans-serif;
  font-weight: 700;

  -webkit-box-pack: center;
  justify-content: center;
  line-height: 1;
  margin: 0px;
  outline: 0px;
  padding: 0px 16px;
  position: relative;
  text-decoration: none;
  transition: background-color 125ms ease-out;

  user-select: none;

  background-color: var(--wf-brand--main, #03ef62);
  color: var(--wf-brand--text-on-color, #05192d);

  font-size: var(--wf-button--medium, 14px);

  height: 36px;
  min-width: 36px;
  width: auto;

  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #08e669; /* Darker green */
    border-color: var(--color-grey-400); /* Darker green */
  }
`;

function CoursesSection() {
  // Dummy course data
  const courses = [
    { title: 'Working with Dates and Times In Python', progress: 54 },
    { title: 'Writing Efficient Python Code', progress: 55 },
    {
      title: 'Introduction to Data Visualization with Matplotlib',
      progress: 2,
    },
    { title: 'Introduction to Data Literacy', progress: 39 },
    { title: 'Data Science for Business', progress: 16 },
  ];

  return (
    <SectionWrapper>
      <Header>
        <div className="flex flex-row items-center gap-2">
          <RocketLaunchIcon />
          <h2>Pick up where you left off</h2>
        </div>
        <a href="#">See All In My Library</a>
      </Header>

      {courses.map((course, index) => (
        <CourseItem key={index}>
          <CourseInfo>
            <Icon>
              <TipsAndUpdatesIcon />
            </Icon>

            <CourseDetails>
              <span>Course</span>
              <p>{course.title}</p>
              <Progress
                progress={50}
                bgColor="#E0E1E9"
                fillColor="#03EF62"
                labelColor="#000"
                width="20rem"
              />
            </CourseDetails>
          </CourseInfo>

          <ContinueButton>Continue</ContinueButton>
        </CourseItem>
      ))}
    </SectionWrapper>
  );
}

export default CoursesSection;
