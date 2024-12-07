import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import PythonLogo from '../../../assets/Icons/python.svg';
import GitLogo from '../../../assets/Icons/git.svg';
import ReactLogo from '../../../assets/Icons/react.svg';
import NodejsLogo from '../../../assets/Icons/node-js.svg';
import programmingTeamImage from '../../../assets/Images/programming-team.jpg';
import JavascriptIcon from '../../../assets/Icons/javascript.svg';

// Styled Components
const IntroductionSectionWrapper = styled.section`
  background-color: #ffffff;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroductionContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  padding: 2rem;
  gap: 5rem;
`;

const IntroductionImageWrapper = styled.div`
  position: relative;
  width: 550px;
  height: 550px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  border: none;
`;

const IntroductionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconBackground = styled.div`
  position: absolute;
  bottom: 50px;
  right: -5%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 20px;
`;

const IconOverlay = styled.div`
  width: 80px;
  height: 80px;
  transition: opacity 0.5s ease-in-out;
`;

const IconImage = styled.img`
  margin: 5px 0 0 15px;
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const IntroductionText = styled.div`
  width: 50%;
  text-align: left;
`;

const IntroductionTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #000000;
  line-height: 1.2;
`;

const Highlight = styled.span`
  color: #0000ff;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-top: 1.5rem;
`;

const BrowseCoursesButton = styled.button`
  height: 55px;
  background-color: #0000ff;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #000099;
  }
`;

const StartLearningLink = styled.a`
  color: #333333;
  font-size: 1.6rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #0000ff;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

// Component
const IntroductionSection = () => {
  const logos = [PythonLogo, JavascriptIcon, GitLogo, ReactLogo, NodejsLogo];

  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
        setFade(true); // Fade back in
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <IntroductionSectionWrapper id="courses">
      <IntroductionContent>
        <IntroductionImageWrapper>
          {/* Display the programming team image */}
          <IntroductionImage
            src={programmingTeamImage}
            alt="Programming Team"
          />
          <IconBackground>
            {/* Display the rotating SVG logos */}
            <IconOverlay
              className={`w-20 h-20 transition-opacity duration-500 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <IconImage src={logos[currentLogoIndex]} alt="Rotating Logo" />
            </IconOverlay>
          </IconBackground>
        </IntroductionImageWrapper>
        <IntroductionText>
          <IntroductionTitle>
            Learn to <Highlight>&lt;/code&gt;</Highlight> and Start your Career
            in Tech
          </IntroductionTitle>
          <Buttons>
            <BrowseCoursesButton>Browse Courses</BrowseCoursesButton>
            <StartLearningLink href="#start-learning">
              Start learning for free{' '}
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: '8px' }}
              />
            </StartLearningLink>
          </Buttons>
        </IntroductionText>
      </IntroductionContent>
    </IntroductionSectionWrapper>
  );
};

export default IntroductionSection;
